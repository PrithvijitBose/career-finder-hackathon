import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Compass,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { TiltCard } from "@/components/effects/TiltCard";
import { useEffect, useState } from "react";
import { ParallaxY } from "@/components/effects/Parallax";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { MouseGradient } from "@/components/effects/MouseGradient";
import { Magnetic } from "@/components/effects/Magnetic";

export default function Home({ onStartQuiz }: { onStartQuiz?: () => void }) {
  const rotatingStreams = ["Engineering", "Medical", "Commerce", "Arts", "IT"];
  const [streamIdx, setStreamIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setStreamIdx((v) => (v + 1) % rotatingStreams.length),
      2200,
    );
    return () => clearInterval(id);
  }, []);
  return (
    <div className="bg-gradient-to-b from-background to-secondary/40">
      <section className="relative overflow-hidden">
        {/* mouse-following glow */}
        <MouseGradient />
        <ParallaxY range={50}>
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"
          />
        </ParallaxY>
        <ParallaxY range={60}>
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl"
          />
        </ParallaxY>

        <MouseGradient>
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-sm text-foreground/70 backdrop-blur">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                <span>Find your perfect study path</span>
              </div>
              <motion.h1
                className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                Discover your strengths. Choose the right career path.
              </motion.h1>
              <ScrollReveal>
                <p className="max-w-xl text-lg text-muted-foreground">
                  Take our free aptitude quiz to get tailored stream suggestions,
                  explore courses, and discover top colleges across districts.
                </p>
              </ScrollReveal>
              <div className="flex flex-wrap items-center gap-4">
                <Magnetic>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onStartQuiz}
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-white shadow-lg transition hover:translate-y-[-1px] hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    Take Free Aptitude Quiz
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </Magnetic>
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 rounded-lg border border-indigo-200 bg-white px-6 py-3 text-indigo-700 transition hover:bg-indigo-50 hover:shadow"
                >
                  Learn more
                </a>
              </div>
              <div className="flex items-center gap-6 text-sm text-foreground/60">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" /> Accurate
                  insights
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-indigo-500" />
                  Personalized paths
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-pink-500" /> Free to
                  try
                </div>
              </div>
            </motion.div>

            <ParallaxY range={30}>
              <div className="relative">
                <TiltCard
                  className="group mx-auto aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-xl"
                  glare
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-indigo-50" />
                  <div className="relative grid h-full grid-cols-2 gap-6 p-6">
                    <motion.div
                      className="flex flex-col justify-between rounded-xl bg-indigo-600 p-5 text-white shadow-lg"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <div className="space-y-1">
                        <p className="text-sm/5 opacity-90">Recommended Stream</p>
                        <div className="h-8 sm:h-9 overflow-hidden">
                          <AnimatePresence mode="wait">
                            <motion.p
                              key={rotatingStreams[streamIdx]}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.4, ease: "easeOut" }}
                              className="text-2xl font-bold"
                            >
                              {rotatingStreams[streamIdx]}
                            </motion.p>
                          </AnimatePresence>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm opacity-90">
                          Based on your answers
                        </span>
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex flex-col justify-between rounded-xl border bg-card text-card-foreground p-5"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <div className="space-y-1">
                        <p className="text-sm/5 text-muted-foreground">
                          Next Step
                        </p>
                        <p className="text-xl font-semibold">Explore Courses</p>
                      </div>
                      <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                        <Compass className="h-5 w-5" /> View options
                      </div>
                    </motion.div>
                    <motion.div
                      className="col-span-2 rounded-xl border bg-card text-card-foreground p-5"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <div className="flex items-center gap-3">
                        <GraduationCap className="h-6 w-6 text-indigo-600" />
                        <div>
                          <p className="font-semibold">Top Colleges Near You</p>
                          <p className="text-sm text-muted-foreground">
                            Find colleges by district and compare details
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-3 text-indigo-700 dark:text-indigo-300">
                        <Building2 className="h-5 w-5" /> Browse Directory
                      </div>
                    </motion.div>
                  </div>
                </TiltCard>
              </div>
            </ParallaxY>
          </div>
        </div>
        </MouseGradient>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <ScrollReveal direction="up" delay={0.05}>
            <FeatureCard
              icon={<Compass className="h-6 w-6" />}
              title="Aptitude-based Guidance"
              desc="Short, smart quiz that maps your strengths to the right streams."
            />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.12}>
            <FeatureCard
              icon={<GraduationCap className="h-6 w-6" />}
              title="Course Explorer"
              desc="Filter by stream and explore curated courses with career paths."
            />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.18}>
            <FeatureCard
              icon={<Building2 className="h-6 w-6" />}
              title="College Directory"
              desc="Search by district to find colleges with key details and links."
            />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <TiltCard
      className="group rounded-2xl border bg-card text-card-foreground p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
      glare
    >
      <motion.div whileHover={{ scale: 1.05, rotate: -1 }} className="inline-flex rounded-lg bg-indigo-50 p-3 text-indigo-700 transition group-hover:bg-indigo-100 dark:bg-indigo-500/15 dark:text-indigo-300">
        {icon}
      </motion.div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{desc}</p>
    </TiltCard>
  );
}
