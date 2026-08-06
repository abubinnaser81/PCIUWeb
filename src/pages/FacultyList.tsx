import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, GraduationCap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface FacultyProfile {
  id: string;
  user_id: string;
  name: string;
  title: string | null;
  designation: string | null;
  faculty: string | null;
  department: string | null;
  bio: string | null;
  image_url: string | null;
  office: string | null;
  education: unknown;
  publications: unknown;
  experiences: unknown;
  teaching_areas: unknown;
  awards: unknown;
  memberships: unknown;
  conferences: unknown;
}

const FacultyList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [facultyProfiles, setFacultyProfiles] = useState<FacultyProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  // Initialize filters from URL query params
  useEffect(() => {
    const deptParam = searchParams.get('department');
    if (deptParam) {
      setSelectedDepartment(deptParam);
    }
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchFacultyProfiles = async () => {
      setIsLoading(true);
      try {
        // Use the secure function that excludes email/phone for public access
        const { data, error } = await supabase.rpc('get_public_faculty_profiles');
        
        if (error) {
          if (import.meta.env.DEV) console.error('Error fetching faculty profiles:', error);
        } else {
          setFacultyProfiles(data || []);
        }
      } catch (err) {
        if (import.meta.env.DEV) console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFacultyProfiles();
  }, []);

  const uniqueFaculties = Array.from(new Set(facultyProfiles.map((f) => f.faculty).filter(Boolean))) as string[];
  const uniqueDepartments = Array.from(
    new Set(
      facultyProfiles
        .filter((f) => selectedFaculty === "all" || f.faculty === selectedFaculty)
        .map((f) => f.department)
        .filter(Boolean)
    )
  ) as string[];

  const filteredFaculties = facultyProfiles.filter((faculty) => {
    const teachingAreas = Array.isArray(faculty.teaching_areas) ? faculty.teaching_areas : [];
    const matchesSearch =
      faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (faculty.department?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      teachingAreas.some((area: any) => 
        (typeof area === 'string' ? area : area?.area || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesFaculty = selectedFaculty === "all" || faculty.faculty === selectedFaculty;
    const matchesDepartment = selectedDepartment === "all" || faculty.department === selectedDepartment;
    return matchesSearch && matchesFaculty && matchesDepartment;
  });

  const getTeachingAreas = (areas: unknown): string[] => {
    if (!areas || !Array.isArray(areas)) return [];
    return areas.slice(0, 3).map((area: any) => 
      typeof area === 'string' ? area : area?.area || ''
    ).filter(Boolean);
  };

  const getLatestEducation = (education: unknown): string => {
    if (!education || !Array.isArray(education) || education.length === 0) return '';
    const latest = education[0];
    return typeof latest === 'string' ? latest : `${latest?.degree || ''} ${latest?.institution ? 'from ' + latest.institution : ''}`.trim();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto animate-fade-in">
              <GraduationCap className="w-16 h-16 mx-auto mb-6" />
              <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">Our Faculty</h1>
              <p className="text-lg md:text-xl text-white/90">
                Meet our distinguished faculty members who are committed to academic excellence and student
                success.
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-muted/30 sticky top-16 z-10 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name, department, or expertise..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Faculty Filter */}
              <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
                <SelectTrigger>
                  <SelectValue placeholder="All Faculties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Faculties</SelectItem>
                  {uniqueFaculties.map((faculty) => (
                    <SelectItem key={faculty} value={faculty}>
                      {faculty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Department Filter */}
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {uniqueDepartments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              {isLoading ? (
                <Skeleton className="h-4 w-48" />
              ) : (
                <>Showing {filteredFaculties.length} faculty member{filteredFaculties.length !== 1 ? "s" : ""}</>
              )}
            </div>
          </div>
        </section>

        {/* Faculty Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardContent className="p-0">
                      <Skeleton className="h-64 w-full" />
                      <div className="p-6 space-y-3">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-2/3" />
                        <div className="flex gap-2">
                          <Skeleton className="h-6 w-20" />
                          <Skeleton className="h-6 w-20" />
                        </div>
                        <Skeleton className="h-10 w-full mt-4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredFaculties.map((faculty) => (
                  <Card
                    key={faculty.id}
                    className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary overflow-hidden"
                  >
                    <CardContent className="p-0">
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden bg-gradient-accent">
                        <img
                          src={faculty.image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"}
                          alt={faculty.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-heading font-bold text-xl text-primary mb-1">{faculty.name}</h3>
                        <p className="text-sm font-medium text-secondary mb-1">{faculty.designation || 'Faculty Member'}</p>
                        <p className="text-sm text-muted-foreground mb-3">{faculty.department || 'Department'}</p>

                        {/* Qualification */}
                        {Array.isArray(faculty.education) && faculty.education.length > 0 && (
                          <div className="mb-4 text-sm text-muted-foreground">
                            <p>{getLatestEducation(faculty.education)}</p>
                          </div>
                        )}

                        {/* Teaching Areas / Specialization */}
                        {Array.isArray(faculty.teaching_areas) && faculty.teaching_areas.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {getTeachingAreas(faculty.teaching_areas).map((area, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* View Profile Button - contact info only visible after login on profile page */}
                        <Link to={`/faculty/${faculty.id}`}>
                          <Button variant="outline" className="w-full mt-4 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!isLoading && filteredFaculties.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-4">No faculty members found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedFaculty("all");
                    setSelectedDepartment("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FacultyList;
