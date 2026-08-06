import { ComponentType, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { supabase } from '@/integrations/supabase/client';
import type { BlockContent } from '@/components/admin/blocks/BlockTypes';

interface ManagedPageRouteProps {
  slug: string;
  fallback: ComponentType;
}

export default function ManagedPageRoute({ slug, fallback: Fallback }: ManagedPageRouteProps) {
  const { data: page, isLoading: pageLoading } = useQuery({
    queryKey: ['managed-page', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  const { data: blocks = [], isLoading: blocksLoading } = useQuery({
    queryKey: ['managed-page-blocks', page?.id],
    queryFn: async () => {
      if (!page?.id) return [];

      const { data, error } = await supabase
        .from('page_blocks')
        .select('*')
        .eq('page_id', page.id)
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!page?.id,
  });

  const hasManagedContent = Boolean(page && blocks.length > 0);

  useEffect(() => {
    if (!hasManagedContent || !page) return;

    document.title = `${page.title} | Port City International University`;
    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription && page.meta_description) {
      metaDescription.setAttribute('content', page.meta_description);
    }
  }, [hasManagedContent, page]);

  if (pageLoading || (page && blocksLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!hasManagedContent) {
    return <Fallback />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {blocks.map((block) => (
          <BlockRenderer
            key={block.id}
            blockType={block.block_type}
            content={block.content as BlockContent}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}
