import "server-only";

import { site } from "@/data/site";
import { services } from "@/data/services";
import { frequencyOptions, type EnquiryInput } from "@/lib/validations";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function label(list: readonly { value: string; label: string }[], value: string) {
  return list.find((item) => item.value === value)?.label ?? value;
}

function serviceLabel(value: string) {
  return (
    services.find((s) => s.slug === value)?.formLabel ??
    "Something else / not sure"
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function enquiryRows(data: EnquiryInput) {
  return [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email || "—"],
    ["Suburb", data.suburb],
    ["Service", serviceLabel(data.service)],
    ["Frequency", label(frequencyOptions, data.frequency)],
    ["Message", data.message || "—"],
  ];
}

async function send(payload: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;

  if (!apiKey || !from) {
    // Not configured yet — see README "Before launch". The enquiry is still
    // logged so nothing is lost while DNS and the mailbox are being set up.
    console.warn(
      "[enquiry] RESEND_API_KEY / ENQUIRY_FROM_EMAIL not set — email not sent.",
    );
    return { delivered: false };
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${site.name} <${from}>`,
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
      ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Resend responded ${response.status}: ${await response.text()}`,
    );
  }

  return { delivered: true };
}

/** Notification to the business. */
export async function sendEnquiryNotification(data: EnquiryInput) {
  const rows = enquiryRows(data)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#64748b;font-size:14px;vertical-align:top">${key}</td><td style="padding:6px 0;font-size:14px;font-weight:500">${escapeHtml(
          String(value),
        )}</td></tr>`,
    )
    .join("");

  return send({
    to: site.email,
    replyTo: data.email || undefined,
    subject: `New enquiry — ${serviceLabel(data.service)} in ${data.suburb} (${data.name})`,
    html: `
      <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px">
        <h2 style="margin:0 0 4px;font-size:18px">New website enquiry</h2>
        <p style="margin:0 0 18px;color:#64748b;font-size:13px">
          Submitted ${new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" })} (Sydney time)
        </p>
        <table style="border-collapse:collapse">${rows}</table>
        <p style="margin:22px 0 0"><a href="tel:${escapeHtml(data.phone)}" style="background:#0f172a;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-size:14px">Call ${escapeHtml(data.name)}</a></p>
      </div>`,
  });
}

/** Auto-reply to the customer, when they gave us an email address. */
export async function sendEnquiryAutoReply(data: EnquiryInput) {
  if (!data.email) return { delivered: false };

  return send({
    to: data.email,
    subject: `We have your enquiry — ${site.name}`,
    html: `
      <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px">
        <h2 style="margin:0 0 12px;font-size:18px">Thanks ${escapeHtml(data.name.split(" ")[0])}, we have your enquiry</h2>
        <p style="font-size:15px;line-height:1.6;color:#334155">
          We have received your request for <strong>${escapeHtml(serviceLabel(data.service))}</strong>
          in ${escapeHtml(data.suburb)} and will be in touch shortly with a fixed price.
        </p>
        <p style="font-size:15px;line-height:1.6;color:#334155">
          If it is urgent, call us any time — we answer 24 hours a day, seven days a week.
        </p>
        <p style="margin:22px 0 0"><a href="${site.phoneHref}" style="background:#0f172a;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-size:14px">Call ${site.phone}</a></p>
        <p style="margin:26px 0 0;color:#94a3b8;font-size:12px">${site.legalName} · ${site.baseSuburb}, ${site.addressRegion} · Servicing all Sydney</p>
      </div>`,
  });
}
