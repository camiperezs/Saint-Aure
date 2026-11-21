import type { ContactForm } from "@/types/contact";
import { netlify } from "./netlify";

export interface FormIntegration {
  attributes: Record<string, string>;
  hiddenFields: { name: string; value: string }[];
  honeypotField?: string;
}

export function getFormIntegration(form: ContactForm): FormIntegration {
  switch (form.provider) {
    case "netlify":
      return netlify(form);
  }
}
