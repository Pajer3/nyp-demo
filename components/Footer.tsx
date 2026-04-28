import Link from "next/link";
import Image from "next/image";
import { BRAND } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/75 pb-24 lg:pb-0">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-14 pb-8">
        <div className="grid md:grid-cols-12 gap-10 pb-10 border-b border-cream/10">
          <div className="md:col-span-5">
            <div className="bg-cream rounded-2xl inline-block p-3 lift">
              <Image
                src="/assets/brand/nyp-logo.svg"
                alt="New York Pizza"
                width={130}
                height={40}
              />
            </div>
            <p className="mt-4 text-cream/55 max-w-md text-sm leading-relaxed">
              Vers gemaakte 30cm NY-style pizza, sinds {BRAND.founded} — bezorgd binnen ~28 minuten.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                ["Bezorgd in 28 min", true],
                ["200+ winkels", true],
                ["iDeal · Apple Pay", true],
              ].map(([t]) => (
                <span key={t as string} className="caps-xs bg-green text-cream rounded-full px-3 py-1.5 inline-flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {t as string}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="caps-xs text-green-glow mb-4">Menu</div>
            <div className="space-y-2 text-sm">
              <Link href="/menu" className="block hover:text-cream transition">Pizza&apos;s</Link>
              <Link href="/menu#sides" className="block hover:text-cream transition">Sides</Link>
              <Link href="/menu#desserts" className="block hover:text-cream transition">Desserts</Link>
              <Link href="/acties" className="block hover:text-cream transition">Acties</Link>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="caps-xs text-green-glow mb-4">Bedrijf</div>
            <div className="space-y-2 text-sm">
              <Link href="/over-ons" className="block hover:text-cream transition">Over ons</Link>
              <Link href="/winkels" className="block hover:text-cream transition">Vestigingen</Link>
              <Link href="/franchise" className="block hover:text-cream transition">Franchise</Link>
              <Link href="/werken-bij" className="block hover:text-cream transition">Werken bij</Link>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="caps-xs text-green-glow mb-4">App</div>
            <div className="space-y-2 text-sm">
              <a href={BRAND.appIos} target="_blank" rel="noopener" className="block hover:text-cream transition">iOS</a>
              <a href={BRAND.appAndroid} target="_blank" rel="noopener" className="block hover:text-cream transition">Android</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-3 pt-7 caps-xs text-cream/40">
          <div>© {new Date().getFullYear()} {BRAND.name}</div>
          <div className="text-green-glow">{BRAND.tagline}</div>
          <div>
            Concept-site door{" "}
            <a href="https://syntarie.com" className="hover:text-cream transition underline-offset-2 hover:underline">
              Syntarie
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
