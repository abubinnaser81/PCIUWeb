-- Create faculty_profiles table
CREATE TABLE public.faculty_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  name TEXT NOT NULL,
  title TEXT,
  designation TEXT,
  department TEXT,
  faculty TEXT,
  email TEXT,
  phone TEXT,
  office TEXT,
  image_url TEXT,
  bio TEXT,
  education JSONB DEFAULT '[]'::jsonb,
  publications JSONB DEFAULT '[]'::jsonb,
  experiences JSONB DEFAULT '[]'::jsonb,
  teaching_areas JSONB DEFAULT '[]'::jsonb,
  awards JSONB DEFAULT '[]'::jsonb,
  memberships JSONB DEFAULT '[]'::jsonb,
  conferences JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.faculty_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Faculty can view all profiles (public display)
CREATE POLICY "Anyone can view faculty profiles"
ON public.faculty_profiles
FOR SELECT
USING (true);

-- Policy: Faculty can update their own profile
CREATE POLICY "Faculty can update their own profile"
ON public.faculty_profiles
FOR UPDATE
USING (auth.uid() = user_id);

-- Policy: Faculty can insert their own profile
CREATE POLICY "Faculty can insert their own profile"
ON public.faculty_profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_faculty_profiles_updated_at
BEFORE UPDATE ON public.faculty_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();