import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Microscope,
  Beaker,
  BookOpen,
  Handshake,
  FileSignature,
  Search,
  ExternalLink,
  Users,
  Award,
  Globe,
} from "lucide-react";
import researchImage from "@/assets/research-lab.jpg";

const centres = [
  {
    name: "Research Cell",
    lead: "Office of Research & Innovation",
    description:
      "Central hub coordinating, funding and promoting multidisciplinary research across all faculties at PCIU.",
    focus: ["Policy", "Grants", "Mentorship"],
  },
  {
    name: "Centre for Coastal & Marine Studies",
    lead: "Faculty of Science & Engineering",
    description:
      "Research on Bay of Bengal ecology, blue economy, port logistics and coastal climate resilience.",
    focus: ["Marine", "Climate", "Blue Economy"],
  },
  {
    name: "Centre for Business & Economic Research",
    lead: "Faculty of Business Studies",
    description:
      "Applied research on SME growth, supply chains, fintech adoption and regional trade.",
    focus: ["SME", "Fintech", "Trade"],
  },
  {
    name: "Centre for Language & Cultural Studies",
    lead: "Faculty of Humanities & Social Sciences",
    description:
      "Studies in applied linguistics, media discourse, and cultural heritage of the port city region.",
    focus: ["Linguistics", "Media", "Heritage"],
  },
  {
    name: "Centre for Legal Research",
    lead: "Department of Law",
    description:
      "Research on maritime law, human rights, cyber law and constitutional studies.",
    focus: ["Maritime Law", "Human Rights", "Cyber"],
  },
  {
    name: "Centre for Engineering Innovation",
    lead: "Faculty of Science & Engineering",
    description:
      "Cross-disciplinary work in AI, IoT, renewable energy, smart textiles and civil infrastructure.",
    focus: ["AI/IoT", "Energy", "Textile"],
  },
];

const areas = [
  { title: "Artificial Intelligence & Data Science", icon: Microscope, color: "from-blue-500 to-indigo-600" },
  { title: "Coastal & Marine Sciences", icon: Globe, color: "from-cyan-500 to-teal-600" },
  { title: "Renewable Energy & Sustainability", icon: Beaker, color: "from-emerald-500 to-green-600" },
  { title: "Smart Textile & Fashion Technology", icon: Award, color: "from-pink-500 to-rose-600" },
  { title: "Business, Finance & Economics", icon: Users, color: "from-amber-500 to-orange-600" },
  { title: "Law, Human Rights & Governance", icon: FileSignature, color: "from-purple-500 to-fuchsia-600" },
  { title: "Applied Linguistics & Media Studies", icon: BookOpen, color: "from-red-500 to-pink-600" },
  { title: "Civil Infrastructure & Urban Planning", icon: Microscope, color: "from-slate-500 to-gray-700" },
];

const publications = [
  {
    title: "Climate Resilience of Coastal Communities in the Bay of Bengal",
    authors: "Dr. M. Rahman, Dr. S. Akter",
    year: 2024,
    type: "Journal",
    venue: "Journal of Coastal Studies",
    department: "Civil Engineering",
  },
  {
    title: "Deep Learning Approaches for Bengali Sentiment Analysis",
    authors: "Dr. T. Hossain, A. Karim",
    year: 2024,
    type: "Conference",
    venue: "IEEE ICCIT",
    department: "CSE",
  },
  {
    title: "SME Financing Patterns in Chattogram Region",
    authors: "Dr. N. Chowdhury",
    year: 2023,
    type: "Journal",
    venue: "South Asian Business Review",
    department: "BBA",
  },
  {
    title: "Smart Grid Integration of Solar Power: A Case Study",
    authors: "Dr. F. Islam, M. Hasan",
    year: 2023,
    type: "Journal",
    venue: "Renewable Energy Letters",
    department: "EEE",
  },
  {
    title: "Maritime Law and Port Governance in Bangladesh",
    authors: "Dr. R. Sultana",
    year: 2024,
    type: "Book Chapter",
    venue: "Routledge Handbook of Maritime Law",
    department: "Law",
  },
  {
    title: "Sustainable Dyeing Techniques for Eco-Textiles",
    authors: "Dr. K. Ahmed, S. Begum",
    year: 2022,
    type: "Journal",
    venue: "Textile Research Journal",
    department: "Textile",
  },
  {
    title: "Media Framing of Climate Refugees in South Asia",
    authors: "Dr. P. Das",
    year: 2023,
    type: "Conference",
    venue: "Asian Media Congress",
    department: "Journalism",
  },
  {
    title: "Pragmatic Strategies in Bangladeshi EFL Classrooms",
    authors: "Dr. L. Ahmed",
    year: 2022,
    type: "Journal",
    venue: "Asian EFL Journal",
    department: "English",
  },
];

const partnerships = [
  { name: "University of Chittagong", country: "Bangladesh", type: "Academic" },
  { name: "BUET", country: "Bangladesh", type: "Academic" },
  { name: "Chittagong Port Authority", country: "Bangladesh", type: "Industry" },
  { name: "BGMEA", country: "Bangladesh", type: "Industry" },
  { name: "Asian Institute of Technology", country: "Thailand", type: "International" },
  { name: "Universiti Sains Malaysia", country: "Malaysia", type: "International" },
  { name: "British Council", country: "UK", type: "Cultural" },
  { name: "ICCR", country: "India", type: "Cultural" },
];

const mous = [
  { partner: "Chittagong Port Authority", date: "2024-03-15", scope: "Joint research on port logistics & marine pollution" },
  { partner: "BGMEA University of Fashion & Technology", date: "2023-11-02", scope: "Faculty exchange & textile innovation lab" },
  { partner: "Asian Institute of Technology, Thailand", date: "2023-08-20", scope: "Student exchange & joint PhD supervision" },
  { partner: "Universiti Sains Malaysia", date: "2023-05-10", scope: "Collaborative research in coastal sciences" },
  { partner: "British Council Bangladesh", date: "2022-09-18", scope: "English language teacher training & IELTS programs" },
  { partner: "ICT Division, Govt. of Bangladesh", date: "2024-01-25", scope: "AI & data science capacity building" },
];

const SECTION_IDS = ["centres", "areas", "publications", "partnerships", "mous"] as const;
type SectionId = (typeof SECTION_IDS)[number];

const ResearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = (searchParams.get("section") as SectionId) || "centres";
  const [tab, setTab] = useState<SectionId>(
    SECTION_IDS.includes(initial) ? initial : "centres",
  );

  useEffect(() => {
    const s = searchParams.get("section") as SectionId | null;
    if (s && SECTION_IDS.includes(s) && s !== tab) setTab(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleTab = (v: string) => {
    setTab(v as SectionId);
    setSearchParams({ section: v });
  };

  // Publications search/filter
  const [query, setQuery] = useState("");
  const [year, setYear] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [dept, setDept] = useState<string>("all");

  const years = useMemo(
    () => Array.from(new Set(publications.map((p) => String(p.year)))).sort().reverse(),
    [],
  );
  const types = useMemo(() => Array.from(new Set(publications.map((p) => p.type))), []);
  const depts = useMemo(() => Array.from(new Set(publications.map((p) => p.department))), []);

  const filteredPubs = publications.filter((p) => {
    const q = query.toLowerCase();
    const matchesQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.authors.toLowerCase().includes(q) ||
      p.venue.toLowerCase().includes(q);
    return (
      matchesQ &&
      (year === "all" || String(p.year) === year) &&
      (type === "all" || p.type === type) &&
      (dept === "all" || p.department === dept)
    );
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[340px] flex items-center justify-center overflow-hidden">
          <img
            src={researchImage}
            alt="Research at Port City International University"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
          <div className="relative container mx-auto px-4 text-center text-primary-foreground">
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-3">
              Research Wing
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Advancing knowledge, innovation and impact — from coast to campus.
            </p>
          </div>
        </section>

        {/* Tabs */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <Tabs value={tab} onValueChange={handleTab} className="w-full">
              <TabsList className="flex flex-wrap h-auto justify-center gap-2 bg-muted/50 p-2 mb-8">
                <TabsTrigger value="centres" className="gap-2">
                  <Microscope className="w-4 h-4" /> Research Centres
                </TabsTrigger>
                <TabsTrigger value="areas" className="gap-2">
                  <Beaker className="w-4 h-4" /> Research Areas
                </TabsTrigger>
                <TabsTrigger value="publications" className="gap-2">
                  <BookOpen className="w-4 h-4" /> Research & Publications
                </TabsTrigger>
                <TabsTrigger value="partnerships" className="gap-2">
                  <Handshake className="w-4 h-4" /> Partnerships
                </TabsTrigger>
                <TabsTrigger value="mous" className="gap-2">
                  <FileSignature className="w-4 h-4" /> MoUs
                </TabsTrigger>
              </TabsList>

              {/* Centres */}
              <TabsContent value="centres">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {centres.map((c) => (
                    <Card key={c.name} className="hover:shadow-xl hover:-translate-y-1 transition-all border-l-4 border-l-accent">
                      <CardContent className="p-6">
                        <h3 className="font-heading font-bold text-xl text-primary mb-1">{c.name}</h3>
                        <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-3">{c.lead}</p>
                        <p className="text-muted-foreground text-sm mb-4">{c.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {c.focus.map((f) => (
                            <Badge key={f} variant="secondary">{f}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Areas */}
              <TabsContent value="areas">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {areas.map((a) => {
                    const Icon = a.icon;
                    return (
                      <Card key={a.title} className="group overflow-hidden hover:shadow-xl transition-all">
                        <div className={`h-24 bg-gradient-to-br ${a.color} flex items-center justify-center`}>
                          <Icon className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
                        </div>
                        <CardContent className="p-5">
                          <h3 className="font-heading font-semibold text-primary">{a.title}</h3>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              {/* Publications */}
              <TabsContent value="publications">
                <Card className="mb-6">
                  <CardContent className="p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="relative md:col-span-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search title, author, venue..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Select value={year} onValueChange={setYear}>
                      <SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Years</SelectItem>
                        {years.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {types.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Select value={dept} onValueChange={setDept}>
                      <SelectTrigger><SelectValue placeholder="Department" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {depts.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  {filteredPubs.length === 0 && (
                    <p className="text-center text-muted-foreground py-12">No publications match your filters.</p>
                  )}
                  {filteredPubs.map((p, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-heading font-semibold text-primary mb-1">{p.title}</h4>
                          <p className="text-sm text-muted-foreground">{p.authors} • {p.venue} ({p.year})</p>
                          <div className="flex gap-2 mt-2 flex-wrap">
                            <Badge variant="outline">{p.type}</Badge>
                            <Badge variant="secondary">{p.department}</Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <ExternalLink className="w-4 h-4" /> View
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Partnerships */}
              <TabsContent value="partnerships">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {partnerships.map((p) => (
                    <Card key={p.name} className="text-center hover:shadow-xl hover:-translate-y-1 transition-all">
                      <CardContent className="p-6">
                        <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center">
                          <Handshake className="w-7 h-7 text-accent" />
                        </div>
                        <h3 className="font-heading font-semibold text-primary mb-1">{p.name}</h3>
                        <p className="text-xs text-muted-foreground mb-3">{p.country}</p>
                        <Badge variant="secondary">{p.type}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* MoUs */}
              <TabsContent value="mous">
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-primary text-primary-foreground">
                          <tr>
                            <th className="text-left p-4 font-semibold">Partner Organization</th>
                            <th className="text-left p-4 font-semibold">Date Signed</th>
                            <th className="text-left p-4 font-semibold">Scope of Collaboration</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mous.map((m, i) => (
                            <tr key={i} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                              <td className="p-4 font-medium text-primary">{m.partner}</td>
                              <td className="p-4 text-sm text-muted-foreground whitespace-nowrap">{m.date}</td>
                              <td className="p-4 text-sm">{m.scope}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ResearchPage;