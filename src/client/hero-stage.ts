import type { Action } from "@/types/action";
import heroPhoto from "@/assets/images/hero-stage.webp";

/**
 * Contenido del hero "stage" de Saint Aure (docs/plans/hero-header-stage.md,
 * D2). El tipo `Hero` de la plantilla no tiene esta variante, por eso vive acá.
 */

interface TitleSegment {
  text: string;
  accent?: boolean;
}

interface HeroStageContent {
  eyebrow: string;
  /** Una entrada por línea del título; el acento va en dorado cursiva. */
  titleLines: TitleSegment[][];
  description: string;
  image: { src: ImageMetadata; alt: string };
  primaryAction: Action;
  secondaryAction: Action;
}

const whatsappMessage = "Hola, quiero consultar un turno.";

export const heroStage: HeroStageContent = {
  eyebrow: "Saint Aure",
  titleLines: [
    [{ text: "El cabello que" }],
    [{ text: "imaginaste,", accent: true }, { text: " en" }],
    [{ text: "las manos que lo" }],
    [{ text: "hacen realidad" }],
  ],
  description:
    "16 años de experiencia. Atención presencial y a domicilio en Rosario, Roldán y Baigorria.",
  image: {
    src: heroPhoto,
    alt: "Mujer de espaldas con cabello largo ondulado y reflejos caramelo",
  },
  primaryAction: {
    label: "Consultar por WhatsApp",
    whatsapp: { message: whatsappMessage },
    icon: "whatsapp",
  },
  secondaryAction: { label: "Ver trabajos", href: "#gallery" },
};
