-- Securely Get User Role Function

CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER -- Runs with privileges of the creator (postgres/admin)
SET search_path = public -- Secure search path
AS $$
DECLARE
  user_role text;
  is_admin boolean;
BEGIN
  -- 1. Check Admins Table (Highest Priority)
  IF EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()) THEN
    RETURN 'admin';
  END IF;

  -- 2. Check Vendors Table
  IF EXISTS (SELECT 1 FROM public.vendors WHERE id = auth.uid()) THEN
    RETURN 'vendor';
  END IF;

  -- 3. Check Sub-Admins Table
  IF EXISTS (SELECT 1 FROM public.sub_admins WHERE id = auth.uid()) THEN
    RETURN 'sub_admin';
  END IF;

  -- 4. Check Customers Table
  IF EXISTS (SELECT 1 FROM public.customers WHERE id = auth.uid()) THEN
    RETURN 'customer';
  END IF;

  -- 5. Fallback: Return metadata role if exists (for legacy/edge cases)
  SELECT raw_user_meta_data->>'role' INTO user_role FROM auth.users WHERE id = auth.uid();
  IF user_role IS NOT NULL THEN
    RETURN user_role;
  END IF;

  -- 6. Default
  RETURN 'customer';
END;
$$;

-- Grant access to public (authenticated users need to call this)
GRANT EXECUTE ON FUNCTION public.get_user_role() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_role() TO service_role;
