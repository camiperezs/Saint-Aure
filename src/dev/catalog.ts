import type { Hero } from "@/types/hero";
import type { Section } from "@/types/section";
import { page } from "@/content/page";

export interface CatalogEntry {
  label: string;
  hero?: Hero;
  section?: Section;
}

function sectionsOf(type: Section["type"]): Section[] {
  return page.sections.filter((section) => section.type === type);
}

function variants(type: Section["type"], names: string[]): CatalogEntry[] {
  const [base] = sectionsOf(type);

  if (!base) {
    return [];
  }

  return names.map((variant) => ({
    label: `${type} · ${variant}`,
    section: { ...base, variant } as Section,
  }));
}

function heroes(): CatalogEntry[] {
  const hero = page.hero;

  if (!hero) {
    return [];
  }

  const { eyebrow, title, description, actions, image } = hero;
  const content = { eyebrow, title, description, actions, image };

  return [
    { label: "hero · fullscreen", hero },
    { label: "hero · compact", hero: { ...content, variant: "compact" } },
    { label: "hero · split", hero: { ...content, variant: "split" } },
  ];
}

export const catalog: CatalogEntry[] = [
  ...heroes(),
  ...sectionsOf("about").map((section) => ({
    label: `about · ${"variant" in section ? section.variant : ""}`,
    section,
  })),
  ...variants("about", ["centered"]),
  ...variants("logos", ["row", "grid"]),
  ...variants("services", ["grid", "list", "featured"]),
  ...variants("stats", ["row", "cards"]),
  ...sectionsOf("pricing").map((section) => ({ label: "pricing", section })),
  ...variants("benefits", ["grid", "horizontal"]),
  ...variants("process", ["steps", "timeline"]),
  ...sectionsOf("video").map((section) => ({ label: "video", section })),
  ...variants("testimonials", ["cards", "carousel"]),
  ...variants("gallery", ["grid", "masonry"]),
  ...variants("faq", ["accordion", "grid"]),
  ...variants("location", ["map", "information"]),
  ...variants("contact", ["split", "centered", "form"]),
  ...variants("cta", ["simple", "split", "highlight"]),
];
