
-- Table to store homepage sections (both built-in and custom blocks)
CREATE TABLE public.homepage_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_type TEXT NOT NULL, -- 'hero', 'notice_marquee', 'vc_message', 'program_finder', 'faculties', 'admissions', 'research', 'campus_life', 'news_events', 'custom_block'
  title TEXT NOT NULL, -- Display name for admin
  content JSONB NOT NULL DEFAULT '{}'::jsonb, -- Section-specific content/settings
  is_visible BOOLEAN NOT NULL DEFAULT true,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;

-- Anyone can view visible sections
CREATE POLICY "Anyone can view visible homepage sections"
ON public.homepage_sections
FOR SELECT
USING (is_visible = true);

-- Admins can view all sections
CREATE POLICY "Admins can view all homepage sections"
ON public.homepage_sections
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can manage sections
CREATE POLICY "Admins can manage homepage sections"
ON public.homepage_sections
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_homepage_sections_updated_at
BEFORE UPDATE ON public.homepage_sections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed with default homepage sections
INSERT INTO public.homepage_sections (section_type, title, content, is_visible, order_index) VALUES
('hero', 'Hero Banner', '{"title": "Port City International University", "subtitle": "Where the Bay Meets Brilliance — A global university in the heart of Chattogram''s port city", "stats": [{"value": "50+", "label": "Programs"}, {"value": "8", "label": "Faculties"}, {"value": "10K+", "label": "Students"}, {"value": "150+", "label": "Faculty"}, {"value": "1K+", "label": "Publications"}], "buttons": [{"text": "Apply Now", "link": "#", "variant": "primary"}, {"text": "Explore Programs", "link": "#", "variant": "outline"}, {"text": "Prospectus", "link": "#", "variant": "outline", "icon": "download"}]}', true, 0),
('notice_marquee', 'Notice Marquee', '{}', true, 1),
('vc_message', 'Vice Chancellor''s Message', '{"name": "Prof. Dr. Mohammad Tayub Chowdhury", "title": "Vice Chancellor", "message": "Port City International University located at Chattogram is a new generation private university committed to excellence in higher education and research. The vision of this university is to make it a global standard center of excellence through education, research and service. The society the way it is changing will have a profound impact on the university education. Transformative education to change the society as it demands is our mission."}', true, 2),
('program_finder', 'Program Finder', '{}', true, 3),
('faculties', 'Faculties', '{}', true, 4),
('admissions', 'Admissions', '{}', true, 5),
('research', 'Research', '{}', true, 6),
('campus_life', 'Campus Life', '{}', true, 7),
('news_events', 'News & Events', '{}', true, 8);
