-- ====================================================================
-- FIX ROW LEVEL SECURITY (RLS) POLICIES FOR PRODUCTS TABLE
-- This allows admins and vendors to insert/update products
-- ====================================================================

BEGIN;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to products" ON public.products;
DROP POLICY IF EXISTS "Allow vendors to insert their own products" ON public.products;
DROP POLICY IF EXISTS "Allow vendors to update their own products" ON public.products;
DROP POLICY IF EXISTS "Allow admins to manage all products" ON public.products;

-- 1. Allow everyone to READ products (public access)
CREATE POLICY "Allow public read access to products"
ON public.products
FOR SELECT
TO public
USING (true);

-- 2. Allow vendors to INSERT their own products
CREATE POLICY "Allow vendors to insert their own products"
ON public.products
FOR INSERT
TO public
WITH CHECK (
    -- Check if the user is a vendor and inserting their own product
    EXISTS (
        SELECT 1 FROM public.vendors
        WHERE vendors.id = auth.uid()
        AND vendors.id = vendor_id
    )
    OR
    -- OR if the user is an admin
    EXISTS (
        SELECT 1 FROM public.admins
        WHERE admins.id = auth.uid()
    )
);

-- 3. Allow vendors to UPDATE their own products
CREATE POLICY "Allow vendors to update their own products"
ON public.products
FOR UPDATE
TO public
USING (
    -- Vendor can update their own products
    EXISTS (
        SELECT 1 FROM public.vendors
        WHERE vendors.id = auth.uid()
        AND vendors.id = vendor_id
    )
    OR
    -- OR admin can update any product
    EXISTS (
        SELECT 1 FROM public.admins
        WHERE admins.id = auth.uid()
    )
);

-- 4. Allow vendors to DELETE their own products
CREATE POLICY "Allow vendors to delete their own products"
ON public.products
FOR DELETE
TO public
USING (
    -- Vendor can delete their own products
    EXISTS (
        SELECT 1 FROM public.vendors
        WHERE vendors.id = auth.uid()
        AND vendors.id = vendor_id
    )
    OR
    -- OR admin can delete any product
    EXISTS (
        SELECT 1 FROM public.admins
        WHERE admins.id = auth.uid()
    )
);

-- 5. Special policy: Allow admins to insert products for any vendor
CREATE POLICY "Allow admins to insert products for vendors"
ON public.products
FOR INSERT
TO public
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.admins
        WHERE admins.id = auth.uid()
    )
);

COMMIT;

-- ====================================================================
-- VERIFICATION
-- ====================================================================
-- After running this, you should be able to:
-- ✅ Insert products as admin (for any vendor)
-- ✅ Insert products as vendor (for yourself)
-- ✅ Update/delete your own products as vendor
-- ✅ Update/delete any product as admin
-- ✅ View all products as anyone (public read access)
-- ====================================================================

