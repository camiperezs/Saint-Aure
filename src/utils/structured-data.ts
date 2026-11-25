import type { SiteConfig } from "@/types/site";

export function getBusinessStructuredData(site: SiteConfig): string {
  const { business, seo, social = [] } = site;
  const absolute = (path?: string) =>
    path ? new URL(path, site.url).toString() : undefined;

  const data = {
    "@context": "https://schema.org",
    "@type": business.type,
    name: site.name,
    legalName: business.legalName,
    description: business.description,
    url: site.url,
    logo: absolute(
      typeof site.logo?.src === "string" ? site.logo.src : site.logo?.src.src,
    ),
    image: absolute(seo.image?.src),
    telephone: business.telephone,
    email: business.email,
    priceRange: business.priceRange,
    openingHours: business.openingHours,
    address: business.address && {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    sameAs: social.length > 0 ? social.map((link) => link.href) : undefined,
  };

  return JSON.stringify(data).replace(/</g, "\\" + "u003c");
}
