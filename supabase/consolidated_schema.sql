
-- Consolidated Schema Migration

-- 1. Products Table Fixes
ALTER TABLE IF EXISTS public.products 
ADD COLUMN IF NOT EXISTS slug text,
ADD COLUMN IF NOT EXISTS vendor_id uuid REFERENCES auth.users;

-- 2. Categories Table Fixes
ALTER TABLE IF EXISTS public.categories 
ADD COLUMN IF NOT EXISTS "group" text,
ADD COLUMN IF NOT EXISTS product_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS image_url text;

-- 3. Vendor Applications Table
CREATE TABLE IF NOT EXISTS public.vendor_applications (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamptz DEFAULT now()
);

-- Add columns to vendor_applications if missing
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendor_applications' AND column_name = 'user_id') THEN
        ALTER TABLE public.vendor_applications ADD COLUMN user_id uuid REFERENCES auth.users;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendor_applications' AND column_name = 'full_name') THEN
        ALTER TABLE public.vendor_applications ADD COLUMN full_name text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendor_applications' AND column_name = 'store_name') THEN
        ALTER TABLE public.vendor_applications ADD COLUMN store_name text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendor_applications' AND column_name = 'phone') THEN
        ALTER TABLE public.vendor_applications ADD COLUMN phone text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendor_applications' AND column_name = 'gst_number') THEN
        ALTER TABLE public.vendor_applications ADD COLUMN gst_number text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendor_applications' AND column_name = 'business_location') THEN
        ALTER TABLE public.vendor_applications ADD COLUMN business_location text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendor_applications' AND column_name = 'documents_url') THEN
        ALTER TABLE public.vendor_applications ADD COLUMN documents_url text;
    END IF;
     IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendor_applications' AND column_name = 'status') THEN
        ALTER TABLE public.vendor_applications ADD COLUMN status text DEFAULT 'pending';
    END IF;
END $$;

-- 4. Storage Buckets (Idempotent)
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('vendor-documents', 'vendor-documents', false) ON CONFLICT (id) DO NOTHING;

-- 5. RLS Policies (Re-apply to ensure corectness)
ALTER TABLE public.vendor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Drop generic policies to avoid conflicts before re-creating specific ones
-- (Skipping full drop for safety, focusing on critical ones)

-- Ensure Service Role has access
DROP POLICY IF EXISTS "Service role can view all applications" ON public.vendor_applications;
CREATE POLICY "Service role can view all applications" ON public.vendor_applications FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.categories;
CREATE POLICY "Enable insert for authenticated users only" ON public.categories FOR INSERT WITH CHECK (auth.role() = 'service_role');

