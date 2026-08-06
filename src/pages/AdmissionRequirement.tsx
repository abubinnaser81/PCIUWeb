import { GraduationCap, BookOpen, Award, CheckCircle, FileText, Users, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AdmissionRequirement = () => {
  const bachelorArts = [
    "Minimum GPA 2.50 in both S.S.C and H.S.C or equivalent",
    "Minimum 5 subjects in O-Level and 2 subjects in A-Level with minimum grade of B in 4 subjects and C in 3 subjects",
  ];

  const bachelorScience = [
    "Minimum GPA 2.50 in both S.S.C and H.S.C with science background or equivalent",
    "Minimum 5 subjects in O-Level and 2 subjects in A-Level with minimum grade of B in 4 subjects and C in 3 subjects from science group",
  ];

  const masterGeneral = [
    "Minimum GPA 2.50 or second division in both S.S.C and H.S.C or equivalent from relevant group",
    "Minimum 5 subjects in O-Level and 2 subjects in A-Level with minimum grade of B in 4 subjects and C in 3 subjects from relevant group",
    "Minimum second class or equivalent CGPA in Bachelor's degree from relevant subject/group",
  ];

  const specializedPrograms = [
    {
      program: "MBA, M.A. in English, M.S.S. in Journalism, M.S.S. in Economics (Preliminary & Final)",
      requirement: "Graduates (B.A./B.Sc./B.Com./B.S.S. or equivalent)/Master's degree from any discipline",
    },
    {
      program: "Master of Laws (LL.M., Final)",
      requirement: "4 years Bachelor of Laws from any recognized university",
    },
    {
      program: "Master of Laws (LL.M., Preliminary & Final)",
      requirement: "3 years Bachelor of Laws from any recognized university",
    },
    {
      program: "M.A. in English (Final)",
      requirement: "B.A. (Hons.) in English / 4 years Bachelor's degree in English from any recognized university",
    },
    {
      program: "M.S.S. in Economics (Final)",
      requirement: "4 years Bachelor's degree in Economics from any recognized university",
    },
    {
      program: "M.S.S. in Broadcast & Print Journalism (Final)",
      requirement: "4 years Bachelor's degree in Journalism from any recognized university",
    },
    {
      program: "M.Sc. in Computer Science & Engineering (MCSE)",
      requirement: "B.Sc. in CSE/EEE/ECE or equivalent 4 years degree from any recognized university",
    },
  ];

  const quickLinks = [
    { icon: FileText, label: "Apply Online", href: "#apply" },
    { icon: Calendar, label: "Academic Calendar", href: "#calendar" },
    { icon: Users, label: "Meet Our Faculty", href: "/faculty" },
    { icon: Award, label: "Scholarships", href: "#scholarships" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-accent overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-accent/30">
              <GraduationCap className="w-4 h-4" />
              Start Your Journey at PCIU
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Admission <span className="text-highlight">Requirements</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
              Your pathway to excellence begins here. Review our comprehensive admission requirements and take the first step toward a transformative educational experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-highlight hover:bg-highlight/90 text-highlight-foreground font-semibold px-8">
                Apply Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Download Prospectus
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Quick Links */}
      <section className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group border border-border/50 hover:border-accent/50"
            >
              <link.icon className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-foreground group-hover:text-accent transition-colors">{link.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Introduction */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="border-l-4 border-l-accent bg-accent/5">
            <CardContent className="p-6 md:p-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                There are specific entrance requirements for some courses, particularly in the sciences. Please check the requirements for your course. The qualifications below will only be sufficient alternatives to PCIU where they cover the same content as the required program, to the appropriate standard.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Bachelor's Degree Programs */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Undergraduate Programs
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Bachelor's Degree Programs
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Arts & Business */}
            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-t-4 border-t-secondary">
              <CardHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-secondary" />
                  </div>
                  Arts, Law, Social Science & Business
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {bachelorArts.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Science & Engineering */}
            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-t-4 border-t-accent">
              <CardHeader className="bg-gradient-to-r from-accent/10 to-accent/5">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-accent" />
                  </div>
                  Science & Engineering
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {bachelorScience.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Master's Degree Programs */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-highlight/10 text-highlight px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Award className="w-4 h-4" />
                Graduate Programs
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                Master's Degree Programs
              </h2>
            </div>

            {/* General Requirements */}
            <Card className="mb-8 border-l-4 border-l-highlight">
              <CardHeader>
                <CardTitle className="text-xl">General Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {masterGeneral.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-highlight mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Specialized Programs */}
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Program-Specific Requirements</h3>
            <div className="grid gap-4">
              {specializedPrograms.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {item.program}
                      </h4>
                      <p className="text-muted-foreground text-sm">{item.requirement}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all hidden md:block" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M0%2040L40%200H20L0%2020M40%2040V20L20%2040%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
            <CardContent className="p-8 md:p-12 relative z-10">
              <div className="text-center">
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                  Ready to Begin Your Academic Journey?
                </h2>
                <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
                  Join thousands of successful graduates who have shaped their future at PCIU. Applications are now open for the upcoming semester.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" className="bg-highlight hover:bg-highlight/90 text-highlight-foreground font-semibold px-8">
                    Start Application
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    Contact Admission Office
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdmissionRequirement;
