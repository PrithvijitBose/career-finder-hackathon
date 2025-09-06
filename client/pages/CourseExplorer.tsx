import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Filter, Briefcase, ArrowRight } from "lucide-react";
import type { Stream } from "@/types/streams";
import { useRecommendation } from "@/context/recommendation";

type Course = {
  id: number;
  title: string;
  stream: Stream;
  level: "Undergraduate" | "Diploma" | "Certification";
  duration: string;
  description: string;
  routeId?: string; // Add route identifier for navigation
  hasCareerMapping?: boolean; // Flag to show if career mapping is available
};

const COURSES: Course[] = [
  {
    id: 1,
    title: "Computer Science",
    stream: "Engineering",
    level: "Undergraduate",
    duration: "3years/4 years", 
    description: "Core CS fundamentals with modern software engineering.",
    routeId: "computer-science", // Route identifier
    hasCareerMapping: true, // This course has detailed career mapping
  },
  {
    id: 2,
    title: "Mechanical Engineering",
    stream: "Engineering",
    level: "Undergraduate",
    duration: "4 years",
    description: "Mechanics, thermodynamics, materials, and manufacturing.",
    routeId: "mechanical-engineering",
    hasCareerMapping: true, // Will be added later
  },
  {
    id: 3,
    title: "MBBS",
    stream: "Medicine",
    level: "Undergraduate",
    duration: "5.5 years",
    description: "Intensive medical program covering diagnosis and treatment.",
    routeId: "mbbs",
    hasCareerMapping: false,
  },
  {
    id: 4,
    title: "BFA Visual Arts",
    stream: "Arts",
    level: "Undergraduate",
    duration: "3 years",
    description:
      "Studio practice across painting, sculpture, and digital arts.",
    routeId: "bfa-visual-arts",
    hasCareerMapping: false,
  },
  {
    id: 5,
    title: "B.Com Finance",
    stream: "Commerce",
    level: "Undergraduate",
    duration: "3 years",
    description: "Accounting, markets, taxation, and corporate finance.",
    routeId: "bcom-finance",
    hasCareerMapping: false,
  },
  {
    id: 6,
    title: "Diploma in Web Development",
    stream: "IT",
    level: "Diploma",
    duration: "1 year",
    description: "Frontend and backend fundamentals for modern web apps.",
    routeId: "web-development-diploma",
    hasCareerMapping: false,
  },
  {
    id: 7,
    title: "Graphic Design Certification",
    stream: "Arts",
    level: "Certification",
    duration: "6 months",
    description: "Branding, layout, and digital design tools.",
    routeId: "graphic-design",
    hasCareerMapping: false,
  },
  {
    id: 8,
    title: "BBA",
    stream: "Commerce",
    level: "Undergraduate",
    duration: "3 years",
    description: "Business administration, marketing, and operations.",
    routeId: "bba",
    hasCareerMapping: false,
  },
];

const STREAMS: ("All" | Stream)[] = [
  "All",
  "Engineering",
  "Medicine",
  "Arts",
  "Commerce",
  "IT",
];

export default function CourseExplorer() {
  const navigate = useNavigate();
  const { recommended } = useRecommendation();
  const [stream, setStream] = useState<(typeof STREAMS)[number]>("All");
  const [open, setOpen] = useState(false);

  // Apply recommendation as default filter if present
  useEffect(() => {
    if (recommended) setStream(recommended as any);
  }, [recommended]);
  
  const [selected, setSelected] = useState<Course | null>(null);

  const filtered = useMemo(
    () =>
      COURSES.filter((c) => (stream === "All" ? true : c.stream === stream)),
    [stream],
  );

  const handleCourseClick = (course: Course) => {
    if (course.hasCareerMapping && course.routeId) {
      // Navigate to career mapping page
      navigate(`/career-mapping/${course.routeId}`);
    } else {
      // Show dialog for courses without career mapping
      setSelected(course);
      setOpen(true);
    }
  };

  const navigateToCareerMapping = (course: Course) => {
    if (course.routeId) {
      navigate(`/career-mapping/${course.routeId}`);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <GraduationCap className="h-4 w-4 text-indigo-600" /> Course Explorer
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <label htmlFor="stream" className="text-muted-foreground">
              Stream
            </label>
            <select
              id="stream"
              value={stream}
              onChange={(e) => setStream(e.target.value as any)}
              className="bg-transparent outline-none"
            >
              {STREAMS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {recommended && (
        <div className="mb-4 rounded-lg border bg-secondary/60 px-3 py-2 text-sm">
          Personalized: showing{" "}
          <span className="font-medium">{recommended}</span> courses from your
          quiz.
          <button
            className="ml-2 rounded border px-2 py-0.5 text-xs"
            onClick={() => setStream("All")}
          >
            Clear
          </button>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course) => (
          <div
            key={course.id}
            className="group rounded-2xl border bg-card text-card-foreground p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <Badge variant="secondary">{course.stream}</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {course.description}
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded bg-indigo-50 px-2 py-1 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                {course.level}
              </span>
              <span className="rounded bg-slate-100 px-2 py-1 dark:bg-white/10">
                {course.duration}
              </span>
            </div>
            
            {/* Action buttons */}
            <div className="mt-4 flex gap-2">
              {course.hasCareerMapping ? (
                <Button 
                  onClick={() => handleCourseClick(course)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                  size="sm"
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  View Career Paths
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={() => handleCourseClick(course)}
                    variant="outline"
                    className="flex-1"
                    size="sm"
                  >
                    View Details
                  </Button>
                  <Button 
                    onClick={() => handleCourseClick(course)}
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground"
                  >
                    Career paths coming soon
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Dialog for courses without career mapping */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.title}</DialogTitle>
                <DialogDescription>
                  {selected.stream} • {selected.level} • {selected.duration}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-2 text-sm text-card-foreground">
                {selected.description}
              </div>
              <div className="mt-6 flex gap-3">
                <Button 
                  onClick={() => setOpen(false)}
                  variant="outline" 
                  className="flex-1"
                >
                  Close
                </Button>
                <Button 
                  onClick={() => {
                    setOpen(false);
                    // You can add logic here to navigate to college listings
                    // navigate(`/colleges/${selected.routeId}`);
                  }}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                >
                  Find Colleges
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground text-center">
                Detailed career mapping for this course will be available soon.
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}