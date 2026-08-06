
-- 1. Fix faculty_profiles: Replace overly permissive SELECT policy
DROP POLICY IF EXISTS "Authenticated users can view faculty profiles" ON faculty_profiles;

CREATE POLICY "Faculty view own profile"
  ON faculty_profiles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins view all faculty profiles"
  ON faculty_profiles FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- 2. Add explicit DELETE policy for faculty_profiles
CREATE POLICY "Faculty can delete own profile"
  ON faculty_profiles FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can delete any faculty profile"
  ON faculty_profiles FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- 3. Fix user_roles privilege escalation: restrict INSERT/UPDATE/DELETE to admins only
CREATE POLICY "Only admins can insert roles"
  ON user_roles FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update roles"
  ON user_roles FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete roles"
  ON user_roles FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- 4. Add server-side block content validation trigger
CREATE OR REPLACE FUNCTION validate_block_content()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.content::text ~* 'javascript:|data:text/html' THEN
    RAISE EXCEPTION 'Block content contains disallowed URL schemes';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_validate_block_content
  BEFORE INSERT OR UPDATE ON page_blocks
  FOR EACH ROW EXECUTE FUNCTION validate_block_content();
