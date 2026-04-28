import { NextResponse } from "next/server";
import {
  appendValuesToGoogleSheet,
  createTransporter,
  getBrandedFromAddress,
  getOptionalEnv
} from "@/lib/contact-integrations";

export const runtime = "nodejs";

const maxEmailLength = 160;

function sanitizeEmail(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, maxEmailLength).toLowerCase() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getNewsletterSheetName() {
  return getOptionalEnv("NEWSLETTER_SHEET_TAB_NAME") || "Newsletter";
}

async function appendNewsletterSubscriber(email: string) {
  await appendValuesToGoogleSheet(getNewsletterSheetName(), [
    new Date().toISOString(),
    email,
    "Newsletter Form"
  ]);
}

async function sendSubscriberThankYouEmail(email: string) {
  const transporter = createTransporter();
  const from = getBrandedFromAddress();

  await transporter.sendMail({
    from,
    to: email,
    subject: "Thank you for subscribing",
    text: "Thank you for subscribing to our newsletter. You’ll now receive the latest updates from us."
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = body && typeof body === "object" ? body as Record<string, unknown> : {};
    const email = sanitizeEmail(data.email);

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    await appendNewsletterSubscriber(email);
    await sendSubscriberThankYouEmail(email);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Newsletter signup failed:", error);

    return NextResponse.json(
      { error: "Unable to subscribe right now. Please try again later." },
      { status: 500 }
    );
  }
}
