# ChamDev Landing Template — Architecture Overview

**Status:** Architecture design  
**Repository:** `camiperezs/chamdev-landing-template`  
**Purpose:** Reusable technical foundation for professional landing pages built by ChamDev.

This document consolidates the architectural decisions made during planning. It describes the intended system; it is not an implementation checklist and does not imply that the listed components already exist.

## 1. Project goals

Build a reusable, maintainable foundation for small and medium-sized professional landing pages. A new client project should primarily require configuring content, selecting components and variants, adding client assets, and applying the client's visual identity—not rebuilding the technical foundation.

The template should:

- Support landing pages with three or five main content sections, while not imposing a technical limit on section count.
- Keep the Hero, Header, Footer and conversion elements independent from the commercial section count.
- Provide reusable, presentational components with clear responsibilities.
- Keep each client's content and assets separate.
- Prioritize static HTML, performance, accessibility, SEO and responsive behavior.
- Add JavaScript only where an interaction requires it.
- Avoid unnecessary dependencies and provider lock-in.

## 2. Technology decisions

| Area                   | Decision                                                                  |
| ---------------------- | ------------------------------------------------------------------------- |
| Framework              | Astro                                                                     |
| Language               | TypeScript                                                                |
| Rendering              | Static Site Generation (SSG) by default                                   |
| Styling                | Native CSS, organized with design tokens and component styles             |
| UI framework           | No client-side UI framework by default                                    |
| Interactivity          | Native HTML/CSS first; small JavaScript modules when needed               |
| Version control        | Git and GitHub                                                            |
| Initial hosting target | Netlify                                                                   |
| Forms                  | Provider-agnostic integration, selected per client                        |
| Images                 | Local client assets by default; external sources supported where required |

Astro is responsible for page composition and HTML generation. The template should not introduce React or another UI framework unless a future requirement justifies the additional runtime and maintenance cost.

## 3. Naming conventions

Use English consistently in source code, file names, component names, configuration keys and documentation identifiers.

| Element                         | Convention                        | Example              |
| ------------------------------- | --------------------------------- | -------------------- |
| Folders                         | kebab-case                        | `testimonials/`      |
| Astro components                | PascalCase                        | `Testimonials.astro` |
| TypeScript types and interfaces | PascalCase                        | `ServiceItem`        |
| Variables and functions         | camelCase                         | `serviceItems`       |
| CSS classes                     | kebab-case                        | `.service-card`      |
| HTML IDs                        | kebab-case                        | `id="about"`         |
| Constants                       | UPPER_SNAKE_CASE when appropriate | `DEFAULT_THEME`      |

Do not add redundant suffixes such as `Section` to section component names. The `sections/` directory already provides that context. Use descriptive suffixes when they distinguish a real responsibility, such as `SectionTitle`, `ServiceCard` or `ContactForm`.

## 4. Component catalog

### 4.1 Global layout

| Component    | Variants / behavior                |
| ------------ | ---------------------------------- |
| `Hero`       | FullScreen, Compact, Split         |
| `Header`     | Minimal, Standard, Overlay         |
| `Navigation` | Desktop navigation and mobile menu |
| `Footer`     | Compact, Expanded                  |

Header decisions carried into the architecture:

- Desktop navigation is horizontal.
- Mobile navigation uses a vertical menu.
- Standard header is sticky.
- Overlay header is reserved for the FullScreen Hero.
- Navigation uses native anchor links for sections.
- Header CTA is optional. On mobile it remains visible when space permits; otherwise it moves into the menu.

The Footer has Compact and Expanded variants. Detailed content contracts and exact visual rules remain to be specified during the layout implementation phase.

### 4.2 Main sections

| Component  | Variants                         | Optional capabilities                                    |
| ---------- | -------------------------------- | -------------------------------------------------------- |
| `About`    | Split, Centered, ImageBackground | Image, eyebrow, CTA                                      |
| `Services` | Grid, List, Featured, Catalog    | Images/icons, configurable prices, item CTA, section CTA |
| `Contact`  | Split, Centered, Form            | Contact channels, configurable form, section CTA         |

**About**

- Title and description are required.
- Image is optional in every variant.
- Eyebrow and CTA are optional.
- Split supports image position and composition settings. The image is always shown on the left from 64rem, using CSS `order` only: the DOM keeps the content first, so reading and focus order do not change on mobile.
- Standard variants accept an optional `quote`, rendered with `Quote`, with an optional `quoteAuthor` for its (visually hidden) caption, and an optional `titleAccent`: an exact substring of `title` that `SectionTitle` wraps in `<em>` by string splitting (no HTML in content). Split accepts an optional `badge` (`value` and `label`, no icon) shown as a dark experience card inside the bottom-right corner of the image, with colours fixed locally in both themes.
- The About CTA is a flat primary button with a WhatsApp icon (`src/icons/whatsapp.svg`); the metallic gradient and glow are disabled only inside `.about`.
- The section is labelled by its heading (`aria-labelledby`). The entrance of the quote and the card is CSS only (`animation-timeline: view()`), disabled with `prefers-reduced-motion`.
- Centered supports a constrained content width and optional image.
- ImageBackground supports overlay, opacity, content position and image focal point.
- Uses semantic section markup and a heading hierarchy consistent with the page.

**Services**

- Receives a collection of services.
- Variants: Grid, List, Featured and Catalog.
- Catalog (`ServiceCatalog.astro`, `src/scripts/service-catalog.ts`) is an interactive tab-style selector: cards (image + title only) and a detail panel. It uses `title`, `description`, `visual` (image), `specs`, `footnote`, `price` and the WhatsApp message `Hola, quiero consultar por {title}.`; `label` and `featured` are not shown and the section receives no `description` or `action`. `ServiceLabels` requires `previous` and `next`.
- Catalog semantics: cards are `button role="tab"` inside a `tablist` (`aria-selected`, `aria-controls`, roving `tabindex`); every panel is server-rendered as `role="tabpanel"` and the selection toggles visibility, so the first service shows without JS. The arrows and ← → move the selection in an endless loop; Home/End jump to the first/last. The script is bundled by Astro (no inline CSP hash) and respects `prefers-reduced-motion`.
- Each service has an ID, title and description; image, icon, price, label and CTA are optional.
- Price formats: fixed, starting-at and on-request.
- Both individual service CTAs and a general section CTA are optional.
- Featured item is selected explicitly with a `featured` property, not implicitly by array order.
- `ServiceCard` is an independent reusable presentational component.

**Contact**

- Variants: Split, Centered and Form.
- All contact channels are optional and configurable: WhatsApp, email, phone, address and social links.
- Form fields are configurable per project.
- Form rendering is separate from form submission/provider integration.
- WhatsApp is a reusable integration that can be used by Hero, Services, Contact, CTA and the floating contact control.
- Floating WhatsApp is an independent optional component.

### 4.3 Complementary sections

| Component      | Variants         | Optional capabilities                 |
| -------------- | ---------------- | ------------------------------------- |
| `Benefits`     | Grid, Horizontal | Icon, image, CTA                      |
| `Gallery`      | Grid, Masonry    | Captions, Lightbox, CTA               |
| `Testimonials` | Cards, Carousel  | Avatar, initials, rating, source, CTA |
| `Process`      | Steps, Timeline  | Icon, image, CTA                      |
| `FAQ`          | Accordion, Grid  | Configurable indicator, CTA           |
| `Location`     | Map, Information | Provider map, hours, directions       |

**Benefits**

- Receives a collection of benefits.
- Each item has an ID, title and description; icon and image are optional.
- CTA is optional.
- `BenefitCard` is reusable.

**Gallery**

- Receives a collection of images.
- Supports local and external image sources.
- Each image has an ID, source and meaningful alternative text; caption and aspect ratio are optional.
- Grid and Masonry variants.
- Lightbox is configurable per project.
- Lightbox must support keyboard operation, focus management, Escape to close and appropriate background-scroll handling.
- CTA is optional.
- Local images should use Astro's image optimization capabilities where applicable. External images may require a different optimization strategy.

**Testimonials**

- Receives a collection of authentic testimonials.
- Each item has an ID, author identification and testimonial content; avatar, service, date, rating and source are optional.
- Author can be represented by a photograph, initials or no avatar.
- Ratings are optional and must only be shown when supplied and verified; never default to five stars.
- Carousel uses manual controls and has no autoplay.
- `TestimonialCard` is reusable.
- Do not fabricate testimonials or attribute a statement to a platform without evidence.

**Process**

- Receives an ordered collection of steps.
- Each step has an ID, title and description; icon, image and label are optional.
- Numbering is generated automatically from item order.
- Steps and Timeline variants preserve logical reading order.
- CTA is optional.

**FAQ**

- Receives an ordered collection of questions and answers.
- Accordion and Grid variants.
- Multiple accordion items may remain open simultaneously.
- Indicator can be configured as an arrow or plus/minus.
- CTA is optional.
- Prefer native `details` and `summary` for the initial accordion implementation; avoid JavaScript unless a specific requirement cannot be met natively.
- Do not add FAQ structured data automatically; only add structured data when it is appropriate and complies with current search-engine requirements.

**Location**

- Map and Information variants.
- Map provider is configurable; do not couple the section to a single provider.
- Map uses a preview and loads the embedded third-party map on demand.
- Business hours are configurable.
- Directions link is optional.
- Address and hours must be supplied and verified by the client.
- A map must not be the only way to communicate the address.

### 4.4 Conversion and shared components

| Component        | Responsibility                                                     |
| ---------------- | ------------------------------------------------------------------ |
| `CallToAction`   | Standalone conversion block                                        |
| `WhatsAppButton` | Reusable WhatsApp action, including optional floating presentation |
| `SocialLinks`    | Social profile links                                               |
| `Button`         | Shared link/button presentation                                    |
| `Container`      | Consistent content width and horizontal spacing                    |
| `SectionTitle`   | Shared section heading composition; `accent` adds eyebrow rules    |
| `Quote`          | Typographic quote (`figure`) with a visually hidden attribution    |
| `Card`           | Generic visual card where a domain-specific card is unnecessary    |
| `Badge`          | Small status or category label where appropriate                   |

**CallToAction**

- Variants: Simple, Split and Badge (dark translucent panel with a circular logo `image` above the title, forced `data-theme="dark"`).
- Image is optional.
- One primary action and one optional secondary action.
- Supported action types: internal link, external link, WhatsApp, email and phone.
- Visual styling is controlled by the design system rather than hardcoded per client.
- Action links should use a shared URL/action resolution strategy where possible.
- Actions support a `link` variant (no border, uppercase) and `iconPosition: "start" | "end"`; the trailing arrow shifts slightly on hover and focus.
- `--color-accent-text` is the semantic token for decorative gold text (quotes, display numerals); `check:contrast` validates it at 4.5:1 in both themes.

**WhatsApp**

- Uses an international phone number and optional prefilled message.
- URL-encodes the message correctly.
- Opens WhatsApp; it does not send the message automatically.
- Can be reused by any component that needs a WhatsApp action.

## 5. Component responsibilities and data flow

The default architecture is presentational and configuration-driven:

1. A page or page-layout selects which components appear and in what order.
2. Client-specific content/configuration supplies the text, images, links and component options.
3. Components render the supplied data; they do not fetch client content from an API.
4. Reusable UI components handle repeated visual primitives.
5. Integrations handle external services and side effects separately from presentation.

Section components should not:

- Fetch content from APIs by default.
- Own global navigation or page metadata.
- Contain client-specific business rules.
- Hardcode a client's brand colors or assets.
- Implement provider-specific form submission inside the visual form component.

Prefer explicit typed props and small focused components. Avoid building a universal component with dozens of unrelated flags. Use variants for meaningful presentation differences and separate components when responsibilities genuinely differ.

## 6. Forms and external integrations

### 6.1 Forms

The form architecture must be provider-agnostic. The selected provider can differ by client and should not require rewriting `Contact` or `ContactForm`.

Initial integration targets may include Netlify Forms, Formspree or a custom API, but no provider is mandatory by architecture.

Responsibilities:

- `ContactForm`: field rendering, client-side UX validation and submission states.
- Form adapter/integration: provider-specific submission behavior.
- Provider configuration: endpoint, method, field mapping and provider-specific options.
- Server-side function/API: required when a provider needs private credentials or secret operations.

Never expose private API keys or credentials in browser code. Client-side validation improves usability but does not replace server-side validation or provider-side spam protection. Do not store submitted personal data in localStorage.

### 6.2 Maps

Map rendering is provider-configurable. Support a provider adapter or explicit provider component rather than coupling Location to Google Maps. Third-party maps should load on demand where possible, with a usable preview or external directions link before loading.

### 6.3 WhatsApp and social links

Keep link generation and URL handling reusable. Validate/normalize configured destinations and encode prefilled WhatsApp messages. Social links are data-driven and should only render when configured.

## 7. Client content and assets

**Decision: one repository per client.** Each client site is created from this template as an independent repository. The repository boundary isolates each client's content, assets, configuration and deployment, so no client-selection mechanism is needed in the code.

Within a client repository:

- `src/config/site.ts` holds the site configuration: identity, brand palette, typography, UI labels, navigation, header, footer, business data and SEO.
- `src/content/page.ts` holds the page content: Hero and the ordered list of sections, typed by the contracts in `src/types/`.
- `src/assets/images/` holds local images. They participate in Astro's image pipeline (modern formats and responsive `srcset`).
- `public/` is reserved for files that need stable public paths or cannot use the asset pipeline: favicon, social preview image and fonts.
- External image URLs may be used when the source is trusted; they should declare `width` and `height`.
- The brand logo is optional (`SiteConfig.logo`, an `Image`). Header, Footer and the JSON-LD use it when present and fall back to the brand text otherwise; `width` and `height` are required to avoid layout shift.
- Known exception: `ServiceCatalog` (Services `catalog` variant) lives in the template but is used by a single client (Saint Aure). It is not generalized.

The step-by-step workflow is documented in [Create a new landing](../guides/new-landing.md).

## 8. Source organization

```text
src/
├── assets/images/      Local images (optimized by Astro)
├── components/
│   ├── forms/          Form presentation (ContactForm)
│   ├── layout/         Header, Footer, Seo
│   ├── sections/       Page sections, one folder per section, plus PageSections and SectionShell
│   └── ui/             Shared primitives (Button, Card, Icon, Media, WhatsAppButton…)
├── config/site.ts      Site configuration
├── content/page.ts     Page content
├── icons/              Local SVG icons
├── integrations/       External providers (form adapters)
├── layouts/            BaseLayout and MessagePage
├── pages/              Routes: home, thank-you, 404, robots.txt
├── scripts/            Client-side behavior (theme, menu, carousel, lightbox, form, map)
│   └── inline/         Pre-paint scripts inlined and hashed for the CSP
├── styles/             Tokens, themes, base, utilities and presets (cascade layers)
├── types/              Content and configuration contracts
└── utils/              Shared logic (appearance, prices, WhatsApp, image sizes)

scripts/check-contrast.ts   WCAG contrast validation of the configured palette
docs/                       Architecture and guides
```

Shared types live in `src/types/`. Components keep their styles in a sibling CSS file inside the `components` cascade layer.

## 9. Design system and dual color themes

**Every client landing page must support both Light Mode and Dark Mode.** Both themes are a baseline capability of the template, not an optional feature that can be omitted per project.

Each client receives a brand palette and a complete set of interface colors for both themes. The two themes must preserve the client's identity while adapting color values as needed for readability, contrast and visual hierarchy. Do not simply invert colors or assume that the same hex values work in both themes.

The agreed color architecture has three layers:

1. Brand palette, sourced from colors supplied by the client or carefully derived from the client's visual identity.
2. Tonal scales derived from brand colors where useful for backgrounds, borders, interaction states and contrast.
3. Semantic tokens consumed by components.

Light and Dark use independent semantic palettes. Components use global tokens by default; component-specific tokens are introduced only when a real requirement cannot be expressed cleanly through the global system.

### 9.1 Brand palette

Define client brand colors separately from semantic interface tokens.

The brand palette should support, as applicable:

- Primary brand color.
- Secondary brand color.
- Accent/highlight color.
- Additional brand colors when the identity requires them.

A client may provide existing brand colors, a logo or other brand references. The theme configuration should document selected values and their intended roles. Do not invent extra brand colors when the supplied identity does not support them; derive supporting shades carefully and validate them.

### 9.2 Semantic interface palette

Components must consume semantic tokens rather than raw brand hex values. Define a complete palette for each theme, including:

| Token group | Required roles                                   |
| ----------- | ------------------------------------------------ |
| Background  | Page background, alternate section background    |
| Surface     | Cards, panels, inputs and elevated surfaces      |
| Text        | Primary, secondary, muted and inverse text       |
| Brand       | Primary, secondary and accent actions            |
| Border      | Default, subtle and strong separators            |
| Interactive | Link, hover, active, focus and disabled states   |
| Semantic    | Success, warning, error and informational states |
| Overlay     | Image overlays, modal backdrops and scrims       |

Not every role needs a unique color. Tokens may intentionally share values when the visual system calls for it, but every role must have a defined, tested value in both themes.

### 9.3 Theme configuration and switching

- Every client theme defines both Light and Dark token sets.
- Theme selection supports an explicit user choice and a system-preference default.
- If a visitor chooses a theme manually, that choice should take precedence over the operating-system preference and persist for subsequent visits, using a privacy-conscious mechanism.
- The theme control is reusable and accessible, with a clear label/state.
- Theme changes must not cause a flash of the wrong theme or a disruptive layout shift. Define an appropriate early theme initialization strategy during implementation.
- If a particular client has a strong brand preference for one initial appearance, that can determine the default theme, but both modes remain available.
- Respect system preferences when no explicit visitor choice exists.

The exact persistence mechanism and initialization strategy remain to be selected during technical setup.

### 9.4 Design tokens beyond color

Use CSS custom properties for:

- Typography families, sizes, weights and line heights.
- Spacing scale.
- Content widths.
- Border radii.
- Shadows and elevation.
- Responsive layout conventions.
- Focus indicators and interaction states.

Components consume semantic tokens and must not hardcode client brand colors. Client theme configuration remains separate from component markup.

No `#hex` or `rgba()` value is written outside `tokens/`, `themes/`, `presets/` and the palette in `site.ts`. Accent halos, borders and glows use the semantic tokens in `src/styles/tokens/surfaces.css` (`--color-accent-soft`, `--color-accent-border`, `--color-accent-border-strong`, `--color-accent-highlight`, `--shadow-glow`, `--color-scrim`) or `color-mix()` over existing tokens. Unused scale tokens (spacing, elevation, easing, radius) are kept as template scale on purpose.

#### Client appearance configuration

Client visual identity is configured in `src/config/site.ts` through `site.appearance`. The model uses a preset-plus-overrides approach:

1. A **preset** (`editorial`, `modern`, `elegant`) sets a coherent package of defaults for shape (cards, buttons, media, badges), typography style (tracking, eyebrow transform), elevation (card surface treatment), icon stroke and density.
2. `site.appearance` can override specific values using **closed enums** from the existing scale (for example `shape.cards: "xl"` or `density: "compact"`). Free CSS is not permitted; TypeScript enforces the enum constraints.
3. Active overrides are compiled to CSS custom properties by `getHeadStyles` in `src/utils/appearance.ts`, injected into `<head>` as an inline `<style>` block hashed for the CSP, outside any cascade layer so they take precedence over preset values.

The full interface is `SiteAppearance` in `src/types/appearance.ts`.

### 9.5 Contrast and validation

- Meet WCAG 2.2 AA contrast requirements in both themes.
- Validate normal text, large text, controls, icons and focus indicators.
- Do not assume that a brand primary color is suitable for text or button backgrounds in every context.
- Define theme-specific brand variants when necessary to maintain contrast while preserving brand recognition.
- Check all component variants in both themes, including image overlays, forms, cards, navigation, buttons and CTAs.

The exact token names, initial default palette and theme initialization strategy remain pending.

### 9.7 Spacing and layout system

The agreed layout foundation is:

- Use `rem` as the primary unit for spacing, typography-related dimensions and general sizing.
- Use `em`, percentages, `fr` and viewport-relative units when they fit the specific relationship.
- Use `px` only exceptionally, such as for fine borders or technical requirements.
- The spacing scale is based on multiples of 4 CSS pixels, represented in `rem` (for a 16px reference root: 4px = 0.25rem, 8px = 0.5rem, 12px = 0.75rem, 16px = 1rem, and so on).
- Use a 12-column page grid on desktop, 8 columns on tablet and 4 columns on mobile.
- Use fluid gutters and outer margins, with `clamp()` where appropriate.
- Provide Narrow, Standard and Wide containers with reference maximum widths of 720px (45rem), 1120px (70rem) and 1280px (80rem), respectively. Treat these as design reference values; express CSS dimensions in `rem` where appropriate.
- Breakpoint reference values are 640px (40rem), 768px (48rem), 1024px (64rem) and 1280px (80rem). Use these as media-query thresholds, with CSS implementation values expressed in `rem` where appropriate.
- Use fluid vertical section padding that adapts to viewport and composition.
- Distinguish the shared Page Grid, which aligns page-level content, from Component Grids, which organize content within individual sections.
- Components may intentionally extend beyond the standard container when the design calls for full-width content.

The exact spacing tokens, gutter formulas, container implementation and responsive grid behavior are to be finalized during implementation and validated against real layouts.

### 9.9 Interaction states, motion and visual accessibility

The interaction system uses shared global state conventions, with additional states defined only where a component needs them. Do not force every component to implement every state.

Shared states include:

- Default.
- Hover, where a hover-capable pointer is available.
- Focus and Focus-visible.
- Active.
- Disabled, where applicable.

Component-specific states may include Loading, Error and Success, particularly for forms and asynchronous actions.

Interaction state tokens live in `src/styles/tokens/interaction.css`. Hover uses `--color-state-hover: color-mix(in srgb, currentColor 8%, transparent)` and active uses `--color-state-active` at 14%; both depend on `currentColor` and work over any surface. Surfaces using `action-primary` colors (CTA Badge panel, overlaid Header) redefine `--color-focus` with `--color-focus-on-primary` (derived from `--color-text-on-primary`) to maintain at least 3:1 contrast on those backgrounds.

Transitions are configured through global design tokens in `src/styles/tokens/motion.css`. Durations: Fast 120ms, Normal 200ms, Slow 300ms, `--duration-reveal` 600ms (section entrances), `--duration-spin` 800ms (loading spinners). Easing curves: `--ease-out-strong`, `--ease-out-expo` and `--ease-in-out-strong` cover the majority of interface animations. Prefer performant properties such as `transform` and `opacity`; avoid delaying user actions or animating layout dimensions unnecessarily.

All motion must respect `prefers-reduced-motion`. Reduced-motion styles should remove or substantially reduce non-essential movement and must not make content or functionality unavailable.

**WCAG 2.2 AA is a mandatory accessibility standard for every client landing page**, not merely an aspirational target. Validate both Light and Dark themes, all component variants and interactive states. The baseline includes:

- Text contrast of at least 4.5:1 for normal text and 3:1 for large text, subject to WCAG definitions and exceptions.
- At least 3:1 contrast for relevant non-text UI components and graphical objects against adjacent colors.
- Visible keyboard focus, logical focus order and keyboard operation for all interactive functionality.
- Semantic HTML, accessible names and labels, useful alternative text, and accessible form instructions and error/status messages.
- No reliance on color alone to communicate meaning.
- Usable touch targets and reflow/zoom behavior consistent with WCAG 2.2 AA.
- Appropriate focus management for dialogs and lightboxes, including Escape handling where expected.

Do not remove native focus indicators without providing a clearly visible replacement. Hover must never be the only way to discover or operate functionality. Automated checks should be supplemented with keyboard, zoom/reflow and assistive-technology testing.

### 9.8 Borders, radius, shadows and elevation

The agreed visual primitives are:

- Borders: three semantic levels — Subtle, Default and Strong.
- Radius: None, Small, Medium, Large, XL, 2XL and Pill.
- Shadows: None, Subtle, Default and Elevated.
- Elevation: semantic surface hierarchy independent from shadows, with levels such as Base, Sunken, Surface, Raised and Overlay.

Border colors, surface colors and shadow treatments may vary between Light and Dark themes. Radius values are shared across themes but configurable per client through `site.appearance.shape`.

**Card elevation** uses a single-signal model: `border` (border, no shadow), `shadow` (shadow, no border), or `flat` (sunken surface color, no border or shadow). The CSS variable triad `--preset-card-background`, `--preset-card-border-width` and `--preset-card-shadow` is set by the preset and can be overridden through `site.appearance.surfaces`. Applying both a border and a wide shadow simultaneously (the "ghost card" anti-pattern) is not permitted.

`--border-width-subtle` (0.5px) is reserved for fine separators in Header, Footer and Location. Regular containers and cards use `--border-width-default`. Do not apply shadows or borders indiscriminately; use them only when they communicate grouping, separation or hierarchy.

### 9.6 Typography system

Each client can configure one or two font families. Four semantic typography roles are available:

- Display: Hero and other prominent display text.
- Heading: page and section headings.
- Body: paragraphs and descriptive content.
- UI: navigation, buttons, labels, forms and interface text.

Typography uses a fluid scale based on CSS `clamp()` where appropriate, rather than arbitrary per-component font sizes. The agreed weight set is Regular 400, Medium 500, Semibold 600 and Bold 700. Only the weights actually used should be loaded; a suitable variable font may cover multiple weights with one asset.

Local WOFF2 font files are the preferred source. Use properly licensed client-provided or selected fonts, with system fallback stacks. Preload only fonts critical to the initial viewport and use an appropriate `font-display` strategy. Avoid unnecessary third-party font requests.

Font roles map to the tokens `--font-body`, `--font-heading` and `--font-ui` (UI defaults to body). Display text (Hero title) and section headings use `--font-heading`; paragraphs, buttons and labels use `--font-body`. Eyebrow style is controlled by `--eyebrow-transform` and `--eyebrow-tracking`. Heading tracking and weight are configurable per client through `site.appearance.typography`; `--text-heading-weight` and `--text-display-weight` apply to those elements, and `--text-ui-weight` (semibold) applies to Button and Badge.

### 9.10 Visual language: surfaces, rule and eyebrow

Sections share one vocabulary, defined once as tokens and a utility instead of per-component values:

- **Surface tokens** (`src/styles/tokens/surfaces.css`): `--surface-panel-bg`, `--surface-panel-border`, `--surface-panel-border-hover`, `--surface-rule-color` and `--surface-rule-size`. They derive from semantic tokens, never from hex values. They are declared on `:root, [data-theme]` so sections with their own theme (the dark CTA badge) recompute them; declaring them on `:root` alone resolves them with the page theme and breaks contrast.
- **`.panel`** (`src/styles/utilities/panel.css`): translucent background, 1px border, `--preset-card-radius`, no shadow. The border turns gold on hover only with `(hover: hover) and (pointer: fine)`; no zoom or shadow. `.panel--ruled` adds the 2rem gold rule on top, the same stroke as the Hero eyebrow.
- **Eyebrow**: uppercase with wide tracking (`--eyebrow-transform`, `--eyebrow-tracking`), gold (`--color-link`), always paired with the rule.
- **Stats `ruled`**: no box, 1px dividers, gold value, eyebrow-style label. `StatItem.kind: "text"` renders a textual value in the heading font, italic and smaller. `cards` and `row` are unchanged.

Use `.panel` instead of `Card` when the section belongs to this language (Testimonials cards now do). `Card` remains the generic surface driven by the preset (`border`, `shadow`, `flat`). Sections without a justified visual change (Services grid/list, Process, FAQ) keep their current styling; migrate them only when a client needs it, and as an opt-in variant.

## 10. Responsive behavior and accessibility

Responsive design is part of each component's contract, not a final patch.

Global principles:

- Mobile-first or otherwise explicitly documented responsive styles.
- No horizontal overflow at supported viewport widths.
- Preserve logical reading and focus order.
- Do not hide essential information on mobile.
- Use responsive image dimensions and appropriate `object-fit`/`object-position`.
- Ensure touch targets are usable.
- Respect `prefers-reduced-motion` and substantially reduce non-essential motion when requested.
- Avoid autoplay for content carousels.

Accessibility baseline:

- Semantic HTML landmarks and sections.
- One meaningful page-level H1; section headings follow a coherent hierarchy.
- Form fields have associated labels and accessible error/status messages.
- Links and buttons have descriptive accessible names.
- Images have meaningful alt text, or empty alt when decorative.
- Keyboard access and visible focus for interactive elements.
- WCAG 2.2 AA is mandatory in both Light Mode and Dark Mode.
- Dialog/lightbox interactions manage focus and support Escape where appropriate.

## 11. SEO and Google indexing foundation

SEO is a cross-cutting page/layout responsibility, not the responsibility of individual section components.

The implementation should include:

### Technical SEO

- Unique, descriptive `title` and meta description per page.
- Canonical URL.
- Correct robots directives.
- XML sitemap.
- `robots.txt`.
- Clean, descriptive URLs.
- Correct HTTP status behavior and custom 404 page.
- Open Graph and social sharing metadata.
- Favicon and relevant site icons.
- Structured data only where it accurately describes the business/page and follows current search-engine guidelines.

### Content and on-page SEO

- One clear primary page topic and coherent heading hierarchy.
- Descriptive headings and useful page copy.
- Descriptive image alt text.
- Human-readable link text.
- Avoid keyword stuffing and duplicated metadata.
- Client-specific page title, description and social preview image.

### Performance and indexing readiness

- Astro-generated HTML with important content available without client-side JavaScript.
- Optimized local images, responsive sizes and modern formats where supported.
- Lazy-load below-the-fold images; do not lazy-load the likely LCP/hero image.
- Avoid unnecessary third-party scripts and embeds.
- Use appropriate font loading and minimize layout shifts.
- Test Core Web Vitals and mobile usability.
- Verify the deployed domain in Google Search Console and submit the sitemap.
- Confirm the site is not accidentally blocked by robots directives or a noindex tag before launch.

Indexing cannot be guaranteed by code alone. Google decides whether and when to crawl and index a site. Search Console verification, sitemap submission and content quality are part of the client launch process.

## 12. Performance principles

- Prefer SSG for the intended landing-page use case.
- Keep JavaScript minimal and scoped to actual interactions.
- Avoid shipping a UI framework runtime for static content.
- Optimize images and specify dimensions to reduce layout shifts.
- Load third-party maps and other heavy embeds on demand.
- Avoid unnecessary animation libraries.
- Use native HTML features when they meet requirements.
- Measure the deployed site rather than assuming performance from the source code.

## 13. Testing and quality

The implementation plan should include:

- TypeScript type checking.
- Astro build verification.
- Linting and formatting rules selected during project setup.
- Responsive checks at representative viewport widths.
- Keyboard and screen-reader-oriented accessibility checks.
- Link and form behavior checks.
- SEO metadata and sitemap checks.
- Performance audits on the deployed output.

Do not add testing or linting dependencies until their role and configuration are defined.

## 14. Implementation sequence

Recommended order:

1. Initialize Astro and strict TypeScript configuration.
2. Establish project scripts, formatting, linting and build checks.
3. Create client content/assets conventions and page composition.
4. Define the brand-palette model, semantic design tokens, Light/Dark themes and global styles.
5. Build shared UI primitives: Container, Button, SectionTitle and related primitives.
6. Build Hero, Header, Navigation and Footer.
7. Build the three main sections: About, Services and Contact.
8. Build reusable WhatsApp, social and form integration foundations.
9. Build complementary sections: Benefits, Gallery, Testimonials, Process, FAQ and Location.
10. Build CallToAction and optional Floating WhatsApp.
11. Implement SEO metadata, sitemap, robots directives and structured data rules.
12. Test, optimize and document the deployment workflow.

Implement incrementally. Each coherent milestone should be reviewed, tested and committed separately.

## 15. Decision log

Decisions resolved during implementation:

| Topic                 | Decision                                                                                                                                                                                      |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework and tooling | Astro 7, TypeScript strict, ESLint (typescript-eslint strict and the Astro plugin), Prettier, `astro check`, CI on GitHub Actions                                                             |
| Testing               | Playwright end-to-end tests on desktop and mobile with axe-core (WCAG 2.2 AA); every test fails on console errors or CSP violations; external requests are blocked                            |
| CSS architecture      | Native CSS with cascade layers: reset, tokens, themes, base, utilities, presets, components                                                                                                   |
| Color system          | Brand scales (primary, secondary, neutral) configured per client; semantic tokens per theme; global status colors not configurable per client; `npm run check:contrast` validates WCAG 2.2 AA |
| Theme initialization  | Initial theme configured per project; the visitor's explicit choice persists in localStorage; no system-preference detection                                                                  |
| Client organization   | One repository per client (section 7)                                                                                                                                                         |
| Component contracts   | Typed props per component; shared `Action`, `Image` and section contracts in `src/types/`; UI copy comes from `site.labels`                                                                   |
| Forms                 | Provider adapters in `src/integrations/forms/`; Netlify Forms is the first adapter; success redirect to `/thank-you`                                                                          |
| Maps                  | Provider-agnostic embed URL, loaded on demand after an explicit user action                                                                                                                   |
| Client-side libraries | None; interactions use native HTML (`dialog`, `details`) and small scoped scripts                                                                                                             |
| Security              | Astro CSP with hashed scripts and styles; security headers in `netlify.toml`                                                                                                                  |
| Deployment            | Netlify, configured in `netlify.toml`                                                                                                                                                         |
| Structured data       | Business data is always requested from the client and is required in the site configuration                                                                                                   |
| Analytics and privacy | Analytics loads only after explicit cookie consent                                                                                                                                            |

| Appearance configuration | Preset-plus-overrides model: preset sets coherent defaults; `site.appearance` overrides closed enum values; `getHeadStyles` compiles them to custom properties injected as a hashed inline `<style>` in `<head>` |
| Image contract | Discriminated union in `src/types/image.ts`: `{ src: ImageMetadata; alt }` or `{ src: string; alt; width; height }` — string sources require explicit dimensions |
| Action contract | Discriminated union in `src/types/action.ts`: `LinkAction` or `WhatsAppAction`; WhatsApp number is sourced from `site.business.whatsapp` via `getWhatsAppUrl` |
| Icon module | `src/icons/index.ts` exports `icons` (SVG raw map) and `IconName` type; Icon component and all section contracts with icon names use this type; clients register new SVGs in that module |
| Motion library (Saint Aure only) | Exception to "Client-side libraries: None": `gsap` (ScrollTrigger, SplitText), bundled into one module `src/scripts/motion/` loaded only on the home (`BaseLayout` prop `motion`). Everything runs inside `gsap.matchMedia()` with `prefers-reduced-motion: no-preference`; `has-motion` on `<html>` is set by a hashed inline script with a 3 s failsafe. Not part of the template; see `docs/plans/motion-moderno.md` |

Still open:

- Analytics provider per client.
- Additional form providers when a client needs one.

## 16. Working principles

1. Keep components focused and presentational.
2. Keep client data and assets isolated.
3. Prefer configuration and composition over duplicated implementations.
4. Avoid premature abstraction: extract shared components when there is a real repeated responsibility.
5. Keep dependencies minimal.
6. Do not expose secrets in browser code.
7. Make accessibility, responsive behavior, SEO and performance part of the initial implementation.
8. Document architectural changes and keep this overview synchronized with the actual code.
