import { Link, useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Search, FileText, Eye, EyeOff, Loader2, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMemo, useState } from 'react';
import { getAdminEditPath, getPageSortOrder } from '@/lib/page-management';

export default function PagesPanel() {
  const { id: activePageId } = useParams();
  const location = useLocation();
  const [search, setSearch] = useState('');

  const { data: pages, isLoading } = useQuery({
    queryKey: ['admin-pages-panel'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('id, title, slug, is_published, updated_at')
        .order('updated_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filtered = useMemo(() => {
    if (!pages) return [];

    return pages
      .filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const orderDiff = getPageSortOrder(a.slug) - getPageSortOrder(b.slug);
        if (orderDiff !== 0) return orderDiff;
        return a.title.localeCompare(b.title);
      });
  }, [pages, search]);

  return (
    <div className="w-64 border-l border-border bg-card flex flex-col h-full">
      <div className="p-3 border-b border-border space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Pages</h3>
          <Button asChild size="icon" variant="ghost" className="h-7 w-7">
            <Link to="/admin/pages/new">
              <Plus className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 pl-7 text-xs"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-0.5">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          ) : filtered && filtered.length > 0 ? (
            filtered.map((page) => {
              const editPath = getAdminEditPath(page);
              const isActive = activePageId === page.id || (page.slug === 'home' && location.pathname === '/admin/homepage');

              return (
                <Link
                  key={page.id}
                  to={editPath}
                  className={cn(
                    'flex items-start gap-2 p-2 rounded-md text-sm transition-colors hover:bg-muted',
                    isActive && 'bg-primary/5 border border-primary/20'
                  )}
                >
                  {page.slug === 'home' ? (
                    <Home className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                  ) : (
                    <FileText className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-xs truncate">{page.title}</p>
                    <p className="text-[10px] text-muted-foreground truncate">/{page.slug}</p>
                  </div>
                  {page.is_published ? (
                    <Eye className="h-3 w-3 text-accent flex-shrink-0 mt-1" />
                  ) : (
                    <EyeOff className="h-3 w-3 text-muted-foreground flex-shrink-0 mt-1" />
                  )}
                </Link>
              );
            })
          ) : (
            <p className="text-xs text-muted-foreground text-center py-4">No pages found</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
