import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Users, Shield, Scale, ChevronRight } from "lucide-react";

// Types
interface MemberInfo {
  serial: number;
  name: string;
  designation: string;
  role: string;
  imageUrl?: string;
}

// --- DATA ---

const syndicateMembers: MemberInfo[] = [
  { serial: 1, name: "Prof. Dr. Mohammad Tayub Chowdhury", designation: "Vice Chancellor, PCIU", role: "Chairman" },
  { serial: 2, name: "Mr. Zahir Ahmmed", designation: "Member, Board of Trustees, PCIU", role: "Member" },
  { serial: 3, name: "Prof. Dr. Nizamul Hoque Bhuiyan", designation: "Member, Board of Trustees, PCIU", role: "Member" },
  { serial: 4, name: "Mr. Mohammad Ali Azzam Swapan", designation: "Member, Board of Trustees, PCIU", role: "Member" },
  { serial: 5, name: "Prof. Dr. Mohammed Ali Chowdhury", designation: "Treasurer, PCIU", role: "Member" },
  { serial: 6, name: "Prof. Dr. Mohammad Shahadat Hossain", designation: "UGC Nominated", role: "Member" },
  { serial: 7, name: "Prof. Dr. Mainul Hasan Chowdhury", designation: "Dean, Faculty of Humanities, Social Science & Law, PCIU", role: "Member" },
  { serial: 8, name: "Prof. Dr. Zahurul Alam", designation: "Nominated by VC as Academic Council Member, PCIU", role: "Member" },
  { serial: 9, name: "Mr. Zahirul Islam", designation: "Govt. Nominated", role: "Member" },
  { serial: 10, name: "Mr. Md. Musa", designation: "Chairman, Department of Business Administration", role: "Member" },
  { serial: 11, name: "Mr. Md. Obaydur Rahman", designation: "Registrar, PCIU", role: "Member Secretary" },
];

const academicCouncilMembers: MemberInfo[] = [
  { serial: 1, name: "Prof. Dr. Mohammad Tayub Chowdhury", designation: "Vice Chancellor, PCIU", role: "Chairman" },
  { serial: 2, name: "Prof. Dr. M. Majibur Rahman", designation: "Member, BOT, PCIU", role: "Member" },
  { serial: 3, name: "Mr. Zahir Ahammed", designation: "Member, BOT, PCIU", role: "Member" },
  { serial: 4, name: "Mr. Mohammad Ali Azzam Swapan", designation: "Member, BOT, PCIU", role: "Member" },
  { serial: 5, name: "Prof. Dr. Engr. Mafzal Ahmed", designation: "Dean, Faculty of Science & Engineering & Professor, Dept. of Textile Engineering", role: "Member" },
  { serial: 6, name: "Prof. Dr. Md. Fashiul Alam", designation: "Dean & Professor, Faculty of Business Studies", role: "Member" },
  { serial: 7, name: "Prof. Mainul Hasan Chowdhury", designation: "Dean, Faculty of Humanities, Social Science & Law", role: "Member" },
  { serial: 8, name: "Prof. Md. Bazlur Rahman", designation: "PCIU", role: "Member" },
  { serial: 9, name: "Prof. Dr. Zahurul Alam", designation: "PCIU", role: "Member" },
  { serial: 10, name: "Engr. Mr. Iusuf Khan", designation: "Chairman, Dept. of Textile Engineering", role: "Member" },
  { serial: 11, name: "Md. Musa", designation: "Assistant Professor & Chairman, Dept. of Business Administration", role: "Member" },
  { serial: 12, name: "Mr. A S M Iftekarul Azan", designation: "Chairman, English", role: "Member" },
  { serial: 13, name: "Mr. S. M Osman Gani", designation: "Chairman, Natural Science", role: "Member" },
  { serial: 14, name: "Dr. Engr. Ajoy Paul", designation: "Chairman, Civil Engineering", role: "Member" },
  { serial: 15, name: "Mrs. Manoara Begum", designation: "Chairman, CSE", role: "Member" },
  { serial: 16, name: "Mr. Deepak Kumar Chowdhury", designation: "Chairman, EEE", role: "Member" },
  { serial: 17, name: "Mr. Ashraful Islam", designation: "Chairman, Fashion Design", role: "Member" },
  { serial: 18, name: "Mrs. Dilruba Akter", designation: "Chairman, Journalism", role: "Member" },
  { serial: 19, name: "Md. Ziaul Karim", designation: "Chairman, Law", role: "Member" },
  { serial: 20, name: "Prof. Dr. Quazi Delwar Hossain", designation: "Professor, Dept. of EEE", role: "Member" },
  { serial: 21, name: "Prof. Dr. Sudip Kumar Pal", designation: "Professor, Dept. of Civil Engineering", role: "Member" },
  { serial: 22, name: "Prof. Dr. Mohammad Sahid Ullah", designation: "Professor, Dept. of Journalism & Media Studies", role: "Member" },
  { serial: 23, name: "Mr. Muhammad Anwarul Azim", designation: "Professor, Dept. of CSE", role: "Member" },
  { serial: 24, name: "Mohammad Jashim Uddin", designation: "Professor, Dept. of Fashion Design & Technology", role: "Member" },
  { serial: 25, name: "Mr. Md. Obaydur Rahman", designation: "Registrar, PCIU", role: "Member Secretary" },
];

const proctorialBodyMembers: MemberInfo[] = [
  { serial: 1, name: "Mr. Md. Rashed Khan Milon", designation: "Proctor, PCIU", role: "Proctor" },
  { serial: 2, name: "Mr. Akib Jayed Islam", designation: "Assistant Proctor, PCIU", role: "Assistant Proctor" },
  { serial: 3, name: "Mr. Mohammad Ishtiaq", designation: "Assistant Proctor, PCIU", role: "Assistant Proctor" },
  { serial: 4, name: "Mr. Jahid Khan", designation: "Assistant Proctor, PCIU", role: "Assistant Proctor" },
  { serial: 5, name: "Mr. Mohammad Hasan Mahmud Mazumdar", designation: "Assistant Proctor, PCIU", role: "Assistant Proctor" },
  { serial: 6, name: "Mr. Nurul Amin", designation: "Assistant Proctor, PCIU", role: "Assistant Proctor" },
  { serial: 7, name: "Mr. Md. Maherab Hasan", designation: "Assistant Proctor, PCIU", role: "Assistant Proctor" },
  { serial: 8, name: "Ms. Taslima Akter Erin", designation: "Assistant Proctor, PCIU", role: "Assistant Proctor" },
  { serial: 9, name: "Md. Arafat Islam", designation: "Assistant Proctor, PCIU", role: "Assistant Proctor" },
  { serial: 10, name: "Mr. Ismail Hossain", designation: "Assistant Proctor, PCIU", role: "Assistant Proctor" },
];

// --- TABS CONFIG ---

const tabs = [
  {
    id: "syndicate",
    label: "Syndicate",
    icon: Shield,
    description: "The Syndicate is the executive body of the university, responsible for the management and administration of the university's affairs, finances, and property.",
    members: syndicateMembers,
  },
  {
    id: "academic-council",
    label: "Academic Council",
    icon: Scale,
    description: "The Academic Council is the principal academic body of the university. It is responsible for maintaining standards of instruction, education, and examination, and advises the Syndicate on all academic matters.",
    members: academicCouncilMembers,
  },
  {
    id: "proctorial-body",
    label: "Proctorial Bodies",
    icon: Users,
    description: "The Proctorial Body maintains discipline, order, and decorum on the university campus. It ensures a safe, conducive, and inclusive learning environment for all students.",
    members: proctorialBodyMembers,
  },
];

// --- COMPONENTS ---

function MemberCard({ member }: { member: MemberInfo }) {
  return (
    <div className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-4 p-4">
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
            {member.imageUrl ? (
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-lg font-bold">
                {member.name.charAt(0)}
              </div>
            )}
          </div>
          <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
            {member.serial}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-foreground text-sm leading-tight truncate">{member.name}</h4>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{member.designation}</p>
          <span
            className={cn(
              "inline-block mt-1.5 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full",
              member.role === "Chairman"
                ? "bg-highlight/15 text-highlight"
                : member.role === "Member Secretary"
                ? "bg-accent/15 text-accent"
                : "bg-primary/10 text-primary"
            )}
          >
            {member.role}
          </span>
        </div>
      </div>
    </div>
  );
}

function MemberTable({ members }: { members: MemberInfo[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-primary text-primary-foreground">
            <th className="px-4 py-3 text-left font-semibold w-12">SL</th>
            <th className="px-4 py-3 text-left font-semibold">Member</th>
            <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">Designation</th>
            <th className="px-4 py-3 text-left font-semibold">Role</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, idx) => (
            <tr
              key={member.serial}
              className={cn(
                "border-b border-border transition-colors hover:bg-muted/50",
                idx % 2 === 0 ? "bg-card" : "bg-muted/20"
              )}
            >
              <td className="px-4 py-3 font-medium text-muted-foreground">{member.serial}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-border">
                    {member.imageUrl ? (
                      <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground font-bold text-sm">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground md:hidden">{member.designation}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{member.designation}</td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    "text-xs font-semibold px-2.5 py-1 rounded-full",
                    member.role === "Chairman"
                      ? "bg-highlight/15 text-highlight"
                      : member.role === "Member Secretary"
                      ? "bg-accent/15 text-accent"
                      : "bg-primary/10 text-primary"
                  )}
                >
                  {member.role}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- MAIN PAGE ---

export default function Management() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "syndicate");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tabs.some((t) => t.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const currentTab = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="relative bg-primary py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-highlight rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            University Management
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            Meet the distinguished members who govern and guide Port City International University towards academic excellence and institutional growth.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Vertical Tabs - Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-28 bg-card rounded-xl border border-border overflow-hidden shadow-sm">
              <div className="bg-primary/5 px-5 py-4 border-b border-border">
                <h3 className="font-heading font-bold text-foreground text-sm uppercase tracking-wider">
                  Management Bodies
                </h3>
              </div>
              <nav className="p-2 space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="flex-1">{tab.label}</span>
                      {isActive && <ChevronRight className="w-4 h-4" />}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Tab Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <currentTab.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                    {currentTab.label}
                  </h2>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                  {currentTab.description}
                </p>
              </div>
              <div className="flex gap-1 bg-muted rounded-lg p-1 self-start">
                <button
                  onClick={() => setViewMode("cards")}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                    viewMode === "cards" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Cards
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                    viewMode === "table" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Table
                </button>
              </div>
            </div>

            {/* Members Count Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 bg-primary/5 text-primary text-sm font-medium px-4 py-2 rounded-full border border-primary/10">
                <Users className="w-4 h-4" />
                {currentTab.members.length} Members
              </span>
            </div>

            {/* Content View */}
            {viewMode === "cards" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {currentTab.members.map((member) => (
                  <MemberCard key={member.serial} member={member} />
                ))}
              </div>
            ) : (
              <MemberTable members={currentTab.members} />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
