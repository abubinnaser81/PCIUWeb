import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Building, Lock, GraduationCap, BookOpen, Briefcase, Users, Award, Globe, Linkedin, Facebook, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface FacultyData {
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
  email?: string | null;
  phone?: string | null;
  education: any[];
  publications: any[];
  experiences: any[];
  teaching_areas: any[];
  awards: any[];
  memberships: any[];
  conferences: any[];
  linkedin_url?: string | null;
  facebook_url?: string | null;
  twitter_url?: string | null;
  website_url?: string | null;
  researchgate_url?: string | null;
  google_scholar_url?: string | null;
}

const isUUID = (str: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

const FacultyProfile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [showFullBio, setShowFullBio] = useState(false);
  const [faculty, setFaculty] = useState<FacultyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFacultyProfile = async () => {
      if (!id) {
        setError("No faculty ID provided");
        setIsLoading(false);
        return;
      }

      const lookupById = isUUID(id);
      const decodedName = !lookupById ? decodeURIComponent(id) : null;

      setIsLoading(true);
      try {
        if (user) {
          let query = supabase.from('faculty_profiles').select('*');
          if (lookupById) {
            query = query.eq('id', id);
          } else {
            query = query.ilike('name', decodedName!);
          }
          const { data, error } = await query.maybeSingle();

          if (error) {
            if (import.meta.env.DEV) console.error('Error fetching faculty profile:', error);
            setError("Failed to load faculty profile");
          } else if (!data) {
            setError("Faculty member not found");
          } else {
            setFaculty(data as FacultyData);
          }
        } else {
          const { data, error } = await supabase.rpc('get_public_faculty_profiles');
          
          if (error) {
            if (import.meta.env.DEV) console.error('Error fetching faculty profiles:', error);
            setError("Failed to load faculty profile");
          } else {
            const foundFaculty = lookupById
              ? data?.find((f: any) => f.id === id)
              : data?.find((f: any) => f.name.toLowerCase() === decodedName?.toLowerCase());
            if (foundFaculty) {
              setFaculty(foundFaculty as FacultyData);
            } else {
              setError("Faculty member not found");
            }
          }
        }
      } catch (err) {
        if (import.meta.env.DEV) console.error('Error:', err);
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFacultyProfile();
  }, [id, user]);

  // Helper functions for array data
  const getEducation = (): { degree: string; institution: string; year: string }[] => {
    if (!faculty?.education || !Array.isArray(faculty.education)) return [];
    return faculty.education.map((edu: any) => {
      if (typeof edu === 'string') {
        return { degree: edu, institution: '', year: '' };
      }
      return {
        degree: edu.degree || '',
        institution: edu.institution || '',
        year: edu.year || ''
      };
    }).filter(e => e.degree);
  };

  const getTeachingAreas = (): string[] => {
    if (!faculty?.teaching_areas || !Array.isArray(faculty.teaching_areas)) return [];
    return faculty.teaching_areas.map((area: any) => 
      typeof area === 'string' ? area : area?.area || ''
    ).filter(Boolean);
  };

  const getAwards = (): { title: string; year: string; description: string }[] => {
    if (!faculty?.awards || !Array.isArray(faculty.awards)) return [];
    return faculty.awards.map((award: any) => {
      if (typeof award === 'string') {
        return { title: award, year: '', description: '' };
      }
      return {
        title: award.title || award.name || '',
        year: award.year || '',
        description: award.description || ''
      };
    }).filter(a => a.title);
  };

  const getMemberships = (): { name: string; role: string }[] => {
    if (!faculty?.memberships || !Array.isArray(faculty.memberships)) return [];
    return faculty.memberships.map((membership: any) => {
      if (typeof membership === 'string') {
        return { name: membership, role: '' };
      }
      return {
        name: membership.name || membership.organization || '',
        role: membership.role || ''
      };
    }).filter(m => m.name);
  };

  const getConferences = (): { title: string; venue: string; year: string }[] => {
    if (!faculty?.conferences || !Array.isArray(faculty.conferences)) return [];
    return faculty.conferences.map((conf: any) => {
      if (typeof conf === 'string') {
        return { title: conf, venue: '', year: '' };
      }
      return {
        title: conf.title || conf.name || '',
        venue: conf.venue || conf.location || '',
        year: conf.year || ''
      };
    }).filter(c => c.title);
  };

  const getExperiences = (): { title: string; organization: string; period: string }[] => {
    if (!faculty?.experiences || !Array.isArray(faculty.experiences)) return [];
    return faculty.experiences.map((exp: any) => {
      if (typeof exp === 'string') {
        return { title: exp, organization: '', period: '' };
      }
      return {
        title: exp.title || exp.position || '',
        organization: exp.organization || exp.company || '',
        period: exp.period || (exp.from && exp.to ? `${exp.from} - ${exp.to}` : exp.year || '')
      };
    }).filter(e => e.title || e.organization);
  };

  const getPublications = (): { title: string; journal: string; year: string; type: string }[] => {
    if (!faculty?.publications || !Array.isArray(faculty.publications)) return [];
    return faculty.publications.map((pub: any) => {
      if (typeof pub === 'string') {
        return { title: pub, journal: '', year: '', type: 'Journal' };
      }
      return {
        title: pub.title || '',
        journal: pub.journal || pub.publisher || pub.venue || '',
        year: pub.year || '',
        type: pub.type || 'Journal'
      };
    }).filter(p => p.title);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8">
          <div className="container mx-auto px-4">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <Skeleton className="w-full aspect-square rounded-lg mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-2">
                <Skeleton className="h-12 w-full mb-6" />
                <Card>
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-1/3 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !faculty) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Faculty Not Found</h1>
            <p className="text-muted-foreground mb-8">{error || "The faculty member you're looking for doesn't exist."}</p>
            <Link to="/faculty">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Faculty List
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const bio = faculty.bio || "";
  const truncatedBio = bio.length > 300 ? bio.slice(0, 300) + "..." : bio;
  const education = getEducation();
  const teachingAreas = getTeachingAreas();
  const awards = getAwards();
  const memberships = getMemberships();
  const conferences = getConferences();
  const experiences = getExperiences();
  const publications = getPublications();

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main id="main-content">
        {/* Breadcrumb */}
        <div className="bg-primary py-4">
          <div className="container mx-auto px-4">
            <Link to="/faculty" className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Faculty List
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Profile Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 overflow-hidden">
                {/* Profile Image */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6">
                  <div className="relative w-full max-w-[200px] mx-auto aspect-square rounded-lg overflow-hidden border-4 border-background shadow-lg">
                    <img
                      src={faculty.image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"}
                      alt={faculty.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <CardContent className="p-6">
                  {/* Name & Designation */}
                  <div className="text-center mb-6">
                    <h1 className="font-heading font-bold text-xl text-foreground mb-1">
                      {faculty.name || "Faculty Member"}
                    </h1>
                    <p className="text-sm font-medium text-primary mb-1">{faculty.designation || "Faculty"}</p>
                    <p className="text-xs text-muted-foreground">{faculty.department || "Department"}</p>
                  </div>

                  <Separator className="my-4" />

                  {/* Contact Info */}
                  <div className="space-y-3">
                    {/* Office/Building */}
                    {faculty.office && (
                      <div className="flex items-start gap-3">
                        <Building className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Building/Room</p>
                          <p className="text-sm text-foreground">{faculty.office}</p>
                        </div>
                      </div>
                    )}

                    {/* Email */}
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        {user && faculty.email ? (
                          <a href={`mailto:${faculty.email}`} className="text-sm text-foreground hover:text-primary transition-colors break-all">
                            {faculty.email}
                          </a>
                        ) : (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Lock className="w-3 h-3" />
                            <span>Login to view</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        {user && faculty.phone ? (
                          <a href={`tel:${faculty.phone}`} className="text-sm text-foreground hover:text-primary transition-colors">
                            {faculty.phone}
                          </a>
                        ) : (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Lock className="w-3 h-3" />
                            <span>Login to view</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Faculty */}
                    {faculty.faculty && (
                      <div className="flex items-start gap-3">
                        <GraduationCap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Faculty</p>
                          <p className="text-sm text-foreground">{faculty.faculty}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Login prompt for unauthenticated users */}
                  {!user && (
                    <>
                      <Separator className="my-4" />
                      <div className="bg-muted/50 rounded-lg p-3 text-center">
                        <p className="text-xs text-muted-foreground mb-2">
                          <Lock className="w-3 h-3 inline mr-1" />
                          Contact info hidden for privacy
                        </p>
                        <Link to="/faculty-auth">
                          <Button size="sm" variant="outline" className="text-xs">
                            Login to View
                          </Button>
                        </Link>
                      </div>
                    </>
                  )}

                  {/* Social & Academic Links */}
                  {(faculty.linkedin_url || faculty.facebook_url || faculty.twitter_url || faculty.website_url || faculty.researchgate_url || faculty.google_scholar_url) && (
                    <>
                      <Separator className="my-4" />
                      <div>
                        <h3 className="text-xs font-semibold text-muted-foreground mb-3">
                          Academic & Social Profiles
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {faculty.google_scholar_url && (
                            <a href={faculty.google_scholar_url} target="_blank" rel="noopener noreferrer" title="Google Scholar">
                              <Button variant="outline" size="icon" className="h-9 w-9">
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-label="Google Scholar">
                                  <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z"/>
                                </svg>
                              </Button>
                            </a>
                          )}
                          {faculty.researchgate_url && (
                            <a href={faculty.researchgate_url} target="_blank" rel="noopener noreferrer" title="ResearchGate">
                              <Button variant="outline" size="icon" className="h-9 w-9">
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-label="ResearchGate">
                                  <path d="M19.586 0c-1.644 0-2.904.573-3.849 1.742-.946 1.17-1.399 2.627-1.399 4.373 0 1.603.421 2.953 1.265 4.052.843 1.098 2.012 1.647 3.506 1.647.62 0 1.178-.092 1.674-.278v-.046c-.205.088-.47.132-.793.132-.774 0-1.387-.348-1.84-1.044-.453-.697-.68-1.614-.68-2.752h3.633v-.955h-3.587c.023-.97.183-1.765.48-2.383.296-.619.772-.928 1.424-.928.375 0 .695.089.957.267v-.933a3.8 3.8 0 00-1.159-.173c-.928 0-1.699.353-2.31 1.06-.613.706-.919 1.69-.919 2.953 0 1.214.316 2.23.949 3.047.632.818 1.467 1.226 2.505 1.226.755 0 1.396-.21 1.924-.632l.137.501h1.488V2.94c0-.84-.292-1.537-.876-2.094C21.09.29 20.394 0 19.586 0zM4.178 8.149c-1.207 0-2.186.503-2.938 1.509C.488 10.663.112 11.93.112 13.456c0 1.55.384 2.826 1.152 3.826.769 1 1.764 1.5 2.985 1.5 1.157 0 2.098-.46 2.822-1.381.724-.92 1.086-2.133 1.086-3.638 0-1.567-.358-2.863-1.074-3.887-.716-1.024-1.662-1.727-2.905-1.727z"/>
                                </svg>
                              </Button>
                            </a>
                          )}
                          {faculty.linkedin_url && (
                            <a href={faculty.linkedin_url} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                              <Button variant="outline" size="icon" className="h-9 w-9">
                                <Linkedin className="w-4 h-4" />
                              </Button>
                            </a>
                          )}
                          {faculty.facebook_url && (
                            <a href={faculty.facebook_url} target="_blank" rel="noopener noreferrer" title="Facebook">
                              <Button variant="outline" size="icon" className="h-9 w-9">
                                <Facebook className="w-4 h-4" />
                              </Button>
                            </a>
                          )}
                          {faculty.twitter_url && (
                            <a href={faculty.twitter_url} target="_blank" rel="noopener noreferrer" title="X (Twitter)">
                              <Button variant="outline" size="icon" className="h-9 w-9">
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-label="X">
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                              </Button>
                            </a>
                          )}
                          {faculty.website_url && (
                            <a href={faculty.website_url} target="_blank" rel="noopener noreferrer" title="Personal Website">
                              <Button variant="outline" size="icon" className="h-9 w-9">
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </a>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Research Interests */}
                  {teachingAreas.length > 0 && (
                    <>
                      <Separator className="my-4" />
                      <div>
                        <h3 className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                          <Globe className="w-3 h-3" />
                          Research Interest
                        </h3>
                        <div className="flex flex-wrap gap-1">
                          {teachingAreas.slice(0, 5).map((area, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                          {teachingAreas.length > 5 && (
                            <Badge variant="outline" className="text-xs">
                              +{teachingAreas.length - 5} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Bio/About - Short version */}
                  {bio && (
                    <>
                      <Separator className="my-4" />
                      <div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {showFullBio ? bio : truncatedBio}
                        </p>
                        {bio.length > 300 && (
                          <Button
                            variant="link"
                            className="mt-1 p-0 h-auto text-xs text-primary"
                            onClick={() => setShowFullBio(!showFullBio)}
                          >
                            {showFullBio ? "Read Less" : "Read More"}
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Content - Tabs */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="education" className="w-full">
                <TabsList className="w-full flex-wrap h-auto p-1 bg-background border mb-6">
                  <TabsTrigger value="education" className="flex-1 min-w-[100px] text-xs sm:text-sm">
                    <GraduationCap className="w-4 h-4 mr-1 hidden sm:inline" />
                    Education
                  </TabsTrigger>
                  <TabsTrigger value="publications" className="flex-1 min-w-[100px] text-xs sm:text-sm">
                    <BookOpen className="w-4 h-4 mr-1 hidden sm:inline" />
                    Publications
                  </TabsTrigger>
                  <TabsTrigger value="experiences" className="flex-1 min-w-[100px] text-xs sm:text-sm">
                    <Briefcase className="w-4 h-4 mr-1 hidden sm:inline" />
                    Experiences
                  </TabsTrigger>
                  <TabsTrigger value="memberships" className="flex-1 min-w-[100px] text-xs sm:text-sm">
                    <Users className="w-4 h-4 mr-1 hidden sm:inline" />
                    Membership
                  </TabsTrigger>
                  <TabsTrigger value="awards" className="flex-1 min-w-[100px] text-xs sm:text-sm">
                    <Award className="w-4 h-4 mr-1 hidden sm:inline" />
                    Awards
                  </TabsTrigger>
                  <TabsTrigger value="conferences" className="flex-1 min-w-[100px] text-xs sm:text-sm">
                    <Globe className="w-4 h-4 mr-1 hidden sm:inline" />
                    Conferences
                  </TabsTrigger>
                </TabsList>

                {/* Education Tab */}
                <TabsContent value="education" className="animate-fade-in">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        Educational Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {education.length > 0 ? (
                        <div className="space-y-4">
                          {education.map((edu, index) => (
                            <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium text-foreground">{edu.degree}</h4>
                                {edu.institution && (
                                  <p className="text-sm text-muted-foreground">{edu.institution}</p>
                                )}
                                {edu.year && (
                                  <p className="text-xs text-muted-foreground mt-1">{edu.year}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-center py-8">No education information available.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Publications Tab */}
                <TabsContent value="publications" className="animate-fade-in">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        Publications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {publications.length > 0 ? (
                        <div className="space-y-4">
                          {publications.map((pub, index) => (
                            <div key={index} className="p-4 bg-muted/50 rounded-lg">
                              <h4 className="font-medium text-foreground mb-1">{pub.title}</h4>
                              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                                {pub.journal && <span>{pub.journal}</span>}
                                {pub.year && (
                                  <Badge variant="outline" className="text-xs">
                                    {pub.year}
                                  </Badge>
                                )}
                                {pub.type && (
                                  <Badge variant="secondary" className="text-xs">
                                    {pub.type}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-center py-8">No publications available.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Experiences Tab */}
                <TabsContent value="experiences" className="animate-fade-in">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-primary" />
                        Experiences
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {experiences.length > 0 ? (
                        <div className="space-y-4">
                          {experiences.map((exp, index) => (
                            <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                              <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium text-foreground">{exp.title}</h4>
                                {exp.organization && (
                                  <p className="text-sm text-muted-foreground">{exp.organization}</p>
                                )}
                                {exp.period && (
                                  <p className="text-xs text-muted-foreground mt-1">{exp.period}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-center py-8">No experience information available.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Memberships Tab */}
                <TabsContent value="memberships" className="animate-fade-in">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        Membership
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {memberships.length > 0 ? (
                        <div className="space-y-3">
                          {memberships.map((membership, index) => (
                            <div key={index} className="flex items-start gap-4 pb-3 border-b last:border-b-0 last:pb-0">
                              <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium text-foreground">{membership.name}</h4>
                                {membership.role && (
                                  <p className="text-sm text-muted-foreground">{membership.role}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-center py-8">No membership information available.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Awards Tab */}
                <TabsContent value="awards" className="animate-fade-in">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Award className="w-5 h-5 text-primary" />
                        Awards & Recognition
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {awards.length > 0 ? (
                        <div className="space-y-4">
                          {awards.map((award, index) => (
                            <div key={index} className="p-4 bg-accent/20 rounded-lg border border-accent/30">
                              <div className="flex items-start gap-3">
                                <Award className="w-5 h-5 text-accent-foreground mt-0.5 flex-shrink-0" />
                                <div>
                                  <h4 className="font-medium text-foreground">{award.title}</h4>
                                  {award.year && (
                                    <p className="text-xs text-muted-foreground mt-1">{award.year}</p>
                                  )}
                                  {award.description && (
                                    <p className="text-sm text-muted-foreground mt-2">{award.description}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-center py-8">No awards information available.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Conferences Tab */}
                <TabsContent value="conferences" className="animate-fade-in">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Globe className="w-5 h-5 text-primary" />
                        Conferences & Participations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {conferences.length > 0 ? (
                        <div className="space-y-4">
                          {conferences.map((conf, index) => (
                            <div key={index} className="p-4 bg-muted/50 rounded-lg">
                              <h4 className="font-medium text-foreground mb-1">{conf.title}</h4>
                              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                                {conf.venue && <span>{conf.venue}</span>}
                                {conf.year && (
                                  <Badge variant="outline" className="text-xs">
                                    {conf.year}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-center py-8">No conference participations available.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FacultyProfile;
