---
name: landing-design
description: Dirección visual y corrección de componentes de esta plantilla de landings (Astro + CSS nativo con tokens, presets y temas claro/oscuro). Usala al definir la identidad visual de un cliente (paleta, tipografía, preset), al crear o modificar un componente o sección, y al revisar si una sección se ve genérica o "hecha por IA". No la uses para animaciones (landing-motion) ni para textos y conversión (landing-conversion).
---

# Diseño de landings ChamDev

Destilado de `anthropics/skills` (frontend-design), `pbakaus/impeccable`, `nextlevelbuilder/ui-ux-pro-max-skill` y las Web Interface Guidelines de Vercel, adaptado a la arquitectura de este repositorio. Las fuentes y licencias están en [../README.md](../README.md).

Una landing es una superficie **persuasiva**: el diseño es parte del producto. El objetivo es una identidad propia del rubro del cliente, no la estética por defecto de cualquier landing.

## Límites de la arquitectura (no negociables)

Antes de cualquier decisión visual, respetá lo que ya está resuelto en [docs/architecture/overview.md](../../../docs/architecture/overview.md):

- **Un proyecto de cliente se configura, no se programa.** La identidad del cliente vive en `src/config/site.ts` (`appearance.colors`, `preset`, `typography`) y el contenido en `src/content/page.ts`. Si una mejora visual exige tocar un componente, es una mejora **de la plantilla** y tiene que servir a todos los clientes.
- Los componentes consumen **tokens semánticos** (`--color-*`, `--space-*`, `--text-*`, `--preset-*`), nunca hex ni valores sueltos.
- Los estilos van en el CSS hermano del componente, dentro de `@layer components`. El orden de capas está en `src/styles/global.css`.
- **Claro y oscuro son obligatorios** y cada tema tiene su paleta propia. Nunca invertir colores.
- **WCAG 2.2 AA** en ambos temas. Corré `npm run check:contrast` después de tocar colores; si falla, se ajusta el paso de la escala del cliente, no el componente.
- Sin librerías de cliente. HTML nativo (`dialog`, `details`) y scripts chicos en `src/scripts/`.
- La CSP solo permite estilos con hash: **no uses atributos `style=""`** en el markup (tampoco para custom properties). Resolvé variantes con clases o `data-*`.
- Unidades: `rem` para casi todo, `px` solo para bordes finos. Escala de espaciado en múltiplos de 4 px.

## Proceso en dos pasadas

### Pasada 1: el plan (antes de escribir CSS)

1. **Rubro, público y objetivo.** ¿Qué negocio es? ¿Quién visita? ¿Cuál es la acción principal (WhatsApp, llamada, formulario, turno)? Si el brief no lo dice, proponé uno concreto y confirmalo.
2. **Dirección.** Buscá el rubro en [references/industry-directions.md](references/industry-directions.md): estilo, patrón de página, paleta orientativa y qué secciones conviene priorizar.
3. **Mini sistema:**
   - Color: 4 a 6 valores con nombre y rol, que terminan siendo las escalas `primary`, `secondary` y `neutral` de `site.ts`.
   - Tipografía: familias y roles (Display, Heading, Body, UI). Ver [references/typography.md](references/typography.md).
   - Preset base (`modern`, `elegant`, `editorial`) y qué tokens de preset se ajustan.
   - Composición: concepto en una oración, wireframe ASCII si hay alternativas y alineación (izquierda o centro).
   - **El elemento memorable**: una sola cosa que hace única a esta landing (una foto de producto tratada, una tipografía display con carácter, una composición de hero). Todo lo demás acompaña en silencio.
4. **Revisión del plan.** Contrastalo con [references/anti-patterns.md](references/anti-patterns.md). Si una parte se parece a la opción por defecto de cualquier landing similar, cambiala y decí qué cambiaste y por qué.

### Pasada 2: implementar

Escribí el código a partir del plan revisado y verificá el piso de calidad: [references/quality-floor.md](references/quality-floor.md).

Si el cambio es en la plantilla, probalo en el catálogo `http://localhost:4321/dev/components` con los tres presets y los dos temas.

## Reglas de diseño

### Tipografía

- La tipografía lleva la personalidad. Una familia, o dos claramente distintas. **Nunca `sans-serif` genérica, Inter, Roboto ni Arial como voz display** de un cliente.
- Body con medida de 45 a 75 caracteres (`max-inline-size: 65ch` ya es el estándar del repositorio). Mínimo 1rem.
- `text-wrap: balance` en títulos y `text-wrap: pretty` en párrafos (ya aplicado en `SectionTitle` y `Hero`; mantenelo en componentes nuevos).
- Tracking de titulares entre -0.02em y -0.035em; nunca menos de -0.04em. Los presets ya lo definen con `--text-heading-tracking` (valor usado directamente, sin prefijo `preset-`).
- Texto claro sobre fondo oscuro: un poco más de interlineado y, si la fuente lo pide, un paso más de peso.
- `font-variant-numeric: tabular-nums` en precios, estadísticas y cualquier número que se compare.
- Cargá solo los pesos que se usan, en WOFF2 local, con `font-display: swap` y preload solo para la fuente del primer viewport.

### Espaciado y composición

- Agrupá por significado: espacio corto **dentro** del grupo y generoso **entre** grupos. Más aire arriba de un título que abajo.
- Preferí `gap` para el ritmo entre hermanos.
- Si las tarjetas de una grilla no son realmente equivalentes, no las muestres como equivalentes. Para destacar, usá `featured` (Services, Pricing) o una variante distinta, no un color extra.
- Hacé la prueba de entrecerrar los ojos: el camino principal (titular, CTA) tiene que seguir leyéndose.
- Probá con contenido real y largo en cada breakpoint de referencia (40, 48, 64 y 80rem) y a 320 px.

### Color y superficies

- Los colores del cliente salen de su identidad. No inventes colores de marca extra: derivá tonos de las escalas existentes.
- En superficies de color, el texto secundario se tiñe del tono de la superficie, nunca gris plano.
- La elevación se declara **una vez**: borde o sombra, no ambos a la vez con sombra amplia (la "tarjeta fantasma").
- Sombras con desplazamiento y desenfoque suave. Un halo de color sin desplazamiento es decoración.
- El fondo es superficie: profundidad con un degradé sutil de la marca, una foto bien tratada o un cambio de superficie (`--color-background-alt`). Nunca rayas ni grillas decorativas.
- Diseñá claro y oscuro juntos. Revisá overlays de imagen, formularios, tarjetas, navegación y CTAs en ambos temas.

### Elementos estructurales

- Bordes, numeración, eyebrows, divisores y etiquetas tienen que **codificar información**, no decorar.
- **Eyebrow:** el contrato lo permite (`eyebrow` es opcional en Hero y en las secciones), pero no lo pongas por reflejo encima de cada título. Usalo solo cuando aporta un dato que el título no dice (rubro, zona, categoría). Si todas las secciones lo tienen, sacalo de casi todas.
- Numeración 01/02/03 solo donde hay una secuencia real (`process`).
- Íconos: un único set SVG de `src/icons/` con el mismo trazo y peso. Nunca emoji ni glifos Unicode como íconos.
- Un solo CTA primario por vista. Los demás van como `outline` o `ghost`.

## Modo corrección

Cuando te pidan corregir o mejorar un componente existente:

1. Leé el componente, su CSS y su contrato en `src/types/`.
2. Diagnosticá con [references/anti-patterns.md](references/anti-patterns.md) y [references/quality-floor.md](references/quality-floor.md), citando `archivo:línea`.
3. Clasificá cada hallazgo:
   - **Alta:** rompe accesibilidad, contraste, legibilidad o el layout.
   - **Media:** se lee genérico o la jerarquía es confusa.
   - **Baja:** pulido.
4. Proponé el cambio mínimo que lo resuelve **dentro de los tokens**. Si hace falta un token nuevo, agregalo en `src/styles/tokens/` o en el preset, no en el componente.
5. Refinar conserva la identidad existente. Rediseñar solo si te lo piden.
6. Verificá con `npm run check`, `npm run lint`, `npm run check:contrast` y, si cambió algo visible, `npm run test:e2e`.

## Cierre

- Un elemento memorable y todo lo demás en silencio.
- Antes de dar por terminado, sacá un accesorio, como al salir de casa.
- Entre una opción tibia y una comprometida, elegí la comprometida, siempre dentro del piso de calidad.
