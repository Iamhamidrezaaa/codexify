import { z } from "zod";
import { PASSWORD_POLICY } from "@/lib/crypto";

export const adminCreateSchema = z
  .object({
    fullName: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(190),
    password: z.string().min(10).max(128).regex(PASSWORD_POLICY, {
      message:
        "رمز باید حداقل ۱۰ کاراکتر و شامل حرف بزرگ، کوچک، عدد و نماد باشد.",
    }),
    confirmPassword: z.string().min(10).max(128),
    role: z.enum(["SUPER_ADMIN", "ADMIN"]).default("ADMIN"),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "تکرار رمز عبور مطابقت ندارد.",
    path: ["confirmPassword"],
  });

export const adminUpdateSchema = z.object({
  fullName: z.string().trim().min(2).max(120).optional(),
  email: z.string().trim().email().max(190).optional(),
  role: z.enum(["SUPER_ADMIN", "ADMIN"]).optional(),
  status: z.enum(["ACTIVE", "DISABLED"]).optional(),
});

export const adminResetPasswordSchema = z
  .object({
    password: z.string().min(10).max(128).regex(PASSWORD_POLICY, {
      message:
        "رمز باید حداقل ۱۰ کاراکتر و شامل حرف بزرگ، کوچک، عدد و نماد باشد.",
    }),
    confirmPassword: z.string().min(10).max(128),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "تکرار رمز عبور مطابقت ندارد.",
    path: ["confirmPassword"],
  });

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .trim()
    .min(8)
    .max(32)
    .regex(/^[0-9+\-\s()]+$/, "شماره تماس نامعتبر است."),
  projectDescription: z.string().trim().min(5).max(5000),
  website: z.string().max(200).optional(), // honeypot
  utmSource: z.string().max(120).optional(),
  utmMedium: z.string().max(120).optional(),
  utmCampaign: z.string().max(120).optional(),
  utmTerm: z.string().max(120).optional(),
  utmContent: z.string().max(120).optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email(),
});

export const resetPasswordSchema = adminResetPasswordSchema.extend({
  token: z.string().min(20).max(200),
});

export const analyticsCollectSchema = z.object({
  type: z.enum([
    "PAGE_VIEW",
    "CLICK",
    "CTA_CLICK",
    "NAV_CLICK",
    "FORM_OPEN",
    "FORM_SUBMIT",
    "SCROLL_DEPTH",
    "TIME_ON_PAGE",
    "WHATSAPP_CLICK",
    "PHONE_CLICK",
    "SERVICE_CLICK",
    "PORTFOLIO_CLICK",
    "SESSION_START",
    "SESSION_END",
  ]),
  path: z.string().max(500).optional(),
  title: z.string().max(300).optional(),
  label: z.string().max(300).optional(),
  referrer: z.string().max(1000).optional(),
  durationMs: z.number().int().min(0).max(86_400_000).optional(),
  scrollMax: z.number().int().min(0).max(100).optional(),
  visitorKey: z.string().min(8).max(80),
  sessionKey: z.string().min(8).max(80),
  screenSize: z.string().max(40).optional(),
  language: z.string().max(40).optional(),
  timezone: z.string().max(80).optional(),
  utmSource: z.string().max(120).optional(),
  utmMedium: z.string().max(120).optional(),
  utmCampaign: z.string().max(120).optional(),
  utmTerm: z.string().max(120).optional(),
  utmContent: z.string().max(120).optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
});
