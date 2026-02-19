-- ====================================================================
-- 🛑 RESET AND INITIALIZE DATABASE (Clean Slate)
-- This script will DELETE ALL DATA and re-create the schema correctly.
-- ====================================================================

BEGIN;

-- 1. CLEANUP: Drop existing objects
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.get_user_role() CASCADE; -- RPC function
DROP TABLE IF EXISTS public.vendor_applications CASCADE;
DROP TABLE IF EXISTS public.audit_logs CASCADE;
DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.site_settings CASCADE;
DROP TABLE IF EXISTS public.admins CASCADE;
DROP TABLE IF EXISTS public.vendors CASCADE;
DROP TABLE IF EXISTS public.customers CASCADE;

-- Delete all existing Auth Users (Requires permission, usually works in SQL Editor)
DELETE FROM auth.users;

-- 2. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 3. FUNCTIONS (Security Definer for Seamless Auth)
-- This function allows safe role checking without RLS recursion
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS text AS $$
DECLARE
  current_user_id uuid;
BEGIN
  current_user_id := auth.uid();
  IF EXISTS (SELECT 1 FROM public.admins WHERE id = current_user_id) THEN RETURN 'admin'; END IF;
  IF EXISTS (SELECT 1 FROM public.vendors WHERE id = current_user_id) THEN RETURN 'vendor'; END IF;
  IF EXISTS (SELECT 1 FROM public.customers WHERE id = current_user_id) THEN RETURN 'customer'; END IF;
  RETURN null;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. TABLES

-- Admins
CREATE TABLE public.admins (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT,
  email TEXT,
  permissions JSONB
);
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Vendors
CREATE TABLE public.vendors (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT,
  email TEXT,
  store_name TEXT,
  gst_number TEXT,
  phone TEXT,
  address TEXT,
  document_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE
);
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;

-- Customers
CREATE TABLE public.customers (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  shipping_address TEXT,
  billing_address TEXT
);
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Categories
CREATE TABLE public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  image_url TEXT,
  parent_id UUID REFERENCES public.categories(id)
);
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Products
CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  stock INTEGER DEFAULT 0,
  category_id UUID REFERENCES public.categories(id),
  vendor_id UUID REFERENCES public.vendors(id),
  image_urls TEXT[],
  is_best_seller BOOLEAN DEFAULT FALSE,
  is_on_sale BOOLEAN DEFAULT FALSE,
  discount_price NUMERIC
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Orders
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  customer_id UUID REFERENCES public.customers(id) NOT NULL,
  status TEXT DEFAULT 'Pending',
  total NUMERIC NOT NULL,
  items JSONB
);
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;


-- Vendor Applications (For handling requests since self-registration is disabled)
CREATE TABLE public.vendor_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  store_name TEXT NOT NULL,
  phone TEXT,
  gst_number TEXT,
  address TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
);
ALTER TABLE public.vendor_applications ENABLE ROW LEVEL SECURITY;

-- Order Items (Linking Orders to Products & Vendors)
CREATE TABLE public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL, -- Keep history even if product deleted? Or NULL?
  vendor_id UUID REFERENCES public.vendors(id), -- Denormalized for easy vendor queries
  name TEXT NOT NULL, -- Snapshot of product name
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price NUMERIC NOT NULL CHECK (price >= 0), -- Snapshot of price at purchase
  total NUMERIC GENERATED ALWAYS AS (quantity * price) STORED,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled'))
);
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Site Settings
CREATE TABLE public.site_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1), -- Singleton
  site_name TEXT DEFAULT 'My Store',
  support_email TEXT,
  maintenance_mode BOOLEAN DEFAULT FALSE,
  banner_text TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
INSERT INTO public.site_settings (id, site_name) VALUES (1, 'Shreeram Store') ON CONFLICT DO NOTHING;

-- INDEXES
CREATE INDEX idx_products_vendor ON public.products(vendor_id);
CREATE INDEX idx_products_category ON public.products(category_id);
-- Composite Index for Store Filtering
CREATE INDEX idx_products_cat_price ON public.products(category_id, price);

CREATE INDEX idx_orders_customer ON public.orders(customer_id);

CREATE INDEX idx_order_items_order ON public.order_items(order_id);
CREATE INDEX idx_order_items_vendor ON public.order_items(vendor_id);
-- Composite Index for Vendor Dashboard (Filtering by Status)
CREATE INDEX idx_order_items_vendor_status ON public.order_items(vendor_id, status);

CREATE INDEX idx_audit_created_at ON public.audit_logs(created_at DESC);


-- ===========================================
-- ATOMIC CHECKOUT FUNCTION (RPC)
-- ===========================================
CREATE OR REPLACE FUNCTION public.create_order(
  shipping_address TEXT,
  items JSONB -- Array of objects: [{ "product_id": "uuid", "quantity": 1 }]
)
RETURNS UUID AS $$
DECLARE
  new_order_id UUID;
  item JSONB;
  prod_record RECORD;
  total_order_amount NUMERIC := 0;
BEGIN
  -- 1. Create Parent Order (Initial status pending)
  INSERT INTO public.orders (customer_id, status, total, items, shipping_address)
  VALUES (auth.uid(), 'Pending', 0, items, shipping_address) -- Total updated later
  RETURNING id INTO new_order_id;

  -- 2. Loop through items
  FOR item IN SELECT * FROM jsonb_array_elements(items)
  LOOP
    -- Fetch Product Details & Stock Check
    SELECT * INTO prod_record FROM public.products WHERE id = (item->>'product_id')::uuid;
    
    IF prod_record.id IS NULL THEN
      RAISE EXCEPTION 'Product % not found', item->>'product_id';
    END IF;

    IF prod_record.stock < (item->>'quantity')::int THEN
      RAISE EXCEPTION 'Insufficient stock for product %', prod_record.name;
    END IF;

    -- Create Order Item
    INSERT INTO public.order_items (order_id, product_id, vendor_id, name, quantity, price)
    VALUES (
      new_order_id,
      prod_record.id,
      prod_record.vendor_id,
      prod_record.name,
      (item->>'quantity')::int,
      prod_record.price
    );

    -- Calculate Totals
    total_order_amount := total_order_amount + (prod_record.price * (item->>'quantity')::int);

    -- Deduct Stock
    UPDATE public.products 
    SET stock = stock - (item->>'quantity')::int 
    WHERE id = prod_record.id;
  END LOOP;

  -- 3. Update Order Total
  UPDATE public.orders SET total = total_order_amount WHERE id = new_order_id;

  RETURN new_order_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ===========================================
-- ORDER STATUS SYNC TRIGGER
-- ===========================================
CREATE OR REPLACE FUNCTION public.sync_order_status()
RETURNS TRIGGER AS $$
DECLARE
  total_items INTEGER;
  delivered_items INTEGER;
  cancelled_items INTEGER;
  order_id_target UUID;
BEGIN
  order_id_target := NEW.order_id;

  SELECT count(*), 
         count(*) FILTER (WHERE status = 'delivered'),
         count(*) FILTER (WHERE status = 'cancelled')
  INTO total_items, delivered_items, cancelled_items
  FROM public.order_items
  WHERE order_id = order_id_target;

  -- Logic: 
  -- All Delivered -> Completed
  -- All Cancelled -> Cancelled
  -- Else -> Processing (if not already)
  
  IF total_items = delivered_items THEN
    UPDATE public.orders SET status = 'Completed' WHERE id = order_id_target;
  ELSIF total_items = cancelled_items THEN
    UPDATE public.orders SET status = 'Cancelled' WHERE id = order_id_target;
  ELSE
    UPDATE public.orders SET status = 'Processing' WHERE id = order_id_target AND status != 'Processing';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_order_item_update
  AFTER UPDATE OF status ON public.order_items
  FOR EACH ROW EXECUTE PROCEDURE public.sync_order_status();


-- 5. RLS POLICIES (Updated for New Tables)


-- Admins: View Self + View Others if Admin
CREATE POLICY "Admins view self" ON admins FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins view all" ON admins FOR SELECT USING (public.get_user_role() = 'admin');

-- Vendors: View Self + Admin Views All + Public Views Verified
CREATE POLICY "Vendors view self" ON vendors FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Vendors update self" ON vendors FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins view all vendors" ON vendors FOR SELECT USING (public.get_user_role() = 'admin');
CREATE POLICY "Admins update vendors" ON vendors FOR UPDATE USING (public.get_user_role() = 'admin');
CREATE POLICY "Public view verified vendors" ON vendors FOR SELECT USING (is_verified = true);

-- Customers: View Self + Admin Views All
CREATE POLICY "Customers view self" ON customers FOR ALL USING (auth.uid() = id);
CREATE POLICY "Admins view all customers" ON customers FOR SELECT USING (public.get_user_role() = 'admin');

-- Products: Public Read + Vendor Insert (Verified) + Admin Insert
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Vendors insert products" ON products FOR INSERT WITH CHECK (
  (auth.uid() = vendor_id AND exists (select 1 from vendors where id = auth.uid() and is_verified = true))
);
CREATE POLICY "Admins insert products" ON products FOR INSERT WITH CHECK (public.get_user_role() = 'admin');
CREATE POLICY "Vendors update own products" ON products FOR UPDATE USING (auth.uid() = vendor_id);
CREATE POLICY "Admins update all products" ON products FOR UPDATE USING (public.get_user_role() = 'admin');
CREATE POLICY "Vendors delete own products" ON products FOR DELETE USING (auth.uid() = vendor_id);

-- Categories: Public Read + Admin Manage
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Admins manage categories" ON categories FOR ALL USING (public.get_user_role() = 'admin');

-- Orders: Customer View Own + Admin View All
CREATE POLICY "Customers view own orders" ON orders FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Customers create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Admins view all orders" ON orders FOR SELECT USING (public.get_user_role() = 'admin');
-- Vendors view related orders (ONLY if they have an item in it)
CREATE POLICY "Vendors view related orders" ON orders FOR SELECT USING (
  EXISTS (SELECT 1 FROM order_items WHERE order_items.order_id = orders.id AND order_items.vendor_id = auth.uid())
);
-- Vendors view own order items
CREATE POLICY "Vendors view own order items" ON order_items FOR SELECT USING (vendor_id = auth.uid());
CREATE POLICY "Customers view own order items" ON order_items FOR SELECT USING (exists (select 1 from orders where id = order_items.order_id and customer_id = auth.uid()));
CREATE POLICY "Admins view all order items" ON order_items FOR SELECT USING (public.get_user_role() = 'admin');
-- Allow customers to insert items (complex, usually handled by RPC or backend)
CREATE POLICY "Customers insert order items" ON order_items FOR INSERT WITH CHECK (
  exists (select 1 from orders where id = order_items.order_id and customer_id = auth.uid())
);

-- Site Settings: Public Read, Admin Write
CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admins update settings" ON site_settings FOR UPDATE USING (public.get_user_role() = 'admin');

-- Vendor Applications: Public Create, Admin Manage
CREATE POLICY "Public create applications" ON vendor_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage applications" ON vendor_applications FOR ALL USING (public.get_user_role() = 'admin');


-- 6. AUDIT LOGGING SYSTEM (Immutable)
CREATE TABLE public.audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  actor_id UUID DEFAULT auth.uid(),
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id UUID,
  details JSONB
);
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Audit Policies
CREATE POLICY "Admins view audit logs" ON audit_logs FOR SELECT USING (public.get_user_role() = 'admin');
-- No Update/Delete policies = Immutable by default (Superuser can still delete)

-- Audit Trigger Function
CREATE OR REPLACE FUNCTION public.trigger_audit_log()
RETURNS TRIGGER AS $$
DECLARE
  old_data JSONB;
  new_data JSONB;
  user_id UUID;
BEGIN
  user_id := auth.uid();
  
  IF (TG_OP = 'DELETE') THEN
    INSERT INTO public.audit_logs (actor_id, action, entity, entity_id, details)
    VALUES (user_id, 'DELETE', TG_TABLE_NAME, OLD.id, row_to_json(OLD)::jsonb);
    RETURN OLD;
  ELSIF (TG_OP = 'UPDATE') THEN
    INSERT INTO public.audit_logs (actor_id, action, entity, entity_id, details)
    VALUES (user_id, 'UPDATE', TG_TABLE_NAME, NEW.id, jsonb_build_object('old', row_to_json(OLD), 'new', row_to_json(NEW)));
    RETURN NEW;
  ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO public.audit_logs (actor_id, action, entity, entity_id, details)
    VALUES (user_id, 'CREATE', TG_TABLE_NAME, NEW.id, row_to_json(NEW)::jsonb);
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach Triggers to Critical Tables
CREATE TRIGGER audit_vendors AFTER INSERT OR UPDATE OR DELETE ON public.vendors FOR EACH ROW EXECUTE PROCEDURE public.trigger_audit_log();
CREATE TRIGGER audit_products AFTER INSERT OR UPDATE OR DELETE ON public.products FOR EACH ROW EXECUTE PROCEDURE public.trigger_audit_log();
CREATE TRIGGER audit_orders AFTER UPDATE ON public.orders FOR EACH ROW EXECUTE PROCEDURE public.trigger_audit_log(); -- Insert logged by create_order usually, but trigger is safer
-- Note: 'orders' insert is complex, let's trace Updates mostly to reduce noise, or trace all.
-- Let's trace all for orders.
CREATE TRIGGER audit_orders_all AFTER INSERT OR DELETE ON public.orders FOR EACH ROW EXECUTE PROCEDURE public.trigger_audit_log();


-- 7. TRIGGER FOR NEW USER REGISTRATION
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  -- We ignore metadata role for security. 
  -- Public Signup = ALWAYS Customer.
  -- Admins/Vendors are created via Admin Dashboard (Manual Insert).
BEGIN
  INSERT INTO public.customers (id, full_name, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email);

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 7. STORAGE BUCKETS & POLICIES

-- Bucket: vendor-documents (Private)
INSERT INTO storage.buckets (id, name, public) VALUES ('vendor-documents', 'vendor-documents', false) ON CONFLICT DO NOTHING;
DROP POLICY IF EXISTS "Vendors upload docs" ON storage.objects;
CREATE POLICY "Vendors upload docs" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'vendor-documents' 
  AND auth.role() = 'authenticated'
  -- Enforce folder isolation? For docs, maybe not strictly needed if filename is unique, 
  -- but good practice: (storage.foldername(name))[1] = auth.uid()::text
);
DROP POLICY IF EXISTS "Admins view docs" ON storage.objects;
CREATE POLICY "Admins view docs" ON storage.objects FOR SELECT USING (bucket_id = 'vendor-documents' AND public.get_user_role() = 'admin');

-- Bucket: products (Public)
INSERT INTO storage.buckets (id, name, public) VALUES ('products', 'products', true) ON CONFLICT DO NOTHING;

-- Policy: Public Read
DROP POLICY IF EXISTS "Public read product images" ON storage.objects;
CREATE POLICY "Public read product images" ON storage.objects FOR SELECT USING (bucket_id = 'products');

-- Policy: Vendor Upload (Strict Folder Isolation)
-- Must upload to folder: products/{user_id}/filename
DROP POLICY IF EXISTS "Vendors upload product images" ON storage.objects;
CREATE POLICY "Vendors upload product images" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'products' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Vendor Update/Delete (Own Folder Only)
DROP POLICY IF EXISTS "Vendors manage product images" ON storage.objects;
CREATE POLICY "Vendors manage product images" ON storage.objects FOR UPDATE USING (
  bucket_id = 'products' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
DROP POLICY IF EXISTS "Vendors delete product images" ON storage.objects;
CREATE POLICY "Vendors delete product images" ON storage.objects FOR DELETE USING (
  bucket_id = 'products' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Admin Full Access
DROP POLICY IF EXISTS "Admins manage all storage" ON storage.objects;
CREATE POLICY "Admins manage all storage" ON storage.objects FOR ALL USING (public.get_user_role() = 'admin');
INSERT INTO categories (name, image_url) VALUES 
('Men', 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg'),
('Women', 'https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg');

COMMIT;
