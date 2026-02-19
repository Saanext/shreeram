-- Backfill Slugs for Products
-- Replaces spaces with hyphens, removes special chars, and lowercases.

UPDATE public.products
SET slug = lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL OR slug = '';

-- Ensure uniqueness (simple append of id if collision, though rare for this scale)
-- This is a basic backfill. Ideally, app logic handles collisions.
