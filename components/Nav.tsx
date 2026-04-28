"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "./Logo";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";

const PRIMARY_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/acties", label: "Acties" },
  { href: "/winkels", label: "Winkels" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/franchise", label: "Franchise" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);
  const [lang, setLang] = useState<"NL" | "EN">("NL");
  const { count, setOpen: setCartOpen } = useCart();
  const { user, logout } = useAuth();

  useEffect(() => {
    document.documentElement.style.setProperty("--nav-h", "96px");
    const handler = () => {
      document.documentElement.style.setProperty(
        "--nav-h",
        window.innerWidth >= 1024 ? "96px" : "72px",
      );
    };
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-paper border-b border-line">
        <div className="max-w-[1400px] mx-auto px-3 lg:px-8 h-[72px] lg:h-[96px] flex items-center justify-between gap-2">

          {/* LEFT */}
          <div className="flex items-center gap-3 lg:gap-5 min-w-0">
            <Link href="/" aria-label="Home" className="shrink-0">
              <span className="hidden sm:block"><Logo size={108} /></span>
              <span className="sm:hidden"><Logo size={84} /></span>
            </Link>
            <button
              onClick={() => setStoreOpen(!storeOpen)}
              className="hidden md:inline-flex items-center gap-3 bg-cream hover:bg-green-mist transition rounded-full pl-2 pr-5 py-2 text-sm border border-line min-w-[270px] group"
            >
              <span className="w-9 h-9 rounded-full bg-paper border border-line group-hover:border-green flex items-center justify-center text-ink group-hover:text-green-deep transition">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="7" cy="17" r="2" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="17" cy="17" r="2" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M5 17H3a1 1 0 01-1-1v-5l2-5h11l3 4 3 1 1 5v1a1 1 0 01-1 1h-2M7 17h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="caps text-[0.66rem] tracking-[0.16em] text-ink-soft flex-1 text-left">
                Selecteer een bezorgwinkel
              </span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="text-green-deep"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" /></svg>
            </button>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-1.5 lg:gap-2.5 shrink-0">
            <Link
              href="/pizzapunten"
              className="hidden md:inline-flex items-center gap-2 bg-yellow text-ink rounded-full pl-2 pr-4 py-2 text-sm font-semibold hover:brightness-105 transition lift"
            >
              <span className="w-7 h-7 rounded-full bg-yellow-deep/30 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-ink">
                  <path d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="caps text-[0.62rem] tracking-[0.16em]">Pizzapunten</span>
            </Link>

            <div className="hidden md:inline-flex items-center bg-cream rounded-full p-0.5 border border-line">
              {(["EN", "NL"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`caps text-[0.62rem] tracking-[0.16em] px-3 py-1.5 rounded-full transition ${
                    lang === l ? "bg-green text-cream shadow-sm" : "text-ink-mute hover:text-ink"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {user ? (
              <Link
                href="/account"
                className="hidden md:inline-flex items-center gap-2 bg-green-mist hover:bg-green-soft text-green-deep rounded-full pl-2 pr-4 py-1.5 caps text-[0.62rem] tracking-[0.16em] font-bold transition"
              >
                <span className="w-7 h-7 rounded-full bg-green text-cream flex items-center justify-center text-xs font-black">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                Hi {user.name.split(" ")[0]}
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden md:inline-flex items-center gap-1.5 caps text-[0.66rem] tracking-[0.16em] text-ink hover:text-green-deep transition px-3 py-2"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" /><path d="M4 21a8 8 0 0116 0" stroke="currentColor" strokeWidth="1.8" /></svg>
                  Login
                </Link>
                <Link
                  href="/register"
                  className="hidden md:inline-flex border-2 border-green text-green-deep hover:bg-green hover:text-cream rounded-full px-4 py-1.5 caps text-[0.62rem] tracking-[0.18em] font-bold transition"
                >
                  Register
                </Link>
              </>
            )}

            <button aria-label="Zoeken" className="hidden md:inline-flex w-10 h-10 items-center justify-center text-ink hover:text-green-deep transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" /><path d="M21 21l-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </button>

            <button
              onClick={() => setCartOpen(true)}
              aria-label="Winkelmand"
              className="relative w-10 h-10 inline-flex items-center justify-center text-ink hover:text-green-deep transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 3h2l2.4 11.4a2 2 0 002 1.6h7.4a2 2 0 002-1.4L21 8H6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="21" r="1.5" fill="currentColor" /><circle cx="17" cy="21" r="1.5" fill="currentColor" /></svg>
              <span className={`absolute -top-1 -right-1 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold transition ${count > 0 ? "bg-rood text-cream animate-pulse" : "bg-green text-cream"}`}>
                {count}
              </span>
            </button>

            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden flex flex-col gap-[5px] p-2 ml-1"
            >
              <span className={`block h-[2px] w-5 bg-ink transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-[2px] w-5 bg-ink transition ${open ? "opacity-0" : ""}`} />
              <span className={`block h-[2px] w-5 bg-ink transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[72px] z-[55] bg-paper text-ink lg:hidden overflow-y-auto"
          >
            <div className="px-5 pt-7 pb-32 max-w-md mx-auto">
              {/* User block */}
              {user ? (
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 bg-green text-cream rounded-2xl p-4 mb-5 lift-green"
                >
                  <span className="w-12 h-12 rounded-full bg-cream text-green-deep flex items-center justify-center display text-xl">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="display text-lg block leading-none">{user.name}</span>
                    <span className="caps-xs opacity-80 block mt-1">{user.points} pizzapunten · Bekijk →</span>
                  </span>
                </Link>
              ) : (
                <div className="flex gap-2 mb-5">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex-1 caps text-[0.66rem] text-ink border border-line bg-cream rounded-full py-3 text-center font-bold hover:border-green transition"
                  >
                    Inloggen
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="flex-1 caps text-[0.66rem] bg-green text-cream rounded-full py-3 text-center font-bold transition"
                  >
                    Aanmelden
                  </Link>
                </div>
              )}

              {/* Pizzapunten quick CTA */}
              <Link
                href="/pizzapunten"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between bg-yellow text-ink rounded-2xl px-4 py-3 mb-5 font-bold"
              >
                <span className="flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
                  <span className="caps text-[0.66rem]">Pizzapunten</span>
                </span>
                <span className="caps-xs">Spaar gratis →</span>
              </Link>

              {/* Primary nav */}
              <div className="space-y-1 mb-7">
                {PRIMARY_LINKS.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.03 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-3 border-b border-line text-ink hover:text-green-deep transition"
                    >
                      <span className="display text-3xl tracking-tight">{l.label}</span>
                      <span className="text-green-deep">→</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Cart shortcut on mobile */}
              <button
                onClick={() => { setOpen(false); setCartOpen(true); }}
                className="w-full flex items-center justify-between bg-cream border border-line rounded-2xl p-4 mb-3 hover:border-green transition"
              >
                <span className="flex items-center gap-3">
                  <span className={`w-10 h-10 rounded-full flex items-center justify-center text-cream ${count > 0 ? "bg-rood" : "bg-green"}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 3h2l2.4 11.4a2 2 0 002 1.6h7.4a2 2 0 002-1.4L21 8H6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span>
                    <span className="caps-xs text-ink-mute block">Winkelmand</span>
                    <span className="display text-lg block leading-none mt-0.5">{count} {count === 1 ? "item" : "items"}</span>
                  </span>
                </span>
                <span className="caps-xs text-green-deep font-bold">Bekijk →</span>
              </button>

              {user && (
                <button
                  onClick={() => { logout(); setOpen(false); }}
                  className="w-full caps-xs text-ink-mute py-3 hover:text-rood transition"
                >
                  Uitloggen
                </button>
              )}

              <div className="caps-xs text-ink-mute text-center pt-6 border-t border-line mt-6">
                It&apos;s the dough. — Sinds 1993
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {storeOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setStoreOpen(false)}
              className="fixed inset-0 z-30 bg-ink/30 hidden md:block"
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="hidden md:block fixed top-[80px] lg:top-[100px] left-4 lg:left-8 z-40 bg-paper rounded-3xl border border-line p-5 w-[440px] lift"
            >
              <div className="caps-sm text-green-deep mb-3">Bezorgen of afhalen?</div>
              <div className="flex gap-2 mb-4">
                <button className="flex-1 bg-green text-cream rounded-full py-2.5 caps text-[0.65rem] hover:bg-green-deep transition">Bezorgen</button>
                <button className="flex-1 bg-cream text-ink hover:bg-green-mist rounded-full py-2.5 caps text-[0.65rem] border border-line">Afhalen</button>
              </div>
              <input
                type="text"
                placeholder="Vul je postcode + huisnr in"
                className="w-full px-4 py-3 rounded-full border border-line outline-none focus:border-green text-ink placeholder:text-ink-mute"
              />
              <button className="w-full mt-3 bg-green hover:bg-green-deep text-cream rounded-full py-3 caps text-[0.65rem] transition">
                Vind mijn winkel →
              </button>
              <div className="caps-xs text-green-deep mt-3 text-center font-bold">
                ✓ Bezorgd binnen ~28 min in jouw buurt
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
