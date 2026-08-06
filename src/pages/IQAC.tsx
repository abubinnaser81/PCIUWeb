import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Target,
  Eye,
  Users,
  FileText,
  Award,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  Building2,
} from "lucide-react";

const IQAC = () => {
  const [activeGalleryFilter, setActiveGalleryFilter] = useState("all");

  const objectives = [
    "Develop a quality culture in the academic environment",
    "Ensure quality in teaching-learning and research",
    "Organize training programs for faculty development",
    "Facilitate curriculum development and revision",
    "Promote best practices in higher education",
    "Ensure transparency in academic administration",
    "Conduct periodic academic audits",
    "Prepare documentation for accreditation",
  ];

  const committeeMembers = [
    {
      name: "Prof. Dr. Mohammad Rahman",
      designation: "Director, IQAC",
      role: "Chairman",
      department: "Department of Business Administration",
      email: "director.iqac@pciu.edu.bd",
      image: "/placeholder.svg",
    },
    {
      name: "Prof. Dr. Sarah Ahmed",
      designation: "Additional Director, IQAC",
      role: "Member Secretary",
      department: "Department of English",
      email: "sarah.ahmed@pciu.edu.bd",
      image: "/placeholder.svg",
    },
    {
      name: "Dr. Kamal Hossain",
      designation: "Associate Professor",
      role: "Member",
      department: "Department of Law",
      email: "kamal.hossain@pciu.edu.bd",
      image: "/placeholder.svg",
    },
    {
      name: "Dr. Fatima Begum",
      designation: "Assistant Professor",
      role: "Member",
      department: "Department of Journalism",
      email: "fatima.begum@pciu.edu.bd",
      image: "/placeholder.svg",
    },
  ];

  const activities = [
    {
      title: "Workshop on Outcome-Based Education (OBE)",
      date: "December 10, 2024",
      type: "Workshop",
      description:
        "A comprehensive workshop on implementing OBE methodology in curriculum design and assessment.",
      image: "/placeholder.svg",
    },
    {
      title: "Training on Academic Counseling",
      date: "November 25, 2024",
      type: "Training",
      description:
        "Faculty training program on effective academic counseling techniques for student success.",
      image: "/placeholder.svg",
    },
    {
      title: "Seminar on Research Ethics",
      date: "November 15, 2024",
      type: "Seminar",
      description:
        "Discussion on research ethics, plagiarism prevention, and academic integrity.",
      image: "/placeholder.svg",
    },
    {
      title: "Quality Assurance Review Meeting",
      date: "October 30, 2024",
      type: "Meeting",
      description:
        "Periodic review meeting to assess quality assurance activities and plan future initiatives.",
      image: "/placeholder.svg",
    },
  ];

  const documents = [
    { name: "IQAC Annual Report 2023-24", type: "PDF", size: "2.5 MB" },
    { name: "Quality Assurance Policy", type: "PDF", size: "1.2 MB" },
    { name: "Academic Audit Guidelines", type: "PDF", size: "850 KB" },
    { name: "Faculty Development Plan", type: "PDF", size: "1.8 MB" },
    { name: "Student Feedback Form", type: "PDF", size: "450 KB" },
    { name: "Curriculum Review Process", type: "PDF", size: "920 KB" },
  ];

  const galleryImages = [
    { src: "/placeholder.svg", category: "Workshop", title: "OBE Workshop 2024" },
    { src: "/placeholder.svg", category: "Training", title: "Faculty Training Session" },
    { src: "/placeholder.svg", category: "Meeting", title: "IQAC Committee Meeting" },
    { src: "/placeholder.svg", category: "Seminar", title: "Research Ethics Seminar" },
    { src: "/placeholder.svg", category: "Workshop", title: "Curriculum Development" },
    { src: "/placeholder.svg", category: "Training", title: "Assessment Training" },
  ];

  const quickLinks = [
    { name: "UGC Bangladesh", url: "https://ugc.gov.bd" },
    { name: "HEQEP", url: "#" },
    { name: "BAETE", url: "#" },
    { name: "QS Rankings", url: "#" },
  ];

  const filteredGallery =
    activeGalleryFilter === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeGalleryFilter);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-secondary py-20 lg:py-28">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <Badge className="bg-accent text-accent-foreground mb-4">
              Quality Assurance
            </Badge>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Institutional Quality Assurance Cell
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Ensuring excellence in teaching, learning, and research through
              systematic quality enhancement initiatives at PCIU.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            {/* About IQAC */}
            <section id="about">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Building2 className="w-8 h-8 text-accent" />
                About IQAC
              </h2>
              <Card className="bg-card border-border">
                <CardContent className="p-6 lg:p-8">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    The Institutional Quality Assurance Cell (IQAC) of Port City
                    International University (PCIU) has been established to develop
                    a mechanism for systematic review of academic programs and
                    entities, ensure quality teaching-learning, research, knowledge
                    generation, and support service standards at an acceptable level.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Understanding the emerging need for quality in tertiary
                    education, the IQAC was established at PCIU with a commitment to
                    innovation in learning, teaching, and research. IQAC continuously
                    strives to improve the teaching-learning environment and update
                    curricula through academic rigor.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    The IQAC promises to Higher Education stakeholders to ensure its
                    accountability and transparency in the quality decision making
                    and management system of the institution.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Vision & Mission */}
            <section id="vision-mission">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-accent/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-primary">
                      <Eye className="w-6 h-6" />
                      Our Vision
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      To be a leading quality assurance cell that fosters a culture
                      of excellence and continuous improvement in higher education,
                      making PCIU a center of academic distinction in the region.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-secondary/5 to-highlight/5 border-secondary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-secondary">
                      <Target className="w-6 h-6" />
                      Our Mission
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      To ensure quality enhancement in teaching, learning, and
                      research through systematic planning, implementation, and
                      monitoring of quality assurance processes.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Objectives */}
            <section id="objectives">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <ClipboardCheck className="w-8 h-8 text-accent" />
                Objectives
              </h2>
              <Card className="bg-card border-border">
                <CardContent className="p-6 lg:p-8">
                  <ul className="grid md:grid-cols-2 gap-4">
                    {objectives.map((objective, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <span className="w-6 h-6 bg-accent/10 text-accent rounded-full flex items-center justify-center text-sm font-medium shrink-0">
                          {index + 1}
                        </span>
                        {objective}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Director's Message */}
            <section id="director-message">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <GraduationCap className="w-8 h-8 text-accent" />
                Message from Director
              </h2>
              <Card className="bg-card border-border overflow-hidden">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="shrink-0">
                      <img
                        src="/placeholder.svg"
                        alt="Director IQAC"
                        className="w-40 h-48 object-cover rounded-lg shadow-md"
                      />
                    </div>
                    <div>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Greetings from the Institutional Quality Assurance Cell
                        (IQAC) of Port City International University, Bangladesh.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        The IQAC has been established to develop a mechanism for
                        systematic review of academic programs and entities, ensure
                        quality teaching-learning, research, knowledge generation,
                        and support service standards at an acceptable level.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Since its inception, IQAC is committed to innovation in
                        learning, teaching, and research. We continuously try to
                        improve the teaching-learning environment and update the
                        curricula through academic rigor.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        We seek your precious support and sincere cooperation in
                        this journey of IQAC. With your support, IQAC at PCIU can
                        become a forerunner in the Higher Education circle of
                        Bangladesh.
                      </p>
                      <div className="border-t border-border pt-4">
                        <p className="font-heading font-bold text-foreground">
                          Prof. Dr. Mohammad Rahman
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Director, IQAC
                        </p>
                        <p className="text-sm text-accent">
                          director.iqac@pciu.edu.bd
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Committee */}
            <section id="committee">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Users className="w-8 h-8 text-accent" />
                IQAC Committee
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {committeeMembers.map((member, index) => (
                  <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-20 h-24 object-cover rounded-lg"
                        />
                        <div>
                          <Badge className="bg-accent/10 text-accent mb-2">
                            {member.role}
                          </Badge>
                          <h3 className="font-heading font-bold text-foreground">
                            {member.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {member.designation}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {member.department}
                          </p>
                          <a
                            href={`mailto:${member.email}`}
                            className="text-xs text-accent hover:underline mt-2 inline-block"
                          >
                            {member.email}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Activities */}
            <section id="activities">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Calendar className="w-8 h-8 text-accent" />
                Our Activities
              </h2>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="bg-muted mb-6">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="workshop">Workshop</TabsTrigger>
                  <TabsTrigger value="training">Training</TabsTrigger>
                  <TabsTrigger value="seminar">Seminar</TabsTrigger>
                  <TabsTrigger value="meeting">Meeting</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                  {activities.map((activity, index) => (
                    <Card key={index} className="bg-card border-border hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          <img
                            src={activity.image}
                            alt={activity.title}
                            className="w-full md:w-48 h-32 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{activity.type}</Badge>
                              <span className="text-sm text-muted-foreground">
                                {activity.date}
                              </span>
                            </div>
                            <h3 className="font-heading font-bold text-foreground mb-2">
                              {activity.title}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {activity.description}
                            </p>
                            <Button variant="link" className="p-0 h-auto mt-2 text-accent">
                              View Details →
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                {["workshop", "training", "seminar", "meeting"].map((type) => (
                  <TabsContent key={type} value={type} className="space-y-4">
                    {activities
                      .filter((a) => a.type.toLowerCase() === type)
                      .map((activity, index) => (
                        <Card key={index} className="bg-card border-border">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                              <img
                                src={activity.image}
                                alt={activity.title}
                                className="w-full md:w-48 h-32 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline">{activity.type}</Badge>
                                  <span className="text-sm text-muted-foreground">
                                    {activity.date}
                                  </span>
                                </div>
                                <h3 className="font-heading font-bold text-foreground mb-2">
                                  {activity.title}
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                  {activity.description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </TabsContent>
                ))}
              </Tabs>
            </section>

            {/* Gallery */}
            <section id="gallery">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Award className="w-8 h-8 text-accent" />
                Gallery
              </h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {["all", "Workshop", "Training", "Meeting", "Seminar"].map((filter) => (
                  <Button
                    key={filter}
                    variant={activeGalleryFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveGalleryFilter(filter)}
                    className={activeGalleryFilter === filter ? "bg-accent text-accent-foreground" : ""}
                  >
                    {filter === "all" ? "All" : filter}
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredGallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative group overflow-hidden rounded-lg aspect-square"
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-primary-foreground text-center text-sm font-medium px-4">
                        {image.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Contact Info */}
            <Card className="bg-primary text-primary-foreground sticky top-24">
              <CardHeader>
                <CardTitle>Contact IQAC</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-sm text-primary-foreground/90">
                    IQAC Office, Admin Building
                    <br />
                    Port City International University
                    <br />
                    Chattogram, Bangladesh
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <p className="text-sm">+880 31 XXXXXXX</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <a
                    href="mailto:iqac@pciu.edu.bd"
                    className="text-sm hover:text-accent transition-colors"
                  >
                    iqac@pciu.edu.bd
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <FileText className="w-5 h-5 text-accent" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {documents.map((doc, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Download className="w-4 h-4 text-accent" />
                      <div>
                        <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                          {doc.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {doc.type} • {doc.size}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <BookOpen className="w-5 h-5 text-accent" />
                  Quick Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors py-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {link.name}
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Notice Board */}
            <Card className="bg-gradient-to-br from-accent/10 to-secondary/10 border-accent/20">
              <CardHeader>
                <CardTitle className="text-foreground">Notice Board</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="border-l-2 border-accent pl-3 py-1">
                  <p className="text-sm font-medium text-foreground">
                    IQAC Meeting Notice
                  </p>
                  <p className="text-xs text-muted-foreground">Dec 20, 2024</p>
                </div>
                <div className="border-l-2 border-secondary pl-3 py-1">
                  <p className="text-sm font-medium text-foreground">
                    Curriculum Review Deadline
                  </p>
                  <p className="text-xs text-muted-foreground">Dec 15, 2024</p>
                </div>
                <div className="border-l-2 border-highlight pl-3 py-1">
                  <p className="text-sm font-medium text-foreground">
                    Faculty Feedback Submission
                  </p>
                  <p className="text-xs text-muted-foreground">Dec 10, 2024</p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default IQAC;
