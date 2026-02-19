-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.vendor_applications (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamptz DEFAULT now()
);

-- Add columns if they don't exist (idempotent)
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

-- Enable RLS
ALTER TABLE public.vendor_applications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can insert their own application" ON public.vendor_applications;
DROP POLICY IF EXISTS "Users can view their own application" ON public.vendor_applications;
DROP POLICY IF EXISTS "Admins view all" ON public.vendor_applications;
DROP POLICY IF EXISTS "Service role can view all applications" ON public.vendor_applications;

-- Re-create policies
CREATE POLICY "Users can insert their own application" ON public.vendor_applications
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own application" ON public.vendor_applications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins view all" ON public.vendor_applications
    FOR ALL USING (auth.role() = 'service_role');


-- Storage Bucket (Idempotent)
INSERT INTO storage.buckets (id, name, public)
VALUES ('vendor-documents', 'vendor-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
DROP POLICY IF EXISTS "Users upload docs" ON storage.objects;
DROP POLICY IF EXISTS "Users view docs" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own documents" ON storage.objects;

CREATE POLICY "Users upload docs" ON storage.objects
    FOR INSERT WITH CHECK ( bucket_id = 'vendor-documents' AND auth.uid() = owner );

CREATE POLICY "Users view docs" ON storage.objects
    FOR SELECT USING ( bucket_id = 'vendor-documents' AND auth.uid() = owner );
