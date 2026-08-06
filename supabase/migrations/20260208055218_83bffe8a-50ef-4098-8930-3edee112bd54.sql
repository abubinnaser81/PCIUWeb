
-- Remove the foreign key constraint on user_id so faculty profiles can exist
-- as directory entries without requiring auth accounts
ALTER TABLE public.faculty_profiles DROP CONSTRAINT IF EXISTS faculty_profiles_user_id_fkey;
