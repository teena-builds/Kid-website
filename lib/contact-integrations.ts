import { createSign } from "crypto";
import nodemailer from "nodemailer";

export function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getOptionalEnv(name: string) {
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

export async function appendValuesToGoogleSheet(sheetName: string, values: string[]) {
  const spreadsheetId = getRequiredEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
  const accessToken = await getGoogleAccessToken();
  const range = `${encodeURIComponent(sheetName)}!A:${String.fromCharCode(64 + values.length)}`;

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ values: [values] })
    }
  );

  if (!response.ok) {
    throw new Error("Unable to save submission to Google Sheets.");
  }
}

export function createTransporter() {
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

export function getBrandedFromAddress() {
  const fromName = getRequiredEnv("BOOKING_FROM_NAME");
  const fromEmail = getOptionalEnv("BOOKING_FROM_EMAIL") || getRequiredEnv("SMTP_USER");

  return `"${fromName}" <${fromEmail}>`;
}

export function getBrandName() {
  return getOptionalEnv("BOOKING_FROM_NAME") || getOptionalEnv("SMTP_FROM") || "Website";
}
