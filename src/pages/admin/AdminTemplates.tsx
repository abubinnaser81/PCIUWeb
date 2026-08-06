import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from '@/components/ui/dialog';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Plus, LayoutTemplate, Trash2, Copy, Loader2, FileText } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminTemplates() {
  const [createOpen, setCreateOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: templates, isLoading } = useQuery({
    queryKey: ['page-templates'],
    queryFn: async () => {
      const { data, error } = await supabase.from('page_templates').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('page_templates').insert({
        name, description: description || null, blocks: [], created_by: user?.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-templates'] });
      toast({ title: 'Template created' });
      setCreateOpen(false);
      setName('');
      setDescription('');
    },
    onError: (err: any) => {
      toast({ title: 'Failed to create template', description: err.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('page_templates').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-templates'] });
      toast({ title: 'Template deleted' });
    },
  });

  const useTemplate = async (template: any) => {
    const blocks = (template.blocks as any[]) || [];
    const slug = `page-${Date.now()}`;
    const { data, error } = await supabase.from('pages').insert({
      title: `New Page from "${template.name}"`,
      slug,
      is_published: false,
      created_by: user?.id,
    }).select().single();
    if (error) {
      toast({ title: 'Failed to create page', variant: 'destructive' });
      return;
    }
    if (blocks.length > 0) {
      await supabase.from('page_blocks').insert(
        blocks.map((b: any, i: number) => ({
          page_id: data.id,
          block_type: b.block_type,
          content: b.content,
          order_index: i,
        }))
      );
    }
    toast({ title: 'Page created from template' });
    navigate(`/admin/pages/${data.id}`);
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Page Templates</h1>
            <p className="text-sm text-muted-foreground">Create reusable page layouts</p>
          </div>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" />New Template</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Template</DialogTitle>
                <DialogDescription>Create a new reusable page template</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 pt-2">
                <div><Label className="text-xs">Name *</Label><Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Department Page" /></div>
                <div><Label className="text-xs">Description</Label><Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="What this template is for..." rows={2} /></div>
              </div>
              <DialogFooter>
                <Button onClick={() => createMutation.mutate()} disabled={!name.trim()}>Create Template</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
        ) : templates && templates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map(template => (
              <Card key={template.id} className="hover:ring-2 hover:ring-primary/20 transition-all">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <LayoutTemplate className="h-5 w-5 text-primary" />
                      <CardTitle className="text-sm">{template.name}</CardTitle>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteMutation.mutate(template.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {template.description && <p className="text-xs text-muted-foreground">{template.description}</p>}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">
                      {((template.blocks as any[]) || []).length} blocks · {format(new Date(template.created_at), 'MMM d, yyyy')}
                    </span>
                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => useTemplate(template)}>
                      <Copy className="mr-1.5 h-3 w-3" />Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-lg bg-muted/20">
            <LayoutTemplate className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground mb-1">No templates yet</p>
            <p className="text-xs text-muted-foreground">Create templates to quickly build new pages</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
