import Link from "next/link";
import Image from "next/image";
import { REWARDS } from "@/lib/data";

export default function PizzapuntenStrip() {
  return (
    <section className="bg-green text-cream py-14 md:py-20 border-y-4 border-green-deep">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-9">
          <div className="lg:col-span-7">
            <div className="caps-sm text-yellow mb-3">🎁 Pizzapunten</div>
            <h2 className="display-bold text-cream text-[clamp(2.2rem,5vw,4.4rem)] leading-[0.94]">
              Eet, spaar, eet weer{" "}
              <span className="text-yellow">gratis.</span>
            </h2>
            <p className="mt-4 text-cream/80 text-base md:text-lg leading-relaxed max-w-xl">
              Iedere bestelling = punten. Verzilver ze tegen sides, kortingen of
              een hele gratis pizza. Members krijgen elke vrijdag extra acties.
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-yellow hover:brightness-105 text-ink rounded-full px-7 py-4 caps text-[0.7rem] tracking-[0.18em] font-bold transition lift"
            >
              Word gratis member →
            </Link>
          </div>
        </div>

        {/* Reward ladder */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {REWARDS.map((r, i) => (
            <article key={i} className="group bg-cream text-ink rounded-2xl p-3 transition hover:-translate-y-1 duration-300 lift">
              <div className="relative aspect-[5/4] rounded-xl overflow-hidden bg-green-soft mb-3">
                <Image src={r.image} alt={r.name} fill loading="lazy" sizes="(max-width: 768px) 50vw, 25vw" className="object-contain p-3" />
              </div>
              <div className="px-1 pb-1">
                <div className="display text-base md:text-lg leading-tight tracking-tight mb-1">{r.name}</div>
                <div className="flex items-center gap-2 caps-sm">
                  <span className="bg-green text-cream rounded-full px-2 py-0.5 text-[0.6rem] font-bold">
                    {r.points}p
                  </span>
                  <span className="text-ink-mute text-[0.6rem]">verzilver</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
