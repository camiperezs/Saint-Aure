import type { SiteConfig } from "@/types/site";

const description =
  "Peinados para novias, balayage, colorimetría y alisados en Rosario y Roldán. 16 años de experiencia, atención presencial y a domicilio.";

export const site: SiteConfig = {
  name: "Saint Aure Beauty House",
  url: "https://saintaure.com.ar",
  locale: "es-AR",

  seo: {
    title: "Saint Aure Beauty House — Peinados y color en Rosario y Roldán",
    description,
    robots: "noindex, nofollow",
  },

  business: {
    type: "ProfessionalService",
    description,
    telephone: "+54 9 341 000-0000",
    email: "hola@saintaure.com.ar",
    whatsapp: "+54 9 341 000-0000",
    address: {
      street: "Rosario, Santa Fe",
      city: "Rosario",
      postalCode: "S2000",
      country: "AR",
    },
  },

  appearance: {
    defaultTheme: "dark",
    preset: "elegant",

    colors: {
      primary: {
        50: "#fdf8ef",
        100: "#f9edda",
        200: "#f2d9b2",
        300: "#e9c48a",
        400: "#d4aa6a",
        500: "#c5a477",
        600: "#a67c3a",
        700: "#85622c",
        800: "#6b4e23",
        900: "#4f3a18",
        950: "#2c200e",
      },

      secondary: {
        50: "#faf6f0",
        100: "#f5ecdf",
        200: "#ead9bf",
        300: "#dfc9a0",
        400: "#d4b880",
        500: "#c8a267",
        600: "#a98050",
        700: "#856039",
        800: "#624427",
        900: "#482f18",
        950: "#281a0c",
      },

      neutral: {
        0: "#ffffff",
        50: "#faf7f2",
        100: "#f6f3ed",
        200: "#d4c9ba",
        300: "#bfb09a",
        400: "#a89582",
        500: "#8c7a69",
        600: "#6e5e50",
        700: "#4f3e33",
        800: "#2c2927",
        900: "#1a1715",
        950: "#0b0908",
      },
    },

    typography: {
      body: '"DM Sans", sans-serif',
      heading: {
        family: '"Playfair Display", serif',
        weight: 400,
        tracking: "tighter",
      },
      eyebrow: "uppercase",
      // Variable fonts (latin subset): one file covers both weights,
      // so the browser downloads each family once.
      fonts: [
        {
          family: "Playfair Display",
          src: "/fonts/playfair-display-variable.woff2",
          weight: 400,
        },
        {
          family: "Playfair Display",
          src: "/fonts/playfair-display-variable.woff2",
          weight: 500,
        },
        {
          family: "DM Sans",
          src: "/fonts/dm-sans-variable.woff2",
          weight: 400,
        },
        {
          family: "DM Sans",
          src: "/fonts/dm-sans-variable.woff2",
          weight: 500,
        },
      ],
    },

    shape: {
      cards: "md",
      media: "md",
      buttons: "pill",
    },
    surfaces: { cards: "border" },
    icons: { stroke: "thin" },
    density: "airy",
  },

  labels: {
    skipToContent: "Ir al contenido",
    mainNavigation: "Navegación principal",
    footerNavigation: "Navegación del pie de página",
    socialLinks: "Redes sociales",
    menu: "Menú",
    themeToggle: "Tema oscuro",
    services: {
      featured: "Destacado",
      priceFrom: "Desde",
      priceOnRequest: "Precio a consultar",
    },
    testimonials: {
      previous: "Testimonio anterior",
      next: "Testimonio siguiente",
      rating: "Valoración: {rating} de 5",
    },
    contact: {
      required: "(obligatorio)",
      sending: "Enviando…",
      whatsapp: "Escribime por WhatsApp",
    },
    gallery: {
      open: "Ampliar imagen",
      close: "Cerrar",
      previous: "Imagen anterior",
      next: "Imagen siguiente",
    },
    pricing: {
      featured: "Recomendado",
      features: "Incluye",
    },
    video: {
      play: "Reproducir video",
    },
    location: {
      address: "Dirección",
      hours: "Horarios",
      loadMap: "Cargar mapa",
      mapTitle: "Mapa de ubicación",
    },
    thankYou: {
      title: "¡Gracias por escribirme!",
      description: "Recibí tu mensaje y te respondo a la brevedad.",
      back: "Volver al inicio",
    },
    notFound: {
      title: "Página no encontrada",
      description: "La página que buscás no existe o fue movida.",
      back: "Volver al inicio",
    },
    consent: {
      region: "Aviso de cookies",
      message:
        "Usamos cookies de análisis para entender cómo se usa el sitio y mejorarlo. Solo se activan si las aceptás.",
      accept: "Aceptar",
      reject: "Rechazar",
      manage: "Preferencias de cookies",
      privacyPolicy: "Política de privacidad",
    },
    legal: {
      updated: "Última actualización",
      navigation: "Información legal",
    },
  },

  navigation: [
    { label: "Servicios", href: "/#services" },
    { label: "Sobre mí", href: "/#about" },
    { label: "Trabajos", href: "/#gallery" },
    { label: "Contacto", href: "/#contact" },
  ],

  header: {
    variant: "standard",
    action: {
      label: "Consultar por WhatsApp",
      whatsapp: { message: "Hola, quiero consultar un turno." },
    },
  },

  footer: {
    variant: "expanded",
    description:
      "Peinados, color y alisados con 16 años de experiencia. Atención presencial y a domicilio en Rosario y Roldán.",
    legal: [
      { label: "Política de privacidad", href: "/legal/privacy" },
      { label: "Términos y condiciones", href: "/legal/terms" },
    ],
  },

  social: [],

  floatingWhatsApp: {
    message: "Hola, quiero consultar un turno.",
  },
};
