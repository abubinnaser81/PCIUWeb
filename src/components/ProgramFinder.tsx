import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const programs = [
  {
    title: "Computer Science & Engineering",
    degree: "B.Sc.",
    level: "Undergraduate",
    duration: "4 years",
    faculty: "Engineering & Technology",
    description: "Develop expertise in software development, AI, and cutting-edge computing technologies.",
    href: "/department/cse",
  },
  {
    title: "Civil Engineering",
    degree: "B.Sc.",
    level: "Undergraduate",
    duration: "4 years",
    faculty: "Engineering & Technology",
    description: "Design sustainable infrastructure for modern cities and coastal development.",
    href: "/department/civil",
  },
  {
    title: "Business Administration",
    degree: "BBA",
    level: "Undergraduate",
    duration: "4 years",
    faculty: "Business Studies",
    description: "Master strategic management, entrepreneurship, and global business practices.",
    href: "/department/bba",
  },
  {
    title: "English",
    degree: "BA",
    level: "Undergraduate",
    duration: "4 years",
    faculty: "Arts & Social Sciences",
    description: "Explore literature, linguistics, and professional communication skills.",
    href: "/department/english",
  },
  {
    title: "Computer Science & Engineering",
    degree: "M.Sc.",
    level: "Graduate",
    duration: "1 year",
    faculty: "Engineering & Technology",
    description: "Advanced research in machine learning, cybersecurity, and data science.",
    href: "/department/cse",
  },
  {
    title: "Business Administration",
    degree: "MBA",
    level: "Graduate",
    duration: "1-2 years",
    faculty: "Business Studies",
    description: "Executive leadership program for experienced professionals.",
    href: "/department/bba",
  },
];

const ProgramFinder = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("All Levels");
  const [facultyFilter, setFacultyFilter] = useState("All Faculties");

  const filtered = programs.filter((p) => {
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === "All Levels" || p.level === levelFilter;
    const matchesFaculty = facultyFilter === "All Faculties" || p.faculty === facultyFilter;
    return matchesSearch && matchesLevel && matchesFaculty;
  });

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/5 via-primary/10 to-secondary/5" id="academics">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-4">Find Your Program</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find a program that fits your goals from our diverse range of undergraduate and graduate offerings
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search programs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-input bg-card focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Search programs"
              />
            </div>
            <select
              className="px-4 py-3 rounded-lg border border-input bg-card focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Filter by level"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
            >
              <option>All Levels</option>
              <option>Undergraduate</option>
              <option>Graduate</option>
            </select>
            <select
              className="px-4 py-3 rounded-lg border border-input bg-card focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Filter by faculty"
              value={facultyFilter}
              onChange={(e) => setFacultyFilter(e.target.value)}
            >
              <option>All Faculties</option>
              <option>Engineering & Technology</option>
              <option>Business Studies</option>
              <option>Arts & Social Sciences</option>
              <option>Law</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((program, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-white/30 bg-white/20 backdrop-blur-md shadow-lg hover:border-accent hover:bg-white/30"
            >
              <CardContent className="p-6">
                <Badge className="bg-primary text-primary-foreground mb-3">{program.degree}</Badge>
                <h3 className="font-heading font-semibold text-xl text-primary mb-2">{program.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span>{program.duration}</span>
                  <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                  <span>{program.faculty}</span>
                </div>
                <p className="text-muted-foreground">{program.description}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button
                  variant="outline"
                  className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  onClick={() => navigate(program.href)}
                >
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No programs found matching your criteria.
          </div>
        )}

        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary-glow text-primary-foreground">
            View All Programs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgramFinder;
