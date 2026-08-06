import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Search, UserPlus, X, GraduationCap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface FacultyFormData {
  name: string;
  title: string;
  designation: string;
  faculty: string;
  department: string;
  email: string;
  phone: string;
  office: string;
  bio: string;
  image_url: string;
  linkedin_url: string;
  facebook_url: string;
  twitter_url: string;
  website_url: string;
  researchgate_url: string;
  google_scholar_url: string;
  education: { degree: string; institution: string; year: string }[];
  experiences: { title: string; organization: string; period: string }[];
  publications: { title: string; journal: string; year: string; type: string }[];
  teaching_areas: { area: string }[];
  awards: { title: string; year: string; description: string }[];
  memberships: { name: string; role: string }[];
  conferences: { title: string; venue: string; year: string }[];
}

const emptyForm: FacultyFormData = {
  name: "", title: "", designation: "", faculty: "", department: "",
  email: "", phone: "", office: "", bio: "", image_url: "",
  linkedin_url: "", facebook_url: "", twitter_url: "", website_url: "",
  researchgate_url: "", google_scholar_url: "",
  education: [], experiences: [], publications: [], teaching_areas: [],
  awards: [], memberships: [], conferences: [],
};

const FACULTIES = [
  "Faculty of Science & Engineering",
  "Faculty of Arts & Social Sciences",
  "Faculty of Business Administration",
  "Faculty of Law",
];

const DEPARTMENTS = [
  "Computer Science and Engineering",
  "Electrical and Electronic Engineering",
  "Civil Engineering",
  "Textile Engineering",
  "Fashion Design & Technology",
  "English",
  "Law",
  "Journalism and Media Studies",
  "Business Administration",
];

interface FacultyProfile {
  id: string;
  user_id: string;
  name: string;
  designation: string | null;
  department: string | null;
  faculty: string | null;
  email: string | null;
  image_url: string | null;
}

export default function AdminFaculty() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<FacultyProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FacultyFormData>({ ...emptyForm });
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const fetchProfiles = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("faculty_profiles").select("id, user_id, name, designation, department, faculty, email, image_url");
    if (error) {
      if (import.meta.env.DEV) console.error(error);
      toast.error("Failed to load faculty profiles");
    } else {
      setProfiles(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => { fetchProfiles(); }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setActiveTab("basic");
    setDialogOpen(true);
  };

  const openEdit = async (id: string) => {
    const { data, error } = await supabase.from("faculty_profiles").select("*").eq("id", id).single();
    if (error || !data) {
      toast.error("Failed to load profile");
      return;
    }
    setEditingId(id);
    setForm({
      name: data.name || "",
      title: data.title || "",
      designation: data.designation || "",
      faculty: data.faculty || "",
      department: data.department || "",
      email: data.email || "",
      phone: data.phone || "",
      office: data.office || "",
      bio: data.bio || "",
      image_url: data.image_url || "",
      linkedin_url: data.linkedin_url || "",
      facebook_url: data.facebook_url || "",
      twitter_url: data.twitter_url || "",
      website_url: data.website_url || "",
      researchgate_url: data.researchgate_url || "",
      google_scholar_url: data.google_scholar_url || "",
      education: Array.isArray(data.education) ? data.education as any : [],
      experiences: Array.isArray(data.experiences) ? data.experiences as any : [],
      publications: Array.isArray(data.publications) ? data.publications as any : [],
      teaching_areas: Array.isArray(data.teaching_areas) ? data.teaching_areas as any : [],
      awards: Array.isArray(data.awards) ? data.awards as any : [],
      memberships: Array.isArray(data.memberships) ? data.memberships as any : [],
      conferences: Array.isArray(data.conferences) ? data.conferences as any : [],
    });
    setActiveTab("basic");
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    setIsSaving(true);
    const payload = {
      name: form.name.trim(),
      title: form.title || null,
      designation: form.designation || null,
      faculty: form.faculty || null,
      department: form.department || null,
      email: form.email || null,
      phone: form.phone || null,
      office: form.office || null,
      bio: form.bio || null,
      image_url: form.image_url || null,
      linkedin_url: form.linkedin_url || null,
      facebook_url: form.facebook_url || null,
      twitter_url: form.twitter_url || null,
      website_url: form.website_url || null,
      researchgate_url: form.researchgate_url || null,
      google_scholar_url: form.google_scholar_url || null,
      education: form.education as any,
      experiences: form.experiences as any,
      publications: form.publications as any,
      teaching_areas: form.teaching_areas as any,
      awards: form.awards as any,
      memberships: form.memberships as any,
      conferences: form.conferences as any,
    };

    let error;
    if (editingId) {
      ({ error } = await supabase.from("faculty_profiles").update(payload).eq("id", editingId));
    } else {
      ({ error } = await supabase.from("faculty_profiles").insert({ ...payload, user_id: user.id }));
    }

    setIsSaving(false);
    if (error) {
      if (import.meta.env.DEV) console.error(error);
      toast.error(editingId ? "Failed to update profile" : "Failed to create profile");
    } else {
      toast.success(editingId ? "Faculty profile updated" : "Faculty profile created");
      setDialogOpen(false);
      fetchProfiles();
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}'s profile?`)) return;
    const { error } = await supabase.from("faculty_profiles").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete profile");
    } else {
      toast.success("Profile deleted");
      fetchProfiles();
    }
  };

  const filtered = profiles.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.email?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchDept = filterDept === "all" || p.department === filterDept;
    return matchSearch && matchDept;
  });

  const updateField = (field: keyof FacultyFormData, value: any) => setForm((prev) => ({ ...prev, [field]: value }));

  // Array field helpers
  const addArrayItem = (field: keyof FacultyFormData, item: any) =>
    setForm((prev) => ({ ...prev, [field]: [...(prev[field] as any[]), item] }));
  const removeArrayItem = (field: keyof FacultyFormData, index: number) =>
    setForm((prev) => ({ ...prev, [field]: (prev[field] as any[]).filter((_, i) => i !== index) }));
  const updateArrayItem = (field: keyof FacultyFormData, index: number, key: string, value: string) =>
    setForm((prev) => ({
      ...prev,
      [field]: (prev[field] as any[]).map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    }));

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "contact", label: "Contact & Links" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "publications", label: "Publications" },
    { id: "teaching", label: "Teaching" },
    { id: "awards", label: "Awards & More" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Faculty Management</h1>
            <p className="text-sm text-muted-foreground">Add, edit, and manage faculty member profiles.</p>
          </div>
          <Button onClick={openAdd}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Faculty
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by name or email..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <Select value={filterDept} onValueChange={setFilterDept}>
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {DEPARTMENTS.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          {isLoading ? "Loading..." : `${filtered.length} faculty member${filtered.length !== 1 ? "s" : ""}`}
        </p>

        {/* Faculty Table */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full rounded-lg" />)}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((p) => (
              <Card key={p.id} className="hover:shadow-md transition-shadow">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">{p.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {p.designation || "Faculty"} • {p.department || "No department"}
                    </p>
                  </div>
                  {p.faculty && <Badge variant="secondary" className="hidden md:inline-flex text-xs">{p.faculty}</Badge>}
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(p.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(p.id, p.name)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No faculty members found.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Faculty Profile" : "Add New Faculty Member"}</DialogTitle>
          </DialogHeader>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-1 border-b pb-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                className="text-xs"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          <div className="space-y-4 mt-2">
            {/* Basic Info */}
            {activeTab === "basic" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name *</Label>
                    <Input value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Dr. John Doe" />
                  </div>
                  <div>
                    <Label>Title</Label>
                    <Input value={form.title} onChange={(e) => updateField("title", e.target.value)} placeholder="Professor" />
                  </div>
                  <div>
                    <Label>Designation</Label>
                    <Input value={form.designation} onChange={(e) => updateField("designation", e.target.value)} placeholder="Associate Professor" />
                  </div>
                  <div>
                    <Label>Office</Label>
                    <Input value={form.office} onChange={(e) => updateField("office", e.target.value)} placeholder="Room 301, Building A" />
                  </div>
                  <div>
                    <Label>Faculty</Label>
                    <Select value={form.faculty} onValueChange={(v) => updateField("faculty", v)}>
                      <SelectTrigger><SelectValue placeholder="Select Faculty" /></SelectTrigger>
                      <SelectContent>
                        {FACULTIES.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Department</Label>
                    <Select value={form.department} onValueChange={(v) => updateField("department", v)}>
                      <SelectTrigger><SelectValue placeholder="Select Department" /></SelectTrigger>
                      <SelectContent>
                        {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Profile Image URL</Label>
                  <Input value={form.image_url} onChange={(e) => updateField("image_url", e.target.value)} placeholder="https://..." />
                </div>
                <div>
                  <Label>Bio</Label>
                  <Textarea rows={4} value={form.bio} onChange={(e) => updateField("bio", e.target.value)} placeholder="Brief biography..." />
                </div>
              </div>
            )}

            {/* Contact & Links */}
            {activeTab === "contact" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} /></div>
                  <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} /></div>
                  <div><Label>LinkedIn URL</Label><Input value={form.linkedin_url} onChange={(e) => updateField("linkedin_url", e.target.value)} /></div>
                  <div><Label>Facebook URL</Label><Input value={form.facebook_url} onChange={(e) => updateField("facebook_url", e.target.value)} /></div>
                  <div><Label>Twitter URL</Label><Input value={form.twitter_url} onChange={(e) => updateField("twitter_url", e.target.value)} /></div>
                  <div><Label>Website URL</Label><Input value={form.website_url} onChange={(e) => updateField("website_url", e.target.value)} /></div>
                  <div><Label>ResearchGate URL</Label><Input value={form.researchgate_url} onChange={(e) => updateField("researchgate_url", e.target.value)} /></div>
                  <div><Label>Google Scholar URL</Label><Input value={form.google_scholar_url} onChange={(e) => updateField("google_scholar_url", e.target.value)} /></div>
                </div>
              </div>
            )}

            {/* Education */}
            {activeTab === "education" && (
              <ArraySection
                title="Education"
                items={form.education}
                fields={[
                  { key: "degree", label: "Degree", placeholder: "PhD in Computer Science" },
                  { key: "institution", label: "Institution", placeholder: "MIT" },
                  { key: "year", label: "Year", placeholder: "2020" },
                ]}
                onAdd={() => addArrayItem("education", { degree: "", institution: "", year: "" })}
                onRemove={(i) => removeArrayItem("education", i)}
                onUpdate={(i, k, v) => updateArrayItem("education", i, k, v)}
              />
            )}

            {/* Experience */}
            {activeTab === "experience" && (
              <ArraySection
                title="Experience"
                items={form.experiences}
                fields={[
                  { key: "title", label: "Position", placeholder: "Associate Professor" },
                  { key: "organization", label: "Organization", placeholder: "PCIU" },
                  { key: "period", label: "Period", placeholder: "2018 - Present" },
                ]}
                onAdd={() => addArrayItem("experiences", { title: "", organization: "", period: "" })}
                onRemove={(i) => removeArrayItem("experiences", i)}
                onUpdate={(i, k, v) => updateArrayItem("experiences", i, k, v)}
              />
            )}

            {/* Publications */}
            {activeTab === "publications" && (
              <ArraySection
                title="Publications"
                items={form.publications}
                fields={[
                  { key: "title", label: "Title", placeholder: "Research paper title" },
                  { key: "journal", label: "Journal/Venue", placeholder: "IEEE Transactions" },
                  { key: "year", label: "Year", placeholder: "2023" },
                  { key: "type", label: "Type", placeholder: "Journal" },
                ]}
                onAdd={() => addArrayItem("publications", { title: "", journal: "", year: "", type: "Journal" })}
                onRemove={(i) => removeArrayItem("publications", i)}
                onUpdate={(i, k, v) => updateArrayItem("publications", i, k, v)}
              />
            )}

            {/* Teaching Areas */}
            {activeTab === "teaching" && (
              <ArraySection
                title="Teaching Areas"
                items={form.teaching_areas}
                fields={[{ key: "area", label: "Area", placeholder: "Machine Learning" }]}
                onAdd={() => addArrayItem("teaching_areas", { area: "" })}
                onRemove={(i) => removeArrayItem("teaching_areas", i)}
                onUpdate={(i, k, v) => updateArrayItem("teaching_areas", i, k, v)}
              />
            )}

            {/* Awards & Memberships & Conferences */}
            {activeTab === "awards" && (
              <div className="space-y-6">
                <ArraySection
                  title="Awards"
                  items={form.awards}
                  fields={[
                    { key: "title", label: "Award Title", placeholder: "Best Paper Award" },
                    { key: "year", label: "Year", placeholder: "2022" },
                    { key: "description", label: "Description", placeholder: "Details..." },
                  ]}
                  onAdd={() => addArrayItem("awards", { title: "", year: "", description: "" })}
                  onRemove={(i) => removeArrayItem("awards", i)}
                  onUpdate={(i, k, v) => updateArrayItem("awards", i, k, v)}
                />
                <Separator />
                <ArraySection
                  title="Memberships"
                  items={form.memberships}
                  fields={[
                    { key: "name", label: "Organization", placeholder: "IEEE" },
                    { key: "role", label: "Role", placeholder: "Senior Member" },
                  ]}
                  onAdd={() => addArrayItem("memberships", { name: "", role: "" })}
                  onRemove={(i) => removeArrayItem("memberships", i)}
                  onUpdate={(i, k, v) => updateArrayItem("memberships", i, k, v)}
                />
                <Separator />
                <ArraySection
                  title="Conferences"
                  items={form.conferences}
                  fields={[
                    { key: "title", label: "Conference Title", placeholder: "ICML 2023" },
                    { key: "venue", label: "Venue", placeholder: "Honolulu, USA" },
                    { key: "year", label: "Year", placeholder: "2023" },
                  ]}
                  onAdd={() => addArrayItem("conferences", { title: "", venue: "", year: "" })}
                  onRemove={(i) => removeArrayItem("conferences", i)}
                  onUpdate={(i, k, v) => updateArrayItem("conferences", i, k, v)}
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : editingId ? "Update Profile" : "Create Profile"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}

// Reusable array section component
function ArraySection({
  title,
  items,
  fields,
  onAdd,
  onRemove,
  onUpdate,
}: {
  title: string;
  items: any[];
  fields: { key: string; label: string; placeholder: string }[];
  onAdd: () => void;
  onRemove: (i: number) => void;
  onUpdate: (i: number, key: string, value: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <Label className="text-sm font-semibold">{title}</Label>
        <Button type="button" variant="outline" size="sm" onClick={onAdd}>
          <Plus className="h-3 w-3 mr-1" /> Add
        </Button>
      </div>
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">No {title.toLowerCase()} added yet.</p>
      )}
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="border rounded-lg p-3 relative bg-muted/30">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6 text-destructive"
              onClick={() => onRemove(index)}
            >
              <X className="h-3 w-3" />
            </Button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pr-6">
              {fields.map((field) => (
                <div key={field.key}>
                  <Label className="text-xs text-muted-foreground">{field.label}</Label>
                  <Input
                    className="h-8 text-sm"
                    value={item[field.key] || ""}
                    onChange={(e) => onUpdate(index, field.key, e.target.value)}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
