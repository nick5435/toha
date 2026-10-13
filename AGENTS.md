# Toha Professional Modern - AI Agent Context

## Project Overview

This is **Toha Professional Modern** (`toha-professional-modern`), a personal portfolio, academic research, and professional showcase theme for the [Hugo](https://gohugo.io/) static site generator.

- **Goal:** Showcase skills, experience, academic research, publications, talks, teaching, and thoughts (blog) with elegance, high accessibility, privacy-first professional networking, and enterprise-grade SEO.
- **Core Philosophy:** Configuration over Code. Users control the site via `data/` and `hugo.yaml` without editing HTML/CSS.
- **Professional-First Networking:** Exclusively supports professional and academic networks (**LinkedIn**, **GitHub**, **ORCID**, **Google Scholar**, **ResearchGate**). Consumer social media (Twitter/X, Facebook, Instagram, Reddit, TikTok, Mastodon, etc.) are strictly disabled and suppressed across templates.
- **SEO & Discovery:** Full Schema.org JSON-LD structured data (`WebSite`, `Person`, `ScholarlyArticle`, `BlogPosting`), canonical links, multilingual `hreflang` alternates, dynamic `robots.txt`, and universal OpenGraph tags.
- **Tech Stack:** Hugo (Extended), Dart Sass, Vanilla JavaScript, Hugo Pipes (DartSass + ESBuild).
- **Default Typography:** Poppins (`@fontsource/poppins`, weights 300, 400, 500, 600, 700) self-hosted with fallback to modern system fonts.
- **Icon System:** Custom Font Awesome Pro Kit (`@awesome.me/kit-f6f8bfcfbd`, v7.3.1 Pro) via SCSS and webfonts (see `.font-awesome.md`), plus Feather icons and Flag icons.
- **Math Rendering:** MathJax v4 (`mathjax@^4.1.3`).
- **Media & Interactive Components:** Video.js (`@videojs/html@^10.0.1`), TypeIt (`typeit@^8.8.7`), Highlight.js (`highlight.js@^11.6.0`).

---

## Author Profile, Academic Context & Reference Persona (`website2`)

The live reference site and integration test bed for Toha is located at `~/Desktop/website2` (repository: `github.com/nick5435/website2`). When authoring example data, writing mock content, tuning academic components, or verifying theme behavior, agents should align with this academic persona and context:

- **Author:** Dr. Nicholas (Nick) Meyer
- **Position:** Assistant Professor of Mathematics at [Winona State University](https://www.winona.edu/)
- **Email:** `nick.meyer@winona.edu`
- **Profiles:** [GitHub](https://github.com/nick5435) | [ORCID](https://orcid.org/0000-0001-6279-5716) | [LinkedIn](https://www.linkedin.com/in/nicholas-meyer-math/) | [JupyterLite](https://jupyter.nickmeyer.phd)
- **Education:**
  - **PhD in Mathematics** (2018–2024), University of Nebraska–Lincoln (Advisor: Alex Zupan)
  - **MS in Mathematics** (2018–2020), University of Nebraska–Lincoln
  - **BS in Mathematics**, Minor in Physics (2015–2018), Winona State University
- **Research Interests:**
  - **Core Topology:** Low-dimensional topology (geometric and algebraic topology of 3- and 4-manifolds).
  - **Specializations:** Knot theory in dimensions 3 and 4, knotted surfaces in 4-manifolds, Heegaard splittings, trisections and multisections of 4-manifolds, torus surgery, and manifold fibrations.
  - **Computational Mathematics:** Computational algebraic topology and knot theory (Python, SageMath, JupyterLite, WebAssembly/Pyodide).
- **Editorial Tone & Math Standards:**
  - Tone is academic, clear, and mathematically rigorous.
  - When authoring or revising posts, abstracts, and publications, preserve standard topology terminology and LaTeX/MathJax notation (e.g., $S^1$, $T^2$, $\Sigma_{g,1}$, 4-manifolds, $X^4$).
- **Legacy Content Warning:**
  - **Ignore `website2/old_content/`**: Do NOT read, search, or migrate files from `website2/old_content/`. It contains outdated drafts and assets that are deliberately deprecated.

---

## Development Environment & Multi-Repo Architecture

We use [Mise](https://mise.jdx.dev/) (`mise.toml`) for deterministic tooling and task management:
- `hugo-extended` (`latest`)
- `node` (`latest`)
- `go` (`latest`)
- Dart Sass (`brew install dart-sass`) for modern Sass module compilation.

### Multi-Repo Relationship

- **`~/Desktop/toha`** (`github.com/nick5435/toha`): Upstream theme repository. Canonical home of all layouts (`layouts/`), partials, and modular SCSS styles (`assets/styles/`).
- **`~/Desktop/website2`** (`github.com/nick5435/website2`): Integration test bed and live reference site. Uses Hugo Modules to import Toha, with a local `replace` directive in `website2/go.mod`:
  ```go
  replace github.com/hugo-toha/toha/v4 => github.com/nick5435/toha/v4 <version/pseudo-version>
  ```

### Tooling Tasks (`mise`) in `toha`

All root tasks are configured in `mise.toml`:

| Task | Command | Description |
| :--- | :--- | :--- |
| **Install Root Dependencies** | `mise run install` | Runs `npm install` in the theme root. |
| **Install Example Site Deps** | `mise run install-example-deps` | Runs `hugo mod tidy`, `hugo mod npm pack`, and `npm install` inside `website2`. |
| **Development Server** | `mise run example-site` | Installs dependencies and launches the Hugo dev server on `website2` (`http://localhost:1313`) with `--minify` and live reload. |
| **Linting** | `mise run lint` | Runs ESLint (`npm run lint`) and Prettier SCSS check (`npm run lint:scss`). |
| **Auto-fix Lint & Style** | `mise run lint-fix` | Auto-fixes ESLint errors (`npm run lint:fix`) and formats SCSS (`npm run format:scss`). |
| **Format SCSS** | `npm run format:scss` | Auto-formats stylesheets via Prettier according to `.prettierrc.yml`. |
| **Production Build** | `mise run build` | Executes a clean production build (`hugo --gc --minify --cleanDestinationDir`) against `website2`. |
| **Verification (Single Truth)** | `mise run check` | Runs full linting (`npm run lint` + `npm run lint:scss`) followed by the production build against `website2`. |
| **Update Dependencies** | `mise run update` | Updates npm dependencies and rebuilds `package.hugo.json`. |
| **Fix Security Issues** | `mise run fix-security` | Runs `npm audit fix --force`. |

### Downstream Sync in `website2`

When theme changes are pushed upstream to `github.com/nick5435/toha`, sync `website2` via:
```bash
mise -C ~/Desktop/website2 run update   # runs hugo mod get -u && install
mise -C ~/Desktop/website2 run build    # verifies production build in website2
```

---

## Project Structure

### 1. The "Data-Driven" Layout

Toha differs from standard Hugo themes. The structure of the homepage and sidebar is primarily driven by JSON/YAML files in the `data/` directory, not just the `content/` directory.

- **`data/`**: The source of truth for the site's layout configuration (`website2/data/en/` or `exampleSite/data`).
- **`layouts/partials/`**: Contains reusable UI components:
  - **`sections/`**: Homepage sections:
    - *Core / Portfolio:* `about`, `skills`, `experiences`, `education` (plus alternate template `education-alt`), `projects`, `recent-posts`, `featured-posts`, `accomplishments`, `achievements`.
    - *Academic & Research:* `publications`, `talks`, `students`, `service`, `calendar`, `courses`.
    - *Extended Showcase:* `technology` (responsive 3x2 card grid for tools and computational environments), `activities` ("Outside the Classroom" cards for hobbies and pursuits).
  - **`cards/`**: Modular card components rendered inside sections:
    - `students.html`: Graduate research and student advising cards with thesis topics, organizations, and profile links.
    - `talk.html`: Selected talks card with venue, date, abstract, and category tags.
    - `publication.html`: Research papers and preprints with DOI, links, and abstracts.
    - `service.html`: Academic and committee service cards.
    - `project.html`: Portfolio project cards with action buttons and badges.
    - `accomplishments.html`, `skill.html`, `post.html`.
  - **`navigators/`**: Navigation headers (`navbar`, `sidebar`).
  - **`helpers/`**: Asset bundling templates (`style-bundle.html`, `script-bundle.html`, `get-esbuild-options.html`, `get-sass-options.html`).
- **`assets/styles/`**: Styling using modern Dart Sass modules.

### 2. Directory Map

- `assets/`
  - `images/`: Theme-specific static images.
  - `scripts/`: Vanilla JS files. **Must be processed via Hugo Pipes (`js.Build (dict "minify" true) | fingerprint`).**
  - `styles/`: Modular stylesheets organized by components, layouts, and sections:
    - `_core.scss`: Forwards responsive breakpoints, variables, and mixins.
    - `variables.scss`: Central color palettes, typography, and theme token maps (`$themes`).
    - `components/`: UI components (`buttons.scss`, `cards.scss`, `links.scss`, `texts.scss`, `tables.scss`, `images.scss`, `misc.scss`).
    - `sections/`: Section stylesheets (`about.scss`, `activities.scss`, `education.scss`, `experiences.scss`, `publications.scss`, `service.scss`, `talks.scss`, `technology.scss`, `footer.scss`, etc.).
    - `application.template.scss`: Main SCSS entry point processed by the Hugo template engine.
- `layouts/`
  - `_default/`: Base structures of pages (`baseof.html`, `list.html`, `single.html`).
  - `partials/`: Core reusable partials (`sections/`, `cards/`, `navigators/`, `helpers/`).
  - `shortcodes/`: Custom markdown components (`alert`, `embed-pdf`, `gist`, `img`, `rimg`, `mastodon`, `note`, `split`, `video`, `vs`).
- `i18n/`: Localization files (`i18n/en.toml`). **All user-facing text must be tokenized here.**
- `website2/` (`~/Desktop/website2`): Integration test bed and live reference site.
  - `hugo.yaml`: Main configuration (theme flags, features, analytics, mathjax, poppins font mounts).
  - `data/en/sections/`: YAML files defining all active homepage sections.
  - `content/`: Blog posts, markdown notes, and individual section pages.

---

## Homepage Section Schema & Conventions

Homepage sections are dynamically ordered and rendered by `layouts/index.html` sorted by `section.weight`.

### Section Header Schema (`data/en/sections/<section-name>.yaml`)

Every section YAML defines a `section:` block supporting these standard fields:

```yaml
section:
  name: "Section Name"          # Display title (supports markdownify)
  id: "section-id"              # HTML anchor ID (kebab-case, e.g. "outside-the-classroom")
  enable: true                  # Boolean toggle (defaults to false in new themes)
  weight: 10                    # Numeric vertical ordering weight on the homepage
  showOnNavbar: true            # Whether to include a link in the top navbar
  template: "sections/foo.html" # Optional explicit partial template path (defaults to sections/<id>.html)
  subtitle: "Descriptive line"  # Optional markdown subtitle rendered below heading in .activity-section-subtitle
  hideTitle: false              # Optional boolean to visually hide <h2> while preserving accessible semantics
  filter: true                  # Optional boolean to render category filter buttons (e.g. in talks, projects)

# Optional topical tags / badges rendered below title / subtitle
tags:
  - "3- & 4-Manifolds"
  - "Knot Theory"
```

### Rendering Mechanics in `layouts/index.html`

- **Dynamic Template Resolution:** If `.section.template` is specified, Hugo loads that exact partial; otherwise, it falls back to `sections/<section.id>.html` (lowercased with spaces replaced by `-`).
- **Alternating Section Backgrounds:** The homepage alternates between `bg-primary` and `bg-secondary` container holders.
- **Section Subtitles & Badges:** Standardized across sections using `.activity-section-subtitle` / `.section-subtitle` and `.badge.activity-badge` / `.badge.section-badge` (styled in `assets/styles/components/buttons.scss`).
- **Interactive Filtering:** Sections with `filter: true` (e.g., `talks.html`) render a button group (`.talk-filter-btn`) matching item data attributes (`data-category`), driven by lightweight client-side vanilla JavaScript.
- **Responsive Grids:**
  - `technology.html`: Uses a condensed 3x2 responsive card grid (`col-12 col-md-6 col-lg-4`) with icon badges and technology pill tags.
  - `activities.html`: Uses responsive cards with 48px rounded icon wrappers and hover elevation.
  - `students.html`: Uses 2-column cards (`col-md-12 col-lg-6`) via `layouts/partials/cards/students.html`.

---

## Coding Guidelines

### HTML & Accessibility (WCAG 2.1 AA)

- **Semantics:** Use semantic HTML5 (`<main id="main-content">`, `<section>`, `<article>`, `<nav>`).
- **Landmarks & Skip Link:** Include a screen-reader and keyboard accessible skip link to `#main-content` at the top of the body (`<a class="skip-to-content" href="#main-content">`).
- **Partials:** If a block of code is used more than once, extract it to `layouts/partials`.
- **IDs/Classes:** Use meaningful kebab-case class names.
- **Safe HTML:** Use `safeHTML` only when absolutely necessary and verified safe.
- **Icons:** Use standard `<i>` tags for Font Awesome icons (e.g., `<i class="fa-solid fa-house"></i>`, `<i class="fa-brands fa-github"></i>`).
- **Image Alt Attributes:** Purely decorative and brand logo icons should use `alt=""` or appropriate accessible descriptions rather than generic redundant terms like "logo".

### SCSS & Modern Dart Sass

- **Dart Sass Module System:** Use modern `@use` and `@forward` syntax. **`@import` is deprecated and forbidden.**
  - Partial stylesheets must `@use '../core' as *;` to access theme tokens, mixins, and responsive breakpoints.
- **No Inline CSS:** All styles must reside in `assets/styles/`.
- **Variables & Tokens:** Use SCSS variables and theme helper functions:
  - Access colors via `get-light-color($token)` and `get-dark-color($token)`.
  - **`text-over-accent-color` vs `hero-text-color`:**
    - `text-over-accent-color`: Text/icons displayed *on top of buttons, badges, and pills* styled with `accent-color`. Must have WCAG contrast against the accent color (e.g., `#ffffff` on dark cyan in light mode; `#0f172a` on light cyan in dark mode).
    - `hero-text-color`: Text/icons displayed *over hero background images* (`.home`, `.greeting`, `.typing-carousel`, bounce arrow, `.transparent-navbar`). Always `#ffffff` in both light and dark modes to ensure contrast over photographic or dark hero backgrounds.
- **Buttons & Badges:**
  - Bootstrap 5 CSS variables (`--bs-btn-*`) are customized in `assets/styles/components/buttons.scss` for `.btn-outline-info`, `.btn-info`, and `.btn-dark`.
  - Use `.activity-badge` / `.section-badge` for topic pills under section headers.
- **Link Styling:** Contextual content links must feature an underline (`text-decoration: underline`, `text-underline-offset: 2px`) to satisfy WCAG 1.4.1 (use of color alone is not sufficient to distinguish links). Navigation items, buttons, and card links may explicitly suppress underlines.
- **Typography & Content Formatting:**
  - Default font family is `$font-family-sans-serif: 'Poppins', ...`.
  - About section summary paragraphs use standard academic indentation: `.about-summary p { text-indent: 1.75rem; margin-bottom: 0.75rem; }`.
- **Performance & Containment:**
  - Heavy homepage sections should declare `@include section-title-adjustment();` and CSS containment for smooth rendering:
    ```scss
    content-visibility: auto;
    contain-intrinsic-size: auto 500px;
    ```
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
- **Icons:** Custom Font Awesome Pro Kit (`@awesome.me/kit-f6f8bfcfbd`, v7.3.1 Pro):
  - SCSS imported directly in `assets/styles/application.template.scss`.
  - Webfonts mounted via Hugo module mounts to `static/webfonts`.
  - Families supported: Classic, Duotone, Sharp, Sharp-Duotone.
  - Agent tools in `website2/.agents/skills/`: `/suggest-icon <concept>`, `/add-icon <name>`, `/fa-help <question>`.
- **Math Rendering:** MathJax v4 (`mathjax@^4.1.3`) with inline delimiters (`$`, `\(`) and display delimiters (`$$`, `\[`).

---

## Primary Theme Authority & Upstreaming

- **Partials & Layouts:** Theme layout and partial modifications (`layouts/partials/...`) originate and belong in this repository (`~/Desktop/toha`), rather than being kept as ad-hoc overrides in `website2`.
- **Modular SCSS:** Custom CSS and design enhancements belong in `assets/styles/` within the modular SCSS structure (`sections/`, `components/`, etc.) rather than accumulating in site-level `override.scss`.
- **Minimal `website2/override.scss`:** In `website2`, `override.scss` is reserved strictly for site-specific overrides (such as disabling hero background filters or site-specific font overrides). All reusable components belong in `toha`.

---

## Contributing Rules (Strict)

1. **Backward Compatibility:** NEVER break existing `config` or `data` structures.
2. **Configurability:** Every new visual feature must be toggleable via `hugo.yaml` or `data/` files.
3. **Defaults:** New features must be **disabled by default**.
4. **Localization:** Do not hardcode English strings. Use `{{ i18n "string_id" }}`.

---

## Common Workflows

### How to Add a New Section

1. Create the layout partial in `layouts/partials/sections/<section-name>.html`.
2. (Optional) If the section uses modular cards, create `layouts/partials/cards/<card-name>.html`.
3. Add the modular styling in `assets/styles/sections/<section-name>.scss`.
4. Forward the section stylesheet in `assets/styles/application.template.scss`.
5. Ensure the section is registered in `layouts/index.html` or handled via `.section.template`.
6. Define the data schema in `website2/data/en/sections/<section-name>.yaml` (and example site data).
7. Wrap rendering in a conditional check (e.g., `if .section.enable`).
8. Run `npm run format:scss` and verify via `mise run check`.

### How to Add or Customize a Reusable Card

1. Create or edit `layouts/partials/cards/<card-name>.html`.
2. Style card elements in `assets/styles/components/cards.scss` or section-specific SCSS.
3. Use flex column layout (`d-flex flex-column h-100`) so card footers align cleanly across different content heights.
4. Verify with `mise run check`.

### How to Fix a Bug

1. Reproduce it in the integration site (`website2`).
2. Fix the logic in the theme `layouts/` or `assets/`.
3. Verify the fix by running `mise run check` in `~/Desktop/toha`.
4. Verify visually if needed with `mise run example-site`.
