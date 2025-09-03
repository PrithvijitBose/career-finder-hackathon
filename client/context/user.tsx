import { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = {
  name: string;
  age: string;
  gender: string;
  class: string;
  interests: string[];
};

type UserCtx = {
  user: User | null;
  setUser: (u: User | null) => void;
};

const Ctx = createContext<UserCtx | undefined>(undefined);

const KEY = "career_user";

function getInitial(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(getInitial);

  useEffect(() => {
    if (user) localStorage.setItem(KEY, JSON.stringify(user));
    else localStorage.removeItem(KEY);
  }, [user]);

  const value = useMemo(() => ({ user, setUser }), [user]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useUser() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useUser must be used within UserProvider");
  return v;
}
