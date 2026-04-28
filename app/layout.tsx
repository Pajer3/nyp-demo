import type { Metadata } from "next";
import { Bebas_Neue, Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import LenisProvider from "@/components/LenisProvider";
import SiteChrome from "@/components/SiteChrome";
import { CartProvider } from "@/lib/cart";
import { AuthProvider } from "@/lib/auth";

const display = Bebas_Neue({
  variable: "--font-display-family",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const serif = Fraunces({
  variable: "--font-serif-family",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans-family",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3030"),
  ),
  title: "New York Pizza — It's the dough.",
  description: "Vers gemaakte 30cm NY-style pizza, bezorgd binnen 28 minuten. Sinds 1993 — 200+ vestigingen.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="nl"
      className={`${display.variable} ${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="bg-cream text-ink">
        <AuthProvider>
          <CartProvider>
            <LenisProvider>
              <SiteChrome>{children}</SiteChrome>
            </LenisProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
