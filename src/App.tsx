import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ManagedPageRoute from "./components/cms/ManagedPageRoute";
import Loading from "./components/Loading";

const Index = lazy(() => import("./pages/Index"));
const FacultyList = lazy(() => import("./pages/FacultyList"));
const FacultiesPage = lazy(() => import("./pages/FacultiesPage"));
const FacultyProfile = lazy(() => import("./pages/FacultyProfile"));
const Library = lazy(() => import("./pages/Library"));
const Notices = lazy(() => import("./pages/Notices"));
const FacultyAuth = lazy(() => import("./pages/FacultyAuth"));
const FacultyAdmin = lazy(() => import("./pages/FacultyAdmin"));
const IQAC = lazy(() => import("./pages/IQAC"));
const DepartmentEnglish = lazy(() => import("./pages/DepartmentEnglish"));
const DepartmentLaw = lazy(() => import("./pages/DepartmentLaw"));
const DepartmentJournalism = lazy(() => import("./pages/DepartmentJournalism"));
const DepartmentCSE = lazy(() => import("./pages/DepartmentCSE"));
const DepartmentEEE = lazy(() => import("./pages/DepartmentEEE"));
const DepartmentCivil = lazy(() => import("./pages/DepartmentCivil"));
const DepartmentTextile = lazy(() => import("./pages/DepartmentTextile"));
const DepartmentFashion = lazy(() => import("./pages/DepartmentFashion"));
const DepartmentBBA = lazy(() => import("./pages/DepartmentBBA"));
const Admission = lazy(() => import("./pages/Admission"));
const Academics = lazy(() => import("./pages/Academics"));
const ResearchPage = lazy(() => import("./pages/Research"));
const PortCityJournal = lazy(() => import("./pages/research/PortCityJournal"));
const CallForPaper = lazy(() => import("./pages/research/CallForPaper"));
const CallForPaperGuidelines = lazy(() => import("./pages/research/CallForPaperGuidelines"));
const TechStack = lazy(() => import("./pages/TechStack"));
const AdminAuth = lazy(() => import("./pages/AdminAuth"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminPages = lazy(() => import("./pages/admin/AdminPages"));
const PageEditor = lazy(() => import("./pages/admin/PageEditor"));
const VisualPageEditor = lazy(() => import("./pages/admin/VisualPageEditor"));
const AdminHomepage = lazy(() => import("./pages/admin/AdminHomepage"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminMedia = lazy(() => import("./pages/admin/AdminMedia"));
const AdminActivity = lazy(() => import("./pages/admin/AdminActivity"));
const AdminTemplates = lazy(() => import("./pages/admin/AdminTemplates"));
const AdminFaculty = lazy(() => import("./pages/admin/AdminFaculty"));
const AdminJournal = lazy(() => import("./pages/admin/AdminJournal"));
const DynamicPage = lazy(() => import("./pages/DynamicPage"));
const DesignExport = lazy(() => import("./pages/DesignExport"));
const VCMessagePage = lazy(() => import("./pages/VCMessage"));
const Management = lazy(() => import("./pages/Management"));
const AboutUniversity = lazy(() => import("./pages/AboutUniversity"));
const PortCityNews = lazy(() => import("./pages/PortCityNews"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<Loading />}> 
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/library" element={<ManagedPageRoute slug="library" fallback={Library} />} />
            <Route path="/notices" element={<ManagedPageRoute slug="notices" fallback={Notices} />} />
            <Route path="/faculty" element={<ManagedPageRoute slug="faculty" fallback={FacultyList} />} />
            <Route path="/faculties" element={<FacultiesPage />} />
            <Route path="/faculty/:id" element={<FacultyProfile />} />
            <Route path="/faculty-auth" element={<FacultyAuth />} />
            <Route path="/faculty-admin" element={<FacultyAdmin />} />
            <Route path="/iqac" element={<ManagedPageRoute slug="iqac" fallback={IQAC} />} />
            <Route path="/department/english" element={<ManagedPageRoute slug="department-english" fallback={DepartmentEnglish} />} />
            <Route path="/department/law" element={<ManagedPageRoute slug="department-law" fallback={DepartmentLaw} />} />
            <Route path="/department/journalism" element={<ManagedPageRoute slug="department-journalism" fallback={DepartmentJournalism} />} />
            <Route path="/department/cse" element={<ManagedPageRoute slug="department-cse" fallback={DepartmentCSE} />} />
            <Route path="/department/eee" element={<ManagedPageRoute slug="department-eee" fallback={DepartmentEEE} />} />
            <Route path="/department/civil" element={<ManagedPageRoute slug="department-civil" fallback={DepartmentCivil} />} />
            <Route path="/department/textile" element={<ManagedPageRoute slug="department-textile" fallback={DepartmentTextile} />} />
            <Route path="/department/fashion" element={<ManagedPageRoute slug="department-fashion" fallback={DepartmentFashion} />} />
            <Route path="/department/bba" element={<DepartmentBBA />} />
            <Route path="/admission" element={<Admission />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/research/port-city-journal" element={<PortCityJournal />} />
            <Route path="/research/call-for-paper" element={<CallForPaper />} />
            <Route path="/research/call-for-paper-guidelines" element={<CallForPaperGuidelines />} />
            <Route path="/tech-stack" element={<TechStack />} />
            
            {/* Admin Routes */}
            <Route path="/admin-auth" element={<AdminAuth />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/homepage" element={<AdminHomepage />} />
            <Route path="/admin/faculty" element={<AdminFaculty />} />
            <Route path="/admin/pages" element={<AdminPages />} />
            <Route path="/admin/pages/new" element={<PageEditor />} />
            <Route path="/admin/pages/:id" element={<PageEditor />} />
            <Route path="/admin/visual/:id" element={<VisualPageEditor />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/media" element={<AdminMedia />} />
            <Route path="/admin/activity" element={<AdminActivity />} />
            <Route path="/admin/templates" element={<AdminTemplates />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/journal" element={<AdminJournal />} />
            
            {/* Dynamic Pages */}
            <Route path="/page/:slug" element={<DynamicPage />} />
            <Route path="/design-export" element={<DesignExport />} />
            <Route path="/vice-chancellors-message" element={<ManagedPageRoute slug="vice-chancellors-message" fallback={VCMessagePage} />} />
            <Route path="/management" element={<ManagedPageRoute slug="management" fallback={Management} />} />
            <Route path="/about-the-university" element={<AboutUniversity />} />
            <Route path="/port-city-news" element={<PortCityNews />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
