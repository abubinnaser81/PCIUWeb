import { useState, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Upload, Search, Image as ImageIcon, FileText, Film, Trash2, MoreHorizontal,
  FolderOpen, Eye, Copy, Loader2, Grid, List, X,
} from 'lucide-react';
import { format } from 'date-fns';

const FOLDERS = ['general', 'banners', 'gallery', 'documents', 'videos'];

function formatFileSize(bytes: number) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function getFileIcon(mimeType: string) {
  if (mimeType.startsWith('image/')) return ImageIcon;
  if (mimeType.startsWith('video/')) return Film;
  return FileText;
}

export default function AdminMedia() {
  const [search, setSearch] = useState('');
  const [folder, setFolder] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: mediaFiles, isLoading } = useQuery({
    queryKey: ['media-files', folder],
    queryFn: async () => {
      let query = supabase.from('media_files').select('*').order('created_at', { ascending: false });
      if (folder !== 'all') query = query.eq('folder', folder);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (file: any) => {
      await supabase.storage.from('media').remove([file.file_path]);
      const { error } = await supabase.from('media_files').delete().eq('id', file.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media-files'] });
      toast({ title: 'File deleted' });
      setPreviewOpen(false);
    },
    onError: () => {
      toast({ title: 'Failed to delete file', variant: 'destructive' });
    },
  });

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const ext = file.name.split('.').pop();
        const filePath = `${folder === 'all' ? 'general' : folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

        const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file);
        if (uploadError) throw uploadError;

        const { error: insertError } = await supabase.from('media_files').insert({
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
          mime_type: file.type,
          folder: folder === 'all' ? 'general' : folder,
          uploaded_by: user?.id,
        });
        if (insertError) throw insertError;
      }
      queryClient.invalidateQueries({ queryKey: ['media-files'] });
      toast({ title: `${files.length} file(s) uploaded` });
    } catch (err: any) {
      toast({ title: 'Upload failed', description: err.message, variant: 'destructive' });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }, [folder, user, queryClient, toast]);

  const getPublicUrl = (filePath: string) => {
    const { data } = supabase.storage.from('media').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const copyUrl = (filePath: string) => {
    navigator.clipboard.writeText(getPublicUrl(filePath));
    toast({ title: 'URL copied to clipboard' });
  };

  const filtered = mediaFiles?.filter(f =>
    f.file_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Media Library</h1>
            <p className="text-sm text-muted-foreground">Manage images, documents, and videos</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
              {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
            </Button>
            <Button asChild disabled={uploading}>
              <label className="cursor-pointer">
                {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                Upload Files
                <input type="file" multiple className="hidden" onChange={handleUpload} accept="image/*,application/pdf,video/mp4,video/webm" />
              </label>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search files..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={folder} onValueChange={setFolder}>
            <SelectTrigger className="w-40">
              <FolderOpen className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Folders</SelectItem>
              {FOLDERS.map(f => <SelectItem key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card><CardContent className="p-3 text-center"><p className="text-2xl font-bold">{mediaFiles?.length ?? 0}</p><p className="text-xs text-muted-foreground">Total Files</p></CardContent></Card>
          <Card><CardContent className="p-3 text-center"><p className="text-2xl font-bold">{mediaFiles?.filter(f => f.mime_type.startsWith('image/')).length ?? 0}</p><p className="text-xs text-muted-foreground">Images</p></CardContent></Card>
          <Card><CardContent className="p-3 text-center"><p className="text-2xl font-bold">{mediaFiles?.filter(f => f.mime_type === 'application/pdf').length ?? 0}</p><p className="text-xs text-muted-foreground">Documents</p></CardContent></Card>
          <Card><CardContent className="p-3 text-center"><p className="text-2xl font-bold">{mediaFiles?.filter(f => f.mime_type.startsWith('video/')).length ?? 0}</p><p className="text-xs text-muted-foreground">Videos</p></CardContent></Card>
        </div>

        {/* File Grid/List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
        ) : filtered && filtered.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {filtered.map(file => {
                const FileIcon = getFileIcon(file.mime_type);
                const isImage = file.mime_type.startsWith('image/');
                return (
                  <Card key={file.id} className="group cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all" onClick={() => { setSelectedFile(file); setPreviewOpen(true); }}>
                    <div className="aspect-square relative bg-muted/50 rounded-t-lg overflow-hidden">
                      {isImage ? (
                        <img src={getPublicUrl(file.file_path)} alt={file.alt_text || file.file_name} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><FileIcon className="h-10 w-10 text-muted-foreground" /></div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Eye className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <CardContent className="p-2">
                      <p className="text-xs font-medium truncate">{file.file_name}</p>
                      <p className="text-[10px] text-muted-foreground">{formatFileSize(file.file_size)}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead><tr className="border-b"><th className="p-3 text-left font-medium">File</th><th className="p-3 text-left font-medium">Type</th><th className="p-3 text-left font-medium">Size</th><th className="p-3 text-left font-medium">Folder</th><th className="p-3 text-left font-medium">Date</th><th className="p-3 w-10"></th></tr></thead>
                  <tbody>
                    {filtered.map(file => {
                      const FileIcon = getFileIcon(file.mime_type);
                      return (
                        <tr key={file.id} className="border-b hover:bg-muted/30 cursor-pointer" onClick={() => { setSelectedFile(file); setPreviewOpen(true); }}>
                          <td className="p-3 flex items-center gap-2"><FileIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" /><span className="truncate max-w-[200px]">{file.file_name}</span></td>
                          <td className="p-3"><Badge variant="secondary" className="text-[10px]">{file.mime_type.split('/')[1]}</Badge></td>
                          <td className="p-3 text-muted-foreground">{formatFileSize(file.file_size)}</td>
                          <td className="p-3 text-muted-foreground capitalize">{file.folder}</td>
                          <td className="p-3 text-muted-foreground">{format(new Date(file.created_at), 'MMM d, yyyy')}</td>
                          <td className="p-3">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></Button></DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={e => { e.stopPropagation(); copyUrl(file.file_path); }}><Copy className="mr-2 h-3.5 w-3.5" />Copy URL</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive" onClick={e => { e.stopPropagation(); deleteMutation.mutate(file); }}><Trash2 className="mr-2 h-3.5 w-3.5" />Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-lg bg-muted/20">
            <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground mb-1">No media files yet</p>
            <p className="text-xs text-muted-foreground">Upload images, documents, or videos to get started</p>
          </div>
        )}
      </div>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="truncate pr-6">{selectedFile?.file_name}</DialogTitle>
            <DialogDescription>Uploaded {selectedFile ? format(new Date(selectedFile.created_at), 'MMMM d, yyyy') : ''}</DialogDescription>
          </DialogHeader>
          {selectedFile && (
            <div className="space-y-4">
              {selectedFile.mime_type.startsWith('image/') ? (
                <div className="max-h-[400px] overflow-hidden rounded-lg bg-muted/30">
                  <img src={getPublicUrl(selectedFile.file_path)} alt={selectedFile.alt_text || selectedFile.file_name} className="w-full h-auto object-contain max-h-[400px]" />
                </div>
              ) : selectedFile.mime_type.startsWith('video/') ? (
                <video controls className="w-full rounded-lg"><source src={getPublicUrl(selectedFile.file_path)} type={selectedFile.mime_type} /></video>
              ) : (
                <div className="flex items-center justify-center py-12 bg-muted/30 rounded-lg">
                  <FileText className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Size:</span> {formatFileSize(selectedFile.file_size)}</div>
                <div><span className="text-muted-foreground">Type:</span> {selectedFile.mime_type}</div>
                <div><span className="text-muted-foreground">Folder:</span> <span className="capitalize">{selectedFile.folder}</span></div>
                <div><span className="text-muted-foreground">Path:</span> <span className="truncate">{selectedFile.file_path}</span></div>
              </div>
              <DialogFooter className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => copyUrl(selectedFile.file_path)}><Copy className="mr-2 h-3.5 w-3.5" />Copy URL</Button>
                <Button variant="outline" size="sm" onClick={() => window.open(getPublicUrl(selectedFile.file_path), '_blank')}><Eye className="mr-2 h-3.5 w-3.5" />Open in New Tab</Button>
                <Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(selectedFile)}><Trash2 className="mr-2 h-3.5 w-3.5" />Delete</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
