import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Code, 
  Database, 
  Palette, 
  Server, 
  Download,
  FileCode,
  Layout,
  Boxes,
  Shield,
  Zap
} from "lucide-react";

const TechStack = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Print Button - Hidden when printing */}
      <div className="fixed top-4 right-4 z-50 print:hidden">
        <Button onClick={handlePrint} className="gap-2">
          <Download className="h-4 w-4" />
          Save as PDF
        </Button>
      </div>

      {/* Document Content */}
      <div className="max-w-4xl mx-auto px-8 py-12 print:px-0 print:py-0">
        {/* Header */}
        <div className="text-center mb-12 print:mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4 print:text-3xl">
            PCIU Website
          </h1>
          <h2 className="text-2xl text-muted-foreground print:text-xl">
            Technology Stack Documentation
          </h2>
          <p className="text-sm text-muted-foreground mt-4">
            Generated on {new Date().toLocaleDateString("en-US", { 
              year: "numeric", 
              month: "long", 
              day: "numeric" 
            })}
          </p>
        </div>

        <Separator className="mb-8" />

        {/* Frontend Section */}
        <section className="mb-10 print:mb-6 print:break-inside-avoid">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold">Frontend Technologies</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4 print:gap-2">
            <Card className="print:shadow-none print:border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileCode className="h-4 w-4 text-accent" />
                  Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li><strong>TypeScript</strong> — Primary programming language</li>
                  <li><strong>HTML5</strong> — Markup structure</li>
                  <li><strong>CSS3</strong> — Styling (via Tailwind)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="print:shadow-none print:border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Boxes className="h-4 w-4 text-accent" />
                  Frameworks & Libraries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li><strong>React 18</strong> — UI component library</li>
                  <li><strong>Vite</strong> — Build tool & dev server</li>
                  <li><strong>React Router DOM</strong> — Client-side routing</li>
                  <li><strong>TanStack React Query</strong> — Server state</li>
                  <li><strong>React Hook Form + Zod</strong> — Form handling</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Design Section */}
        <section className="mb-10 print:mb-6 print:break-inside-avoid">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Palette className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-2xl font-semibold">UI & Design System</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4 print:gap-2">
            <Card className="print:shadow-none print:border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Layout className="h-4 w-4 text-primary" />
                  Component Libraries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li><strong>Tailwind CSS</strong> — Utility-first CSS framework</li>
                  <li><strong>shadcn/ui</strong> — Accessible component library</li>
                  <li><strong>Radix UI</strong> — Headless UI primitives</li>
                  <li><strong>Lucide React</strong> — Icon library</li>
                  <li><strong>CVA</strong> — Component variant management</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="print:shadow-none print:border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Color Palette (HSL)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-primary"></div>
                    <span><strong>Primary (Deep Navy)</strong> — 231 77% 22%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-secondary"></div>
                    <span><strong>Secondary (Royal Blue)</strong> — 230 70% 50%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-accent"></div>
                    <span><strong>Accent (Vibrant Orange)</strong> — 19 91% 62%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4 print:shadow-none print:border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Typography</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold mb-1">Heading Font</p>
                  <p className="text-muted-foreground">Poppins / Inter (600-700 weight)</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Body Font</p>
                  <p className="text-muted-foreground">Inter (400-500 weight)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Backend Section */}
        <section className="mb-10 print:mb-6 print:break-inside-avoid">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-secondary/20 rounded-lg">
              <Server className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h3 className="text-2xl font-semibold">Backend (Supabase Cloud)</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4 print:gap-2">
            <Card className="print:shadow-none print:border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Database className="h-4 w-4 text-accent" />
                  Database
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li><strong>PostgreSQL</strong></li>
                  <li>Relational database</li>
                  <li>Auto-generated APIs</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="print:shadow-none print:border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-4 w-4 text-accent" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li><strong>RLS Policies</strong></li>
                  <li>JWT Sessions</li>
                  <li>Email/Password Auth</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="print:shadow-none print:border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-4 w-4 text-accent" />
                  Functions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li><strong>Edge Functions</strong></li>
                  <li>Deno Runtime</li>
                  <li>Serverless Logic</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <Separator className="mb-6" />
        <footer className="text-center text-sm text-muted-foreground print:text-xs">
          <p>Port City International University — Technology Documentation</p>
          <p className="mt-1">Built with Vite + React</p>
        </footer>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            margin: 1.5cm;
            size: A4;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TechStack;

