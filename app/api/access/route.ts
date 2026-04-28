import { createAccessHandler } from "@/lib/access-gate/api-handler";

// Force Node runtime so nodemailer works.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const POST = createAccessHandler();
