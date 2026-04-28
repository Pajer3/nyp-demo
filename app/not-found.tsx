import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[85svh] flex items-center px-6 md:px-10 max-w-[1500px] mx-auto py-24">
      <div className="max-w-3xl">
        <div className="script text-terracotta text-4xl">oei!</div>
        <h1 className="italic-bold text-koffie text-[clamp(3rem,12vw,11rem)] leading-[0.9] mt-3">
          Pagina niet
          <br />
          <span className="text-terracotta">op het menu.</span>
        </h1>
        <p className="mt-6 text-koffie-soft text-lg leading-relaxed max-w-xl">
          Deze link is verdwenen — of heeft er nooit gestaan. Gelukkig is de
          keuken wel open.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/menu"
            className="caps-sm bg-terracotta hover:bg-terracotta-deep text-creme px-7 py-3.5 rounded-full transition"
          >
            Bekijk het menu
          </Link>
          <Link
            href="/"
            className="caps-sm border border-koffie text-koffie hover:bg-koffie hover:text-creme px-7 py-3.5 rounded-full transition"
          >
            Terug naar home
          </Link>
        </div>
      </div>
    </section>
  );
}
