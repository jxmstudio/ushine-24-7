"use server";

import { headers } from "next/headers";

import { enquirySchema, type EnquiryInput } from "@/lib/validations";
import { sendEnquiryAutoReply, sendEnquiryNotification } from "@/lib/email";

export type EnquiryResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

/**
 * In-memory rate limit. Per server instance and reset on deploy, which is
 * plenty for a marketing site — swap for Vercel KV if abuse becomes a problem.
 */
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter(
    (time) => now - time < RATE_LIMIT.windowMs,
  );
  recent.push(now);
  hits.set(key, recent);
  return recent.length > RATE_LIMIT.max;
}

export async function submitEnquiry(input: EnquiryInput): Promise<EnquiryResult> {
  const parsed = enquirySchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check the highlighted fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const data = parsed.data;

  // Honeypot filled, or submitted faster than a human could type: drop it
  // silently so the bot believes it succeeded.
  if (data.company || (data.elapsed !== undefined && data.elapsed < 2500)) {
    return { ok: true };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (rateLimited(ip)) {
    return {
      ok: false,
      error:
        "Too many enquiries from this connection. Please call us instead — we answer 24/7.",
    };
  }

  try {
    // Always log the enquiry server-side: if email delivery ever fails, the
    // lead is still recoverable from the deployment logs.
    console.info("[enquiry]", {
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      suburb: data.suburb,
      service: data.service,
      frequency: data.frequency,
      at: new Date().toISOString(),
    });

    await sendEnquiryNotification(data);
    await sendEnquiryAutoReply(data);

    return { ok: true };
  } catch (error) {
    console.error("[enquiry] delivery failed", error);
    return {
      ok: false,
      error:
        "Something went wrong sending your enquiry. Please call us — we answer 24/7.",
    };
  }
}
