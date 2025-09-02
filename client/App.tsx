import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Header, type AppPage } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import AptitudeTest from "./pages/AptitudeTest";
import { PlaceholderPage } from "./pages/Placeholder";
import { useEffect, useMemo, useState } from "react";

const queryClient = new QueryClient();

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<AppPage>("Home");

  // Sync currentPage with URL on load/change
  useEffect(() => {
    const mapping: Record<string, AppPage> = {
      "/": "Home",
      "/aptitude": "AptitudeTest",
      "/courses": "CourseExplorer",
      "/colleges": "CollegeDirectory",
      "/profile": "UserProfile",
      "/about": "Home",
      "/contact": "Home",
      "/privacy": "Home",
    };
    setCurrentPage(mapping[location.pathname] ?? "Home");
  }, [location.pathname]);

  const onNavigate = (page: AppPage) => {
    setCurrentPage(page);
    const routeMap: Record<AppPage, string> = {
      Home: "/",
      AptitudeTest: "/aptitude",
      CourseExplorer: "/courses",
      CollegeDirectory: "/colleges",
      UserProfile: "/profile",
    };
    navigate(routeMap[page]);
  };

  const content = useMemo(() => {
    return (
      <Routes>
        <Route path="/" element={<Home onStartQuiz={() => onNavigate("AptitudeTest")} />} />
        <Route path="/aptitude" element={<AptitudeTest onExploreCourses={() => onNavigate("CourseExplorer")} onBrowseColleges={() => onNavigate("CollegeDirectory")} />} />
        <Route path="/courses" element={<PlaceholderPage title="Course Explorer" description="Filter by stream and explore curated course paths. Ask me to build this page next!" />} />
        <Route path="/colleges" element={<PlaceholderPage title="College Directory" description="Search by district and view college details. Ask me to implement it next!" />} />
        <Route path="/profile" element={<PlaceholderPage title="Your Profile" description="View your timeline and saved items. Ask me to build it next!" />} />
        <Route path="/about" element={<PlaceholderPage title="About" description="Learn more about CareerPath Finder." />} />
        <Route path="/contact" element={<PlaceholderPage title="Contact" description="Get in touch with us." />} />
        <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" description="How we handle your data." />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header currentPage={currentPage} onNavigate={onNavigate} />
      <main className="flex-1">{content}</main>
      <Footer />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
