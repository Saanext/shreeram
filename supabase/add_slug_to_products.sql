-- ====================================================================
-- ADD SLUG FIELD TO PRODUCTS TABLE FOR SEO-FRIENDLY URLS
-- ====================================================================

BEGIN;

-- Add slug column to products table
DO $$ 
BEGIN
    -- Add slug column (unique, for SEO-friendly URLs)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'products' 
        AND column_name = 'slug'
    ) THEN
        ALTER TABLE public.products ADD COLUMN slug TEXT UNIQUE;
    END IF;
END $$;

-- Create function to generate slug from product name
CREATE OR REPLACE FUNCTION generate_product_slug(product_name TEXT, product_id UUID)
RETURNS TEXT AS $$
DECLARE
    base_slug TEXT;
    final_slug TEXT;
    counter INTEGER := 0;
BEGIN
    -- Convert name to lowercase, replace spaces with hyphens, remove special chars
    base_slug := lower(regexp_replace(product_name, '[^a-zA-Z0-9\s-]', '', 'g'));
    base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
    base_slug := regexp_replace(base_slug, '-+', '-', 'g');
    base_slug := trim(both '-' from base_slug);
    
    -- Append short UUID to ensure uniqueness
    final_slug := base_slug || '-' || substring(product_id::text from 1 for 8);
    
    RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- Update existing products to have slugs
UPDATE public.products
SET slug = generate_product_slug(name, id)
WHERE slug IS NULL;

-- Create trigger to auto-generate slug for new products
CREATE OR REPLACE FUNCTION auto_generate_product_slug()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug := generate_product_slug(NEW.name, NEW.id);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists and create new one
DROP TRIGGER IF EXISTS trigger_auto_generate_product_slug ON public.products;
CREATE TRIGGER trigger_auto_generate_product_slug
    BEFORE INSERT OR UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION auto_generate_product_slug();

COMMIT;

-- ====================================================================
-- VERIFICATION
-- ====================================================================
-- After running this:
-- ✅ All existing products will have SEO-friendly slugs
-- ✅ New products will automatically get slugs
-- ✅ Slugs are unique (enforced by database)
-- ✅ URLs will be like: /products/mens-cotton-tshirt-1e8acca5
-- ====================================================================

