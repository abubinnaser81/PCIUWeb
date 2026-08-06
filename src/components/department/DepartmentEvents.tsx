import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Image, Users, Presentation, ExternalLink } from "lucide-react";

interface EventItem {
  title: string;
  date: string;
  description?: string;
  image?: string;
  venue?: string;
}

interface DepartmentEventsProps {
  departmentName: string;
  gallery?: { image: string; caption: string }[];
  seminars?: EventItem[];
  workshops?: EventItem[];
  conferences?: EventItem[];
}

const DepartmentEvents = ({
  departmentName,
  gallery = [],
  seminars = [],
  workshops = [],
  conferences = [],
}: DepartmentEventsProps) => {
  // Default sample data if none provided
  const defaultGallery = gallery.length > 0 ? gallery : [
    { image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=300&fit=crop", caption: "Annual Department Day Celebration" },
    { image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop", caption: "Student Project Exhibition" },
    { image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop", caption: "Guest Lecture Session" },
    { image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop", caption: "Classroom Activities" },
    { image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop", caption: "Group Discussion" },
    { image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop", caption: "Study Tour" },
  ];

  const defaultSeminars = seminars.length > 0 ? seminars : [
    {
      title: "Recent Advances in " + departmentName,
      date: "2025-01-20",
      description: "An insightful seminar exploring the latest developments and future trends in the field.",
      venue: "Seminar Hall, PCIU Main Campus"
    },
    {
      title: "Industry Expert Talk Series",
      date: "2025-01-15",
      description: "Industry leaders share their experiences and insights with students.",
      venue: "Auditorium, PCIU"
    },
    {
      title: "Research Methodology Workshop",
      date: "2025-01-10",
      description: "A comprehensive session on research methods and academic writing.",
      venue: "Conference Room 101"
    },
  ];

  const defaultWorkshops = workshops.length > 0 ? workshops : [
    {
      title: "Practical Skills Development Workshop",
      date: "2025-02-05",
      description: "Hands-on training session focusing on practical skills essential for the industry.",
      venue: "Lab Complex, PCIU"
    },
    {
      title: "Software Tools Training",
      date: "2025-01-25",
      description: "Training on industry-standard software and tools used in the profession.",
      venue: "Computer Lab 1"
    },
    {
      title: "Career Development Workshop",
      date: "2025-01-18",
      description: "Resume building, interview skills, and career guidance session.",
      venue: "Seminar Hall"
    },
  ];

  const defaultConferences = conferences.length > 0 ? conferences : [
    {
      title: "National Conference on " + departmentName + " 2025",
      date: "2025-03-15",
      description: "Annual national conference bringing together researchers, academics, and industry professionals.",
      venue: "PCIU Convention Center"
    },
    {
      title: "International Symposium on Innovation",
      date: "2025-02-20",
      description: "A platform for sharing cutting-edge research and fostering international collaboration.",
      venue: "Grand Auditorium, PCIU"
    },
  ];

  return (
    <section className="mt-10">
      <h2 className="font-heading text-2xl font-bold text-foreground mb-4 pb-2 border-b-4 border-accent inline-block">
        EVENTS & ACTIVITIES
      </h2>
      
      <Tabs defaultValue="gallery" className="w-full mt-6">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="gallery" className="flex items-center gap-1">
            <Image className="w-4 h-4" />
            <span className="hidden sm:inline">Gallery</span>
          </TabsTrigger>
          <TabsTrigger value="seminars" className="flex items-center gap-1">
            <Presentation className="w-4 h-4" />
            <span className="hidden sm:inline">Seminars</span>
          </TabsTrigger>
          <TabsTrigger value="workshops" className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Workshops</span>
          </TabsTrigger>
          <TabsTrigger value="conferences" className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Conferences</span>
          </TabsTrigger>
        </TabsList>

        {/* Gallery Tab */}
        <TabsContent value="gallery">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {defaultGallery.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-md">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white text-sm p-3">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-4">
            View All Photos <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </TabsContent>

        {/* Seminars Tab */}
        <TabsContent value="seminars">
          <div className="space-y-4">
            {defaultSeminars.map((seminar, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-heading flex items-center gap-2">
                      <Presentation className="w-5 h-5 text-accent" />
                      {seminar.title}
                    </CardTitle>
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                      {seminar.date}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-2">{seminar.description}</p>
                  {seminar.venue && (
                    <p className="text-xs text-accent">📍 {seminar.venue}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="outline" className="mt-4">
            View All Seminars <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </TabsContent>

        {/* Workshops Tab */}
        <TabsContent value="workshops">
          <div className="space-y-4">
            {defaultWorkshops.map((workshop, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-heading flex items-center gap-2">
                      <Users className="w-5 h-5 text-accent" />
                      {workshop.title}
                    </CardTitle>
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                      {workshop.date}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-2">{workshop.description}</p>
                  {workshop.venue && (
                    <p className="text-xs text-accent">📍 {workshop.venue}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="outline" className="mt-4">
            View All Workshops <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </TabsContent>

        {/* Conferences Tab */}
        <TabsContent value="conferences">
          <div className="space-y-4">
            {defaultConferences.map((conference, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-accent">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-heading flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-accent" />
                      {conference.title}
                    </CardTitle>
                    <span className="text-sm text-muted-foreground bg-accent/10 text-accent px-2 py-1 rounded font-medium">
                      {conference.date}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-2">{conference.description}</p>
                  {conference.venue && (
                    <p className="text-xs text-accent">📍 {conference.venue}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="outline" className="mt-4">
            View All Conferences <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default DepartmentEvents;
