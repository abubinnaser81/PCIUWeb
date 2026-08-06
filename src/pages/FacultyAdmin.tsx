import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { User, Session } from "@supabase/supabase-js";
import { LogOut, Save, Plus, Trash2, GraduationCap, Briefcase, BookOpen, Award, Users } from "lucide-react";

interface FacultyProfile {
  id?: string;
  user_id: string;
  name: string;
  title: string;
  designation: string;
  department: string;
  faculty: string;
  email: string;
  phone: string;
  office: string;
  image_url: string;
  bio: string;
  education: { degree: string; institution: string; year: string }[];
  publications: { title: string; journal: string; year: string; authors: string }[];
  experiences: { position: string; organization: string; duration: string }[];
  teaching_areas: string[];
  awards: string[];
  memberships: string[];
  conferences: string[];
}

const defaultProfile: Omit<FacultyProfile, "user_id"> = {
  name: "",
  title: "",
  designation: "",
  department: "",
  faculty: "",
  email: "",
  phone: "",
  office: "",
  image_url: "",
  bio: "",
  education: [],
  publications: [],
  experiences: [],
  teaching_areas: [],
  awards: [],
  memberships: [],
  conferences: [],
};

const FacultyAdmin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<FacultyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/faculty-auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/faculty-auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    const { data, error } = await supabase
      .from("faculty_profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } else if (data) {
      setProfile({
        ...data,
        education: (data.education as any[]) || [],
        publications: (data.publications as any[]) || [],
        experiences: (data.experiences as any[]) || [],
        teaching_areas: (data.teaching_areas as string[]) || [],
        awards: (data.awards as string[]) || [],
        memberships: (data.memberships as string[]) || [],
        conferences: (data.conferences as string[]) || [],
      });
    } else {
      setProfile({ ...defaultProfile, user_id: user.id, email: user.email || "" });
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (!user || !profile) return;

    setIsSaving(true);
    const profileData = {
      ...profile,
      user_id: user.id,
    };

    let result;
    if (profile.id) {
      result = await supabase
        .from("faculty_profiles")
        .update(profileData)
        .eq("id", profile.id);
    } else {
      result = await supabase
        .from("faculty_profiles")
        .insert([profileData])
        .select()
        .single();
    }

    if (result.error) {
      toast({
        title: "Error",
        description: "Failed to save profile",
        variant: "destructive",
      });
    } else {
      if (!profile.id && result.data) {
        setProfile({ ...profile, id: result.data.id });
      }
      toast({
        title: "Success",
        description: "Profile saved successfully",
      });
    }
    setIsSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/faculty-auth");
  };

  const updateProfile = (field: keyof FacultyProfile, value: any) => {
    if (profile) {
      setProfile({ ...profile, [field]: value });
    }
  };

  const addEducation = () => {
    if (profile) {
      setProfile({
        ...profile,
        education: [...profile.education, { degree: "", institution: "", year: "" }],
      });
    }
  };

  const removeEducation = (index: number) => {
    if (profile) {
      setProfile({
        ...profile,
        education: profile.education.filter((_, i) => i !== index),
      });
    }
  };

  const updateEducation = (index: number, field: string, value: string) => {
    if (profile) {
      const updated = [...profile.education];
      updated[index] = { ...updated[index], [field]: value };
      setProfile({ ...profile, education: updated });
    }
  };

  const addPublication = () => {
    if (profile) {
      setProfile({
        ...profile,
        publications: [...profile.publications, { title: "", journal: "", year: "", authors: "" }],
      });
    }
  };

  const removePublication = (index: number) => {
    if (profile) {
      setProfile({
        ...profile,
        publications: profile.publications.filter((_, i) => i !== index),
      });
    }
  };

  const updatePublication = (index: number, field: string, value: string) => {
    if (profile) {
      const updated = [...profile.publications];
      updated[index] = { ...updated[index], [field]: value };
      setProfile({ ...profile, publications: updated });
    }
  };

  const addExperience = () => {
    if (profile) {
      setProfile({
        ...profile,
        experiences: [...profile.experiences, { position: "", organization: "", duration: "" }],
      });
    }
  };

  const removeExperience = (index: number) => {
    if (profile) {
      setProfile({
        ...profile,
        experiences: profile.experiences.filter((_, i) => i !== index),
      });
    }
  };

  const updateExperience = (index: number, field: string, value: string) => {
    if (profile) {
      const updated = [...profile.experiences];
      updated[index] = { ...updated[index], [field]: value };
      setProfile({ ...profile, experiences: updated });
    }
  };

  const addArrayItem = (field: "teaching_areas" | "awards" | "memberships" | "conferences") => {
    if (profile) {
      setProfile({ ...profile, [field]: [...profile[field], ""] });
    }
  };

  const removeArrayItem = (field: "teaching_areas" | "awards" | "memberships" | "conferences", index: number) => {
    if (profile) {
      setProfile({ ...profile, [field]: profile[field].filter((_, i) => i !== index) });
    }
  };

  const updateArrayItem = (field: "teaching_areas" | "awards" | "memberships" | "conferences", index: number, value: string) => {
    if (profile) {
      const updated = [...profile[field]];
      updated[index] = value;
      setProfile({ ...profile, [field]: updated });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-lg text-primary">Faculty Admin</h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={handleSave} disabled={isSaving} className="bg-highlight hover:bg-highlight/90">
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save Profile"}
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="bg-card border w-full justify-start overflow-x-auto">
            <TabsTrigger value="basic" className="gap-2">
              <Users className="w-4 h-4" />
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="education" className="gap-2">
              <GraduationCap className="w-4 h-4" />
              Education
            </TabsTrigger>
            <TabsTrigger value="publications" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Publications
            </TabsTrigger>
            <TabsTrigger value="experience" className="gap-2">
              <Briefcase className="w-4 h-4" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="others" className="gap-2">
              <Award className="w-4 h-4" />
              Others
            </TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Your personal and contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      value={profile?.name || ""}
                      onChange={(e) => updateProfile("name", e.target.value)}
                      placeholder="Dr. John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={profile?.title || ""}
                      onChange={(e) => updateProfile("title", e.target.value)}
                      placeholder="Professor"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Designation</Label>
                    <Input
                      value={profile?.designation || ""}
                      onChange={(e) => updateProfile("designation", e.target.value)}
                      placeholder="Associate Professor & Head"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Input
                      value={profile?.department || ""}
                      onChange={(e) => updateProfile("department", e.target.value)}
                      placeholder="Department of Business Administration"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Faculty</Label>
                    <Input
                      value={profile?.faculty || ""}
                      onChange={(e) => updateProfile("faculty", e.target.value)}
                      placeholder="Faculty of Business Studies"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={profile?.email || ""}
                      onChange={(e) => updateProfile("email", e.target.value)}
                      placeholder="john.doe@university.edu"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={profile?.phone || ""}
                      onChange={(e) => updateProfile("phone", e.target.value)}
                      placeholder="+880-123-456789"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Office</Label>
                    <Input
                      value={profile?.office || ""}
                      onChange={(e) => updateProfile("office", e.target.value)}
                      placeholder="Room 301, Academic Building"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Profile Image URL</Label>
                    <Input
                      value={profile?.image_url || ""}
                      onChange={(e) => updateProfile("image_url", e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Bio</Label>
                    <Textarea
                      value={profile?.bio || ""}
                      onChange={(e) => updateProfile("bio", e.target.value)}
                      placeholder="Write a brief biography..."
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Education</CardTitle>
                  <CardDescription>Your academic qualifications</CardDescription>
                </div>
                <Button onClick={addEducation} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Education
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile?.education.map((edu, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-muted-foreground">Education #{index + 1}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeEducation(index)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Degree</Label>
                        <Input
                          value={edu.degree}
                          onChange={(e) => updateEducation(index, "degree", e.target.value)}
                          placeholder="Ph.D. in Management"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Institution</Label>
                        <Input
                          value={edu.institution}
                          onChange={(e) => updateEducation(index, "institution", e.target.value)}
                          placeholder="University Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Year</Label>
                        <Input
                          value={edu.year}
                          onChange={(e) => updateEducation(index, "year", e.target.value)}
                          placeholder="2020"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {profile?.education.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No education entries. Click "Add Education" to add one.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Publications Tab */}
          <TabsContent value="publications">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Publications</CardTitle>
                  <CardDescription>Your research papers and articles</CardDescription>
                </div>
                <Button onClick={addPublication} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Publication
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile?.publications.map((pub, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-muted-foreground">Publication #{index + 1}</span>
                      <Button variant="ghost" size="sm" onClick={() => removePublication(index)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label>Title</Label>
                        <Input
                          value={pub.title}
                          onChange={(e) => updatePublication(index, "title", e.target.value)}
                          placeholder="Research paper title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Journal/Publisher</Label>
                        <Input
                          value={pub.journal}
                          onChange={(e) => updatePublication(index, "journal", e.target.value)}
                          placeholder="Journal name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Year</Label>
                        <Input
                          value={pub.year}
                          onChange={(e) => updatePublication(index, "year", e.target.value)}
                          placeholder="2023"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Authors</Label>
                        <Input
                          value={pub.authors}
                          onChange={(e) => updatePublication(index, "authors", e.target.value)}
                          placeholder="Author 1, Author 2, ..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {profile?.publications.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No publications. Click "Add Publication" to add one.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Experience</CardTitle>
                  <CardDescription>Your professional experience</CardDescription>
                </div>
                <Button onClick={addExperience} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Experience
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile?.experiences.map((exp, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-muted-foreground">Experience #{index + 1}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeExperience(index)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Position</Label>
                        <Input
                          value={exp.position}
                          onChange={(e) => updateExperience(index, "position", e.target.value)}
                          placeholder="Professor"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Organization</Label>
                        <Input
                          value={exp.organization}
                          onChange={(e) => updateExperience(index, "organization", e.target.value)}
                          placeholder="University Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Duration</Label>
                        <Input
                          value={exp.duration}
                          onChange={(e) => updateExperience(index, "duration", e.target.value)}
                          placeholder="2015 - Present"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {profile?.experiences.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No experiences. Click "Add Experience" to add one.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Others Tab */}
          <TabsContent value="others" className="space-y-6">
            {/* Teaching Areas */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Teaching Areas</CardTitle>
                  <CardDescription>Subjects you teach</CardDescription>
                </div>
                <Button onClick={() => addArrayItem("teaching_areas")} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {profile?.teaching_areas.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => updateArrayItem("teaching_areas", index, e.target.value)}
                      placeholder="Subject name"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeArrayItem("teaching_areas", index)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Awards */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Awards & Honors</CardTitle>
                  <CardDescription>Recognition you have received</CardDescription>
                </div>
                <Button onClick={() => addArrayItem("awards")} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {profile?.awards.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => updateArrayItem("awards", index, e.target.value)}
                      placeholder="Award name"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeArrayItem("awards", index)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Memberships */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Professional Memberships</CardTitle>
                  <CardDescription>Organizations you belong to</CardDescription>
                </div>
                <Button onClick={() => addArrayItem("memberships")} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {profile?.memberships.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => updateArrayItem("memberships", index, e.target.value)}
                      placeholder="Organization name"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeArrayItem("memberships", index)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Conferences */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Conferences</CardTitle>
                  <CardDescription>Conferences attended or presented</CardDescription>
                </div>
                <Button onClick={() => addArrayItem("conferences")} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {profile?.conferences.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => updateArrayItem("conferences", index, e.target.value)}
                      placeholder="Conference name"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeArrayItem("conferences", index)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default FacultyAdmin;
