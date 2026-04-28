"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { eur } from "@/lib/format";

const HIDE_ON = ["/checkout", "/winkelmand", "/login", "/register"];

export default function StickyOrderBar() {
  const [show, setShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, total, setOpen, open: cartOpen } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 240);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setMenuOpen(document.body.classList.contains("nav-menu-open"));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    setMenuOpen(document.body.classList.contains("nav-menu-open"));
    return () => observer.disconnect();
  }, []);

  if (cartOpen || menuOpen || HIDE_ON.some((p) => pathname?.startsWith(p))) return null;

  if (count > 0) {
    return (
      <div
        className={`fixed bottom-0 inset-x-0 z-40 lg:hidden transition-transform duration-300 ${
          show || count > 0 ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <button
          onClick={() => setOpen(true)}
          className="w-[calc(100%-1.5rem)] m-3 bg-green text-cream rounded-2xl flex items-center gap-3 p-2.5 lift-green active:scale-[0.98] transition-transform"
        >
          <span className="bg-cream text-green-deep w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">
            {count}
          </span>
          <span className="flex-1 text-left min-w-0">
            <span className="caps-xs text-cream/70 block">Winkelmand</span>
            <span className="text-sm font-bold leading-tight block">{eur(total)}</span>
          </span>
          <span className="caps text-[0.66rem] bg-cream text-green-deep rounded-xl px-4 py-2.5 shrink-0">
            Bekijk →
          </span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-40 lg:hidden transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="m-3 bg-green text-cream rounded-2xl flex items-center gap-3 p-2 lift-green">
        <div className="flex-1 px-3 min-w-0">
          <div className="caps-xs text-cream/70">Bezorgen in</div>
          <div className="text-sm font-bold leading-tight">~ 28 min · 200+ winkels</div>
        </div>
        <Link
          href="/menu"
          className="bg-cream hover:bg-yellow text-green-deep rounded-xl px-5 py-3 caps text-[0.66rem] inline-flex items-center gap-2 transition font-bold shrink-0"
        >
          Bestel nu
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
