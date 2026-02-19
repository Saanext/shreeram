-- ==========================================
-- PROMOTE USER TO ADMIN (The "Bootstrap" Script)
-- ==========================================

-- INSTRUCTIONS:
-- 1. Sign up as 'shriraminterio18@gmail.com' via the public register page (/register).
--    (You will be created as a CUSTOMER automatically).
-- 2. Run this script in Supabase SQL Editor.
-- 3. It will MOVE you from 'customers' table to 'admins' table.

DO $$
DECLARE
  target_email TEXT := 'shriraminterio18@gmail.com';  -- <--- CHANGE THIS IF NEEDED
  target_user_id UUID;
BEGIN

  -- 1. Find the User ID from Authentication Table
  SELECT id INTO target_user_id FROM auth.users WHERE email = target_email;

  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User % not found! Please sign up first at /register', target_email;
  END IF;

  -- 2. Remove from Customers Table (if present)
  -- Because our trigger puts everyone there by default.
  DELETE FROM public.customers WHERE id = target_user_id;
  
  -- 3. Also check Vendors Table (just in case)
  DELETE FROM public.vendors WHERE id = target_user_id;

  -- 4. Insert into Admins Table
  INSERT INTO public.admins (id, full_name, email, permissions)
  VALUES (
    target_user_id, 
    'Super Admin', 
    target_email, 
    '{"all": true}'::jsonb
  )
  ON CONFLICT (id) DO UPDATE 
  SET permissions = '{"all": true}'::jsonb;

  RAISE NOTICE 'SUCCESS: User % is now an ADMIN.', target_email;

END $$;
