
-- Journal sections table for tab content
CREATE TABLE public.journal_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.journal_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view visible journal sections"
ON public.journal_sections FOR SELECT
USING (is_visible = true);

CREATE POLICY "Admins can view all journal sections"
ON public.journal_sections FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage journal sections"
ON public.journal_sections FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_journal_sections_updated_at
BEFORE UPDATE ON public.journal_sections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Journal archives table for PDF volumes
CREATE TABLE public.journal_archives (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  volume_name TEXT NOT NULL,
  year INTEGER NOT NULL,
  pdf_url TEXT,
  cover_image_url TEXT,
  description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.journal_archives ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view visible journal archives"
ON public.journal_archives FOR SELECT
USING (is_visible = true);

CREATE POLICY "Admins can view all journal archives"
ON public.journal_archives FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage journal archives"
ON public.journal_archives FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_journal_archives_updated_at
BEFORE UPDATE ON public.journal_archives
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for journal PDFs
INSERT INTO storage.buckets (id, name, public) VALUES ('journal-files', 'journal-files', true);

CREATE POLICY "Anyone can view journal files"
ON storage.objects FOR SELECT
USING (bucket_id = 'journal-files');

CREATE POLICY "Admins can upload journal files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'journal-files' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update journal files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'journal-files' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete journal files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'journal-files' AND public.has_role(auth.uid(), 'admin'::app_role));
