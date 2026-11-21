import type { Page } from "@/types/page";
import sample from "@/assets/images/sample.jpg";

const placeholder = {
  src: sample,
  alt: "Ilustración de ejemplo con montañas",
};

export const page = {
  hero: {
    variant: "fullscreen",
    eyebrow: "Plantilla ChamDev",
    title: "Una landing profesional lista para cada cliente",
    description:
      "Contenido de ejemplo. Reemplazalo en src/content/page.ts con la información del proyecto.",
    image: placeholder,
    actions: [
      { label: "Ver servicios", href: "#services" },
      { label: "Contacto", href: "#contact" },
    ],
  },

  sections: [
    {
      type: "logos",
      variant: "row",
      title: "Confían en nosotros",
      items: [1, 2, 3, 4, 5].map((index) => ({
        name: `Marca ${index}`,
        image: {
          src: `/placeholders/logo-${index}.svg`,
          alt: `Marca ${index}`,
          width: 160,
          height: 48,
        },
      })),
    },
    {
      type: "about",
      variant: "split",
      eyebrow: "Nosotros",
      title: "Quiénes somos",
      description:
        "Texto de ejemplo para la sección About. Describe la propuesta de valor del cliente en dos o tres oraciones.",
      image: placeholder,
      action: { label: "Conocer más", href: "#contact", variant: "outline" },
    },
    {
      type: "services",
      variant: "grid",
      eyebrow: "Servicios",
      title: "Lo que ofrecemos",
      description: "Servicios de ejemplo con distintos formatos de precio.",
      services: [
        {
          title: "Servicio básico",
          label: "Nuevo",
          description: "Descripción breve del servicio.",
          price: { type: "fixed", amount: 25000, currency: "ARS" },
          action: { label: "Consultar", href: "#contact" },
        },
        {
          title: "Servicio completo",
          description: "El servicio más elegido por los clientes.",
          price: { type: "starting-at", amount: 60000, currency: "ARS" },
          featured: true,
          action: { label: "Consultar", href: "#contact" },
        },
        {
          title: "Servicio a medida",
          description: "Adaptado a las necesidades de cada proyecto.",
          price: { type: "quote" },
          action: { label: "Consultar", href: "#contact" },
        },
      ],
    },
    {
      type: "stats",
      variant: "row",
      eyebrow: "Resultados",
      title: "Números que nos respaldan",
      items: [
        { value: "+500", label: "Clientes", description: "Cifra de ejemplo." },
        { value: "10", label: "Años de experiencia" },
        { value: "98%", label: "Clientes satisfechos" },
        { value: "24 h", label: "Tiempo de respuesta" },
      ],
    },
    {
      type: "pricing",
      eyebrow: "Planes",
      title: "Elegí el plan para tu proyecto",
      description: "Planes de ejemplo con distintos formatos de precio.",
      plans: [
        {
          name: "Inicial",
          description: "Para empezar.",
          price: { type: "fixed", amount: 30000, currency: "ARS" },
          period: "/ mes",
          features: ["Característica de ejemplo", "Soporte por email"],
          action: { label: "Elegir plan", href: "/#contact" },
        },
        {
          name: "Profesional",
          description: "El más elegido.",
          price: { type: "fixed", amount: 60000, currency: "ARS" },
          period: "/ mes",
          features: [
            "Todo lo del plan Inicial",
            "Característica de ejemplo",
            "Soporte prioritario",
          ],
          featured: true,
          action: { label: "Elegir plan", href: "/#contact" },
        },
        {
          name: "A medida",
          description: "Para necesidades específicas.",
          price: { type: "quote" },
          features: ["Todo lo del plan Profesional", "Asesoramiento dedicado"],
          action: { label: "Consultar", href: "/#contact" },
        },
      ],
      note: "Precios de ejemplo. No incluyen impuestos.",
    },
    {
      type: "benefits",
      variant: "grid",
      eyebrow: "Beneficios",
      title: "Por qué elegirnos",
      items: [
        {
          title: "Atención personalizada",
          visual: { type: "icon", name: "message" },
          description: "Beneficio de ejemplo con una descripción breve.",
        },
        {
          title: "Resultados medibles",
          visual: { type: "icon", name: "check" },
          description: "Beneficio de ejemplo con una descripción breve.",
        },
        {
          title: "Soporte continuo",
          visual: { type: "icon", name: "shield" },
          description: "Beneficio de ejemplo con una descripción breve.",
        },
      ],
    },
    {
      type: "process",
      variant: "timeline",
      eyebrow: "Proceso",
      title: "Cómo trabajamos",
      steps: [
        {
          title: "Consulta inicial",
          label: "Semana 1",
          description: "Conversamos sobre las necesidades del proyecto.",
        },
        {
          title: "Propuesta",
          label: "Semana 2",
          description: "Presentamos un plan y un presupuesto detallado.",
        },
        {
          title: "Entrega",
          label: "Semanas 3 y 4",
          description: "Implementamos y acompañamos el lanzamiento.",
        },
      ],
      action: { label: "Empezar ahora", href: "#contact" },
    },
    {
      type: "video",
      eyebrow: "Video",
      title: "Conocé cómo trabajamos",
      video: {
        provider: "youtube",
        id: "aqz-KE-bpKQ",
        title: "Video de ejemplo",
      },
    },
    {
      type: "testimonials",
      variant: "carousel",
      eyebrow: "Testimonios",
      title: "Lo que dicen nuestros clientes",
      description:
        "Testimonios de ejemplo. Reemplazalos solo por testimonios reales y verificados.",
      items: [
        {
          name: "Nombre del cliente",
          role: "Empresa o servicio",
          quote: "Testimonio de ejemplo. Reemplazar por un testimonio real.",
          identity: { type: "initials", value: "NC" },
          rating: 5,
          service: "Servicio completo",
          date: "2026-03-15",
          source: { label: "Fuente de ejemplo" },
        },
        {
          name: "Nombre del cliente",
          role: "Empresa o servicio",
          quote: "Testimonio de ejemplo. Reemplazar por un testimonio real.",
          identity: { type: "initials", value: "NC" },
        },
        {
          name: "Nombre del cliente",
          quote: "Testimonio de ejemplo. Reemplazar por un testimonio real.",
          identity: { type: "none" },
        },
        {
          name: "Nombre del cliente",
          role: "Empresa o servicio",
          quote: "Testimonio de ejemplo. Reemplazar por un testimonio real.",
          identity: { type: "initials", value: "NC" },
          rating: 4,
        },
      ],
    },
    {
      type: "about",
      variant: "image-background",
      eyebrow: "Nuestra historia",
      title: "Más de 10 años acompañando proyectos",
      description:
        "Texto de ejemplo para la variante con imagen de fondo. El contenido se lee sobre un overlay con contraste garantizado.",
      image: placeholder,
      contentPosition: "center",
      action: { label: "Contactanos", href: "/#contact" },
    },
    {
      type: "gallery",
      variant: "masonry",
      eyebrow: "Galería",
      title: "Nuestro trabajo",
      images: [
        {
          image: {
            src: "/placeholders/landscape.svg",
            width: 1600,
            height: 1000,
            alt: "Proyecto de ejemplo 1",
          },
          title: "Proyecto 1",
        },
        {
          image: {
            src: "/placeholders/portrait.svg",
            width: 800,
            height: 1100,
            alt: "Proyecto de ejemplo 2",
          },
          title: "Proyecto 2",
          description: "Descripción opcional.",
        },
        {
          image: {
            src: "/placeholders/landscape.svg",
            width: 1600,
            height: 1000,
            alt: "Proyecto de ejemplo 3",
          },
          aspectRatio: "1/1",
        },
        {
          image: {
            src: "/placeholders/portrait.svg",
            width: 800,
            height: 1100,
            alt: "Proyecto de ejemplo 4",
          },
        },
        {
          image: {
            src: "/placeholders/landscape.svg",
            width: 1600,
            height: 1000,
            alt: "Proyecto de ejemplo 5",
          },
          title: "Proyecto 5",
        },
        {
          image: {
            src: "/placeholders/landscape.svg",
            width: 1600,
            height: 1000,
            alt: "Proyecto de ejemplo 6",
          },
        },
      ],
    },
    {
      type: "faq",
      variant: "accordion",
      indicator: "arrow",
      eyebrow: "Preguntas frecuentes",
      title: "Resolvemos tus dudas",
      items: [
        {
          question: "¿Cuánto tiempo lleva un proyecto?",
          answer: "Respuesta de ejemplo. Depende del alcance de cada proyecto.",
        },
        {
          question: "¿Qué formas de pago aceptan?",
          answer: "Respuesta de ejemplo con los medios de pago disponibles.",
        },
        {
          question: "¿Ofrecen soporte posterior?",
          answer:
            "Respuesta de ejemplo sobre el soporte posterior a la entrega.",
        },
      ],
    },
    {
      type: "contact",
      variant: "split",
      eyebrow: "Contacto",
      title: "Hablemos de tu proyecto",
      description:
        "Completá el formulario o escribinos por el canal que prefieras.",
      channels: [
        {
          type: "email",
          label: "hola@ejemplo.com",
          href: "mailto:hola@ejemplo.com",
        },
        {
          type: "phone",
          label: "+54 9 11 0000-0000",
          href: "tel:+5491100000000",
        },
      ],
      whatsapp: {
        message: "Hola, quiero hacer una consulta.",
      },
      form: {
        provider: "netlify",
        name: "contact",
        action: "/thank-you",
        submitLabel: "Enviar mensaje",
        fields: [
          {
            name: "name",
            label: "Nombre",
            type: "text",
            required: true,
            autocomplete: "name",
          },
          {
            name: "email",
            label: "Email",
            type: "email",
            required: true,
            autocomplete: "email",
          },
          {
            name: "phone",
            label: "Teléfono",
            type: "tel",
            autocomplete: "tel",
          },
          {
            name: "service",
            label: "Servicio de interés",
            type: "select",
            placeholder: "Elegí una opción",
            options: [
              "Servicio básico",
              "Servicio completo",
              "Servicio a medida",
            ],
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
    {
      type: "location",
      variant: "map",
      eyebrow: "Ubicación",
      title: "Dónde encontrarnos",
      address: {
        street: "Calle de ejemplo 123",
        city: "Ciudad Autónoma de Buenos Aires",
        postalCode: "C1000",
        country: "Argentina",
      },
      hours: [
        { day: "Lunes a viernes", hours: "9:00 a 18:00" },
        { day: "Sábados", hours: "10:00 a 13:00" },
      ],
      directions: {
        label: "Cómo llegar",
        href: "https://www.openstreetmap.org/?mlat=-34.6037&mlon=-58.3816#map=16/-34.6037/-58.3816",
        target: "_blank",
      },
      map: {
        provider: "openstreetmap",
        embedUrl:
          "https://www.openstreetmap.org/export/embed.html?bbox=-58.3916%2C-34.6087%2C-58.3716%2C-34.5987&layer=mapnik&marker=-34.6037%2C-58.3816",
      },
    },
    {
      type: "cta",
      variant: "highlight",
      title: "¿Listo para empezar?",
      description: "Llamado a la acción de ejemplo.",
      primaryAction: {
        label: "Escribinos por WhatsApp",
        whatsapp: { message: "Hola, quiero pedir un presupuesto." },
      },
      secondaryAction: { label: "Ver servicios", href: "#services" },
    },
  ],
} satisfies Page;
