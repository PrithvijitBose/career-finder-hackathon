import "./global.css";
import {Navigate} from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Header, type AppPage } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import AptitudeTest from "./pages/AptitudeTest";
import CourseExplorer from "./pages/CourseExplorer";
import CollegeDirectory from "./pages/CollegeDirectory";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { PlaceholderPage } from "./pages/Placeholder";
import { useEffect, useMemo, useState } from "react";
import { RecommendationProvider } from "@/context/recommendation";
import { UserProvider } from "@/context/user";
import { useUser } from "@/context/user";
import AI from "./pages/AI";



const queryClient = new QueryClient();

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<AppPage>("Home");

  const { user } = useUser(); // ✅ works now because provider is above

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
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <Routes><Route
  path="/"
  element={
    user ? (
      <Home onStartQuiz={() => onNavigate("AptitudeTest")} />
    ) : (
      <Navigate to="/login" replace />
    )
  }
/>
<Route
  path="/login"
  element={
    user ? (
      <Navigate to="/" replace /> // already logged in → go home
    ) : (
      <Login />
    )
  }
/>

            
 
            {/* <Route
              path="/"
              element={<Home onStartQuiz={() => onNavigate("AptitudeTest")} />}
            /> */}
            <Route
              path="/aptitude"
              element={
                <AptitudeTest
                  onExploreCourses={() => onNavigate("CourseExplorer")}
                  onBrowseColleges={() => onNavigate("CollegeDirectory")}
                  onGoProfile={() => onNavigate("UserProfile")}
                />
              }
            />
            <Route path="/courses" element={<CourseExplorer />} />
            <Route path="/colleges" element={<CollegeDirectory />} />
     
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/about"
              element={
                <PlaceholderPage
                  title="About"
                  description="Learn more about CareerPath Finder."
                />
              }
            />
            <Route
              path="/contact"
              element={
                <PlaceholderPage
                  title="Contact"
                  description="Get in touch with us."
                />
              }
            />
            <Route
              path="/privacy"
              element={
                <PlaceholderPage
                  title="Privacy Policy"
                  description="How we handle your data."
                />
              }
            />
             <Route path="/ai" element={<AI />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    );
  }, [location.pathname]);

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
        <UserProvider>   {/* 👈 move provider here */}
          <RecommendationProvider>
            <AppShell />
          </RecommendationProvider>
        </UserProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
const container = document.getElementById("root")! as HTMLElement & {
  _reactRoot?: ReturnType<typeof createRoot>;
};
const root = container._reactRoot ?? createRoot(container);
container._reactRoot = root;
root.render(<App />);
