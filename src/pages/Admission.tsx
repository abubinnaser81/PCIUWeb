import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GraduationCap, DollarSign, Award, FileText, Globe, CreditCard, Phone, CheckCircle, ArrowRight, BookOpen, ChevronRight, Megaphone, CalendarDays, ClipboardCheck, UserPlus, FileCheck, HelpCircle, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const sections = [
  { id: "admission-advertisement", label: "Admission Advertisement", icon: Megaphone },
  { id: "requirement", label: "Admission Requirement", icon: GraduationCap },
  { id: "admission-schedule", label: "Admission Schedule", icon: CalendarDays },
  { id: "admission-test", label: "Admission Test", icon: ClipboardCheck },
  { id: "direct-admission", label: "Direct Admission", icon: UserPlus },
  { id: "documents-required", label: "Documents Required", icon: FileCheck },
  { id: "payment-policy", label: "Payment Policy", icon: CreditCard },
  { id: "online-admission", label: "Online Admission", icon: Globe },
  { id: "tuition-fees", label: "Tuition & Others Fees", icon: DollarSign },
  { id: "faq", label: "Frequently Asked Questions", icon: HelpCircle },
  { id: "admission-test-result", label: "Admission Test Result", icon: BarChart3 },
  { id: "scholarship", label: "Scholarship & Financial Assistance", icon: Award },
  { id: "admission-contact", label: "Admission Contact", icon: Phone },
];

const Admission = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSection = searchParams.get("section") || "admission-advertisement";

  const handleSectionChange = (id: string) => {
    setSearchParams({ section: id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
        <div className="container mx-auto px-4 py-14 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-accent/30">
            <GraduationCap className="w-4 h-4" />
            Admissions 2025
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-3">
            Admission <span className="text-highlight">Information</span>
          </h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Everything you need to know about joining Port City International University.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Main Content with Sidebar */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <h3 className="font-heading font-bold text-lg text-foreground mb-4 px-2">Admission Menu</h3>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSectionChange(s.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left",
                      activeSection === s.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <s.icon className="w-4 h-4 flex-shrink-0" />
                    {s.label}
                    {activeSection === s.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Right Content */}
          <main className="flex-1 min-w-0">
            {activeSection === "admission-advertisement" && <AdmissionAdvertisementContent />}
            {activeSection === "requirement" && <AdmissionRequirementContent />}
            {activeSection === "admission-schedule" && <AdmissionScheduleContent />}
            {activeSection === "admission-test" && <AdmissionTestContent />}
            {activeSection === "direct-admission" && <DirectAdmissionContent />}
            {activeSection === "documents-required" && <DocumentsRequiredContent />}
            {activeSection === "payment-policy" && <PaymentPolicyContent />}
            {activeSection === "online-admission" && <OnlineAdmissionContent />}
            {activeSection === "tuition-fees" && <TuitionFeesContent />}
            {activeSection === "faq" && <FAQContent />}
            {activeSection === "admission-test-result" && <AdmissionTestResultContent />}
            {activeSection === "scholarship" && <ScholarshipContent />}
            {activeSection === "admission-contact" && <AdmissionContactContent />}
          </main>
        </div>
      </section>

      <Footer />
    </div>
  );
};

/* ─── Shared Components ─── */

function SectionHeader({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium mb-3">
        <Icon className="w-3.5 h-3.5" />
        Admission
      </div>
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">{title}</h2>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function BulletList({ items, color = "text-accent" }: { items: string[]; color?: string }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <CheckCircle className={cn("w-5 h-5 mt-0.5 flex-shrink-0", color)} />
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function UnderConstructionContent({ icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle: string }) {
  return (
    <div className="space-y-8">
      <SectionHeader icon={icon} title={title} subtitle={subtitle} />
      <Card className="border-l-4 border-l-accent bg-accent/5">
        <CardContent className="p-12 text-center">
          <div className="text-4xl mb-4">🚧</div>
          <h3 className="font-heading text-xl font-bold text-foreground mb-2">Page Under Construction</h3>
          <p className="text-muted-foreground">This section is currently being updated. Please check back later or contact the Admission Office for details.</p>
        </CardContent>
      </Card>
    </div>
  );
}

/* ─── Content Sections ─── */

function AdmissionAdvertisementContent() {
  return <UnderConstructionContent icon={Megaphone} title="Admission Advertisement" subtitle="Latest admission circulars and advertisements from PCIU." />;
}

function AdmissionRequirementContent() {
  return (
    <div className="space-y-8">
      <SectionHeader icon={GraduationCap} title="Admission Requirement" subtitle="Review the eligibility criteria for undergraduate and graduate programs." />

      <Card className="border-l-4 border-l-accent bg-accent/5">
        <CardContent className="p-6">
          <p className="text-muted-foreground">
            There are also specific entrance requirements for some courses, particularly in the sciences, so please check the requirements for your course. The qualifications below will only be sufficient alternatives to PCIU where they cover the same content as the required program, to the appropriate standard.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-t-4 border-t-secondary">
          <CardHeader className="bg-secondary/5">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-secondary" />
              </div>
              Arts, Law, Social Science & Business
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <BulletList items={[
              "Minimum GPA 2.50 in both S.S.C and H.S.C or equivalent",
              "Minimum 5 subjects in O-Level and 2 subjects in A-Level with minimum grade of B in 4 subjects and C in 3 subjects",
            ]} />
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-accent">
          <CardHeader className="bg-accent/5">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-accent" />
              </div>
              Science & Engineering
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <BulletList items={[
              "Minimum GPA 2.50 in both S.S.C and H.S.C with science background or equivalent",
              "Minimum 5 subjects in O-Level and 2 subjects in A-Level with minimum grade of B in 4 subjects and C in 3 subjects from science group",
            ]} />
          </CardContent>
        </Card>
      </div>

      <h3 className="font-heading text-xl font-bold text-foreground">Master's Degree General Requirements</h3>
      <Card className="border-l-4 border-l-highlight">
        <CardContent className="p-6">
          <BulletList color="text-highlight" items={[
            "Minimum GPA 2.50 or second division in both S.S.C and H.S.C or equivalent from relevant group",
            "Minimum 5 subjects in O-Level and 2 subjects in A-Level with minimum grade of B in 4 subjects and C in 3 subjects from relevant group",
            "Minimum second class or equivalent CGPA in Bachelor's degree from relevant subject/group",
          ]} />
        </CardContent>
      </Card>

      <h3 className="font-heading text-xl font-bold text-foreground">Program-Specific Requirements</h3>
      <div className="space-y-3">
        {[
          { program: "MBA, M.A. in English, M.S.S. in Journalism, M.S.S. in Economics (Preliminary & Final)", req: "Graduates (B.A./B.Sc./B.Com./B.S.S. or equivalent)/Master's degree from any discipline" },
          { program: "Master of Laws (LL.M., Final)", req: "4 years Bachelor of Laws from any recognized university" },
          { program: "Master of Laws (LL.M., Preliminary & Final)", req: "3 years Bachelor of Laws from any recognized university" },
          { program: "M.A. in English (Final)", req: "B.A. (Hons.) in English / 4 years Bachelor's degree in English from any recognized university" },
          { program: "M.S.S. in Economics (Final)", req: "4 years Bachelor's degree in Economics from any recognized university" },
          { program: "M.S.S. in Broadcast & Print Journalism (Final)", req: "4 years Bachelor's degree in Journalism from any recognized university" },
          { program: "M.Sc. in Computer Science & Engineering (MCSE)", req: "B.Sc. in CSE or other relevant subjects" },
        ].map((item, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                {i + 1}
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">{item.program}</h4>
                <p className="text-muted-foreground text-xs mt-1">{item.req}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AdmissionScheduleContent() {
  return <UnderConstructionContent icon={CalendarDays} title="Admission Schedule" subtitle="Admission timeline and important dates for each semester." />;
}

function AdmissionTestContent() {
  return (
    <div className="space-y-8">
      <SectionHeader icon={ClipboardCheck} title="Admission Test" subtitle="Details about the PCIU admission test format, syllabus, and guidelines." />

      <Card className="border-l-4 border-l-accent bg-accent/5">
        <CardContent className="p-6">
          <p className="text-muted-foreground">
            Port City International University conducts admission tests for undergraduate programs to assess a student's aptitude and readiness for university-level education. The test is designed to evaluate basic knowledge and analytical skills.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-t-4 border-t-secondary">
          <CardHeader className="bg-secondary/5">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-secondary" />
              </div>
              Arts, Business & Law Programs
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <BulletList items={[
              "English (Grammar, Comprehension, Vocabulary)",
              "General Knowledge & Current Affairs",
              "Analytical Ability & IQ",
              "Basic Mathematics",
            ]} />
            <p className="text-xs text-muted-foreground mt-4"><strong>Duration:</strong> 1 Hour | <strong>Total Marks:</strong> 50</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-accent">
          <CardHeader className="bg-accent/5">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-accent" />
              </div>
              Science & Engineering Programs
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <BulletList items={[
              "Mathematics (H.S.C. level)",
              "Physics (H.S.C. level)",
              "Chemistry (H.S.C. level)",
              "English (Grammar & Comprehension)",
            ]} />
            <p className="text-xs text-muted-foreground mt-4"><strong>Duration:</strong> 1 Hour | <strong>Total Marks:</strong> 50</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Test Day Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <BulletList items={[
            "Bring your Admit Card and a valid photo ID (National ID / Birth Certificate / Passport).",
            "Arrive at the test venue at least 30 minutes before the scheduled time.",
            "Use of mobile phones, calculators, or any electronic devices is strictly prohibited inside the exam hall.",
            "Carry your own pen, pencil, eraser, and sharpener — no borrowing is allowed during the test.",
            "The test is MCQ-based; there is no negative marking.",
            "Results will be published on the PCIU website and notice board within 3-5 working days.",
          ]} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How to Get the Admit Card</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { step: 1, text: "Submit the filled-out application form with required documents at the Admission Office." },
              { step: 2, text: "Pay the admission test fee of BDT 1,000 (non-refundable)." },
              { step: 3, text: "Collect your Admit Card from the Admission Office or download from the PCIU website." },
              { step: 4, text: "The Admit Card will mention your test date, time, and venue." },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">{s.step}</div>
                <span className="text-sm text-muted-foreground">{s.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-highlight bg-highlight/5">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Students eligible for Direct Admission (GPA 3.00+ in both SSC & HSC) do not need to appear for the admission test. Contact the Admission Office at <strong>+880-1851120791</strong> for more details.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function DirectAdmissionContent() {
  return (
    <div className="space-y-8">
      <SectionHeader icon={UserPlus} title="Direct Admission" subtitle="Get admitted directly without appearing in the admission test." />

      <Card className="border-l-4 border-l-accent bg-accent/5">
        <CardContent className="p-6">
          <p className="text-muted-foreground">
            Port City International University offers direct admission to eligible students who meet specific academic criteria, allowing them to bypass the admission test and secure their seat immediately.
          </p>
        </CardContent>
      </Card>

      <Card className="border-t-4 border-t-secondary">
        <CardHeader className="bg-secondary/5">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-secondary" />
            </div>
            Eligibility for Direct Admission
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <h4 className="font-semibold text-foreground mb-3">Undergraduate Programs:</h4>
          <BulletList items={[
            "Students with GPA 3.00 or above in both S.S.C and H.S.C (or equivalent) are eligible for direct admission.",
            "O-Level & A-Level students with minimum grade B in 4 subjects and C in 3 subjects are eligible.",
            "Students with Diploma in Engineering (minimum GPA 2.50) are eligible for direct admission into B.Sc. Engineering programs with credit transfer.",
          ]} />
          <h4 className="font-semibold text-foreground mb-3 mt-6">Master's Programs:</h4>
          <BulletList items={[
            "All applicants meeting the minimum admission requirement for the respective Master's program are eligible for direct admission.",
            "No admission test is required for Master's degree programs.",
          ]} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Direct Admission Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { step: 1, title: "Visit the Admission Office", desc: "Come to the PCIU campus with your original academic documents for verification." },
              { step: 2, title: "Submit Application Form", desc: "Fill out the admission form and attach required documents and photographs." },
              { step: 3, title: "Document Verification", desc: "Your academic certificates and transcripts will be verified on the spot." },
              { step: 4, title: "Pay Admission Fee", desc: "Upon eligibility confirmation, pay the admission fee and semester tuition to secure your seat." },
              { step: 5, title: "Receive Admission Letter", desc: "Collect your official admission letter, student ID, and class schedule." },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">{s.step}</div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{s.title}</h4>
                  <p className="text-muted-foreground text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-highlight bg-highlight/5">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Direct admission is subject to seat availability. Students are encouraged to apply early to secure their preferred program. For more information, contact the Admission Office at <strong>+880-1851120791</strong> or email <strong>admission@portcity.edu.bd</strong>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function DocumentsRequiredContent() {
  return (
    <div className="space-y-8">
      <SectionHeader icon={FileCheck} title="Documents Required for Admission" subtitle="Complete list of documents needed for Bachelor's and Master's programs." />

      <Card className="border-t-4 border-t-secondary">
        <CardHeader className="bg-secondary/5">
          <CardTitle className="text-lg">Bachelor's Degree Programs</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <h4 className="font-semibold text-foreground mb-3">At the time of form submission:</h4>
            <BulletList items={[
              "Filled out application form",
              "Attested photocopies of S.S.C. or equivalent Marks sheet and Certificate or Testimonial",
              "Attested photocopies of H.S.C. or equivalent Marks sheet and Certificate or Testimonial",
              "Attested photocopies of National ID or Birth Certificate or Passport",
            ]} />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">At the time of admission:</h4>
            <BulletList items={[
              "Original Marks sheet & Certificate or Testimonial of both S.S.C and H.S.C or equivalent must be shown at the time of admission",
              "04 (four) copies of pp size attested & 03 (three) copies of stamp size color photographs",
              "Attested photocopies of H.S.C. or equivalent Marks sheet and Certificate or Testimonial",
              "Attested photocopies of National ID or Birth Certificate or Passport",
            ]} />
          </div>
        </CardContent>
      </Card>

      <Card className="border-t-4 border-t-accent">
        <CardHeader className="bg-accent/5">
          <CardTitle className="text-lg">Master's Degree Programs</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <h4 className="font-semibold text-foreground mb-3">At the time of form submission:</h4>
            <BulletList items={[
              "Filled out application form",
              "Attested photocopies of Marks Sheet and Certificate or Testimonial of S.S.C. or equivalent",
              "Attested photocopies of Marks Sheet and Certificate or Testimonial of H.S.C. or equivalent",
              "Attested photocopies of Marks Sheet and Certificate or Testimonial of Graduation",
              "Attested photocopies of Marks Sheet and Certificate or Testimonial of Master's Degree (if applicable)",
              "Attested photocopies of National ID or Birth Certificate or Passport",
              "Job Experience certificate (if necessary)",
            ]} />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">At the time of admission:</h4>
            <BulletList items={[
              "Original Marks sheet & Certificate or Testimonial of all degrees must be shown at the time of admission",
              "Attested photocopies of Marks Sheet and Certificate or Testimonial of S.S.C. or equivalent",
              "04 (four) copies of pp size attested & 03 (three) copies of stamp size color photographs",
              "Student must be present physically at the time of admission",
            ]} />
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-destructive bg-destructive/5">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Failure to submit any of the documents or photographs along with the "Application Form" stated above will be considered / treated as incomplete form which may result in cancellation of the application form / admission.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function PaymentPolicyContent() {
  return (
    <div className="space-y-8">
      <SectionHeader icon={CreditCard} title="Payment Policy" subtitle="Financial policies and payment methods at PCIU." />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payment Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <BulletList items={[
            "Admission fee is due to be paid at the time of admission which is non-refundable.",
            "50% tuition fee/course fee of a trimester is to be paid before 10 days of mid-term examination and the rest 50% is to be paid before 10 days of final examination.",
            "Students failing to pay their tuition fee in due time will have the chance to pay with late fee according to the policy set forth by the university.",
            "Students are required to pay their tuition fee and other dues before collecting their admit cards for midterm and final examination.",
            "University authority reserves the right to cancel the enrollment/admission of any student failing to meet the financial obligation incurred by registration.",
          ]} />
        </CardContent>
      </Card>

      <h3 className="font-heading text-xl font-bold text-foreground">Bank, Rocket & bKash Payment Details</h3>

      <div className="grid sm:grid-cols-2 gap-6">
        <Card className="border-t-4 border-t-accent">
          <CardHeader>
            <CardTitle className="text-lg">🏦 Dutch Bangla Bank Ltd.</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-1"><strong className="text-foreground">A/C No:</strong> 129.110.15436</p>
            <p className="text-sm text-muted-foreground"><strong className="text-foreground">Branch:</strong> O R Nizam Road Branch, Chattogram</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-secondary">
          <CardHeader>
            <CardTitle className="text-lg">🏦 Exim Bank Ltd.</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-1"><strong className="text-foreground">A/C No:</strong> 069 111000 16098</p>
            <p className="text-sm text-muted-foreground"><strong className="text-foreground">Branch:</strong> Khulshi Branch, Chattogram</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-l-4 border-l-highlight bg-highlight/5">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground mb-1"><strong className="text-foreground">Please mention student's ID number in the deposit slip.</strong></p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📱 Rocket Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2"><strong className="text-foreground">Biller ID:</strong> 2994</p>
          <BulletList items={[
            "Open Rocket App → Select Bill Pay",
            "In Search Biller option, search with 2994",
            "Select Port City International University",
            "In Bill No option, put Student's ID",
            "In Amount, put total amount in numeric → Click Submit",
          ]} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📱 bKash Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2"><strong className="text-foreground">bKash Merchant No:</strong> 01881075020</p>
          <BulletList items={[
            "Open bKash App → Select Make Payment",
            "Enter merchant number: 01881075020",
            "Enter the payment amount",
            "Reference: Student ID",
            "Enter your bKash PIN number → Submit",
            "Save the payment information for future reference",
          ]} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📞 Payment By Dialing *247#</CardTitle>
        </CardHeader>
        <CardContent>
          <BulletList items={[
            "Dial *247#",
            "Press 3 to select Payment",
            "Enter Merchant bKash Account number: 01881075020",
            "Enter the payment amount",
            "Enter Student ID",
            "Enter 1 and press Send",
            "Enter your bKash PIN number",
            "You will get a confirmation SMS once payment is successful",
          ]} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📞 For Any Query, Please Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong className="text-foreground">bKash Payment Query:</strong> Mr. S. M. Kamruzzaman Shaheen — 01881075020</p>
            <p><strong className="text-foreground">Mr. Abu Hena Mostofa Kamal</strong> — 01881075027</p>
            <p><strong className="text-foreground">Mr. Osman Gani</strong> — 01911061132</p>
            <p><strong className="text-foreground">Mr. Md. Jawadur Rahman</strong> — 01701221029</p>
            <p><strong className="text-foreground">Mr. Azizul Mannan Mozumder</strong> — 01839716021</p>
            <p><strong className="text-foreground">Mr. Hasnat Shakir Alam</strong> — 01833052474</p>
            <p><strong className="text-foreground">Mr. Md. Uzzal Hossain</strong> — 01982645301</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function OnlineAdmissionContent() {
  return (
    <div className="space-y-8">
      <SectionHeader icon={Globe} title="Online Admission" subtitle="Apply online from anywhere in the world." />

      <Card className="border-l-4 border-l-accent bg-accent/5">
        <CardContent className="p-6">
          <p className="text-muted-foreground">
            Port City International University offers a convenient online admission system. Prospective students can submit their application, upload documents, and track their admission status from anywhere.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Online Application Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { step: 1, text: "Visit the PCIU Online Admission Portal" },
              { step: 2, text: "Create an account with your email address and phone number" },
              { step: 3, text: "Fill in personal information, academic background, and program preference" },
              { step: 4, text: "Upload scanned copies of required documents (certificates, photographs, NID)" },
              { step: 5, text: "Pay the application fee online (bKash, Nagad, or bank transfer)" },
              { step: 6, text: "Submit the application and note down your application tracking number" },
              { step: 7, text: "Track your admission status online using the tracking number" },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">{s.step}</div>
                <span className="text-sm text-muted-foreground">{s.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <a href="http://119.18.149.45/pciuonlineadmission/" target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8">
            Go to Online Admission Portal <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </a>
      </div>

      <Card className="border-l-4 border-l-highlight bg-highlight/5">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Note:</strong> After online submission, original documents must be verified at the Admission Office within 15 working days to complete the enrollment process.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function TuitionFeesContent() {
  const undergraduateFees = [
    { program: "Bachelor of Business Administration (BBA)", credits: 130, perCredit: "2,200", total: "3,04,000" },
    { program: "Bachelor of Laws (LL.B. Hons.)", credits: 133, perCredit: "2,500", total: "3,50,500" },
    { program: "B.A. (Hons.) in English", credits: 132, perCredit: "1,800", total: "2,55,600" },
    { program: "B.S.S. (Hons.) in Broadcast Print Journalism", credits: 136, perCredit: "1,200", total: "1,81,200" },
    { program: "B.Sc. in Computer Science & Engineering (CSE) — HSC", credits: 156, perCredit: "2,200", total: "3,61,200" },
    { program: "B.Sc. in Computer Science & Engineering (CSE) — Diploma", credits: 141, perCredit: "2,200", total: "3,28,200" },
    { program: "B.Sc. in Civil Engineering — HSC", credits: 159, perCredit: "2,000", total: "3,36,000" },
    { program: "B.Sc. in Civil Engineering — Diploma", credits: 144.75, perCredit: "2,000", total: "3,07,500" },
    { program: "B.Sc. in Electrical & Electronic Engineering (EEE) — HSC", credits: 157, perCredit: "2,100", total: "3,47,700" },
    { program: "B.Sc. in Electrical & Electronic Engineering (EEE) — Diploma", credits: 142, perCredit: "2,100", total: "3,16,200" },
    { program: "B.Sc. in Textile Engineering — HSC", credits: 159, perCredit: "2,000", total: "3,36,000" },
    { program: "B.Sc. in Textile Engineering — Diploma", credits: 144, perCredit: "2,000", total: "3,06,000" },
    { program: "B.Sc. in Fashion Design & Technology", credits: 145, perCredit: "1,700", total: "2,64,500" },
  ];

  const mastersFees = [
    { program: "Master of Laws (LL.M. Final)", credits: 36, perCredit: "1,400", total: "68,400" },
    { program: "Master of Laws (LL.M. Preliminary & Final)", credits: 72, perCredit: "1,400", total: "1,18,800" },
    { program: "M.A. in English (Final)", credits: 42, perCredit: "1,200", total: "68,400" },
    { program: "M.A. in English (Preliminary & Final)", credits: 60, perCredit: "1,200", total: "90,000" },
    { program: "M.S.S. in Broadcast Print Journalism (Final)", credits: 30, perCredit: "1,200", total: "54,000" },
    { program: "M.S.S. in Broadcast Print Journalism (Preliminary & Final)", credits: 60, perCredit: "1,200", total: "90,000" },
  ];

  const mbaFees = [
    { background: "B.A., B.Sc., B.S.S. (Pass)", freshCredits: 66, freshTotal: "1,23,600" },
    { background: "B.A./B.Sc./B.S.S. (Hons.)/M.A./M.S.S.", freshCredits: 60, freshTotal: "1,14,000" },
    { background: "B.Sc. Engr./B.Com. (Hons.)/M.Sc.", freshCredits: 54, freshTotal: "1,04,400" },
    { background: "M.Com.", freshCredits: 48, freshTotal: "94,800" },
    { background: "M.Com. with Hons.", freshCredits: 42, freshTotal: "85,200" },
    { background: "BBA", freshCredits: 42, freshTotal: "85,200" },
  ];

  const otherFees = [
    { item: "Admission Fee (One-time, non-refundable)", amount: "18,000" },
    { item: "Admission Form Fee", amount: "500" },
    { item: "Trimester Fee (International students only)", amount: "5,000" },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader icon={DollarSign} title="Tuition & Others Fees" subtitle="Transparent fee structure for all programs at PCIU." />

      <Card className="border-l-4 border-l-accent bg-accent/5">
        <CardContent className="p-6">
          <p className="text-muted-foreground">
            Tuition fees are payable when a student begins to study at the University. They include registration, tuition, initial examination, graduation and membership of the University Association.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bachelor's Degree Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-semibold">Program</th>
                  <th className="text-center p-3 font-semibold">Credits</th>
                  <th className="text-right p-3 font-semibold">Per Credit (BDT)</th>
                  <th className="text-right p-3 font-semibold">Total (BDT)</th>
                </tr>
              </thead>
              <tbody>
                {undergraduateFees.map((fee, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="p-3 text-foreground">{fee.program}</td>
                    <td className="p-3 text-center text-muted-foreground">{fee.credits}</td>
                    <td className="p-3 text-right text-muted-foreground">৳{fee.perCredit}</td>
                    <td className="p-3 text-right font-medium text-foreground">৳{fee.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Master's Degree Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-semibold">Program</th>
                  <th className="text-center p-3 font-semibold">Credits</th>
                  <th className="text-right p-3 font-semibold">Per Credit (BDT)</th>
                  <th className="text-right p-3 font-semibold">Total (BDT)</th>
                </tr>
              </thead>
              <tbody>
                {mastersFees.map((fee, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="p-3 text-foreground">{fee.program}</td>
                    <td className="p-3 text-center text-muted-foreground">{fee.credits}</td>
                    <td className="p-3 text-right text-muted-foreground">৳{fee.perCredit}</td>
                    <td className="p-3 text-right font-medium text-foreground">৳{fee.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">MBA Program Fees (Per Credit: ৳1,600)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">Credit hours vary based on academic background. Job experience reduces credit requirements (must be business-related, counted from last degree).</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-semibold">Academic Background</th>
                  <th className="text-center p-3 font-semibold">Fresh Graduates (Credits)</th>
                  <th className="text-right p-3 font-semibold">Total (BDT)</th>
                </tr>
              </thead>
              <tbody>
                {mbaFees.map((fee, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="p-3 text-foreground">{fee.background}</td>
                    <td className="p-3 text-center text-muted-foreground">{fee.freshCredits}</td>
                    <td className="p-3 text-right font-medium text-foreground">৳{fee.freshTotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Other Fees & Charges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-3">
            {otherFees.map((fee, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                <span className="text-sm text-muted-foreground">{fee.item}</span>
                <span className="font-semibold text-foreground text-sm">৳{fee.amount}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-highlight bg-highlight/5">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Fees are subject to change. All fees include admission fee (non-refundable). Students may pay semester fees in installments. Contact the Admission Office for the latest fee schedule.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function FAQContent() {
  return <UnderConstructionContent icon={HelpCircle} title="Frequently Asked Questions" subtitle="Common questions and answers about admission at PCIU." />;
}

function AdmissionTestResultContent() {
  return <UnderConstructionContent icon={BarChart3} title="Admission Test Result" subtitle="Check your admission test results here." />;
}

function ScholarshipContent() {
  const scholarships = [
    { name: "Merit-Based Scholarship", eligibility: "GPA 5.00 in both SSC & HSC", benefit: "100% tuition waiver", icon: "🏆" },
    { name: "Chancellor's Scholarship", eligibility: "GPA 4.80+ in both SSC & HSC", benefit: "50% tuition waiver", icon: "🎓" },
    { name: "Dean's List Scholarship", eligibility: "CGPA 3.90+ in previous semester", benefit: "30% tuition waiver for next semester", icon: "📜" },
    { name: "Freedom Fighter's Ward", eligibility: "Children of freedom fighters", benefit: "50% tuition waiver", icon: "🇧🇩" },
    { name: "Sibling Discount", eligibility: "Two or more siblings enrolled simultaneously", benefit: "15% tuition waiver for each sibling", icon: "👨‍👩‍👧‍👦" },
    { name: "Need-Based Financial Aid", eligibility: "Demonstrated financial need", benefit: "Up to 40% tuition waiver", icon: "💰" },
    { name: "Sports Scholarship", eligibility: "National-level sports achievement", benefit: "Up to 50% tuition waiver", icon: "⚽" },
    { name: "Cultural Excellence Award", eligibility: "National-level cultural achievement", benefit: "Up to 30% tuition waiver", icon: "🎭" },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader icon={Award} title="Scholarship & Financial Assistance" subtitle="PCIU offers various scholarships and financial aid opportunities to deserving students." />

      <Card className="border-l-4 border-l-accent bg-accent/5">
        <CardContent className="p-6">
          <p className="text-muted-foreground">
            Port City International University is committed to making quality education accessible. We offer a range of scholarships and financial aid programs to recognize academic excellence, support financially disadvantaged students, and encourage extra-curricular achievements.
          </p>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        {scholarships.map((s, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{s.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2"><strong>Eligibility:</strong> {s.eligibility}</p>
                  <span className="inline-block bg-accent/10 text-accent text-xs font-medium px-2.5 py-1 rounded-full">{s.benefit}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How to Apply for Scholarship</CardTitle>
        </CardHeader>
        <CardContent>
          <BulletList items={[
            "Fill out the Scholarship Application Form available at the Admission Office or download from the website.",
            "Submit certified copies of all academic transcripts and certificates.",
            "Provide a recommendation letter from the Head of Department (for continuing students).",
            "Submit proof of financial need (for need-based aid) — income certificate, family information.",
            "Applications are reviewed by the Scholarship Committee each semester.",
          ]} />
        </CardContent>
      </Card>
    </div>
  );
}

function AdmissionContactContent() {
  return (
    <div className="space-y-8">
      <SectionHeader icon={Phone} title="Admission Contact" subtitle="Get in touch with our admission office for any queries." />

      <div className="grid sm:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Admission Office</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-foreground">Address</p>
              <p className="text-sm text-muted-foreground">
                Port City International University<br />
                7-14, Nikunja Housing Society,<br />
                South Khulshi, Chattogram, Bangladesh
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Phone</p>
              <p className="text-sm text-muted-foreground">
                +880-1851120791<br />
                Cell: +880-1881075020 (Admission)
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Email</p>
              <p className="text-sm text-muted-foreground">admission@portcity.edu.bd</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Website</p>
              <p className="text-sm text-muted-foreground">www.portcity.edu.bd</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Office Hours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { day: "Saturday – Thursday", time: "9:00 AM – 5:00 PM" },
                { day: "Friday", time: "9:00 AM – 5:00 PM" },
                { day: "Government Holidays", time: "Closed" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <span className="text-sm text-foreground font-medium">{item.day}</span>
                  <span className="text-sm text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm font-medium text-foreground mb-2">During Admission Season</p>
              <p className="text-sm text-muted-foreground">
                Extended hours: 9:00 AM – 7:00 PM (Saturday – Thursday)<br />
                Friday: 10:00 AM – 4:00 PM (during admission period only)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <CardContent className="p-8 text-center">
          <h3 className="font-heading text-xl font-bold mb-3">Need Help with Admission?</h3>
          <p className="text-primary-foreground/80 mb-6 text-sm">
            Our admission counselors are available to guide you through the entire process.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-highlight hover:bg-highlight/90 text-highlight-foreground font-semibold">
              Call Now
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              Send Email
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Admission;
