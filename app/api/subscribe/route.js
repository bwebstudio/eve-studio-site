import { NextResponse } from "next/server";

// POST /api/subscribe
//
// Test-mode friendly: without RESEND_API_KEY the route succeeds locally
// and logs the email to the server console, so the form can be exercised
// with no account. Set the key and every submission becomes a real
// contact in Resend.
//
// Resend retired Audiences in favour of Segments: contacts now live at
// account level and `contacts.create` no longer takes an `audienceId`
// (it is gone from CreateContactOptions in the installed SDK, 6.12.x).
// This route used to require RESEND_AUDIENCE_ID as well, which meant it
// could never leave test mode, because that ID no longer exists to be
// found. The key alone is enough now.
//
// RESEND_SEGMENT_ID is optional. Set it to file new subscribers into a
// specific segment; leave it unset and they land in the general contact
// list, which is still what Broadcasts send to.
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
  const segmentId = process.env.RESEND_SEGMENT_ID;

  // Test mode: no Resend configured. Log + return success so the
  // UI flow can be exercised locally without an account.
  if (!apiKey) {
    console.log("[newsletter:test-mode]", { email, consent });
    return NextResponse.json({ ok: true, mode: "test" });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const result = await resend.contacts.create({
      email,
      unsubscribed: false,
      ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
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
