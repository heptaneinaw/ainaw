import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

const ALLOWED_ORIGIN = "https://inaw.heptane.de";

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;

const requestLog = new Map<string, number[]>();

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];

  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }

  if (Array.isArray(forwarded)) {
    return forwarded[0] ?? "unknown";
  }

  return req.socket.remoteAddress ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  const timestamps = (requestLog.get(ip) ?? []).filter(
    (timestamp) => timestamp > windowStart
  );

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    requestLog.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(ip, timestamps);

  return false;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader("Vary", "Origin");

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later.",
    });
  }

  const { name, email, company, message, website } = req.body ?? {};

  // Honeypot: legitimate users should never fill this field.
  if (typeof website === "string" && website.trim() !== "") {
    return res.status(400).json({
      success: false,
      message: "Invalid form submission.",
    });
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof company !== "string" ||
    typeof message !== "string"
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid form data.",
    });
  }

  if (
    name.trim().length < 2 ||
    name.trim().length > 100 ||
    email.trim().length > 254 ||
    company.trim().length > 150 ||
    message.trim().length < 5 ||
    message.trim().length > 5000
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid form data.",
    });
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;

  if (!smtpUser || !smtpPassword) {
    console.error("SMTP credentials are not configured.");

    return res.status(500).json({
      success: false,
      message: "Email service is currently unavailable.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.strato.de",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    await transporter.sendMail({
      from: smtpUser,
      to: "info@heptane.de",
      replyTo: email.trim(),
      subject: `INAW Contact Form - ${name.trim()}`,
      text: [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Company: ${company.trim() || "Not provided"}`,
        "",
        "Message:",
        message.trim(),
      ].join("\n"),
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("Email sending failed:", error);

    return res.status(500).json({
      success: false,
      message: "The message could not be sent.",
    });
  }
}