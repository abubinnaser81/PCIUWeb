import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { BlockContent } from '@/components/admin/blocks/BlockTypes';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

export default function DynamicPage() {
  const { slug } = useParams();

  const { data: page, isLoading: pageLoading, error } = useQuery({
    queryKey: ['public-page', slug],
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

  const { data: blocks, isLoading: blocksLoading } = useQuery({
    queryKey: ['public-page-blocks', page?.id],
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

  const isLoading = pageLoading || blocksLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
            <p className="text-muted-foreground">The page you are looking for does not exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  useEffect(() => {
    if (page) {
      document.title = `${page.title} | Port City International University`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && page.meta_description) {
        metaDesc.setAttribute('content', page.meta_description);
      }
    }
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {blocks?.map((block) => (
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
