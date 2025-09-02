import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Menu, User } from "lucide-react";
import { cn } from "@/lib/utils";

export type AppPage =
  | "Home"
  | "AptitudeTest"
  | "CourseExplorer"
  | "CollegeDirectory"
  | "UserProfile";

const navItems: { label: string; page: AppPage; path: string }[] = [
  { label: "Home", page: "Home", path: "/" },
  { label: "Aptitude Test", page: "AptitudeTest", path: "/aptitude" },
  { label: "Courses", page: "CourseExplorer", path: "/courses" },
  { label: "Colleges", page: "CollegeDirectory", path: "/colleges" },
];

export function Header({
  currentPage,
  onNavigate,
}: {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
}) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-background/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            onClick={() => onNavigate("Home")}
            className="flex items-center gap-2"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="font-extrabold tracking-tight text-lg sm:text-xl">
              CareerPath Finder
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.page}
                to={item.path}
                onClick={() => onNavigate(item.page)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname === item.path || currentPage === item.page
                    ? "text-primary bg-primary/10"
                    : "text-foreground/70 hover:text-foreground hover:bg-secondary",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/profile"
              onClick={() => onNavigate("UserProfile")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="Profile"
            >
              <User className="h-5 w-5" />
            </Link>
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border text-foreground/80 md:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navItems.map((item) => (
                <Link
                  key={item.page}
                  to={item.path}
                  onClick={() => {
                    onNavigate(item.page);
                    setOpen(false);
                  }}
                  className={cn(
                    "block rounded-md px-3 py-2 text-base font-medium",
                    location.pathname === item.path || currentPage === item.page
                      ? "text-primary bg-primary/10"
                      : "text-foreground/80 hover:text-foreground hover:bg-secondary",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
