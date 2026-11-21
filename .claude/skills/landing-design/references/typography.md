# Tipografía por rubro

## Cómo se configura en esta plantilla

- Familias en `site.appearance.typography` (`src/config/site.ts`). Los archivos WOFF2 van en `public/fonts/`.
- Roles: Display (hero), Heading (títulos de sección), Body (párrafos) y UI (botones, navegación, formularios).
- Pesos acordados: 400, 500, 600 y 700. Cargá solo los que se usan; una fuente variable puede cubrir varios.
- Escala fluida ya definida en `src/styles/tokens/typography.css` (`--text-display`, `--text-heading`, `--text-title`, `--text-body`, `--text-ui`). No inventes tamaños por componente.
- Fuentes locales: descargalas, verificá la licencia (todas las de abajo son de Google Fonts con licencia OFL) y no dependas de `fonts.googleapis.com`. La CSP tampoco lo permite.

## Combinaciones recomendadas

Adaptado del dataset de UI UX Pro Max (`typography.csv`). Display/Heading primero, Body después.

| Rubro                                        | Display / Heading                     | Body                             | Carácter              |
| -------------------------------------------- | ------------------------------------- | -------------------------------- | --------------------- |
| Estudio jurídico, escribanía, contable       | EB Garamond                           | Lato                             | Formal, con autoridad |
| Clínica, consultorio, salud                  | Figtree                               | Noto Sans                        | Limpio, accesible     |
| Salud con público mayor, organismos públicos | Atkinson Hyperlegible                 | Atkinson Hyperlegible            | Máxima legibilidad    |
| Finanzas, seguros, inmobiliaria seria        | IBM Plex Sans                         | IBM Plex Sans                    | Confiable, sobrio     |
| Corporativo, B2B, servicios profesionales    | Lexend                                | Source Sans 3                    | Profesional y legible |
| Spa, estética, belleza premium               | Playfair Display                      | una sans neutra (Karla, DM Sans) | Elegante              |
| Bienestar, yoga, terapias                    | Lora                                  | Raleway                          | Calmo, orgánico       |
| Joyería, servicios de lujo                   | Cormorant                             | Montserrat                       | Lujo, refinado        |
| Restaurante, cafetería, gastronomía          | Playfair Display SC (títulos de menú) | Karla                            | Hospitalidad          |
| Bar, cervecería, retro                       | Abril Fatface (solo hero)             | Merriweather                     | Vintage               |
| Agencia, estudio creativo, portfolio         | Outfit                                | Work Sans                        | Geométrico, moderno   |
| Startup, producto digital, marca joven       | DM Sans o Plus Jakarta Sans           | la misma                         | Moderno, amigable     |
| Marca amable, cuidado infantil, mascotas     | Varela Round                          | Nunito Sans                      | Suave, cercano        |

Ajustes del repositorio a la tabla original:

- El dataset sugiere Inter como body en varias combinaciones. Acá se reemplaza por una sans con más carácter, para no caer en el antipatrón de "Inter para todo".
- Poppins + Open Sans es correcto pero está muy gastado. Usalo solo si el cliente ya lo tiene en su identidad.

## Reglas de aplicación

- **Una familia bien ajustada** suele alcanzar para servicios. Dos familias solo si contrastan claramente (serif display + sans body).
- La display tiene que poder sostener el hero sola: probá el titular real a 320px y a 1440px.
- Para fuentes de alto contraste (Playfair, Cormorant, Garamond), usalas desde `--text-heading` hacia arriba, nunca en body chico.
- Fallback: declarate un `@font-face` de fallback con `size-adjust` para que coincida la altura de mayúsculas y no haya salto de layout (CLS) al cargar.
- Texto en mayúsculas: casi nunca. Si se usa (badges), sumale 0.05 a 0.08em de tracking.
- Números: `tabular-nums` en Stats y Pricing.
