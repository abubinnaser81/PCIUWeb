
-- 1. Storage bucket for media
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('media', 'media', true, 52428800, ARRAY['image/jpeg','image/png','image/gif','image/webp','image/svg+xml','application/pdf','video/mp4','video/webm']);

-- Storage policies
CREATE POLICY "Anyone can view media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Admins can upload media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));

-- 2. Media files table (metadata)
CREATE TABLE public.media_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT NOT NULL DEFAULT 0,
  mime_type TEXT NOT NULL,
  alt_text TEXT,
  folder TEXT DEFAULT 'general',
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view media files" ON public.media_files FOR SELECT USING (true);
CREATE POLICY "Admins can manage media files" ON public.media_files FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 3. Activity log table
CREATE TABLE public.activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  entity_title TEXT,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view activity log" ON public.activity_log FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert activity log" ON public.activity_log FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 4. Page revisions table
CREATE TABLE public.page_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  meta_description TEXT,
  content JSONB DEFAULT '{}',
  blocks JSONB DEFAULT '[]',
  revision_note TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.page_revisions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view revisions" ON public.page_revisions FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage revisions" ON public.page_revisions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 5. Add schedule_at and status to pages
ALTER TABLE public.pages ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'draft';
ALTER TABLE public.pages ADD COLUMN IF NOT EXISTS schedule_at TIMESTAMPTZ;

-- 6. Page templates table
CREATE TABLE public.page_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  blocks JSONB DEFAULT '[]',
  thumbnail_url TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.page_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view templates" ON public.page_templates FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage templates" ON public.page_templates FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Update triggers
CREATE TRIGGER update_media_files_updated_at BEFORE UPDATE ON public.media_files FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_page_templates_updated_at BEFORE UPDATE ON public.page_templates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
