-- ====================================================================
-- ADD MISSING COLUMNS TO EXISTING TABLES
-- This migration adds missing columns without dropping existing data
-- ====================================================================

BEGIN;

-- Add missing columns to products table
DO $$ 
BEGIN
    -- Add details column (JSONB for flexible product details)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'products' 
        AND column_name = 'details'
    ) THEN
        ALTER TABLE public.products ADD COLUMN details JSONB;
    END IF;

    -- Add original_price column (for showing discounts)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'products' 
        AND column_name = 'original_price'
    ) THEN
        ALTER TABLE public.products ADD COLUMN original_price NUMERIC;
    END IF;

    -- Add sizes column (array of available sizes)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'products' 
        AND column_name = 'sizes'
    ) THEN
        ALTER TABLE public.products ADD COLUMN sizes TEXT[];
    END IF;

    -- Add colors column (array of available colors)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'products' 
        AND column_name = 'colors'
    ) THEN
        ALTER TABLE public.products ADD COLUMN colors TEXT[];
    END IF;

    -- Add tags column (for search and filtering)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'products' 
        AND column_name = 'tags'
    ) THEN
        ALTER TABLE public.products ADD COLUMN tags TEXT[];
    END IF;

    -- Add sku column (Stock Keeping Unit)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'products'
        AND column_name = 'sku'
    ) THEN
        ALTER TABLE public.products ADD COLUMN sku TEXT;
    END IF;

    -- Add size_chart_url column (for size chart image)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'products'
        AND column_name = 'size_chart_url'
    ) THEN
        ALTER TABLE public.products ADD COLUMN size_chart_url TEXT;
    END IF;

    -- Add sub_category column (for subcategories like T-Shirts, Jeans, etc.)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'products'
        AND column_name = 'sub_category'
    ) THEN
        ALTER TABLE public.products ADD COLUMN sub_category TEXT;
    END IF;
END $$;

-- Add missing columns to orders table
DO $$ 
BEGIN
    -- Add shipping_address column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'orders' 
        AND column_name = 'shipping_address'
    ) THEN
        ALTER TABLE public.orders ADD COLUMN shipping_address TEXT;
    END IF;

    -- Add payment_method column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'orders' 
        AND column_name = 'payment_method'
    ) THEN
        ALTER TABLE public.orders ADD COLUMN payment_method TEXT;
    END IF;

    -- Add payment_status column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'orders' 
        AND column_name = 'payment_status'
    ) THEN
        ALTER TABLE public.orders ADD COLUMN payment_status TEXT DEFAULT 'pending';
    END IF;

    -- Add tracking_number column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'orders' 
        AND column_name = 'tracking_number'
    ) THEN
        ALTER TABLE public.orders ADD COLUMN tracking_number TEXT;
    END IF;
END $$;

-- Add missing columns to customers table
DO $$ 
BEGIN
    -- Add avatar_url column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'customers' 
        AND column_name = 'avatar_url'
    ) THEN
        ALTER TABLE public.customers ADD COLUMN avatar_url TEXT;
    END IF;
END $$;

-- Add missing columns to vendors table
DO $$ 
BEGIN
    -- Add logo_url column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'vendors' 
        AND column_name = 'logo_url'
    ) THEN
        ALTER TABLE public.vendors ADD COLUMN logo_url TEXT;
    END IF;

    -- Add description column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'vendors' 
        AND column_name = 'description'
    ) THEN
        ALTER TABLE public.vendors ADD COLUMN description TEXT;
    END IF;
END $$;

COMMIT;

-- Display success message
DO $$
BEGIN
    RAISE NOTICE 'Migration completed successfully! Missing columns have been added.';
END $$;

