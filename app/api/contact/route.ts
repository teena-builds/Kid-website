import { createSign } from "crypto";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactSubmission = {
  fullName: string;
  company: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

const maxLengths: Record<keyof ContactSubmission, number> = {
  fullName: 120,
  company: 120,
  phone: 40,
  email: 160,
  subject: 160,
  message: 2000
};

function sanitize(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function parseSubmission(body: unknown): ContactSubmission {
  const data = body && typeof body === "object" ? body as Record<string, unknown> : {};

  return {
    fullName: sanitize(data.fullName, maxLengths.fullName),
    company: sanitize(data.company, maxLengths.company),
    phone: sanitize(data.phone, maxLengths.phone),
    email: sanitize(data.email, maxLengths.email).toLowerCase(),
    subject: sanitize(data.subject, maxLengths.subject),
    message: sanitize(data.message, maxLengths.message)
  };
}

function validateSubmission(submission: ContactSubmission) {
  if (!submission.fullName) {
    return "Please enter your name.";
  }

  if (!submission.email && !submission.phone) {
    return "Please enter your email or phone number.";
  }

  if (submission.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
    return "Please enter a valid email address.";
  }

  if (!submission.message) {
    return "Please enter your message.";
  }

  return null;
}

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getOptionalEnv(name: string) {
  return process.env[name]?.trim();
}

function getGooglePrivateKey() {
  const privateKey = getRequiredEnv("GOOGLE_PRIVATE_KEY")
    .replace(/^"|"$/g, "")
    .replace(/\\n/g, "\n");

  if (!privateKey.includes("-----BEGIN PRIVATE KEY-----")) {
    throw new Error(
      "GOOGLE_PRIVATE_KEY must be the full service account private_key value, not the private_key_id."
    );
  }

  return privateKey;
}

function base64UrlEncode(value: string | Buffer) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getGoogleAccessToken() {
  const clientEmail = getRequiredEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const privateKey = getGooglePrivateKey();
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
    throw new Error("Unable to authenticate with Google Sheets.");
  }

  const token = await response.json() as { access_token?: string };
  if (!token.access_token) {
    throw new Error("Google Sheets access token was not returned.");
  }

  return token.access_token;
}

async function appendToGoogleSheet(submission: ContactSubmission) {
  const spreadsheetId = getRequiredEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
  const sheetName = getOptionalEnv("GOOGLE_SHEET_TAB_NAME") || getOptionalEnv("GOOGLE_SHEETS_SHEET_NAME") || "Sheet1";
  const accessToken = await getGoogleAccessToken();

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}!A:G:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        values: [[
          new Date().toISOString(),
          submission.fullName,
          submission.company,
          submission.phone,
          submission.email,
          submission.subject,
          submission.message
        ]]
      })
    }
  );

  if (!response.ok) {
    throw new Error("Unable to save submission to Google Sheets.");
  }
}

function createTransporter() {
  const port = Number(getOptionalEnv("SMTP_PORT") || "587");

  return nodemailer.createTransport({
    host: getRequiredEnv("SMTP_HOST"),
    port,
    secure: getOptionalEnv("SMTP_SECURE") === "true" || port === 465,
    auth: {
      user: getRequiredEnv("SMTP_USER"),
      pass: getRequiredEnv("SMTP_PASS")
    }
  });
}

function formatSubmissionText(submission: ContactSubmission) {
  return [
    `Name: ${submission.fullName}`,
    `Company: ${submission.company || "-"}`,
    `Phone: ${submission.phone || "-"}`,
    `Email: ${submission.email || "-"}`,
    `Subject: ${submission.subject || "-"}`,
    "",
    "Message:",
    submission.message
  ].join("\n");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function formatUserConfirmationText(submission: ContactSubmission) {
  const submittedFields = [
    submission.fullName ? `Name: ${submission.fullName}` : "",
    submission.email ? `Email: ${submission.email}` : "",
    submission.phone ? `Phone: ${submission.phone}` : "",
    submission.company ? `Company: ${submission.company}` : "",
    submission.subject ? `Subject: ${submission.subject}` : "",
    submission.message ? `Message: ${submission.message}` : ""
  ].filter(Boolean);

  return [
    `Hi ${submission.fullName || "there"},`,
    "",
    "Thank you for contacting us. We received your message and our team will get back to you soon.",
    "",
    "Here is a copy of your submission:",
    "",
    ...submittedFields
  ].join("\n");
}

async function sendEmails(submission: ContactSubmission) {
  const transporter = createTransporter();
  const adminEmail = getRequiredEnv("CONTACT_ADMIN_EMAIL");
  const smtpUser = getRequiredEnv("SMTP_USER");
  const fromName = getOptionalEnv("SMTP_FROM");
  const from = fromName ? `${fromName} <${smtpUser}>` : smtpUser;
  const subject = submission.subject || "New website contact form submission";

  await transporter.sendMail({
    from,
    to: adminEmail,
    replyTo: submission.email || undefined,
    subject: `Contact form: ${subject}`,
    text: formatSubmissionText(submission)
  });
}

async function sendUserConfirmationEmail(submission: ContactSubmission) {
  if (!submission.email || !isValidEmail(submission.email)) {
    return;
  }

  try {
    const transporter = createTransporter();
    const smtpUser = getRequiredEnv("SMTP_USER");
    const fromName = getOptionalEnv("SMTP_FROM");
    const from = fromName ? `${fromName} <${smtpUser}>` : smtpUser;

    await transporter.sendMail({
      from,
      to: submission.email,
      subject: "Thank you for contacting us",
      text: formatUserConfirmationText(submission)
    });
  } catch (error) {
    console.error("User confirmation email failed:", error);
  }
}

export async function POST(request: Request) {
  try {
    const submission = parseSubmission(await request.json());
    const validationError = validateSubmission(submission);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    await appendToGoogleSheet(submission);
    await sendEmails(submission);
    await sendUserConfirmationEmail(submission);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form submission failed:", error);

    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again later." },
      { status: 500 }
    );
  }
}
