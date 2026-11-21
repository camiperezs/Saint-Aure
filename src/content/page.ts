import type { Page } from "@/types/page";
import type { GalleryItem } from "@/types/gallery";
import type { Service } from "@/types/services";
import sample from "@/assets/images/sample.jpg";

// Placeholders hasta recibir las fotos reales (D9).
const whatsappMessage = "Hola, quiero consultar un turno.";

const serviceImage = (slug: string, alt: string) => ({
  type: "image" as const,
  image: {
    src: `https://picsum.photos/seed/${slug}/800/600`,
    alt,
    width: 800,
    height: 600,
  },
});

const services: Service[] = [
  {
    title: "Peinados para novias",
    description:
      "Prueba previa, peinado el día del casamiento y acompañamiento para que el look dure toda la noche.",
    visual: serviceImage(
      "novias",
      "Novia con peinado recogido y detalles de flores",
    ),
    featured: true,
    action: { label: "Consultar", href: "#contact", variant: "outline" },
  },
  {
    title: "Balayage",
    description:
      "Iluminación a mano alzada que se funde con tu color natural y crece sin marcas.",
    visual: serviceImage("balayage", "Melena con balayage rubio miel"),
    action: { label: "Consultar", href: "#contact", variant: "outline" },
  },
  {
    title: "Peinados para eventos",
    description:
      "Recogidos, semirrecogidos y ondas para fiestas, egresos y celebraciones.",
    visual: serviceImage("eventos", "Peinado semirrecogido de fiesta"),
    action: { label: "Consultar", href: "#contact", variant: "outline" },
  },
  {
    title: "Colorimetría",
    description:
      "Diagnóstico del tono ideal para tu piel y coloración pareja de raíz a puntas.",
    visual: serviceImage(
      "colorimetria",
      "Coloración castaño profundo y brillante",
    ),
    action: { label: "Consultar", href: "#contact", variant: "outline" },
  },
  {
    title: "Alisados",
    description:
      "Tratamientos de alisado que reducen el frizz y dejan el cabello dócil por meses.",
    visual: serviceImage("alisados", "Cabello largo, lacio y con brillo"),
    action: { label: "Consultar", href: "#contact", variant: "outline" },
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
      src: sample,
      alt: "Imagen de ejemplo, se reemplaza por una foto de un peinado",
    },
    overlay: "strong",
    alignment: "left",
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
        src: sample,
        alt: "Imagen de ejemplo, se reemplaza por una foto de la profesional trabajando",
      },
      action: {
        label: "Escribime por WhatsApp",
        whatsapp: { message: whatsappMessage },
        variant: "ghost",
      },
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
        portrait("Peinado de novia con iluminación cálida editorial"),
        landscape("Close-up balayage rubio miel"),
        portrait("Peinado fiesta semirrecogido"),
        portrait("Mechas californianas castaño oscuro"),
        landscape("Novia de perfil con ondas naturales"),
        portrait("Colorimetría raíz a puntas"),
        landscape("Peinado recogido bajo elegante"),
        portrait("Balayage rubio plateado natural"),
        portrait("Trenza lateral novia"),
      ],
    },
    {
      type: "stats",
      variant: "row",
      eyebrow: "Saint Aure en números",
      title: "Una trayectoria que respalda cada servicio",
      items: [
        { value: "16+", label: "años de experiencia" },
        { value: "5", label: "especialidades" },
        { value: "Rosario & Roldán", label: "Presencial y a domicilio" },
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
