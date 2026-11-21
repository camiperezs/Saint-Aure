import type { Action } from "./action";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQ {
  type: "faq";
  variant: "accordion" | "grid";
  eyebrow?: string;
  title: string;
  description?: string;
  indicator?: "arrow" | "plus-minus";
  items: FAQItem[];
  action?: Action;
}
