import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Building2, MapPin, Search } from "lucide-react";
import { useRecommendation } from "@/context/recommendation";
import type { Stream } from "@/types/streams";

export type College = {
  id: number;
  name: string;
  district: string;
  streams: string[];
  rating: number;
};

const COLLEGES: College[] = [
  { id: 1, name: "Indigo Institute of Technology", district: "Bengaluru", streams: ["Engineering", "IT"], rating: 4.5 },
  { id: 2, name: "Evergreen Medical College", district: "Pune", streams: ["Medicine"], rating: 4.3 },
  { id: 3, name: "Riverside College of Arts", district: "Kolkata", streams: ["Arts", "Design"], rating: 4.1 },
  { id: 4, name: "Summit School of Business", district: "Mumbai", streams: ["Commerce"], rating: 4.2 },
  { id: 5, name: "Northern Polytechnic", district: "Delhi", streams: ["Engineering", "IT"], rating: 4.0 },
];

export default function CollegeDirectory() {
  const { recommended } = useRecommendation();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<College | null>(null);

  const filtered = useMemo(() => {
    const base = recommended ? COLLEGES.filter((c) => c.streams.includes(recommended)) : COLLEGES;
    if (!query) return base;
    const q = query.toLowerCase();
    return base.filter((c) => c.district.toLowerCase().includes(q) || c.name.toLowerCase().includes(q));
  }, [query, recommended]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><Building2 className="h-4 w-4 text-indigo-600"/> College Directory</div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50"/>
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search by district or name" className="w-72 rounded-md border bg-card pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"/>
        </div>
      </div>

      {recommended && (
        <div className="mb-4 rounded-lg border bg-secondary/60 px-3 py-2 text-sm">
          Personalized: showing <span className="font-medium">{recommended}</span> colleges from your quiz.
          <button className="ml-2 rounded border px-2 py-0.5 text-xs" onClick={() => (window.location.href = "/colleges")}>Clear</button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((col)=> (
          <button key={col.id} onClick={()=>{setSelected(col); setOpen(true);}} className="rounded-2xl border bg-card text-card-foreground p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="text-lg font-semibold">{col.name}</div>
            <div className="mt-1 text-sm text-muted-foreground">{col.district}</div>
            <div className="mt-2 text-xs text-muted-foreground">Streams: {col.streams.join(", ")}</div>
            <div className="mt-3 inline-flex rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">Rating: {col.rating.toFixed(1)}</div>
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
                <DialogDescription>{selected.district}</DialogDescription>
              </DialogHeader>
              <div className="mt-2 text-sm">Streams offered: {selected.streams.join(", ")}</div>
              <div className="mt-2 inline-flex items-center gap-2 text-sm text-card-foreground"><MapPin className="h-4 w-4"/> District: {selected.district}</div>
              <div className="mt-2 text-sm">Rating: {selected.rating.toFixed(1)} / 5</div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
