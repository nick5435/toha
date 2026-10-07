# Toha Hugo Theme - AI Agent Context

## Project Overview

This is **Toha**, a personal portfolio theme for the [Hugo](https://gohugo.io/) static site generator.

- **Goal:** Showcase skills, experience, and thoughts (blog) with elegance and simplicity.
- **Core Philosophy:** Configuration over Code. Users should control the site via `data/` and `hugo.yaml` without touching HTML/CSS.
- **Tech Stack:** Hugo (Extended), Dart Sass, Vanilla JavaScript, Hugo Pipes.
- **Default Typography:** Poppins (`@fontsource/poppins`), fallback to system fonts.
- **Icon System:** Custom Font Awesome Pro Kit (`@awesome.me/kit-f6f8bfcfbd`) via SCSS and webfonts (see `.font-awesome.md`).
- **Math Rendering:** MathJax v3 (`mathjax`).

## Development Environment

We use `mise` for deterministic tooling and task management. Use `brew install mise` to install `mise`.
Dart Sass (`brew install dart-sass`) is used for modern Sass module compilation.

### Quick Start

1. **Initialize:** Run `mise run install` to setup tools and dependencies.
2. **Dev Server:** Run `mise run example-site`.
   - This will install all dependencies (root & website2) automatically.
   - Serves the integration site at `localhost:1313`.
3. **Verify Changes:** Run `mise run check` to execute all linters (ESLint + Prettier SCSS) and a production build against `website2`.

## Project Structure

### 1. The "Data-Driven" Layout

Toha differs from standard Hugo themes. The structure of the homepage and sidebar is primarily driven by JSON/YAML files in the `data/` directory, not just the `content/` directory.

- **`data/`**: The source of truth for the site's layout configuration. Example data can be found in the example site (`~/Desktop/website2/data`).
- **`layouts/partials/`**: Contains the reusable UI components.
- **`assets/styles/`**: Styling using modern Dart Sass.

### 2. Directory Map

- `assets/`
  - `images/`: Theme-specific static images.
  - `scripts/`: Vanilla JS files. **Must be processed via Hugo Pipes.**
  - `styles/`: Stylesheets organized according to components, layouts, sections etc.
    - `_core.scss`: Forwards responsive breakpoints, variables, and mixins.
    - `application.template.scss`: Main SCSS entry point processed by Hugo template engine.
- `layouts/`
  - `_default/`: Where base structure of pages are defined.
  - `partials/`: Where the core logic lives. Break complex logic into partials.
  - `shortcodes/`: Custom markdown components for users.
- `i18n/`: Localization files (`i18n/en.toml`). **All user-facing text must be tokenized here.**
- `website2/` (`~/Desktop/website2` / `github.com/nick5435/website2`): The integration test bed and example site.
  - `hugo.yaml`: Main configuration.
  - `data/`: Defines layout configurations.
  - `content/`: Blog posts and markdown content.

## Coding Guidelines

### HTML & Go Templates

- **Semantics:** Use semantic HTML5 (`<section>`, `<article>`, `<nav>`).
- **Partials:** If a block of code is used more than once, extract it to `layouts/partials`.
- **IDs/Classes:** Use meaningful kebab-case class names.
- **Safe HTML:** Use `safeHTML` only when absolutely necessary and verified safe.
- **Icons:** Use standard `<i>` tags for Font Awesome icons (e.g., `<i class="fa-solid fa-house"></i>`, `<i class="fa-brands fa-github"></i>`).

### SCSS & CSS

- **Dart Sass Module System:** Use modern `@use` and `@forward` syntax. **`@import` is deprecated and forbidden.**
  - Partial stylesheets should `@use '../core' as *;` to access theme tokens and mixins.
- **No Inline CSS:** All styles must reside in `assets/styles/`.
- **Variables:** Use SCSS variables for colors and fonts (check `assets/styles/variables.scss` first).
  - Default font family is `$font-family-sans-serif: 'Poppins', ...`.
- **Formatting & Linting:**
  - Follow `.prettierrc.yml` and `.editorconfig` (4 spaces, double quotes, semicolons).
  - Run `npm run lint:scss` or `npm run format:scss`.
  - **Important:** `application.template.scss` contains Go template code and is excluded from Prettier via `.prettierignore` to prevent template syntax corruption.
- **Responsiveness:** Mobile-first approach is preferred, but ensure desktop elegance.

### JavaScript

- **Vanilla JS:** Avoid adding libraries (jQuery, etc.) unless strictly necessary.
- **Fingerprinting:** All JS resources in templates must be fingerprinted for cache busting.
  - _Example:_ `$js := resources.Get "js/script.js" | fingerprint`
- **DOM Manipulation:** Ensure DOM elements exist before attaching listeners.
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

1. Reproduce it in the example site (`website2`).
2. Fix the logic in the theme `layouts` or `assets`.
3. Verify the fix by running `mise run check`.
