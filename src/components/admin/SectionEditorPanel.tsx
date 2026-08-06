import { useEditMode } from '@/contexts/EditModeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Plus } from 'lucide-react';

export default function SectionEditorPanel() {
  const editMode = useEditMode();
  if (!editMode || !editMode.activeSection) return null;

  const { activeSection, setActiveSection, content, updateContent } = editMode;

  const renderEditor = () => {
    switch (activeSection) {
      case 'hero':
        return (
          <div className="space-y-3">
            <Field label="Badge" value={content.hero?.badge || ''} onChange={(v) => updateContent('hero', { ...content.hero, badge: v })} />
            <Field label="Title" value={content.hero?.title || ''} onChange={(v) => updateContent('hero', { ...content.hero, title: v })} />
            <FieldArea label="Subtitle" value={content.hero?.subtitle || ''} onChange={(v) => updateContent('hero', { ...content.hero, subtitle: v })} />
            <Field label="Button Text" value={content.hero?.buttonText || ''} onChange={(v) => updateContent('hero', { ...content.hero, buttonText: v })} />
            <Field label="Button Link" value={content.hero?.buttonLink || ''} onChange={(v) => updateContent('hero', { ...content.hero, buttonLink: v })} />
          </div>
        );
      case 'stats':
        return (
          <div className="space-y-2">
            {(content.stats || []).map((stat, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <Input className="h-8 text-xs w-20" placeholder="Value" value={stat.value} onChange={(e) => {
                  const arr = [...(content.stats || [])]; arr[idx] = { ...stat, value: e.target.value }; updateContent('stats', arr);
                }} />
                <Input className="h-8 text-xs flex-1" placeholder="Label" value={stat.label} onChange={(e) => {
                  const arr = [...(content.stats || [])]; arr[idx] = { ...stat, label: e.target.value }; updateContent('stats', arr);
                }} />
                <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => updateContent('stats', (content.stats || []).filter((_, i) => i !== idx))}><X className="h-3 w-3" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" className="h-7 text-xs w-full" onClick={() => updateContent('stats', [...(content.stats || []), { value: '', label: '' }])}><Plus className="mr-1 h-3 w-3" /> Add Stat</Button>
          </div>
        );
      case 'chairman':
        return (
          <div className="space-y-3">
            <Field label="Name" value={content.chairman?.name || ''} onChange={(v) => updateContent('chairman', { ...content.chairman, name: v })} />
            <Field label="Designation" value={content.chairman?.designation || ''} onChange={(v) => updateContent('chairman', { ...content.chairman, designation: v })} />
            <Field label="Image URL" value={content.chairman?.image || ''} onChange={(v) => updateContent('chairman', { ...content.chairman, image: v })} />
            <FieldArea label="Message" value={content.chairman?.message || ''} onChange={(v) => updateContent('chairman', { ...content.chairman, message: v })} rows={6} />
          </div>
        );
      case 'overview':
        return (
          <div className="space-y-3">
            <FieldArea label="Content" value={content.overview?.content || ''} onChange={(v) => updateContent('overview', { ...content.overview, content: v })} rows={6} />
            <div>
              <Label className="text-xs">Key Features (one per line)</Label>
              <Textarea className="text-xs mt-1" rows={5} value={(content.overview?.features || []).join('\n')} onChange={(e) => updateContent('overview', { ...content.overview, features: e.target.value.split('\n').filter(Boolean) })} />
            </div>
          </div>
        );
      case 'facilities':
        return (
          <div className="space-y-2">
            {(content.facilities || []).map((f, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <Input className="h-8 text-xs flex-1" value={f.name} onChange={(e) => {
                  const arr = [...(content.facilities || [])]; arr[idx] = { name: e.target.value }; updateContent('facilities', arr);
                }} />
                <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => updateContent('facilities', (content.facilities || []).filter((_, i) => i !== idx))}><X className="h-3 w-3" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" className="h-7 text-xs w-full" onClick={() => updateContent('facilities', [...(content.facilities || []), { name: '' }])}><Plus className="mr-1 h-3 w-3" /> Add</Button>
          </div>
        );
      case 'programs':
        return (
          <div className="space-y-3">
            {(content.programs || []).map((prog, idx) => (
              <div key={idx} className="p-2 bg-muted/50 rounded-md space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-xs font-semibold">Program {idx + 1}</Label>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => updateContent('programs', (content.programs || []).filter((_, i) => i !== idx))}><X className="h-3 w-3" /></Button>
                </div>
                <Field label="Name" value={prog.name} onChange={(v) => { const arr = [...(content.programs || [])]; arr[idx] = { ...prog, name: v }; updateContent('programs', arr); }} />
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Duration" value={prog.duration} onChange={(v) => { const arr = [...(content.programs || [])]; arr[idx] = { ...prog, duration: v }; updateContent('programs', arr); }} />
                  <Field label="Credits" value={prog.credits} onChange={(v) => { const arr = [...(content.programs || [])]; arr[idx] = { ...prog, credits: v }; updateContent('programs', arr); }} />
                </div>
                <FieldArea label="Description" value={prog.description} onChange={(v) => { const arr = [...(content.programs || [])]; arr[idx] = { ...prog, description: v }; updateContent('programs', arr); }} />
                <Field label="Concentrations (comma-separated)" value={(prog.concentrations || []).join(', ')} onChange={(v) => { const arr = [...(content.programs || [])]; arr[idx] = { ...prog, concentrations: v.split(',').map(s => s.trim()).filter(Boolean) }; updateContent('programs', arr); }} />
              </div>
            ))}
            <Button variant="outline" size="sm" className="h-7 text-xs w-full" onClick={() => updateContent('programs', [...(content.programs || []), { name: '', duration: '', credits: '', description: '', concentrations: [] }])}><Plus className="mr-1 h-3 w-3" /> Add Program</Button>
          </div>
        );
      case 'research':
        return (
          <div>
            <Label className="text-xs">Research Areas (one per line)</Label>
            <Textarea className="text-xs mt-1" rows={6} value={(content.researchAreas || []).join('\n')} onChange={(e) => updateContent('researchAreas', e.target.value.split('\n').filter(Boolean))} />
          </div>
        );
      case 'industry':
        return (
          <div>
            <Label className="text-xs">Industry Partners (comma-separated)</Label>
            <Input className="h-8 text-xs mt-1" value={(content.industryPartners || []).join(', ')} onChange={(e) => updateContent('industryPartners', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
          </div>
        );
      case 'notices':
        return (
          <div className="space-y-2">
            {(content.notices || []).map((notice, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <div className="flex-1 space-y-1">
                  <Input className="h-7 text-xs" placeholder="Title" value={notice.title} onChange={(e) => { const arr = [...(content.notices || [])]; arr[idx] = { ...notice, title: e.target.value }; updateContent('notices', arr); }} />
                  <Input className="h-7 text-xs" type="date" value={notice.date} onChange={(e) => { const arr = [...(content.notices || [])]; arr[idx] = { ...notice, date: e.target.value }; updateContent('notices', arr); }} />
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => updateContent('notices', (content.notices || []).filter((_, i) => i !== idx))}><X className="h-3 w-3" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" className="h-7 text-xs w-full" onClick={() => updateContent('notices', [...(content.notices || []), { title: '', date: '', type: 'general' }])}><Plus className="mr-1 h-3 w-3" /> Add Notice</Button>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-3">
            <Field label="Email" value={content.contact?.email || ''} onChange={(v) => updateContent('contact', { ...content.contact, email: v })} />
            <Field label="Phone" value={content.contact?.phone || ''} onChange={(v) => updateContent('contact', { ...content.contact, phone: v })} />
            <FieldArea label="Address" value={content.contact?.address || ''} onChange={(v) => updateContent('contact', { ...content.contact, address: v })} />
            <Field label="Office Hours" value={content.contact?.hours || ''} onChange={(v) => updateContent('contact', { ...content.contact, hours: v })} />
          </div>
        );
      case 'quickLinks':
        return (
          <div className="space-y-2">
            {(content.quickLinks || []).map((link, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <Input className="h-7 text-xs" placeholder="Label" value={link.label} onChange={(e) => { const arr = [...(content.quickLinks || [])]; arr[idx] = { ...link, label: e.target.value }; updateContent('quickLinks', arr); }} />
                <Input className="h-7 text-xs" placeholder="URL" value={link.url} onChange={(e) => { const arr = [...(content.quickLinks || [])]; arr[idx] = { ...link, url: e.target.value }; updateContent('quickLinks', arr); }} />
                <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => updateContent('quickLinks', (content.quickLinks || []).filter((_, i) => i !== idx))}><X className="h-3 w-3" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" className="h-7 text-xs w-full" onClick={() => updateContent('quickLinks', [...(content.quickLinks || []), { label: '', url: '#' }])}><Plus className="mr-1 h-3 w-3" /> Add Link</Button>
          </div>
        );
      default:
        return <p className="text-xs text-muted-foreground">No editor for this section.</p>;
    }
  };

  const sectionLabels: Record<string, string> = {
    hero: 'Hero Section',
    stats: 'Statistics',
    chairman: "Chairman's Message",
    overview: 'Department Overview',
    facilities: 'Facilities',
    programs: 'Programs',
    research: 'Research Areas',
    industry: 'Industry Partnerships',
    notices: 'Department Notices',
    contact: 'Contact Information',
    quickLinks: 'Quick Links',
  };

  return (
    <div className="fixed top-16 right-4 z-[100] w-80 max-h-[80vh] bg-card border border-border rounded-lg shadow-2xl flex flex-col animate-in slide-in-from-right-5 duration-200">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <h3 className="font-semibold text-sm">{sectionLabels[activeSection] || activeSection}</h3>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setActiveSection(null)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1 max-h-[65vh]">
        <div className="p-3">
          {renderEditor()}
        </div>
      </ScrollArea>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <Label className="text-[10px] text-muted-foreground">{label}</Label>
      <Input className="h-8 text-xs" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function FieldArea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <Label className="text-[10px] text-muted-foreground">{label}</Label>
      <Textarea className="text-xs" rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
