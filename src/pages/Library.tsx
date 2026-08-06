import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Users, 
  ExternalLink, 
  Clock, 
  Mail, 
  Phone,
  Library as LibraryIcon,
  Globe,
  FileText,
  Database
} from "lucide-react";

const committeeMembers = [
  { name: "Prof. Dr. Mohammad Rahman", designation: "Chief Librarian & Committee Chair", email: "chief.librarian@pciu.edu.bd" },
  { name: "Dr. Fatema Akhter", designation: "Deputy Librarian", email: "deputy.librarian@pciu.edu.bd" },
  { name: "Mr. Kamal Hossain", designation: "Senior Library Officer", email: "kamal.hossain@pciu.edu.bd" },
  { name: "Ms. Nasreen Sultana", designation: "Digital Resources Manager", email: "nasreen.sultana@pciu.edu.bd" },
  { name: "Mr. Rafiq Ahmed", designation: "Circulation Officer", email: "rafiq.ahmed@pciu.edu.bd" },
  { name: "Ms. Taslima Begum", designation: "Cataloging Officer", email: "taslima.begum@pciu.edu.bd" },
];

const journalLinks = [
  { name: "IEEE Xplore Digital Library", url: "https://ieeexplore.ieee.org", description: "Engineering and technology research" },
  { name: "ScienceDirect", url: "https://www.sciencedirect.com", description: "Scientific, technical, and medical research" },
  { name: "JSTOR", url: "https://www.jstor.org", description: "Academic journals and books" },
  { name: "Springer Nature", url: "https://www.springernature.com", description: "Science, technology, medicine" },
  { name: "Wiley Online Library", url: "https://onlinelibrary.wiley.com", description: "Multidisciplinary research" },
  { name: "Taylor & Francis Online", url: "https://www.tandfonline.com", description: "Humanities and social sciences" },
  { name: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov", description: "Biomedical literature" },
  { name: "Google Scholar", url: "https://scholar.google.com", description: "Academic search engine" },
];

const eLibraryLinks = [
  { name: "Bangladesh National Digital Library", url: "https://www.bndl.gov.bd", description: "National digital resources", icon: Database },
  { name: "UGC Digital Library", url: "https://www.ugc.gov.bd", description: "University Grants Commission resources", icon: BookOpen },
  { name: "BanglaJOL", url: "https://www.banglajol.info", description: "Bangladesh Journals Online", icon: FileText },
  { name: "DOAJ - Directory of Open Access Journals", url: "https://doaj.org", description: "Open access journals", icon: Globe },
  { name: "Project Gutenberg", url: "https://www.gutenberg.org", description: "Free eBooks", icon: BookOpen },
  { name: "OpenLibrary", url: "https://openlibrary.org", description: "Internet Archive's library", icon: LibraryIcon },
  { name: "MIT OpenCourseWare", url: "https://ocw.mit.edu", description: "Free MIT course materials", icon: Globe },
  { name: "Khan Academy", url: "https://www.khanacademy.org", description: "Free educational resources", icon: BookOpen },
];

const libraryServices = [
  { title: "Book Lending", description: "Borrow books for up to 14 days with valid student ID" },
  { title: "Reference Section", description: "Access encyclopedias, dictionaries, and reference materials" },
  { title: "Digital Resources", description: "24/7 access to e-books, journals, and databases" },
  { title: "Study Rooms", description: "Private and group study spaces available for booking" },
  { title: "Printing & Copying", description: "Affordable printing and photocopying services" },
  { title: "Research Support", description: "Librarians available to assist with research queries" },
];

const Library = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-accent rounded-full mb-6">
            <LibraryIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-4">
            PCIU Central Library
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your gateway to knowledge, research, and academic excellence
          </p>
        </div>

        {/* Library Hours & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-2 hover:border-accent transition-colors">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold text-primary mb-2">Library Hours</h3>
              <p className="text-sm text-muted-foreground">Sunday - Thursday: 8:00 AM - 8:00 PM</p>
              <p className="text-sm text-muted-foreground">Friday - Saturday: 10:00 AM - 5:00 PM</p>
            </CardContent>
          </Card>
          <Card className="border-2 hover:border-accent transition-colors">
            <CardContent className="p-6 text-center">
              <Phone className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold text-primary mb-2">Contact</h3>
              <p className="text-sm text-muted-foreground">+880 31-000000</p>
              <p className="text-sm text-muted-foreground">Ext: 123, 124</p>
            </CardContent>
          </Card>
          <Card className="border-2 hover:border-accent transition-colors">
            <CardContent className="p-6 text-center">
              <Mail className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold text-primary mb-2">Email</h3>
              <p className="text-sm text-muted-foreground">library@pciu.edu.bd</p>
              <p className="text-sm text-muted-foreground">support@library.pciu.edu.bd</p>
            </CardContent>
          </Card>
        </div>

        {/* Library Services */}
        <section className="mb-16">
          <h2 className="font-heading font-bold text-3xl text-primary mb-8 text-center">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {libraryServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-primary mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Committee Members */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Users className="w-8 h-8 text-accent" />
            <h2 className="font-heading font-bold text-3xl text-primary">
              Library Committee
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {committeeMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-secondary">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-primary text-center mb-1">{member.name}</h3>
                  <p className="text-sm text-accent text-center mb-2">{member.designation}</p>
                  <p className="text-xs text-muted-foreground text-center">{member.email}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* E-Library Resources */}
        <section className="mb-16 bg-gradient-subtle rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Database className="w-8 h-8 text-accent" />
            <h2 className="font-heading font-bold text-3xl text-primary">
              E-Library Resources
            </h2>
          </div>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Access thousands of digital books, journals, and educational materials for your academic needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {eLibraryLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-accent">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-primary text-sm mb-1 group-hover:text-accent transition-colors flex items-center gap-1">
                            {link.name}
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">{link.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
        </section>

        {/* Academic Journals */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <BookOpen className="w-8 h-8 text-accent" />
            <h2 className="font-heading font-bold text-3xl text-primary">
              Academic Journals & Databases
            </h2>
          </div>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Access world-renowned academic journals and research databases
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {journalLinks.map((journal, index) => (
              <a
                key={index}
                href={journal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-secondary">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-primary text-sm mb-2 group-hover:text-secondary transition-colors flex items-center gap-1">
                      {journal.name}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-xs text-muted-foreground">{journal.description}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary rounded-2xl p-8 text-center">
          <h2 className="font-heading font-bold text-2xl text-primary-foreground mb-4">
            Need Help Finding Resources?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Our librarians are here to help you with research, finding materials, and using our digital resources.
          </p>
          <Button size="lg" className="bg-highlight hover:bg-highlight/90 text-highlight-foreground">
            Contact Library Support
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Library;
