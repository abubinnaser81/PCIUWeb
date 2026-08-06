import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Users, FileText, Mail, Info, ChevronRight, Loader2, Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const tabMeta = [
  { id: "about", label: "About Us", icon: Info },
  { id: "advisory", label: "Advisory Board", icon: Users },
  { id: "editorial", label: "Editorial Board", icon: Users },
  { id: "author", label: "Author Instructions", icon: FileText },
  { id: "contact", label: "Contact", icon: Mail },
];

const sidebarLinks = [
  { label: "Aim and Scope", href: "#aim-scope" },
  { label: "Submit Manuscript", href: "#submit" },
  { label: "Sample Paper", href: "#sample" },
  { label: "Journal Contents", href: "#contents" },
];

const PortCityNews = () => {
  const [activeTab, setActiveTab] = useState("about");

  const { data: sections = [], isLoading: sectionsLoading } = useQuery({
    queryKey: ["journal-sections-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("journal_sections")
        .select("*")
        .eq("is_visible", true)
        .order("order_index");
      if (error) throw error;
      return data;
    },
  });

  const { data: archives = [] } = useQuery({
    queryKey: ["journal-archives-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("journal_archives")
        .select("*")
        .eq("is_visible", true)
        .order("order_index");
      if (error) throw error;
      return data;
    },
  });

  const getSection = (key: string) => sections.find((s: any) => s.section_key === key);

  const renderTabContent = () => {
    const section = getSection(activeTab);
    if (!section) return <p className="text-muted-foreground">Content not available.</p>;
    const c = section.content as Record<string, any>;

    switch (activeTab) {
      case "about":
        return (
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-2xl text-primary">Port City News</h3>
            <p className="text-sm italic text-muted-foreground">(Academic Journal of Port City International University)</p>
            <div>
              <h4 className="font-heading font-bold text-lg text-primary mb-2">Port City News:</h4>
              <p className="text-foreground leading-relaxed">{c.description}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 border border-border">
              <h4 className="font-heading font-bold text-lg text-primary">ISSN: {c.issn}</h4>
              {c.issn_note && <p className="text-sm text-muted-foreground mt-1">{c.issn_note}</p>}
            </div>
            <Separator />
            {c.chief_editor && (
              <div className="text-center space-y-2">
                <h4 className="font-heading font-bold text-xl text-primary">Chief Editor</h4>
                <p className="font-semibold text-foreground text-lg">{c.chief_editor.name}</p>
                <p className="text-sm text-muted-foreground">{c.chief_editor.designation}</p>
              </div>
            )}
            <Separator />
            {c.associate_editors && (
              <div className="text-center space-y-3">
                <h4 className="font-heading font-bold text-lg text-primary">Associate Editors</h4>
                {c.associate_editors.map((ed: any) => (
                  <p key={ed.name} className="font-medium text-foreground">{ed.name}</p>
                ))}
                <p className="text-sm text-muted-foreground">Faculty Members of Port City International University</p>
              </div>
            )}
          </div>
        );
      case "advisory":
        return (
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-2xl text-primary">Advisory Board</h3>
            <Separator />
            <div className="grid gap-4">
              {(c.members || []).map((m: any) => (
                <Card key={m.name} className="border border-border">
                  <CardContent className="p-4">
                    <h4 className="font-heading font-semibold text-foreground">{m.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{m.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case "editorial":
        return (
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-2xl text-primary">Editorial Board</h3>
            <Separator />
            <div className="grid gap-4">
              {(c.members || []).map((m: any) => (
                <Card key={m.name} className="border border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-heading font-semibold text-foreground">{m.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{m.dept}</p>
                      </div>
                      {m.role && <Badge className="bg-accent text-accent-foreground">{m.role}</Badge>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case "author":
        return (
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-2xl text-primary">Author Instructions</h3>
            <Separator />
            <div className="space-y-4 text-foreground leading-relaxed">
              {(c.sections || []).map((s: any, i: number) => (
                <div key={i}>
                  <h4 className="font-heading font-semibold text-lg text-primary mb-2">{s.heading}</h4>
                  {s.items ? (
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                      {s.items.map((item: string, j: number) => <li key={j}>{item}</li>)}
                    </ul>
                  ) : s.text ? (
                    <p className="text-sm">{s.text}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-2xl text-primary">Contact</h3>
            <Separator />
            <Card className="border border-border">
              <CardContent className="p-6 space-y-4">
                <div>
                  <h4 className="font-heading font-semibold text-foreground">{c.office_name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{c.journal_name}</p>
                  <p className="text-sm text-muted-foreground">{c.university}</p>
                  <p className="text-sm text-muted-foreground">{c.address}</p>
                  <p className="text-sm text-muted-foreground">{c.city}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm"><span className="font-medium text-foreground">Email:</span> <span className="text-muted-foreground">{c.email}</span></p>
                  <p className="text-sm"><span className="font-medium text-foreground">Phone:</span> <span className="text-muted-foreground">{c.phone}</span></p>
                  <p className="text-sm"><span className="font-medium text-foreground">Website:</span> <span className="text-muted-foreground">{c.website}</span></p>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="bg-gradient-to-r from-primary via-primary/90 to-accent/80 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground mb-2">Port City News.com</h1>
          <p className="text-primary-foreground/80 text-lg">Academic Journal of Port City International University</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6 order-2 lg:order-1">
            <Card className="border border-border">
              <CardContent className="p-0">
                <h3 className="font-heading font-bold text-lg text-primary p-4 pb-2">Menu</h3>
                <div className="flex flex-col">
                  {sidebarLinks.map((link) => (
                    <a key={link.label} href={link.href} className="flex items-center gap-2 px-4 py-3 text-sm text-foreground hover:bg-accent/10 hover:text-accent border-b border-border last:border-b-0 transition-colors">
                      <ChevronRight className="w-3 h-3 text-accent" />
                      {link.label}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="p-4">
                <h3 className="font-heading font-bold text-lg text-primary mb-1">Journal <span className="text-accent">Archives</span></h3>
                <Separator className="mb-4" />
                <div className="space-y-3">
                  {archives.map((item: any) => (
                    <a
                      key={item.id}
                      href={item.pdf_url || "#"}
                      target={item.pdf_url ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <div className="w-12 h-16 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          {item.volume_name} ({item.year})
                        </p>
                        {item.pdf_url && (
                          <span className="text-xs text-accent flex items-center gap-1"><Download className="w-3 h-3" /> Download PDF</span>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="flex flex-wrap gap-1 mb-6 bg-muted/30 p-1 rounded-lg border border-border">
              {tabMeta.map((tab) => {
                const Icon = tab.icon;
                const sectionExists = getSection(tab.id);
                if (!sectionExists && !sectionsLoading) return null;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-md transition-all ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <Card className="border border-border">
              <CardContent className="p-6 md:p-8">
                {sectionsLoading ? (
                  <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
                ) : (
                  renderTabContent()
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PortCityNews;
