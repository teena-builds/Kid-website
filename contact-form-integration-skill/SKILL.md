---
name: contact-form-integration
description: Reusable Next.js contact form integration workflow for adding instant Thank You redirects, Google Sheets saves, SMTP admin notifications, SMTP user auto-replies, server-side validation, and production-safe error handling. Use when setting up or copying a complete contact form backend/frontend flow into a Next.js App Router website using only .env.local variables for project-specific configuration.
---

# Contact Form Integration

## Copy This Prompt To Run The Skill

```text
Use the reusable skill at contact-form-integration-skill/SKILL.md and connect my current Next.js contact form to Google Sheets and SMTP.

Requirements:
- Keep my existing form UI, layout, styling, and fields unchanged.
- Add instant redirect to /thank-you after valid submit.
- Send the API request in the background without blocking the redirect.
- Save submitted form data to Google Sheets.
- Send SMTP notification email to the website owner/admin.
- Send SMTP thank-you auto-reply to the user if a valid email is submitted.
- Use only .env.local / Vercel environment variables for secrets.
- Do not hardcode sheet IDs, emails, SMTP credentials, or private keys.
- Keep code modular and production-ready.
- After implementation, run the build and explain updated files plus required env variables.
```

Use this skill to add a complete reusable contact form flow to a Next.js App Router project without hardcoding secrets or project-specific IDs.

## Target Flow

1. User fills the contact form.
2. Client validates required fields.
3. Client starts the API request in the background.
4. Client redirects instantly to `/thank-you`.
5. Server validates payload again.
6. Server saves submitted fields to Google Sheets.
7. Server sends notification email to admin.
8. Server sends thank-you confirmation email to the user when a valid email exists.
9. Server logs meaningful errors without exposing secrets to the browser.

## Required Structure

Create or adapt these files in the target project:

```text
components/contact/contact-form.tsx
app/api/contact/route.ts
app/thank-you/page.tsx
lib/contact/google-sheets.ts
lib/contact/smtp.ts
lib/contact/validation.ts
lib/contact/errors.ts
docs/contact-form-integration.md
```

Do not create `.env.example` for secrets. Use `.env.local` only for local development, and configure the same variables in production hosting settings.

## Environment Variables

Add or update `.env.local`:

```env
GOOGLE_SHEET_ID=
GOOGLE_SHEET_TAB_NAME=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
BOOKING_FROM_NAME=
BOOKING_FROM_EMAIL=
BOOKING_NOTIFICATION_TO_EMAIL=
```

Never prefix these with `NEXT_PUBLIC_`. They are server-only secrets.

## Vercel Setup

For Vercel deployments, add the same backend variables from `.env.local` in:

```text
Vercel Project Settings > Environment Variables
```

Add them for the environments you use, usually Production, Preview, and Development:

```env
GOOGLE_SHEET_ID=
GOOGLE_SHEET_TAB_NAME=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
BOOKING_FROM_NAME=
BOOKING_FROM_EMAIL=
BOOKING_NOTIFICATION_TO_EMAIL=
```

After adding or changing Vercel environment variables, redeploy the project. Do not add these as `NEXT_PUBLIC_` variables because the API route reads them server-side.

## Data Model

Keep fields flexible. Use a generic record internally and only include filled values in emails and sheet rows:

```ts
export type ContactPayload = Record<string, string>;
```

Recommended default form fields:

```ts
fullName
email
phone
subject
message
```

Projects may add or remove fields. Keep validation and email formatting data-driven.

## Client Form Pattern

Use a client component. Keep existing UI unchanged when integrating into an existing site.

Required behavior:

- Validate required fields before redirect.
- Prevent duplicate submissions with a ref guard and disabled button.
- Use `navigator.sendBeacon()` for the primary background request.
- Fallback to `fetch(..., { keepalive: true })`.
- Redirect immediately to `/thank-you`.
- Do not wait for the API response before redirecting.

Reference implementation:

```tsx
"use client";

import type { FormEvent } from "react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type ContactPayload = Record<string, string>;

const requiredFields = ["fullName", "message"];

function getFormPayload(form: HTMLFormElement): ContactPayload {
  const formData = new FormData(form);
  const payload: ContactPayload = {};

  formData.forEach((value, key) => {
    const text = String(value).trim();
    if (text) {
      payload[key] = text;
    }
  });

  return payload;
}

function validateClientPayload(payload: ContactPayload) {
  for (const field of requiredFields) {
    if (!payload[field]) {
      return "Please fill all required fields.";
    }
  }

  if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return "Please enter a valid email address.";
  }

  return "";
}

function submitInBackground(payload: ContactPayload) {
  const body = JSON.stringify(payload);

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon("/api/contact", blob)) {
        return;
      }
    }

    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true
    }).catch((error) => {
      console.error("Contact form background submission failed:", error);
    });
  } catch (error) {
    console.error("Contact form background submission could not be queued:", error);
  }
}

export function ContactForm() {
  const router = useRouter();
  const hasSubmitted = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (hasSubmitted.current) {
      return;
    }

    const payload = getFormPayload(event.currentTarget);
    const validationError = validateClientPayload(payload);
    if (validationError) {
      setError(validationError);
      return;
    }

    hasSubmitted.current = true;
    setIsSubmitting(true);
    setError("");

    submitInBackground(payload);
    router.push("/thank-you");
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Keep or replace with the project's existing fields and styling. */}
      <input name="fullName" type="text" />
      <input name="email" type="email" />
      <input name="phone" type="tel" />
      <textarea name="message" />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
      {error ? <p role="alert">{error}</p> : null}
    </form>
  );
}
```

## Validation Utility

Create `lib/contact/validation.ts`:

```ts
export type ContactPayload = Record<string, string>;

export function sanitizePayload(input: unknown): ContactPayload {
  const source = input && typeof input === "object" ? input as Record<string, unknown> : {};
  const payload: ContactPayload = {};

  for (const [key, value] of Object.entries(source)) {
    if (typeof value === "string") {
      const text = value.trim().slice(0, 2000);
      if (text) {
        payload[key] = text;
      }
    }
  }

  return payload;
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateContactPayload(payload: ContactPayload) {
  if (!payload.fullName) {
    return "Name is required.";
  }

  if (!payload.email && !payload.phone) {
    return "Email or phone is required.";
  }

  if (payload.email && !isValidEmail(payload.email)) {
    return "A valid email is required.";
  }

  if (!payload.message) {
    return "Message is required.";
  }

  return "";
}

export function filledEntries(payload: ContactPayload) {
  return Object.entries(payload).filter(([, value]) => Boolean(value));
}
```

## Error Utility

Create `lib/contact/errors.ts`:

```ts
export function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function optionalEnv(name: string) {
  return process.env[name]?.trim();
}

export function logContactError(context: string, error: unknown) {
  console.error(`[contact-form] ${context}`, error);
}
```

## Google Sheets Service

Create `lib/contact/google-sheets.ts`.

Use the existing Google Sheets JWT append approach. Keep project-specific IDs in env only.

```ts
import { createSign } from "crypto";
import type { ContactPayload } from "./validation";
import { filledEntries } from "./validation";
import { requiredEnv } from "./errors";

function base64UrlEncode(value: string | Buffer) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function getPrivateKey() {
  const key = requiredEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY")
    .replace(/^"|"$/g, "")
    .replace(/\\n/g, "\n");

  if (!key.includes("-----BEGIN PRIVATE KEY-----")) {
    throw new Error("Invalid Google private key. Use the service account private_key value, not private_key_id.");
  }

  return key;
}

async function getGoogleAccessToken() {
  const clientEmail = requiredEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const privateKey = getPrivateKey();
  const now = Math.floor(Date.now() / 1000);

  const header = base64UrlEncode(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64UrlEncode(JSON.stringify({
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now
  }));
  const unsignedToken = `${header}.${claim}`;
  const signature = createSign("RSA-SHA256").update(unsignedToken).sign(privateKey);
  const assertion = `${unsignedToken}.${base64UrlEncode(signature)}`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    })
  });

  if (!response.ok) {
    throw new Error("Google authentication failed. Check service account email and private key.");
  }

  const data = await response.json() as { access_token?: string };
  if (!data.access_token) {
    throw new Error("Google access token was not returned.");
  }

  return data.access_token;
}

export async function saveContactToGoogleSheet(payload: ContactPayload) {
  const spreadsheetId = requiredEnv("GOOGLE_SHEET_ID");
  const tabName = requiredEnv("GOOGLE_SHEET_TAB_NAME");
  const accessToken = await getGoogleAccessToken();

  const values = [[
    new Date().toISOString(),
    ...filledEntries(payload).map(([, value]) => value)
  ]];

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(tabName)}!A:Z:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ values })
    }
  );

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    throw new Error(
      `Google Sheet append failed. Check sheet ID, tab name, and service account permissions. ${details}`
    );
  }
}
```

## SMTP Service

Create `lib/contact/smtp.ts`.

```ts
import nodemailer from "nodemailer";
import type { ContactPayload } from "./validation";
import { filledEntries, isValidEmail } from "./validation";
import { optionalEnv, requiredEnv, logContactError } from "./errors";

function createTransporter() {
  const port = Number(requiredEnv("SMTP_PORT"));

  return nodemailer.createTransport({
    host: requiredEnv("SMTP_HOST"),
    port,
    secure: port === 465,
    auth: {
      user: requiredEnv("SMTP_USER"),
      pass: requiredEnv("SMTP_PASS")
    }
  });
}

function formatSubmittedDetails(payload: ContactPayload) {
  return filledEntries(payload)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

function fromAddress() {
  const name = optionalEnv("BOOKING_FROM_NAME");
  const email = requiredEnv("BOOKING_FROM_EMAIL");
  return name ? `${name} <${email}>` : email;
}

export async function sendAdminNotificationEmail(payload: ContactPayload) {
  const transporter = createTransporter();

  try {
    await transporter.sendMail({
      from: fromAddress(),
      to: requiredEnv("BOOKING_NOTIFICATION_TO_EMAIL"),
      replyTo: payload.email && isValidEmail(payload.email) ? payload.email : undefined,
      subject: "New website contact form submission",
      text: [
        "A new contact form submission was received.",
        "",
        formatSubmittedDetails(payload)
      ].join("\n")
    });
  } catch (error) {
    logContactError("Admin notification email failed", error);
    throw new Error("Admin notification email failed.");
  }
}

export async function sendUserThankYouEmail(payload: ContactPayload) {
  if (!payload.email || !isValidEmail(payload.email)) {
    return;
  }

  const transporter = createTransporter();

  try {
    await transporter.sendMail({
      from: fromAddress(),
      to: payload.email,
      subject: "Thank you for contacting us",
      text: [
        `Hi ${payload.fullName || "there"},`,
        "",
        "Thank you for contacting us. We have received your details and our team will get back to you soon.",
        "",
        "Submitted details:",
        "",
        formatSubmittedDetails(payload)
      ].join("\n")
    });
  } catch (error) {
    logContactError("User thank-you email failed", error);
  }
}
```

## API Route

Create `app/api/contact/route.ts`.

```ts
import { NextResponse } from "next/server";
import { saveContactToGoogleSheet } from "@/lib/contact/google-sheets";
import { sendAdminNotificationEmail, sendUserThankYouEmail } from "@/lib/contact/smtp";
import { sanitizePayload, validateContactPayload } from "@/lib/contact/validation";
import { logContactError } from "@/lib/contact/errors";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = sanitizePayload(await request.json());
    const validationError = validateContactPayload(payload);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    await saveContactToGoogleSheet(payload);
    await sendAdminNotificationEmail(payload);
    await sendUserThankYouEmail(payload);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    logContactError("Contact form submission failed", error);

    return NextResponse.json(
      { error: "Unable to process contact form submission." },
      { status: 500 }
    );
  }
}
```

If independent service failures should not fail the whole request, replace the sequential awaits with `Promise.allSettled()` and log each rejected result. For strict lead capture, keep the Google Sheet save as required.

## Thank You Page

Create `app/thank-you/page.tsx` if missing. Keep it simple and match the site’s existing layout components.

```tsx
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="text-4xl font-semibold">Thank You</h1>
      <p className="mt-4 text-base">
        Your message has been submitted. Our team will get back to you soon.
      </p>
      <Link href="/" className="mt-8 inline-flex rounded-full px-6 py-3">
        Back To Home
      </Link>
    </main>
  );
}
```

## Setup Documentation

Create `docs/contact-form-integration.md` in target projects with:

- Required env variable list.
- Vercel Project Settings > Environment Variables setup.
- Google service account setup steps.
- Reminder to share the Google Sheet with `GOOGLE_SERVICE_ACCOUNT_EMAIL`.
- SMTP provider setup steps.
- Test checklist.
- Troubleshooting notes below.

## Troubleshooting

- `.env.example` is not loaded by Next.js. Put runtime variables in `.env.local`.
- Restart `npm run dev` after changing `.env.local`.
- Google private key must be the full `private_key` from the service account JSON, not `private_key_id`.
- Store Google private key with escaped newlines, then replace `\\n` with real newlines in code.
- Service account email must have access to the Google Sheet.
- Sheet tab name must match exactly, including spaces and capitalization.
- Wrong sheet ID, wrong tab name, or missing permission usually appears as a Google Sheets append failure.
- SMTP host, port, username, and password must match the provider’s SMTP settings.
- Parse `SMTP_PORT` as a number before passing it to Nodemailer.
- Do not use `NEXT_PUBLIC_` for backend secrets.
- API route must run server-side only. Use `export const runtime = "nodejs"` when using `crypto` and Nodemailer.
- Do not import server helpers into client components.
- Backend errors should never delay the Thank You redirect. Log server errors in the API route.

## Reuse Checklist

1. Install dependency:

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

2. Copy required files/folders into the new Next.js project.
3. Add `.env.local` variables.
4. Share the Google Sheet with the service account email.
5. Connect the existing form fields to the reusable submit pattern.
6. Keep secrets only in `.env.local` and production environment settings.
7. Run:

```bash
npm run build
```

8. Test by submitting the form:

- Redirect should happen instantly.
- Google Sheet should receive the row.
- Admin should receive the notification email.
- User should receive the thank-you email when a valid email was submitted.
