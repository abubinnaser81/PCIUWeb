import { BookOpen, Users, Award, FileText, GraduationCap, Mail, Phone, MapPin, ExternalLink, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DepartmentEvents from "@/components/department/DepartmentEvents";
import { useDepartmentContent, mergeContent } from "@/hooks/useDepartmentContent";
import { useEditMode } from "@/contexts/EditModeContext";
import EditableSection from "@/components/admin/EditableSection";
import { Badge } from "@/components/ui/badge";
export const ENGLISH_DEFAULTS = {
  hero: {
    badge: "Faculty of Humanities, Social Sciences & Law",
    title: "Department of English",
    subtitle: "Nurturing critical thinkers and effective communicators for a globalized world.",
  },
   stats: [
    { value: "500+", label: "Graduates" },
    { value: "10", label: "Faculty Members" },
    { value: "10", label: "Programs Offered" },
    { value: "20+", label: "Publications" },
  ],
  chairman: {
    name: "Dr. Sarah Rahman",
    designation: "Associate Professor & Head",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    message: `Welcome to the Department of English at Port City International University (PCIU). Our department is committed to excellence in teaching, research, and community engagement in the fields of English Language and Literature. Since our establishment, we have been dedicated to nurturing critical thinkers, effective communicators, and culturally aware individuals who can thrive in a globalized world.\n\nOur faculty comprises experienced educators with diverse specializations including British Literature, American Literature, Linguistics, ELT, and Postcolonial Studies. We pride ourselves on fostering a supportive learning environment that encourages intellectual curiosity and academic growth.`,
  },
  overview: {
    content: "The Department of English at PCIU offers comprehensive programs in English Language and Literature. Our curriculum is designed to develop critical thinking, communication, and analytical skills essential for success in various professional fields.",
    features: [],
  },
  programs: [
    { name: "BA (Hons) in English", duration: "4 Years", credits: "132", description: "Undergraduate program in English Language and Literature.", concentrations: [] },
    { name: "MA in English Literature", duration: "1 Year", credits: "36", description: "Graduate program in English Literature.", concentrations: [] },
    { name: "MA in ELT", duration: "1 Year", credits: "36", description: "Graduate program in English Language Teaching.", concentrations: [] },
  ],
  facilities: [
    { name: "Language Lab" },
    { name: "Digital Library" },
    { name: "Seminar Room" },
    { name: "Research Center" },
  ],
  notices: [
    { title: "Admission Notice for MA in English Literature 2025", date: "2025-01-10", type: "admission" },
    { title: "Seminar on Contemporary Postcolonial Literature", date: "2025-01-05", type: "event" },
    { title: "Creative Writing Workshop Registration Open", date: "2024-12-28", type: "event" },
    { title: "Department Annual Literary Festival Announcement", date: "2024-12-20", type: "event" },
  ],
  contact: {
    address: "Department of English\nPort City International University\nChittagong, Bangladesh",
    phone: "+880-31-123456 (Ext. 260)",
    email: "english@pciu.edu.bd",
    hours: "Sun - Thu: 9:00 AM - 5:00 PM",
  },
  quickLinks: [
    { label: "University Library", url: "#" },
    { label: "Student Portal", url: "#" },
    { label: "Research Publications", url: "#" },
    { label: "Academic Calendar", url: "#" },
    { label: "Scholarship Information", url: "#" },
    { label: "Career Services", url: "#" },
  ],
};

const DEFAULTS = ENGLISH_DEFAULTS;

const DepartmentEnglish = () => {
  const editMode = useEditMode();
  const { content: dbContent } = useDepartmentContent('department-english');
  const activeContent = editMode?.isEditMode ? (editMode.content || {}) : dbContent;

  const hero = mergeContent(DEFAULTS.hero, activeContent.hero);
  const stats = activeContent.stats?.length ? activeContent.stats : DEFAULTS.stats;
  const chairman = mergeContent(DEFAULTS.chairman, activeContent.chairman);
  const overview = mergeContent(DEFAULTS.overview, activeContent.overview);
  const programs = activeContent.programs?.length ? activeContent.programs : DEFAULTS.programs;
  const notices = activeContent.notices?.length ? activeContent.notices : DEFAULTS.notices;
  const contact = mergeContent(DEFAULTS.contact, activeContent.contact);
  const quickLinks = activeContent.quickLinks?.length ? activeContent.quickLinks : DEFAULTS.quickLinks;

  const facultyMembers = [
    { name: "Dr. Sarah Rahman", designation: "Associate Professor & Head", specialization: "Postcolonial Literature" },
    { name: "Prof. Ahmed Hossain", designation: "Professor", specialization: "Applied Linguistics" },
    { name: "Dr. Fatima Akter", designation: "Associate Professor", specialization: "Victorian Literature" },
    { name: "Dr. Kamal Uddin", designation: "Assistant Professor", specialization: "Digital Humanities" },
    { name: "Ms. Nusrat Jahan", designation: "Lecturer", specialization: "ELT Methodology" },
    { name: "Dr. Rabeya Islam", designation: "Assistant Professor", specialization: "American Literature" },
  ];

  const researchAreas = [
    { title: "Postcolonial Literature and Identity Politics", author: "Dr. Fatima Akter, Dr. Sarah Rahman", description: "Research exploring themes of identity, diaspora, and cultural hybridity in South Asian literature." },
    { title: "Second Language Acquisition in Bangladeshi Context", author: "Prof. Ahmed Hossain, Ms. Nusrat Jahan", description: "Investigating effective methodologies for English language teaching in the Bangladeshi educational system." },
    { title: "Digital Humanities and Literary Analysis", author: "Dr. Kamal Uddin", description: "Applying computational methods to analyze patterns in classical and contemporary English literature." },
    { title: "Eco-criticism in Contemporary Fiction", author: "Dr. Rabeya Islam", description: "Examining environmental consciousness and ecological themes in modern English novels." },
  ];

  const E = ({ sectionKey, label, children }: { sectionKey: string; label: string; children: React.ReactNode }) => {
    if (editMode?.isEditMode) return <EditableSection sectionKey={sectionKey} label={label}>{children}</EditableSection>;
    return <>{children}</>;
  };

  return (
    <div className="min-h-screen bg-background">
      {!editMode?.isEditMode && <Header />}
      
     <E sectionKey="hero" label="Hero Section">
        <section className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Badge className="mb-4 bg-accent text-accent-foreground">{hero.badge}</Badge>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{hero.title}</h1>
              
              <p className="text-xl text-primary-foreground/90 mb-6">{hero.subtitle}</p>
            <div className="flex flex-wrap gap-4">
                <Button className="bg-highlight hover:bg-highlight/90 text-highlight-foreground">
  Apply Now
</Button>
                <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  Download Brochure
                </Button>
              </div>
            </div>
          </div>
        </section>
      </E>
        {/* Quick Stats */}
      <E sectionKey="stats" label="Statistics">
        <section className="py-8 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </E>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            <E sectionKey="overview" label="Welcome Section">
              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4 pb-2 border-b-4 border-accent inline-block">WELCOME TO DEPARTMENT OF ENGLISH</h2>
                <div className="prose prose-neutral max-w-none text-muted-foreground text-justify mt-6">
                  {overview.content?.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </section>
            </E>

            <E sectionKey="chairman" label="Head's Message">
              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4 pb-2 border-b-4 border-accent inline-block">MESSAGE FROM HEAD OF DEPARTMENT</h2>
                <div className="flex flex-col md:flex-row gap-6 mt-6">
                  <div className="flex-shrink-0">
                    <img src={chairman.image} alt={chairman.name} className="w-40 h-48 object-cover rounded-lg shadow-md" />
                    <div className="mt-3 text-center">
                      <h4 className="font-heading font-bold text-foreground">{chairman.name}</h4>
                      <p className="text-sm text-muted-foreground">{chairman.designation}</p>
                    </div>
                  </div>
                  <div className="prose prose-neutral max-w-none text-muted-foreground text-justify"><p className="whitespace-pre-line">{chairman.message}</p></div>
                </div>
              </section>
            </E>

            <E sectionKey="programs" label="Programs">
              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4 pb-2 border-b-4 border-accent inline-block">PROGRAMS OFFERED</h2>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  {programs.map((program) => (
                    <Card key={program.name} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-2"><GraduationCap className="w-10 h-10 text-accent mb-2" /><CardTitle className="text-lg font-heading">{program.name}</CardTitle></CardHeader>
                      <CardContent><p className="text-sm text-muted-foreground">Duration: {program.duration}</p><p className="text-sm text-muted-foreground">Credit Hours: {program.credits}</p></CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </E>

            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4 pb-2 border-b-4 border-accent inline-block">FACULTY MEMBERS</h2>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {facultyMembers.map((m) => (
                  <Card key={m.name} className="hover:shadow-md transition-shadow"><CardContent className="flex items-center gap-4 p-4"><div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center"><Users className="w-8 h-8 text-muted-foreground" /></div><div><h4 className="font-heading font-semibold text-foreground">{m.name}</h4><p className="text-sm text-muted-foreground">{m.designation}</p><p className="text-xs text-accent">{m.specialization}</p><Link to={`/faculty/${encodeURIComponent(m.name)}`} className="text-accent hover:underline text-xs font-medium mt-1 inline-flex items-center gap-1">View Profile <ExternalLink className="w-3 h-3" /></Link></div></CardContent></Card>
                ))}
              </div>
              <Link to="/faculty?department=English"><Button variant="outline" className="mt-4">View All Faculty Members <ExternalLink className="w-4 h-4 ml-2" /></Button></Link>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4"><h2 className="font-heading text-2xl font-bold text-foreground pb-2 border-b-4 border-accent inline-block">RESEARCH ACTIVITIES</h2><a href="#" className="text-accent hover:underline text-sm font-medium">View all research →</a></div>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {researchAreas.map((r, i) => (
                  <Card key={i} className="hover:shadow-lg transition-shadow"><CardHeader className="pb-2"><CardTitle className="text-base font-heading text-foreground line-clamp-2">{r.title}</CardTitle><p className="text-xs text-accent">Author: {r.author}</p></CardHeader><CardContent><p className="text-sm text-muted-foreground line-clamp-3">{r.description}</p><a href="#" className="text-accent hover:underline text-sm font-medium mt-2 inline-block">READ MORE</a></CardContent></Card>
                ))}
              </div>
            </section>

            <DepartmentEvents departmentName="English" />
          </div>

          <aside className="space-y-6">
            <E sectionKey="notices" label="Notices">
              <Card className="bg-primary text-primary-foreground">
                <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5" />LATEST NOTICES</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {notices.map((n, i) => (<div key={i} className="border-b border-primary-foreground/20 pb-3 last:border-0"><a href="#" className="text-sm hover:text-accent transition-colors line-clamp-2 font-medium">{n.title}</a><p className="text-xs text-primary-foreground/60 mt-1">{n.date}</p><Button variant="ghost" size="sm" className="text-accent hover:text-accent/80 p-0 h-auto mt-1"><Download className="w-3 h-3 mr-1" /> Download</Button></div>))}
                  <a href="/notices" className="text-accent hover:underline text-sm font-medium block mt-2">View all notices →</a>
                </CardContent>
              </Card>
            </E>

            <E sectionKey="quickLinks" label="Quick Links">
              <Card><CardHeader className="bg-accent text-accent-foreground rounded-t-lg"><CardTitle className="flex items-center gap-2"><BookOpen className="w-5 h-5" />Quick Links</CardTitle></CardHeader>
                <CardContent className="pt-4"><ul className="space-y-2">{quickLinks.map((l) => (<li key={l.label}><a href={l.url} className="text-accent hover:underline text-sm flex items-center gap-2"><ExternalLink className="w-3 h-3" />{l.label}</a></li>))}</ul></CardContent>
              </Card>
            </E>

            <E sectionKey="contact" label="Contact Info">
              <Card><CardHeader className="bg-secondary text-secondary-foreground rounded-t-lg"><CardTitle>Contact Us</CardTitle></CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" /><p className="text-sm text-muted-foreground whitespace-pre-line">{contact.address}</p></div>
                  <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-accent" /><p className="text-sm text-muted-foreground">{contact.phone}</p></div>
                  <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-accent" /><a href={`mailto:${contact.email}`} className="text-sm text-accent hover:underline">{contact.email}</a></div>
                </CardContent>
              </Card>
            </E>

            <Card><CardHeader><CardTitle className="flex items-center gap-2"><Award className="w-5 h-5 text-highlight" />Achievements</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center p-4 bg-muted rounded-lg"><p className="text-3xl font-bold text-accent">300+</p><p className="text-sm text-muted-foreground">Graduates</p></div>
                <div className="text-center p-4 bg-muted rounded-lg"><p className="text-3xl font-bold text-accent">15+</p><p className="text-sm text-muted-foreground">Research Publications</p></div>
                <div className="text-center p-4 bg-muted rounded-lg"><p className="text-3xl font-bold text-accent">10+</p><p className="text-sm text-muted-foreground">Literary Events/Year</p></div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {!editMode?.isEditMode && <Footer />}
    </div>
  );
};

export default DepartmentEnglish;
