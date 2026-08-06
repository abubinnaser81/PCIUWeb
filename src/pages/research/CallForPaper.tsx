import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Mail, MapPin, User, ArrowRight } from "lucide-react";

const CallForPaper = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[300px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent via-accent/90 to-primary">
          <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
          <div className="relative container mx-auto px-4 text-center text-accent-foreground">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-2">
              Call For Paper
            </h1>
            <p className="text-accent-foreground/90 text-lg">
              The Port City Journal · ISSN: 2311-3146 · Volume 13, Issue (1+2)
            </p>
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            {/* Deadline highlight */}
            <Card className="bg-gradient-to-r from-destructive/10 to-accent/10 border-l-4 border-l-destructive">
              <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-4">
                <Calendar className="w-10 h-10 text-destructive" />
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Last Date of Submission
                  </p>
                  <p className="font-heading font-bold text-2xl text-primary">
                    31 March, 2027
                  </p>
                </div>
                <Badge variant="destructive" className="text-sm px-3 py-1">
                  Open Now
                </Badge>
              </CardContent>
            </Card>

            {/* Announcement */}
            <Card>
              <CardContent className="p-6 md:p-8 space-y-4">
                <h2 className="font-heading font-bold text-2xl text-primary">
                  Announcement
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We are happy to inform you that{" "}
                  <strong className="text-foreground">
                    Port City International University
                  </strong>{" "}
                  is going to publish its peer-reviewed Journal{" "}
                  <em>"The Port City Journal"</em>, ISSN: 2311-3146, Volume 13
                  Issue (1+2) — a multidisciplinary bi-annual journal.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The journal accepts a wide variety of scholarly articles on
                  various fields of studies including{" "}
                  <strong className="text-foreground">
                    Business, Engineering, Humanities, Social Science
                  </strong>{" "}
                  and more. However, preference will be given to original
                  research work(s), short communications and invited reviews.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Interested teachers/authors can submit their writing for the
                  journal{" "}
                  <strong className="text-foreground">
                    on or before 31st March, 2027
                  </strong>
                  . They are requested to follow the guidelines provided.
                </p>

                <div className="pt-2">
                  <Button asChild className="gap-2">
                    <Link to="/research/call-for-paper-guidelines">
                      Read Submission Guidelines <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Topics */}
            <Card>
              <CardContent className="p-6 md:p-8">
                <h2 className="font-heading font-bold text-2xl text-primary mb-4">
                  Accepted Subject Areas
                </h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Business",
                    "Engineering",
                    "Science & Technology",
                    "Humanities",
                    "Social Science",
                    "Law",
                    "English",
                    "Journalism",
                    "Short Communications",
                    "Invited Reviews",
                  ].map((t) => (
                    <Badge key={t} variant="secondary" className="px-3 py-1">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Editor / Contact */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 md:p-8">
                <h2 className="font-heading font-bold text-2xl mb-5">
                  Submit To
                </h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 mt-0.5 opacity-90" />
                    <div>
                      <p className="font-semibold">Prof. Dr. Engr. Mafzal Ahmed</p>
                      <p className="text-sm opacity-80">Executive Editor</p>
                      <p className="text-sm opacity-80">
                        Port City International University Journal
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-0.5 opacity-90" />
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="text-sm opacity-80">
                        Port City International University<br />
                        7-14, Nikunja Housing Society, South Khulshi,<br />
                        Chittagong, Bangladesh
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:col-span-2">
                    <Mail className="w-5 h-5 mt-0.5 opacity-90" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <a
                        href="mailto:pciujournal@portcity.edu.bd"
                        className="text-sm underline opacity-90 hover:opacity-100"
                      >
                        pciujournal@portcity.edu.bd
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CallForPaper;