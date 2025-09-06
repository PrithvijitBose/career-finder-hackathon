import "./global.css";
import {Navigate} from "react-router-dom";

import { Toaster } from "./components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
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
import { Header, type AppPage } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import AptitudeTest from "./pages/AptitudeTest";
import CourseExplorer from "./pages/CourseExplorer";
import CollegeDirectory from "./pages/CollegeDirectory";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { PlaceholderPage } from "./pages/Placeholder";
import { useEffect, useMemo, useState } from "react";
import { RecommendationProvider } from "./context/recommendation";
import { UserProvider } from "./context/user";
import { useUser } from "./context/user";
import AI from "./pages/AI";
// Import your existing Computer Science component
import CSECareerMapping from "./Courses/ComputerScience";
import MechanicalEngineerMapping from "./Courses/MechanicalEngineer";

const queryClient = new QueryClient();

// Career Mapping Router Component (inline since it's simple)
function CareerMappingRouter() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract course ID from the URL path
  const courseId = location.pathname.split('/').pop();
  
  const handleBackToCourses = () => {
    navigate('/courses');
  };

  const renderCareerMapping = () => {
    switch (courseId) {
      case 'computer-science':
        return <CSECareerMapping />;
      
      case 'mechanical-engineering':
        return <MechanicalEngineerMapping/>
      
      default:
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md mx-auto text-center p-6">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Career Mapping Not Available
                </h2>
                <p className="text-gray-600 mb-6">
                  Career mapping for "{courseId}" is coming soon!
                </p>
                <button
                  onClick={handleBackToCourses}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  ← Back to Course Explorer
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderCareerMapping();
}

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
    
    // Handle career mapping routes - set to CourseExplorer context
    if (location.pathname.startsWith('/career-mapping/')) {
      setCurrentPage("CourseExplorer");
    } else {
      setCurrentPage(mapping[location.pathname] ?? "Home");
    }
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
          <Routes>
            <Route
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
            
            {/* NEW: Career Mapping Routes */}
            <Route path="/career-mapping/:courseId" element={<CareerMappingRouter />} />
            
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