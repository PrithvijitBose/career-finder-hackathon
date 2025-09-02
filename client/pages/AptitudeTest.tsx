import { useEffect, useMemo, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, GraduationCap, RefreshCw } from "lucide-react";
import type { Stream } from "@/types/streams";
import { useRecommendation } from "@/context/recommendation";

type Question = {
  id: number;
  text: string;
  options: { label: string; weights: Partial<Record<Stream, number>> }[];
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Which activity do you enjoy the most?",
    options: [
      {
        label: "Solving puzzles or building things",
        weights: { Engineering: 2, IT: 1 },
      },
      {
        label: "Learning about the human body and health",
        weights: { Medicine: 2 },
      },
      { label: "Creating art, music, or writing", weights: { Arts: 2 } },
      {
        label: "Analyzing markets or managing money",
        weights: { Commerce: 2 },
      },
    ],
  },
  {
    id: 2,
    text: "Which subject excites you most?",
    options: [
      { label: "Math & Physics", weights: { Engineering: 2, IT: 1 } },
      { label: "Biology & Chemistry", weights: { Medicine: 2 } },
      { label: "Literature & History", weights: { Arts: 2 } },
      { label: "Economics & Business", weights: { Commerce: 2 } },
    ],
  },
  {
    id: 3,
    text: "How do you prefer to solve problems?",
    options: [
      { label: "Designing systems and models", weights: { Engineering: 2 } },
      {
        label: "Understanding people and improving wellbeing",
        weights: { Medicine: 2, Arts: 1 },
      },
      { label: "Expressing ideas creatively", weights: { Arts: 2 } },
      {
        label: "Using data to make decisions",
        weights: { Commerce: 2, IT: 1 },
      },
    ],
  },
  {
    id: 4,
    text: "Pick a project you'd love to work on",
    options: [
      { label: "Build a robot or app", weights: { Engineering: 2, IT: 2 } },
      { label: "Volunteer at a clinic", weights: { Medicine: 2 } },
      { label: "Produce a short film", weights: { Arts: 2 } },
      { label: "Start a small business", weights: { Commerce: 2 } },
    ],
  },
  {
    id: 5,
    text: "Which environment suits you best?",
    options: [
      { label: "Lab or workshop", weights: { Engineering: 2, Medicine: 1 } },
      { label: "Hospital or research center", weights: { Medicine: 2 } },
      { label: "Studio or stage", weights: { Arts: 2 } },
      { label: "Office or trading floor", weights: { Commerce: 2 } },
    ],
  },
  {
    id: 6,
    text: "Pick the skill you'd like to master",
    options: [
      { label: "Coding & algorithms", weights: { IT: 2, Engineering: 1 } },
      { label: "Patient care & diagnosis", weights: { Medicine: 2 } },
      { label: "Storytelling & design", weights: { Arts: 2 } },
      { label: "Financial analysis", weights: { Commerce: 2 } },
    ],
  },
];

export default function AptitudeTest({
  onExploreCourses,
  onBrowseColleges,
}: {
  onExploreCourses?: () => void;
  onBrowseColleges?: () => void;
}) {
  const { setRecommended } = useRecommendation();
  const [step, setStep] = useState(0); // 0..QUESTIONS.length, where last is results
  const [scores, setScores] = useState<Record<Stream, number>>({
    Engineering: 0,
    Medicine: 0,
    Arts: 0,
    Commerce: 0,
    IT: 0,
  });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const percent = Math.round(
    (Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100,
  );

  useEffect(() => {
    setSelectedIndex(null);
  }, [step]);

  const onSelect = (optionIndex: number) => {
    if (step >= QUESTIONS.length) return;
    setSelectedIndex(optionIndex);
    const option = QUESTIONS[step].options[optionIndex];
    setScores((prev) => {
      const next = { ...prev };
      for (const [k, v] of Object.entries(option.weights))
        next[k as Stream] = (next[k as Stream] || 0) + (v as number);
      return next;
    });
    setTimeout(() => setStep((s) => s + 1), 450); // auto-next
  };

  const reset = () => {
    setStep(0);
    setScores({ Engineering: 0, Medicine: 0, Arts: 0, Commerce: 0, IT: 0 });
    setSelectedIndex(null);
    setRecommended(null);
  };

  const result = useMemo(() => {
    const entries = Object.entries(scores) as [Stream, number][];
    return entries.sort((a, b) => b[1] - a[1])[0][0];
  }, [scores]);

  useEffect(() => {
    if (step >= QUESTIONS.length) setRecommended(result);
  }, [step, result, setRecommended]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-foreground/70">
          <GraduationCap className="h-4 w-4 text-indigo-600" /> Aptitude Quiz
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground/60">
          <span>
            {Math.min(step, QUESTIONS.length)} / {QUESTIONS.length}
          </span>
        </div>
      </div>

      <Progress value={percent} className="h-3" />

      {step < QUESTIONS.length ? (
        <div className="mt-8">
          <p className="text-lg font-semibold text-slate-900">
            {QUESTIONS[step].text}
          </p>
          <div className="mt-5 grid gap-3">
            {QUESTIONS[step].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => onSelect(i)}
                className={
                  "flex items-center justify-between rounded-xl border bg-card px-4 py-3 text-left transition hover:border-indigo-300 hover:bg-indigo-50/30 " +
                  (selectedIndex === i ? "border-indigo-400 bg-indigo-50/40 dark:bg-white/10" : "")
                }
              >
                <span className="text-card-foreground">{opt.label}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <button
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm text-foreground/80 transition hover:bg-secondary disabled:opacity-50"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white transition hover:bg-indigo-500 disabled:opacity-50"
              onClick={() => setStep((s) => Math.min(QUESTIONS.length, s + 1))}
              disabled={selectedIndex === null}
            >
              Next <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border bg-card text-card-foreground p-6 text-center shadow-sm">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm text-indigo-700">
            Your recommended stream
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
            {result}
          </h2>
          <p className="mx-auto mt-2 max-w-prose text-muted-foreground">
            Based on your answers, <span className="font-medium">{result}</span>{" "}
            aligns strongly with your interests and strengths.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onExploreCourses}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-white transition hover:bg-indigo-500"
            >
              Explore Courses
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onBrowseColleges}
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 transition hover:bg-secondary"
            >
              Browse Colleges
            </button>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 transition hover:bg-secondary"
            >
              <RefreshCw className="h-4 w-4" /> Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
