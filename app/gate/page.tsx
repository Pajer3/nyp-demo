import { Suspense } from "react";
import Image from "next/image";
import { GateForm } from "@/lib/access-gate/ui/GateForm";

export const metadata = { title: "Toegang — New York Pizza demo" };

export default function GatePage() {
  return (
    <Suspense fallback={null}>
      <GateForm
        brandName="New York Pizza"
        tagline="Concept-redesign door Syntarie"
        logo={
          <div className="bg-cream rounded-2xl p-3">
            <Image src="/assets/brand/nyp-logo.svg" alt="New York Pizza" width={130} height={40} priority />
          </div>
        }
        accentBg="bg-green"
        accentBgHover="hover:bg-green-deep"
        accentText="text-cream"
      />
    </Suspense>
  );
}
