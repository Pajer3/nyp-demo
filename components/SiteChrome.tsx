"use client";

import { usePathname } from "next/navigation";
import Nav from "./Nav";
import Footer from "./Footer";
import StickyOrderBar from "./StickyOrderBar";
import CartDrawer from "./CartDrawer";

const NAKED_PREFIXES = ["/gate"];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const naked = NAKED_PREFIXES.some((p) => pathname === p || pathname?.startsWith(p + "/"));

  if (naked) return <>{children}</>;

  return (
    <>
      <Nav />
      <main className="pt-[var(--nav-h,72px)]">{children}</main>
      <Footer />
      <StickyOrderBar />
      <CartDrawer />
    </>
  );
}
