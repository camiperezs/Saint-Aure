import type { Page } from "@/types/page";
import type { GalleryItem } from "@/types/gallery";
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
      "/works/novia/novia.webp",
      "Novia con peinado recogido y detalles de flores",
      1134,
      728,
    ),
    action: { label: "Consultar", href: "#contact", variant: "outline" },
    // Placeholder — confirmar con la clienta antes del deploy
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
      "/works/balayge/balayage-02.webp",
      "Melena con balayage rubio miel",
      1284,
      1585,
    ),
    action: { label: "Consultar", href: "#contact", variant: "outline" },
    price,
    footnote: "Diagnóstico previo incluido", // Placeholder — confirmar con la clienta
  },
  {
    title: "Peinados para eventos",
    description:
      "Recogidos, semirrecogidos y ondas para fiestas, egresos y celebraciones.",
    visual: serviceImage(
      "/works/peinado.webp",
      "Peinado semirrecogido de fiesta",
      1279,
      1600,
    ),
    action: { label: "Consultar", href: "#contact", variant: "outline" },
    price,
    // Placeholder — confirmar con la clienta
    specs: [{ icon: "clock", label: "Duración", value: "60–90 min" }],
  },
  {
    title: "Colorimetría",
    description:
      "Diagnóstico del tono ideal para tu piel y coloración pareja de raíz a puntas.",
    visual: serviceImage(
      "/works/corte/corte.webp",
      "Coloración castaño profundo y brillante",
      1281,
      1600,
    ),
    action: { label: "Consultar", href: "#contact", variant: "outline" },
    price,
    footnote: "Incluye diagnóstico de tono", // Placeholder — confirmar con la clienta
  },
  {
    title: "Alisados",
    description:
      "Tratamientos de alisado que reducen el frizz y dejan el cabello dócil por meses.",
    visual: serviceImage(
      "/works/corte/corte-02.webp",
      "Cabello largo, lacio y con brillo",
      1284,
      1590,
    ),
    action: { label: "Consultar", href: "#contact", variant: "outline" },
    price,
    // Placeholder — confirmar con la clienta
    specs: [{ icon: "clock", label: "Duración", value: "2–4 hs según largo" }],
  },
];

const portrait = (alt: string): GalleryItem => ({
  image: { src: "/placeholders/portrait.svg", width: 800, height: 1100, alt },
});

const landscape = (alt: string): GalleryItem => ({
  image: { src: "/placeholders/landscape.svg", width: 1600, height: 1000, alt },
});

export const page = {
  hero: {
    variant: "split",
    eyebrow: "Saint Aure",
    title: "El cabello que imaginaste, en las manos que lo hacen realidad",
    description:
      "16 años de experiencia. Atención presencial y a domicilio en Rosario y Roldán.",
    image: {
      src: hero,
      alt: "Cabello largo con ondas y reflejos balayage, visto desde atrás",
    },
    imagePosition: "right",
    ratio: "image",
    titleAccent: "imaginaste,",
    hairFlow: "normal",
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
      variant: "masonry",
      eyebrow: "Trabajos",
      title: "Galería",
      lightbox: true,
      images: [
        {
          ...portrait("Peinado de novia con iluminación cálida editorial"),
          title: "Novia editorial",
          description:
            "Recogido alto con iluminación cálida y detalles naturales",
        },
        {
          ...landscape("Close-up balayage rubio miel"),
          title: "Balayage miel",
          description: "Degradé a mano alzada en castaño dorado",
        },
        {
          ...portrait("Peinado fiesta semirrecogido"),
          title: "Fiesta semirrecogido",
          description: "Ondas sueltas con trenza lateral para gala",
        },
        {
          ...portrait("Mechas californianas castaño oscuro"),
          title: "Mechas californianas",
          description: "Iluminación suave sobre base castaño oscuro",
        },
        {
          ...landscape("Novia de perfil con ondas naturales"),
          title: "Novia ondas",
          description: "Ondas naturales sueltas para ceremonia civil",
        },
        {
          ...portrait("Colorimetría raíz a puntas"),
          title: "Colorimetría integral",
          description:
            "Coloración pareja en tono personalizado de raíz a puntas",
        },
        {
          ...landscape("Peinado recogido bajo elegante"),
          title: "Recogido bajo",
          description: "Moño bajo estructurado para noche de gala",
        },
        {
          ...portrait("Balayage rubio plateado natural"),
          title: "Rubio plateado",
          description: "Aclarado progresivo con resultado frío y luminoso",
        },
        {
          ...portrait("Trenza lateral novia"),
          title: "Trenza lateral",
          description: "Trenza lateral romántica con volumen y adornos",
        },
      ],
    },
    {
      type: "stats",
      variant: "cards",
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
          label: "Presencial y a domicilio",
          description: "En tu espacio o en el nuestro",
        },
      ],
    },
    {
      type: "testimonials",
      variant: "cards",
      eyebrow: "Testimonios",
      title: "Lo que dicen las clientas",
      // Placeholders: reemplazar solo por testimonios reales antes de publicar.
      items: [
        {
          name: "Clienta de ejemplo",
          role: "Novia — casamiento diciembre 2024",
          quote:
            "Testimonio de ejemplo: el peinado duró impecable toda la noche y la prueba previa me dio mucha tranquilidad.",
          identity: { type: "initials", value: "CE" },
          rating: 5,
        },
        {
          name: "Clienta de ejemplo",
          role: "Cliente de balayage",
          quote:
            "Testimonio de ejemplo: logró exactamente el rubio que quería, natural y sin dañar el cabello.",
          identity: { type: "initials", value: "CE" },
          rating: 5,
        },
        {
          name: "Clienta de ejemplo",
          role: "Servicio a domicilio",
          quote:
            "Testimonio de ejemplo: vino a casa el día del evento, puntual y con todo lo necesario.",
          identity: { type: "initials", value: "CE" },
          rating: 5,
        },
      ],
    },
    {
      type: "cta",
      variant: "highlight",
      title: "¿Tenés algo en mente para tu cabello?",
      description: "Contame qué estás buscando y te asesoro sin compromiso.",
      image: {
        src: "/placeholders/portrait.svg",
        alt: "Saint Aure",
        width: 120,
        height: 120,
      },
      primaryAction: {
        label: "Consultar por WhatsApp",
        whatsapp: { message: whatsappMessage },
      },
    },
    {
      type: "contact",
      variant: "split",
      eyebrow: "Contacto",
      title: "Escribime por WhatsApp",
      description:
        "Atención presencial en Rosario y a domicilio en Rosario y Roldán. WhatsApp: +54 9 341 000-0000.",
      whatsapp: { message: whatsappMessage },
      // Placeholder values — confirm icon availability and copy with client
      modalityBlocks: [
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
      form: {
        provider: "netlify",
        name: "contact",
        action: "/thank-you",
        submitLabel: "Enviar consulta",
        fields: [
          {
            name: "name",
            label: "Nombre",
            type: "text",
            required: true,
            autocomplete: "name",
          },
          {
            name: "service",
            label: "Servicio de interés",
            type: "select",
            placeholder: "Elegí una opción",
            options: services.map((service) => service.title),
          },
          {
            name: "modality",
            label: "Preferencia de atención",
            type: "select",
            placeholder: "Elegí una opción",
            options: ["Presencial en atelier", "A domicilio"],
          },
          {
            name: "message",
            label: "Mensaje",
            type: "textarea",
            required: true,
          },
        ],
      },
    },
  ],
} satisfies Page;
