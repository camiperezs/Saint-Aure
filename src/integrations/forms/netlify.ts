import type { ContactForm } from "@/types/contact";
import type { FormIntegration } from "./index";

export function netlify(form: ContactForm): FormIntegration {
  return {
    attributes: {
      "data-netlify": "true",
      "netlify-honeypot": "bot-field",
    },
    hiddenFields: [{ name: "form-name", value: form.name }],
    honeypotField: "bot-field",
  };
}
