import type { Action } from "./action";
import type { Image } from "./image";

export interface PostalAddress {
  street: string;
  city: string;
  region?: string;
  country: string;
  postalCode?: string;
}

export interface OpeningHours {
  day: string;
  hours: string;
}

export interface MapConfig {
  provider: string;
  embedUrl: string;
  preview?: Image;
}

export interface LocationLabels {
  address: string;
  hours: string;
  loadMap: string;
  mapTitle: string;
}

export interface LocationBase {
  type: "location";
  eyebrow?: string;
  title: string;
  description?: string;

  address: PostalAddress;

  hours?: OpeningHours[];
  directions?: Action;
  action?: Action;
}

export interface LocationMap extends LocationBase {
  variant: "map";
  map: MapConfig;
}

export interface LocationInformation extends LocationBase {
  variant: "information";
  map?: never;
}

export type Location = LocationMap | LocationInformation;
