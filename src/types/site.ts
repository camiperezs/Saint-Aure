import type { AnalyticsConfig, ConsentLabels } from "./analytics";
import type { BusinessInfo } from "./business";
import type { ContactLabels, FloatingWhatsApp } from "./contact";
import type { GalleryLabels } from "./gallery";
import type { Image } from "./image";
import type { LocationLabels } from "./location";
import type { PricingLabels } from "./pricing";
import type { VideoLabels } from "./video";
import type { ServiceLabels } from "./services";
import type { TestimonialLabels } from "./testimonials";
import type { FooterConfig, HeaderConfig, NavigationLink } from "./navigation";

import type {
  Theme,
  Preset,
  BrandPalette,
  TypographyConfig,
  ShapeConfig,
  SurfaceConfig,
  IconConfig,
  Density,
} from "./appearance";

export interface SiteSEO {
  title: string;
  description: string;
  robots: "index, follow" | "noindex, nofollow";
  image?: {
    src: string;
    alt: string;
  };
}

export interface SiteAppearance {
  defaultTheme: Theme;
  preset: Preset;
  colors: BrandPalette;
  typography: TypographyConfig;
  shape?: ShapeConfig;
  surfaces?: SurfaceConfig;
  icons?: IconConfig;
  density?: Density;
}

export interface SiteLabels {
  skipToContent: string;
  mainNavigation: string;
  footerNavigation: string;
  socialLinks: string;
  menu: string;
  themeToggle: string;
  services: ServiceLabels;
  testimonials: TestimonialLabels;
  contact: ContactLabels;
  gallery: GalleryLabels;
  location: LocationLabels;
  pricing: PricingLabels;
  video: VideoLabels;
  thankYou: MessagePageLabels;
  notFound: MessagePageLabels;
  consent: ConsentLabels;
  legal: {
    updated: string;
    navigation: string;
  };
}

export interface MessagePageLabels {
  title: string;
  description: string;
  back: string;
}

export interface SiteConfig {
  name: string;
  url: string;
  locale: string;
  /** Logo opcional. Sin él, Header y Footer muestran el nombre como texto. */
  logo?: Image;
  seo: SiteSEO;
  business: BusinessInfo;
  appearance: SiteAppearance;
  labels: SiteLabels;
  navigation: NavigationLink[];
  header: HeaderConfig;
  footer: FooterConfig;
  social?: NavigationLink[];
  floatingWhatsApp?: FloatingWhatsApp;
  analytics?: AnalyticsConfig;
}
