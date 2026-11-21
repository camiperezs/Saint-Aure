import { site } from "@/config/site";

export function normalizePhone(phone: string): string {
  const digits = phone.replace(/^\+|^00/, "").replace(/\D/g, "");

  if (digits.length < 8 || digits.length > 15) {
    throw new Error(
      `Invalid WhatsApp phone "${phone}": use international format with country code.`,
    );
  }

  return digits;
}

export function getWhatsAppUrl(message?: string): string {
  const phone = site.business.whatsapp;

  if (!phone) {
    throw new Error(
      "A WhatsApp link needs site.business.whatsapp in src/config/site.ts.",
    );
  }

  const url = new URL(`https://wa.me/${normalizePhone(phone)}`);

  if (message) {
    url.searchParams.set("text", message);
  }

  return url.toString();
}
