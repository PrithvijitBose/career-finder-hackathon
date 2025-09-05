import { motion } from "framer-motion";
import { useUser } from "@/context/user";
import { useRecommendation } from "@/context/recommendation";
import LogoutButton from "./Logout";

function initials(name?: string) {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "U";
}

export default function Profile() {
  const { user } = useUser();
  const { recommended } = useRecommendation();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* animated gradient backdrop */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-fuchsia-100 to-pink-100 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Profile content */}
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* avatar + name */}
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

        {/* actions */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Action href="/login" label="Edit Profile" />
          <Action href="/aptitude" label="Retake Quiz" variant="outline" />
          <Action href="/courses" label="Explore Courses" />
          <Action href="/colleges" label="Explore Colleges" variant="outline" />
        </div>

        {/* ✅ Logout button */}
        <div className="mt-10 flex justify-center">
          <LogoutButton />
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
      className={`rounded-3xl border bg-card p-6 shadow-xl ${
        glow ? "ring-1 ring-indigo-400/40" : ""
      }`}
    >
      <p className="text-sm text-muted-foreground">{title}</p>
      <motion.p
        className={`mt-2 text-xl font-semibold ${
          glow ? "text-slate-900 dark:text-white" : ""
        }`}
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
    <motion.a
      href={href}
      whileHover={{
        scale: 1.05,
        textShadow: "0px 0px 8px rgba(99,102,241,0.8)",
        boxShadow: "0px 0px 16px rgba(236,72,153,0.6)",
      }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition ${
        variant === "solid"
          ? "bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white"
          : "border bg-card text-card-foreground"
      }`}
    >
      {label}
    </motion.a>
  );
}