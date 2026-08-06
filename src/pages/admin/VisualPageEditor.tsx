import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { EditModeProvider } from '@/contexts/EditModeContext';
import SectionEditorPanel from '@/components/admin/SectionEditorPanel';
import type { DepartmentContent } from '@/hooks/useDepartmentContent';
import { BBA_DEFAULTS } from '@/pages/DepartmentBBA';
import { CSE_DEFAULTS } from '@/pages/DepartmentCSE';
import { EEE_DEFAULTS } from '@/pages/DepartmentEEE';
import { CIVIL_DEFAULTS } from '@/pages/DepartmentCivil';
import { ENGLISH_DEFAULTS } from '@/pages/DepartmentEnglish';
import { LAW_DEFAULTS } from '@/pages/DepartmentLaw';
import { JOURNALISM_DEFAULTS } from '@/pages/DepartmentJournalism';
import { TEXTILE_DEFAULTS } from '@/pages/DepartmentTextile';
import { FASHION_DEFAULTS } from '@/pages/DepartmentFashion';

// Map page slugs to their components
import DepartmentBBA from '@/pages/DepartmentBBA';
import DepartmentCSE from '@/pages/DepartmentCSE';
import DepartmentEEE from '@/pages/DepartmentEEE';
import DepartmentCivil from '@/pages/DepartmentCivil';
import DepartmentEnglish from '@/pages/DepartmentEnglish';
import DepartmentLaw from '@/pages/DepartmentLaw';
import DepartmentJournalism from '@/pages/DepartmentJournalism';
import DepartmentTextile from '@/pages/DepartmentTextile';
import DepartmentFashion from '@/pages/DepartmentFashion';
import Library from '@/pages/Library';
import Notices from '@/pages/Notices';
import IQAC from '@/pages/IQAC';
import FacultyList from '@/pages/FacultyList';
import AdmissionRequirement from '@/pages/AdmissionRequirement';
import VCMessagePage from '@/pages/VCMessage';
import Management from '@/pages/Management';

const PAGE_COMPONENTS: Record<string, React.ComponentType> = {
  'department-bba': DepartmentBBA,
  'department-cse': DepartmentCSE,
  'department-eee': DepartmentEEE,
  'department-civil': DepartmentCivil,
  'department-english': DepartmentEnglish,
  'department-law': DepartmentLaw,
  'department-journalism': DepartmentJournalism,
  'department-textile': DepartmentTextile,
  'department-fashion': DepartmentFashion,
  library: Library,
  notices: Notices,
  iqac: IQAC,
  faculty: FacultyList,
  'admission-requirement': AdmissionRequirement,
  'vice-chancellors-message': VCMessagePage,
  management: Management,
};

// Default content per slug so the editor shows current values
const PAGE_DEFAULTS: Record<string, DepartmentContent> = {
  'department-bba': BBA_DEFAULTS as DepartmentContent,
  'department-cse': CSE_DEFAULTS as DepartmentContent,
  'department-eee': EEE_DEFAULTS as DepartmentContent,
  'department-civil': CIVIL_DEFAULTS as DepartmentContent,
  'department-english': ENGLISH_DEFAULTS as DepartmentContent,
  'department-law': LAW_DEFAULTS as DepartmentContent,
  'department-journalism': JOURNALISM_DEFAULTS as DepartmentContent,
  'department-textile': TEXTILE_DEFAULTS as DepartmentContent,
  'department-fashion': FASHION_DEFAULTS as DepartmentContent,
};

export default function VisualPageEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState<DepartmentContent>({});

  const { data: page, isLoading } = useQuery({
    queryKey: ['page', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('pages').select('*').eq('id', id).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (page) {
      const dbContent = (page.content && typeof page.content === 'object') ? page.content as DepartmentContent : {};
      const defaults = PAGE_DEFAULTS[page.slug] || {};
      // Merge defaults with DB content so editor fields are pre-populated
      const merged: DepartmentContent = { ...defaults };
      for (const key of Object.keys(dbContent) as Array<keyof DepartmentContent>) {
        const val = dbContent[key];
        if (val !== undefined && val !== null && (typeof val !== 'string' || val !== '') && (!Array.isArray(val) || val.length > 0)) {
          (merged as any)[key] = val;
        }
      }
      setContent(merged);
    }
  }, [page]);

  const updateContent = useCallback((section: string, value: any) => {
    setContent((prev) => ({ ...prev, [section]: value }));
  }, []);

  const handleSave = async () => {
    if (!page) return;
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('pages')
        .update({ content: content as any })
        .eq('id', page.id);
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ['page-content', page.slug] });
      queryClient.invalidateQueries({ queryKey: ['page', id] });
      toast({ title: 'Page content saved!' });
    } catch (err: any) {
      toast({ title: 'Failed to save', description: err.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const PageComponent = page?.slug ? PAGE_COMPONENTS[page.slug] : null;

  return (
    <EditModeProvider content={content} onContentChange={updateContent}>
      {/* Floating top toolbar */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate('/admin/pages')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-sm font-semibold">{page?.title || 'Edit Page'}</h1>
              <p className="text-[10px] text-muted-foreground">Click any highlighted section to edit its content</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => navigate('/admin/pages')}>
              Cancel
            </Button>
            <Button size="sm" className="h-8 text-xs" onClick={handleSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Save className="mr-1.5 h-3.5 w-3.5" />}
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Floating section editor panel */}
      <SectionEditorPanel />

      {/* The actual page rendered with top padding for the toolbar */}
      <div className="pt-12">
        {PageComponent ? <PageComponent /> : (
          <div className="flex items-center justify-center h-96">
            <p className="text-muted-foreground">No visual editor available for this page.</p>
          </div>
        )}
      </div>
    </EditModeProvider>
  );
}
