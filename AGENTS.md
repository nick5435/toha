# Toha Hugo Theme - AI Agent Context

## Project Overview

This is **Toha**, a personal portfolio and academic theme for the [Hugo](https://gohugo.io/) static site generator.

- **Goal:** Showcase skills, experience, academic research, publications, talks, and thoughts (blog) with elegance, high accessibility, and simplicity.
- **Core Philosophy:** Configuration over Code. Users control the site via `data/` and `hugo.yaml` without editing HTML/CSS.
- **Tech Stack:** Hugo (Extended), Dart Sass, Vanilla JavaScript, Hugo Pipes (DartSass + ESBuild).
- **Default Typography:** Poppins (`@fontsource/poppins`, weights 300, 400, 500, 600, 700) self-hosted with fallback to modern system fonts.
- **Icon System:** Custom Font Awesome Pro Kit (`@awesome.me/kit-f6f8bfcfbd`, v7.3.1 Pro) via SCSS and webfonts (see `.font-awesome.md`), plus Feather icons and Flag icons.
- **Math Rendering:** MathJax v3 (`mathjax@^3.2.2`).
- **Diagrams & Media:** Mermaid (`mermaid@^10.8.0`), Plyr (`plyr@^3.7.2`), TypeIt (`typeit@^8.8.7`), Highlight.js (`highlight.js@^11.6.0`).

## Development Environment

We use `mise` for deterministic tooling and task management. Install with `brew install mise` or see [mise.jdx.dev](https://mise.jdx.dev).
Dart Sass (`brew install dart-sass`) is used for modern Sass module compilation.

### Tooling Tasks (`mise`)

- `mise run install`: Setup theme root tools and install npm dependencies.
- `mise run example-site`: Install dependencies (root & `website2`) and start Hugo dev server at `http://localhost:1313` with `--minify` and live reload.
- `mise run check`: Single-truth verification running linters (`npm run lint` + `npm run lint:scss`) and production build against `website2`.
- `mise run lint`: Run ESLint and Prettier SCSS check.
- `mise run build`: Execute a clean production build (`hugo --gc --minify --cleanDestinationDir`) against `website2`.
- `mise run update`: Update dependencies and rebuild `package.hugo.json`.
- `mise run fix-security`: Run npm security audit fix (`npm audit fix --force`).

## Project Structure

### 1. The "Data-Driven" Layout

Toha differs from standard Hugo themes. The structure of the homepage and sidebar is primarily driven by JSON/YAML files in the `data/` directory, not just the `content/` directory.

- **`data/`**: The source of truth for the site's layout configuration. Example data can be found in the integration site (`~/Desktop/website2/data` or `exampleSite/data`).
- **`layouts/partials/`**: Contains reusable UI components.
  - `sections/`: Homepage sections (`about`, `skills`, `experiences`, `education`, `projects`, `publications`, `talks`, `service`, `students`, `calendar`, `accomplishments`, `achievements`, `recent-posts`, `featured-posts`).
  - `navigators/`: Navigation headers (`navbar`, `sidebar`).
  - `helpers/`: Asset bundling templates (`style-bundle.html`, `script-bundle.html`, `get-esbuild-options.html`, `get-sass-options.html`).
- **`assets/styles/`**: Styling using modern Dart Sass.

### 2. Directory Map

- `assets/`
  - `images/`: Theme-specific static images.
  - `scripts/`: Vanilla JS files. **Must be processed via Hugo Pipes (`js.Build (dict "minify" true) | fingerprint`).**
  - `styles/`: Stylesheets organized according to components, layouts, sections, etc.
    - `_core.scss`: Forwards responsive breakpoints, variables, and mixins.
    - `variables.scss`: Central color palettes, typography, and theme token maps (`$themes`).
    - `application.template.scss`: Main SCSS entry point processed by Hugo template engine.
- `layouts/`
  - `_default/`: Where base structures of pages are defined (`baseof.html`, `list.html`, `single.html`).
  - `partials/`: Core reusable partials.
  - `shortcodes/`: Custom markdown components for users (`alert`, `embed-pdf`, `gist`, `img`, `rimg`, `mastodon`, `mermaid`, `note`, `split`, `video`, `vs`).
- `i18n/`: Localization files (`i18n/en.toml`). **All user-facing text must be tokenized here.**
- `website2/` (`~/Desktop/website2` / `github.com/nick5435/website2`): The integration test bed and live reference site.
  - `hugo.yaml`: Main configuration.
  - `data/`: Defines layout configurations.
  - `content/`: Blog posts and markdown content.

## Coding Guidelines

### HTML & Accessibility (WCAG 2.1 AA)

- **Semantics:** Use semantic HTML5 (`<main id="main-content">`, `<section>`, `<article>`, `<nav>`).
- **Landmarks & Skip Link:** Include a screen-reader and keyboard accessible skip link to `#main-content` at the top of the body (`<a class="skip-to-content" href="#main-content">`).
- **Partials:** If a block of code is used more than once, extract it to `layouts/partials`.
- **IDs/Classes:** Use meaningful kebab-case class names.
- **Safe HTML:** Use `safeHTML` only when absolutely necessary and verified safe.
- **Icons:** Use standard `<i>` tags for Font Awesome icons (e.g., `<i class="fa-solid fa-house"></i>`, `<i class="fa-brands fa-github"></i>`).
- **Image Alt Attributes:** Purely decorative and brand logo icons should use `alt=""` or appropriate accessible descriptions rather than generic redundant terms like "logo".

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

### How to Add a New Section

1. Create the partial in `layouts/partials/sections/<section-name>.html`.
2. Add the styling in `assets/styles/sections/<section-name>.scss`.
3. Forward the section stylesheet in `assets/styles/application.template.scss`.
4. Add the entry logic in `layouts/index.html` (or relevant parent).
5. Define the data schema in `website2/data/<language code>/sections/<section-name>.yaml`.
6. Wrap the rendering in a conditional check (e.g., `if .Site.Params.features.newSection.enable`).

### How to Fix a Bug

1. Reproduce it in the integration site (`website2`).
2. Fix the logic in the theme `layouts` or `assets`.
3. Verify the fix by running `mise run check`.
