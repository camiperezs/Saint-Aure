import type { Action, ActionVariant, LinkAction } from "@/types/action";
import type { IconName } from "@/icons";
import { getWhatsAppUrl } from "./whatsapp";

export interface ResolvedAction {
  label: string;
  href: string;
  variant?: ActionVariant;
  target?: LinkAction["target"];
  rel?: string;
  icon?: IconName;
}

export function resolveAction(action: Action): ResolvedAction {
  if (action.whatsapp) {
    return {
      label: action.label,
      href: getWhatsAppUrl(action.whatsapp.message),
      variant: action.variant,
      target: "_blank",
      icon: action.icon ?? "message",
    };
  }

  return action;
}
