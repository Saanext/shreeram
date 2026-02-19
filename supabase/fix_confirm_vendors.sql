-- Confirm Email for Approved Vendors

-- This script sets email_confirmed_at to NOW() for all users who have an entry in the 'vendors' table.
-- This is necessary because Supabase Auth requires email confirmation by default, and we want to auto-confirm approved vendors.

UPDATE auth.users
SET email_confirmed_at = now()
WHERE id IN (SELECT id FROM public.vendors)
AND email_confirmed_at IS NULL;

-- Also confirm for pending applications if necessary? No, only approved ones in vendors table.
