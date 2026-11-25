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

// La variante catalog muestra los datos del contrato D2: duración y
// modalidad en specs y presupuesto a medida. Se arma aquí para no tocar page.ts.
function catalogServices(): CatalogEntry[] {
  const [base] = sectionsOf("services");

  if (base?.type !== "services") {
    return [];
  }

  const specs = [
    { icon: "clock" as const, label: "Duración", value: "2–3 hs" },
    {
      icon: "map-pin" as const,
      label: "Modalidad",
      value: "Presencial o a domicilio",
    },
  ];
  const quote = { type: "quote" as const, label: "Presupuesto a medida" };
  const services = base.services.map((service, index) => {
    const isDuration = service.footnote?.startsWith("Duración: ");
    const duration = isDuration
      ? service.footnote?.replace("Duración: ", "")
      : undefined;

    return {
      title: service.title,
      description: service.description,
      visual: service.visual,
      price: quote,
      footnote: isDuration ? undefined : service.footnote,
      // El cuarto servicio queda sin specs y el segundo con una sola.
      specs:
        index === 3
          ? undefined
          : [
              { ...specs[0], value: duration ?? specs[0].value },
              ...(index === 1 ? [] : [specs[1]]),
            ],
    };
  });

  return [
    {
      label: "services · catalog",
      section: {
        ...base,
        variant: "catalog",
        eyebrow: "Colección de servicios",
        description: undefined,
        action: undefined,
        services,
      },
    },
  ];
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
  ...catalogServices(),
  ...variants("stats", ["row", "cards"]),
  ...sectionsOf("pricing").map((section) => ({ label: "pricing", section })),
  ...variants("benefits", ["grid", "horizontal"]),
  ...variants("process", ["steps", "timeline"]),
  ...sectionsOf("video").map((section) => ({ label: "video", section })),
  ...variants("testimonials", ["cards", "carousel"]),
  ...variants("gallery", ["grid", "masonry", "portfolio"]),
  ...variants("faq", ["accordion", "grid"]),
  ...variants("location", ["map", "information"]),
  ...variants("contact", ["split", "centered", "form"]),
  ...variants("cta", ["simple", "split", "badge"]),
];
