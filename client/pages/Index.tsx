import { ArrowRight, Building2, Compass, GraduationCap, Sparkles } from "lucide-react";

export default function Home({ onStartQuiz }: { onStartQuiz?: () => void }) {
  return (
    <div className="bg-gradient-to-b from-background to-secondary/40">
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-sm text-foreground/70 backdrop-blur">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                <span>Find your perfect study path</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Discover your strengths. Choose the right career path.
              </h1>
              <p className="max-w-xl text-lg text-foreground/70">
                Take our free aptitude quiz to get tailored stream suggestions, explore courses, and discover top colleges across districts.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onStartQuiz}
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-white shadow-lg transition hover:translate-y-[-1px] hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  Take Free Aptitude Quiz
                  <ArrowRight className="h-5 w-5" />
                </button>
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 rounded-lg border border-indigo-200 bg-white px-6 py-3 text-indigo-700 transition hover:bg-indigo-50"
                >
                  Learn more
                </a>
              </div>
              <div className="flex items-center gap-6 text-sm text-foreground/60">
                <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-green-500" /> Accurate insights</div>
                <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-indigo-500" /> Personalized paths</div>
                <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-pink-500" /> Free to try</div>
              </div>
            </div>

            <div className="relative">
              <div className="mx-auto aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-2xl border bg-white shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-indigo-50" />
                <div className="relative grid h-full grid-cols-2 gap-6 p-6">
                  <div className="flex flex-col justify-between rounded-xl bg-indigo-600 p-5 text-white shadow-lg">
                    <div className="space-y-1">
                      <p className="text-sm/5 opacity-90">Recommended Stream</p>
                      <p className="text-2xl font-bold">Engineering</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm opacity-90">Based on your answers</span>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between rounded-xl border bg-white p-5">
                    <div className="space-y-1">
                      <p className="text-sm/5 text-foreground/70">Next Step</p>
                      <p className="text-xl font-semibold">Explore Courses</p>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-700">
                      <Compass className="h-5 w-5" /> View options
                    </div>
                  </div>
                  <div className="col-span-2 rounded-xl border bg-white p-5">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-6 w-6 text-indigo-600" />
                      <div>
                        <p className="font-semibold">Top Colleges Near You</p>
                        <p className="text-sm text-foreground/60">Find colleges by district and compare details</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-3 text-indigo-700">
                      <Building2 className="h-5 w-5" /> Browse Directory
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={<Compass className="h-6 w-6" />}
            title="Aptitude-based Guidance"
            desc="Short, smart quiz that maps your strengths to the right streams."
          />
          <FeatureCard
            icon={<GraduationCap className="h-6 w-6" />}
            title="Course Explorer"
            desc="Filter by stream and explore curated courses with career paths."
          />
          <FeatureCard
            icon={<Building2 className="h-6 w-6" />}
            title="College Directory"
            desc="Search by district to find colleges with key details and links."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="group rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <div className="inline-flex rounded-lg bg-indigo-50 p-3 text-indigo-700 transition group-hover:bg-indigo-100">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-foreground/70">{desc}</p>
    </div>
  );
}
