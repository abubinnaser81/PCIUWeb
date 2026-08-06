import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import {
  GraduationCap,
  Building2,
  Scale,
  BookOpen,
  ChevronRight,
  Users,
  FlaskConical,
  Target,
  Award,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Department {
  name: string;
  slug: string;
  chairman: string;
  programs: string[];
}

interface FacultyInfo {
  id: string;
  icon: React.ElementType;
  name: string;
  shortName: string;
  dean: string;
  description: string;
  vision: string;
  mission: string;
  departments: Department[];
  highlights: string[];
}

const faculties: FacultyInfo[] = [
  {
    id: "engineering",
    icon: GraduationCap,
    name: "Faculty of Science & Engineering",
    shortName: "Science & Engineering",
    dean: "Prof. Dr. Engr. Mafzal Ahmed",
    description:
      "The Faculty of Science & Engineering at Port City International University is committed to producing skilled engineers and technologists who can meet the demands of a rapidly evolving global landscape. With state-of-the-art laboratories, experienced faculty, and industry partnerships, students receive a comprehensive education that blends theoretical knowledge with practical application.",
    vision:
      "To be a leading center of excellence in engineering and technology education, producing innovative professionals who contribute to national and global development.",
    mission:
      "To provide quality education in science and engineering disciplines, foster research and innovation, and prepare graduates for successful careers in industry and academia.",
    departments: [
      {
        name: "Computer Science & Engineering (CSE)",
        slug: "/department/cse",
        chairman: "Mrs. Manoara Begum",
        programs: ["B.Sc. in CSE"],
      },
      {
        name: "Electrical & Electronic Engineering (EEE)",
        slug: "/department/eee",
        chairman: "Mr. Deepak Kumar Chowdhury",
        programs: ["B.Sc. in EEE"],
      },
      {
        name: "Civil Engineering",
        slug: "/department/civil",
        chairman: "Dr. Engr. Ajoy Paul",
        programs: ["B.Sc. in Civil Engineering"],
      },
      {
        name: "Textile Engineering",
        slug: "/department/textile",
        chairman: "Engr. Mr. Iusuf Khan",
        programs: ["B.Sc. in Textile Engineering"],
      },
      {
        name: "Fashion Design & Technology",
        slug: "/department/fashion",
        chairman: "Mr. Ashraful Islam",
        programs: ["B.Sc. in Fashion Design & Technology"],
      },
    ],
    highlights: [
      "Modern computer and electronics labs",
      "Industry-linked curriculum",
      "Research opportunities in emerging technologies",
      "Experienced and dedicated faculty members",
    ],
  },
  {
    id: "business",
    icon: Building2,
    name: "Faculty of Business Studies",
    shortName: "Business Studies",
    dean: "Prof. Dr. Md. Fashiul Alam",
    description:
      "The Faculty of Business Studies prepares future business leaders with a strong foundation in management, finance, marketing, and accounting. Our programs emphasize ethical leadership, strategic thinking, and practical business skills to meet the challenges of the global marketplace.",
    vision:
      "To develop globally competitive business graduates who drive economic growth with integrity and innovation.",
    mission:
      "To deliver world-class business education, cultivate entrepreneurial thinking, and build leaders who create value for organizations and society.",
    departments: [
      {
        name: "Business Administration (BBA)",
        slug: "/department/bba",
        chairman: "Md. Musa",
        programs: ["BBA", "MBA"],
      },
    ],
    highlights: [
      "Case-study based learning approach",
      "Industry internship programs",
      "Entrepreneurship development initiatives",
      "Experienced faculty with industry backgrounds",
    ],
  },
  {
    id: "humanities",
    icon: BookOpen,
    name: "Faculty of Humanities, Social Science & Law",
    shortName: "Humanities, Social Science & Law",
    dean: "Prof. Mainul Hasan Chowdhury",
    description:
      "The Faculty of Humanities, Social Science & Law nurtures critical thinkers and socially conscious professionals. Through programs in English, Journalism, and Law, students develop strong analytical, communication, and advocacy skills that are essential for careers in media, law, public service, and academia.",
    vision:
      "To foster intellectual growth, social responsibility, and legal excellence, producing graduates who contribute to a just and informed society.",
    mission:
      "To provide comprehensive education in the humanities, social sciences, and legal studies, promoting critical inquiry, ethical leadership, and community engagement.",
    departments: [
      {
        name: "English",
        slug: "/department/english",
        chairman: "Mr. A S M Iftekarul Azan",
        programs: ["BA (Hons) in English", "MA in English"],
      },
      {
        name: "Journalism & Media Studies",
        slug: "/department/journalism",
        chairman: "",
        programs: ["BA (Hons) in Journalism"],
      },
      {
        name: "Law",
        slug: "/department/law",
        chairman: "",
        programs: ["LLB (Hons)", "LLM"],
      },
    ],
    highlights: [
      "Moot court and legal aid clinics",
      "Media lab and journalism workshops",
      "Community engagement programs",
      "Distinguished visiting faculty",
    ],
  },
];

const FacultiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>("engineering");

  useEffect(() => {
    const facultyParam = searchParams.get("faculty");
    if (facultyParam && faculties.some((f) => f.id === facultyParam)) {
      setSelectedFacultyId(facultyParam);
    }
  }, [searchParams]);

  const selectedFaculty = faculties.find((f) => f.id === selectedFacultyId) || faculties[0];
  const Icon = selectedFaculty.icon;

  const handleSelectFaculty = (id: string) => {
    setSelectedFacultyId(id);
    setSearchParams({ faculty: id });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="bg-gradient-hero py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <GraduationCap className="w-14 h-14 mx-auto mb-4" />
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-3">Our Faculties</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Explore academic excellence across diverse disciplines at Port City International University
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Sidebar – Faculty List */}
              <aside className="lg:w-80 shrink-0">
                <div className="sticky top-24 space-y-2">
                  <h2 className="font-heading font-semibold text-lg text-primary mb-4 px-2">
                    All Faculties
                  </h2>
                  {faculties.map((faculty) => {
                    const FIcon = faculty.icon;
                    const isActive = faculty.id === selectedFacultyId;
                    return (
                      <button
                        key={faculty.id}
                        onClick={() => handleSelectFaculty(faculty.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "hover:bg-muted/60 text-foreground"
                        )}
                      >
                        <div
                          className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                            isActive
                              ? "bg-white/20"
                              : "bg-primary/10 group-hover:bg-primary/20"
                          )}
                        >
                          <FIcon
                            className={cn(
                              "w-5 h-5",
                              isActive ? "text-white" : "text-primary"
                            )}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className={cn("font-medium text-sm leading-tight truncate", isActive && "text-white")}>
                            {faculty.shortName}
                          </p>
                          <p className={cn("text-xs mt-0.5 truncate", isActive ? "text-white/70" : "text-muted-foreground")}>
                            {faculty.departments.length} Department{faculty.departments.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                        <ChevronRight
                          className={cn(
                            "w-4 h-4 ml-auto shrink-0 transition-transform",
                            isActive ? "text-white" : "text-muted-foreground",
                            isActive && "translate-x-0.5"
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
              </aside>

              {/* Right Content – Faculty Details */}
              <div className="flex-1 min-w-0">
                {/* Faculty Header */}
                <div className="bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/5 rounded-xl p-6 md:p-8 mb-8">
                  <div className="flex items-start gap-5">
                    <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary mb-1">
                        {selectedFaculty.name}
                      </h2>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>Dean: <strong className="text-foreground">{selectedFaculty.dean}</strong></span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* About */}
                <div className="mb-8">
                  <h3 className="font-heading font-semibold text-xl text-primary mb-3">About</h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedFaculty.description}</p>
                </div>

                {/* Vision & Mission */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-primary" />
                        <h4 className="font-heading font-semibold text-primary">Vision</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{selectedFaculty.vision}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-secondary">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <FlaskConical className="w-5 h-5 text-secondary" />
                        <h4 className="font-heading font-semibold text-secondary">Mission</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{selectedFaculty.mission}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Departments */}
                <div className="mb-8">
                  <h3 className="font-heading font-semibold text-xl text-primary mb-4">Departments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedFaculty.departments.map((dept) => (
                      <Card
                        key={dept.name}
                        className="group hover:shadow-lg transition-all duration-300 hover:border-secondary"
                      >
                        <CardContent className="p-5">
                          <h4 className="font-heading font-semibold text-foreground mb-1">{dept.name}</h4>
                          {dept.chairman && (
                            <p className="text-xs text-muted-foreground mb-3">
                              Chairman: {dept.chairman}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {dept.programs.map((prog) => (
                              <Badge key={prog} variant="secondary" className="text-xs">
                                {prog}
                              </Badge>
                            ))}
                          </div>
                          <Link to={dept.slug}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                            >
                              View Department
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h3 className="font-heading font-semibold text-xl text-primary mb-4">Key Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedFaculty.highlights.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/40">
                        <Award className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                        <span className="text-sm text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FacultiesPage;
