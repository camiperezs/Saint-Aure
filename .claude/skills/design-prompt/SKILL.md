---
name: design-prompt
description: Genera un prompt estructurado y listo para copiar/pegar en Figma AI, v0, Lovable u otras IAs de diseño. Usala cuando quieras crear un mockup de landing adaptado a un cliente o profesión específica, tomando como base el sistema de diseño y componentes reales de esta plantilla. Se invoca con /design-prompt.
---

# Generador de prompts para IAs de diseño

Esta skill convierte la información de un cliente en un prompt listo para copiar/pegar en cualquier IA de diseño (Figma AI, v0, Lovable, Galileo AI u otras), con el sistema de diseño de esta plantilla como base técnica.

## Tu rol

Sos el intermediario entre el proyecto y la IA de destino. Tu trabajo es:
1. Entender el cliente haciendo preguntas al usuario
2. Traducir ese conocimiento a un prompt preciso que la IA de diseño entienda
3. Anclar ese prompt en los componentes y tokens reales de esta plantilla

**No implementes nada en el código.** Esta skill solo genera texto de prompt.

---

## Proceso

### Paso 1 — Recolectar información del cliente

Hacé estas preguntas de forma conversacional (no todas de golpe; agrupá por temas o hacé las más importantes primero):

**Obligatorias:**
- ¿Cuál es el rubro o industria del cliente? (restaurante, consultorio, estudio jurídico, etc.)
- ¿Cuál es su profesión o quién es el dueño del negocio? (médico clínico, chef, arquitecto, etc.)
- ¿Cuál es el nombre del negocio?
- ¿Cuál es la acción principal que debe hacer el visitante? (llamar, pedir turno, comprar, escribir por WhatsApp, etc.)

**Opcionales pero valiosas:**
- ¿Tiene identidad visual? ¿Tiene colores o tipografías ya definidos?
- ¿Qué secciones necesita la página? (si no lo sabe, sugerí las que corresponden al rubro)
- ¿Hay una foto o imagen real del negocio que protagonice el hero? ¿o se trabaja con placeholders?
- ¿Qué tono tiene el negocio? (formal, cercano, lujoso, enérgico, cálido, etc.)
- ¿La página es para atraer clientes locales, remotos o ambos?

Si el usuario ya te da toda esta información en su mensaje inicial, saltá directo al Paso 2.

---

### Paso 2 — Determinar dirección visual

Con la info del cliente, tomá decisiones de diseño usando la tabla de rubros de esta plantilla:

**Preset base:**
- `modern`: plano, funcional, directo. Para servicios, B2B, tecnología.
- `elegant`: minimal, sereno, premium. Para salud, belleza, legales.
- `editorial`: narrativo, fotográfico, con carácter. Para gastronomía, creativos, fotografía.

**Mapa rubro → configuración orientativa:**

| Rubro | Preset | Estilo | Paleta base | Patrón de página |
|-------|--------|--------|-------------|------------------|
| Servicios para el hogar | `modern` | Plano, directo | Azul + naranja + gris | hero split → benefits → services → process → testimonials → location → contact |
| Clínica / consultorio | `elegant` | Minimal, sereno | Azul + blanco + verde | hero → about → services → process → testimonials → faq → contact |
| Odontología | `modern` | Suave, limpio | Azul fresco + blanco | hero → services → gallery → testimonials → contact |
| Estudio jurídico / contable | `elegant` / `editorial` | Autoridad, minimal | Azul marino + dorado | hero compact → about → services list → stats → testimonials → contact |
| Estética / spa / belleza | `elegant` | Premium, suave | Pasteles + crema + dorado | hero fullscreen → services → gallery → testimonials → pricing → contact |
| Restaurante / cafetería | `editorial` | Fotográfico, cálido | Naranja / marrón + crema | hero fullscreen → about → gallery → location → testimonials → contact |
| Fotografía / estudio creativo | `editorial` | Minimal con movimiento | Blanco y negro | hero fullscreen → gallery → about → pricing → contact |
| Agencia de marketing | `modern` | Audaz, narrativo | Colores saturados | hero → logos → services featured → process → stats → testimonials → cta |
| Consultoría / B2B | `modern` / `elegant` | Sobrio, profesional | Azul + gris neutro | hero → logos → benefits → services → process → stats → testimonials → faq |
| Educación / academia | `modern` | Amable, claro | Colores vivos moderados | hero → benefits → services → pricing → testimonials → faq |
| Gimnasio / deporte | `modern` | Enérgico, contraste alto | Oscuro + acento vibrante | hero fullscreen → benefits → pricing → gallery → testimonials → contact |

Si el rubro no aparece en la tabla, razoná desde el objetivo: ¿necesita confianza (elegant), eficiencia (modern) o carácter visual (editorial)?

---

### Paso 3 — Construir el prompt

Usá esta estructura exacta como plantilla. Completá cada bloque con la información real del cliente. Nada de placeholders vacíos: cada campo tiene que tener contenido real o una instrucción concreta para la IA destino.

```
[SISTEMA DE DISEÑO — BASE TÉCNICA]
Esta landing usa la plantilla ChamDev (Astro + CSS nativo con tokens semánticos).
Los componentes disponibles son:

SECCIONES:
- Hero: variantes fullscreen (imagen a pantalla completa con texto superpuesto), split (imagen + contenido lado a lado) y compact (texto centrado, imagen opcional). Props: eyebrow, title, description, actions[], overlay, alignment, imagePosition, ratio.
- Services: variantes grid, list y featured. Cada servicio tiene: title, description, visual (icon o image), price (fixed/starting-at/range/quote/custom), featured (boolean), action.
- Benefits: tarjetas de beneficios con icon, title y description.
- About: sección "quiénes somos" con imagen, texto, stats opcionales y actions.
- Process: pasos numerados con icon, title y description.
- Testimonials: carrusel de testimonios con quote, author, role y rating.
- Gallery: grilla o masonry de imágenes con lightbox.
- Pricing: planes con features list; uno puede ser featured (recomendado).
- FAQ: preguntas/respuestas en acordeón.
- Stats: métricas clave con número, label y descripción opcional.
- Logos: logotipos de clientes/partners en banda horizontal.
- CTA: sección de llamada a acción con título, descripción y action.
- Contact: formulario + WhatsApp + datos de contacto.
- Location: dirección, horarios y mapa embebido.
- Video: video con portada estática y controles visibles.

COMPONENTES UI:
- Card: surface variants (border / shadow / flat), shape (none/sm/md/lg/xl/2xl), prop featured para destacar.
- Badge: tinted primary, secondary, neutral; radius variants (none/sm/md/pill).
- Button: primary, outline, ghost; radius (none/sm/md/lg/pill).
- ActionButton: botón con icon.
- Media: imagen responsiva con radius (none/sm/md/lg/xl/2xl).
- SectionTitle: title + eyebrow + description, con text-wrap: balance.
- Icon: set SVG unificado, trazo thin o regular.

TOKENS SEMÁNTICOS (no usar hex sueltos):
- Color: --color-primary-{50-950}, --color-secondary-{50-950}, --color-neutral-{0,50-950}
- Superficies: --color-background, --color-background-alt, --color-surface
- Texto: --color-text, --color-text-secondary, --color-text-on-primary
- Espacio: --space-{1-20} (múltiplos de 4px)
- Texto: --text-{xs/sm/base/lg/xl/2xl/3xl/4xl/5xl/6xl}

PRESETS VISUALES:
- modern: bordes rectos o levemente redondeados, sombras sutiles, tipografía sans-serif limpia.
- elegant: más espacio en blanco, tipografía serif opcional para display, bordes más suaves.
- editorial: tipografía display con carácter, composición asimétrica, fotografía protagonista.

[CLIENTE]
Negocio: {NOMBRE_DEL_NEGOCIO}
Rubro: {RUBRO}
Profesión del titular: {PROFESION}
Público objetivo: {DESCRIPCION_PUBLICO}
Acción principal del visitante: {CTA_PRINCIPAL}
Tono: {TONO}

[DIRECCIÓN VISUAL]
Preset: {modern|elegant|editorial}
Estilo: {descripción del estilo en 1 oración}
Paleta:
  - Primary (color de marca): {color o descripción} — se mapeará a --color-primary-{50-950}
  - Secondary (acento): {color o descripción} — se mapeará a --color-secondary-{50-950}
  - Neutral: gris estándar
Tipografía:
  - Display/Heading: {familia o descripción, ej: "serif de estilo clásico" o "sans-serif geométrica bold"}
  - Body: {familia, ej: "sans-serif limpia y legible"}
Forma de tarjetas: {none|sm|md|lg|xl|2xl}
Superficie de tarjetas: {border|shadow|flat}
Icono stroke: {thin|regular}
Densidad: {compact|normal|airy}

[ESTRUCTURA DE PÁGINA — SECCIONES EN ORDEN]
{Lista numerada de secciones con variante y propósito, ej:}
1. Hero variant="fullscreen" — foto real del local con overlay oscuro, título a la izquierda, CTA "Reservar mesa"
2. About — presentar al chef y la historia del restaurante, foto de ambiente, 2 acciones
3. Gallery — masonry de 6 fotos de platos y ambiente
4. Location — dirección, horarios visibles en primer plano, mapa
5. Testimonials — 3 reseñas reales, formato carrusel
6. Contact — formulario simple + WhatsApp como CTA secundario

[COPY ORIENTATIVO]
Hero eyebrow: {texto corto de contexto, ej: "Cocina de autor en Palermo"}
Hero title: {titular principal, ej: "Sabores que cuentan una historia"}
Hero description: {1-2 oraciones de propuesta de valor, ej: "Carta de temporada con ingredientes locales. Reservas de martes a domingo."}
CTA primario: {etiqueta del botón, ej: "Reservar mesa"}
CTA secundario: {ej: "Ver menú"}
Tagline footer: {ej: "Cocina de autor · Palermo, Buenos Aires"}

[INSTRUCCIONES PARA LA IA DE DISEÑO]
Generá un mockup de landing page para escritorio y mobile con esta especificación.
- Respetá el orden de secciones al pie de la letra.
- Usá placeholders de imagen donde no haya foto real especificada.
- El elemento memorable de esta landing es: {UNA SOLA COSA QUE LA HACE ÚNICA}.
- No incluyas animaciones en el mockup estático.
- Ambos temas (claro y oscuro) son obligatorios: mostrá ambos o pedí cuál preferir.
- Un solo CTA primario visible a la vez. Los demás van como outline o ghost.
- Tipografía body: mínimo 1rem, máximo 65ch de ancho.
```

---

### Paso 4 — Entregar el prompt

1. Presentá el prompt completo en un bloque de código (con triple backtick) listo para copiar/pegar.
2. Después del bloque, agregá una nota breve (3-5 líneas) explicando:
   - Por qué elegiste ese preset y esa dirección visual para este rubro
   - Cuál es el "elemento memorable" que elegiste y por qué
   - Si hay algo que el usuario debería ajustar antes de pegarlo (ej: "si tenés colores de marca reales, reemplazá la paleta orientativa antes de usar el prompt")

---

## Reglas de esta skill

- **Nunca inventés datos**: si no sabés el nombre del negocio, el teléfono o las fotos, usá placeholders descriptivos ("foto de fachada del local") en lugar de datos falsos.
- **El elemento memorable es una sola cosa**: una tipografía display fuerte, una foto de producto tratada, una composición de hero distinta. No más de una.
- **Componentes reales**: usá siempre los nombres técnicos de los componentes de esta plantilla (Hero, Services, Card, Badge, etc.) junto con sus variantes reales. No inventes componentes que no existen.
- **Un CTA primario por vista**: los demás van como outline o ghost. Esto va en el prompt y lo tenés que respetar.
- **Claro y oscuro**: siempre mencionalo en las instrucciones para la IA destino.
- **No implementes**: esta skill genera texto de prompt. Si el usuario quiere implementar el resultado, que use `/landing-design` o `/landing-conversion`.
