import { motion } from "framer-motion";
import { useUser } from "@/context/user";
import { useRecommendation } from "@/context/recommendation";
import { Progress } from "@/components/ui/progress";

function initials(name?: string) {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "U";
}

export default function Profile() {
  const { user } = useUser();
  const { recommended } = useRecommendation();

  const skills = [
    {
      label: "Analytical",
      value: recommended === "Engineering" || recommended === "IT" ? 86 : 64,
    },
    { label: "Creativity", value: recommended === "Arts" ? 88 : 60 },
    { label: "Empathy", value: recommended === "Medicine" ? 82 : 58 },
    { label: "Business", value: recommended === "Commerce" ? 84 : 62 },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* animated gradient backdrop */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-fuchsia-100 to-pink-100 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />
      <motion.div
        className="absolute -left-20 -top-28 h-72 w-72 rounded-full bg-indigo-400/30 blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute -right-24 -bottom-28 h-80 w-80 rounded-full bg-fuchsia-400/30 blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* hero */}
        <div className="flex flex-col items-center gap-6 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="grid place-items-center rounded-full bg-white/30 p-2 shadow-xl backdrop-blur"
          >
            <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-2xl font-bold text-white shadow-xl">
              {initials(user?.name)}
            </div>
          </motion.div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {user?.name || "Your Profile"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Welcome back! Here's your snapshot.
            </p>
          </div>
        </div>

        {/* info cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <InfoCard title="Age" value={user?.age || "-"} />
          <InfoCard title="Gender" value={user?.gender || "-"} />
          <InfoCard title="Class" value={user?.class || "-"} />
          <InfoCard title="Recommended" value={recommended || "-"} glow />
        </div>

        {/* skills */}
        <div className="mt-10 rounded-3xl border bg-card/70 p-6 shadow-xl backdrop-blur">
          <h2 className="text-lg font-semibold">Aptitude strengths</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {skills.map((s) => (
              <div key={s.label} className="rounded-2xl border bg-card p-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-medium">{s.value}%</span>
                </div>
                <Progress value={s.value} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* actions */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Action href="/login" label="Edit Profile" />
          <Action href="/aptitude" label="Retake Quiz" variant="outline" />
          <Action href="/courses" label="Explore Courses" />
          <Action href="/colleges" label="Explore Colleges" variant="outline" />
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  value,
  glow,
}: {
  title: string;
  value: string;
  glow?: boolean;
}) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className={`rounded-3xl border bg-card p-6 shadow-xl ${glow ? "ring-1 ring-indigo-400/40" : ""}`}
    >
      <p className="text-sm text-muted-foreground">{title}</p>
      <motion.p
        className={`mt-2 text-xl font-semibold ${glow ? "text-slate-900 dark:text-white" : ""}`}
        animate={
          glow
            ? {
                textShadow: [
                  "0 0 0px rgba(99,102,241,0)",
                  "0 0 16px rgba(99,102,241,0.55)",
                  "0 0 6px rgba(99,102,241,0.25)",
                ],
              }
            : undefined
        }
        transition={{ duration: 1.1 }}
      >
        {value}
      </motion.p>
    </motion.div>
  );
}

function Action({
  href,
  label,
  variant = "solid",
}: {
  href: string;
  label: string;
  variant?: "solid" | "outline";
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium shadow-lg transition ${variant === "solid" ? "bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white hover:from-indigo-500 hover:to-fuchsia-500" : "border bg-card text-card-foreground hover:bg-secondary"}`}
    >
      {label}
    </a>
  );
}
