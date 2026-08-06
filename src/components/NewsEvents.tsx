import { useState } from "react";
import { Calendar, MapPin, ArrowRight, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const allNews = [
  {
    title: "মহান স্বাধীনতা দিবসে বীর শহিদদের প্রতি গভীর শ্রদ্ধাঞ্জলি",
    category: "Event",
    date: "2026-03-26",
    excerpt: "মহান স্বাধীনতা দিবসে বীর শহিদদের প্রতি গভীর শ্রদ্ধাঞ্জলি",
    image: "https://portcity.edu.bd/img/_%E0%A6%AE%E0%A6%B9%E0%A6%BE%E0%A6%A8%20%E0%A6%B8%E0%A7%8D%E0%A6%AC%E0%A6%BE%E0%A6%A7%E0%A7%80%E0%A6%A8%E0%A6%A4%E0%A6%BE%20%E0%A6%A6%E0%A6%BF%E0%A6%AC%E0%A6%B8-%202026.png",
    link: "https://portcity.edu.bd/HomePage/SubPageDetailsPara/9468/Event",
  },
  {
    title: "পবিত্র ঈদুল ফিতরের শুভেচ্ছা",
    category: "Greetings",
    date: "2026-03-19",
    excerpt: "পবিত্র ঈদুল ফিতরের শুভেচ্ছা",
    image: "https://portcity.edu.bd/img/_%E0%A6%AA%E0%A6%AC%E0%A6%BF%E0%A6%A4%E0%A7%8D%E0%A6%B0%20%E0%A6%88%E0%A6%A6%E0%A7%81%E0%A6%B2%20%E0%A6%AB%E0%A6%BF%E0%A6%A4%E0%A6%B0%E0%A7%87%E0%A6%B0%20%E0%A6%B6%E0%A7%81%E0%A6%AD%E0%A7%87%E0%A6%9A%E0%A7%8D%E0%A6%9B%E0%A6%BE.jpeg",
    link: "https://portcity.edu.bd/HomePage/SubPageDetailsPara/9467/Event",
  },
  {
    title: "মহান শহিদ দিবস ও আন্তর্জাতিক মাতৃভাষা দিবস ২০২৬",
    category: "Event",
    date: "2026-02-21",
    excerpt: "মহান শহিদ দিবস ও আন্তর্জাতিক মাতৃভাষা দিবস ২০২৬ উপলক্ষে ১৯৫২ সালের ভাষা আন্দোলনে শহিদদের প্রতি মাননীয় উপাচার্য অধ্যাপক ড. মোহাম্মদ তৈয়ব চৌধুরী স্যারের নেতৃত্বে গভীর শ্রদ্ধাঞ্জলি নিবেদন করেছে পোর্ট সিটি ইন্টারন্যাশনাল ইউনিভার্সিটি।",
    image: "https://portcity.edu.bd/img/_21-feb-26-01.jpg",
    link: "https://portcity.edu.bd/HomePage/SubPageDetailsPara/9466/Event",
  },
  {
    title: "বিএনপি চেয়ারপারসন ও সাবেক প্রধানমন্ত্রী বেগম খালেদা জিয়ার মৃত্যুতে আমরা গভীরভাবে শোকাহত",
    category: "Condolence",
    date: "2025-12-30",
    excerpt: "বিএনপি চেয়ারপারসন ও সাবেক প্রধানমন্ত্রী বেগম খালেদা জিয়ার মৃত্যুতে আমরা গভীরভাবে শোকাহত।",
    image: "https://portcity.edu.bd/img/_former%20Prime%20Minister%20and%20BNP%20Chairperson%20Begum%20Khaleda%20Zia-0.png",
    link: "https://portcity.edu.bd/HomePage/SubPageDetailsPara/9465/Event",
  },
  {
    title: "বিশ্ববিদ্যালয়ের কর্মচারীদের মাঝে শীতবস্ত্র বাবদ নগদ অর্থ প্রদান",
    category: "News",
    date: "2025-12-16",
    excerpt: "মহান বিজয় দিবস উপলক্ষে পোর্ট সিটি ইন্টারন্যাশনাল ইউনিভার্সিটির মাননীয় উপাচার্য প্রফেসর ড. মোহাম্মদ তৈয়ব চৌধুরী অত্র বিশ্ববিদ্যালয়ের তৃতীয় ও চতুর্থ শ্রেণির কর্মচারীদের মাঝে শীতবস্ত্র বাবদ নগদ অর্থ প্রদান করেন।",
    image: "https://portcity.edu.bd/img/_cash%20assistance%20andwinter%20clothing%20distribution-5.JPG",
    link: "https://portcity.edu.bd/HomePage/SubPageDetailsPara/9464/Event",
  },
  {
    title: "মহান বিজয় দিবসে বীর শহিদদের প্রতি গভীর শ্রদ্ধাঞ্জলি",
    category: "Event",
    date: "2025-12-16",
    excerpt: "মহান বিজয় দিবসে পোর্ট সিটি ইন্টারন্যাশনাল ইউনিভার্সিটির মাননীয় ভারপ্রাপ্ত উপাচার্য (ট্রেজারার) প্রফেসর ড. মোহাম্মদ আলী চৌধুরী এর নেতৃত্বে বীর শহিদদের প্রতি গভীর শ্রদ্ধাঞ্জলি।",
    image: "https://portcity.edu.bd/img/_16th-dec-2025-1.jpg",
    link: "https://portcity.edu.bd/HomePage/SubPageDetailsPara/9463/Event",
  },
  {
    title: "Journalism Fest 6.0",
    category: "Event",
    date: "2025-12-15",
    excerpt: "Journalism Fest 6.0, where ideas spark, voices rise, and future journalists shape tomorrow's media landscape. Truly an inspiring experience.",
    image: "https://portcity.edu.bd/img/journalism-fest-6-0-where-ideas-spark-voices-rise-and-future-journalists-shape-tomorrow-s-media-landscape_jrnfest2025.jpg",
    link: "https://portcity.edu.bd/HomePage/SubPageDetailsPara/9461/Event",
  },
  {
    title: "Journalism Faculties join Facilitator Development Workshop",
    category: "Workshop",
    date: "2025-11-11",
    excerpt: "Dilruba Akter, Head & Assistant Professor, and Taslima Akter Erin, Lecturer, participated in a 5-days Facilitator Development Workshop under the Youth Connect: Digital Citizenship and Misinformation Resilience Project.",
    image: "https://portcity.edu.bd/img/journalism_%F0%9D%90%83%F0%9D%90%9E%F0%9D%90%AF%F0%9D%90%9E%F0%9D%90%A5%F0%9D%90%A8%F0%9D%90%A9%F0%9D%90%A6%F0%9D%90%9E%F0%9D%90%A7%F0%9D%90%AD%20%F0%9D%90%96%F0%9D%90%A8%F0%9D%90%AB%F0%9D%90%A4%F0%9D%90%AC%F0%9D%90%A1%F0%9D%90%A8%F0%9D%90%A9%20of%20JRN.jpg",
    link: "https://portcity.edu.bd/HomePage/SubPageDetailsPara/9460/Event",
  },
  {
    title: "MoU Signing Ceremony Between PCIU Journalism and YPSA",
    category: "Partnership",
    date: "2025-10-08",
    excerpt: "The Department of Journalism and Media Studies at Port City International University signed a Memorandum of Understanding (MoU) with Young Power in Social Action (YPSA).",
    image: "https://portcity.edu.bd/img/mou-signing-ceremony-between-pciu-journalism-and-ypsa_MoUSigningCeremony.jpg",
    link: "https://portcity.edu.bd/HomePage/SubPageDetailsPara/9459/Event",
  },
  {
    title: "The 61st Trust Meeting of Port City International University",
    category: "Meeting",
    date: "2025-09-06",
    excerpt: "The 61st Trust Meeting of Port City International University was held on September 06, 2025, under the chairmanship of Prof. Dr. M. Majibur Rahman, Hon'ble Chairman of the PCIU Trust.",
    image: "https://portcity.edu.bd/img/the-61st-trust-meeting-of-port-city-international-university-was-held-on-september-06-2025_BoTMeeting61st08092025.jpg",
    link: "https://portcity.edu.bd/HomePage/SubPageDetailsPara/9458/Event",
  },
  {
    title: "Journalism Students Visited Channel 24 Chattogram",
    category: "Academic",
    date: "2025-09-04",
    excerpt: "Students from the Department of Journalism and Media Studies, accompanied by their faculty members, visited the Channel 24 Chattogram Center as part of their academic program.",
    image: "https://portcity.edu.bd/img/students-from-the-department-of-journalism-and-media-studies-at-port-city-international-university-accompanied-by-their-faculty-members-visited-the-channel-24-chattogram_jrnvisit04092025.jpg",
    link: "https://portcity.edu.bd/HomePage/SubPageDetailsPara/9457/Event",
  },
  {
    title: "Tragic Loss of Lives in Uttara Aircraft Crash",
    category: "Condolence",
    date: "2025-07-21",
    excerpt: "We are deeply saddened by the tragic loss of lives resulting from the Air Force training aircraft crash at the Milestone School building in Uttara.",
    image: "https://portcity.edu.bd/img/we-are-deeply-saddened-by-the-tragic-loss-of-lives-resulting-from-the-air-force-training-aircraft-crash-at-the-milestone-school-building-in-uttara_Untitled%20design(3).png",
    link: "https://portcity.edu.bd/HomePage/SubPageDetailsPara/9456/Event",
  },
];

// Sort by date descending (newest first)
const sortedNews = [...allNews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const ITEMS_PER_PAGE = 6;

const events = [
  {
    title: "Admission Test — Spring 2026",
    date: "Apr 15, 2026",
    time: "10:00 AM",
    venue: "Main Campus, Chattogram",
    category: "Admission",
  },
  {
    title: "Freshers' Orientation — Spring 2026",
    date: "May 5, 2026",
    time: "9:00 AM",
    venue: "University Auditorium",
    category: "Academic",
  },
  {
    title: "Annual Tech Fest 2026",
    date: "Jun 20, 2026",
    time: "All Day",
    venue: "Engineering Complex",
    category: "Event",
  },
];

const formatCalendarDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return {
    day: d.getDate(),
    month: d.toLocaleDateString("en-US", { month: "short" }),
    year: d.getFullYear(),
  };
};

const NewsEvents = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(sortedNews.length / ITEMS_PER_PAGE);
  const visibleNews = sortedNews.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/5 via-primary/10 to-accent/5" id="news">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Latest News - takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading font-bold text-3xl text-primary">Latest News</h2>
              <a
                href="https://portcity.edu.bd/HomePage/ListPrimary/1/N/view-all-news"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" className="text-accent hover:text-accent">
                  All News <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {visibleNews.map((item, index) => {
                const cal = formatCalendarDate(item.date);
                return (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-white/30 bg-white/20 backdrop-blur-md shadow-lg hover:border-accent hover:bg-white/30 h-full">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {/* Calendar date badge */}
                        <div className="absolute top-3 left-3 bg-primary text-primary-foreground rounded-lg overflow-hidden shadow-lg min-w-[56px]">
                          <div className="text-center px-2 py-0.5 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider">
                            {cal.month}
                          </div>
                          <div className="text-center px-2 py-1">
                            <div className="font-heading font-bold text-xl leading-tight">{cal.day}</div>
                            <div className="text-[10px] opacity-80">{cal.year}</div>
                          </div>
                        </div>
                        <Badge className="absolute top-3 right-3 bg-secondary/90 text-secondary-foreground text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-heading font-semibold text-sm md:text-base text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{item.excerpt}</p>
                      </CardContent>
                    </Card>
                  </a>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                  disabled={currentPage === 0}
                  className="border-primary/20"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(i)}
                    className={currentPage === i ? "bg-primary text-primary-foreground" : "border-primary/20"}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={currentPage === totalPages - 1}
                  className="border-primary/20"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Upcoming Events - takes 1 column */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading font-bold text-3xl text-primary">Upcoming Events</h2>
            </div>

            <div className="space-y-5">
              {events.map((event, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 border border-white/30 bg-white/20 backdrop-blur-md shadow-lg hover:border-secondary hover:bg-white/30"
                >
                  <CardContent className="p-5">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 text-center">
                        <div className="w-14 h-14 bg-gradient-highlight rounded-lg flex flex-col items-center justify-center">
                          <div className="font-heading font-bold text-xl text-highlight-foreground leading-tight">
                            {new Date(event.date).getDate()}
                          </div>
                          <div className="text-[10px] text-highlight-foreground font-medium">
                            {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <Badge className="bg-secondary text-secondary-foreground mb-1.5 text-xs">
                          {event.category}
                        </Badge>
                        <h3 className="font-heading font-semibold text-sm text-primary mb-1.5 line-clamp-2">
                          {event.title}
                        </h3>
                        <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3" />
                            <span>{event.venue}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
