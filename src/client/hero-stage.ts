import type { Action } from "@/types/action";
import type { TitleLine } from "./StageTitle/types";
import heroPhoto from "@/assets/images/hero-stage.webp";

export interface HeroStageContent {
  eyebrow: string;
  titleLines: TitleLine[];
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
