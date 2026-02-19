-- Add missing columns to categories table
ALTER TABLE public.categories 
ADD COLUMN IF NOT EXISTS "group" text,
ADD COLUMN IF NOT EXISTS product_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS image_url text;

-- Ensure RLS is enabled on categories to be safe (optional but good practice)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to categories
DROP POLICY IF EXISTS "Enable read access for all users" ON public.categories;
CREATE POLICY "Enable read access for all users" ON public.categories FOR SELECT USING (true);

-- Create policy to allow insert for authenticated users (or service role)
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.categories;
CREATE POLICY "Enable insert for authenticated users only" ON public.categories FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Create storage bucket if not exists (This is usually done via API or UI, but SQL can do it if extension enabled)
-- Note: 'storage' schema might not be directly manipulatable via standard SQL editor for some operations without specific permissions, 
-- but inserting into storage.buckets is the way.

INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy to allow public viewing
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'product-images' );

-- Create storage policy to allow authenticated uploads
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'product-images' AND auth.role() = 'service_role' );
