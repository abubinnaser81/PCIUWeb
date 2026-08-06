import { BookOpen, Users, Award, FileText, GraduationCap, Mail, Phone, MapPin, ExternalLink, Download, Cpu, Code, Database, Monitor } from "lucide-react";
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

export const CSE_DEFAULTS = {
  hero: {
    badge: "Faculty of Science and Engineering",
    title: "Department of Computer Science and Engineering",
    subtitle: "Empowering future tech leaders through excellence in computer science education, research, and innovation.",
  },
  chairman: {
    name: "Prof. Dr. Mohammad Rahman",
    designation: "Chairman & Professor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    message: `Welcome to the Department of Computer Science and Engineering. The goal of our department is to facilitate our students to be the best computer engineers and contribute to the development of our nation as well as the whole world with their creativities.

We also have our faculties with their best knowledge and research activities. Our faculties are friendly and helpful to our students. Hence the relationship between our faculty members and students is really precious and wonderful. All students can reach to the faculty members when they need.

Our department provides quality education with modern curriculum, state-of-the-art computer labs, and industry-oriented training to prepare students for the rapidly evolving tech industry.`,
  },
  overview: {
    content: "The Department of Computer Science and Engineering at Port City International University is committed to providing world-class education in computing and information technology. Our curriculum is designed to meet industry demands and prepare students for successful careers in the tech sector.\n\nComputer Science is a dynamic and innovative discipline. As undergraduate students progress through their studies, they are exposed to a wide range of subject matter within the discipline. Our degree courses give students a deeper understanding of the many diverse and interesting areas of computer science, preparing them for an industry or research-oriented career path.\n\nThe department aims to provide fundamental software skills and professional IT values, equip students with cutting-edge technologies, and foster innovation and entrepreneurship.",
    features: [],
  },
  programs: [
    { name: "BSc in Computer Science & Engineering", duration: "4 Years", credits: "160", description: "Comprehensive undergraduate program in computer science.", concentrations: [] },
    { name: "MSc in Computer Science", duration: "1.5 Years", credits: "45", description: "Advanced graduate program in computer science.", concentrations: [] },
    { name: "PhD in Computer Science", duration: "3-5 Years", credits: "60", description: "Doctoral program in computer science research.", concentrations: [] },
  ],
  facilities: [
    { name: "Programming Lab" },
    { name: "Database Lab" },
    { name: "Network Lab" },
    { name: "Hardware Lab" },
  ],
  notices: [
    { title: "Registration Open for BSc in CSE Spring 2025", date: "2025-01-15", type: "admission" },
    { title: "Programming Contest - Code Fest 2025", date: "2025-01-10", type: "event" },
    { title: "Internship Fair for Final Year Students", date: "2025-01-05", type: "event" },
    { title: "Workshop on Machine Learning Fundamentals", date: "2024-12-28", type: "event" },
  ],
  contact: {
    address: "Department of CSE\nPort City International University\nChittagong, Bangladesh",
    phone: "+880-31-123456 (Ext. 220)",
    email: "cse@pciu.edu.bd",
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

const DEFAULTS = CSE_DEFAULTS;

const labIcons: Record<string, typeof Code> = {
  "Programming Lab": Code,
  "Database Lab": Database,
  "Network Lab": Monitor,
  "Hardware Lab": Cpu,
};

const DepartmentCSE = () => {
  const editMode = useEditMode();
  const { content: dbContent } = useDepartmentContent('department-cse');
  const editContent = editMode?.content;
  const activeContent = editMode?.isEditMode ? (editContent || {}) : dbContent;

  const hero = mergeContent(DEFAULTS.hero, activeContent.hero);
  const chairman = mergeContent(DEFAULTS.chairman, activeContent.chairman);
  const overview = mergeContent(DEFAULTS.overview, activeContent.overview);
  const programs = activeContent.programs?.length ? activeContent.programs : DEFAULTS.programs;
  const facilities = activeContent.facilities?.length ? activeContent.facilities : DEFAULTS.facilities;
  const notices = activeContent.notices?.length ? activeContent.notices : DEFAULTS.notices;
  const contact = mergeContent(DEFAULTS.contact, activeContent.contact);
  const quickLinks = activeContent.quickLinks?.length ? activeContent.quickLinks : DEFAULTS.quickLinks;

  const facultyMembers = [
    { name: "Prof. Dr. Mohammad Rahman", designation: "Chairman & Professor", specialization: "Artificial Intelligence" },
    { name: "Dr. Ahmed Karim", designation: "Associate Professor", specialization: "Machine Learning" },
    { name: "Dr. Nasrin Sultana", designation: "Associate Professor", specialization: "Cybersecurity" },
    { name: "Dr. Farhan Ahmed", designation: "Assistant Professor", specialization: "IoT & Embedded Systems" },
    { name: "Mr. Tanvir Islam", designation: "Lecturer", specialization: "Cloud Computing" },
    { name: "Ms. Fatima Begum", designation: "Lecturer", specialization: "Software Engineering" },
  ];

  const researchAreas = [
    { title: "Artificial Intelligence & Machine Learning", author: "Dr. Ahmed Karim, Prof. Mohammad Rahman", description: "Research on deep learning algorithms, neural networks, and AI applications in healthcare and agriculture." },
    { title: "Internet of Things (IoT) Systems", author: "Dr. Farhan Ahmed, Mr. Tanvir Islam", description: "Developing smart IoT solutions for industrial automation and smart city applications." },
    { title: "Cybersecurity & Network Security", author: "Dr. Nasrin Sultana", description: "Research on intrusion detection systems, cryptographic protocols, and secure communication." },
    { title: "Software Engineering & DevOps", author: "Mr. Rakib Hassan, Ms. Fatima Begum", description: "Best practices in agile development, continuous integration, and cloud-native applications." },
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

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            <E sectionKey="overview" label="Welcome Section">
              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4 pb-2 border-b-4 border-accent inline-block">WELCOME TO DEPARTMENT OF CSE</h2>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="prose prose-neutral max-w-none text-muted-foreground text-justify">
                    {overview.content?.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop" alt="Computer Science Lab" className="w-full h-full object-cover" />
                  </div>
                </div>
              </section>
            </E>

            <E sectionKey="chairman" label="Chairman's Message">
              <section>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4 pb-2 border-b-4 border-accent inline-block">MESSAGE FROM CHAIRMAN</h2>
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
                    const Icon = labIcons[lab.name] || Cpu;
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
                      <CardHeader className="pb-2">
                        <GraduationCap className="w-10 h-10 text-accent mb-2" />
                        <CardTitle className="text-lg font-heading">{program.name}</CardTitle>
                      </CardHeader>
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
              <Link to="/faculty?department=Computer Science and Engineering"><Button variant="outline" className="mt-4">View All Faculty Members <ExternalLink className="w-4 h-4 ml-2" /></Button></Link>
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

            <DepartmentEvents departmentName="Computer Science and Engineering" />
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
                    {quickLinks.map((link) => (
                      <li key={link.label}><a href={link.url} className="text-accent hover:underline text-sm flex items-center gap-2"><ExternalLink className="w-3 h-3" />{link.label}</a></li>
                    ))}
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
                <div className="text-center p-4 bg-muted rounded-lg"><p className="text-3xl font-bold text-accent">800+</p><p className="text-sm text-muted-foreground">Graduates</p></div>
                <div className="text-center p-4 bg-muted rounded-lg"><p className="text-3xl font-bold text-accent">30+</p><p className="text-sm text-muted-foreground">Research Publications</p></div>
                <div className="text-center p-4 bg-muted rounded-lg"><p className="text-3xl font-bold text-accent">15+</p><p className="text-sm text-muted-foreground">Industry Partners</p></div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {!editMode?.isEditMode && <Footer />}
    </div>
  );
};

export default DepartmentCSE;
