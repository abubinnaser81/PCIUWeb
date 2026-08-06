import { useState, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowUp, ArrowDown, Eye, EyeOff, Save, Loader2, Plus, Trash2,
  GripVertical, ChevronDown, ChevronUp, Settings2, Upload, Image as ImageIcon, X
} from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

interface HomepageSection {
  id: string;
  section_type: string;
  title: string;
  content: Record<string, any>;
  is_visible: boolean;
  order_index: number;
}

const BUILT_IN_SECTIONS: Record<string, string> = {
  hero: 'Hero Banner',
  notice_marquee: 'Notice Marquee',
  vc_message: "Vice Chancellor's Message",
  program_finder: 'Program Finder',
  faculties: 'Faculties',
  admissions: 'Admissions',
  research: 'Research',
  campus_life: 'Campus Life',
  news_events: 'News & Events',
};

const CUSTOM_BLOCK_TYPES = [
  { type: 'custom_text', label: 'Text Block' },
  { type: 'custom_cta', label: 'Call to Action' },
  { type: 'custom_cards', label: 'Card Grid' },
  { type: 'custom_image', label: 'Image Block' },
];

export default function AdminHomepage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [localSections, setLocalSections] = useState<HomepageSection[] | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const { data: dbSections, isLoading } = useQuery({
    queryKey: ['homepage-sections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('homepage_sections')
        .select('*')
        .order('order_index', { ascending: true });
      if (error) throw error;
      return data as HomepageSection[];
    },
  });

  const sections = localSections ?? dbSections ?? [];

  const updateLocal = (updated: HomepageSection[]) => {
    setLocalSections(updated);
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const idx = sections.findIndex((s) => s.id === id);
    if ((direction === 'up' && idx === 0) || (direction === 'down' && idx === sections.length - 1)) return;
    const arr = [...sections];
    const swap = direction === 'up' ? idx - 1 : idx + 1;
    [arr[idx], arr[swap]] = [arr[swap], arr[idx]];
    arr.forEach((s, i) => (s.order_index = i));
    updateLocal(arr);
  };

  const toggleVisibility = (id: string) => {
    updateLocal(sections.map((s) => (s.id === id ? { ...s, is_visible: !s.is_visible } : s)));
  };

  const updateSectionContent = (id: string, content: Record<string, any>) => {
    updateLocal(sections.map((s) => (s.id === id ? { ...s, content } : s)));
  };

  const updateSectionTitle = (id: string, title: string) => {
    updateLocal(sections.map((s) => (s.id === id ? { ...s, title } : s)));
  };

  const deleteSection = (id: string) => {
    updateLocal(sections.filter((s) => s.id !== id));
  };

  const addCustomSection = (type: string, label: string) => {
    const newSection: HomepageSection = {
      id: crypto.randomUUID(),
      section_type: type,
      title: label,
      content: getDefaultContent(type),
      is_visible: true,
      order_index: sections.length,
    };
    updateLocal([...sections, newSection]);
    setAddDialogOpen(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Delete all existing, re-insert
      await supabase.from('homepage_sections').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      const toInsert = sections.map((s, i) => ({
        section_type: s.section_type,
        title: s.title,
        content: s.content,
        is_visible: s.is_visible,
        order_index: i,
      }));

      const { error } = await supabase.from('homepage_sections').insert(toInsert as any);
      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['homepage-sections'] });
      setLocalSections(null);
      toast({ title: 'Homepage saved successfully!' });
    } catch (error: any) {
      toast({ title: 'Failed to save', description: error.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  const hasChanges = localSections !== null;

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Homepage Manager</h1>
            <p className="text-muted-foreground text-sm">Manage, reorder, and customize all homepage sections</p>
          </div>
          <div className="flex items-center gap-3">
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" /> Add Section
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Section</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {CUSTOM_BLOCK_TYPES.map((bt) => (
                    <Button
                      key={bt.type}
                      variant="outline"
                      className="h-20 flex-col"
                      onClick={() => addCustomSection(bt.type, bt.label)}
                    >
                      <Plus className="h-5 w-5 mb-1" />
                      {bt.label}
                    </Button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            <Button onClick={handleSave} disabled={isSaving || !hasChanges}>
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Changes
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {sections.map((section, index) => {
            const isExpanded = expandedSection === section.id;
            const isBuiltIn = !!BUILT_IN_SECTIONS[section.section_type];

            return (
              <Card key={section.id} className={!section.is_visible ? 'opacity-60' : ''}>
                <div className="flex items-center px-4 py-3 gap-3">
                  <GripVertical className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1">
                    <span className="font-medium">{section.title}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({isBuiltIn ? 'Built-in' : 'Custom'})
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => moveSection(section.id, 'up')} disabled={index === 0}>
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => moveSection(section.id, 'down')} disabled={index === sections.length - 1}>
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => toggleVisibility(section.id)}>
                      {section.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                    >
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <Settings2 className="h-4 w-4" />}
                    </Button>
                    {!isBuiltIn && (
                      <Button variant="ghost" size="icon" onClick={() => deleteSection(section.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <CardContent className="border-t pt-4">
                    <SectionEditor
                      section={section}
                      onUpdateContent={(c) => updateSectionContent(section.id, c)}
                      onUpdateTitle={(t) => updateSectionTitle(section.id, t)}
                    />
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}

function getDefaultContent(type: string): Record<string, any> {
  switch (type) {
    case 'custom_text':
      return { heading: 'New Section', content: 'Enter your content here...', alignment: 'left' };
    case 'custom_cta':
      return { title: 'Call to Action', description: 'Description here', buttonText: 'Click Here', buttonLink: '#', variant: 'primary' };
    case 'custom_cards':
      return { cards: [{ title: 'Card 1', description: 'Description' }], columns: 3 };
    case 'custom_image':
      return { src: '', alt: 'Image', caption: '' };
    default:
      return {};
  }
}

// Section-specific editor
function SectionEditor({
  section,
  onUpdateContent,
  onUpdateTitle,
}: {
  section: HomepageSection;
  onUpdateContent: (c: Record<string, any>) => void;
  onUpdateTitle: (t: string) => void;
}) {
  const c = section.content;

  switch (section.section_type) {
    case 'hero':
      return <HeroSlideEditor content={c} onUpdateContent={onUpdateContent} />;


    case 'vc_message':
      return (
        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input value={c.name || ''} onChange={(e) => onUpdateContent({ ...c, name: e.target.value })} />
          </div>
          <div>
            <Label>Title</Label>
            <Input value={c.title || ''} onChange={(e) => onUpdateContent({ ...c, title: e.target.value })} />
          </div>
          <div>
            <Label>Message</Label>
            <Textarea value={c.message || ''} onChange={(e) => onUpdateContent({ ...c, message: e.target.value })} rows={5} />
          </div>
        </div>
      );

    case 'custom_text':
      return (
        <div className="space-y-4">
          <div>
            <Label>Section Title</Label>
            <Input value={onUpdateTitle ? section.title : ''} onChange={(e) => onUpdateTitle(e.target.value)} />
          </div>
          <div>
            <Label>Heading</Label>
            <Input value={c.heading || ''} onChange={(e) => onUpdateContent({ ...c, heading: e.target.value })} />
          </div>
          <div>
            <Label>Content</Label>
            <Textarea value={c.content || ''} onChange={(e) => onUpdateContent({ ...c, content: e.target.value })} rows={5} />
          </div>
          <div>
            <Label>Alignment</Label>
            <Select value={c.alignment || 'left'} onValueChange={(v) => onUpdateContent({ ...c, alignment: v })}>
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

    case 'custom_cta':
      return (
        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input value={c.title || ''} onChange={(e) => onUpdateContent({ ...c, title: e.target.value })} />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={c.description || ''} onChange={(e) => onUpdateContent({ ...c, description: e.target.value })} rows={3} />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label>Button Text</Label>
              <Input value={c.buttonText || ''} onChange={(e) => onUpdateContent({ ...c, buttonText: e.target.value })} />
            </div>
            <div className="flex-1">
              <Label>Button Link</Label>
              <Input value={c.buttonLink || ''} onChange={(e) => onUpdateContent({ ...c, buttonLink: e.target.value })} />
            </div>
          </div>
          <div>
            <Label>Variant</Label>
            <Select value={c.variant || 'primary'} onValueChange={(v) => onUpdateContent({ ...c, variant: v })}>
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

    case 'custom_cards':
      return (
        <div className="space-y-4">
          <div>
            <Label>Columns</Label>
            <Select value={String(c.columns || 3)} onValueChange={(v) => onUpdateContent({ ...c, columns: Number(v) })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Cards</Label>
            <div className="space-y-3 mt-2">
              {(c.cards as any[] || []).map((card: any, i: number) => (
                <Card key={i}>
                  <CardContent className="pt-4 space-y-2">
                    <Input
                      placeholder="Card Title"
                      value={card.title}
                      onChange={(e) => {
                        const cards = [...(c.cards as any[])];
                        cards[i] = { ...cards[i], title: e.target.value };
                        onUpdateContent({ ...c, cards });
                      }}
                    />
                    <Textarea
                      placeholder="Card Description"
                      value={card.description || ''}
                      onChange={(e) => {
                        const cards = [...(c.cards as any[])];
                        cards[i] = { ...cards[i], description: e.target.value };
                        onUpdateContent({ ...c, cards });
                      }}
                      rows={2}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const cards = (c.cards as any[]).filter((_, idx) => idx !== i);
                        onUpdateContent({ ...c, cards });
                      }}
                    >
                      <Trash2 className="mr-1 h-3 w-3" /> Remove
                    </Button>
                  </CardContent>
                </Card>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUpdateContent({ ...c, cards: [...(c.cards as any[] || []), { title: 'New Card', description: '' }] })}
              >
                <Plus className="mr-1 h-3 w-3" /> Add Card
              </Button>
            </div>
          </div>
        </div>
      );

    case 'custom_image':
      return (
        <div className="space-y-4">
          <div>
            <Label>Image URL</Label>
            <Input value={c.src || ''} onChange={(e) => onUpdateContent({ ...c, src: e.target.value })} />
          </div>
          <div>
            <Label>Alt Text</Label>
            <Input value={c.alt || ''} onChange={(e) => onUpdateContent({ ...c, alt: e.target.value })} />
          </div>
          <div>
            <Label>Caption</Label>
            <Input value={c.caption || ''} onChange={(e) => onUpdateContent({ ...c, caption: e.target.value })} />
          </div>
        </div>
      );

    default:
      return (
        <p className="text-muted-foreground text-sm">
          This built-in section uses its default layout. Toggle visibility and reorder as needed.
        </p>
      );
  }
}

// ─── Hero Slide Editor with Upload / Edit / Delete ────────────────────────
function HeroSlideEditor({
  content,
  onUpdateContent,
}: {
  content: Record<string, any>;
  onUpdateContent: (c: Record<string, any>) => void;
}) {
  const [uploading, setUploading] = useState<number | null>(null);
  const { toast } = useToast();

  const slides: any[] = content.slides || [];

  const updateSlide = (index: number, patch: Record<string, any>) => {
    const updated = slides.map((s, i) => (i === index ? { ...s, ...patch } : s));
    onUpdateContent({ ...content, slides: updated });
  };

  const deleteSlide = (index: number) => {
    onUpdateContent({ ...content, slides: slides.filter((_, i) => i !== index) });
  };

  const addSlide = () => {
    onUpdateContent({
      ...content,
      slides: [...slides, { image: '', title: 'New Slide', subtitle: '' }],
    });
  };

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const arr = [...slides];
    const swap = direction === 'up' ? index - 1 : index + 1;
    if (swap < 0 || swap >= arr.length) return;
    [arr[index], arr[swap]] = [arr[swap], arr[index]];
    onUpdateContent({ ...content, slides: arr });
  };

  const handleImageUpload = useCallback(
    async (index: number, file: File) => {
      setUploading(index);
      try {
        const ext = file.name.split('.').pop();
        const filePath = `banners/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
        const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file);
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('media').getPublicUrl(filePath);
        updateSlide(index, { image: data.publicUrl });
        toast({ title: 'Image uploaded successfully' });
      } catch (err: any) {
        toast({ title: 'Upload failed', description: err.message, variant: 'destructive' });
      } finally {
        setUploading(null);
      }
    },
    [slides, content, onUpdateContent, toast]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">Hero Slides ({slides.length})</Label>
        <Button variant="outline" size="sm" onClick={addSlide}>
          <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Slide
        </Button>
      </div>

      {slides.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed rounded-lg bg-muted/20">
          <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
          <p className="text-sm text-muted-foreground">No slides yet. Add one to get started.</p>
        </div>
      )}

      <div className="space-y-3">
        {slides.map((slide: any, index: number) => (
          <Card key={index} className="overflow-hidden">
            <div className="flex">
              {/* Image Preview / Upload */}
              <div className="w-48 min-h-[140px] bg-muted/50 relative flex-shrink-0 group">
                {slide.image ? (
                  <>
                    <img
                      src={slide.image}
                      alt={slide.title || `Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 gap-2">
                      <Button size="sm" variant="secondary" className="h-7 text-xs" asChild>
                        <label className="cursor-pointer">
                          <Upload className="mr-1 h-3 w-3" /> Replace
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleImageUpload(index, f);
                              e.target.value = '';
                            }}
                          />
                        </label>
                      </Button>
                    </div>
                  </>
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                    {uploading === index ? (
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    ) : (
                      <>
                        <Upload className="h-6 w-6 text-muted-foreground mb-1" />
                        <span className="text-xs text-muted-foreground">Upload Image</span>
                      </>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleImageUpload(index, f);
                        e.target.value = '';
                      }}
                    />
                  </label>
                )}
              </div>

              {/* Content Fields */}
              <div className="flex-1 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Slide {index + 1}</span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost" size="icon" className="h-6 w-6"
                      onClick={() => moveSlide(index, 'up')} disabled={index === 0}
                    >
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost" size="icon" className="h-6 w-6"
                      onClick={() => moveSlide(index, 'down')} disabled={index === slides.length - 1}
                    >
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost" size="icon" className="h-6 w-6 text-destructive"
                      onClick={() => deleteSlide(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <Input
                  placeholder="Slide Title"
                  value={slide.title || ''}
                  onChange={(e) => updateSlide(index, { title: e.target.value })}
                  className="h-8 text-sm"
                />
                <Textarea
                  placeholder="Slide Subtitle"
                  value={slide.subtitle || ''}
                  onChange={(e) => updateSlide(index, { subtitle: e.target.value })}
                  rows={2}
                  className="text-sm"
                />
                <Input
                  placeholder="Image URL (or upload above)"
                  value={slide.image || ''}
                  onChange={(e) => updateSlide(index, { image: e.target.value })}
                  className="h-8 text-xs text-muted-foreground"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Stats editor */}
      <div className="pt-2 border-t">
        <Label className="text-sm font-semibold">Stats Bar</Label>
        <div className="space-y-2 mt-2">
          {(content.stats as any[] || []).map((stat: any, i: number) => (
            <div key={i} className="flex gap-2">
              <Input
                placeholder="Value"
                value={stat.value}
                onChange={(e) => {
                  const stats = [...(content.stats as any[])];
                  stats[i] = { ...stats[i], value: e.target.value };
                  onUpdateContent({ ...content, stats });
                }}
                className="w-24 h-8 text-sm"
              />
              <Input
                placeholder="Label"
                value={stat.label}
                onChange={(e) => {
                  const stats = [...(content.stats as any[])];
                  stats[i] = { ...stats[i], label: e.target.value };
                  onUpdateContent({ ...content, stats });
                }}
                className="h-8 text-sm"
              />
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
                const stats = (content.stats as any[]).filter((_, idx) => idx !== i);
                onUpdateContent({ ...content, stats });
              }}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => onUpdateContent({ ...content, stats: [...(content.stats as any[] || []), { value: '', label: '' }] })}>
            <Plus className="mr-1 h-3 w-3" /> Add Stat
          </Button>
        </div>
      </div>

      {/* Buttons editor */}
      <div className="pt-2 border-t">
        <Label className="text-sm font-semibold">CTA Buttons</Label>
        <div className="space-y-2 mt-2">
          {(content.buttons as any[] || []).map((btn: any, i: number) => (
            <div key={i} className="flex gap-2">
              <Input
                placeholder="Text"
                value={btn.text}
                onChange={(e) => {
                  const buttons = [...(content.buttons as any[])];
                  buttons[i] = { ...buttons[i], text: e.target.value };
                  onUpdateContent({ ...content, buttons });
                }}
                className="h-8 text-sm"
              />
              <Input
                placeholder="Link"
                value={btn.link}
                onChange={(e) => {
                  const buttons = [...(content.buttons as any[])];
                  buttons[i] = { ...buttons[i], link: e.target.value };
                  onUpdateContent({ ...content, buttons });
                }}
                className="h-8 text-sm"
              />
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
                const buttons = (content.buttons as any[]).filter((_, idx) => idx !== i);
                onUpdateContent({ ...content, buttons });
              }}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => onUpdateContent({ ...content, buttons: [...(content.buttons as any[] || []), { text: '', link: '#', variant: 'outline' }] })}>
            <Plus className="mr-1 h-3 w-3" /> Add Button
          </Button>
        </div>
      </div>
    </div>
  );
}
