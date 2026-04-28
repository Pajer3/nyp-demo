import Image from "next/image";
import Link from "next/link";
import { STATS } from "@/lib/data";

export const metadata = { title: "Over ons — New York Pizza" };

const STORY = [
  { n: "01", year: "1993", title: "Eerste oven aan", text: "De eerste New York Pizza opent zijn deuren. Eén oven, één recept, één obsessie: het deeg." },
  { n: "02", year: "2003", title: "It's the dough.", text: "Het signature recept blijft hetzelfde sinds dag één — vers gemaakt, 24u gerust, knapperige bodem." },
  { n: "03", year: "2018", title: "App lancering", text: "Bestel met één tap je vorige order. Pizzapunten verdienen wordt net zo simpel als pizza eten." },
  { n: "04", year: "2026", title: "200+ vestigingen", text: "Van Amsterdam tot Maastricht — overal binnen 28 minuten op je tafel. It's still the dough." },
];

export default function OverOnsPage() {
  return (
    <>
      <section className="bg-green text-cream py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="caps-sm text-yellow mb-2">Over New York Pizza</div>
          <h1 className="display-bold text-[clamp(2.6rem,7vw,7rem)] leading-[0.94]">
            33 jaar.
            <br />
            <span className="text-yellow">Eén obsessie.</span>
          </h1>
          <p className="mt-6 text-cream/85 text-base md:text-xl leading-relaxed max-w-2xl">
            Sinds 1993 maken we vers gemaakte 30cm NY-style pizza&apos;s — niet omdat het kan,
            maar omdat het deeg zo hoort. <span className="font-bold">It&apos;s the dough.</span>
          </p>
        </div>
      </section>

      <section className="bg-cream py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-14">
            {STATS.map((s) => (
              <div key={s.label} className="bg-paper border border-line rounded-2xl p-6 text-center">
                <div className="display-bold text-green-deep text-3xl md:text-5xl leading-none mb-2">{s.n}</div>
                <div className="caps-sm text-ink-mute">{s.label}</div>
              </div>
            ))}
          </div>

          <h2 className="display text-3xl md:text-5xl mb-8 max-w-2xl">
            Onze tijdlijn — <span className="text-green-deep">van één oven tot 200+.</span>
          </h2>

          <div className="space-y-5">
            {STORY.map((s) => (
              <article key={s.n} className="grid md:grid-cols-12 gap-5 items-start bg-paper border border-line rounded-2xl p-6">
                <div className="md:col-span-2">
                  <div className="mono text-green-deep text-sm">{s.n} · {s.year}</div>
                </div>
                <div className="md:col-span-10">
                  <div className="display text-2xl md:text-3xl mb-2">{s.title}</div>
                  <p className="text-ink-soft leading-relaxed max-w-2xl">{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-green-deep text-cream py-14 md:py-20">
        <div className="max-w-[900px] mx-auto px-4 md:px-8 text-center">
          <h2 className="display-bold text-[clamp(2rem,5vw,4rem)] leading-[0.96] mb-4">
            Bouw mee aan het verhaal.
          </h2>
          <p className="text-cream/80 mb-8 text-lg">Word franchisenemer, kom werken bij ons, of word gewoon klant — alle drie het overwegen waard.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/franchise" className="bg-yellow text-ink hover:brightness-105 rounded-full px-7 py-3.5 caps text-[0.66rem] font-bold transition">Word franchisenemer →</Link>
            <Link href="/menu" className="bg-cream/10 hover:bg-cream/20 border border-cream/30 rounded-full px-7 py-3.5 caps text-[0.66rem] font-bold transition">Bestel een pizza</Link>
          </div>
        </div>
      </section>
    </>
  );
}
