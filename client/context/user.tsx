import { createContext, useContext, useEffect, useState } from "react";

type User = {
name: string;
  age: string;    // ✅ add this
  gender: string; // ✅ add this
  class: string;  // ✅ add this
  interests: string[];
};

type UserContextType = {
  user: User | null;
  setUser: (u: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  // ✅ Load user from localStorage on first mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Wrap setUser to also persist to localStorage
  const setUser = (u: User | null) => {
    setUserState(u);
    if (u) {
      localStorage.setItem("user", JSON.stringify(u));
    } else {
      localStorage.removeItem("user");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be inside UserProvider");
  return ctx;
};
