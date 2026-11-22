import type { IconName } from "@/icons";
import type { Action } from "./action";

export interface ContactModalityBlock {
  icon: IconName;
  title: string;
  description: string;
}

export interface ContactChannel {
  type: "whatsapp" | "email" | "phone" | "social" | "other";
  label: string;
  href: string;
}

export interface WhatsAppLink {
  message?: string;
  label?: string;
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  autocomplete?: string;
  options?: string[];
}

export type FormProvider = "netlify";

export interface ContactForm {
  provider: FormProvider;
  name: string;
  action: string;
  method?: "GET" | "POST";
  fields: FormField[];
  submitLabel: string;
}

export interface ContactLabels {
  required: string;
  sending: string;
  whatsapp: string;
}

export interface Contact {
  type: "contact";
  variant: "split" | "centered" | "form";
  eyebrow?: string;
  title: string;
  description?: string;
  channels?: ContactChannel[];
  whatsapp?: WhatsAppLink;
  modalityBlocks?: ContactModalityBlock[];
  form?: ContactForm;
  action?: Action;
}

export type FloatingWhatsApp = WhatsAppLink;
