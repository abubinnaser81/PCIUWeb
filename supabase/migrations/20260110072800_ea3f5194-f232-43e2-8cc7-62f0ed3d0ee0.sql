-- Drop the existing public SELECT policy
DROP POLICY IF EXISTS "Anyone can view faculty profiles" ON public.faculty_profiles;

-- Create policy: Only authenticated users can view full faculty profiles
CREATE POLICY "Authenticated users can view faculty profiles"
ON public.faculty_profiles
FOR SELECT
TO authenticated
USING (true);

-- Create a security definer function for public (anonymous) access that excludes sensitive contact info
CREATE OR REPLACE FUNCTION public.get_public_faculty_profiles()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  name text,
  title text,
  designation text,
  faculty text,
  department text,
  bio text,
  image_url text,
  office text,
  education jsonb,
  publications jsonb,
  experiences jsonb,
  teaching_areas jsonb,
  awards jsonb,
  memberships jsonb,
  conferences jsonb,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    id, user_id, name, title, designation, faculty, department, bio, image_url, office,
    education, publications, experiences, teaching_areas, awards, memberships, conferences,
    created_at, updated_at
  FROM public.faculty_profiles;
$$;

-- Grant execute to anonymous users
GRANT EXECUTE ON FUNCTION public.get_public_faculty_profiles() TO anon;
GRANT EXECUTE ON FUNCTION public.get_public_faculty_profiles() TO authenticated;