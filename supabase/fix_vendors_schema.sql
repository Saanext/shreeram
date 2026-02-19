-- Fix Vendors Table Schema

-- Ensure vendors table exists (it might be created by trigger, but we need to be sure)
CREATE TABLE IF NOT EXISTS public.vendors (
    id uuid REFERENCES auth.users PRIMARY KEY,
    created_at timestamptz DEFAULT now()
);

-- Add missing columns to vendors table
DO $$
BEGIN
    -- Basic Profile
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendors' AND column_name = 'full_name') THEN
        ALTER TABLE public.vendors ADD COLUMN full_name text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendors' AND column_name = 'email') THEN
        ALTER TABLE public.vendors ADD COLUMN email text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendors' AND column_name = 'phone') THEN
        ALTER TABLE public.vendors ADD COLUMN phone text;
    END IF;
    
    -- Business Details
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendors' AND column_name = 'store_name') THEN
        ALTER TABLE public.vendors ADD COLUMN store_name text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendors' AND column_name = 'gst_number') THEN
        ALTER TABLE public.vendors ADD COLUMN gst_number text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendors' AND column_name = 'business_location') THEN
        ALTER TABLE public.vendors ADD COLUMN business_location text; -- This was the missing one
    END IF;
    
    -- Verification
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vendors' AND column_name = 'is_verified') THEN
        ALTER TABLE public.vendors ADD COLUMN is_verified boolean DEFAULT false;
    END IF;
END $$;

-- Enable RLS
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;

-- Policies (Adjust as needed)
-- 1. Vendors can view their own profile
DROP POLICY IF EXISTS "Vendors can view own profile" ON public.vendors;
CREATE POLICY "Vendors can view own profile" ON public.vendors FOR SELECT USING (auth.uid() = id);

-- 2. Vendors can update their own profile
DROP POLICY IF EXISTS "Vendors can update own profile" ON public.vendors;
CREATE POLICY "Vendors can update own profile" ON public.vendors FOR UPDATE USING (auth.uid() = id);

-- 3. Service Role can manage all (for Admin approval)
DROP POLICY IF EXISTS "Service role can manage all vendors" ON public.vendors;
CREATE POLICY "Service role can manage all vendors" ON public.vendors FOR ALL USING (auth.role() = 'service_role');
