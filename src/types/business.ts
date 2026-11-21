import type { PostalAddress } from "./location";

export type LocalBusinessType =
  | "LocalBusiness"
  | "ProfessionalService"
  | "Store"
  | "Restaurant"
  | "HealthAndBeautyBusiness"
  | "HomeAndConstructionBusiness"
  | "MedicalBusiness";

interface BusinessBase {
  description: string;
  legalName?: string;
  telephone?: string;
  email?: string;
  whatsapp?: string;
  logo?: string;
  priceRange?: string;
  openingHours?: string[];
}

export interface LocalBusinessInfo extends BusinessBase {
  type: LocalBusinessType;
  address: PostalAddress;
}

export interface OrganizationInfo extends BusinessBase {
  type: "Organization";
  address?: PostalAddress;
}

export type BusinessInfo = LocalBusinessInfo | OrganizationInfo;
