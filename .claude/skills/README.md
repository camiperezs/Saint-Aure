# Skills del proyecto

Skills de Claude Code para diseñar, animar, escribir y auditar landings con esta plantilla. Se cargan solas cuando la tarea coincide con su descripción, o se invocan con `/nombre-de-la-skill`.

| Skill                                             | Para qué                                                                                                             |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [landing-design](landing-design/SKILL.md)         | Dirección visual por rubro, tipografía, antipatrones de IA y piso de calidad (WCAG 2.2 AA, responsive y rendimiento) |
| [landing-motion](landing-motion/SKILL.md)         | Animaciones con CSS primero, dentro de la CSP y sin librerías. Recetas y revisión                                    |
| [landing-conversion](landing-conversion/SKILL.md) | CRO, estructura de página, titulares, CTAs, formularios, precios y copy sin muletillas                               |
| [landing-audit](landing-audit/SKILL.md)           | Auditoría integral priorizada que combina las tres anteriores                                                        |
| [etapas](etapas/SKILL.md)                         | Parte una tarea en etapas dentro de `docs/plans/` para implementar cada una en una sesión limpia y gastar menos      |
| [design-prompt](design-prompt/SKILL.md)           | Genera un prompt listo para copiar/pegar en Figma AI u otras IAs de diseño, adaptado a un cliente o profesión específica con los componentes reales de esta plantilla |

## Cómo se construyeron

No son copias. Se leyeron las skills originales, se tomaron las reglas aplicables y se adaptaron a la arquitectura de la plantilla (Astro, CSS nativo con tokens y capas, CSP con hashes, sin librerías de cliente, temas claro y oscuro obligatorios, WCAG 2.2 AA) y a negocios de servicios en español. Donde una fuente contradice una decisión del repositorio, manda el repositorio.

| Fuente                                                                                                       | Licencia                                 | Qué se tomó                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| [anthropics/skills · frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | Apache 2.0 (licencia propia de la skill) | Proceso en dos pasadas, elemento memorable, paletas que delatan a la IA, reglas de copy de interfaz              |
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable)                                                  | Apache 2.0                               | Piso de calidad, catálogo de antipatrones, reglas de tipografía, layout y motion, criterios de claridad del copy |
| [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)              | MIT                                      | Dirección por rubro, patrones de landing, combinaciones tipográficas, checklist de UX                            |
| [vercel-labs/web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines)              | MIT                                      | Reglas de accesibilidad, formularios, tipografía, rendimiento y temas                                            |
| [emilkowalski/skills](https://github.com/emilkowalski/skills)                                                | MIT                                      | Marco de decisión del movimiento, curvas, duraciones, lista de lo que nunca se publica y formato de revisión     |
| [greensock/gsap-skills](https://github.com/greensock/gsap-skills)                                            | MIT                                      | Buenas prácticas de GSAP, para cuando se decida usarlo                                                           |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)                            | MIT                                      | CRO, copywriting, edición de copy, psicología del marketing y precios                                            |

## Mantenimiento

- Si cambia una decisión de arquitectura (tokens, CSP, librerías o contratos de sección), actualizá las skills que la mencionan.
- Si una fuente publica una versión nueva con reglas útiles, incorporalas adaptadas; no reemplaces las skills por la original.
