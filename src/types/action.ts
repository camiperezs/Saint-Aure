import type { IconName } from "@/icons";

export type ActionVariant = "primary" | "secondary" | "outline" | "ghost";

interface ActionBase {
  label: string;
  variant?: ActionVariant;
  icon?: IconName;
}

export interface LinkAction extends ActionBase {
  href: string;
  target?: "_self" | "_blank";
  rel?: string;
  whatsapp?: never;
}

export interface WhatsAppAction extends ActionBase {
  whatsapp: { message?: string };
  href?: never;
  target?: never;
  rel?: never;
}

export type Action = LinkAction | WhatsAppAction;
