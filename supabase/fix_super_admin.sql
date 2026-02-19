-- Fix Super Admin Access (Updated Email)
-- This script promotes the specific user to admin by ensuring they exist in the 'admins' table

DO $$
DECLARE
    target_email TEXT := 'shriraminterio18@gmail.com';
    user_id UUID;
BEGIN
    -- 1. Get User ID from auth.users
    SELECT id INTO user_id FROM auth.users WHERE email = target_email;

    IF user_id IS NULL THEN
        RAISE NOTICE 'User % not found in auth.users. Please sign up first.', target_email;
    ELSE
        -- 2. Insert into admins table if not exists
        INSERT INTO public.admins (id, full_name, email, created_at, permissions)
        VALUES (
            user_id, 
            'Super Admin', 
            target_email, 
            NOW(),
            '{"all": true}'
        )
        ON CONFLICT (id) DO UPDATE 
        SET permissions = '{"all": true}';
        
        RAISE NOTICE 'User % (ID: %) has been verified as Admin.', target_email, user_id;
    END IF;
END $$;
