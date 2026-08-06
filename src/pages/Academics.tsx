import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, GraduationCap, FileText, Award, Shield, CheckCircle, BookOpen, AlertTriangle, Star, Scale, Shirt, BookMarked, Users, Download, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const sections = [
  { id: "exam-schedule", label: "Exam Schedule", icon: Calendar },
  { id: "class-schedule", label: "Class Schedule", icon: Clock },
  { id: "result-grading", label: "Rules & Grading System", icon: Award },
  { id: "examination-policies", label: "Examination Policies", icon: Shield },
  { id: "academic-results", label: "Academic Results", icon: FileText },
  { id: "certification-verification", label: "Online Certification Verification", icon: CheckCircle },
];

const Academics = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState("exam-schedule");

  useEffect(() => {
    const section = searchParams.get("section");
    if (section && sections.some((s) => s.id === section)) {
      setActiveSection(section);
    }
  }, [searchParams]);

  const handleSectionChange = (id: string) => {
    setActiveSection(id);
    setSearchParams({ section: id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative bg-primary py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(var(--accent)) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(var(--accent)) 0%, transparent 50%)" }} />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <GraduationCap className="w-4 h-4" />
            Academic Information
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-3">
            Academics
          </h1>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Explore schedules, grading policies, examination rules, and academic results at Port City International University.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-24 bg-card border border-border rounded-xl overflow-hidden shadow-sm">
              <div className="bg-primary px-5 py-4">
                <h3 className="text-primary-foreground font-bold text-sm uppercase tracking-wider">Academic Menu</h3>
              </div>
              <nav className="p-2">
                {sections.map((s) => {
                  const Icon = s.icon;
                  const isActive = activeSection === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleSectionChange(s.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left ${
                        isActive
                          ? "bg-accent/10 text-accent border-l-4 border-accent"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {s.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {activeSection === "exam-schedule" && <ExamScheduleSection />}
            {activeSection === "class-schedule" && <ClassScheduleSection />}
            {activeSection === "result-grading" && <ResultGradingSection />}
            {activeSection === "examination-policies" && <ExaminationPoliciesSection />}
            {activeSection === "academic-results" && <AcademicResultsSection />}
            {activeSection === "certification-verification" && <CertificationVerificationSection />}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

/* ─── Download Helper ─── */

function downloadScheduleAsPrintable(title: string, content: string) {
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title} - PCIU</title>
<style>body{font-family:Arial,sans-serif;margin:40px;color:#222}h1{color:#1a365d;border-bottom:3px solid #e67e22;padding-bottom:10px;font-size:22px}
h2{color:#1a365d;font-size:16px;margin-top:20px}table{width:100%;border-collapse:collapse;margin:15px 0}
th{background:#1a365d;color:#fff;padding:10px 14px;text-align:left;font-size:13px}td{padding:9px 14px;border:1px solid #ddd;font-size:13px}
tr:nth-child(even){background:#f8f9fa}.header{text-align:center;margin-bottom:30px}.header img{width:60px}
.header h2{color:#1a365d;margin:5px 0;font-size:18px}.header p{color:#666;font-size:12px;margin:2px 0}
.note{background:#fff8e1;border-left:4px solid #e67e22;padding:10px 15px;margin:15px 0;font-size:12px}
.footer{margin-top:30px;text-align:center;font-size:11px;color:#999;border-top:1px solid #ddd;padding-top:10px}
@media print{body{margin:20px}}</style></head><body>
<div class="header"><h2>Port City International University</h2><p>1/1, Nasirabad Housing Society, Chittagong-4209</p></div>
<h1>${title}</h1>${content}
<div class="footer">Port City International University &bull; www.portcity.edu.bd &bull; Generated on ${new Date().toLocaleDateString()}</div>
</body></html>`;
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.replace(/\s+/g, "_")}_PCIU.html`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ─── Section Components ─── */

function SectionHeader({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-accent/10 rounded-xl">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
      </div>
      <p className="text-muted-foreground ml-14">{subtitle}</p>
      <div className="h-1 w-20 bg-accent rounded-full mt-4 ml-14" />
    </div>
  );
}

function InfoCard({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-card border border-border rounded-xl p-6 shadow-sm ${className}`}>
      <h3 className="font-bold text-lg text-foreground mb-4 pb-3 border-b border-border">{title}</h3>
      {children}
    </div>
  );
}

function ExamScheduleSection() {
  const schedules = [
    { semester: "Spring 2026", midterm: "March 15 – March 25, 2026", final: "May 20 – June 5, 2026", status: "Ongoing" },
    { semester: "Summer 2026", midterm: "July 10 – July 20, 2026", final: "September 15 – September 30, 2026", status: "Upcoming" },
    { semester: "Fall 2026", midterm: "November 5 – November 15, 2026", final: "January 10 – January 25, 2027", status: "Upcoming" },
  ];

  const examRoutine = [
    { date: "March 15, 2026 (Sat)", time: "10:00 AM – 1:00 PM", course: "CSE 101 – Introduction to Computer Science", room: "Room 301" },
    { date: "March 16, 2026 (Sun)", time: "10:00 AM – 1:00 PM", course: "ENG 102 – English Composition", room: "Room 204" },
    { date: "March 17, 2026 (Mon)", time: "10:00 AM – 1:00 PM", course: "MAT 101 – Calculus I", room: "Room 105" },
    { date: "March 18, 2026 (Tue)", time: "2:00 PM – 5:00 PM", course: "PHY 101 – Physics I", room: "Room 302" },
    { date: "March 19, 2026 (Wed)", time: "10:00 AM – 1:00 PM", course: "BBA 201 – Principles of Management", room: "Room 401" },
    { date: "March 20, 2026 (Thu)", time: "10:00 AM – 1:00 PM", course: "LAW 101 – Introduction to Law", room: "Room 202" },
    { date: "March 22, 2026 (Sat)", time: "2:00 PM – 5:00 PM", course: "CSE 203 – Data Structures", room: "Room 303" },
    { date: "March 23, 2026 (Sun)", time: "10:00 AM – 1:00 PM", course: "EEE 101 – Basic Electrical Engineering", room: "Room 106" },
    { date: "March 24, 2026 (Mon)", time: "10:00 AM – 1:00 PM", course: "CE 101 – Engineering Mechanics", room: "Room 107" },
    { date: "March 25, 2026 (Tue)", time: "2:00 PM – 5:00 PM", course: "TEX 201 – Textile Fibers", room: "Room 501" },
  ];

  const routineTableHTML = examRoutine.map(r =>
    `<tr><td>${r.date}</td><td>${r.time}</td><td>${r.course}</td><td>${r.room}</td></tr>`
  ).join("");

  const handleDownloadSchedule = () => {
    const rows = schedules.map(s => `<tr><td>${s.semester}</td><td>${s.midterm}</td><td>${s.final}</td><td>${s.status}</td></tr>`).join("");
    const content = `
<div class="note">⚠ Exam schedules are subject to change. Students are advised to check their departmental notice board and PCIU website regularly.</div>
<table><thead><tr><th>Semester</th><th>Midterm Examination</th><th>Final Examination</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>
<h2>General Exam Guidelines</h2>
<table><thead><tr><th>#</th><th>Guideline</th></tr></thead><tbody>
<tr><td>1</td><td>Students must carry their university ID card to the examination hall.</td></tr>
<tr><td>2</td><td>Mobile phones and electronic devices are strictly prohibited during exams.</td></tr>
<tr><td>3</td><td>Students should arrive at least 15 minutes before the exam starts.</td></tr>
<tr><td>4</td><td>No student will be allowed entry 30 minutes after the exam begins.</td></tr>
<tr><td>5</td><td>Use of unfair means will result in immediate expulsion from the exam.</td></tr>
</tbody></table>`;
    downloadScheduleAsPrintable("Exam_Schedule", content);
  };

  const handleDownloadRoutine = () => {
    const content = `
<div class="note">⚠ This is the Midterm Exam Routine for Spring 2026. Subject to change — check notice board for updates.</div>
<table><thead><tr><th>Date</th><th>Time</th><th>Course</th><th>Room</th></tr></thead><tbody>${routineTableHTML}</tbody></table>`;
    downloadScheduleAsPrintable("Exam_Routine_Spring_2026_Midterm", content);
  };

  const RoutineTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-primary/5">
            <th className="text-left px-4 py-3 font-semibold text-foreground">Date</th>
            <th className="text-left px-4 py-3 font-semibold text-foreground">Time</th>
            <th className="text-left px-4 py-3 font-semibold text-foreground">Course</th>
            <th className="text-left px-4 py-3 font-semibold text-foreground">Room</th>
          </tr>
        </thead>
        <tbody>
          {examRoutine.map((r, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-muted/30" : ""}>
              <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">{r.date}</td>
              <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">{r.time}</td>
              <td className="px-4 py-2.5 font-medium text-foreground">{r.course}</td>
              <td className="px-4 py-2.5 text-muted-foreground">{r.room}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
        <SectionHeader icon={Calendar} title="Exam Schedule" subtitle="Midterm and Final examination schedules for all programs" />
        <div className="flex gap-2 flex-shrink-0">
          <Button onClick={handleDownloadSchedule} variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Schedule
          </Button>
          <Button onClick={handleDownloadRoutine} variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Routine
          </Button>
        </div>
      </div>

      <div className="bg-accent/5 border border-accent/20 rounded-xl p-5 mb-8 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-semibold text-foreground text-sm">Important Notice</p>
          <p className="text-muted-foreground text-sm">Exam schedules are subject to change. Students are advised to check their departmental notice board and PCIU website regularly for the latest updates.</p>
        </div>
      </div>

      <div className="space-y-4">
        {schedules.map((s) => (
          <div key={s.semester} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between bg-primary/5 px-6 py-4">
              <h3 className="font-bold text-lg text-foreground">{s.semester}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${s.status === "Ongoing" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                {s.status}
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-4 p-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg"><BookOpen className="w-4 h-4 text-blue-600" /></div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Midterm Examination</p>
                  <p className="font-medium text-foreground">{s.midterm}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-50 rounded-lg"><FileText className="w-4 h-4 text-orange-600" /></div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Final Examination</p>
                  <p className="font-medium text-foreground">{s.final}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Exam Routine Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" />
            Exam Routine – Spring 2026 Midterm
          </h3>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" /> View Full Routine
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Exam Routine – Spring 2026 Midterm</DialogTitle>
                </DialogHeader>
                <RoutineTable />
              </DialogContent>
            </Dialog>
            <Button onClick={handleDownloadRoutine} size="sm" className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Download className="w-4 h-4" /> Download Routine
            </Button>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <RoutineTable />
        </div>
      </div>

      <InfoCard title="General Exam Guidelines" className="mt-8">
        <ul className="space-y-2.5 text-sm text-muted-foreground">
          <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />Students must carry their university ID card to the examination hall.</li>
          <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />Mobile phones and electronic devices are strictly prohibited during exams.</li>
          <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />Students should arrive at least 15 minutes before the exam starts.</li>
          <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />No student will be allowed entry 30 minutes after the exam begins.</li>
          <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />Use of unfair means will result in immediate expulsion from the exam.</li>
        </ul>
      </InfoCard>
    </div>
  );
}

function ClassScheduleSection() {
  const timeSlots = [
    { time: "8:30 AM – 10:00 AM", slot: "A" },
    { time: "10:00 AM – 11:30 AM", slot: "B" },
    { time: "11:30 AM – 1:00 PM", slot: "C" },
    { time: "2:00 PM – 3:30 PM", slot: "D" },
    { time: "3:30 PM – 5:00 PM", slot: "E" },
    { time: "5:00 PM – 6:30 PM", slot: "F" },
  ];

  const classRoutine = [
    { day: "Saturday", slotA: "CSE 101", slotB: "ENG 102", slotC: "MAT 101", slotD: "PHY 101", slotE: "—", slotF: "—" },
    { day: "Sunday", slotA: "BBA 201", slotB: "LAW 101", slotC: "CSE 203", slotD: "—", slotE: "EEE 101", slotF: "CE 101" },
    { day: "Monday", slotA: "MAT 101", slotB: "CSE 101", slotC: "PHY 101", slotD: "ENG 102", slotE: "—", slotF: "—" },
    { day: "Tuesday", slotA: "CSE 203", slotB: "BBA 201", slotC: "—", slotD: "LAW 101", slotE: "TEX 201", slotF: "—" },
    { day: "Wednesday", slotA: "ENG 102", slotB: "MAT 101", slotC: "CSE 101", slotD: "—", slotE: "PHY 101", slotF: "EEE 101" },
    { day: "Thursday", slotA: "PHY 101", slotB: "CSE 203", slotC: "BBA 201", slotD: "ENG 102", slotE: "—", slotF: "—" },
  ];

  const routineTableHTML = classRoutine.map(r =>
    `<tr><td><strong>${r.day}</strong></td><td>${r.slotA}</td><td>${r.slotB}</td><td>${r.slotC}</td><td>${r.slotD}</td><td>${r.slotE}</td><td>${r.slotF}</td></tr>`
  ).join("");

  const handleDownloadSchedule = () => {
    const slotRows = timeSlots.map(ts => `<tr><td style="font-weight:bold;text-align:center">${ts.slot}</td><td>${ts.time}</td></tr>`).join("");
    const content = `
<table><thead><tr><th>Slot</th><th>Time</th></tr></thead><tbody>${slotRows}</tbody></table>
<h2>Day Section</h2>
<table><tbody>
<tr><td><strong>Class Days</strong></td><td>Saturday – Thursday</td></tr>
<tr><td><strong>Time</strong></td><td>8:30 AM – 5:00 PM</td></tr>
<tr><td><strong>Break</strong></td><td>1:00 PM – 2:00 PM (Jumma Prayer)</td></tr>
<tr><td><strong>Weekly Holiday</strong></td><td>Friday</td></tr>
</tbody></table>
<h2>Evening Section</h2>
<table><tbody>
<tr><td><strong>Class Days</strong></td><td>Saturday – Thursday</td></tr>
<tr><td><strong>Time</strong></td><td>5:00 PM – 9:00 PM</td></tr>
<tr><td><strong>Designed For</strong></td><td>Working Professionals</td></tr>
<tr><td><strong>Weekly Holiday</strong></td><td>Friday</td></tr>
</tbody></table>`;
    downloadScheduleAsPrintable("Class_Schedule", content);
  };

  const handleDownloadRoutine = () => {
    const content = `
<div class="note">⚠ This is a sample class routine for Spring 2026. Actual routines are published by each department.</div>
<table><thead><tr><th>Day</th><th>Slot A<br/>(8:30–10:00)</th><th>Slot B<br/>(10:00–11:30)</th><th>Slot C<br/>(11:30–1:00)</th><th>Slot D<br/>(2:00–3:30)</th><th>Slot E<br/>(3:30–5:00)</th><th>Slot F<br/>(5:00–6:30)</th></tr></thead><tbody>${routineTableHTML}</tbody></table>`;
    downloadScheduleAsPrintable("Class_Routine_Spring_2026", content);
  };

  const RoutineTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-primary/5">
            <th className="text-left px-3 py-3 font-semibold text-foreground">Day</th>
            {timeSlots.map(ts => (
              <th key={ts.slot} className="text-center px-2 py-3 font-semibold text-foreground">
                <div>{ts.slot}</div>
                <div className="text-xs font-normal text-muted-foreground">{ts.time.split(" – ")[0]}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {classRoutine.map((r, i) => (
            <tr key={r.day} className={i % 2 === 0 ? "bg-muted/30" : ""}>
              <td className="px-3 py-2.5 font-semibold text-foreground">{r.day}</td>
              <td className={`px-2 py-2.5 text-center text-xs ${r.slotA === "—" ? "text-muted-foreground/40" : "text-foreground font-medium"}`}>{r.slotA}</td>
              <td className={`px-2 py-2.5 text-center text-xs ${r.slotB === "—" ? "text-muted-foreground/40" : "text-foreground font-medium"}`}>{r.slotB}</td>
              <td className={`px-2 py-2.5 text-center text-xs ${r.slotC === "—" ? "text-muted-foreground/40" : "text-foreground font-medium"}`}>{r.slotC}</td>
              <td className={`px-2 py-2.5 text-center text-xs ${r.slotD === "—" ? "text-muted-foreground/40" : "text-foreground font-medium"}`}>{r.slotD}</td>
              <td className={`px-2 py-2.5 text-center text-xs ${r.slotE === "—" ? "text-muted-foreground/40" : "text-foreground font-medium"}`}>{r.slotE}</td>
              <td className={`px-2 py-2.5 text-center text-xs ${r.slotF === "—" ? "text-muted-foreground/40" : "text-foreground font-medium"}`}>{r.slotF}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
        <SectionHeader icon={Clock} title="Class Schedule" subtitle="Regular class timings and slot information for all departments" />
        <div className="flex gap-2 flex-shrink-0">
          <Button onClick={handleDownloadSchedule} variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Schedule
          </Button>
          <Button onClick={handleDownloadRoutine} variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Routine
          </Button>
        </div>
      </div>

      <InfoCard title="Class Time Slots">
        <div className="grid gap-3">
          {timeSlots.map((ts) => (
            <div key={ts.slot} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
              <span className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-sm">
                {ts.slot}
              </span>
              <span className="font-medium text-foreground">{ts.time}</span>
            </div>
          ))}
        </div>
      </InfoCard>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <InfoCard title="Day Section">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Classes: Saturday – Thursday</li>
            <li>• Time: 8:30 AM – 5:00 PM</li>
            <li>• Break: 1:00 PM – 2:00 PM (Jumma Prayer)</li>
            <li>• Weekly Holiday: Friday</li>
          </ul>
        </InfoCard>
        <InfoCard title="Evening Section">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Classes: Saturday – Thursday</li>
            <li>• Time: 5:00 PM – 9:00 PM</li>
            <li>• Designed for working professionals</li>
            <li>• Weekly Holiday: Friday</li>
          </ul>
        </InfoCard>
      </div>

      {/* Class Routine Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" />
            Class Routine – Spring 2026 (Sample)
          </h3>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" /> View Full Routine
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Class Routine – Spring 2026</DialogTitle>
                </DialogHeader>
                <RoutineTable />
              </DialogContent>
            </Dialog>
            <Button onClick={handleDownloadRoutine} size="sm" className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Download className="w-4 h-4" /> Download Routine
            </Button>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <RoutineTable />
        </div>
      </div>

      <div className="bg-accent/5 border border-accent/20 rounded-xl p-5 mt-6 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
        <p className="text-sm text-muted-foreground">
          Detailed class schedules for each department and section are available at the respective departmental offices and on the student portal. Contact your department for the latest schedule.
        </p>
      </div>
    </div>
  );
}

function ResultGradingSection() {
  const grades = [
    { range: "80% and above", letter: "A+", point: "4.00", meaning: "Outstanding" },
    { range: "75% to less than 80%", letter: "A", point: "3.75", meaning: "Excellent" },
    { range: "70% to less than 75%", letter: "A-", point: "3.50", meaning: "Very Good" },
    { range: "65% to less than 70%", letter: "B+", point: "3.25", meaning: "Good" },
    { range: "60% to less than 65%", letter: "B", point: "3.00", meaning: "Satisfactory" },
    { range: "55% to less than 60%", letter: "B-", point: "2.75", meaning: "Above Average" },
    { range: "50% to less than 55%", letter: "C+", point: "2.50", meaning: "Average" },
    { range: "45% to less than 50%", letter: "C", point: "2.25", meaning: "Below Average" },
    { range: "40% to less than 45%", letter: "D", point: "2.00", meaning: "Pass" },
    { range: "Less than 40%", letter: "F", point: "0.00", meaning: "Fail" },
    { range: "—", letter: "I", point: "—", meaning: "Incomplete" },
    { range: "—", letter: "W", point: "—", meaning: "Withdraw" },
  ];

  const attendanceMarks = [
    { range: "90–100%", marks: "10" },
    { range: "85–89%", marks: "9" },
    { range: "80–84%", marks: "8" },
    { range: "75–79%", marks: "7" },
    { range: "70–74%", marks: "6" },
    { range: "65–69%", marks: "5" },
    { range: "60–64%", marks: "4" },
    { range: "55–59%", marks: "3" },
    { range: "50–54%", marks: "2" },
    { range: "Below 50%", marks: "0" },
  ];

  const dressCodeViolations = [
    "Without wearing ID card properly",
    "Wearing a sleeveless, hanging t-shirt or chemise",
    "Wearing a wrack, ragged or slashed jeans/trousers",
    "Wearing dirty clothes or half-pant or skirt",
    "Putting on slippers of ordinary type",
    "Wearing provocative and seductive clothing/dress",
  ];

  return (
    <div>
      <SectionHeader icon={Award} title="Rules & Grading System" subtitle="Complete academic rules, regulations, evaluation procedures, and grading system of PCIU" />

      {/* Rules & Regulations */}
      <div className="bg-accent/5 border border-accent/20 rounded-xl p-5 mb-8 flex items-start gap-3">
        <Scale className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-semibold text-foreground text-sm">Non-Smoking & Non-Political Institution</p>
          <p className="text-muted-foreground text-sm">Port City International University attaches top priority to maintain a healthy academic environment in the campus. Students are expected to cooperate in achieving this goal.</p>
        </div>
      </div>

      {/* Class Attendance */}
      <InfoCard title="Class Attendance" className="mb-6">
        <p className="text-sm text-muted-foreground leading-relaxed">
          A student is expected to attend all the classes in each course. Maximum <strong className="text-foreground">30% absence</strong> in a course in one trimester may be exempted under emergency situation. It is the responsibility of the student to keep the course teacher informed regarding absence from classes. A student may be <strong className="text-foreground">dropped from a course</strong> for absence from three consecutive classes without sufficient reasons.
        </p>
      </InfoCard>

      {/* Dress Code */}
      <InfoCard title="Dress Code for Students" className="mb-6">
        <p className="text-sm text-muted-foreground mb-3">Students are advised <strong className="text-foreground">not</strong> to enter the university campus or classroom in the following attire:</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {dressCodeViolations.map((v, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
              <Shirt className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              {v}
            </div>
          ))}
        </div>
      </InfoCard>

      {/* Library Code */}
      <InfoCard title="Library Code" className="mb-6">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            "Library members must bear library cards while in the library.",
            "Handing over of the library card is absolutely prohibited.",
            "Folders, files, personal books and all kinds of bags are not allowed in the library.",
            "Members are entitled to issue 02 (two) different books at a time for ten days.",
            "Library remains open from 8:30 AM to 8:30 PM except holidays.",
            "On expiry of due date, TK 10/- will be charged per day for each issue.",
            "Silence must be maintained in the reading room.",
            "No food is allowed except fresh drinking water.",
            "In case of losing any book, a member must replace it or pay three times the market price.",
          ].map((rule, i) => (
            <li key={i} className="flex items-start gap-2">
              <BookMarked className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              {rule}
            </li>
          ))}
        </ul>
      </InfoCard>

      {/* Violation of Discipline */}
      <InfoCard title="Violation of Discipline" className="mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" /> Major Offenses
            </h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {[
                "Any activity that impedes a student's right to attend classes",
                "Any act that disturbs peace and order in class or campus",
                "Carrying deadly weapons or explosives",
                "Possessing or taking any sort of drug",
                "Physical assault and/or injuries to anyone on campus",
                "Stealing university property or extortion",
                "Any sort of forgery or falsification",
                "Attachment with subversive/unlawful organizations",
              ].map((o, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" /> Minor Offenses
            </h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {[
                "Entering campus or classroom without wearing ID card",
                "Smoking inside the classroom or campus",
                "Manners unbecoming of a university student",
                "Violation of admission/registration procedures",
                "Misuse or improper use of university properties",
                "Tampering, altering or destroying notices/posters",
                "Acts causing panic or confusion in campus",
                "Dislocating furniture/equipment without permission",
              ].map((o, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-red-800 mb-1">Disciplinary Actions</p>
          <ul className="text-sm text-red-700 space-y-1">
            <li>• Cancellation of a trimester</li>
            <li>• Temporary suspension from the university</li>
            <li>• Expulsion from the university</li>
          </ul>
        </div>
      </InfoCard>

      {/* Evaluation & Grading System */}
      <div className="border-t-4 border-accent pt-8 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
          <div className="p-2.5 bg-accent/10 rounded-xl"><GraduationCap className="w-6 h-6 text-accent" /></div>
          Evaluation & Grading System
        </h2>
        <p className="text-muted-foreground ml-14 mb-6">Evaluation procedures, marks distribution, and grading scale</p>
      </div>

      {/* Evaluation – Theory Courses */}
      <InfoCard title="Evaluation – Theory Courses (All Programs)" className="mb-6">
        <p className="text-sm text-muted-foreground mb-4">The performance of a student is evaluated based on class attendance, class tests, assignments, midterm and trimester final examinations.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary/5">
                <th className="text-left px-4 py-3 font-semibold text-foreground border-b border-border" colSpan={2}>1st Part</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground border-b border-border" colSpan={2}>2nd Part</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-muted/30">
                <td className="px-4 py-2.5 text-muted-foreground">Case/Assignment</td>
                <td className="px-4 py-2.5 font-semibold text-foreground">5%</td>
                <td className="px-4 py-2.5 text-muted-foreground">Case/Assignment</td>
                <td className="px-4 py-2.5 font-semibold text-foreground">5%</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-muted-foreground">Class Test</td>
                <td className="px-4 py-2.5 font-semibold text-foreground">5%</td>
                <td className="px-4 py-2.5 text-muted-foreground">Class Test</td>
                <td className="px-4 py-2.5 font-semibold text-foreground">5%</td>
              </tr>
              <tr className="bg-muted/30">
                <td className="px-4 py-2.5 text-muted-foreground">Midterm</td>
                <td className="px-4 py-2.5 font-semibold text-foreground">30%</td>
                <td className="px-4 py-2.5 text-muted-foreground">Trimester Final</td>
                <td className="px-4 py-2.5 font-semibold text-foreground">40%</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-muted-foreground" colSpan={2}>Attendance</td>
                <td className="px-4 py-2.5 font-semibold text-foreground" colSpan={2}>10%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />For a 3 credit hours course, minimum four class tests are taken and best three considered.</li>
          <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />For 1/2 credit hours course, minimum three class tests are taken and best two considered.</li>
          <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />After midterm, the 1st part is considered completed and not carried for trimester final.</li>
        </ul>
      </InfoCard>

      {/* Grading Scale */}
      <InfoCard title="Grading Scale" className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary/5">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Marks Range</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Letter Grade</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Grade Point</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Interpretation</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g, i) => (
                <tr key={`${g.letter}-${i}`} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                  <td className="px-4 py-2.5 text-muted-foreground">{g.range}</td>
                  <td className="px-4 py-2.5 font-bold text-primary">{g.letter}</td>
                  <td className="px-4 py-2.5 font-semibold text-foreground">{g.point}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{g.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InfoCard>

      {/* Attendance Marks */}
      <InfoCard title="Marks of Class Attendance" className="mb-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {attendanceMarks.map((a) => (
            <div key={a.range} className="text-center bg-muted/30 rounded-xl p-3">
              <p className="text-lg font-bold text-accent">{a.marks}</p>
              <p className="text-xs text-muted-foreground">{a.range}</p>
            </div>
          ))}
        </div>
      </InfoCard>

      {/* GPA Calculation */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <InfoCard title="GPA / CGPA Calculation">
          <p className="text-sm text-muted-foreground mb-3">Grade Point Average (GPA) or Cumulative Grade Point Average (CGPA) is the average of the grade points obtained in all courses passed/completed.</p>
          <div className="bg-primary/5 rounded-lg p-4 text-center">
            <p className="font-mono font-bold text-primary text-lg">GPA = Σ(Credit × Grade Point) / Σ(Credit)</p>
          </div>
          <div className="mt-4 bg-muted/30 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-2 font-semibold">Example:</p>
            <p className="text-sm text-muted-foreground">Grade point 4.0 in a 3 credit course + 3.0 in 1.5 credit course:</p>
            <p className="text-sm font-mono text-primary mt-1">GPA = (3×4.0 + 1.5×3.0) / (3+1.5) = 16.5/4.5 = <strong>3.67</strong></p>
          </div>
        </InfoCard>

        <InfoCard title="Earned Credit & Probation">
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" /><span>Courses with grade <strong className="text-foreground">"D" or higher</strong> count as earned credits.</span></li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" /><span>"F" grade courses must be <strong className="text-foreground">repeated</strong> and are not counted for GPA.</span></li>
            <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" /><span><strong className="text-foreground">Academic Probation:</strong> Students with GPA less than 2.50 are placed under probation for one trimester.</span></li>
            <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" /><span>No student is allowed to repeat/retake a course <strong className="text-foreground">more than three times</strong>.</span></li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" /><span>Repeating a course requires full course fee and attendance as a regular student.</span></li>
          </ul>
        </InfoCard>
      </div>

      {/* Course Monitoring & Specialization */}
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Course Monitoring">
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />All courses assigned by Academic Committee of the respective department.</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />Course teacher provides a course outline with textbook list and probable test dates.</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />Academic Committee monitors progress by meeting at least once a month.</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />Results published within 1 week of last examination.</li>
          </ul>
        </InfoCard>
        <InfoCard title="Specialization & Internship/Thesis">
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><GraduationCap className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" /><span><strong className="text-foreground">Specialization:</strong> Provides in-depth understanding on a specialized subject area.</span></li>
            <li className="flex items-start gap-2"><GraduationCap className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" /><span>All foundation and core courses must be completed before taking specialization courses.</span></li>
            <li className="flex items-start gap-2"><GraduationCap className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" /><span><strong className="text-foreground">Internship/Thesis:</strong> Provides adequate training for students pursuing a career in specialized areas.</span></li>
          </ul>
        </InfoCard>
      </div>
    </div>
  );
}

function ExaminationPoliciesSection() {
  const policies = [
    {
      title: "Attendance Requirement",
      content: "A student must have a minimum of 60% attendance in a course to be eligible for the final examination. Students failing to meet this requirement will be marked as 'Not Eligible' for the final exam.",
    },
    {
      title: "Midterm Examination",
      content: "Midterm exams carry 30% of the total marks. These are conducted during the middle of each semester as per the academic calendar. There is no supplementary midterm exam.",
    },
    {
      title: "Final Examination",
      content: "Final exams carry 40% of total marks. A student must pass the final examination separately with a minimum of 40% marks to pass the course overall.",
    },
    {
      title: "Continuous Assessment",
      content: "The remaining 30% marks are distributed among class attendance (10%), assignments/quizzes (10%), and class participation/presentations (10%).",
    },
    {
      title: "Retake & Improvement Policy",
      content: "Students who fail a course (grade F) must retake the course. Students may improve a grade by retaking the course, and the higher grade will be considered for CGPA calculation.",
    },
    {
      title: "Academic Dishonesty",
      content: "Any form of cheating, plagiarism, or unfair means during examination will lead to immediate cancellation of the exam. Repeat offenders face suspension or expulsion from the university.",
    },
    {
      title: "Exam Deferral",
      content: "Students may apply for exam deferral with valid documentation (medical certificate, etc.) within 3 working days of the missed exam. Deferred exams are scheduled at the end of the semester.",
    },
  ];

  return (
    <div>
      <SectionHeader icon={Shield} title="Examination Policies" subtitle="Rules and regulations governing university examinations" />

      <div className="space-y-4">
        {policies.map((p, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-accent/30 transition-colors">
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">
                {i + 1}
              </span>
              <div>
                <h3 className="font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <InfoCard title="Marks Distribution Summary" className="mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Class Attendance", value: "10%" },
            { label: "Assignment/Quiz", value: "10%" },
            { label: "Class Performance", value: "10%" },
            { label: "Midterm Exam", value: "30%" },
          ].map((m) => (
            <div key={m.label} className="text-center bg-muted/50 rounded-xl p-4">
              <p className="text-2xl font-bold text-accent">{m.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center bg-primary/5 rounded-xl p-4">
          <p className="text-3xl font-bold text-primary">40%</p>
          <p className="text-sm text-muted-foreground mt-1">Final Examination</p>
        </div>
      </InfoCard>
    </div>
  );
}

function AcademicResultsSection() {
  return (
    <div>
      <SectionHeader icon={FileText} title="Academic Results" subtitle="Access semester results and academic transcripts" />

      <InfoCard title="How to Check Your Results">
        <div className="space-y-4">
          {[
            { step: "1", title: "Visit Student Portal", desc: "Log in to the PCIU Student Portal using your Student ID and password." },
            { step: "2", title: "Navigate to Results", desc: "Go to 'Academic' → 'Semester Results' from the dashboard menu." },
            { step: "3", title: "Select Semester", desc: "Choose the semester and year to view your grades and GPA." },
            { step: "4", title: "Download Transcript", desc: "Click 'Download' to save your unofficial transcript as PDF." },
          ].map((s) => (
            <div key={s.step} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
              <span className="w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                {s.step}
              </span>
              <div>
                <p className="font-semibold text-foreground">{s.title}</p>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </InfoCard>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <InfoCard title="Result Publication Timeline">
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5" />Midterm results: Within 2 weeks of exam completion</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5" />Final results: Within 4 weeks of exam completion</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5" />Results are published on the student portal first</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5" />Official transcripts available from the Registrar's Office</li>
          </ul>
        </InfoCard>
        <InfoCard title="Grade Review Process">
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5" />Apply within 7 days of result publication</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5" />Submit review application to department head</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5" />Review fee: BDT 500 per course</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5" />Results of review communicated within 2 weeks</li>
          </ul>
        </InfoCard>
      </div>
    </div>
  );
}

function CertificationVerificationSection() {
  return (
    <div>
      <SectionHeader icon={CheckCircle} title="Online Certification Verification" subtitle="Verify academic certificates and transcripts issued by PCIU" />

      <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 text-primary-foreground mb-8">
        <h3 className="text-xl font-bold mb-3">Certificate Verification Portal</h3>
        <p className="text-primary-foreground/80 text-sm mb-6">
          Employers and institutions can verify the authenticity of certificates and transcripts issued by Port City International University using the verification portal.
        </p>
        <div className="bg-white/10 backdrop-blur rounded-xl p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-primary-foreground/60 font-semibold">Student ID</label>
              <div className="mt-1 bg-white/10 rounded-lg px-4 py-3 text-sm text-primary-foreground/50">Enter Student ID</div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-primary-foreground/60 font-semibold">Certificate Number</label>
              <div className="mt-1 bg-white/10 rounded-lg px-4 py-3 text-sm text-primary-foreground/50">Enter Certificate Number</div>
            </div>
          </div>
          <p className="text-xs text-primary-foreground/50 mt-4 text-center">
            * This is a display-only preview. Please contact the Registrar's Office for actual verification.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Documents That Can Be Verified">
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5" />Provisional Certificate</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5" />Original Degree Certificate</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5" />Academic Transcript</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5" />Character Certificate</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5" />Student Status Certificate</li>
          </ul>
        </InfoCard>
        <InfoCard title="Contact for Verification">
          <div className="space-y-4 text-sm text-muted-foreground">
            <p><strong className="text-foreground">Office of the Registrar</strong></p>
            <p>Port City International University</p>
            <p>1/1, Nasirabad Housing Society, Chittagong-4209</p>
            <p>📧 registrar@portcity.edu.bd</p>
            <p>📞 +880-31-2550780</p>
            <p className="text-xs text-muted-foreground/70 mt-2">Office Hours: Saturday – Thursday, 9:00 AM – 5:00 PM</p>
          </div>
        </InfoCard>
      </div>
    </div>
  );
}

export default Academics;
