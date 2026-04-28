import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";

// Lazy-load below-fold sections — keeps the LCP path lean
const ThemedBanner = dynamic(() => import("@/components/ThemedBanner"));
const PizzaGrid = dynamic(() => import("@/components/PizzaGrid"));
const PizzapuntenStrip = dynamic(() => import("@/components/PizzapuntenStrip"));
const StoreLocator = dynamic(() => import("@/components/StoreLocator"));
const AppPromo = dynamic(() => import("@/components/AppPromo"));

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <ThemedBanner />
      <PizzaGrid />
      <PizzapuntenStrip />
      <StoreLocator />
      <AppPromo />
    </>
  );
}
