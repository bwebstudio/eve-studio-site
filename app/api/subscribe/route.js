import { NextResponse } from "next/server";

// POST /api/subscribe
//
// Test-mode friendly: when RESEND_API_KEY / RESEND_AUDIENCE_ID are not
// set, the route succeeds locally and logs the email to the server
// console — useful while the project doesn't have a domain yet. As
// soon as the env vars are filled in, every submission gets pushed
// into the Resend audience.
//
// Required body: { email: string, consent: true }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const consent = body?.consent === true;

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json({ error: "missing_consent" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  // Test mode — no Resend configured. Log + return success so the
  // UI flow can be exercised locally without an account.
  if (!apiKey || !audienceId) {
    console.log("[newsletter:test-mode]", { email, consent });
    return NextResponse.json({ ok: true, mode: "test" });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const result = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });

    if (result?.error) {
      console.error("[newsletter] resend error:", result.error);
      return NextResponse.json({ error: "resend_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] unexpected:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
