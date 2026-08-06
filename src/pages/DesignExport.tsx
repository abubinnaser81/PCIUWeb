import { useEffect } from "react";
import pciuLogo from "@/assets/pciu-logo.png";

const DesignExport = () => {
  useEffect(() => {
    document.title = "PCIU Design System - Export";
  }, []);

  const colors = [
    { name: "Primary (Deep Navy)", var: "--primary", hsl: "231 77% 22%", hex: "#0D1A63" },
    { name: "Secondary (Royal Blue)", var: "--secondary", hsl: "230 70% 50%", hex: "#2845D6" },
    { name: "Accent (Vibrant Orange)", var: "--accent", hsl: "19 91% 62%", hex: "#F68048" },
    { name: "Background", var: "--background", hsl: "0 0% 100%", hex: "#FFFFFF" },
    { name: "Foreground", var: "--foreground", hsl: "231 77% 22%", hex: "#0D1A63" },
    { name: "Muted", var: "--muted", hsl: "230 20% 95%", hex: "#EDEEF5" },
    { name: "Card", var: "--card", hsl: "0 0% 100%", hex: "#FFFFFF" },
    { name: "Border", var: "--border", hsl: "230 25% 90%", hex: "#DFE1EE" },
  ];

  const typography = [
    { name: "Heading 1", class: "text-4xl font-heading font-bold", example: "Port City International University" },
    { name: "Heading 2", class: "text-3xl font-heading font-bold", example: "Academic Excellence" },
    { name: "Heading 3", class: "text-2xl font-heading font-semibold", example: "Our Programs" },
    { name: "Heading 4", class: "text-xl font-heading font-semibold", example: "Department Overview" },
    { name: "Body Large", class: "text-lg", example: "Leading the way in higher education with innovative programs." },
    { name: "Body", class: "text-base", example: "We are committed to providing quality education to all students." },
    { name: "Body Small", class: "text-sm", example: "Contact us for more information about admissions." },
    { name: "Caption", class: "text-xs text-muted-foreground", example: "© 2024 Port City International University" },
  ];

  const pages = [
    { name: "Homepage", route: "/", description: "Main landing page with hero section, faculties overview, news & events, admissions info, and campus life highlights." },
    { name: "Faculty List", route: "/faculty", description: "Grid display of all faculty members with search, filter by faculty/department, and quick view cards." },
    { name: "Faculty Profile", route: "/faculty/:id", description: "Detailed faculty profile with sidebar (photo, contact, research interests) and tabbed content (education, publications, experiences, awards, memberships, conferences)." },
    { name: "Department (English)", route: "/department/english", description: "Academic department template with head's message, programs, research areas, and notices." },
    { name: "Admission Requirements", route: "/admission/requirement", description: "Detailed admission requirements, eligibility criteria, and application process." },
    { name: "IQAC", route: "/iqac", description: "Internal Quality Assurance Cell page with committee details and quality documentation." },
    { name: "Tech Stack", route: "/tech-stack", description: "Technical documentation of technologies used in the project." },
    { name: "Admin Dashboard", route: "/admin", description: "Administrative panel for site management, user roles, and page builder." },
    { name: "Faculty Portal", route: "/faculty-auth", description: "Faculty login portal for profile management." },
  ];

  const components = [
    { name: "Header", description: "Sticky navigation with logo, mega-menu for academics, dropdowns for About and Admission, and Apply Now CTA." },
    { name: "Footer", description: "Multi-column footer with quick links, contact info, social media, and copyright." },
    { name: "Hero Section", description: "Full-width hero with gradient overlay, heading, description, and CTA buttons." },
    { name: "Card Grid", description: "Responsive grid of cards for faculties, news, and faculty members." },
    { name: "Tabs Component", description: "Horizontal tabs for organizing content sections (used in faculty profile)." },
    { name: "Notice Marquee", description: "Scrolling announcement bar for important notices." },
    { name: "Program Finder", description: "Interactive program search and filter component." },
  ];

  return (
    <div className="min-h-screen bg-white text-foreground print:text-black">
      {/* Print Styles */}
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; }
          .avoid-break { page-break-inside: avoid; }
        }
      `}</style>

      {/* Header */}
      <header className="bg-primary text-primary-foreground p-8 print:bg-primary">
        <div className="max-w-4xl mx-auto flex items-center gap-6">
          <img src={pciuLogo} alt="PCIU Logo" className="w-20 h-20 object-contain bg-white rounded-lg p-2" />
          <div>
            <h1 className="text-3xl font-heading font-bold">Port City International University</h1>
            <p className="text-lg opacity-90">Design System & Style Guide</p>
            <p className="text-sm opacity-75 mt-1">Generated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </header>

      {/* Print Instructions */}
      <div className="no-print bg-accent/20 border-b border-accent/30 p-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm">
            <strong>To export as PDF:</strong> Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl/Cmd + P</kbd> → Select "Save as PDF" as destination → Click Save
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto p-8 space-y-12">
        {/* Brand Overview */}
        <section className="avoid-break">
          <h2 className="text-2xl font-heading font-bold text-primary border-b-2 border-primary pb-2 mb-6">Brand Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Brand Identity</h3>
              <p className="text-sm text-muted-foreground">
                PCIU combines maritime/port city heritage with contemporary academic excellence. 
                The design system emphasizes confidence, global perspective, and student-first approach.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Design Philosophy</h3>
              <p className="text-sm text-muted-foreground">
                Clean typography, bold CTAs, and subtle micro-interactions. 
                WCAG AA compliant with semantic HTML and responsive design.
              </p>
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section className="avoid-break">
          <h2 className="text-2xl font-heading font-bold text-primary border-b-2 border-primary pb-2 mb-6">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colors.map((color) => (
              <div key={color.name} className="avoid-break">
                <div 
                  className="h-20 rounded-lg border mb-2" 
                  style={{ backgroundColor: color.hex }}
                />
                <p className="font-medium text-sm">{color.name}</p>
                <p className="text-xs text-muted-foreground">{color.hex}</p>
                <p className="text-xs text-muted-foreground">HSL: {color.hsl}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="page-break avoid-break">
          <h2 className="text-2xl font-heading font-bold text-primary border-b-2 border-primary pb-2 mb-6">Typography</h2>
          <div className="space-y-4">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Heading Font:</strong> Poppins / Inter (600-700 weight) | <strong>Body Font:</strong> Inter (400-500 weight)
              </p>
            </div>
            {typography.map((type) => (
              <div key={type.name} className="border-b pb-3 avoid-break">
                <p className="text-xs text-muted-foreground mb-1">{type.name} <span className="text-xs opacity-50">({type.class})</span></p>
                <p className={type.class}>{type.example}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pages */}
        <section className="page-break">
          <h2 className="text-2xl font-heading font-bold text-primary border-b-2 border-primary pb-2 mb-6">Site Pages</h2>
          <div className="space-y-4">
            {pages.map((page) => (
              <div key={page.name} className="border rounded-lg p-4 avoid-break">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{page.name}</h3>
                  <code className="text-xs bg-muted px-2 py-1 rounded">{page.route}</code>
                </div>
                <p className="text-sm text-muted-foreground">{page.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Components */}
        <section className="page-break">
          <h2 className="text-2xl font-heading font-bold text-primary border-b-2 border-primary pb-2 mb-6">Key Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {components.map((comp) => (
              <div key={comp.name} className="border rounded-lg p-4 avoid-break">
                <h3 className="font-semibold mb-1">{comp.name}</h3>
                <p className="text-sm text-muted-foreground">{comp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing & Layout */}
        <section className="avoid-break">
          <h2 className="text-2xl font-heading font-bold text-primary border-b-2 border-primary pb-2 mb-6">Spacing & Layout</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Spacing Scale</h3>
              <p className="text-sm text-muted-foreground mb-3">Based on 8px unit system (Tailwind default)</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-4 bg-primary"></div>
                  <span className="text-xs">8px (space-2)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary"></div>
                  <span className="text-xs">16px (space-4)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-4 bg-primary"></div>
                  <span className="text-xs">24px (space-6)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-4 bg-primary"></div>
                  <span className="text-xs">32px (space-8)</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Breakpoints</h3>
              <p className="text-sm text-muted-foreground mb-3">Responsive design breakpoints</p>
              <div className="space-y-1 text-sm">
                <p><strong>sm:</strong> 640px</p>
                <p><strong>md:</strong> 768px</p>
                <p><strong>lg:</strong> 1024px</p>
                <p><strong>xl:</strong> 1280px</p>
                <p><strong>2xl:</strong> 1536px</p>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section className="avoid-break">
          <h2 className="text-2xl font-heading font-bold text-primary border-b-2 border-primary pb-2 mb-6">Accessibility</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Standards</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• WCAG AA compliant</li>
                <li>• Semantic HTML structure</li>
                <li>• Keyboard navigation support</li>
                <li>• Skip links for main content</li>
                <li>• Visible focus states</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Touch Targets</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Minimum 44px touch targets on mobile</li>
                <li>• Adequate spacing between interactive elements</li>
                <li>• Reduced motion support (prefers-reduced-motion)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t pt-8 mt-12 text-center text-sm text-muted-foreground">
          <p>Port City International University - Design System Documentation</p>
          <p className="mt-1">© {new Date().getFullYear()} All Rights Reserved</p>
        </footer>
      </main>
    </div>
  );
};

export default DesignExport;
