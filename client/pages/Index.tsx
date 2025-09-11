import React, { useEffect, useState } from "react";
import Spline from '@splinetool/react-spline';
import {
  ArrowRight,
  Building2,
  Compass,
  GraduationCap,
  Sparkles,
} from "lucide-react";

// Define the props interface for the Home component
interface HomeProps {
  onStartQuiz: () => void;
}

// FeatureCard component, used only within this file
function FeatureCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: string }) {
  return (
    <div 
      className="group rounded-3xl bg-black/60 backdrop-blur-xl border border-white/30 p-8 shadow-2xl transition-all hover:bg-black/70 hover:scale-105 hover:-translate-y-2 hover:rotate-1 animate-[fadeInUp_0.8s_ease-out_var(--delay)_both]"
      style={{ '--delay': delay } as React.CSSProperties}
    >
      <div className="inline-flex rounded-2xl bg-gradient-to-r from-cyan-500/30 to-blue-500/30 p-4 text-cyan-300 transition-all group-hover:from-cyan-400/40 group-hover:to-blue-400/40 group-hover:shadow-lg group-hover:shadow-cyan-400/50 group-hover:scale-110 group-hover:rotate-3">
        {icon}
      </div>
      <h3 className="mt-6 text-2xl font-bold text-white drop-shadow-lg">{title}</h3>
      <p className="mt-3 text-lg text-gray-200 leading-relaxed drop-shadow-md">{desc}</p>
    </div>
  );
}

const Home: React.FC<HomeProps> = ({ onStartQuiz }) => {
  const rotatingStreams = ["Engineering", "Medical", "Commerce", "Arts", "IT"];
  const [streamIdx, setStreamIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const id = setInterval(
      () => setStreamIdx((v) => (v + 1) % rotatingStreams.length),
      2200,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Spline 3D Background */}
      <div className="fixed inset-0 z-0">
        <Spline scene="https://prod.spline.design/yHGAF9Pcgd5xCtdO/scene.splinecode" />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center">
          {/* Stronger glassmorphism overlay for better readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 backdrop-blur-sm" />
          
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24 w-full">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              {/* Left Content */}
              <div className="space-y-8 z-20 animate-[fadeInUp_0.8s_ease-out]">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full bg-black/60 border border-white/40 px-4 py-2 text-sm text-white backdrop-blur-md animate-[fadeIn_0.6s_ease-out_0.2s_both] drop-shadow-lg">
                  <Sparkles className="h-4 w-4 text-yellow-400 drop-shadow-md" />
                  <span className="font-medium drop-shadow-md">Find your perfect study path</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
                  <span className="block pb-2 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">Discover your</span>
                  <span className="block bg-gradient-to-r from-cyan-300 via-blue-200 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] pb-2" style={{ textShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}>
                    strengths.
                  </span>
                  <span className="block pb-2 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">Choose the right</span>
                  <span className="block text-yellow-200 pb-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" style={{ textShadow: '0 0 30px rgba(251, 191, 36, 0.5)' }}>career path.</span>
                </h1>

                {/* Description */}
                <p className="max-w-xl text-xl text-gray-200 leading-relaxed backdrop-blur-sm animate-[fadeInUp_0.8s_ease-out_0.5s_both] drop-shadow-lg">
                  Take our free aptitude quiz to get tailored stream suggestions, 
                  explore courses, and discover top colleges across districts.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 animate-[fadeInUp_0.8s_ease-out_0.7s_both]">
                  <button
                    onClick={onStartQuiz}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-blue-500/50 transition-all hover:scale-105 hover:shadow-blue-500/60 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-400/50 active:scale-95 drop-shadow-xl"
                  >
                    Take Free Aptitude Quiz
                    <ArrowRight className={`h-6 w-6 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                  </button>
                  
                  <a
                    href="#features"
                    className="inline-flex items-center gap-3 rounded-2xl bg-black/60 border border-white/30 px-8 py-4 text-lg font-semibold text-white backdrop-blur-md transition-all hover:bg-black/70 hover:shadow-lg hover:scale-105 drop-shadow-lg"
                  >
                    Learn more
                  </a>
                </div>

                {/* Status Indicators */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-200 animate-[fadeIn_0.8s_ease-out_0.9s_both]">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-400 shadow-lg shadow-green-400/60 animate-pulse" />
                    <span className="font-medium drop-shadow-md">Accurate insights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-400 shadow-lg shadow-blue-400/60 animate-pulse" style={{ animationDelay: '0.3s' }} />
                    <span className="font-medium drop-shadow-md">Personalized paths</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-pink-400 shadow-lg shadow-pink-400/60 animate-pulse" style={{ animationDelay: '0.6s' }} />
                    <span className="font-medium drop-shadow-md">Free to try</span>
                  </div>
                </div>
              </div>

              {/* Right Content - Interactive Dashboard */}
              <div className="relative animate-[fadeInRight_0.8s_ease-out_0.4s_both]">
                <div className="group mx-auto aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-3xl bg-black/60 backdrop-blur-xl border border-white/30 shadow-2xl transition-all hover:scale-105 hover:rotate-1">
                  <div className="relative grid h-full grid-cols-2 gap-6 p-6">
                    {/* Recommended Stream Card */}
                    <div className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 p-6 text-white shadow-2xl transition-all hover:scale-[1.02] hover:shadow-blue-500/60 animate-[slideInUp_0.6s_ease-out_0.6s_both]">
                      <div className="space-y-2">
                        <p className="text-sm font-medium opacity-90 drop-shadow-md">
                          Recommended Stream
                        </p>
                        <div className="h-12 overflow-hidden">
                          <p
                            key={rotatingStreams[streamIdx]}
                            className="text-2xl font-black animate-[streamRotate_0.5s_ease-out] drop-shadow-lg"
                          >
                            {rotatingStreams[streamIdx]}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium opacity-90 drop-shadow-md">
                          Based on your answers
                        </span>
                        <ArrowRight className="h-5 w-5 animate-[slideRight_1.5s_ease-in-out_infinite] drop-shadow-md" />
                      </div>
                    </div>

                    {/* Next Step Card */}
                    <div className="flex flex-col justify-between rounded-2xl bg-black/70 backdrop-blur-md border border-white/40 p-6 text-white transition-all hover:scale-[1.02] hover:bg-black/80 animate-[slideInUp_0.6s_ease-out_0.8s_both]">
                      <div className="space-y-2">
                        <p className="text-sm font-medium opacity-90 drop-shadow-md">
                          Next Step
                        </p>
                        <p className="text-xl font-bold drop-shadow-lg">
                          Explore Courses
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-cyan-300">
                        <Compass className="h-5 w-5 drop-shadow-md" />
                        <span className="font-semibold drop-shadow-md">View options</span>
                      </div>
                    </div>

                    {/* Colleges Card */}
                    <div className="col-span-2 rounded-2xl bg-black/70 backdrop-blur-md border border-white/40 p-6 text-white transition-all hover:scale-[1.02] hover:bg-black/80 animate-[slideInUp_0.6s_ease-out_1s_both]">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 p-3 animate-[glow_2s_ease-in-out_infinite]">
                          <GraduationCap className="h-8 w-8 text-white drop-shadow-md" />
                        </div>
                        <div>
                          <p className="text-xl font-bold drop-shadow-lg">
                            Top Colleges Near You
                          </p>
                          <p className="text-sm opacity-90 mt-1 drop-shadow-md">
                            Find colleges by district and compare details
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-3 text-yellow-300">
                        <Building2 className="h-5 w-5 drop-shadow-md" />
                        <span className="font-semibold drop-shadow-md">Browse Directory</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative py-20">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-16 animate-[fadeInUp_0.8s_ease-out]">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 pb-2 drop-shadow-xl">
                Everything you need to
                <span className="block bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent pb-2 drop-shadow-xl" style={{ textShadow: '0 0 40px rgba(59, 130, 246, 0.6)' }}>
                  make the right choice
                </span>
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <FeatureCard
                icon={<Compass className="h-8 w-8" />}
                title="Aptitude-based Guidance"
                desc="Short, smart quiz that maps your strengths to the right streams."
                delay="0.2s"
              />
              <FeatureCard
                icon={<GraduationCap className="h-8 w-8" />}
                title="Course Explorer"
                desc="Filter by stream and explore curated courses with career paths."
                delay="0.4s"
              />
              <FeatureCard
                icon={<Building2 className="h-8 w-8" />}
                title="College Directory"
                desc="Search by state to find colleges with key details and links."
                delay="0.6s"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Custom animations & Style overrides */}
      <style>{`
        /* Hides the Spline logo and watermarks. 
          Please be aware that removing branding might violate Spline's Terms of Service.
        */
        #logo,
        [class*="watermark"],
        [class*="spline-watermark"],
        [id*="watermark"],
        a[href*="spline.design"] {
          display: none !important;
          visibility: hidden !important;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        @keyframes streamRotate {
          from { opacity: 0; transform: translateY(20px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.4); }
          50% { box-shadow: 0 0 30px rgba(251, 191, 36, 0.6), 0 0 40px rgba(251, 191, 36, 0.4); }
        }
        @keyframes cardHover {
          from { transform: translateY(0) rotateY(0deg); }
          to { transform: translateY(-8px) rotateY(5deg); }
        }
      `}</style>
    </div>
  );
};

export default Home;

