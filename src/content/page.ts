import type { Page } from "@/types/page";
import type { Service } from "@/types/services";
import hero from "@/assets/images/hero.webp";
import about from "@/assets/images/about.webp";

const whatsappMessage = "Hola, quiero consultar un turno.";

const serviceImage = (
  src: string,
  alt: string,
  width: number,
  height: number,
) => ({
  type: "image" as const,
  image: { src, alt, width, height },
});

const price = { type: "quote" as const, label: "Presupuesto a medida" };

const services: Service[] = [
  {
    title: "Peinados para novias",
    description:
      "Prueba previa, peinado el día del casamiento y acompañamiento para que el look dure toda la noche.",
    visual: serviceImage(
      "/works/catalog/novia.webp",
      "Novia con peinado recogido y detalles de flores",
      800,
      1000,
    ),
    action: { label: "Consultar", href: "#cta", variant: "outline" },
    specs: [
      { icon: "clock", label: "Duración", value: "2–3 hs" },
      {
        icon: "map-pin",
        label: "Modalidad",
        value: "Presencial o a domicilio",
      },
    ],
    price,
  },
  {
    title: "Balayage",
    description:
      "Iluminación a mano alzada que se funde con tu color natural y crece sin marcas.",
    visual: serviceImage(
      "/works/catalog/balayage.webp",
      "Melena con balayage rubio miel",
      800,
      1000,
    ),
    action: { label: "Consultar", href: "#cta", variant: "outline" },
    price,
    footnote: "Diagnóstico previo incluido",
  },
  {
    title: "Peinados para eventos",
    description:
      "Recogidos, semirrecogidos y ondas para fiestas, egresos y celebraciones.",
    visual: serviceImage(
      "/works/catalog/eventos.webp",
      "Peinado semirrecogido de fiesta",
      800,
      1000,
    ),
    action: { label: "Consultar", href: "#cta", variant: "outline" },
    price,
    specs: [{ icon: "clock", label: "Duración", value: "60–90 min" }],
  },
  {
    title: "Colorimetría",
    description:
      "Diagnóstico del tono ideal para tu piel y coloración pareja de raíz a puntas.",
    visual: serviceImage(
      "/works/catalog/colorimetria.webp",
      "Coloración castaño profundo y brillante",
      800,
      1000,
    ),
    action: { label: "Consultar", href: "#cta", variant: "outline" },
    price,
    footnote: "Incluye diagnóstico de tono",
  },
  {
    title: "Alisados",
    description:
      "Tratamientos de alisado que reducen el frizz y dejan el cabello dócil por meses.",
    visual: serviceImage(
      "/works/catalog/alisados.webp",
      "Cabello largo, lacio y con brillo",
      800,
      1000,
    ),
    action: { label: "Consultar", href: "#cta", variant: "outline" },
    price,
    specs: [{ icon: "clock", label: "Duración", value: "2–4 hs según largo" }],
  },
];

export const page = {
  hero: {
    variant: "fullscreen",
    eyebrow: "Saint Aure",
    title: "El cabello que imaginaste, en las manos que lo hacen realidad",
    titleAccent: "imaginaste,",
    description:
      "16 años de experiencia. Atención presencial y a domicilio en Rosario y Roldán.",
    image: {
      src: hero,
      alt: "Cabello largo con ondas y reflejos balayage, visto desde atrás",
    },
    overlay: "medium",
    focalPoint: "center",
    alignment: "left",
    editorial: "Peluquería de autor · Rosario y Roldán",
    actions: [
      {
        label: "Consultar por WhatsApp",
        whatsapp: { message: whatsappMessage },
      },
      { label: "Ver trabajos", href: "#gallery" },
    ],
  },

  sections: [
    {
      type: "about",
      variant: "split",
      eyebrow: "Sobre el profesional",
      title: "Experiencia, dedicación y atención personalizada",
      titleAccent: "atención personalizada",
      quoteAuthor: "Tomas Mooney",
      quote:
        "Cada trabajo es único. Lo que más valoro es escuchar qué querés y acompañarte para que el resultado sea exactamente el que buscás.",
      description:
        "Desde la elección minuciosa de cada matiz hasta la arquitectura de peinados que deben resistir horas de emoción y movimiento, cada sesión se concibe como una obra a medida. Trabajamos bajo un estándar de hospitalidad serena, asegurando que tu momento de preparación sea tan placentero como el resultado final.",
      image: {
        src: about,
        alt: "Cabello largo con ondas balayage y reflejos dorados, visto desde atrás",
      },
      action: {
        label: "Escribir por WhatsApp",
        whatsapp: { message: whatsappMessage },
        variant: "primary",
        icon: "whatsapp",
      },
      badge: { value: "16+", label: "años de experiencia" },
    },
    {
      type: "services",
      variant: "catalog",
      eyebrow: "Colección de servicios",
      title: "Especialidades",
      services,
    },
    {
      type: "gallery",
      variant: "portfolio",
      eyebrow: "Portfolio",
      title: "El trabajo habla solo",
      description:
        "Click en cualquier imagen para expandir en alta resolución editorial.",
      lightbox: true,
      images: [
        {
          image: {
            src: "/works/peinado.webp",
            width: 1279,
            height: 1600,
            alt: "Recogido con ondas sueltas visto desde atrás",
          },
          aspectRatio: "4/5",
        },
        {
          image: {
            src: "/works/total-blond/total-blond.webp",
            width: 1088,
            height: 1600,
            alt: "Rubio total liso, visto desde atrás",
          },
          aspectRatio: "4/5",
        },
        {
          image: {
            src: "/works/corte/corte.webp",
            width: 1281,
            height: 1600,
            alt: "Corte en capas con color cobrizo, visto desde atrás",
          },
          aspectRatio: "4/5",
        },
        {
          image: {
            src: "/works/corte/corte-02.webp",
            width: 1284,
            height: 1590,
            alt: "Corte en capas y ondas largas, visto desde atrás",
          },
          aspectRatio: "4/5",
        },
        {
          image: {
            src: "/works/balayge/balayage.webp",
            width: 1284,
            height: 1586,
            alt: "Balayage rubio con ondas, visto desde atrás",
          },
          aspectRatio: "4/5",
        },
        {
          image: {
            src: "/works/balayge/balayage-02.webp",
            width: 1284,
            height: 1585,
            alt: "Balayage dorado con ondas, visto desde atrás",
          },
          aspectRatio: "4/5",
        },
        {
          image: {
            src: "/works/balayge/balayage-04.webp",
            width: 1284,
            height: 1586,
            alt: "Balayage con ondas largas, visto desde atrás",
          },
          aspectRatio: "4/5",
        },
        {
          image: {
            src: "/works/balayge/balayage-05.webp",
            width: 1284,
            height: 1595,
            alt: "Balayage luminoso con ondas, visto desde atrás",
          },
          aspectRatio: "4/5",
        },
        {
          image: {
            src: "/works/balayge/balayage-06.webp",
            width: 1284,
            height: 1593,
            alt: "Balayage rubio claro con ondas, visto desde atrás",
          },
          aspectRatio: "4/5",
        },
        {
          image: {
            src: "/works/balayge/balayage-08.webp",
            width: 1122,
            height: 1402,
            alt: "Balayage con reflejos dorados, visto desde atrás",
          },
          aspectRatio: "4/5",
        },
        {
          image: {
            src: "/works/balayge/balayage-bronde.webp",
            width: 1086,
            height: 1448,
            alt: "Balayage bronde con ondas, visto desde atrás",
          },
          aspectRatio: "4/5",
        },
        {
          image: {
            src: "/works/ojo-de-tigre/ojo-de-tigre.webp",
            width: 1086,
            height: 1448,
            alt: "Ojo de tigre con reflejos cálidos, visto desde atrás",
          },
          aspectRatio: "4/5",
        },
      ],
    },
    {
      type: "stats",
      variant: "ruled",
      eyebrow: "Saint Aure en números",
      title: "Una trayectoria que respalda cada servicio",
      items: [
        {
          value: "16+",
          label: "años de experiencia",
          description: "Perfeccionamiento continuo desde 2008",
        },
        {
          value: "5",
          label: "especialidades",
          description: "Peinado, color, tratamientos y más",
        },
        {
          value: "Rosario & Roldán",
          kind: "text",
          label: "Presencial y a domicilio",
          description: "En tu espacio o en el nuestro",
        },
      ],
    },
    {
      type: "cta",
      variant: "badge",
      title: "¿Tenés algo en mente para tu cabello?",
      description:
        "Contame qué estás buscando y te asesoro sin compromiso para planificar tu próxima cita o evento especial.",
      image: {
        src: "/placeholders/portrait.svg",
        alt: "Saint Aure",
        width: 120,
        height: 120,
      },
      details: [
        {
          icon: "shield",
          title: "Atención Presencial",
          description: "En mi espacio de Rosario, con cita previa.",
        },
        {
          icon: "map-pin",
          title: "Servicio a Domicilio",
          description:
            "Me traslado a Rosario y Roldán para que estés cómoda en tu hogar.",
        },
      ],
      primaryAction: {
        label: "Consultar por WhatsApp",
        icon: "whatsapp",
        iconPosition: "start",
        whatsapp: { message: whatsappMessage },
      },
    },
  ],
} satisfies Page;
