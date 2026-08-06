import { BookOpen, Users, Award, FileText, GraduationCap, Mail, Phone, MapPin, ExternalLink, Download, Palette, Scissors, Sparkles, PenTool } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DepartmentEvents from "@/components/department/DepartmentEvents";
import { useDepartmentContent, mergeContent } from "@/hooks/useDepartmentContent";
import { useEditMode } from "@/contexts/EditModeContext";
import EditableSection from "@/components/admin/EditableSection";

export const FASHION_DEFAULTS = {
  hero: {
    badge: "Faculty of Science and Engineering",
    title: "Department of Fashion Design and Technology",
    subtitle: "Nurturing creativity and technical skills for Bangladesh's fashion and apparel industry.",
  },
  chairman: {
    name: "Prof. Nasreen Akter",
    designation: "Chairperson & Associate Professor",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop",
    message: `Welcome to the Department of Fashion Design and Technology at Port City International University. Our department offers a wide range of career opportunities for students, from having your own establishment to working for top labels, fashion designers, garment export houses, and textile mills.\n\nOur graduates find successful careers as apparel merchandisers, visual merchandisers, public relations and marketing professionals, stylists, and even lecturers for Fashion Design institutions.\n\nWe focus on nurturing creativity while providing strong technical skills in pattern making, garment construction, textile science, and fashion marketing. Our industry connections ensure students gain practical experience through internships and projects with leading fashion houses.`,
  },
  overview: {
    content: "The Department of Fashion Design and Technology offers comprehensive programs combining creativity with technical skills in pattern making, garment construction, textile science, and fashion marketing.",
    features: [],
  },
  programs: [
    { name: "BSc in Fashion Design & Technology", duration: "4 Years", credits: "140", description: "Undergraduate program in fashion design.", concentrations: [] },
    { name: "Diploma in Fashion Design", duration: "2 Years", credits: "72", description: "Diploma program in fashion design.", concentrations: [] },
    { name: "Certificate in Apparel Merchandising", duration: "1 Year", credits: "36", description: "Certificate program in apparel merchandising.", concentrations: [] },
  ],
  facilities: [
    { name: "Pattern Making Lab" },
    { name: "Design Studio" },
    { name: "Sewing Lab" },
    { name: "CAD Lab" },
  ],
  notices: [
    { title: "Admission Open for BSc in Fashion Design 2025", date: "2025-01-15", type: "admission" },
    { title: "Annual Fashion Show - Spring Collection 2025", date: "2025-01-12", type: "event" },
    { title: "Workshop on Sustainable Fashion Design", date: "2025-01-05", type: "event" },
    { title: "Industry Internship Opportunities at Leading Brands", date: "2024-12-28", type: "event" },
  ],
  contact: {
    address: "Department of Fashion Design\nPort City International University\nChittagong, Bangladesh",
    phone: "+880-31-123456 (Ext. 290)",
    email: "fashion@pciu.edu.bd",
    hours: "Sun - Thu: 9:00 AM - 5:00 PM",
  },
  quickLinks: [
    { label: "University Library", url: "/library" },
    { label: "Student Portfolio Gallery", url: "#" },
    { label: "Research Publications", url: "#" },
    { label: "Academic Calendar", url: "#" },
    { label: "Scholarship Information", url: "#" },
    { label: "Career Services", url: "#" },
  ],
};

const DEFAULTS = FASHION_DEFAULTS;
const labIcons: Record<string, typeof Scissors> = { "Pattern Making Lab": Scissors, "Design Studio": PenTool, "Sewing Lab": Sparkles, "CAD Lab": Palette };

const DepartmentFashion = () => {
  const editMode = useEditMode();
  const { content: dbContent } = useDepartmentContent('department-fashion');
  const activeContent = editMode?.isEditMode ? (editMode.content || {}) : dbContent;

  const hero = mergeContent(DEFAULTS.hero, activeContent.hero);
  const chairman = mergeContent(DEFAULTS.chairman, activeContent.chairman);
  const overview = mergeContent(DEFAULTS.overview, activeContent.overview);
  const programs = activeContent.programs?.length ? activeContent.programs : DEFAULTS.programs;
  const facilities = activeContent.facilities?.length ? activeContent.facilities : DEFAULTS.facilities;
  const notices = activeContent.notices?.length ? activeContent.notices : DEFAULTS.notices;
  const contact = mergeContent(DEFAULTS.contact, activeContent.contact);
  const quickLinks = activeContent.quickLinks?.length ? activeContent.quickLinks : DEFAULTS.quickLinks;

  const facultyMembers = [
    { name: "Prof. Nasreen Akter", designation: "Chairperson", specialization: "Fashion Design" },
    { name: "Dr. Farzana Islam", designation: "Associate Professor", specialization: "Textile Technology" },
    { name: "Ms. Tahmina Rahman", designation: "Assistant Professor", specialization: "Sustainable Fashion" },
    { name: "Mr. Rifat Ahmed", designation: "Lecturer", specialization: "CAD/CAM" },
    { name: "Ms. Rumana Yasmin", designation: "Lecturer", specialization: "Traditional Textiles" },
    { name: "Ms. Shireen Sultana", designation: "Lecturer", specialization: "Fashion Marketing" },
  ];

  const researchAreas = [
    { title: "Sustainable Fashion Design", author: "Prof. Nasreen Akter, Ms. Tahmina Rahman", description: "Research on eco-friendly fashion, upcycling techniques, and sustainable production methods." },
    { title: "Digital Fashion Technology", author: "Dr. Farzana Islam, Mr. Rifat Ahmed", description: "Exploring CAD/CAM applications, 3D virtual prototyping, and digital fashion design tools." },
    { title: "Traditional Bangladeshi Textiles", author: "Ms. Rumana Yasmin", description: "Preservation and modernization of traditional Bangladeshi textile crafts like Jamdani and Nakshi Kantha." },
    { title: "Fashion Marketing & Branding", author: "Ms. Shireen Sultana, Mr. Kawser Ali", description: "Consumer behavior, brand development, and marketing strategies for fashion industry." },
  ];

  const E = ({ sectionKey, label, children }: { sectionKey: string; label: string; children: React.ReactNode }) => {
    if (editMode?.isEditMode) return <EditableSection sectionKey={sectionKey} label={label}>{children}</EditableSection>;
    return <>{children}</>;
  };

  return (
    <div className="min-h-screen bg-background">
      {!editMode?.isEditMode && <Header />}
      
      <E sectionKey="hero" label="Hero Section">
        <section className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <p className="text-accent font-medium mb-2">{hero.badge}</p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{hero.title}</h1>
              <p className="text-primary-foreground/80 text-lg max-w-2xl">{hero.subtitle}</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
        </section>
      </E>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            <E sectionKey="overview" label="Welcome Section">
              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4 pb-2 border-b-4 border-accent inline-block">WELCOME TO DEPARTMENT OF FASHION DESIGN</h2>
                <div className="prose prose-neutral max-w-none text-muted-foreground text-justify mt-6">
                  {overview.content?.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </section>
            </E>

            <E sectionKey="chairman" label="Chairperson's Message">
              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4 pb-2 border-b-4 border-accent inline-block">MESSAGE FROM CHAIRPERSON</h2>
                <div className="flex flex-col md:flex-row gap-6 mt-6">
                  <div className="flex-shrink-0">
                    <img src={chairman.image} alt={chairman.name} className="w-40 h-48 object-cover rounded-lg shadow-md" />
                    <div className="mt-3 text-center"><h4 className="font-heading font-bold text-foreground">{chairman.name}</h4><p className="text-sm text-muted-foreground">{chairman.designation}</p></div>
                  </div>
                  <div className="prose prose-neutral max-w-none text-muted-foreground text-justify"><p className="whitespace-pre-line">{chairman.message}</p></div>
                </div>
              </section>
            </E>

            <E sectionKey="facilities" label="Lab Facilities">
              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4 pb-2 border-b-4 border-accent inline-block">LAB FACILITIES</h2>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  {facilities.map((f) => { const Icon = labIcons[f.name] || Scissors; return (
                    <Card key={f.name} className="hover:shadow-lg transition-shadow"><CardContent className="flex items-center gap-4 p-4"><div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center"><Icon className="w-6 h-6 text-accent" /></div><div><h4 className="font-heading font-semibold text-foreground">{f.name}</h4></div></CardContent></Card>
                  ); })}
                </div>
              </section>
            </E>

            <E sectionKey="programs" label="Programs">
              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4 pb-2 border-b-4 border-accent inline-block">PROGRAMS OFFERED</h2>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  {programs.map((p) => (
                    <Card key={p.name} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-2"><GraduationCap className="w-10 h-10 text-accent mb-2" /><CardTitle className="text-lg font-heading">{p.name}</CardTitle></CardHeader>
                      <CardContent><p className="text-sm text-muted-foreground">Duration: {p.duration}</p><p className="text-sm text-muted-foreground">Credit Hours: {p.credits}</p></CardContent>
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
              <Link to="/faculty?department=Fashion Design and Technology"><Button variant="outline" className="mt-4">View All Faculty Members <ExternalLink className="w-4 h-4 ml-2" /></Button></Link>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4"><h2 className="font-heading text-2xl font-bold text-foreground pb-2 border-b-4 border-accent inline-block">RESEARCH ACTIVITIES</h2><a href="#" className="text-accent hover:underline text-sm font-medium">View all research →</a></div>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {researchAreas.map((r, i) => (
                  <Card key={i} className="hover:shadow-lg transition-shadow"><CardHeader className="pb-2"><CardTitle className="text-base font-heading text-foreground line-clamp-2">{r.title}</CardTitle><p className="text-xs text-accent">Author: {r.author}</p></CardHeader><CardContent><p className="text-sm text-muted-foreground line-clamp-3">{r.description}</p><a href="#" className="text-accent hover:underline text-sm font-medium mt-2 inline-block">READ MORE</a></CardContent></Card>
                ))}
              </div>
            </section>

            <DepartmentEvents departmentName="Fashion Design and Technology" />
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
                <div className="text-center p-4 bg-muted rounded-lg"><p className="text-3xl font-bold text-accent">200+</p><p className="text-sm text-muted-foreground">Graduates</p></div>
                <div className="text-center p-4 bg-muted rounded-lg"><p className="text-3xl font-bold text-accent">15+</p><p className="text-sm text-muted-foreground">Fashion Shows</p></div>
                <div className="text-center p-4 bg-muted rounded-lg"><p className="text-3xl font-bold text-accent">20+</p><p className="text-sm text-muted-foreground">Industry Partners</p></div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {!editMode?.isEditMode && <Footer />}
    </div>
  );
};

export default DepartmentFashion;
