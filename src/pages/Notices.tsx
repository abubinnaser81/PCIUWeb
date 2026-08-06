 import { useState } from "react";
 import { Search, Download, FileText, Calendar, Filter, ChevronLeft, ChevronRight } from "lucide-react";
 import Header from "@/components/Header";
 import Footer from "@/components/Footer";
 import { Input } from "@/components/ui/input";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
 } from "@/components/ui/table";
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 
 type NoticeCategory = "All" | "Academic" | "Admission" | "Examination" | "Administrative" | "Event" | "Scholarship";
 
 interface Notice {
   id: number;
   title: string;
   category: NoticeCategory;
   date: string;
   fileUrl: string;
   isNew: boolean;
   fileSize: string;
 }
 
 const notices: Notice[] = [
   {
     id: 1,
     title: "Final Examination Schedule for Fall 2025 - All Programs",
     category: "Examination",
     date: "2025-01-28",
     fileUrl: "#",
     isNew: true,
     fileSize: "245 KB",
   },
   {
     id: 2,
     title: "Admission Open for Spring 2026 Semester - Undergraduate Programs",
     category: "Admission",
     date: "2025-01-27",
     fileUrl: "#",
     isNew: true,
     fileSize: "1.2 MB",
   },
   {
     id: 3,
     title: "Course Registration Deadline Extended for Current Students",
     category: "Academic",
     date: "2025-01-25",
     fileUrl: "#",
     isNew: true,
     fileSize: "180 KB",
   },
   {
     id: 4,
     title: "Merit Scholarship Applications for Academic Year 2025-2026",
     category: "Scholarship",
     date: "2025-01-24",
     fileUrl: "#",
     isNew: false,
     fileSize: "520 KB",
   },
   {
     id: 5,
     title: "Victory Day Holiday Notice - December 16, 2025",
     category: "Administrative",
     date: "2025-01-22",
     fileUrl: "#",
     isNew: false,
     fileSize: "95 KB",
   },
   {
     id: 6,
     title: "Annual Sports Week 2025 - Registration Open",
     category: "Event",
     date: "2025-01-20",
     fileUrl: "#",
     isNew: false,
     fileSize: "340 KB",
   },
   {
     id: 7,
     title: "Midterm Examination Results Published - BBA Program",
     category: "Examination",
     date: "2025-01-18",
     fileUrl: "#",
     isNew: false,
     fileSize: "890 KB",
   },
   {
     id: 8,
     title: "Library Extended Hours During Exam Period",
     category: "Administrative",
     date: "2025-01-15",
     fileUrl: "#",
     isNew: false,
     fileSize: "120 KB",
   },
   {
     id: 9,
     title: "Guest Lecture on Artificial Intelligence - Faculty of Engineering",
     category: "Event",
     date: "2025-01-12",
     fileUrl: "#",
     isNew: false,
     fileSize: "275 KB",
   },
   {
     id: 10,
     title: "PhD Program Admission for Spring 2026 - Application Guidelines",
     category: "Admission",
     date: "2025-01-10",
     fileUrl: "#",
     isNew: false,
     fileSize: "1.5 MB",
   },
   {
     id: 11,
     title: "Tuition Fee Payment Deadline Reminder - Fall 2025",
     category: "Administrative",
     date: "2025-01-08",
     fileUrl: "#",
     isNew: false,
     fileSize: "150 KB",
   },
   {
     id: 12,
     title: "Research Grant Applications - Deadline February 2026",
     category: "Academic",
     date: "2025-01-05",
     fileUrl: "#",
     isNew: false,
     fileSize: "680 KB",
   },
 ];
 
 const categories: NoticeCategory[] = ["All", "Academic", "Admission", "Examination", "Administrative", "Event", "Scholarship"];
 
 const getCategoryColor = (category: NoticeCategory): string => {
   const colors: Record<NoticeCategory, string> = {
     All: "bg-muted text-muted-foreground",
     Academic: "bg-primary/10 text-primary border-primary/20",
     Admission: "bg-accent/10 text-accent border-accent/20",
     Examination: "bg-destructive/10 text-destructive border-destructive/20",
     Administrative: "bg-secondary text-secondary-foreground",
     Event: "bg-highlight/10 text-highlight border-highlight/20",
     Scholarship: "bg-green-500/10 text-green-700 border-green-500/20",
   };
   return colors[category];
 };
 
 const Notices = () => {
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedCategory, setSelectedCategory] = useState<NoticeCategory>("All");
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 10;
 
   const filteredNotices = notices.filter((notice) => {
     const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase());
     const matchesCategory = selectedCategory === "All" || notice.category === selectedCategory;
     return matchesSearch && matchesCategory;
   });
 
   const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const paginatedNotices = filteredNotices.slice(startIndex, startIndex + itemsPerPage);
 
   const formatDate = (dateString: string) => {
     return new Date(dateString).toLocaleDateString("en-US", {
       year: "numeric",
       month: "short",
       day: "numeric",
     });
   };
 
   const categoryCounts = categories.reduce((acc, category) => {
     if (category === "All") {
       acc[category] = notices.length;
     } else {
       acc[category] = notices.filter((n) => n.category === category).length;
     }
     return acc;
   }, {} as Record<NoticeCategory, number>);
 
   return (
     <div className="min-h-screen flex flex-col bg-background">
       <Header />
 
       {/* Hero Section */}
       <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16">
         <div className="container mx-auto px-4">
           <div className="max-w-3xl">
             <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
               Notice Board
             </h1>
             <p className="text-primary-foreground/80 text-lg">
               Stay updated with the latest announcements, circulars, and important notifications from Port City International University.
             </p>
           </div>
         </div>
       </section>
 
       <main className="flex-1 py-12">
         <div className="container mx-auto px-4">
           <div className="grid lg:grid-cols-4 gap-8">
             {/* Sidebar - Categories */}
             <aside className="lg:col-span-1">
               <Card className="sticky top-24">
                 <CardHeader className="pb-3">
                   <CardTitle className="text-lg flex items-center gap-2">
                     <Filter className="w-5 h-5" />
                     Categories
                   </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-2">
                   {categories.map((category) => (
                     <button
                       key={category}
                       onClick={() => {
                         setSelectedCategory(category);
                         setCurrentPage(1);
                       }}
                       className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                         selectedCategory === category
                           ? "bg-primary text-primary-foreground"
                           : "hover:bg-muted text-foreground"
                       }`}
                     >
                       <span>{category}</span>
                       <Badge
                         variant="secondary"
                         className={`${
                           selectedCategory === category
                             ? "bg-primary-foreground/20 text-primary-foreground"
                             : "bg-muted-foreground/10"
                         }`}
                       >
                         {categoryCounts[category]}
                       </Badge>
                     </button>
                   ))}
                 </CardContent>
               </Card>
             </aside>
 
             {/* Main Content */}
             <div className="lg:col-span-3 space-y-6">
               {/* Search & Filter Bar */}
               <Card>
                 <CardContent className="p-4">
                   <div className="flex flex-col sm:flex-row gap-4">
                     <div className="relative flex-1">
                       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                       <Input
                         placeholder="Search notices..."
                         value={searchQuery}
                         onChange={(e) => {
                           setSearchQuery(e.target.value);
                           setCurrentPage(1);
                         }}
                         className="pl-10"
                       />
                     </div>
                     <Select
                       value={selectedCategory}
                       onValueChange={(value) => {
                         setSelectedCategory(value as NoticeCategory);
                         setCurrentPage(1);
                       }}
                     >
                       <SelectTrigger className="w-full sm:w-[180px]">
                         <SelectValue placeholder="Category" />
                       </SelectTrigger>
                       <SelectContent>
                         {categories.map((category) => (
                           <SelectItem key={category} value={category}>
                             {category}
                           </SelectItem>
                         ))}
                       </SelectContent>
                     </Select>
                   </div>
                 </CardContent>
               </Card>
 
               {/* Results Summary */}
               <div className="flex items-center justify-between text-sm text-muted-foreground">
                 <p>
                   Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredNotices.length)} of{" "}
                   {filteredNotices.length} notices
                 </p>
               </div>
 
               {/* Notices Table */}
               <Card>
                 <div className="overflow-x-auto">
                   <Table>
                     <TableHeader>
                       <TableRow className="bg-muted/50">
                         <TableHead className="w-12 text-center font-semibold">SL</TableHead>
                         <TableHead className="font-semibold">Notice Title</TableHead>
                         <TableHead className="w-32 font-semibold">Category</TableHead>
                         <TableHead className="w-28 font-semibold">
                           <div className="flex items-center gap-1">
                             <Calendar className="w-4 h-4" />
                             Date
                           </div>
                         </TableHead>
                         <TableHead className="w-28 text-center font-semibold">Download</TableHead>
                       </TableRow>
                     </TableHeader>
                     <TableBody>
                       {paginatedNotices.length > 0 ? (
                         paginatedNotices.map((notice, index) => (
                           <TableRow
                             key={notice.id}
                             className="hover:bg-muted/30 transition-colors"
                           >
                             <TableCell className="text-center font-medium text-muted-foreground">
                               {startIndex + index + 1}
                             </TableCell>
                             <TableCell>
                               <div className="flex items-start gap-2">
                                 <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                 <div className="space-y-1">
                                   <a
                                     href={notice.fileUrl}
                                     className="text-foreground hover:text-primary font-medium transition-colors line-clamp-2"
                                   >
                                     {notice.title}
                                   </a>
                                   {notice.isNew && (
                                     <Badge className="bg-destructive text-destructive-foreground text-xs">
                                       NEW
                                     </Badge>
                                   )}
                                 </div>
                               </div>
                             </TableCell>
                             <TableCell>
                               <Badge
                                 variant="outline"
                                 className={getCategoryColor(notice.category)}
                               >
                                 {notice.category}
                               </Badge>
                             </TableCell>
                             <TableCell className="text-muted-foreground text-sm">
                               {formatDate(notice.date)}
                             </TableCell>
                             <TableCell className="text-center">
                               <Button
                                 variant="ghost"
                                 size="sm"
                                 asChild
                                 className="text-primary hover:text-primary hover:bg-primary/10"
                               >
                                 <a href={notice.fileUrl} download>
                                   <Download className="w-4 h-4 mr-1" />
                                   <span className="text-xs">{notice.fileSize}</span>
                                 </a>
                               </Button>
                             </TableCell>
                           </TableRow>
                         ))
                       ) : (
                         <TableRow>
                           <TableCell colSpan={5} className="text-center py-12">
                             <div className="flex flex-col items-center gap-2 text-muted-foreground">
                               <FileText className="w-12 h-12 opacity-30" />
                               <p className="font-medium">No notices found</p>
                               <p className="text-sm">Try adjusting your search or filter criteria</p>
                             </div>
                           </TableCell>
                         </TableRow>
                       )}
                     </TableBody>
                   </Table>
                 </div>
               </Card>
 
               {/* Pagination */}
               {totalPages > 1 && (
                 <div className="flex items-center justify-center gap-2">
                   <Button
                     variant="outline"
                     size="sm"
                     onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                     disabled={currentPage === 1}
                   >
                     <ChevronLeft className="w-4 h-4" />
                     Previous
                   </Button>
                   <div className="flex items-center gap-1">
                     {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                       <Button
                         key={page}
                         variant={currentPage === page ? "default" : "ghost"}
                         size="sm"
                         onClick={() => setCurrentPage(page)}
                         className="w-8 h-8 p-0"
                       >
                         {page}
                       </Button>
                     ))}
                   </div>
                   <Button
                     variant="outline"
                     size="sm"
                     onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                     disabled={currentPage === totalPages}
                   >
                     Next
                     <ChevronRight className="w-4 h-4" />
                   </Button>
                 </div>
               )}
             </div>
           </div>
         </div>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default Notices;