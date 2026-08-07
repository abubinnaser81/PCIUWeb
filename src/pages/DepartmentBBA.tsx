import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import DepartmentEvents from "@/components/department/DepartmentEvents";
import { supabase } from "@/integrations/supabase/client";
import { useDepartmentContent, mergeContent } from "@/hooks/useDepartmentContent";
import { useEditMode } from "@/contexts/EditModeContext";
import EditableSection from "@/components/admin/EditableSection";
import { 
  GraduationCap, Users, BookOpen, Award, Mail, Phone, Clock,
  MapPin, FileText, TrendingUp, Briefcase, Target, Building
} from "lucide-react";

// Defaults — used when DB has no override
export const BBA_DEFAULTS = {
  hero: {
    badge: "Faculty of Business Studies",
    title: "Department of Business Administration",
    subtitle: "Developing Tomorrow's Business Leaders with Excellence in Management Education",
    buttonText: "Apply Now",
    buttonLink: "/admission/requirement",
  },
  stats: [
    { value: "500+", label: "Students" },
    { value: "15+", label: "Faculty Members" },
    { value: "2", label: "Programs Offered" },
    { value: "95%", label: "Placement Rate" },
  ],
  chairman: {
    name: "Dr. Mohammad Rahman",
    designation: "Professor & Chairman",
    image: "/placeholder.svg",
    message: "Welcome to the Department of Business Administration at Port City International University. Our department is committed to producing competent business graduates who can excel in the competitive global business environment. With a perfect blend of theoretical knowledge and practical skills, we prepare our students to become future business leaders, entrepreneurs, and change-makers.\n\nOur curriculum is designed in alignment with international standards and industry requirements. We emphasize case-based learning, industry exposure, and research-oriented education to ensure our graduates are ready to face real-world business challenges.",
  },
  overview: {
    content: "The Department of Business Administration was established with the vision of becoming a center of excellence in management education. We offer both undergraduate (BBA) and graduate (MBA) programs that are designed to meet the demands of the modern business world.\n\nOur programs focus on developing critical thinking, problem-solving, leadership, and communication skills. Students gain practical experience through internships, industry projects, case competitions, and corporate visits.",
    features: [
      "Industry-aligned curriculum updated regularly",
      "Experienced faculty with corporate backgrounds",
      "Strong industry partnerships and placement support",
      "State-of-the-art business simulation labs",
      "Regular workshops, seminars, and guest lectures",
      "International exchange programs",
    ],
  },
  facilities: [
    { name: "Business Simulation Lab" },
    { name: "Bloomberg Terminal Access" },
    { name: "Case Study Room" },
    { name: "Conference & Seminar Hall" },
  ],
  programs: [
    {
      name: "Bachelor of Business Administration (BBA)",
      duration: "4 Years (12 Semesters)",
      credits: "130 Credits",
      description: "A comprehensive undergraduate program designed to develop future business leaders with strong analytical, managerial, and entrepreneurial skills.",
      concentrations: ["Accounting", "Finance", "Marketing", "HRM", "Management"],
    },
    {
      name: "Master of Business Administration (MBA)",
      duration: "2 Years (4 Semesters)",
      credits: "60 Credits",
      description: "An advanced graduate program for professionals seeking to enhance their leadership capabilities and strategic management expertise.",
      concentrations: ["Finance", "Marketing", "HRM", "International Business", "MIS"],
    },
  ],
  researchAreas: [
    "Strategic Management & Corporate Governance",
    "Marketing & Consumer Behavior",
    "Financial Management & Investment",
    "Human Resource Management",
    "Entrepreneurship & Innovation",
    "International Business",
    "Supply Chain & Operations Management",
    "Digital Marketing & E-Commerce",
  ],
  industryPartners: ["Banking", "FMCG", "Telecom", "Manufacturing", "Consulting", "E-Commerce", "Pharmaceuticals"],
  notices: [
    { title: "MBA Admission Open for Spring 2025", date: "2024-12-20", type: "admission" },
    { title: "Business Case Competition Results", date: "2024-12-15", type: "event" },
    { title: "Industry Visit to Standard Chartered Bank", date: "2024-12-10", type: "event" },
    { title: "Final Exam Schedule - Fall 2024", date: "2024-12-05", type: "exam" },
  ],
  contact: {
    address: "Department of Business Administration\nPort City International University\nChittagong, Bangladesh",
    phone: "+880-31-000000",
    email: "bba@portcity.edu.bd",
    hours: "Sun - Thu: 9:00 AM - 5:00 PM",
  },
  quickLinks: [
    { label: "Academic Calendar", url: "#" },
    { label: "Course Curriculum", url: "#" },
    { label: "Internship Guidelines", url: "#" },
    { label: "Career Services", url: "#" },
    { label: "Alumni Network", url: "#" },
    { label: "Admission Requirements", url: "/admission/requirement" },
  ],
};
const DEFAULTS = BBA_DEFAULTS;

const facilityIcons: Record<string, typeof Building> = {
  "Business Simulation Lab": Building,
  "Bloomberg Terminal Access": TrendingUp,
  "Case Study Room": FileText,
  "Conference & Seminar Hall": Users,
};

const DepartmentBBA = () => {
  const editMode = useEditMode();
  
  // In edit mode, use content from context; otherwise fetch from DB
  const { content: dbContent } = useDepartmentContent('department-bba');
  const editContent = editMode?.content;
  const activeContent = editMode?.isEditMode ? (editContent || {}) : dbContent;

  const [facultyMembers, setFacultyMembers] = useState<any[]>([]);
  const [isLoadingFaculty, setIsLoadingFaculty] = useState(true);

  // Merge active content over defaults
  const hero = mergeContent(DEFAULTS.hero, activeContent.hero);
  const stats = activeContent.stats?.length ? activeContent.stats : DEFAULTS.stats;
  const chairman = mergeContent(DEFAULTS.chairman, activeContent.chairman);
  const overview = mergeContent(DEFAULTS.overview, activeContent.overview);
  const facilities = activeContent.facilities?.length ? activeContent.facilities : DEFAULTS.facilities;
  const programs = activeContent.programs?.length ? activeContent.programs : DEFAULTS.programs;
  const researchAreas = activeContent.researchAreas?.length ? activeContent.researchAreas : DEFAULTS.researchAreas;
  const industryPartners = activeContent.industryPartners?.length ? activeContent.industryPartners : DEFAULTS.industryPartners;
  const notices = activeContent.notices?.length ? activeContent.notices : DEFAULTS.notices;
  const contact = mergeContent(DEFAULTS.contact, activeContent.contact);
  const quickLinks = activeContent.quickLinks?.length ? activeContent.quickLinks : DEFAULTS.quickLinks;

 useEffect(() => {
    const fetchFaculty = async () => {
      setIsLoadingFaculty(true);
      try {
        const { data, error } = await supabase.rpc('get_public_faculty_profiles');
        console.log('Faculty RPC data:', data);
        console.log('Faculty RPC error:', error);
        if (error) { console.error('Error fetching faculty:', error); }
        else {
          const deptFaculty = (data || []).filter(
            (f: any) => f.department?.trim().toLowerCase() === 'department of business administration'
          );
          console.log('Filtered BBA faculty:', deptFaculty);
          setFacultyMembers(deptFaculty);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setIsLoadingFaculty(false);
      }
    };
    fetchFaculty();
  }, []);

  const getLatestEducation = (education: unknown): string => {
    if (!education || !Array.isArray(education) || education.length === 0) return '';
    const latest = education[0];
    return typeof latest === 'string' ? latest : `${latest?.degree || ''} ${latest?.institution ? 'from ' + latest.institution : ''}`.trim();
  };

  const displayedFaculty = facultyMembers.slice(0, 6);

  // Wrapper: if in edit mode, wrap with EditableSection; otherwise render plain
  const E = ({ sectionKey, label, children }: { sectionKey: string; label: string; children: React.ReactNode }) => {
    if (editMode?.isEditMode) {
      return <EditableSection sectionKey={sectionKey} label={label}>{children}</EditableSection>;
    }
    return <>{children}</>;
  };

  return (
    <div className="min-h-screen bg-background">
      {!editMode?.isEditMode && <Header />}
      
      {/* Hero Section */}
      <E sectionKey="hero" label="Hero Section">
        <section className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Badge className="mb-4 bg-accent text-accent-foreground">{hero.badge}</Badge>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{hero.title}</h1>
              <p className="text-xl text-primary-foreground/90 mb-6">{hero.subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-highlight hover:bg-highlight/90 text-highlight-foreground">
                  {hero.buttonText}
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

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-8">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="programs">Programs</TabsTrigger>
                  <TabsTrigger value="faculty">Faculty</TabsTrigger>
                  <TabsTrigger value="research">Research</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="space-y-6">
                  {/* Chairman's Message */}
                  <E sectionKey="chairman" label="Chairman's Message">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
                          <Award className="w-5 h-5 text-primary" />
                          Chairman's Message
                        </h3>
                        <div className="flex flex-col md:flex-row gap-6">
                          <img src={chairman.image} alt="Chairman" className="w-32 h-32 rounded-lg object-cover" />
                          <div>
                            {chairman.message.split('\n\n').map((para, i) => (
                              <p key={i} className="text-muted-foreground mb-4">{para}</p>
                            ))}
                            <p className="font-semibold mt-4">{chairman.name}</p>
                            <p className="text-sm text-muted-foreground">{chairman.designation}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </E>

                  {/* Department Overview */}
                  <E sectionKey="overview" label="Department Overview">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
                          <Target className="w-5 h-5 text-primary" />
                          Department Overview
                        </h3>
                        {overview.content.split('\n\n').map((para, i) => (
                          <p key={i} className="text-muted-foreground mb-4">{para}</p>
                        ))}
                        {overview.features.length > 0 && (
                          <>
                            <h4 className="font-semibold mb-2">Key Features:</h4>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1">
                              {overview.features.map((f, i) => <li key={i}>{f}</li>)}
                            </ul>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </E>

                  {/* Facilities */}
                  <E sectionKey="facilities" label="Facilities">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
                          <Building className="w-5 h-5 text-primary" />
                          Facilities
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {facilities.map((facility, index) => {
                            const Icon = facilityIcons[facility.name] || Building;
                            return (
                              <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                <Icon className="w-8 h-8 text-primary" />
                                <span className="font-medium">{facility.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </E>
                </TabsContent>

                <TabsContent value="programs" className="space-y-6">
                  <E sectionKey="programs" label="Programs">
                    <div className="space-y-6">
                      {programs.map((program, index) => (
                        <Card key={index}>
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <h3 className="font-heading text-xl font-bold flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-primary" />
                                {program.name}
                              </h3>
                              <Badge variant="secondary">{program.credits}</Badge>
                            </div>
                            <p className="text-muted-foreground mb-4">{program.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {program.duration}
                              </span>
                            </div>
                            {program.concentrations && program.concentrations.length > 0 && (
                              <div className="mt-4">
                                <h4 className="font-semibold mb-2">
                                  {program.name.includes("BBA") ? "Major Concentrations:" : "Specializations:"}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {program.concentrations.map((c) => (
                                    <Badge key={c} variant="outline">{c}</Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </E>
                </TabsContent>

                <TabsContent value="faculty" className="space-y-6">
                  {isLoadingFaculty ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {[1, 2, 3, 4].map((i) => (
                        <Card key={i}>
                          <CardContent className="p-6">
                            <div className="flex gap-4">
                              <Skeleton className="w-20 h-20 rounded-lg" />
                              <div className="flex-1 space-y-2">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-4 w-2/3" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="grid md:grid-cols-2 gap-6">
                        {displayedFaculty.map((member) => (
                          <Link key={member.id} to={`/faculty/${member.id}`}>
                            <Card className="hover:shadow-lg hover:border-primary transition-all duration-300 cursor-pointer">
                              <CardContent className="p-6">
                                <div className="flex gap-4">
                                  <img
                                    src={member.image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"}
                                    alt={member.name}
                                    className="w-20 h-20 rounded-lg object-cover"
                                  />
                                  <div>
                                    <h4 className="font-heading font-bold text-foreground">{member.name}</h4>
                                    <p className="text-primary text-sm">{member.designation || 'Faculty Member'}</p>
                                    {getLatestEducation(member.education) && (
                                      <p className="text-muted-foreground text-sm">{getLatestEducation(member.education)}</p>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                      {facultyMembers.length > 0 && (
                        <div className="text-center pt-4">
                          <Link to="/faculty?department=Department+of+Business+Administration">
                            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                              View All {facultyMembers.length > 6 ? `${facultyMembers.length} ` : ''}Members →
                            </Button>
                          </Link>
                        </div>
                      )}
                      {facultyMembers.length === 0 && (
                        <p className="text-muted-foreground text-center py-8">No faculty members found.</p>
                      )}
                    </>
                  )}
                </TabsContent>

                <TabsContent value="research" className="space-y-6">
                  <E sectionKey="research" label="Research Areas">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-primary" />
                          Research Focus Areas
                        </h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {researchAreas.map((area, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-primary"></div>
                              <span className="text-muted-foreground">{area}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </E>

                  <E sectionKey="industry" label="Industry Partnerships">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-primary" />
                          Industry Partnerships
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Our department maintains strong partnerships with leading organizations across various sectors:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {industryPartners.map((industry) => (
                            <Badge key={industry} variant="secondary">{industry}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </E>
                </TabsContent>

                <TabsContent value="events">
                  <DepartmentEvents departmentName="Business Administration" />
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              <E sectionKey="contact" label="Contact Info">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-heading text-lg font-bold mb-4">Contact Us</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                        <p className="text-sm text-muted-foreground whitespace-pre-line">{contact.address}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary" />
                        <p className="text-sm text-muted-foreground">{contact.phone}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary" />
                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-primary" />
                        <p className="text-sm text-muted-foreground">{contact.hours}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </E>

              <E sectionKey="notices" label="Notices">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Department Notices
                    </h3>
                    <div className="space-y-3">
                      {notices.map((notice, index) => (
                        <div key={index} className="border-b last:border-0 pb-3 last:pb-0">
                          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                            {notice.title}
                          </a>
                          <p className="text-xs text-muted-foreground mt-1">{notice.date}</p>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4" size="sm">
                      View All Notices
                    </Button>
                  </CardContent>
                </Card>
              </E>

              <E sectionKey="quickLinks" label="Quick Links">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-heading text-lg font-bold mb-4">Quick Links</h3>
                    <div className="space-y-2">
                      {quickLinks.map((link, idx) => (
                        <a key={idx} href={link.url} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                          → {link.label}
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </E>
            </div>
          </div>
        </div>
      </section>

      {!editMode?.isEditMode && <Footer />}
    </div>
  );
};

export default DepartmentBBA;
