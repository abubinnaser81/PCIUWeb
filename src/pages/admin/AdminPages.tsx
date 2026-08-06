import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, EyeOff, Home } from 'lucide-react';
import { format } from 'date-fns';
import { getAdminEditPath, getPageSortOrder, isFixedRouteSlug } from '@/lib/page-management';

export default function AdminPages() {
  const [search, setSearch] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: pages, isLoading } = useQuery({
    queryKey: ['admin-pages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('updated_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('pages').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pages'] });
      toast({ title: 'Page deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to delete page', variant: 'destructive' });
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: async ({ id, isPublished }: { id: string; isPublished: boolean }) => {
      const { error } = await supabase.from('pages').update({ is_published: !isPublished }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pages'] });
      toast({ title: 'Page status updated' });
    },
    onError: () => {
      toast({ title: 'Failed to update page', variant: 'destructive' });
    },
  });

  const filteredPages = useMemo(() => {
    if (!pages) return [];

    return pages
      .filter((page) =>
        page.title.toLowerCase().includes(search.toLowerCase()) ||
        page.slug.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const orderDiff = getPageSortOrder(a.slug) - getPageSortOrder(b.slug);
        if (orderDiff !== 0) return orderDiff;
        return a.title.localeCompare(b.title);
      });
  }, [pages, search]);

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pages</h1>
            <p className="text-muted-foreground">Manage your website pages</p>
          </div>
          <Button asChild>
            <Link to="/admin/pages/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Page
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search pages..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : filteredPages && filteredPages.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPages.map((page) => {
                    const editPath = getAdminEditPath(page);
                    const isFixedRoute = isFixedRouteSlug(page.slug);

                    return (
                      <TableRow key={page.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {page.slug === 'home' && <Home className="h-4 w-4 text-muted-foreground" />}
                            <span>{page.title}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">/{page.slug}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                              page.is_published
                                ? 'bg-accent/20 text-accent'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {page.is_published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                            {page.is_published ? 'Published' : 'Draft'}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {format(new Date(page.updated_at), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link to={editPath}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  {isFixedRoute ? 'Edit Live Page' : 'Edit'}
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => togglePublishMutation.mutate({ id: page.id, isPublished: page.is_published })}
                              >
                                {page.is_published ? (
                                  <>
                                    <EyeOff className="mr-2 h-4 w-4" />
                                    Unpublish
                                  </>
                                ) : (
                                  <>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Publish
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => deleteMutation.mutate(page.id)}
                                className="text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No pages found</p>
                <Button asChild>
                  <Link to="/admin/pages/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create your first page
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
