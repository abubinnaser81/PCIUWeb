import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface MemberItem {
  name: string;
  title?: string;
  dept?: string;
  role?: string;
  designation?: string;
}

interface AuthorSection {
  heading: string;
  text?: string;
  items?: string[];
}

interface Props {
  sectionKey: string;
  content: Record<string, any>;
  onChange: (content: Record<string, any>) => void;
}

function MembersList({ members, onChange, fields }: {
  members: MemberItem[];
  onChange: (members: MemberItem[]) => void;
  fields: { key: string; label: string }[];
}) {
  const update = (idx: number, key: string, val: string) => {
    const copy = [...members];
    copy[idx] = { ...copy[idx], [key]: val };
    onChange(copy);
  };
  const remove = (idx: number) => onChange(members.filter((_, i) => i !== idx));
  const add = () => {
    const blank: any = {};
    fields.forEach(f => blank[f.key] = '');
    onChange([...members, blank]);
  };

  return (
    <div className="space-y-3">
      {members.map((m, idx) => (
        <Card key={idx} className="border border-border">
          <CardContent className="p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-medium">Member {idx + 1}</span>
              <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => remove(idx)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
            {fields.map(f => (
              <div key={f.key}>
                <Label className="text-xs">{f.label}</Label>
                <Input value={(m as any)[f.key] || ''} onChange={e => update(idx, f.key, e.target.value)} className="h-8 text-sm" />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
      <Button size="sm" variant="outline" onClick={add} className="w-full">
        <Plus className="w-3.5 h-3.5 mr-1" /> Add Member
      </Button>
    </div>
  );
}

function AboutEditor({ content, onChange }: { content: Record<string, any>; onChange: (c: Record<string, any>) => void }) {
  const set = (key: string, val: any) => onChange({ ...content, [key]: val });
  const setChief = (key: string, val: string) => onChange({ ...content, chief_editor: { ...content.chief_editor, [key]: val } });

  return (
    <div className="space-y-4">
      <div>
        <Label>Description</Label>
        <Textarea value={content.description || ''} onChange={e => set('description', e.target.value)} className="min-h-[120px]" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>ISSN</Label>
          <Input value={content.issn || ''} onChange={e => set('issn', e.target.value)} />
        </div>
        <div>
          <Label>ISSN Note</Label>
          <Input value={content.issn_note || ''} onChange={e => set('issn_note', e.target.value)} />
        </div>
      </div>
      <div className="border border-border rounded-md p-3 space-y-2">
        <Label className="font-semibold">Chief Editor</Label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Name</Label>
            <Input value={content.chief_editor?.name || ''} onChange={e => setChief('name', e.target.value)} className="h-8 text-sm" />
          </div>
          <div>
            <Label className="text-xs">Designation</Label>
            <Input value={content.chief_editor?.designation || ''} onChange={e => setChief('designation', e.target.value)} className="h-8 text-sm" />
          </div>
        </div>
      </div>
      <div className="border border-border rounded-md p-3 space-y-2">
        <Label className="font-semibold">Associate Editors</Label>
        <MembersList
          members={content.associate_editors || []}
          onChange={v => set('associate_editors', v)}
          fields={[{ key: 'name', label: 'Name' }]}
        />
      </div>
    </div>
  );
}

function BoardEditor({ content, onChange, type }: { content: Record<string, any>; onChange: (c: Record<string, any>) => void; type: 'advisory' | 'editorial' }) {
  const fields = type === 'advisory'
    ? [{ key: 'name', label: 'Name' }, { key: 'title', label: 'Title / Affiliation' }]
    : [{ key: 'name', label: 'Name' }, { key: 'dept', label: 'Department' }, { key: 'role', label: 'Role (optional)' }];

  return (
    <div className="space-y-4">
      <Label className="font-semibold">{type === 'advisory' ? 'Advisory' : 'Editorial'} Board Members</Label>
      <MembersList
        members={content.members || []}
        onChange={v => onChange({ ...content, members: v })}
        fields={fields}
      />
    </div>
  );
}

function AuthorInstructionsEditor({ content, onChange }: { content: Record<string, any>; onChange: (c: Record<string, any>) => void }) {
  const sections: AuthorSection[] = content.sections || [];

  const updateSection = (idx: number, key: string, val: any) => {
    const copy = [...sections];
    copy[idx] = { ...copy[idx], [key]: val };
    onChange({ ...content, sections: copy });
  };

  const removeSection = (idx: number) => {
    onChange({ ...content, sections: sections.filter((_, i) => i !== idx) });
  };

  const addSection = () => {
    onChange({ ...content, sections: [...sections, { heading: '', text: '' }] });
  };

  const updateItem = (sIdx: number, iIdx: number, val: string) => {
    const copy = [...sections];
    const items = [...(copy[sIdx].items || [])];
    items[iIdx] = val;
    copy[sIdx] = { ...copy[sIdx], items };
    onChange({ ...content, sections: copy });
  };

  const addItem = (sIdx: number) => {
    const copy = [...sections];
    copy[sIdx] = { ...copy[sIdx], items: [...(copy[sIdx].items || []), ''] };
    onChange({ ...content, sections: copy });
  };

  const removeItem = (sIdx: number, iIdx: number) => {
    const copy = [...sections];
    copy[sIdx] = { ...copy[sIdx], items: (copy[sIdx].items || []).filter((_: any, i: number) => i !== iIdx) };
    onChange({ ...content, sections: copy });
  };

  return (
    <div className="space-y-4">
      {sections.map((s, idx) => (
        <Card key={idx} className="border border-border">
          <CardContent className="p-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-medium">Section {idx + 1}</span>
              <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => removeSection(idx)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div>
              <Label className="text-xs">Heading</Label>
              <Input value={s.heading} onChange={e => updateSection(idx, 'heading', e.target.value)} className="h-8 text-sm" />
            </div>
            {s.items ? (
              <div className="space-y-2">
                <Label className="text-xs">Bullet Points</Label>
                {s.items.map((item, iIdx) => (
                  <div key={iIdx} className="flex gap-2">
                    <Input value={item} onChange={e => updateItem(idx, iIdx, e.target.value)} className="h-8 text-sm" />
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive shrink-0" onClick={() => removeItem(idx, iIdx)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <Button size="sm" variant="outline" onClick={() => addItem(idx)} className="text-xs">
                  <Plus className="w-3 h-3 mr-1" /> Add Bullet
                </Button>
              </div>
            ) : (
              <div>
                <Label className="text-xs">Text</Label>
                <Textarea value={s.text || ''} onChange={e => updateSection(idx, 'text', e.target.value)} className="min-h-[60px] text-sm" />
              </div>
            )}
            <div className="flex gap-2">
              {!s.items && (
                <Button size="sm" variant="ghost" className="text-xs" onClick={() => updateSection(idx, 'items', [''])}>
                  Switch to bullet list
                </Button>
              )}
              {s.items && (
                <Button size="sm" variant="ghost" className="text-xs" onClick={() => {
                  const copy = { ...s, text: '', items: undefined };
                  const all = [...sections];
                  all[idx] = copy;
                  onChange({ ...content, sections: all });
                }}>
                  Switch to paragraph
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      <Button size="sm" variant="outline" onClick={addSection} className="w-full">
        <Plus className="w-3.5 h-3.5 mr-1" /> Add Section
      </Button>
    </div>
  );
}

function ContactEditor({ content, onChange }: { content: Record<string, any>; onChange: (c: Record<string, any>) => void }) {
  const set = (key: string, val: string) => onChange({ ...content, [key]: val });
  const fields = [
    { key: 'office_name', label: 'Office Name' },
    { key: 'journal_name', label: 'Journal Name' },
    { key: 'university', label: 'University' },
    { key: 'address', label: 'Address' },
    { key: 'city', label: 'City' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'website', label: 'Website' },
  ];

  return (
    <div className="space-y-3">
      {fields.map(f => (
        <div key={f.key}>
          <Label>{f.label}</Label>
          <Input value={content[f.key] || ''} onChange={e => set(f.key, e.target.value)} />
        </div>
      ))}
    </div>
  );
}

export default function SectionContentEditor({ sectionKey, content, onChange }: Props) {
  switch (sectionKey) {
    case 'about':
      return <AboutEditor content={content} onChange={onChange} />;
    case 'advisory':
      return <BoardEditor content={content} onChange={onChange} type="advisory" />;
    case 'editorial':
      return <BoardEditor content={content} onChange={onChange} type="editorial" />;
    case 'author':
      return <AuthorInstructionsEditor content={content} onChange={onChange} />;
    case 'contact':
      return <ContactEditor content={content} onChange={onChange} />;
    default:
      return (
        <div>
          <Label>Content (JSON)</Label>
          <Textarea
            value={JSON.stringify(content, null, 2)}
            onChange={e => {
              try { onChange(JSON.parse(e.target.value)); } catch {}
            }}
            className="font-mono text-xs min-h-[200px]"
          />
        </div>
      );
  }
}
