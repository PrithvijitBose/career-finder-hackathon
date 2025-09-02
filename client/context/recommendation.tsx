import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Stream } from "@/types/streams";

type RecContext = {
  recommended: Stream | null;
  setRecommended: (s: Stream | null) => void;
};

const Ctx = createContext<RecContext | undefined>(undefined);

function getInitial(): Stream | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem("recommendedStream");
  return v && ["Engineering","Medicine","Arts","Commerce","IT"].includes(v) ? (v as Stream) : null;
}

export function RecommendationProvider({ children }: { children: React.ReactNode }) {
  const [recommended, setRecommended] = useState<Stream | null>(getInitial);

  useEffect(() => {
    if (recommended) localStorage.setItem("recommendedStream", recommended);
    else localStorage.removeItem("recommendedStream");
  }, [recommended]);

  const value = useMemo(() => ({ recommended, setRecommended }), [recommended]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useRecommendation() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useRecommendation must be used within RecommendationProvider");
  return v;
}
