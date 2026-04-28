// Node runtime — sends a notification when someone successfully unlocks the gate.
// Uses nodemailer with Hostinger SMTP. Failures are caught by the caller and
// MUST NOT block the auth response.

import nodemailer, { type Transporter } from "nodemailer";

let cached: Transporter | null = null;

function getTransport(): Transporter {
  if (cached) return cached;
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT ?? 587);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;
  if (!host || !user || !pass) {
    throw new Error("EMAIL_HOST / EMAIL_USER / EMAIL_PASSWORD missing");
  }
  cached = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  return cached;
}

export type NotifyOpts = {
  siteName: string;
  visitorIp: string;
  userAgent: string;
  referer?: string;
  fromUrl?: string;
};

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

export async function sendVisitNotification(opts: NotifyOpts): Promise<void> {
  const to = process.env.EMAIL_TO ?? "hello@syntarie.com";
  const from = process.env.EMAIL_FROM ?? process.env.EMAIL_USER!;
  const transport = getTransport();
  const ts = new Date().toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam" });

  const subject = `${opts.siteName} · iemand met de juiste code bekijkt nu de site`;

  const text = [
    `Iemand met de juiste toegangscode bekijkt nu ${opts.siteName}.`,
    ``,
    `Tijd:        ${ts} (Europe/Amsterdam)`,
    `IP:          ${opts.visitorIp}`,
    `User-agent:  ${opts.userAgent}`,
    opts.referer ? `Referer:     ${opts.referer}` : null,
    opts.fromUrl ? `Bestemming:  ${opts.fromUrl}` : null,
    ``,
    `— auto-notificatie van Syntarie access-gate`,
  ].filter(Boolean).join("\n");

  const html = `<!doctype html>
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:24px;line-height:1.55;color:#111">
  <div style="background:#009a44;color:#fff;padding:18px 22px;border-radius:14px 14px 0 0">
    <div style="font-size:11px;text-transform:uppercase;letter-spacing:.14em;opacity:.85">Syntarie · Access-gate</div>
    <div style="font-size:20px;font-weight:700;margin-top:4px">Iemand bekijkt nu ${escapeHtml(opts.siteName)}</div>
  </div>
  <div style="background:#fff;border:1px solid #e2ddd2;border-top:none;padding:22px;border-radius:0 0 14px 14px">
    <p style="margin:0 0 16px">Iemand heeft net de juiste toegangscode ingevoerd op je demo.</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr><td style="padding:6px 0;color:#6b6963;width:120px">Tijd</td><td>${escapeHtml(ts)}</td></tr>
      <tr><td style="padding:6px 0;color:#6b6963">IP</td><td><code>${escapeHtml(opts.visitorIp)}</code></td></tr>
      <tr><td style="padding:6px 0;color:#6b6963">User-agent</td><td><code style="word-break:break-all">${escapeHtml(opts.userAgent)}</code></td></tr>
      ${opts.referer ? `<tr><td style="padding:6px 0;color:#6b6963">Referer</td><td>${escapeHtml(opts.referer)}</td></tr>` : ""}
      ${opts.fromUrl ? `<tr><td style="padding:6px 0;color:#6b6963">Bestemming</td><td>${escapeHtml(opts.fromUrl)}</td></tr>` : ""}
    </table>
    <p style="margin:18px 0 0;font-size:12px;color:#6b6963">Bel ze ;)</p>
  </div>
</div>`;

  await transport.sendMail({
    to,
    from,
    subject,
    text,
    html,
  });
}
