import type { Page } from "@/types/page";
import type { GalleryItem } from "@/types/gallery";
import type { Service } from "@/types/services";

// Placeholders hasta recibir las fotos reales (D9).
const whatsappMessage = "Hola, quiero consultar un turno.";

const serviceImage = (alt: string) => ({
  type: "image" as const,
  image: {
    src: "/placeholders/landscape.svg",
    alt,
    width: 800,
    height: 600,
  },
});

const services: Service[] = [
  {
    title: "Peinados para novias",
    label: "Novia & Celebración",
    description:
      "Prueba previa, peinado el día del casamiento y acompañamiento para que el look dure toda la noche.",
    visual: serviceImage("Novia con peinado recogido y detalles de flores"),
    featured: true,
    action: { label: "Consultar", href: "#contact", variant: "outline" },
    // Placeholder — confirmar con la clienta antes del deploy
    specs: [
      { icon: "clock", label: "Duración", value: "2–3 hs" },
      { icon: "map-pin", label: "Modalidad", value: "Presencial o a domicilio" },
    ],
    availabilityBadges: ["Agenda Novias Abierta", "Atención Privada"],
  },
  {
    title: "Balayage",
    label: "Iluminación a Mano",
    description:
      "Iluminación a mano alzada que se funde con tu color natural y crece sin marcas.",
    visual: serviceImage("Melena con balayage rubio miel"),
    action: { label: "Consultar", href: "#contact", variant: "outline" },
    footnote: "Diagnóstico previo incluido", // Placeholder — confirmar con la clienta
  },
  {
    title: "Peinados para eventos",
    label: "Gala & Celebraciones",
    description:
      "Recogidos, semirrecogidos y ondas para fiestas, egresos y celebraciones.",
    visual: serviceImage("Peinado semirrecogido de fiesta"),
    action: { label: "Consultar", href: "#contact", variant: "outline" },
    footnote: "Duración: 60–90 min", // Placeholder — confirmar con la clienta
  },
  {
    title: "Colorimetría",
    label: "Color & Diagnóstico",
    description:
      "Diagnóstico del tono ideal para tu piel y coloración pareja de raíz a puntas.",
    visual: serviceImage("Coloración castaño profundo y brillante"),
    action: { label: "Consultar", href: "#contact", variant: "outline" },
    footnote: "Incluye diagnóstico de tono", // Placeholder — confirmar con la clienta
  },
  {
    title: "Alisados",
    label: "Tratamiento Capilar",
    description:
      "Tratamientos de alisado que reducen el frizz y dejan el cabello dócil por meses.",
    visual: serviceImage("Cabello largo, lacio y con brillo"),
    action: { label: "Consultar", href: "#contact", variant: "outline" },
    footnote: "Duración: 2–4 hs según largo", // Placeholder — confirmar con la clienta
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
    variant: "fullscreen",
    eyebrow: "Saint Aure Beauty House",
    title: "El cabello que imaginaste, en las manos que lo hacen realidad",
    description:
      "16 años de experiencia. Atención presencial y a domicilio en Rosario y Roldán.",
    image: {
      src: "/placeholders/landscape.svg",
      alt: "Imagen de ejemplo, se reemplaza por una foto de un peinado",
      width: 1920,
      height: 1080,
    },
    overlay: "strong",
    alignment: "left",
    editorial: "VOL. XVI / ATELIER ROSARIO / ROLDÁN / ALTA COIFFURE",
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
      eyebrow: "La profesional",
      title: "Experiencia, dedicación y atención personalizada",
      description:
        "Con más de 16 años de experiencia en peinados, color y tratamientos, cada servicio empieza escuchando lo que buscás. Trabajo con turnos personalizados, en mi espacio de Rosario o a domicilio en Rosario y Roldán, para que llegues a tu día especial sin apuros.",
      image: {
        src: "/placeholders/portrait.svg",
        alt: "Imagen de ejemplo, se reemplaza por una foto de la profesional trabajando",
        width: 800,
        height: 1100,
      },
      action: {
        label: "Escribime por WhatsApp",
        whatsapp: { message: whatsappMessage },
        variant: "ghost",
      },
      badge: { value: "16+", label: "años de experiencia", icon: "check" },
    },
    {
      type: "services",
      variant: "featured",
      eyebrow: "Servicios",
      title: "Especialidades",
      description:
        "Cada servicio se adapta a tu cabello y a la ocasión. Consultá para recibir un presupuesto a medida.",
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
      variant: "row",
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
      variant: "carousel",
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
        alt: "Saint Aure Beauty House",
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
