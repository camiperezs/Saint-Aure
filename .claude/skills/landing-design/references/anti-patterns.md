# Antipatrones visuales

Estas son las señales que hacen que una landing parezca generada por IA o salida de un template. Son **opciones por defecto a evitar**, no prohibiciones absolutas: si el brief del cliente pide explícitamente una de estas estéticas, el brief manda. Las marcadas como **Prohibido** no tienen excepción en esta plantilla.

## Estructura de página

| Antipatrón                                                                     | Qué hacer en su lugar                                                                                                                                           |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tarjetas idénticas de ícono + título + texto como estructura de toda la página | Alterná variantes: `services` en `featured` o `list`, `benefits` en `horizontal`, una sección `about` con imagen                                                |
| **Prohibido:** tarjetas dentro de tarjetas                                     | Una sola superficie; agrupá por espacio                                                                                                                         |
| Hero con "número grande, etiqueta chica, estadísticas y acento degradé"        | El hero abre con lo más característico del rubro: una foto real, un titular con voz o el resultado que obtiene el cliente. Las cifras van en la sección `stats` |
| Eyebrow en mayúsculas espaciadas encima de **cada** título                     | Eyebrow solo cuando aporta un dato. Como máximo en 1 o 2 secciones                                                                                              |
| Numeración 01/02/03 sin secuencia real                                         | Solo en `process`                                                                                                                                               |
| Un modal para algo que no necesita interrumpir                                 | Contenido en línea o `details`                                                                                                                                  |
| Misma entrada animada en todas las secciones                                   | Ver landing-motion: un solo momento coreografiado                                                                                                               |

## Superficies y color

| Antipatrón                                                                      | Qué hacer en su lugar                                                                            |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Prohibido:** texto con degradé                                                | Énfasis con peso o tamaño                                                                        |
| **Prohibido:** glassmorphism o blur decorativo                                  | Blur solo detrás de un overlay real (menú móvil, lightbox)                                       |
| **Prohibido:** barra de color en un solo lado de una caja redondeada            | Borde completo, fondo teñido o ícono inicial                                                     |
| Sombra dura desplazada (`4px 4px 0`)                                            | Solo si el cliente es explícitamente neobrutalista                                               |
| Degradé violeta a azul sobre blanco                                             | Colores de la identidad del cliente                                                              |
| Texto gris sobre fondo de color                                                 | Texto secundario teñido del tono de la superficie                                                |
| Borde de 1px más sombra amplia (tarjeta fantasma)                               | Elegí uno: borde **o** sombra                                                                    |
| Un solo radio y la misma sombra gris `rgba(0,0,0,.1)` en todo                   | El preset define radios; en tarjetas usá 12 a 16px y reservá el radio pill para controles chicos |
| Rayas con `repeating-linear-gradient` o grillas superpuestas de fondo           | Superficie lisa, degradé sutil o foto                                                            |
| **Prohibido:** textura de ruido con `feTurbulence`, ilustraciones estilo boceto | Geometría vectorial nítida o fotografía                                                          |
| Tonos casi negros genéricos (#0B0B0B, #111) como fondo oscuro                   | Neutros derivados de la escala `neutral` del cliente                                             |
| Elegir claro u oscuro por el rubro                                              | Ambos temas son obligatorios; `defaultTheme` según el uso real                                   |

## Tipografía

| Antipatrón                                                                                 | Qué hacer en su lugar                                            |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| **Prohibido:** Inter, Roboto, Arial o la fuente del sistema como voz display de un cliente | Una fuente con carácter acorde al rubro (ver typography.md)      |
| Resaltar una palabra del titular con cursiva, negrita o color                              | El titular completo con una sola voz                             |
| Etiquetas en mayúsculas por todos lados                                                    | Sentence case; mayúsculas solo en siglas                         |
| Monoespaciada como disfraz "técnico"                                                       | Solo para código o datos                                         |
| Separadores con punto medio ("A · B · C") y flechas "→" agregadas a cada link o botón      | Texto limpio; la flecha solo si indica dirección real (carrusel) |

## Paletas que delatan a la IA

Son legítimas para algunos clientes, pero no las uses si el brief deja la elección abierta:

1. Fondo crema (~#F4F1EA), serif de alto contraste y acento terracota (~#D97757).
2. Fondo casi negro con un único acento verde ácido o bermellón.
3. Layout de diario: filetes finos, radio cero y columnas densas. El preset `editorial` se acerca; usalo cuando el rubro lo justifique, no por defecto.
4. Kit SaaS: tarjetas redondeadas idénticas, la misma sombra suave y lavados de degradé.

## Imágenes

| Antipatrón                                                               | Qué hacer en su lugar                                                        |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Fotos de stock genéricas (apretones de manos, equipo sonriendo a cámara) | Fotos reales del cliente. Si no existen, placeholder neutro y `[NEED: foto]` |
| Máscaras geométricas (círculos, blobs) recortando fotos                  | Recorte rectangular con el radio del preset, o recorte real del sujeto       |
| Imágenes sin `width`/`height`                                            | Siempre con dimensiones; las locales pasan por el pipeline de Astro          |
