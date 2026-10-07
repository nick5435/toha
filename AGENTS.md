# Toha Hugo Theme - AI Agent Context

### Project Overview

This is **Toha**, a personal portfolio theme for the [Hugo](https://gohugo.io/) static site generator.

- **Goal:** Showcase skills, experience, academic output, and thoughts (blog) with elegance, accessibility, and simplicity.
- **Core Philosophy:** Configuration over Code. Users should control the site via `data/` and `hugo.yaml` without touching HTML/CSS.
- **Tech Stack:** Hugo (Extended), Dart Sass, Vanilla JavaScript, Hugo Pipes.
- **Default Typography:** Poppins (`@fontsource/poppins`), fallback to system fonts.
- **Icon System:** Custom Font Awesome Pro Kit (`@awesome.me/kit-f6f8bfcfbd`) via SCSS and webfonts (see `.font-awesome.md`).
- **Math Rendering:** MathJax v3 (`mathjax@^3.2.2`).

## Development Environment

We use `mise` for deterministic tooling and task management. Use `brew install mise` to install `mise`.
Dart Sass (`brew install dart-sass`) is used for modern Sass module compilation.

### Tooling Tasks (`mise`)

- `mise run install`: Setup theme root tools and npm dependencies.
- `mise run example-site`: Install dependencies (root & `website2`) and start Hugo dev server at `http://localhost:1313` with `--minify` and live reload.
- `mise run check`: Single-truth verification running linters (`npm run lint` + `npm run lint:scss`) and production build against `website2`.
- `mise run lint`: Run ESLint and Prettier SCSS check.
- `mise run build`: Execute a clean production build (`hugo --gc --minify --cleanDestinationDir`) against `website2`.
- `mise run update`: Update dependencies and rebuild `package.hugo.json`.
- `mise run fix-security`: Run npm security audit fix.

## Project Structure

### 1. The "Data-Driven" Layout

Toha differs from standard Hugo themes. The structure of the homepage and sidebar is primarily driven by JSON/YAML files in the `data/` directory, not just the `content/` directory.

- **`data/`**: The source of truth for the site's layout configuration. Example data can be found in the integration site (`~/Desktop/website2/data`).
- **`layouts/partials/`**: Contains the reusable UI components.
  - `sections/`: Homepage sections (`about`, `skills`, `experiences`, `education`, `projects`, `publications`, `talks`, `service`, `students`, `accomplishments`, `achievements`, `recent-posts`, `calendar`).
  - `navigators/`: Navigation headers (`navbar`, `sidebar`).
  - `helpers/`: Asset bundling templates (`style-bundle.html`, `script-bundle.html`).
- **`assets/styles/`**: Styling using modern Dart Sass.

### 2. Directory Map

- `assets/`
  - `images/`: Theme-specific static images.
  - `scripts/`: Vanilla JS files. **Must be processed via Hugo Pipes (`js.Build | minify | fingerprint`).**
  - `styles/`: Stylesheets organized according to components, layouts, sections, etc.
    - `_core.scss`: Forwards responsive breakpoints, variables, and mixins.
    - `variables.scss`: Central color palettes and theme token maps (`$themes`).
    - `application.template.scss`: Main SCSS entry point processed by Hugo template engine.
- `layouts/`
  - `_default/`: Where base structures of pages are defined (`baseof.html`, `list.html`, `single.html`).
  - `partials/`: Core reusable partials.
  - `shortcodes/`: Custom markdown components for users.
- `i18n/`: Localization files (`i18n/en.toml`). **All user-facing text must be tokenized here.**
- `website2/` (`~/Desktop/website2` / `github.com/nick5435/website2`): The integration test bed and example site.
  - `hugo.yaml`: Main configuration.
  - `data/`: Defines layout configurations.
  - `content/`: Blog posts and markdown content.

## Coding Guidelines

### HTML & Accessibility (WCAG 2.1 AA)

- **Semantics:** Use semantic HTML5 (`<main id="main-content">`, `<section>`, `<article>`, `<nav>`).
- **Skip Links:** Include a screen-reader and keyboard accessible skip link to `#main-content` at the top of the body.
- **Partials:** If a block of code is used more than once, extract it to `layouts/partials`.
- **IDs/Classes:** Use meaningful kebab-case class names.
- **Safe HTML:** Use `safeHTML` only when absolutely necessary and verified safe.
- **Icons:** Use standard `<i>` tags for Font Awesome icons (e.g., `<i class="fa-solid fa-house"></i>`, `<i class="fa-brands fa-github"></i>`).
- **Image Alt Attributes:** Decorative and brand logos should use `alt=""` or appropriate accessible descriptions rather than generic redundant terms like "logo".

### SCSS & CSS

- **Dart Sass Module System:** Use modern `@use` and `@forward` syntax. **`@import` is deprecated and forbidden.**
  - Partial stylesheets should `@use '../core' as *;` to access theme tokens and mixins.
- **No Inline CSS:** All styles must reside in `assets/styles/`.
- **Variables & Tokens:** Use SCSS variables and theme helper functions:
  - Access colors via `get-light-color($token)` and `get-dark-color($token)`.
  - **`text-over-accent-color` vs `hero-text-color`:**
    - `text-over-accent-color`: Text/icons displayed *on top of buttons, badges, and pills* styled with `accent-color`. Must have WCAG contrast against the accent color (e.g., `#ffffff` on dark cyan in light mode; `#0f172a` on light cyan in dark mode).
    - `hero-text-color`: Text/icons displayed *over hero background images* (`.home`, `.greeting`, `.typing-carousel`, bounce arrow, `.transparent-navbar`). Always `#ffffff` in both light and dark modes to ensure contrast over photographic or dark hero backgrounds.
  - Default font family is `$font-family-sans-serif: 'Poppins', ...`.
- **Link Styling:** Contextual content links must feature an underline (`text-decoration: underline`, `text-underline-offset: 2px`) to satisfy WCAG 1.4.1 (use of color alone is not sufficient to distinguish links). Navigation items, buttons, and card links may explicitly suppress underlines.
- **Formatting & Linting:**
  - Follow `.prettierrc.yml` and `.editorconfig` (4 spaces, double quotes, semicolons).
  - Run `npm run lint:scss` or `npm run format:scss`.
  - **Important:** `application.template.scss` contains Go template code and is excluded from Prettier via `.prettierignore` to prevent template syntax corruption.
- **Responsiveness:** Mobile-first approach is preferred, but ensure desktop elegance.

### JavaScript

- **Vanilla JS:** Avoid adding external libraries unless strictly necessary.
- **Fingerprinting & Minification:** All JS resources in templates must be processed through Hugo Pipes:
  - _Example:_ `{{ $js := resources.Get "scripts/pages/home.js" | js.Build (dict "minify" true) | fingerprint }}`
- **DOM Manipulation:** Ensure DOM elements exist before attaching listeners (check `?.` or `!= null`).
- **Icons:** Font Awesome icons are handled via Web Fonts and CSS; do not add the Font Awesome SVG/JS bundle to `application.js`.

### Typography, Icons & Features

- **Default Font:** Poppins (`@fontsource/poppins`, weights 300, 400, 500, 600, 700). Mounted via `hugo.yaml` to `static/files`.
- **Icons:** Custom Font Awesome Pro Kit (`@awesome.me/kit-f6f8bfcfbd`), webfonts mounted to `static/webfonts`. Details in `.font-awesome.md`.
- **Math:** MathJax (`mathjax@^3.2.2`).

## Contributing Rules (Strict)

1. **Backward Compatibility:** NEVER break existing `config` or `data` structures.
2. **Configurability:** Every new visual feature must be toggleable via `hugo.yaml` or `data/` files.
3. **Defaults:** New features must be **disabled by default**.
4. **Localization:** Do not hardcode English strings. Use `{{ i18n "string_id" }}`.

## Common Workflows

### How to add a new Section

1. Create the partial in `layouts/partials/sections/`.
2. Add the styling in `assets/styles/sections/`.
3. Add the entry logic in `layouts/partials/<section-name>.html` (or relevant parent).
4. Define the data schema in `website2/data/<language code>/sections/<section-name>.yaml`.
5. Wrap the rendering in a conditional check (e.g., `if .Site.Params.features.newSection.enable`).

### How to Fix a Bug

1. Reproduce it in the integration site (`website2`).
2. Fix the logic in the theme `layouts` or `assets`.
3. Verify the fix by running `mise run check`.
