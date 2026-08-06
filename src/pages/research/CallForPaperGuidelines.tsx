import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollText, FileText, BookOpen, Hash, AlignLeft, Image, Quote, Globe, MessageSquare, ShieldCheck } from "lucide-react";

const sections = [
  {
    icon: Hash,
    title: "Title",
    body: "It should be brief and very specific.",
  },
  {
    icon: AlignLeft,
    title: "Abstract",
    body: "Each full paper should have an Abstract containing concisely the principal findings and should not exceed 150 words.",
  },
  {
    icon: BookOpen,
    title: "Key Words",
    body: "There should be a maximum of five key words placed after the Abstract section.",
  },
  {
    icon: AlignLeft,
    title: "Body of the Text",
    body: "The text of the paper should be clear and précised. It should include Introduction, Materials and Methods, Results and Discussion. The Results and Discussion should not be separated. Taxonomic papers (where descriptive accounts are provided) must be written in a concise telegraphic style. Only scientific names (Generic and Specific) must be italicized when computer composed or single underlined when typed.",
  },
  {
    icon: Image,
    title: "Tables, Graphs, Photographs, Line Drawings, Figures",
    body: "Number of tables, graphs, photographs, line drawings and figures should be minimum. The same data should not be used in both tables and graphs. Tables should be typed on separate pages. Figures and graphs should be drawn with Indian ink on tracing paper and properly labelled with bold solid lines so they can be reduced to half or less than half of their original size. The scale of a figure (when required) must be indicated by a scale line on the drawing itself. Legends for plates (if any) should be typed on a separate page. Photographs should be submitted on glossy paper or JPEG format. Black-and-white photographs are acceptable. Color photographs may be submitted for black-and-white printing; for color printing the author(s) will bear the expenses for color reproduction.",
  },
  {
    icon: Quote,
    title: "References",
    body: "In the text, references should be given within brackets with a comma between the author(s) name and the year; two or more references should be separated by a semicolon. References at the end of the text should be arranged alphabetically beginning with the author(s) name(s) followed by the year of publication, title of the paper, abbreviated name of the journal, volume, part/issue number in parentheses and page numbers. For books, the publisher's name should be given. Book titles must be italicized (or single underlined when typed). Two papers published by the same author in one year must be cited as Hinton (1967a) and Hinton (1967b). Journal titles must be abbreviated and italicized. The volume number of the journal must be bold (computer composed) or double underlined (typed).",
  },
];

const examples = [
  {
    label: "Journal",
    items: [
      "Siddique, R. 2004. Another Assumed Ideal from the West? The Dhaka University Studies, 61(1): 15-26.",
      "Breen, M. and Caudlin, C.N. 1980. The essentials of communicative curriculum in language teaching. Applied Linguistics, 1(2): 89-112.",
      "Lindsay, W.L., Frazier, A.W. and Stephenson, A. 1962. Identification of reaction products from phosphate fertilizers in soils. Soil Sci. Soc Am. Proc. 26: 446-452.",
      "Anwar, M.N., Manchur M.A. and Hossain M.T. 2002. Cellulose degrading Actinomycetes. J. Microbiol, 8(1): 72.",
    ],
  },
  {
    label: "Edited Books",
    items: [
      "Gilmour, J.S.L. 1940. Taxonomy and Philosophy. In: The New Systematics (J.S. Huxley ed.). Clarendon Press, Oxford, pp. 461-474.",
    ],
  },
  {
    label: "Website",
    items: ["http://www.dfid.gov.uk"],
  },
];

const CallForPaperGuidelines = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[280px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary to-secondary">
          <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
          <div className="relative container mx-auto px-4 text-center text-primary-foreground">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-4">
              <ScrollText className="w-8 h-8" />
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-2">
              Call For Paper — Guidelines
            </h1>
            <p className="text-primary-foreground/90 text-lg">
              Manuscript preparation & submission rules
            </p>
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            {/* Intro */}
            <Card>
              <CardContent className="p-6 md:p-8 space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Original research papers related to{" "}
                  <strong className="text-foreground">
                    Science, Arts, Social Science, Law and Business Administration
                  </strong>{" "}
                  are published in the Port City International University
                  Journal. Each volume comprises an issue published in December
                  every year. Papers should be of high standard.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The manuscript should be typewritten in{" "}
                  <strong className="text-foreground">double space</strong> with
                  wide margins (left and top 3.81 cm, right and bottom 2.54 cm)
                  on 29.21 × 21.59 cm good quality bond, or A4 size (21.0 × 29.7
                  cm) offset paper, and should not exceed{" "}
                  <strong className="text-foreground">ten pages</strong>.
                  Authors are expected to computer-compose the article according
                  to the style of the journal. Papers in triplicate should be
                  submitted to the Executive Editor, Port City International
                  University Journal. If the article is accepted, the author
                  must send it on a rewriteable CD or by email.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  On the <strong className="text-foreground">first page</strong>{" "}
                  of the manuscript, only the title and author name with address
                  should be typed. On the{" "}
                  <strong className="text-foreground">second page</strong>, the
                  Title, Abstract, Keywords and Introduction should be given. On
                  the following pages, Materials and Methods, Results and
                  Discussion, Acknowledgement(s) (if any) and References should
                  be added.
                </p>
              </CardContent>
            </Card>

            {/* Sections */}
            <div className="grid md:grid-cols-2 gap-5">
              {sections.map((s) => {
                const Icon = s.icon;
                return (
                  <Card key={s.title} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-heading font-semibold text-primary text-lg">
                          {s.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {s.body}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Reference Style examples */}
            <Card>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <FileText className="w-6 h-6 text-accent" />
                  <h2 className="font-heading font-bold text-2xl text-primary">
                    Reference Style Examples
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground mb-5">
                  Please follow the journal style for references shown below.
                </p>
                <div className="space-y-5">
                  {examples.map((ex) => (
                    <div key={ex.label}>
                      <div className="flex items-center gap-2 mb-2">
                        {ex.label === "Website" ? (
                          <Globe className="w-4 h-4 text-accent" />
                        ) : (
                          <BookOpen className="w-4 h-4 text-accent" />
                        )}
                        <h4 className="font-heading font-semibold text-primary">
                          {ex.label}
                        </h4>
                      </div>
                      <ul className="space-y-2 border-l-2 border-accent/30 pl-4">
                        {ex.items.map((it, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground leading-relaxed"
                          >
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Short Communication */}
            <Card>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="w-6 h-6 text-accent" />
                  <h2 className="font-heading font-bold text-2xl text-primary">
                    Short Communication
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Short research information should not exceed three printed
                  pages (600 words) including graphs, tables, references,
                  figures, names and addresses of the author(s). The
                  presentation should be continuous and paragraphed — i.e.
                  without headings like Abstract, Introduction, Materials and
                  Methods, etc.
                </p>
              </CardContent>
            </Card>

            {/* Declaration */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="w-6 h-6" />
                  <h2 className="font-heading font-bold text-2xl">
                    Declaration
                  </h2>
                </div>
                <p className="text-sm leading-relaxed opacity-95">
                  Author(s) is/are requested to give a declaration certifying
                  that the work was carried out by them and the contents of the
                  paper were not published before or submitted for publication
                  in any other journal, and that they have only submitted their
                  paper(s) for consideration by the editorial board of the Port
                  City International University Journal. Author(s) will receive
                  one copy of free reprints. For additional copies, the author(s)
                  shall have to pay the price personally and must inform the
                  Executive Editor in writing after the paper(s) is/are accepted
                  for publication. No paper will be published if it does not
                  conform to the style specified for this Journal. The Executive
                  Editor and the Editorial Board will not be held responsible
                  for factual accuracy of the contribution(s).
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CallForPaperGuidelines;