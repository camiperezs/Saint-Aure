# Estructura de página y secciones

## Qué responde cada sección

| Sección (`type`) | Pregunta del visitante que responde   | Reglas                                                                                                                                                                                                 |
| ---------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `hero`           | ¿Qué es, es para mí y qué hago ahora? | Titular con el beneficio, bajada de 1 o 2 oraciones y un CTA primario más uno secundario como mucho. La imagen muestra el resultado o el trabajo real, no stock genérico                               |
| `logos`          | ¿Quién más confió?                    | Pocos logos reconocibles antes que muchos desconocidos. Justo después del hero                                                                                                                         |
| `stats`          | ¿Cuánta experiencia tienen?           | Solo cifras reales y verificables, con unidad y contexto ("12 años", "+800 instalaciones en CABA")                                                                                                     |
| `about`          | ¿Quiénes son y por qué confiar?       | La historia en función del cliente final, con caras reales si es posible. Cierra con un CTA                                                                                                            |
| `services`       | ¿Qué ofrecen y cuánto sale?           | Cada servicio con su beneficio y su precio (`fixed`, `starting-at` u `on-request`). Mostrar "desde" convierte más que ocultar el precio. Destacá uno con `featured` solo si es realmente el más pedido |
| `benefits`       | ¿Por qué ellos y no otro?             | Entre 3 y 5 beneficios, no 10. Cada uno con un titular de resultado y una explicación de cómo se logra                                                                                                 |
| `process`        | ¿Cómo es trabajar con ellos?          | Entre 3 y 4 pasos con un verbo simple y su resultado ("Nos escribís por WhatsApp", "Te pasamos el presupuesto en el día"). Baja la complejidad percibida                                               |
| `testimonials`   | ¿Les funcionó a otros como yo?        | Solo reales y verificados: nombre, contexto (barrio, servicio) y un resultado concreto. Evitá los genéricos tipo "Excelente atención". Van cerca de un CTA                                             |
| `gallery`        | ¿Cómo trabajan de verdad?             | Trabajos reales, antes y después si aplica, con alt descriptivo                                                                                                                                        |
| `pricing`        | ¿Qué plan me conviene?                | 2 o 3 planes. El recomendado con `featured`. Responde a la duda de "cuál es para mí" con la descripción de cada plan                                                                                   |
| `faq`            | ¿Y si…?                               | Entre 5 y 10 objeciones reales (precio, zona, tiempos, garantía, medios de pago). Respuestas directas y cortas                                                                                         |
| `location`       | ¿Dónde están y cuándo atienden?       | Dirección y horarios en texto, no solo en el mapa. Destacado en negocios con local                                                                                                                     |
| `video`          | Quiero verlo antes de decidir         | Corto y con portada real. No reemplaza al titular                                                                                                                                                      |
| `cta`            | Ok, ¿cómo sigo?                       | Recapitula el valor en una línea, repite el CTA y suma un reductor de riesgo (garantía, "sin compromiso", tiempo de respuesta)                                                                         |
| `contact`        | ¿Cómo los contacto?                   | El canal preferido primero. Expectativa de respuesta clara. Formulario corto                                                                                                                           |

## Estructuras por objetivo

### Compacta (campañas pagas, una sola oferta)

`hero` → `logos` o `stats` → `benefits` (3) → `testimonials` → `process` (3 pasos) → `cta` con reductor de riesgo.

Configurá el `header` como `minimal` para quitar navegación que distraiga.

### Servicio local (oficios, salud, belleza)

`hero` (CTA de WhatsApp o turno) → `benefits` → `services` (con precios) → `process` → `testimonials` → `gallery` → `faq` → `location` → `contact`.

Sumá el botón flotante de WhatsApp (`floatingWhatsApp`) si WhatsApp es la conversión principal.

### Servicios profesionales o B2B

`hero` → `logos` → `about` → `services` (`list` o `featured`) → `process` → `stats` → `testimonials` → `faq` → `cta`.

### Planes o abonos

`hero` → `benefits` → `pricing` → `testimonials` → `faq` → `cta`.

### Lo que no hay que hacer

- Una página que es solo hero, lista de características y CTA: es una lista, no un argumento.
- Repetir la misma estructura visual en todas las secciones (ver landing-design).
- Esconder la información de contacto o los precios detrás de "consultanos" cuando el cliente puede mostrar un rango.

## Landing de pauta: coincidencia de mensaje

- El titular repite la promesa del anuncio con las mismas palabras.
- La imagen del hero coincide con la del anuncio.
- Una landing por oferta y por público. Si el anuncio habla de "destapaciones", la landing no abre con "servicios integrales de plomería".

## Precios (`services` y `pricing`)

- Mostrar precios ("desde $ X") reduce las consultas que no van a cerrar y genera confianza.
- **Anclaje:** si hay un plan premium, mostralo; hace que el recomendado parezca razonable.
- El plan recomendado es el del medio y se marca con `featured`; nunca solo con color.
- Precios redondos ($ 50.000) para servicios premium; terminados en 9 o 5 ($ 49.900) para servicios orientados al precio.
- Debajo de $ 100.000, los descuentos se expresan en porcentaje ("20% off"); arriba, en monto ("$ 30.000 menos"). Es la regla del 100, escalada a la moneda local.
- Si hay pago anual o en cuotas, mostrá el ahorro o el valor por cuota.
- Los precios van en texto (no en imágenes), así los leen los buscadores y los asistentes de IA.

## Ideas para testear (solo con tráfico suficiente)

- Titular específico contra titular abstracto.
- CTA de WhatsApp contra formulario como acción primaria.
- Precio visible contra "a consultar".
- Testimonios arriba (después del hero) contra abajo (antes del CTA final).
- `header` `minimal` contra `standard` en la landing de pauta.
- Formulario de 3 campos contra 5.
