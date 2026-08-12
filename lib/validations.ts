import { z } from "zod";

import { services } from "@/data/services";

const serviceValues = [...services.map((s) => s.slug), "other"] as const;

/** Australian mobile or landline, with or without spaces / +61. */
const auPhone = /^(\+?61|0)[0-9 ()-]{8,14}$/;

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "That name is too long"),
  phone: z
    .string()
    .trim()
    .min(8, "Please enter a contact number")
    .max(20, "That number is too long")
    .regex(auPhone, "Please enter a valid Australian phone number"),
  email: z
    .string()
    .trim()
    .max(120)
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  suburb: z
    .string()
    .trim()
    .min(2, "Please enter your suburb")
    .max(60, "That suburb name is too long"),
  service: z.enum(serviceValues, {
    message: "Please choose the service you need",
  }),
  frequency: z.enum(["one-off", "weekly", "fortnightly", "monthly", "unsure"]),
  message: z
    .string()
    .trim()
    .max(1500, "Please keep it under 1500 characters")
    .optional()
    .or(z.literal("")),
  /** Honeypot — real users never fill this in. */
  company: z.string().max(0).optional().or(z.literal("")),
  /** Milliseconds the form was on screen before submit; bots submit instantly. */
  elapsed: z.number().optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const frequencyOptions = [
  { value: "one-off", label: "One-off clean" },
  { value: "weekly", label: "Weekly" },
  { value: "fortnightly", label: "Fortnightly" },
  { value: "monthly", label: "Monthly" },
  { value: "unsure", label: "Not sure yet" },
] as const;
