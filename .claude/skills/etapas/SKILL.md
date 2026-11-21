---
name: etapas
description: Divide una tarea en etapas escritas en un plan (docs/plans/<tema>.md) para implementarlas de a una, cada una en una sesión limpia después de /clear. Usar cuando Camila pide planificar, dividir o "partir en etapas" un componente, una sección, una mejora de la plantilla o la landing de un cliente, y también cuando arranca una sesión con "/etapas <plan> <número>" o pide implementar, continuar o retomar una etapa de un plan.
argument-hint: "[plan] [número de etapa | retoques]"
---

# Trabajo por etapas

Las sesiones largas son lo que más tokens gasta: cada mensaje vuelve a leer toda la conversación, y un retoque visual pedido con 600 k de contexto cuesta diez veces más que el mismo pedido al principio. Por eso el trabajo se corta así: una sesión para planificar y una sesión por etapa, con `/clear` entre ellas. El plan es el único puente entre sesiones, así que tiene que alcanzar por sí solo para retomar sin la conversación anterior.

La skill tiene tres modos según los argumentos (`$ARGUMENTS`):

- Sin plan, o con un pedido nuevo: **planificar**.
- Con plan y número: **implementar esa etapa**.
- Con plan y `retoques`: **aplicar los retoques acumulados**.

## Planificar

1. Ubicar la tarea sin recorrer el repo entero. El mapa está en `README.md` (estructura y scripts) y `docs/architecture/overview.md` (decisiones y contratos). Desde ahí, leer solo los archivos que toca la tarea: el contrato en `src/types/`, el componente en `src/components/` y su `.css`, y `src/content/page.ts` o `src/config/site.ts` si cambia el contenido. Nunca leer `node_modules/`, `dist/` ni `test-results/`.
2. Definir el alcance, porque cambia qué se puede tocar (ver `docs/guides/template-updates.md`):
   - **Plantilla**: componentes, estilos, scripts, tipos, tests. Afecta a todos los clientes.
   - **Cliente**: solo `site.ts`, `page.ts`, `src/assets/images/`, `src/icons/` y `public/`. Si algo no se resuelve por configuración, es una etapa de la plantilla, no del cliente.
3. Hacer las preguntas que hagan falta. Esta es la sesión para decidir; las de implementación no deberían reabrir decisiones.
4. Escribir el plan en `docs/plans/<tema>.md` (o agregar al que ya exista). Las decisiones van numeradas (D1, D2…) para citarlas desde las etapas.
5. Escribir la sección `## Plan por etapas` con el formato de abajo y commitear el plan (`docs: add <tema> plan`).
6. Cerrar con el mensaje de cierre. No empezar la etapa 1 en esta misma sesión, aunque sobre lugar.

### Tamaño de una etapa

Una etapa entra en una sesión sin pasar de unos 200 k de contexto. En esta plantilla suele ser una de estas:

- El contrato en `src/types/` más el componente con una o dos variantes y su CSS.
- Las variantes restantes de un componente.
- Un script de interacción en `src/scripts/` (y su hash en la CSP si es inline).
- Los tests e2e de un componente o comportamiento.
- En un cliente: identidad visual (`site.ts`, preset, paleta, tipografía), contenido de las secciones (`page.ts`), imágenes, y auditoría final con `check:launch`.

Si una etapa necesita leer muchos componentes o mezclar contrato, estilos, script y tests de varias secciones, se parte. Cada etapa deja la build pasando y el catálogo funcionando: nunca una etapa a medias que dependa de la siguiente para no romper.

### Formato del plan

```markdown
# <Tema>

Alcance: plantilla | cliente.

## Decisiones

- **D1**: …

## Plan por etapas

Cada etapa se implementa en una sesión nueva con `/etapas docs/plans/<tema>.md <número>`.

### Etapa 1: <nombre corto>

- **Objetivo**: qué queda funcionando al terminar, en una o dos oraciones.
- **Leer antes**: las decisiones del plan (por ejemplo D2 a D4), los archivos puntuales y la skill que aplica (`landing-design`, `landing-motion` o `landing-conversion`), si aplica alguna. Nada más.
- **Archivos**: los que se crean o tocan, con su ruta.
- **Verificación**: los comandos y qué mirar en el navegador (ver abajo).
- **Modelo sugerido**: Opus si hay diseño visual, contratos nuevos, CSP o accesibilidad no trivial; Sonnet si sigue el patrón de un componente que ya existe o es contenido.
- **Estado**: Pendiente.

## Retoques

Ajustes chicos que aparecen durante las etapas y se aplican juntos al final.
```

### Verificación según lo que toca la etapa

| Si la etapa toca                      | Correr                                                                                               |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Cualquier cosa                        | `npm run check`, `npm run lint`, `npm run format:check`                                              |
| Componentes, estilos o scripts        | Catálogo `/dev/components` (`npm run dev`) a 375 y 1280 px, temas claro y oscuro, los tres presets   |
| Colores, temas o tokens               | `npm run check:contrast`                                                                             |
| Comportamiento, CSP, SEO, formularios | `npm run build` y después `npm run test:e2e` (solo el spec que corresponde, por ejemplo `form.spec`) |
| Cierre de una landing de cliente      | `npm run build`, `npm run test:e2e` completo y `npm run check:launch`                                |

## Implementar una etapa

La sesión arranca después de `/clear`, sin memoria de lo anterior.

1. Leer la etapa pedida y solo lo que figura en **Leer antes**. Mirar `git log --oneline -5` para ver dónde quedó la etapa anterior. No recorrer el plan entero ni el repo: el plan ya dice qué hace falta.
2. Si algo del plan quedó desactualizado o falta una decisión, preguntar antes de inventarla, y anotar la respuesta en el plan.
3. Implementar y verificar como dice la etapa, siguiendo las reglas del repo y la skill indicada.
4. Lo que Camila pida que no sea parte de la etapa (un retoque visual, una idea nueva) no se resuelve en el momento: se anota en **Retoques** y se sigue.
5. Al terminar: marcar la etapa como `Implementada`, ajustar el plan si la implementación se apartó de él, y commitear código y plan juntos con un mensaje convencional (`feat: …`, `fix: …`). No preguntar antes de commitear ni hacer push.
6. Cerrar con el mensaje de cierre.

## Retoques

Leer la lista de **Retoques** del plan, aplicarlos todos, verificarlos juntos, vaciar la lista, commitear y cerrar con el mensaje de cierre. Si Camila trae ajustes nuevos en el mensaje, se suman a los de la lista. Es la sesión más barata: suele alcanzar con Sonnet.

## Cierre del plan

Cuando todas las etapas y los retoques están hechos, en la misma sesión de la última etapa:

1. Llevar a `docs/architecture/overview.md` las decisiones que cambian la arquitectura o un contrato (en la plantilla), o al README del cliente lo que el cliente necesite recordar (por ejemplo un cambio en `frame-src`).
2. Si la plantilla ganó un componente o una variante, actualizar la tabla del `README.md` y, si cambió una decisión que mencionan las skills `landing-*`, actualizarlas.
3. Borrar `docs/plans/<tema>.md`: la historia queda en git y el plan no tiene que llegar a los clientes en el próximo merge.
4. Commitear (`docs: close <tema> plan`).

## Mensaje de cierre

Toda sesión de esta skill termina diciendo qué sigue, para que Camila no tenga que reconstruirlo:

```
Etapa 2 lista (commit abc1234).
Siguiente: /clear y después /etapas docs/plans/<tema>.md 3
Modelo sugerido: Sonnet (sigue el patrón de la etapa 2).
Retoques anotados: 2.
Falta hacer push: git push origin main
```

Si la conversación ya pasó de unos 200 k y todavía falta parte de la etapa, decirlo y proponer cortar: anotar en el plan qué quedó hecho y qué falta, commitear lo que esté verificado y seguir en una sesión nueva.
