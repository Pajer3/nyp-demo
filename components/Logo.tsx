import Image from "next/image";
import Link from "next/link";

export default function Logo({ className = "", size = 116 }: { className?: string; size?: number }) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`} aria-label="New York Pizza home">
      <Image
        src="/assets/brand/nyp-logo.svg"
        alt="New York Pizza"
        width={size}
        height={Math.round(size * (53.7 / 175.4))}
        priority
        className="shrink-0"
      />
    </Link>
  );
}
