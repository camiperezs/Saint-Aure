import type { Action } from "./action";
import type { ContactChannel } from "./contact";

export interface NavigationLink {
  label: string;
  href: string;
}

export interface HeaderConfig {
  variant: "minimal" | "standard";
  action?: Action;
}

export interface FooterConfig {
  variant: "compact" | "expanded";
  description?: string;
  channels?: ContactChannel[];
  legal?: NavigationLink[];
}
