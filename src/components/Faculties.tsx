import { GraduationCap, Building2, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import engineeringBg from "@/assets/faculty-engineering-bg.jpg";
import businessBg from "@/assets/faculty-business-bg.jpg";
import humanitiesBg from "@/assets/faculty-humanities-bg.jpg";

const faculties = [
  {
    id: "engineering",
    icon: GraduationCap,
    name: "Faculty of Science & Engineering",
    description: "Cutting-edge engineering programs preparing innovators for tomorrow's challenges.",
    departments: ["Computer Science", "Civil Engineering", "Electrical & Electronic", "Textile Engineering", "Fashion Design"],
    bg: engineeringBg,
  },
  {
    id: "business",
    icon: Building2,
    name: "Faculty of Business Studies",
    description: "Developing ethical leaders for the global marketplace.",
    departments: ["Business Administration"],
    bg: businessBg,
  },
  {
    id: "humanities",
    icon: BookOpen,
    name: "Faculty of Humanities, Social Science & Law",
    description: "Fostering critical thinking and cultural understanding.",
    departments: ["English", "Journalism & Media Studies", "Law"],
    bg: humanitiesBg,
  },
];

const Faculties = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5" id="faculties">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-4">
            Our Faculties
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore academic excellence across diverse disciplines
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {faculties.map((faculty, index) => {
            const Icon = faculty.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border border-white/20 shadow-lg hover:border-secondary overflow-hidden relative flex flex-col"
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${faculty.bg})` }}
                />
                {/* Light overlay for text readability */}
                <div className="absolute inset-0 bg-white/40 group-hover:bg-white/30 transition-all duration-300" />

                <CardContent className="p-5 relative z-10 flex flex-col flex-1">
                  <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-primary mb-2">
                    {faculty.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">{faculty.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {faculty.departments.map((dept, deptIndex) => (
                      <span
                        key={deptIndex}
                        className="text-[11px] bg-secondary-light text-secondary px-2 py-0.5 rounded-full"
                      >
                        {dept}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <Link to={`/faculties?faculty=${faculty.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                      >
                        Explore Faculty
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faculties;
