import { NextResponse } from "next/server";
import {
  appendValuesToGoogleSheet,
  createTransporter,
  getBrandName,
  getBrandedFromAddress,
  getOptionalEnv
} from "@/lib/contact-integrations";

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

async function appendToGoogleSheet(submission: ContactSubmission) {
  const sheetName = getOptionalEnv("GOOGLE_SHEET_TAB_NAME") || getOptionalEnv("GOOGLE_SHEETS_SHEET_NAME") || "Sheet1";

  await appendValuesToGoogleSheet(sheetName, [
    new Date().toISOString(),
    submission.fullName,
    submission.company,
    submission.phone,
    submission.email,
    submission.subject,
    submission.message
  ]);
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
  const adminEmail = process.env.CONTACT_ADMIN_EMAIL?.trim();
  if (!adminEmail) {
    throw new Error("Missing required environment variable: CONTACT_ADMIN_EMAIL");
  }
  const from = getBrandedFromAddress();
  const brandName = getBrandName();
  const subject = submission.subject
    ? `${brandName} - ${submission.subject}`
    : `${brandName} - New Contact Form Submission`;

  await transporter.sendMail({
    from,
    to: adminEmail,
    replyTo: submission.email || undefined,
    subject,
    text: formatSubmissionText(submission)
  });
}

async function sendUserConfirmationEmail(submission: ContactSubmission) {
  if (!submission.email || !isValidEmail(submission.email)) {
    return;
  }

  try {
    const transporter = createTransporter();
    const from = getBrandedFromAddress();

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
