
-- Add social media and academic profile link columns to faculty_profiles
ALTER TABLE public.faculty_profiles
  ADD COLUMN IF NOT EXISTS linkedin_url text,
  ADD COLUMN IF NOT EXISTS facebook_url text,
  ADD COLUMN IF NOT EXISTS twitter_url text,
  ADD COLUMN IF NOT EXISTS website_url text,
  ADD COLUMN IF NOT EXISTS researchgate_url text,
  ADD COLUMN IF NOT EXISTS google_scholar_url text;

-- Drop the existing function first (return type changed)
DROP FUNCTION IF EXISTS public.get_public_faculty_profiles();

-- Recreate with new columns included
CREATE OR REPLACE FUNCTION public.get_public_faculty_profiles()
RETURNS TABLE(
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
  updated_at timestamptz,
  linkedin_url text,
  facebook_url text,
  twitter_url text,
  website_url text,
  researchgate_url text,
  google_scholar_url text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    fp.id,
    fp.user_id,
    fp.name,
    fp.title,
    fp.designation,
    fp.faculty,
    fp.department,
    fp.bio,
    fp.image_url,
    fp.office,
    fp.education,
    fp.publications,
    fp.experiences,
    fp.teaching_areas,
    fp.awards,
    fp.memberships,
    fp.conferences,
    fp.created_at,
    fp.updated_at,
    fp.linkedin_url,
    fp.facebook_url,
    fp.twitter_url,
    fp.website_url,
    fp.researchgate_url,
    fp.google_scholar_url
  FROM faculty_profiles fp;
$$;
