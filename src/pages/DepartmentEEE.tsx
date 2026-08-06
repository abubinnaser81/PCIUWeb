import { BookOpen, Users, Award, FileText, GraduationCap, Mail, Phone, MapPin, ExternalLink, Download, Zap, Cpu, Radio, Battery } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DepartmentEvents from "@/components/department/DepartmentEvents";
import { useDepartmentContent, mergeContent } from "@/hooks/useDepartmentContent";
import { useEditMode } from "@/contexts/EditModeContext";
import EditableSection from "@/components/admin/EditableSection";

export const EEE_DEFAULTS = {
  hero: {
    badge: "Faculty of Science and Engineering",
    title: "Department of Electrical and Electronic Engineering",
    subtitle: "Powering innovation through excellence in electrical and electronic engineering education.",
  },
  chairman: {
    name: "Dr. Quazi Delwar Hossain",
    designation: "Coordinator & Professor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    message: `Welcome to the Department of Electrical and Electronic Engineering at Port City International University. Our department is dedicated to nurturing skilled engineers who can contribute to the advancement of electrical and electronic technology.\n\nThe EEE department offers a comprehensive curriculum that covers power systems, electronics, telecommunications, and control systems. Our faculty members bring extensive academic and industry experience to provide students with both theoretical knowledge and practical skills.\n\nWe are committed to producing graduates who are not only technically proficient but also ethical and socially responsible engineers ready to tackle the challenges of modern society.`,
  },
  overview: {
    content: "The Department of Electrical and Electronic Engineering at Port City International University was established with the vision to produce highly skilled engineers capable of contributing to the nation's technological advancement.\n\nOur comprehensive curriculum covers core areas including power systems engineering, electronics, telecommunications, control systems, and emerging technologies like renewable energy and smart grid systems.\n\nWith well-equipped laboratories and experienced faculty members, the department provides students with both theoretical knowledge and hands-on practical experience necessary for successful careers in the electrical and electronics industry.",
    features: [],
  },
  programs: [
    { name: "BSc in Electrical & Electronic Engineering", duration: "4 Years", credits: "160", description: "Comprehensive undergraduate program in EEE.", concentrations: [] },
    { name: "MSc in EEE", duration: "1.5 Years", credits: "45", description: "Advanced graduate program in EEE.", concentrations: [] },
    { name: "PhD in Electrical Engineering", duration: "3-5 Years", credits: "60", description: "Doctoral program in EEE research.", concentrations: [] },
  ],
  facilities: [
    { name: "Power Electronics Lab" },
    { name: "Digital Electronics Lab" },
    { name: "Communication Lab" },
    { name: "Electrical Machines Lab" },
  ],
  notices: [
    { title: "Admission Open for BSc in EEE Spring 2025", date: "2025-01-15", type: "admission" },
    { title: "Industrial Visit to Power Grid Bangladesh", date: "2025-01-08", type: "event" },
    { title: "Seminar on Renewable Energy Technologies", date: "2025-01-02", type: "event" },
    { title: "Project Exhibition and Competition", date: "2024-12-25", type: "event" },
  ],
  contact: {
    address: "Department of EEE\nPort City International University\nChittagong, Bangladesh",
    phone: "+880-31-123456 (Ext. 230)",
    email: "eee@pciu.edu.bd",
    hours: "Sun - Thu: 9:00 AM - 5:00 PM",
  },
  quickLinks: [
    { label: "University Library", url: "/library" },
    { label: "Student Portal", url: "#" },
    { label: "Research Publications", url: "#" },
    { label: "Academic Calendar", url: "#" },
    { label: "Scholarship Information", url: "#" },
    { label: "Career Services", url: "#" },
  ],
};

const DEFAULTS = EEE_DEFAULTS;
const labIcons: Record<string, typeof Zap> = { "Power Electronics Lab": Zap, "Digital Electronics Lab": Cpu, "Communication Lab": Radio, "Electrical Machines Lab": Battery };

const DepartmentEEE = () => {
  const editMode = useEditMode();
  const { content: dbContent } = useDepartmentContent('department-eee');
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
    { name: "Dr. Quazi Delwar Hossain", designation: "Coordinator & Professor", specialization: "Power Systems" },
    { name: "Prof. Rafiqul Islam", designation: "Professor", specialization: "Control Systems" },
    { name: "Dr. Kamal Ahmed", designation: "Associate Professor", specialization: "Renewable Energy" },
    { name: "Dr. Nasima Akter", designation: "Assistant Professor", specialization: "Smart Grid" },
    { name: "Mr. Naeem Pasha", designation: "Lecturer", specialization: "Embedded Systems" },
    { name: "Dr. Sharif Ahmed", designation: "Assistant Professor", specialization: "Telecommunications" },
  ];

  const researchAreas = [
    { title: "Renewable Energy Systems", author: "Dr. Quazi Delwar Hossain, Dr. Kamal Ahmed", description: "Research on solar power optimization, wind energy systems, and hybrid renewable energy solutions for Bangladesh." },
    { title: "Smart Grid Technology", author: "Prof. Rafiqul Islam, Dr. Nasima Akter", description: "Developing intelligent power distribution systems with advanced monitoring and control capabilities." },
    { title: "Embedded Systems & IoT", author: "Mr. Naeem Pasha, Dr. Faisal Rahman", description: "Research on microcontroller-based systems and Internet of Things applications in industrial automation." },
    { title: "Telecommunications & Signal Processing", author: "Dr. Sharif Ahmed", description: "Advanced research in digital signal processing, wireless communications, and antenna design." },
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
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4 pb-2 border-b-4 border-accent inline-block">WELCOME TO DEPARTMENT OF EEE</h2>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="prose prose-neutral max-w-none text-muted-foreground text-justify">
                    {overview.content?.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop" alt="EEE Lab" className="w-full h-full object-cover" />
                  </div>
                </div>
              </section>
            </E>

            <E sectionKey="chairman" label="Coordinator's Message">
              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4 pb-2 border-b-4 border-accent inline-block">MESSAGE FROM COORDINATOR</h2>
                <div className="flex flex-col md:flex-row gap-6 mt-6">
                  <div className="flex-shrink-0">
                    <img src={chairman.image} alt={chairman.name} className="w-40 h-48 object-cover rounded-lg shadow-md" />
                    <div className="mt-3 text-center">
                      <h4 className="font-heading font-bold text-foreground">{chairman.name}</h4>
                      <p className="text-sm text-muted-foreground">{chairman.designation}</p>
                    </div>
                  </div>
                  <div className="prose prose-neutral max-w-none text-muted-foreground text-justify">
                    <p className="whitespace-pre-line">{chairman.message}</p>
                  </div>
                </div>
              </section>
            </E>

            <E sectionKey="facilities" label="Lab Facilities">
              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4 pb-2 border-b-4 border-accent inline-block">LAB FACILITIES</h2>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  {facilities.map((lab) => {
                    const Icon = labIcons[lab.name] || Zap;
                    return (
                      <Card key={lab.name} className="hover:shadow-lg transition-shadow">
                        <CardContent className="flex items-center gap-4 p-4">
                          <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center"><Icon className="w-6 h-6 text-accent" /></div>
                          <div><h4 className="font-heading font-semibold text-foreground">{lab.name}</h4></div>
                        </CardContent>
                      </Card>
                    );
                  })}
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
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Duration: {program.duration}</p>
                        <p className="text-sm text-muted-foreground">Credit Hours: {program.credits}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </E>

            <section>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4 pb-2 border-b-4 border-accent inline-block">FACULTY MEMBERS</h2>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {facultyMembers.map((member) => (
                  <Card key={member.name} className="hover:shadow-md transition-shadow">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center"><Users className="w-8 h-8 text-muted-foreground" /></div>
                      <div>
                        <h4 className="font-heading font-semibold text-foreground">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.designation}</p>
                        <p className="text-xs text-accent">{member.specialization}</p>
                        <Link to={`/faculty/${encodeURIComponent(member.name)}`} className="text-accent hover:underline text-xs font-medium mt-1 inline-flex items-center gap-1">View Profile <ExternalLink className="w-3 h-3" /></Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Link to="/faculty?department=Electrical and Electronic Engineering"><Button variant="outline" className="mt-4">View All Faculty Members <ExternalLink className="w-4 h-4 ml-2" /></Button></Link>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-2xl font-bold text-foreground pb-2 border-b-4 border-accent inline-block">RESEARCH ACTIVITIES</h2>
                <a href="#" className="text-accent hover:underline text-sm font-medium">View all research →</a>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {researchAreas.map((research, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-heading text-foreground line-clamp-2">{research.title}</CardTitle>
                      <p className="text-xs text-accent">Author: {research.author}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">{research.description}</p>
                      <a href="#" className="text-accent hover:underline text-sm font-medium mt-2 inline-block">READ MORE</a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <DepartmentEvents departmentName="Electrical and Electronic Engineering" />
          </div>

          <aside className="space-y-6">
            <E sectionKey="notices" label="Notices">
              <Card className="bg-primary text-primary-foreground">
                <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5" />LATEST NOTICES</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {notices.map((notice, index) => (
                    <div key={index} className="border-b border-primary-foreground/20 pb-3 last:border-0">
                      <a href="#" className="text-sm hover:text-accent transition-colors line-clamp-2 font-medium">{notice.title}</a>
                      <p className="text-xs text-primary-foreground/60 mt-1">{notice.date}</p>
                      <Button variant="ghost" size="sm" className="text-accent hover:text-accent/80 p-0 h-auto mt-1"><Download className="w-3 h-3 mr-1" /> Download</Button>
                    </div>
                  ))}
                  <a href="/notices" className="text-accent hover:underline text-sm font-medium block mt-2">View all notices →</a>
                </CardContent>
              </Card>
            </E>

            <E sectionKey="quickLinks" label="Quick Links">
              <Card>
                <CardHeader className="bg-accent text-accent-foreground rounded-t-lg"><CardTitle className="flex items-center gap-2"><BookOpen className="w-5 h-5" />Quick Links</CardTitle></CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2">
                    {quickLinks.map((link) => (<li key={link.label}><a href={link.url} className="text-accent hover:underline text-sm flex items-center gap-2"><ExternalLink className="w-3 h-3" />{link.label}</a></li>))}
                  </ul>
                </CardContent>
              </Card>
            </E>

            <E sectionKey="contact" label="Contact Info">
              <Card>
                <CardHeader className="bg-secondary text-secondary-foreground rounded-t-lg"><CardTitle>Contact Us</CardTitle></CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" /><p className="text-sm text-muted-foreground whitespace-pre-line">{contact.address}</p></div>
                  <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-accent" /><p className="text-sm text-muted-foreground">{contact.phone}</p></div>
                  <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-accent" /><a href={`mailto:${contact.email}`} className="text-sm text-accent hover:underline">{contact.email}</a></div>
                </CardContent>
              </Card>
            </E>

            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Award className="w-5 h-5 text-highlight" />Achievements</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center p-4 bg-muted rounded-lg"><p className="text-3xl font-bold text-accent">600+</p><p className="text-sm text-muted-foreground">Graduates</p></div>
                <div className="text-center p-4 bg-muted rounded-lg"><p className="text-3xl font-bold text-accent">25+</p><p className="text-sm text-muted-foreground">IEEE Publications</p></div>
                <div className="text-center p-4 bg-muted rounded-lg"><p className="text-3xl font-bold text-accent">10+</p><p className="text-sm text-muted-foreground">Industry Partners</p></div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {!editMode?.isEditMode && <Footer />}
    </div>
  );
};

export default DepartmentEEE;
