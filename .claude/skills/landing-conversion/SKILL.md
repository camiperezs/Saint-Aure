---
name: landing-conversion
description: Conversión (CRO) y textos para landings de esta plantilla: orden de secciones, propuesta de valor, titulares, CTAs, prueba social, objeciones, formularios y precios. Usala al escribir o revisar el contenido de src/content/page.ts y los labels de site.ts, al elegir qué secciones lleva la landing de un cliente y al auditar por qué una landing no convierte. No la uses para lo visual (landing-design) ni para animaciones (landing-motion).
---

# Conversión y copy para landings ChamDev

Destilado de `coreyhaines31/marketingskills` (cro, copywriting, copy-editing, marketing-psychology, pricing) y de la guía de copy de `anthropics/skills` (frontend-design), adaptado a negocios de servicios y a esta plantilla. Las fuentes y licencias están en [../README.md](../README.md).

## Límites del repositorio

- **Nada inventado.** Testimonios, ratings, cantidad de clientes, años de experiencia, certificaciones y resultados se publican solo si los provee el cliente y son verificables. Es contrato de la plantilla (`testimonials` nunca muestra 5 estrellas por defecto) y además una responsabilidad legal. Donde falte un dato, escribí `[NEED: dato]` y avisalo.
- El contenido vive en `src/content/page.ts` (Hero y secciones) y los textos de interfaz en `site.labels` (`src/config/site.ts`). No se escribe copy dentro de los componentes.
- Los datos del negocio (`business`) tienen que coincidir con lo que dice la página: la dirección, los horarios y el teléfono del JSON-LD son los mismos que se muestran.
- El tratamiento (vos, tú o usted) depende del mercado del cliente (`locale`). Elegí uno y mantenelo en toda la página, labels incluidos.

## Evaluación inicial (antes de escribir o recomendar)

1. **Rubro y oferta:** qué vende, a quién y qué lo diferencia de verdad.
2. **Conversión principal (una sola):** WhatsApp, llamada, formulario, turno online o visita al local. Define el CTA primario de toda la página.
3. **Origen del tráfico:** búsqueda local en Google, Google Ads, Instagram o referidos. Define cuánto sabe el visitante al llegar y el mensaje que tiene que coincidir con el anuncio.
4. **Objeciones del cliente final:** precio, confianza, zona de cobertura, tiempos o "¿esto sirve para mi caso?".
5. **Prueba disponible:** testimonios reales, fotos de trabajos, logos de clientes, cifras verificables o matrículas.

Si falta información clave, preguntala. No la completes con supuestos presentados como hechos.

## Dimensiones, en orden de impacto

1. **Claridad de la propuesta de valor.** En 5 segundos el visitante entiende qué es, para quién y por qué le conviene. Es la sección `hero`: `title` + `description`.
2. **Titular.** Específico, con el beneficio principal, en el idioma del cliente final y coherente con el anuncio que trajo al visitante.
3. **CTA.** Una acción primaria visible sin hacer scroll, con un texto que dice lo que el visitante obtiene, repetida en los puntos de decisión (después de servicios, de testimonios y al final con `cta`).
4. **Jerarquía y escaneo.** Quien solo lee títulos entiende la oferta.
5. **Confianza y prueba social.** `testimonials`, `logos`, `stats` y `gallery` con trabajos reales, cerca de los CTAs y después de cada afirmación fuerte.
6. **Objeciones.** `faq` con las 5 a 10 dudas reales, precios transparentes en `services` o `pricing`, `process` para mostrar cómo se trabaja, garantías si existen.
7. **Fricción.** Campos de más en el formulario, pasos poco claros, navegación que distrae o lentitud.

El detalle de cada sección y las estructuras de página por objetivo están en [references/page-structure.md](references/page-structure.md).

## Reglas de copy

Las reglas completas, con la lista de muletillas de IA en español, están en [references/copy.md](references/copy.md). Lo esencial:

- **Claridad antes que ingenio.** Beneficios antes que características. Específico antes que vago: "Respondemos en menos de 2 horas" en lugar de "Atención rápida", siempre que sea cierto.
- **El idioma del cliente final**, no el del negocio. Repetí la palabra que usa él, sin sinónimos para variar.
- **Prueba de las tres preguntas**, para cada línea: ¿el lector lo puede imaginar? ¿se puede comprobar? ¿lo podría firmar la competencia? Si la competencia podría firmarlo, reescribilo con un dato propio o marcá `[NEED: diferencial]`.
- Una o dos frases con golpe por página (el titular y una sección). El resto, claro y declarativo.
- Voz activa, sin signos de exclamación en el cuerpo y sin rayas en titulares ni en CTAs.

### CTAs

Fórmula: **verbo + lo que obtiene + calificador si hace falta.**

| Débil                 | Fuerte                                       |
| --------------------- | -------------------------------------------- |
| Enviar                | Pedir presupuesto                            |
| Contacto              | Escribinos por WhatsApp                      |
| Ver más / Conocer más | Ver servicios y precios                      |
| Consultar             | Consultar disponibilidad                     |
| Reservar              | Reservar turno para esta semana (si es real) |

- El texto del botón y lo que pasa después coinciden: "Pedir presupuesto" lleva a un formulario o chat de presupuesto, no a una página genérica.
- Primario con la variante `primary` y uno secundario como mucho (`outline` o `ghost`) por bloque.
- En CTAs de WhatsApp, el mensaje precargado dice qué quiere el visitante ("Hola, quiero un presupuesto para…"), así la conversación arranca encaminada.

## Formularios

`ContactForm` tiene campos configurables. Cada campo extra cuesta conversiones: con 3 campos se convierte lo esperado, con 4 a 6 la tasa cae entre 10 y 25%, y con 7 o más cae entre 25 y 50%. Detalle campo por campo, microcopy y estados en [references/forms.md](references/forms.md).

## Principios de persuasión (con ética)

Prueba social, autoridad, reducción de riesgo, anclaje de precios y la ley de Hick bien aplicados, sin urgencia ni escasez falsas. Ver [references/psychology.md](references/psychology.md).

## Medición

La plantilla ya mide `contact_click` (WhatsApp, teléfono o email), `cta_click` y el envío de formularios (`src/scripts/conversions.ts`), solo con consentimiento. Al recomendar cambios, decí qué evento debería moverse y proponé cómo comparar antes y después.

## Formato del resultado (auditoría o propuesta)

1. **Diagnóstico** en una línea, con la evidencia.
2. **Cambios rápidos:** se aplican ya en `page.ts` o `site.ts`.
3. **Cambios de alto impacto:** priorizados, con la sección afectada.
4. **Ideas para testear:** hipótesis del tipo "si cambiamos X, sube el evento Y porque Z".
5. **Alternativas de copy:** 2 o 3 opciones para el titular y el CTA principal, con su razón.
6. **Datos faltantes:** lista de `[NEED: …]` para pedirle al cliente.

Si te piden solo un retoque puntual, devolvé únicamente las líneas cambiadas, cada una con su motivo.
