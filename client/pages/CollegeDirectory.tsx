import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building2, MapPin, Search, ExternalLink } from "lucide-react";
import { useRecommendation } from "@/context/recommendation";
import type { Stream } from "@/types/streams";

export type College = {
  id: number;
  name: string;
  state: string;
  streams: string[];
  website: string;
};

const COLLEGES: College[] = [
  {
    id: 1,
    name: "IIT Kharagpur",
    state: "West Bengal",
    streams: ["Engineering"],
    website: "https://www.iitkgp.ac.in/",
  },
  {
    id: 2,
    name: "IIT Bombay",
    state: "Maharashtra",
    streams: ["Engineering"],
    website: "https://www.iitb.ac.in/",
  },
  {
    id: 3,
    name: "NIT Durgapur",
    state: "West Bengal",
    streams: ["Engineering"],
    website: "https://www.nitdgp.ac.in/",
  },
  {
    id: 4,
    name: "Jadavpur University",
    state: "West Bengal",
    streams: ["Engineering","IT"],
    website: "https://www.jaduniv.edu.in/",
  },
  {
    id: 5,
    name: "College of Engineering, Guindy (CEG) - Anna University",
    state: "Tamil Nadu",
    streams: ["Engineering", "IT"],
    website: "https://www.annauniv.edu/",
  },
  {
    id: 6,
    name: "COEP Technological University ",
    state: "Maharashtra",
    streams: ["Engineering"],
    website: "https://www.coep.org.in/",
  },
  {
    id: 7,
    name: "Government College of Engineering & Textile Technology",
    state: "West Bengal",
    streams: ["Engineering", "IT"],
    website: "https://www.gcetts.ac.in/",
  },
  {
    id: 8,
    name: "Government College of Engineering & Leather Technology (GCELT)",
    state: "West Bengal",
    streams: ["Engineering", "IT"],
    website: "https://www.gcelt.gov.in/",
  },
  {
    id: 9,
    name: "Kalyani Government Engineering College (KGEC)",
    state: "West Bengal",
    streams: ["Engineering"],
    website: "https://www.kgec.edu.in/",
  },
  {
    id: 10,
    name: "IIEST Shibpur",
    state: "West Bengal",
    streams: ["Engineering","IT"],
    website: "https://www.iiests.ac.in/",
  },
  {
    id: 11,
    name: "Medical College, Kolkata",
    state: "West Bengal",
    streams: ["Medicine"],
    website: "https://www.medicalcollegekolkata.in/",
  },
  {
    id: 12,
    name: "Nil Ratan Sircar Medical College",
    state: "West Bengal",
    streams: ["Medicine"],
    website: "https://nrsmc.edu.in/",
  },
  {
    id: 13,
    name: "RG Kar Medical College & Hospital, Kolkata",
    state: "West Bengal",
    streams: ["Medicine"],
    website: "https://rgkarmch.in/",
  },
  {
    id: 14,
    name: "Calcutta National Medical College",
    state: "West Bengal",
    streams: ["Medicine"],
    website: "https://www.cnmckolkata.com/",
  },
  {
    id: 15,
    name: "Burdwan Medical College",
    state: "West Bengal",
    streams: ["Medicine"],
    website: "https://bmcgov.com/",
  },
  {
    id: 16,
    name: "Barasat Medical College",
    state: "West Bengal",
    streams: ["Medicine"],
    website: "https://barasatgmch.ac.in/",
  },
];

export default function CollegeDirectory() {
  const { recommended } = useRecommendation();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<College | null>(null);

  const filtered = useMemo(() => {
    const base = recommended
      ? COLLEGES.filter((c) => c.streams.includes(recommended))
      : COLLEGES;
    if (!query) return base;
    const q = query.toLowerCase();
    return base.filter(
      (c) =>
        c.state.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q),
    );
  }, [query, recommended]);

  const handleCollegeClick = (college: College) => {
    // Open college website in new tab
    window.open(college.website, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="h-4 w-4 text-indigo-600" /> College Directory
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by state, name, or stream (e.g., 'Medical')"
            className="w-72 rounded-md border bg-card pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      </div>

      {recommended && (
        <div className="mb-4 rounded-lg border bg-secondary/60 px-3 py-2 text-sm">
          Personalized: showing{" "}
          <span className="font-medium">{recommended}</span> colleges from your
          quiz.
          <button
            className="ml-2 rounded border px-2 py-0.5 text-xs"
            onClick={() => (window.location.href = "/colleges")}
          >
            Clear
          </button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((col) => (
          <button
            key={col.id}
            onClick={() => handleCollegeClick(col)}
            className="rounded-2xl border bg-card text-card-foreground p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-lg font-semibold">{col.name}</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {col.state}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Streams: {col.streams.join(", ")}
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-indigo-600 transition-colors" />
            </div>
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
                <DialogDescription>{selected.state}</DialogDescription>
              </DialogHeader>
              <div className="mt-2 text-sm">
                Streams offered: {selected.streams.join(", ")}
              </div>
              <div className="mt-2 inline-flex items-center gap-2 text-sm text-card-foreground">
                <MapPin className="h-4 w-4" /> State: {selected.state}
              </div>
              <div className="mt-4">
                <a
                  href={selected.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                >
                  Visit Website
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}