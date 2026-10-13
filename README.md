# Toha Professional Modern

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fhugo-themes%2Ftoha%2Fbadge%3Fref%3Dmain&style=flat)](https://github.com/nick5435/toha)
![Repository Size](https://img.shields.io/github/repo-size/nick5435/toha)
![Contributor](https://img.shields.io/github/contributors/nick5435/toha)
![License](https://img.shields.io/github/license/nick5435/toha)

**Toha Professional Modern** (`toha-professional-modern`) is a personal portfolio, academic research, and professional showcase theme for [Hugo](https://gohugo.io/). It blends minimalist elegance, high accessibility (WCAG 2.1 AA), rich data-driven sections, privacy-first professional networking (zero consumer social media bloat), and enterprise-grade SEO.

![Thumbnail](https://raw.githubusercontent.com/hugo-themes/toha/main/images/screenshot.png)

- **Reference & Live Test Site:** [nickmeyer.phd](https://nickmeyer.phd) ([github.com/nick5435/website2](https://github.com/nick5435/website2))
- **Documentation:** [toha-docs.netlify.app](https://toha-docs.netlify.app/posts)
- **Developer & Agent Guide:** [`AGENTS.md`](AGENTS.md)

---

## Key Highlights

- **Configuration over Code:** Control your entire site through `hugo.yaml` and YAML files in `data/` without editing HTML/CSS.
- **Academic & Research Showcase:** Built-in modular sections for Publications (DOIs, abstracts, filter buttons), Selected Talks, Students Advised, Professional Service, and Calendar embeds.
- **Professional-First Networking:** Exclusively supports professional and academic networks (**LinkedIn**, **GitHub**, **ORCID**, **Google Scholar**, **ResearchGate**). Consumer social media trackers are strictly disabled.
- **Unified SCSS Design System:** Modern Dart Sass modules (`@use`/`@forward`) with named palette tokens, standard elevation shadows, and reusable mixins (`academic-card`, `interactive-card`, `icon-wrapper`, `badge-pill`, `filter-button`).
- **Accessibility by Design (WCAG 2.1 AA):** High-contrast color tokens, keyboard skip links, contextual link underlines, and semantic HTML5 landmarks.
- **Typography & Math:** Self-hosted Poppins font (`@fontsource/poppins`), MathJax v4 (`mathjax@^4.1.3`), and Font Awesome Pro Kit icons (`@awesome.me/kit-f6f8bfcfbd`).
- **Enterprise SEO & Structured Data:** Automatic Schema.org JSON-LD graphs (`WebSite`, `Person`, `ScholarlyArticle`, `BlogPosting`), canonical links, multilingual `hreflang` tags, and OpenGraph previews.
- **Deterministic Toolchain:** Managed via [Mise](https://mise.jdx.dev) (`mise.toml`).

---

## Quickstart

### 1. Initialize Hugo Module

```bash
hugo mod init github.com/<your-username>/<your-repo-name>
```

### 2. Add Dependency in `hugo.yaml`

```yaml
module:
  imports:
    - path: github.com/nick5435/toha
```

### 3. Install & Run

```bash
hugo mod tidy && hugo mod npm pack && npm install
hugo server -w
```

---

## Modular Sections

All homepage sections are dynamically ordered by `section.weight` in `data/en/sections/<section>.yaml`:

| Section | Description | Data File |
| :--- | :--- | :--- |
| **About** | Academic bio, portrait, contact details, and formatted research summary. | `about.yaml` |
| **Publications** | Research papers, preprints, citations, DOI links, and abstract accordions. | `publications.yaml` |
| **Selected Talks** | Presentations, colloquia, and seminar talks with category filtering. | `talks.yaml` |
| **Students Advised** | Supervised graduate and undergraduate students, theses, and projects. | `students.yaml` |
| **Professional Service** | Editorial duties, peer review, and university committee contributions. | `service.yaml` |
| **Technology** | Responsive 3x2 card grid highlighting languages, environments, and tools. | `technology.yaml` |
| **Outside the Classroom** | Hobbies, creative pursuits, athletics, and community pastimes. | `activities.yaml` |
| **Education** | Academic degrees and honors (tabular or timeline card layout). | `education.yaml` |
| **Experiences** | Chronological career and work experience timeline. | `experiences.yaml` |
| **Projects** | Filterable project cards with action buttons and modal dialogs. | `projects.yaml` |
| **Skills** | Competency categories with proficiency bars or tag pills. | `skills.yaml` |
| **Recent / Featured Posts** | Latest articles and blog highlights directly on the homepage. | `recent-posts.yaml` |

---

## Shortcodes

| Shortcode | Usage |
| :--- | :--- |
| `{{< alert type="info" >}}` | Styled alerts (`success`, `info`, `warning`, `danger`) |
| `{{< embed-pdf url="..." >}}` | Embed interactive PDF documents directly in pages |
| `{{< split >}}` | Side-by-side multi-column content |
| `{{< video src="..." >}}` | Responsive HTML5 video player powered by Video.js v10 |
| `{{< note >}}` | Highlighted callout note blocks |
| `{{< rimg src="..." >}}` | Auto-resizing responsive images via Hugo Pipes |
| `{{< vs size="2" >}}` | Vertical spacing between content blocks |

---

## Development & Tooling (`mise`)

Root tasks configured in `mise.toml`:

| Task | Command | Description |
| :--- | :--- | :--- |
| **Development Server** | `mise run example-site` | Launches dev server with live reload on `website2` (`http://localhost:1313`). |
| **Verification (Single Truth)** | `mise run check` | Runs full linting (`npm run lint` + `npm run lint:scss`) followed by production build. |
| **Auto-fix Lint & Style** | `mise run lint-fix` | Auto-fixes ESLint errors and formats stylesheets via Prettier. |
| **Production Build** | `mise run build` | Builds `website2` for production (`hugo --gc --minify --cleanDestinationDir`). |
| **Install Dependencies** | `mise run install` | Installs theme root npm dependencies. |

For full architectural guidelines, theme authority rules, and academic persona standards, refer to [`AGENTS.md`](AGENTS.md).

---

## Attribution & Thanks

- Original theme created by [Emruz Hossain](https://github.com/hossainemruz) and the [Toha Community](https://github.com/hugo-themes/toha).
- Modernized, professionalized, and maintained by [Nick Meyer](https://github.com/nick5435).
- Illustrations courtesy of [IconScout](https://iconscout.com/).
