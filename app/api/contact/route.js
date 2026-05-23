import { NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Lead enquiry endpoint used by the Contact form. Sends a plain-text
 * email to the studio inbox via Resend when configured; in local /
 * preview environments without RESEND_API_KEY, logs the payload and
 * returns success so the UI flow can be exercised end-to-end.
 *
 * Required env (production):
 *   - RESEND_API_KEY   — Resend account key
 *   - CONTACT_FROM     — verified sender, e.g. "Eve Studio <hello@eve.studio>"
 *   - CONTACT_TO       — destination, e.g. "hello@eve.studio"
 *
 * Body shape:
 *   { name, company?, email, phone?, service?, budget?, message, consent, lang? }
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(v) {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const name = clean(body?.name);
  const company = clean(body?.company);
  const email = clean(body?.email);
  const phone = clean(body?.phone);
  const service = clean(body?.service);
  const budget = clean(body?.budget);
  const message = clean(body?.message);
  const consent = body?.consent === true;
  const lang = clean(body?.lang) || "en";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "missing_required" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json({ error: "missing_consent" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.CONTACT_FROM || "Eve Studio <hello@eve.studio>";
  const to = process.env.CONTACT_TO || "hello@eve.studio";

  const subject = `New enquiry — ${name}${company ? ` (${company})` : ""}`;

  const lines = [
    `Name:    ${name}`,
    company ? `Company: ${company}` : null,
    `Email:   ${email}`,
    phone ? `Phone:   ${phone}` : null,
    service ? `Service: ${service}` : null,
    budget ? `Budget:  ${budget}` : null,
    `Lang:    ${lang}`,
    "",
    "Message:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  // Local / preview mode — no Resend configured. Log and return 200
  // so the form flow can be exercised without an account.
  if (!apiKey) {
    console.log("[contact:test-mode]", { name, company, email, phone, service, budget, lang });
    console.log(lines);
    return NextResponse.json({ ok: true, mode: "test" });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text: lines,
    });

    if (result?.error) {
      console.error("[contact] resend error:", result.error);
      return NextResponse.json({ error: "resend_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
