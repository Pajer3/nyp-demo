"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import Logo from "@/components/Logo";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string>();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(undefined);
    setLoading(true);
    const res = await register({ email, name, password });
    setLoading(false);
    if (!res.ok) setErr(res.error);
    else router.push("/account?welcome=1");
  }

  return (
    <section className="min-h-[80vh] flex items-center bg-cream py-10 px-4">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-paper rounded-3xl border border-line p-8 md:p-10 lift">
          <div className="flex justify-center mb-6"><Logo size={120} /></div>
          <div className="caps-sm text-green-deep text-center mb-2">Word lid · gratis</div>
          <h1 className="display text-3xl md:text-4xl text-center mb-2 tracking-tight">Aanmelden</h1>
          <p className="text-center text-ink-mute text-sm mb-7">
            <span className="bg-yellow/40 text-ink px-2 py-0.5 rounded font-bold">+ 100 pizzapunten welkomstbonus</span>
          </p>

          <form onSubmit={onSubmit} className="space-y-3">
            <label className="block">
              <span className="caps-xs text-ink-mute mb-1.5 block">Naam</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Je voornaam"
                className="w-full px-4 py-3 rounded-xl border border-line bg-cream focus:border-green outline-none"
                required
              />
            </label>
            <label className="block">
              <span className="caps-xs text-ink-mute mb-1.5 block">E-mailadres</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jij@email.nl"
                className="w-full px-4 py-3 rounded-xl border border-line bg-cream focus:border-green outline-none"
                required
              />
            </label>
            <label className="block">
              <span className="caps-xs text-ink-mute mb-1.5 block">Wachtwoord</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 4 tekens"
                className="w-full px-4 py-3 rounded-xl border border-line bg-cream focus:border-green outline-none"
                required
              />
            </label>

            {err && (
              <div className="bg-rood/10 text-rood-deep border border-rood/20 rounded-lg px-3 py-2 text-sm">{err}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green hover:bg-green-deep text-cream rounded-full py-3.5 caps text-[0.66rem] tracking-[0.16em] font-bold transition disabled:opacity-60 lift-green"
            >
              {loading ? "Aanmaken..." : "Account aanmaken →"}
            </button>
          </form>

          <div className="mt-6 caps-xs text-center text-ink-mute">
            Al een account?{" "}
            <Link href="/login" className="text-green-deep font-bold underline-offset-2 hover:underline">
              Inloggen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
