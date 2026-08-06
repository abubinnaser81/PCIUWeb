import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Save, Plus, Trash2, Upload, FileText, BookOpen, Eye, EyeOff, Loader2, Pencil,
} from 'lucide-react';
import SectionContentEditor from '@/components/admin/journal/SectionContentEditor';

type JournalSection = {
  id: string;
  section_key: string;
  title: string;
  content: Record<string, any>;
  order_index: number;
  is_visible: boolean;
};

type JournalArchive = {
  id: string;
  volume_name: string;
  year: number;
  pdf_url: string | null;
  cover_image_url: string | null;
  description: string | null;
  order_index: number;
  is_visible: boolean;
};

export default function AdminJournal() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingSection, setEditingSection] = useState<JournalSection | null>(null);
  const [editContent, setEditContent] = useState<Record<string, any>>({});
  const [archiveDialog, setArchiveDialog] = useState(false);
  const [editingArchive, setEditingArchive] = useState<JournalArchive | null>(null);
  const [archiveForm, setArchiveForm] = useState({ volume_name: '', year: new Date().getFullYear(), description: '' });
  const [uploading, setUploading] = useState(false);

  const { data: sections = [], isLoading: sectionsLoading } = useQuery({
    queryKey: ['journal-sections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('journal_sections')
        .select('*')
        .order('order_index');
      if (error) throw error;
      return data as JournalSection[];
    },
  });

  const { data: archives = [], isLoading: archivesLoading } = useQuery({
    queryKey: ['journal-archives'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('journal_archives')
        .select('*')
        .order('order_index');
      if (error) throw error;
      return data as JournalArchive[];
    },
  });

  const updateSection = useMutation({
    mutationFn: async ({ id, content, is_visible }: { id: string; content?: Record<string, any>; is_visible?: boolean }) => {
      const update: Record<string, any> = {};
      if (content !== undefined) update.content = content;
      if (is_visible !== undefined) update.is_visible = is_visible;
      const { error } = await supabase.from('journal_sections').update(update).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journal-sections'] });
      toast({ title: 'Section updated' });
      setEditingSection(null);
    },
    onError: (e: any) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const upsertArchive = useMutation({
    mutationFn: async (archive: Partial<JournalArchive> & { id?: string }) => {
      if (archive.id) {
        const { error } = await supabase.from('journal_archives').update({
          volume_name: archive.volume_name,
          year: archive.year,
          description: archive.description,
        }).eq('id', archive.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('journal_archives').insert([{
          volume_name: archive.volume_name!,
          year: archive.year!,
          description: archive.description,
          order_index: archive.order_index ?? 0,
        }]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journal-archives'] });
      toast({ title: 'Archive saved' });
      setArchiveDialog(false);
      setEditingArchive(null);
    },
    onError: (e: any) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const deleteArchive = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('journal_archives').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journal-archives'] });
      toast({ title: 'Archive deleted' });
    },
  });

  const toggleArchiveVisibility = useMutation({
    mutationFn: async ({ id, is_visible }: { id: string; is_visible: boolean }) => {
      const { error } = await supabase.from('journal_archives').update({ is_visible }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['journal-archives'] }),
  });

  const handleUploadPdf = async (archiveId: string, file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const path = `archives/${archiveId}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('journal-files').upload(path, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from('journal-files').getPublicUrl(path);
      await supabase.from('journal_archives').update({ pdf_url: urlData.publicUrl }).eq('id', archiveId);
      queryClient.invalidateQueries({ queryKey: ['journal-archives'] });
      toast({ title: 'PDF uploaded successfully' });
    } catch (e: any) {
      toast({ title: 'Upload failed', description: e.message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const openEditSection = (section: JournalSection) => {
    setEditingSection(section);
    setEditContent(section.content as Record<string, any>);
  };

  const saveSection = () => {
    if (!editingSection) return;
    updateSection.mutate({ id: editingSection.id, content: editContent });
  };

  const openArchiveDialog = (archive?: JournalArchive) => {
    if (archive) {
      setEditingArchive(archive);
      setArchiveForm({ volume_name: archive.volume_name, year: archive.year, description: archive.description || '' });
    } else {
      setEditingArchive(null);
      setArchiveForm({ volume_name: '', year: new Date().getFullYear(), description: '' });
    }
    setArchiveDialog(true);
  };

  const saveArchive = () => {
    const payload: any = {
      volume_name: archiveForm.volume_name,
      year: archiveForm.year,
      description: archiveForm.description || null,
    };
    if (editingArchive) payload.id = editingArchive.id;
    else payload.order_index = archives.length;
    upsertArchive.mutate(payload);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Port City News.com Management</h1>
          <p className="text-sm text-muted-foreground">Manage page sections, editorial boards, and PDF archives.</p>
        </div>

        <Tabs defaultValue="sections">
          <TabsList>
            <TabsTrigger value="sections">Page Sections</TabsTrigger>
            <TabsTrigger value="archives">Journal Archives</TabsTrigger>
          </TabsList>

          {/* SECTIONS TAB */}
          <TabsContent value="sections" className="space-y-4 mt-4">
            {sectionsLoading ? (
              <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin" /></div>
            ) : (
              sections.map((section) => (
                <Card key={section.id} className="border border-border">
                  <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-base">{section.title}</CardTitle>
                      <Badge variant="outline" className="text-xs">{section.section_key}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        {section.is_visible ? <Eye className="w-3.5 h-3.5 text-green-600" /> : <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />}
                        <Switch
                          checked={section.is_visible}
                          onCheckedChange={(v) => updateSection.mutate({ id: section.id, is_visible: v })}
                        />
                      </div>
                      <Button size="sm" variant="outline" onClick={() => openEditSection(section)}>
                        <Pencil className="w-3.5 h-3.5 mr-1" /> Edit Content
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))
            )}
          </TabsContent>

          {/* ARCHIVES TAB */}
          <TabsContent value="archives" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-foreground">Journal Volumes</h3>
              <Button size="sm" onClick={() => openArchiveDialog()}>
                <Plus className="w-4 h-4 mr-1" /> Add Volume
              </Button>
            </div>

            {archivesLoading ? (
              <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin" /></div>
            ) : archives.length === 0 ? (
              <Card className="border-dashed"><CardContent className="py-8 text-center text-muted-foreground">No archives yet.</CardContent></Card>
            ) : (
              <div className="grid gap-4">
                {archives.map((archive) => (
                  <Card key={archive.id} className="border border-border">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-16 bg-primary/10 rounded flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{archive.volume_name} ({archive.year})</p>
                          {archive.pdf_url ? (
                            <a href={archive.pdf_url} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline flex items-center gap-1">
                              <FileText className="w-3 h-3" /> View PDF
                            </a>
                          ) : (
                            <span className="text-xs text-muted-foreground">No PDF uploaded</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={archive.is_visible}
                          onCheckedChange={(v) => toggleArchiveVisibility.mutate({ id: archive.id, is_visible: v })}
                        />
                        <Label htmlFor={`pdf-${archive.id}`} className="cursor-pointer">
                          <Button size="sm" variant="outline" asChild disabled={uploading}>
                            <span>
                              {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <Upload className="w-3.5 h-3.5 mr-1" />}
                              Upload PDF
                            </span>
                          </Button>
                        </Label>
                        <input
                          id={`pdf-${archive.id}`}
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUploadPdf(archive.id, file);
                          }}
                        />
                        <Button size="sm" variant="outline" onClick={() => openArchiveDialog(archive)}>
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteArchive.mutate(archive.id)}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Section Dialog */}
      <Dialog open={!!editingSection} onOpenChange={(o) => !o && setEditingSection(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit: {editingSection?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <SectionContentEditor
              sectionKey={editingSection?.section_key || ''}
              content={editContent}
              onChange={setEditContent}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingSection(null)}>Cancel</Button>
            <Button onClick={saveSection} disabled={updateSection.isPending}>
              <Save className="w-4 h-4 mr-1" /> Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Archive Dialog */}
      <Dialog open={archiveDialog} onOpenChange={setArchiveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingArchive ? 'Edit Volume' : 'Add New Volume'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Volume Name</Label>
              <Input value={archiveForm.volume_name} onChange={(e) => setArchiveForm({ ...archiveForm, volume_name: e.target.value })} placeholder="e.g. Vol. 4" />
            </div>
            <div>
              <Label>Year</Label>
              <Input type="number" value={archiveForm.year} onChange={(e) => setArchiveForm({ ...archiveForm, year: parseInt(e.target.value) })} />
            </div>
            <div>
              <Label>Description (optional)</Label>
              <Textarea value={archiveForm.description} onChange={(e) => setArchiveForm({ ...archiveForm, description: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setArchiveDialog(false)}>Cancel</Button>
            <Button onClick={saveArchive} disabled={upsertArchive.isPending}>
              <Save className="w-4 h-4 mr-1" /> Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
