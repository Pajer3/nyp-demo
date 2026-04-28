import Image from "next/image";
import { BRAND } from "@/lib/data";

export default function AppPromo() {
  return (
    <section className="bg-green-deep text-cream py-14 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6">
          <div className="caps-sm text-yellow mb-2 inline-flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="currentColor" strokeWidth="2" /><path d="M9 17V9m6 8v-4m-3 4V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            App-first
          </div>
          <h2 className="display-bold text-[clamp(2.2rem,4.5vw,4rem)] leading-[0.96] mb-4">
            Sneller bestellen?{" "}
            <span className="text-yellow font-normal">Pak de app.</span>
          </h2>
          <p className="text-cream/80 leading-relaxed max-w-md mb-6">
            Eén tap voor je vorige bestelling. Members krijgen extra punten en
            push-meldingen voor exclusieve acties.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={BRAND.appIos} target="_blank" rel="noopener" className="bg-cream text-ink hover:bg-yellow rounded-2xl px-5 py-3 inline-flex items-center gap-3 transition lift">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
              <div>
                <div className="caps-xs opacity-60">Download in</div>
                <div className="text-base font-bold leading-tight">App Store</div>
              </div>
            </a>
            <a href={BRAND.appAndroid} target="_blank" rel="noopener" className="bg-cream text-ink hover:bg-yellow rounded-2xl px-5 py-3 inline-flex items-center gap-3 transition lift">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 20.83a1 1 0 01-.18-1.4L13.59 8 10 4.41A1 1 0 0110.41 3 1 1 0 0112 3.41L21 12l-9 8.59a1 1 0 01-1.41-1.41L13.59 16 3.18 20.83z" /></svg>
              <div>
                <div className="caps-xs opacity-60">Get it on</div>
                <div className="text-base font-bold leading-tight">Google Play</div>
              </div>
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-green">
          <Image
            src="/assets/products/Margherita-8046.png"
            alt="Margherita pizza"
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-12"
          />
        </div>
      </div>
    </section>
  );
}
