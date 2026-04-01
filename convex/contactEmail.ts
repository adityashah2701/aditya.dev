"use node";

import { v } from "convex/values";
import nodemailer from "nodemailer";
import { internalAction } from "./_generated/server";

type ContactEmailPayload = {
  name: string;
  email: string;
  message: string;
  createdAt: number;
  ip: string;
  userAgent: string;
};

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function buildContactEmailText(payload: ContactEmailPayload): string {
  return [
    "New contact message received",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Timestamp: ${new Date(payload.createdAt).toISOString()}`,
    `IP Address: ${payload.ip}`,
    `User-Agent: ${payload.userAgent}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");
}

function getSmtpPort(): number {
  const value = getRequiredEnv("SMTP_PORT");
  const port = Number.parseInt(value, 10);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("SMTP_PORT must be a valid positive integer.");
  }

  return port;
}

function getSmtpSecure(port: number): boolean {
  const configured = process.env.SMTP_SECURE?.trim().toLowerCase();

  if (configured === "true") {
    return true;
  }

  if (configured === "false") {
    return false;
  }

  return port === 465;
}

async function sendContactNotificationEmail(
  payload: ContactEmailPayload,
): Promise<void> {
  const host = getRequiredEnv("SMTP_HOST");
  const port = getSmtpPort();
  const secure = getSmtpSecure(port);
  const user = getRequiredEnv("SMTP_USER");
  const pass = getRequiredEnv("SMTP_PASS");
  const from = getRequiredEnv("CONTACT_FROM_EMAIL");
  const to = getRequiredEnv("CONTACT_TO_EMAIL");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  await transporter.sendMail({
    from,
    to,
    replyTo: payload.email,
    subject: `New portfolio contact from ${payload.name}`,
    text: buildContactEmailText(payload),
  });
}

export const deliverContactNotification = internalAction({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
    createdAt: v.number(),
    ip: v.string(),
    userAgent: v.string(),
  },
  handler: async (_ctx, args) => {
    await sendContactNotificationEmail(args);
  },
});
