import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { useUser } from "@/context/user";

const interests = [
  "Engineering",
  "Medicine",
  "Arts",
  "Commerce",
  "Computer Science",
  "Design",
  "Law",
];

export default function Login() {
  const nav = useNavigate();
  const { theme, toggle } = useTheme();
  const { setUser } = useUser();
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    class: "",
    interests: [] as string[],
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const toggleInterest = (v: string) => {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(v)
        ? f.interests.filter((x) => x !== v)
        : [...f.interests, v],
    }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    nav("/aptitude");
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-indigo-200 via-fuchsia-200 to-pink-200 dark:from-[#0b1220] dark:via-[#0d0f1a] dark:to-[#151a2b]">
      {/* animated background blobs */}
      <motion.div
        className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-indigo-400/40 blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-pink-400/40 blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/30 blur-3xl"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:py-16">
        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="order-2 hidden lg:order-1 lg:block"
        >
          <svg
            viewBox="0 0 400 400"
            className="mx-auto h-[380px] w-[380px] drop-shadow-xl"
          >
            <defs>
              <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <circle cx="200" cy="200" r="160" fill="url(#g)" opacity="0.15" />
            <g fill="none" stroke="url(#g)" strokeWidth="4">
              <path d="M60 260 Q200 120 340 260" />
              <circle cx="200" cy="140" r="60" />
              <path d="M160 320 h80" />
            </g>
          </svg>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="order-1 lg:order-2"
        >
          <div className="mx-auto w-full max-w-lg rounded-3xl border border-white/20 bg-white/20 p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Start your journey
              </h1>
              <button
                onClick={toggle}
                aria-label="Toggle theme"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/30 text-slate-800 backdrop-blur transition hover:bg-white/50 dark:text-white/90 dark:hover:bg-white/10"
              >
                {theme === "dark" ? "🌙" : "☀️"}
              </button>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <Field label="Name">
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-slate-900 backdrop-blur placeholder:text-slate-600 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 dark:bg-white/10 dark:text-white dark:placeholder:text-white/70"
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Age">
                  <input
                    name="age"
                    type="number"
                    min={10}
                    max={100}
                    value={form.age}
                    onChange={onChange}
                    placeholder="16"
                    className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-slate-900 backdrop-blur outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 dark:bg-white/10 dark:text-white"
                  />
                </Field>
                <Field label="Gender">
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={onChange}
                    className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-slate-900 backdrop-blur outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 dark:bg-white/10 dark:text-white"
                  >
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Class">
                  <select
                    name="class"
                    value={form.class}
                    onChange={onChange}
                    className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-slate-900 backdrop-blur outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 dark:bg-white/10 dark:text-white"
                  >
                    <option value="">Select</option>
                    <option>Class 9</option>
                    <option>Class 10</option>
                    <option>Class 11</option>
                    <option>Class 12</option>
                    <option>Undergraduate</option>
                  </select>
                </Field>
                <Field label="Academic Interests">
                  <div className="flex flex-wrap gap-2">
                    {interests.map((v) => (
                      <button
                        type="button"
                        key={v}
                        onClick={() => toggleInterest(v)}
                        className={`rounded-full border px-3 py-1 text-sm backdrop-blur transition ${form.interests.includes(v) ? "border-indigo-400 bg-indigo-500/20 text-indigo-800 dark:text-indigo-200" : "border-white/30 bg-white/10 text-slate-800 dark:text-white/80"}`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(99,102,241,0.45)",
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="group relative mt-2 inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-600 px-6 py-3 text-white shadow-lg transition"
              >
                <span className="relative z-10 font-semibold">
                  Start Journey
                </span>
                <span className="absolute inset-0 scale-150 bg-white/20 opacity-0 blur-xl transition group-hover:opacity-100" />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-medium text-slate-800 dark:text-white/80">
      <span>{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
