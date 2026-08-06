import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen, Eye, Target, Compass, Heart, GraduationCap, Globe, Users, Award, Building2, Lightbulb, ChevronRight } from "lucide-react";

const AboutUniversity = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero — cinematic parallax-style banner */}
      <section className="relative h-[50vh] md:h-[65vh] overflow-hidden">
        <img
          src="https://portcity.edu.bd/img/about-the-university_main%20campus1.jpg"
          alt="Port City International University Main Campus"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/40 to-primary/90" />
        {/* Decorative grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23fff\' fill-opacity=\'1\'%3E%3Cpath d=\'M0 0h1v40H0zM39 0h1v40h-1zM0 0h40v1H0zM0 39h40v1H0z\'/%3E%3C/g%3E%3C/svg%3E")' }} />
        
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="container mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-accent/90 text-accent-foreground text-xs font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full mb-6 backdrop-blur-sm">
              <Building2 className="w-3.5 h-3.5" />
              The University
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] max-w-4xl mx-auto">
              About <span className="text-accent">PCIU</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light">
              Shaping future leaders through excellence in education, research, and global engagement
            </p>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V20C240 45 480 5 720 20C960 35 1200 0 1440 20V60H0Z" className="fill-background" />
          </svg>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-4 pb-2">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">About the University</span>
        </nav>
      </div>

      {/* Main About Content — Magazine editorial layout */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_340px] gap-12 items-start">
            
            {/* Left: Main content */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-10 bg-accent rounded-full" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">About the University</h2>
              </div>

              <div className="space-y-5 text-muted-foreground leading-[1.85] text-[15px]">
                <p>
                  Since the establishment, <strong className="text-foreground">Port City International University</strong> has been focusing on assisting the students in facing the challenges of the ever advancing world. PCIU is a platform where students can rise to the highest level of their achievements. It provides an outstanding and supportive environment for both undergraduate and postgraduate students.
                </p>
                <p>
                  A talented and dedicated group of academics provide guidance and advise the students to pursue their research and academic endeavor. The dynamic teaching and learning environment of PCIU have helped this University to be more competitive in maintaining a global standard in quality education and research. To accomplish its academic and social commitments, the University has been regularly organizing different events by engaging distinguished personalities and entrepreneurs from a variety of renowned institutions and corporate houses.
                </p>

                {/* Highlight pullquote */}
                <blockquote className="relative my-8 py-6 px-8 bg-primary/5 border-l-4 border-accent rounded-r-xl">
                  <Lightbulb className="absolute -top-3 -left-3 w-7 h-7 text-accent bg-background rounded-full p-1" />
                  <p className="text-foreground font-medium italic leading-relaxed">
                    "Our aim is to achieve excellence in education and research in order to build up a Smart Bangladesh — a social and technological hub for the future."
                  </p>
                </blockquote>

                <p>
                  In PCIU, we maintain a standard quality education and provide the students with proper resources and logistics to reach their goals. Recruitment of qualified teachers and executives, their training and exposure to internationally reputed institutions/organizations are our prime concerns in maintaining quality of education. We have already been able to organize two international conferences on "Quality for Sustainable Development" and "Sustainable Development in Technology for 4th Industrial Revolution".
                </p>
                <p>
                  Our teachers have had the honor in attending an international conference in Malaysia and the Vice Chancellor along with a team of young teachers and officers attended a conference on Leadership management in India. The young faculties of the university got the opportunity to participate in a training workshop at the University of Nottingham in Malaysia. All these initiatives have been aimed at achieving a global standard education and improving our academic curricula, teaching and learning methodologies and in the long run research capability. We have already started implementing OBE system as per UGC directives.
                </p>
                <p>
                  PCIU takes utmost care for its students and is ready to do whatever possible for the benefit of the students. Considering the socio-economic condition of the students of low and middle income groups, the university has kept its tuition fees at a minimum level. We have been providing merit scholarship and financial assistance to our students in different categories specially Freedom Fighter quota.
                </p>
                <p>
                  We have already created a congenial study friendly campus with all modern facilities including e-library and state of the art classrooms and laboratories. Alongside academic engagements, PCIU gives due importance to extracurricular activities of the students including indoor & outdoor sports. We have different indoor and outdoor sporting facilities like sports forum, debating club, cultural forum and robotics club and some other departmental clubs. PCIU campus is a non-political and non-smoking campus. This is an equal opportunity university and no one is discriminated or maltreated because of his/her color, race, religion or nationality.
                </p>
                <p>
                  PCIU has been maintaining a steady growth over the last few years. A good number of foreign students have been studying at PCIU and the University has created ample opportunities for them including a language center to develop communication skills.
                </p>
              </div>
            </div>

            {/* Right: Sticky sidebar with quick facts */}
            <aside className="lg:sticky lg:top-28 space-y-6">
              {/* Quick Facts Card */}
              <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
                <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-5">Quick Facts</h3>
                <div className="space-y-4">
                  {[
                    { icon: GraduationCap, value: "5,000+", label: "Students Enrolled" },
                    { icon: Users, value: "150+", label: "Faculty Members" },
                    { icon: BookOpen, value: "9", label: "Departments" },
                    { icon: Globe, value: "3", label: "Faculties" },
                    { icon: Award, value: "UGC", label: "Approved University" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <stat.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <div className="text-lg font-bold leading-tight">{stat.value}</div>
                        <div className="text-xs text-primary-foreground/60">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Campus Image Card */}
              <div className="rounded-2xl overflow-hidden shadow-md border border-border">
                <img
                  src="https://portcity.edu.bd/img/Main%20Campus.JPG"
                  alt="PCIU Main Campus"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-card">
                  <p className="text-xs font-medium text-muted-foreground">📍 Main Campus, Chittagong</p>
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
                <h4 className="font-bold text-foreground mb-2">Ready to Join PCIU?</h4>
                <p className="text-xs text-muted-foreground mb-4">Start your journey towards excellence</p>
                <a
                  href="/admission"
                  className="inline-flex items-center gap-2 bg-highlight text-highlight-foreground font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-highlight/90 transition-colors"
                >
                  Apply Now
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Strategy, Values — Full-width immersive cards */}
      <section className="py-16 md:py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full mb-4">
              Our Foundation
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Vision, Mission & <span className="text-accent">Values</span>
            </h2>
          </div>

          {/* Vision & Mission — Side by side large cards */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 mb-6">
            {/* Vision */}
            <div className="relative bg-primary rounded-2xl p-8 md:p-10 text-primary-foreground overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  To make the Port City International University a leading global university where the students, faculty and the staffs will be able to contribute in the development process and will be benefited from the advancement in higher learning and research. We have set forth the following objectives to be met in order to make this university a leading private university not only in the country but in the global village as well.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="relative bg-card rounded-2xl p-8 md:p-10 border border-border overflow-hidden group shadow-sm">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Transformative education that will inspire and nurture creative individuals those are ready to grab opportunities to make a difference. Advanced research that will enhance the boundary of knowledge and change the quality of life. Dedicated service as a leading university that will contribute to social, economic and national development.
                </p>
              </div>
            </div>
          </div>

          {/* Strategy & Values — Side by side */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Strategy */}
            <div className="relative bg-card rounded-2xl p-8 md:p-10 border border-border overflow-hidden group shadow-sm">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Compass className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Strategy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nurture, recruit and retain best quality people — the single most prerequisite for quality education and research. Attract the students who are academically sound and have passion, commitment, leadership potential and come from diverse backgrounds. Provide a high quality globally-oriented educational experience that develops skills and values to enable them to reach their full potential.
                </p>
              </div>
            </div>

            {/* Guiding Values */}
            <div className="relative bg-gradient-to-br from-accent/10 to-primary/5 rounded-2xl p-8 md:p-10 border border-accent/20 overflow-hidden group">
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mb-6">
                  <Heart className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Guiding Values</h3>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  PCIU has not only focused on the academic strength of its students but also on the cultural and sporting activities. Our campus is a non-political and non-smoking — an equal opportunity university.
                </p>
                <ul className="space-y-3">
                  {[
                    "Aim at excellence in higher education and research",
                    "Strive to upgrade educational standard",
                    "Be accountable for our actions and exercise responsible stewardship",
                    "Be inclusive, treat each other with dignity and respect",
                  ].map((val) => (
                    <li key={val} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      </span>
                      {val}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width Campus Banner */}
      <section className="relative h-[280px] md:h-[380px] overflow-hidden">
        <img
          src="https://portcity.edu.bd/img/pciu-mission.jpg"
          alt="PCIU Campus Life"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="container mx-auto px-4">
            <p className="text-xl md:text-3xl font-bold text-white max-w-3xl mx-auto leading-relaxed">
              PCIU is pledge-bound to ensure a <span className="text-accent">student-friendly academic environment</span> and strictly adheres to academic discipline.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUniversity;
