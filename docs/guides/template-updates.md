# Actualizar un cliente desde la plantilla

Cada cliente tiene su propio repositorio, creado a partir de la plantilla. Cuando la plantilla mejora (una corrección de seguridad, un componente nuevo, una mejora de accesibilidad), esos cambios se incorporan a cada cliente con `git merge`.

Para que esos merges sean simples, el repositorio del cliente tiene que conservar la historia de la plantilla y limitar sus cambios a archivos de proyecto.

## Crear el repositorio del cliente

No uses "Use this template" de GitHub: crea un repositorio sin la historia de la plantilla y los merges posteriores se vuelven conflictivos. Cloná la plantilla y cambiá el remoto:

```bash
git clone https://github.com/camiperezs/chamdev-landing-template.git cliente-nombre
cd cliente-nombre
git remote rename origin template
git remote add origin https://github.com/<organizacion>/cliente-nombre.git
git push -u origin main
```

`template` apunta a la plantilla y `origin` al repositorio del cliente.

## Qué puede modificar un cliente

| Se modifica en el cliente                       | Se modifica solo en la plantilla            |
| ----------------------------------------------- | ------------------------------------------- |
| `src/config/site.ts`                            | `src/components/`, `src/layouts/`           |
| `src/content/page.ts`                           | `src/styles/`, `src/scripts/`, `src/utils/` |
| `src/assets/images/`                            | `src/types/`, `src/integrations/`           |
| `src/icons/` (íconos nuevos)                    | `tests/`, `scripts/`                        |
| `public/` (favicon, fuentes, imagen para redes) | Configuración: Astro, ESLint, Prettier, CI  |

Si un cliente necesita algo que no se resuelve por configuración, la mejora se hace en la plantilla y después se incorpora al cliente. Así queda disponible para todos los proyectos.

Si un proyecto necesita usar otro proveedor de mapas o de imágenes externas, el único archivo de configuración que se toca en el cliente es `astro.config.mjs` (`frame-src`). Conviene anotar ese cambio en el README del cliente.

## Incorporar cambios de la plantilla

```bash
git fetch template
git merge template/main
```

Si hay conflictos, normalmente aparecen en `site.ts` o `page.ts`, cuando la plantilla agregó un campo nuevo a un contrato. Conservá los valores del cliente y agregá el campo nuevo. TypeScript señala qué falta.

Después del merge:

```bash
npm install
npm run check
npm run build
npm run test:e2e
npm run check:launch
```

## Versiones de la plantilla

Etiquetá cada versión estable de la plantilla (`git tag v1.2.0`) y describí los cambios en el mensaje de la etiqueta o en los commits. Así cada cliente puede saber desde qué versión se actualiza y si el cambio requiere completar datos nuevos.
