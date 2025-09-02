import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Filter, Briefcase } from "lucide-react";
import type { Stream } from "@/types/streams";
import { useRecommendation } from "@/context/recommendation";

type Course = {
  id: number;
  title: string;
  stream: Stream;
  level: "Undergraduate" | "Diploma" | "Certification";
  duration: string;
  description: string;
  careers: string[];
};

const COURSES: Course[] = [
  { id: 1, title: "B.Tech Computer Science", stream: "Engineering", level: "Undergraduate", duration: "4 years", description: "Core CS fundamentals with modern software engineering.", careers: ["Software Engineer", "Data Engineer", "SRE"] },
  { id: 2, title: "B.Tech Mechanical Engineering", stream: "Engineering", level: "Undergraduate", duration: "4 years", description: "Mechanics, thermodynamics, materials, and manufacturing.", careers: ["Design Engineer", "Automotive Engineer"] },
  { id: 3, title: "MBBS", stream: "Medicine", level: "Undergraduate", duration: "5.5 years", description: "Intensive medical program covering diagnosis and treatment.", careers: ["Physician", "Surgeon"] },
  { id: 4, title: "BFA Visual Arts", stream: "Arts", level: "Undergraduate", duration: "3 years", description: "Studio practice across painting, sculpture, and digital arts.", careers: ["Artist", "Art Director", "Illustrator"] },
  { id: 5, title: "B.Com Finance", stream: "Commerce", level: "Undergraduate", duration: "3 years", description: "Accounting, markets, taxation, and corporate finance.", careers: ["Financial Analyst", "Accountant"] },
  { id: 6, title: "Diploma in Web Development", stream: "IT", level: "Diploma", duration: "1 year", description: "Frontend and backend fundamentals for modern web apps.", careers: ["Frontend Dev", "Full-stack Dev"] },
  { id: 7, title: "Graphic Design Certification", stream: "Arts", level: "Certification", duration: "6 months", description: "Branding, layout, and digital design tools.", careers: ["Graphic Designer", "UI Designer"] },
  { id: 8, title: "BBA", stream: "Commerce", level: "Undergraduate", duration: "3 years", description: "Business administration, marketing, and operations.", careers: ["Operations Manager", "Marketing Exec"] },
];

const STREAMS: ("All" | Stream)[] = ["All", "Engineering", "Medicine", "Arts", "Commerce", "IT"];

export default function CourseExplorer() {
  const { recommended } = useRecommendation();
  const [stream, setStream] = useState<(typeof STREAMS)[number]>("All");
  const [open, setOpen] = useState(false);

  // Apply recommendation as default filter if present
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (recommended) setStream(recommended as any);
  }, [recommended]);
  const [selected, setSelected] = useState<Course | null>(null);

  const filtered = useMemo(() => COURSES.filter((c) => (stream === "All" ? true : c.stream === stream)), [stream]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><GraduationCap className="h-4 w-4 text-indigo-600"/> Course Explorer</div>
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm">
            <Filter className="h-4 w-4 text-muted-foreground"/>
            <label htmlFor="stream" className="text-muted-foreground">Stream</label>
            <select id="stream" value={stream} onChange={(e)=>setStream(e.target.value as any)} className="bg-transparent outline-none">
              {STREAMS.map((s)=> <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {recommended && (
        <div className="mb-4 rounded-lg border bg-secondary/60 px-3 py-2 text-sm">
          Personalized: showing <span className="font-medium">{recommended}</span> courses from your quiz.
          <button className="ml-2 rounded border px-2 py-0.5 text-xs" onClick={() => setStream("All")}>Clear</button>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course)=> (
          <button key={course.id} onClick={()=>{setSelected(course); setOpen(true);}} className="group rounded-2xl border bg-card text-card-foreground p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <Badge variant="secondary">{course.stream}</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{course.description}</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded bg-indigo-50 px-2 py-1 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">{course.level}</span>
              <span className="rounded bg-slate-100 px-2 py-1 dark:bg-white/10">{course.duration}</span>
            </div>
          </button>
        ))}
      </div>

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
              <div className="mt-2 text-sm text-card-foreground">{selected.description}</div>
              <div className="mt-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium"><Briefcase className="h-4 w-4"/> Career paths</div>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {selected.careers.map((c)=> (
                    <li key={c} className="rounded-md border bg-secondary px-3 py-2 text-sm text-card-foreground">{c}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
