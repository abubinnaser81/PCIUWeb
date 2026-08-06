-- Fix: Restrict profiles table SELECT to own profile + admins
-- (was: "Anyone can view profiles" with USING (true) which exposed emails)

DROP POLICY IF EXISTS "Anyone can view profiles" ON public.profiles;

-- Users can only view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Admins can view all profiles (needed for AdminUsers page)
CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
