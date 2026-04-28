import Image from "next/image";
import Link from "next/link";

export default function ThemedBanner() {
  return (
    <section className="bg-cream py-10 md:py-14">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <Link href="/acties#mykonos" className="block group">
          <article className="relative overflow-hidden rounded-2xl aspect-[16/7] md:aspect-[16/5] bg-green lift">
            <Image
              src="/assets/products/large_brandbox_mykonos_meerinfo_test_desktop_7bfa802000.jpg"
              alt=""
              fill
              loading="lazy"
              sizes="100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-deep/80 via-green-deep/30 to-transparent" />

            <div className="relative h-full flex flex-col justify-center px-7 md:px-12 lg:px-16 max-w-2xl">
              <div className="inline-block self-start bg-rood text-cream caps tracking-[0.2em] font-black px-4 py-1.5 text-[0.66rem] mb-4 -rotate-6">
                Kras &amp; Win
              </div>
              <h2 className="display-bold text-cream text-[clamp(2rem,5vw,4.4rem)] leading-[0.94] tracking-tight">
                Pizza Party op{" "}
                <span style={{ fontFamily: "var(--font-display-family)" }} className="block md:inline">Mykonos</span>
              </h2>
              <p className="text-cream/85 text-sm md:text-base mt-3 max-w-md">
                Win een reis voor twee + 1 jaar gratis pizza. Krast je los bij élke bestelling.
              </p>
              <div className="mt-6 inline-flex items-center gap-2.5 bg-yellow text-ink rounded-full px-6 py-3 caps text-[0.66rem] tracking-[0.16em] font-bold w-fit hover:brightness-105 transition lift">
                Doe nu mee →
              </div>
            </div>
          </article>
        </Link>
      </div>
    </section>
  );
}
