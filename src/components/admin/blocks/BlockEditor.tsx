import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Block, BlockContent, BLOCK_TYPES } from './BlockTypes';
import RichTextEditor from './RichTextEditor';
import { GripVertical, Trash2, Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlockEditorProps {
  block: Block;
  onUpdate: (content: BlockContent) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
  dragHandleProps?: Record<string, any>;
}

export default function BlockEditor({
  block,
  onUpdate,
  onDelete,
  isFirst,
  isLast,
  dragHandleProps,
}: BlockEditorProps) {
  const [collapsed, setCollapsed] = useState(false);
  const blockType = BLOCK_TYPES.find((b) => b.type === block.block_type);
  const content = block.content;

  const updateField = (field: string, value: unknown) => {
    onUpdate({ ...content, [field]: value });
  };

  const renderEditor = () => {
    switch (block.block_type) {
      case 'hero':
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Badge (optional)</Label>
              <Input value={(content.badge as string) || ''} onChange={(e) => updateField('badge', e.target.value)} placeholder="e.g. Faculty of Business Studies" />
            </div>
            <div>
              <Label className="text-xs">Title</Label>
              <Input value={(content.title as string) || ''} onChange={(e) => updateField('title', e.target.value)} />
            </div>
            <div>
              <Label className="text-xs">Subtitle</Label>
              <Input value={(content.subtitle as string) || ''} onChange={(e) => updateField('subtitle', e.target.value)} />
            </div>
            <div>
              <Label className="text-xs">Background Image URL</Label>
              <Input value={(content.backgroundImage as string) || ''} onChange={(e) => updateField('backgroundImage', e.target.value)} placeholder="https://..." />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Button Text</Label>
                <Input value={(content.buttonText as string) || ''} onChange={(e) => updateField('buttonText', e.target.value)} />
              </div>
              <div>
                <Label className="text-xs">Button Link</Label>
                <Input value={(content.buttonLink as string) || ''} onChange={(e) => updateField('buttonLink', e.target.value)} />
              </div>
            </div>
          </div>
        );

      case 'stats': {
        const items = (content.items as Array<{ value: string; label: string }>) || [];
        return (
          <div className="space-y-3">
            <Label className="text-xs">Statistics</Label>
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input placeholder="Value (e.g. 500+)" value={item.value} onChange={(e) => { const n = [...items]; n[idx] = { ...item, value: e.target.value }; updateField('items', n); }} className="w-32" />
                <Input placeholder="Label" value={item.label} onChange={(e) => { const n = [...items]; n[idx] = { ...item, label: e.target.value }; updateField('items', n); }} />
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => updateField('items', items.filter((_, i) => i !== idx))}>
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => updateField('items', [...items, { value: '', label: '' }])}>
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Stat
            </Button>
          </div>
        );
      }

      case 'richtext':
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Heading (optional)</Label>
              <Input value={(content.heading as string) || ''} onChange={(e) => updateField('heading', e.target.value)} />
            </div>
            <div>
              <Label className="text-xs">Content</Label>
              <RichTextEditor
                value={(content.content as string) || ''}
                onChange={(val) => updateField('content', val)}
              />
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Heading (optional)</Label>
              <Input value={(content.heading as string) || ''} onChange={(e) => updateField('heading', e.target.value)} />
            </div>
            <div>
              <Label className="text-xs">Content</Label>
              <Textarea value={(content.content as string) || ''} onChange={(e) => updateField('content', e.target.value)} rows={5} />
            </div>
            <div>
              <Label className="text-xs">Alignment</Label>
              <Select value={(content.alignment as string) || 'left'} onValueChange={(v) => updateField('alignment', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Image URL</Label>
              <Input value={(content.src as string) || ''} onChange={(e) => updateField('src', e.target.value)} placeholder="https://..." />
            </div>
            {content.src && (
              <div className="rounded-md overflow-hidden border border-border max-h-32">
                <img src={content.src as string} alt="Preview" className="w-full h-32 object-cover" />
              </div>
            )}
            <div>
              <Label className="text-xs">Alt Text</Label>
              <Input value={(content.alt as string) || ''} onChange={(e) => updateField('alt', e.target.value)} />
            </div>
            <div>
              <Label className="text-xs">Caption (optional)</Label>
              <Input value={(content.caption as string) || ''} onChange={(e) => updateField('caption', e.target.value)} />
            </div>
          </div>
        );

      case 'cards': {
        const cards = (content.cards as Array<{ title: string; description: string; icon: string; link: string }>) || [];
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Columns</Label>
              <Select value={String((content.columns as number) || 3)} onValueChange={(v) => updateField('columns', parseInt(v))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Columns</SelectItem>
                  <SelectItem value="3">3 Columns</SelectItem>
                  <SelectItem value="4">4 Columns</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Cards</Label>
              {cards.map((card, idx) => (
                <div key={idx} className="p-3 bg-muted/50 rounded-md space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="flex-1 space-y-2">
                      <Input placeholder="Title" value={card.title} onChange={(e) => { const c = [...cards]; c[idx] = { ...card, title: e.target.value }; updateField('cards', c); }} />
                      <Textarea placeholder="Description" value={card.description} onChange={(e) => { const c = [...cards]; c[idx] = { ...card, description: e.target.value }; updateField('cards', c); }} rows={2} />
                      <Input placeholder="Link (optional)" value={card.link} onChange={(e) => { const c = [...cards]; c[idx] = { ...card, link: e.target.value }; updateField('cards', c); }} />
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateField('cards', cards.filter((_, i) => i !== idx))}>
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => updateField('cards', [...cards, { title: '', description: '', icon: '', link: '' }])}>
                <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Card
              </Button>
            </div>
          </div>
        );
      }

      case 'programs': {
        const programs = (content.programs as Array<{ name: string; duration: string; credits: string; description: string; concentrations: string[] }>) || [];
        return (
          <div className="space-y-3">
            <Label className="text-xs">Programs</Label>
            {programs.map((prog, idx) => (
              <div key={idx} className="p-3 bg-muted/50 rounded-md space-y-2">
                <div className="flex items-start gap-2">
                  <div className="flex-1 space-y-2">
                    <Input placeholder="Program Name" value={prog.name} onChange={(e) => { const p = [...programs]; p[idx] = { ...prog, name: e.target.value }; updateField('programs', p); }} />
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Duration" value={prog.duration} onChange={(e) => { const p = [...programs]; p[idx] = { ...prog, duration: e.target.value }; updateField('programs', p); }} />
                      <Input placeholder="Credits" value={prog.credits} onChange={(e) => { const p = [...programs]; p[idx] = { ...prog, credits: e.target.value }; updateField('programs', p); }} />
                    </div>
                    <Textarea placeholder="Description" value={prog.description} onChange={(e) => { const p = [...programs]; p[idx] = { ...prog, description: e.target.value }; updateField('programs', p); }} rows={2} />
                    <div>
                      <Label className="text-xs">Concentrations (comma-separated)</Label>
                      <Input placeholder="e.g. Finance, Marketing, HRM" value={(prog.concentrations || []).join(', ')} onChange={(e) => { const p = [...programs]; p[idx] = { ...prog, concentrations: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }; updateField('programs', p); }} />
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => updateField('programs', programs.filter((_, i) => i !== idx))}>
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => updateField('programs', [...programs, { name: '', duration: '', credits: '', description: '', concentrations: [] }])}>
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Program
            </Button>
          </div>
        );
      }

      case 'cta':
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Title</Label>
              <Input value={(content.title as string) || ''} onChange={(e) => updateField('title', e.target.value)} />
            </div>
            <div>
              <Label className="text-xs">Description</Label>
              <Textarea value={(content.description as string) || ''} onChange={(e) => updateField('description', e.target.value)} rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Button Text</Label>
                <Input value={(content.buttonText as string) || ''} onChange={(e) => updateField('buttonText', e.target.value)} />
              </div>
              <div>
                <Label className="text-xs">Button Link</Label>
                <Input value={(content.buttonLink as string) || ''} onChange={(e) => updateField('buttonLink', e.target.value)} />
              </div>
            </div>
            <div>
              <Label className="text-xs">Variant</Label>
              <Select value={(content.variant as string) || 'primary'} onValueChange={(v) => updateField('variant', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="accent">Accent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'accordion': {
        const items = (content.items as Array<{ question: string; answer: string }>) || [];
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Section Title</Label>
              <Input value={(content.title as string) || ''} onChange={(e) => updateField('title', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Items</Label>
              {items.map((item, idx) => (
                <div key={idx} className="p-3 bg-muted/50 rounded-md">
                  <div className="flex items-start gap-2">
                    <div className="flex-1 space-y-2">
                      <Input placeholder="Question" value={item.question} onChange={(e) => { const n = [...items]; n[idx] = { ...item, question: e.target.value }; updateField('items', n); }} />
                      <Textarea placeholder="Answer" value={item.answer} onChange={(e) => { const n = [...items]; n[idx] = { ...item, answer: e.target.value }; updateField('items', n); }} rows={2} />
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateField('items', items.filter((_, i) => i !== idx))}>
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => updateField('items', [...items, { question: '', answer: '' }])}>
                <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Item
              </Button>
            </div>
          </div>
        );
      }

      case 'contact':
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Title</Label>
              <Input value={(content.title as string) || ''} onChange={(e) => updateField('title', e.target.value)} />
            </div>
            <div>
              <Label className="text-xs">Email</Label>
              <Input type="email" value={(content.email as string) || ''} onChange={(e) => updateField('email', e.target.value)} />
            </div>
            <div>
              <Label className="text-xs">Phone</Label>
              <Input value={(content.phone as string) || ''} onChange={(e) => updateField('phone', e.target.value)} />
            </div>
            <div>
              <Label className="text-xs">Address</Label>
              <Textarea value={(content.address as string) || ''} onChange={(e) => updateField('address', e.target.value)} rows={2} />
            </div>
            <div>
              <Label className="text-xs">Office Hours</Label>
              <Input value={(content.hours as string) || ''} onChange={(e) => updateField('hours', e.target.value)} placeholder="e.g. Sun - Thu: 9:00 AM - 5:00 PM" />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={(content.showForm as boolean) ?? true} onCheckedChange={(v) => updateField('showForm', v)} />
              <Label className="text-xs">Show Contact Form</Label>
            </div>
          </div>
        );

      case 'gallery': {
        const images = (content.images as Array<{ src: string; alt: string }>) || [];
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Columns</Label>
              <Select value={String((content.columns as number) || 3)} onValueChange={(v) => updateField('columns', parseInt(v))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Columns</SelectItem>
                  <SelectItem value="3">3 Columns</SelectItem>
                  <SelectItem value="4">4 Columns</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Images</Label>
              {images.map((img, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input placeholder="Image URL" value={img.src} onChange={(e) => { const n = [...images]; n[idx] = { ...img, src: e.target.value }; updateField('images', n); }} />
                  <Input placeholder="Alt text" value={img.alt} onChange={(e) => { const n = [...images]; n[idx] = { ...img, alt: e.target.value }; updateField('images', n); }} className="w-32" />
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateField('images', images.filter((_, i) => i !== idx))}>
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => updateField('images', [...images, { src: '', alt: '' }])}>
                <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Image
              </Button>
            </div>
          </div>
        );
      }

      case 'notices': {
        const items = (content.items as Array<{ title: string; date: string; type: string }>) || [];
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Section Title</Label>
              <Input value={(content.title as string) || ''} onChange={(e) => updateField('title', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Notices</Label>
              {items.map((item, idx) => (
                <div key={idx} className="p-3 bg-muted/50 rounded-md">
                  <div className="flex items-start gap-2">
                    <div className="flex-1 space-y-2">
                      <Input placeholder="Notice title" value={item.title} onChange={(e) => { const n = [...items]; n[idx] = { ...item, title: e.target.value }; updateField('items', n); }} />
                      <div className="grid grid-cols-2 gap-2">
                        <Input type="date" value={item.date} onChange={(e) => { const n = [...items]; n[idx] = { ...item, date: e.target.value }; updateField('items', n); }} />
                        <Select value={item.type || 'general'} onValueChange={(v) => { const n = [...items]; n[idx] = { ...item, type: v }; updateField('items', n); }}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="admission">Admission</SelectItem>
                            <SelectItem value="exam">Exam</SelectItem>
                            <SelectItem value="event">Event</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => updateField('items', items.filter((_, i) => i !== idx))}>
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => updateField('items', [...items, { title: '', date: '', type: 'general' }])}>
                <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Notice
              </Button>
            </div>
          </div>
        );
      }

      case 'quicklinks': {
        const links = (content.links as Array<{ label: string; url: string }>) || [];
        return (
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Section Title</Label>
              <Input value={(content.title as string) || ''} onChange={(e) => updateField('title', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Links</Label>
              {links.map((link, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input placeholder="Label" value={link.label} onChange={(e) => { const n = [...links]; n[idx] = { ...link, label: e.target.value }; updateField('links', n); }} />
                  <Input placeholder="URL" value={link.url} onChange={(e) => { const n = [...links]; n[idx] = { ...link, url: e.target.value }; updateField('links', n); }} />
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => updateField('links', links.filter((_, i) => i !== idx))}>
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => updateField('links', [...links, { label: '', url: '#' }])}>
                <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Link
              </Button>
            </div>
          </div>
        );
      }

      default:
        return <div className="text-muted-foreground text-sm">Editor not available for this block type</div>;
    }
  };

  return (
    <Card className={cn("border-l-4 border-l-primary/60 transition-all", collapsed && "border-l-muted-foreground/30")}>
      <CardHeader className="flex flex-row items-center justify-between py-2.5 px-4">
        <div className="flex items-center gap-2">
          <div {...dragHandleProps} className="cursor-grab active:cursor-grabbing p-1 -ml-1 hover:bg-muted rounded">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <span className="text-sm font-medium">{blockType?.label || block.block_type}</span>
          <span className="text-[10px] px-1.5 py-0.5 bg-muted rounded text-muted-foreground">{block.block_type}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onDelete}>
            <Trash2 className="h-3.5 w-3.5 text-destructive" />
          </Button>
        </div>
      </CardHeader>
      {!collapsed && <CardContent className="pt-0 pb-4">{renderEditor()}</CardContent>}
    </Card>
  );
}
