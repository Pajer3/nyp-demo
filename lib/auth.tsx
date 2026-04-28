"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

export type User = {
  email: string;
  name: string;
  points: number;
  joinedAt: string;
  orders: string[]; // order IDs
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (data: { email: string; name: string; password: string }) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  addPoints: (n: number) => void;
  recordOrder: (orderId: string) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "nyp_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  const persist = useCallback((u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    if (!email.includes("@")) return { ok: false, error: "Ongeldig e-mailadres" };
    if (_password.length < 4) return { ok: false, error: "Wachtwoord te kort (min. 4 tekens)" };
    // Fake: accept anything; if existing user with this email, restore; else create
    const existing = (() => {
      try {
        const all = JSON.parse(localStorage.getItem("nyp_users") || "{}");
        return all[email.toLowerCase()] as User | undefined;
      } catch { return undefined; }
    })();
    const u: User = existing ?? {
      email,
      name: email.split("@")[0].replace(/\W/g, " "),
      points: 50,
      joinedAt: new Date().toISOString(),
      orders: [],
    };
    persist(u);
    return { ok: true };
  }, [persist]);

  const register = useCallback(async ({ email, name, password }: { email: string; name: string; password: string }) => {
    if (!email.includes("@")) return { ok: false, error: "Ongeldig e-mailadres" };
    if (name.trim().length < 2) return { ok: false, error: "Naam te kort" };
    if (password.length < 4) return { ok: false, error: "Wachtwoord te kort (min. 4 tekens)" };
    const u: User = {
      email,
      name: name.trim(),
      points: 100, // welcome bonus
      joinedAt: new Date().toISOString(),
      orders: [],
    };
    try {
      const all = JSON.parse(localStorage.getItem("nyp_users") || "{}");
      all[email.toLowerCase()] = u;
      localStorage.setItem("nyp_users", JSON.stringify(all));
    } catch { /* ignore */ }
    persist(u);
    return { ok: true };
  }, [persist]);

  const logout = useCallback(() => persist(null), [persist]);

  const addPoints = useCallback((n: number) => {
    if (!user) return;
    const u = { ...user, points: user.points + n };
    persist(u);
    try {
      const all = JSON.parse(localStorage.getItem("nyp_users") || "{}");
      all[u.email.toLowerCase()] = u;
      localStorage.setItem("nyp_users", JSON.stringify(all));
    } catch { /* ignore */ }
  }, [user, persist]);

  const recordOrder = useCallback((orderId: string) => {
    if (!user) return;
    const u = { ...user, orders: [orderId, ...user.orders].slice(0, 25) };
    persist(u);
    try {
      const all = JSON.parse(localStorage.getItem("nyp_users") || "{}");
      all[u.email.toLowerCase()] = u;
      localStorage.setItem("nyp_users", JSON.stringify(all));
    } catch { /* ignore */ }
  }, [user, persist]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, addPoints, recordOrder }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth outside AuthProvider");
  return ctx;
}
