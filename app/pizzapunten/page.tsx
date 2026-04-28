"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { REWARDS } from "@/lib/data";

const HOW = [
  { n: "1", title: "Bestel", text: "Iedere euro = 1 punt. Vrijdag dubbele punten." },
  { n: "2", title: "Spaar", text: "Punten lopen automatisch op — geen gedoe." },
  { n: "3", title: "Verzilver", text: "Wissel ze in voor sides, kortingen of een gratis pizza." },
];

export default function PizzapuntenPage() {
  const { user } = useAuth();

  return (
    <>
      <section className="bg-yellow text-ink py-14 md:py-20 border-y-4 border-ink">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="caps-sm text-green-deep mb-2">🎁 Pizzapunten</div>
          <h1 className="display-bold text-[clamp(2.6rem,7vw,7rem)] leading-[0.94]">
            Eet, spaar,{" "}
            <span className="text-green-deep">eet weer gratis.</span>
          </h1>
          <p className="mt-5 text-ink/80 text-base md:text-xl max-w-2xl leading-relaxed">
            Voor iedereen met een NYP-account. Geen kaartje, geen gedoe — automatisch gespaard.
          </p>

          {user ? (
            <div className="mt-8 inline-flex items-center gap-3 bg-ink text-cream rounded-full pl-2 pr-6 py-2 lift">
              <span className="w-9 h-9 rounded-full bg-green text-cream flex items-center justify-center display text-base">
                {user.points}
              </span>
              <span className="caps text-[0.66rem]">jouw saldo</span>
            </div>
          ) : (
            <div className="mt-8 flex gap-3 flex-wrap">
              <Link href="/register" className="bg-green hover:bg-green-deep text-cream rounded-full px-7 py-3.5 caps text-[0.66rem] font-bold transition">
                Word gratis member →
              </Link>
              <Link href="/login" className="border-2 border-ink hover:bg-ink hover:text-cream rounded-full px-7 py-3 caps text-[0.66rem] font-bold transition">
                Inloggen
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="bg-cream py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="caps-sm text-green-deep mb-2">Hoe werkt het?</div>
          <h2 className="display text-3xl md:text-5xl mb-8">In drie stappen.</h2>

          <div className="grid md:grid-cols-3 gap-4 mb-14">
            {HOW.map((h) => (
              <article key={h.n} className="bg-paper rounded-2xl border border-line p-7">
                <div className="display-bold text-green-deep text-5xl mb-4">{h.n}</div>
                <div className="display text-2xl mb-2">{h.title}</div>
                <p className="text-ink-soft text-sm leading-relaxed">{h.text}</p>
              </article>
            ))}
          </div>

          <h2 className="display text-3xl md:text-5xl mb-6">
            Verzilver punten voor:
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {REWARDS.map((r) => (
              <article key={r.points} className="bg-paper rounded-2xl border border-line p-3">
                <div className="relative aspect-[5/4] rounded-xl overflow-hidden bg-green-soft mb-3">
                  <Image src={r.image} alt={r.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-contain p-2" />
                </div>
                <div className="display text-lg leading-tight">{r.name}</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="caps-xs bg-green text-cream rounded-full px-2.5 py-1 font-bold">{r.points}p</span>
                  <span className="caps-xs text-ink-mute">verzilver</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
