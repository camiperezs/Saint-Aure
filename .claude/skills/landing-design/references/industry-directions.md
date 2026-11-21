# Dirección visual por rubro

Punto de partida para la pasada 1. Adaptado de los datasets `products.csv` y `landing.csv` de UI UX Pro Max y traducido a las secciones (`type`) y presets de esta plantilla. Es una orientación: la identidad real del cliente siempre manda sobre la tabla.

## Tabla de rubros

| Rubro                                                 | Preset base             | Estilo                              | Paleta orientativa                           | Orden de secciones sugerido                                                                 |
| ----------------------------------------------------- | ----------------------- | ----------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Servicios para el hogar (plomería, electricidad, gas) | `modern`                | Plano, accesible, directo           | Azul confianza + naranja de seguridad + gris | hero (split) → benefits → services → process → testimonials → location → faq → contact      |
| Clínica, consultorio médico                           | `elegant`               | Minimal, accesible, sereno          | Azul médico + blanco + verde calmo           | hero → about (profesionales) → services → process → testimonials → faq → location → contact |
| Odontología                                           | `modern`                | Suave, limpio                       | Azul fresco + blanco + acento cálido         | hero → services → gallery (antes/después) → testimonials → process → faq → contact          |
| Veterinaria                                           | `modern`                | Cálido, cercano                     | Azul + acentos cálidos                       | hero → services → about → testimonials → location → contact                                 |
| Estudio jurídico o contable                           | `elegant` o `editorial` | Autoridad, minimal                  | Azul marino + dorado + blanco                | hero (compact) → about → services (list) → stats → testimonials → faq → contact             |
| Inmobiliaria                                          | `modern`                | Minimal con fotografía protagonista | Azul + dorado + blanco                       | hero (fullscreen) → services → gallery → stats → testimonials → contact                     |
| Estética, spa, belleza                                | `elegant`               | Suave, premium                      | Pasteles suaves + crema + dorado             | hero (fullscreen) → services → gallery → testimonials → pricing → location → contact        |
| Restaurante, cafetería                                | `editorial` o `modern`  | Fotografía protagonista, cálido     | Naranja, rojo o marrón cálido + crema        | hero (fullscreen) → about → gallery → location (horarios visibles) → testimonials → contact |
| Fotografía, estudio creativo                          | `editorial`             | Minimal con movimiento              | Blanco y negro                               | hero (fullscreen) → gallery (masonry) → about → pricing → contact                           |
| Agencia de marketing o diseño                         | `modern`                | Audaz, narrativo                    | Colores de marca saturados                   | hero → logos → services (featured) → process → stats → testimonials → cta → contact         |
| Servicios B2B, consultoría                            | `modern` o `elegant`    | Minimal, sobrio                     | Azul profesional + gris neutro               | hero → logos → benefits → services → process → stats → testimonials → faq → cta             |
| Educación, cursos, academia                           | `modern`                | Amable, claro                       | Colores vivos moderados                      | hero → benefits → services → pricing → testimonials → faq → contact                         |
| Gimnasio, deporte                                     | `modern`                | Enérgico, contraste alto            | Oscuro + acento vibrante                     | hero (fullscreen) → benefits → pricing → gallery → testimonials → location → contact        |
| Cuidado de personas mayores                           | `elegant`               | Accesible, cálido, texto grande     | Azul calmo + neutros cálidos                 | hero → about → services → process → testimonials → faq → contact                            |

## Patrones de página (de `landing.csv`)

Elegí uno según el objetivo de conversión:

| Patrón                                 | Cuándo                                  | Cómo se arma acá                                                                                                                         |
| -------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Confianza y autoridad + conversión** | Servicios profesionales, salud, legales | hero con propuesta clara → `logos` o `stats` (credenciales reales) → `services` → CTA "Pedí turno" o "Consultá"                          |
| **Conversión + confianza (local)**     | Oficios, servicios a domicilio          | hero con WhatsApp como CTA primario → `benefits` (respuesta rápida, garantía) → precios transparentes en `services` → `location` → `faq` |
| **Hero protagonista + prueba social**  | Belleza, gastronomía, inmobiliaria      | hero `fullscreen` con foto real → `gallery` → `testimonials` → `contact`                                                                 |
| **Narrativo**                          | Agencias, estudios creativos            | hero → `process` → `gallery` → `stats` → `cta`                                                                                           |
| **Pricing primero**                    | Planes, abonos, cursos                  | hero → `pricing` (plan recomendado con `featured`) → `faq` → `cta`                                                                       |
| **Minimal de una columna**             | Campañas pagas con una sola oferta      | hero `compact` → `benefits` (3 como máximo) → `testimonials` → `cta`, sin secciones extra                                                |

## Reglas de conversión que cruzan todos los rubros

- El CTA primario necesita al menos 4.5:1 de contraste contra su fondo, en ambos temas.
- Carruseles: controles manuales, sin autoplay (ya es contrato de `testimonials`).
- Efectos de parallax, scroll o shimmer se desactivan con `prefers-reduced-motion` y muestran el estado final estático.
- Nunca inventes escasez ni cifras. Contadores, cantidad de clientes y ratings solo si son reales, actuales y los provee el cliente.
- Video: portada estática, controles visibles y sin autoplay (ya es contrato de `video`).
