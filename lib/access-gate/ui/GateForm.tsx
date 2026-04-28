"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export type GateFormProps = {
  /** Site / brand name shown in the heading (e.g., "New York Pizza"). */
  brandName?: string;
  /** Sub-line under heading. */
  tagline?: string;
  /** Optional brand mark above heading. */
  logo?: React.ReactNode;
  /** Tailwind color class (default: bg-green) for primary button + accents. */
  accentBg?: string;
  /** Tailwind hover variant. */
  accentBgHover?: string;
  /** Tailwind text-color for accent (default: text-cream). */
  accentText?: string;
};

export function GateForm({
  brandName = "Demo",
  tagline = "Privé concept-site · alleen op uitnodiging",
  logo,
  accentBg = "bg-green",
  accentBgHover = "hover:bg-green-deep",
  accentText = "text-cream",
}: GateFormProps) {
  const router = useRouter();
  const sp = useSearchParams();
  const from = sp.get("from") || "/";
  const [code, setCode] = useState("");
  const [err, setErr] = useState<string>();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(undefined);
    if (!code.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim(), from }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        // Hard navigation so the new cookie is read by middleware on the next request.
        window.location.href = from;
        return;
      }
      setErr(data.error ?? "Er ging iets mis. Probeer opnieuw.");
    } catch {
      setErr("Verbinding mislukt. Probeer opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-cream px-4 py-10">
      <div className="max-w-md w-full">
        <div className="bg-paper rounded-3xl border border-line p-8 md:p-10 lift">
          {logo && <div className="flex justify-center mb-6">{logo}</div>}
          <div className="caps-sm text-center mb-2 text-ink-mute">{tagline}</div>
          <h1 className="display text-3xl md:text-4xl text-center mb-2 tracking-tight">
            {brandName}
          </h1>
          <p className="text-ink-mute text-center text-sm mb-7 max-w-xs mx-auto">
            Vul de code in die je per mail of LinkedIn van Syntarie hebt gekregen.
          </p>

          <form onSubmit={onSubmit} className="space-y-3" noValidate>
            <label className="block">
              <span className="caps-xs text-ink-mute mb-1.5 block">Toegangscode</span>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="••••••"
                autoComplete="off"
                spellCheck={false}
                autoFocus
                aria-invalid={!!err}
                className={`w-full px-4 py-3.5 rounded-xl border bg-cream outline-none text-base font-mono tracking-[0.18em] transition ${
                  err ? "border-rood" : "border-line focus:border-green"
                }`}
                maxLength={64}
                required
              />
            </label>

            {err && (
              <div className="bg-rood/10 text-rood-deep border border-rood/20 rounded-lg px-3 py-2 text-sm" role="alert">
                {err}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || code.trim().length === 0}
              className={`w-full ${accentBg} ${accentBgHover} ${accentText} rounded-full py-3.5 caps text-[0.66rem] tracking-[0.18em] font-bold transition disabled:opacity-60 lift-green`}
            >
              {loading ? "Even kijken..." : "Toegang krijgen →"}
            </button>
          </form>

          <div className="mt-6 caps-xs text-center text-ink-mute leading-relaxed">
            🔒 Privé demo. Geen code? Bel of mail{" "}
            <a href="mailto:hello@syntarie.com" className="text-green-deep font-bold underline-offset-2 hover:underline">
              hello@syntarie.com
            </a>
          </div>
        </div>

        <div className="mt-6 text-center caps-xs text-ink-mute">
          door <a href="https://syntarie.com" className="hover:text-ink underline-offset-2 hover:underline">Syntarie</a>
        </div>
      </div>
    </section>
  );
}
