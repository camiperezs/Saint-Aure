---
name: landing-audit
description: Auditoría integral de una landing o de un componente de esta plantilla, que combina diseño (landing-design), movimiento (landing-motion) y conversión (landing-conversion) en un solo informe priorizado. Usala cuando pidan revisar, auditar, criticar o "mejorar" una sección, un componente o la landing de un cliente sin especificar el área, o antes de entregar una landing.
---

# Auditoría de landings ChamDev

Orquesta las tres skills de proyecto. No repite sus reglas: las carga y las aplica.

## 1. Alcance

Definí qué se audita:

- **Componente de la plantilla** (por ejemplo `src/components/sections/Services/`): afecta a todos los clientes. Revisalo con los tres presets y los dos temas en el catálogo `http://localhost:4321/dev/components` (`npm run dev`).
- **Landing de un cliente**: `src/config/site.ts` + `src/content/page.ts` y la página renderizada.

Si no está claro, preguntá. Por defecto la auditoría es **de solo lectura**: no se modifica nada hasta que el usuario elija qué corregir.

## 2. Contexto

1. Leé el contrato en `src/types/`, el componente `.astro` y su `.css`.
2. Para una landing de cliente: rubro, conversión principal y origen del tráfico (evaluación inicial de landing-conversion).
3. Si es posible, mirá el resultado renderizado: catálogo o `npm run dev`, a 375px y a 1280px, en claro y oscuro.

## 3. Las tres lentes

Recorré cada lente con su skill y anotá los hallazgos con `archivo:línea`:

| Lente             | Skill                | Referencias clave                                                           |
| ----------------- | -------------------- | --------------------------------------------------------------------------- |
| Diseño            | `landing-design`     | `references/anti-patterns.md`, `references/quality-floor.md`                |
| Movimiento        | `landing-motion`     | `references/review.md`                                                      |
| Conversión y copy | `landing-conversion` | `references/page-structure.md`, `references/copy.md`, `references/forms.md` |

Si un hallazgo pertenece a dos lentes (por ejemplo un CTA de bajo contraste), anotalo una vez, en la lente de mayor severidad.

## 4. Priorización

| Prioridad | Criterio                                                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **P0**    | Rompe WCAG 2.2 AA, la CSP, el build, el contrato de la plantilla, o publica datos no verificados                                           |
| **P1**    | Afecta directamente la conversión (propuesta de valor confusa, CTA débil o escondido, formulario con fricción) o se ve claramente genérico |
| **P2**    | Jerarquía, ritmo, movimiento mejorable y copy con muletillas                                                                               |
| **P3**    | Pulido                                                                                                                                     |

## 5. Informe

```markdown
## Auditoría: <alcance>

**Diagnóstico:** <una o dos oraciones con lo más importante>

### P0

| Lente | Ubicación | Problema | Corrección propuesta |
| ----- | --------- | -------- | -------------------- |

### P1

…

### Lo que ya está bien

- <para no romperlo al corregir>

### Datos faltantes del cliente

- [NEED: …]
```

- Las correcciones son concretas (qué token, qué variante, qué texto) y respetan la arquitectura: configuración primero, componente después.
- Si una corrección obliga a cambiar la plantilla, marcala como **[plantilla]**: afecta a todos los clientes y requiere actualizar el catálogo y, si cambia un contrato, la guía `docs/guides/new-landing.md`.

## 6. Si te piden aplicar las correcciones

1. Agrupá por lote: P0 primero, y un lote por componente o tema.
2. Después de cada lote:

   ```bash
   npm run check
   npm run lint
   npm run check:contrast
   npm run test:e2e
   ```

3. Si un lote cambia una decisión de arquitectura (por ejemplo, sumar una librería), frená y proponé primero la actualización del registro de decisiones en `docs/architecture/overview.md`.
