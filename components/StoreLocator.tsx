"use client";

import { useState } from "react";
import Link from "next/link";
import { STORES_PREVIEW, STATS } from "@/lib/data";

export default function StoreLocator() {
  const [postcode, setPostcode] = useState("");
  return (
    <section className="bg-cream py-12 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="bg-green text-cream rounded-3xl p-6 sm:p-8 md:p-12 lg:p-14 grid lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          {/* Decorative green pattern */}
          <div aria-hidden className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-green-deep/40 pointer-events-none" />
          <div aria-hidden className="absolute -bottom-20 -left-20 w-[260px] h-[260px] rounded-full bg-green-glow/30 pointer-events-none" />

          <div className="lg:col-span-7 relative z-10">
            <div className="caps-sm text-yellow mb-3 inline-flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" fill="#009a44" /></svg>
              Vind een vestiging
            </div>
            <h2 className="display-bold text-[clamp(2rem,4vw,3.6rem)] leading-[0.96] mb-4">
              200+ vestigingen.
              <br />
              <span className="text-yellow">Ééntje om de hoek.</span>
            </h2>

            <form
              onSubmit={(e) => { e.preventDefault(); }}
              className="bg-cream rounded-full p-1.5 flex items-center gap-2 max-w-md mt-6"
            >
              <span className="pl-4 text-green-deep">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z" stroke="currentColor" strokeWidth="1.7" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Bijv. 1012 AB"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="flex-1 bg-transparent outline-none px-2 py-2.5 text-ink placeholder:text-ink-mute text-sm"
              />
              <button type="submit" className="bg-green hover:bg-green-deep text-cream rounded-full px-5 py-2.5 caps text-[0.65rem] transition">
                Zoek →
              </button>
            </form>

            <div className="mt-6 flex flex-wrap gap-2">
              {STORES_PREVIEW.slice(0, 8).map((c) => (
                <Link
                  key={c}
                  href={`/winkels/${c.toLowerCase()}`}
                  className="caps-sm bg-cream/15 hover:bg-cream/25 border border-cream/25 text-cream rounded-full px-3.5 py-1.5 transition text-[0.6rem]"
                >
                  {c}
                </Link>
              ))}
              <Link
                href="/winkels"
                className="caps-sm bg-yellow text-ink hover:brightness-95 rounded-full px-3.5 py-1.5 transition text-[0.6rem] font-bold"
              >
                Alle 200+ →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative z-10 grid grid-cols-2 gap-3 md:gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-2xl p-5">
                <div className="display-bold text-yellow text-3xl md:text-4xl leading-none mb-2">{s.n}</div>
                <div className="caps-sm text-cream/80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
