import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdmissionPopup from "@/components/AdmissionPopup";
import WhatsAppChatbot from "@/components/WhatsAppChatbot";
import HomepageSectionRenderer from "@/components/HomepageSectionRenderer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Fallback built-in components for when DB has no data
import Hero from "@/components/Hero";
import NoticeMarquee from "@/components/NoticeMarquee";
import VCMessage from "@/components/VCMessage";
import ProgramFinder from "@/components/ProgramFinder";
import Faculties from "@/components/Faculties";
import Admissions from "@/components/Admissions";
import Research from "@/components/Research";
import PhotoGallery from "@/components/PhotoGallery";
import CampusLife from "@/components/CampusLife";
import NewsEvents from "@/components/NewsEvents";

const Index = () => {
  const { data: sections, isLoading } = useQuery({
    queryKey: ['homepage-sections-public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('homepage_sections')
        .select('*')
        .eq('is_visible', true)
        .order('order_index', { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const hasDynamicSections = sections && sections.length > 0;

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-highlight text-highlight-foreground px-4 py-2 rounded-lg z-50">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        {hasDynamicSections ? (
          <HomepageSectionRenderer sections={sections as any} />
        ) : (
          <>
            <Hero />
            <NoticeMarquee />
            <VCMessage />
            <ProgramFinder />
            <Faculties />
            <Admissions />
            <Research />
            <PhotoGallery />
            <CampusLife />
            <NewsEvents />
          </>
        )}
      </main>
      <Footer />
      <AdmissionPopup />
      <WhatsAppChatbot />
    </div>
  );
};

export default Index;
