import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import PagesPanel from '@/components/admin/PagesPanel';
import PagePreview from '@/components/admin/PagePreview';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import SortableBlock from '@/components/admin/blocks/SortableBlock';
import { Block, BlockContent, BLOCK_TYPES } from '@/components/admin/blocks/BlockTypes';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { validateBlockContent } from '@/lib/sanitize';
import { createStarterBlocks, getPublicPathForSlug, isFixedRouteSlug } from '@/lib/page-management';
import { Save, ArrowLeft, Eye, Loader2, Image, Type, LayoutGrid, MousePointer, List, Mail, Images, Plus, FileText, ExternalLink } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Image, Type, LayoutGrid, MousePointer, List, Mail, Images,
};

export default function PageEditor() {
  const { id } = useParams();
  const isNew = !id || id === 'new';
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [hasInitializedBlocks, setHasInitializedBlocks] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const { data: page, isLoading } = useQuery({
    queryKey: ['page', id],
    queryFn: async () => {
      if (isNew) return null;
      const { data, error } = await supabase.from('pages').select('*').eq('id', id).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !isNew,
  });

  const { data: pageBlocks } = useQuery({
    queryKey: ['page-blocks', id],
    queryFn: async () => {
      if (isNew) return [];
      const { data, error } = await supabase.from('page_blocks').select('*').eq('page_id', id).order('order_index', { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !isNew,
  });

  useEffect(() => {
    if (page) {
      setTitle(page.title);
      setSlug(page.slug);
      setMetaDescription(page.meta_description || '');
      setIsPublished(page.is_published ?? false);
    }
  }, [page]);

  useEffect(() => {
    setHasInitializedBlocks(false);
    setBlocks([]);
  }, [id, isNew]);

  useEffect(() => {
    if (isNew || hasInitializedBlocks || !page || pageBlocks === undefined) return;

    if (pageBlocks.length > 0) {
      setBlocks(pageBlocks.map((b) => ({ id: b.id, block_type: b.block_type, content: b.content as BlockContent, order_index: b.order_index })));
    } else {
      setBlocks(createStarterBlocks(page));
    }

    setHasInitializedBlocks(true);
  }, [page, pageBlocks, isNew, hasInitializedBlocks]);

  useEffect(() => {
    if (isNew && title) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    }
  }, [title, isNew]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !slug.trim()) {
      toast({ title: 'Title and slug are required', variant: 'destructive' });
      return;
    }
    for (const block of blocks) {
      const errors = validateBlockContent(block.block_type, block.content as Record<string, unknown>);
      if (errors.length > 0) {
        toast({ title: 'Invalid content', description: errors[0], variant: 'destructive' });
        return;
      }
    }
    setIsSaving(true);
    try {
      let pageId = id;
      if (isNew) {
        const { data, error } = await supabase.from('pages').insert({ title, slug, meta_description: metaDescription || null, is_published: isPublished, created_by: user?.id }).select().single();
        if (error) throw error;
        pageId = data.id;
      } else {
        const { error } = await supabase.from('pages').update({ title, slug, meta_description: metaDescription || null, is_published: isPublished }).eq('id', id);
        if (error) throw error;
        await supabase.from('page_blocks').delete().eq('page_id', id);
      }
      if (blocks.length > 0) {
        const blocksToInsert = blocks.map((block, index) => ({ page_id: pageId as string, block_type: block.block_type, content: block.content as Record<string, unknown>, order_index: index }));
        const { error: blocksError } = await supabase.from('page_blocks').insert(blocksToInsert as any);
        if (blocksError) throw blocksError;
      }
      queryClient.invalidateQueries({ queryKey: ['admin-pages'] });
      queryClient.invalidateQueries({ queryKey: ['admin-pages-panel'] });
      queryClient.invalidateQueries({ queryKey: ['page', pageId] });
      queryClient.invalidateQueries({ queryKey: ['page-blocks', pageId] });
      toast({ title: isNew ? 'Page created!' : 'Page saved!' });
      if (isNew) navigate(`/admin/pages/${pageId}`);
    } catch (error: any) {
      toast({ title: 'Failed to save', description: error.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const addBlock = (type: string) => {
    const blockDef = BLOCK_TYPES.find((b) => b.type === type);
    if (!blockDef) return;
    setBlocks([...blocks, { id: crypto.randomUUID(), block_type: type, content: { ...blockDef.defaultContent }, order_index: blocks.length }]);
  };

  const updateBlock = (id: string, content: BlockContent) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, content } : b)));
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter((b) => b.id !== id));
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex((b) => b.id === id);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === blocks.length - 1)) return;
    const newBlocks = [...blocks];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[swapIndex]] = [newBlocks[swapIndex], newBlocks[index]];
    setBlocks(newBlocks);
  };

  if (isLoading && !isNew) {
    return (
      <AdminLayout>
        <div className="flex h-full">
          <div className="flex-1 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          <PagesPanel />
        </div>
      </AdminLayout>
    );
  }

  const livePath = slug ? getPublicPathForSlug(slug) : null;
  const usesFixedRoute = Boolean(!isNew && slug && isFixedRouteSlug(slug));

  return (
    <AdminLayout>
      <div className="flex h-[calc(100vh)] overflow-hidden">
        {/* Main Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-card">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate('/admin/pages')}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-sm font-semibold">{isNew ? 'New Page' : title || 'Edit Page'}</h1>
                {!isNew && slug && <p className="text-[10px] text-muted-foreground">/{slug}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {livePath && (
                <Button asChild variant="outline" size="sm" className="h-8 text-xs">
                  <Link to={livePath} target="_blank" rel="noreferrer">
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> View Live
                  </Link>
                </Button>
              )}
              <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => setShowPreview(true)}>
                <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
              </Button>
              <Button size="sm" className="h-8 text-xs" onClick={handleSave} disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Save className="mr-1.5 h-3.5 w-3.5" />}
                {isNew ? 'Create' : 'Save'}
              </Button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-4 space-y-4">
              {usesFixedRoute && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-4">
                    <p className="text-sm text-foreground">
                      This is a live website page route. If it had no CMS content yet, I created starter editable blocks for you. Save this page and the live route will start using these editable sections.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Page Settings */}
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm">Page Settings</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Title *</Label>
                      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Page Title" className="h-9" />
                    </div>
                    <div>
                      <Label className="text-xs">Slug *</Label>
                      <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="page-slug" className="h-9" />
                      <p className="text-[10px] text-muted-foreground mt-0.5">{livePath || `/page/${slug}`}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Meta Description</Label>
                    <Textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="SEO description..." rows={2} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={isPublished} onCheckedChange={setIsPublished} />
                    <Label className="text-xs">{isPublished ? 'Published' : 'Draft'}</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Content Blocks */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold">Content Blocks</h2>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Block
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      {BLOCK_TYPES.map((bt) => {
                        const Icon = iconMap[bt.icon] || Type;
                        return (
                          <DropdownMenuItem key={bt.type} onClick={() => addBlock(bt.type)}>
                            <Icon className="mr-2 h-4 w-4" />
                            {bt.label}
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {blocks.length === 0 ? (
                  <div className="text-center py-16 border-2 border-dashed rounded-lg bg-muted/20">
                    <FileText className="h-8 w-8 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-sm text-muted-foreground mb-1">No content blocks yet</p>
                    <p className="text-xs text-muted-foreground">Click "Add Block" to start building your page</p>
                  </div>
                ) : (
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                      <div className="space-y-3">
                        {blocks.map((block, index) => (
                          <SortableBlock
                            key={block.id}
                            block={block}
                            onUpdate={(content) => updateBlock(block.id, content)}
                            onDelete={() => deleteBlock(block.id)}
                            onMoveUp={() => moveBlock(block.id, 'up')}
                            onMoveDown={() => moveBlock(block.id, 'down')}
                            isFirst={index === 0}
                            isLast={index === blocks.length - 1}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Pages Panel */}
        <PagesPanel />
      </div>

      <PagePreview open={showPreview} onOpenChange={setShowPreview} title={title} blocks={blocks} />
    </AdminLayout>
  );
}
