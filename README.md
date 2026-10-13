# Toha Professional Modern

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fhugo-themes%2Ftoha%2Fbadge%3Fref%3Dmain&style=flat)](https://github.com/nick5435/toha)
![Repository Size](https://img.shields.io/github/repo-size/nick5435/toha)
![Contributor](https://img.shields.io/github/contributors/nick5435/toha)
![License](https://img.shields.io/github/license/nick5435/toha)

**Toha Professional Modern** (`toha-professional-modern`) is a personal portfolio, academic research, and professional showcase theme for [Hugo](https://gohugo.io/). It blends minimalist elegance, high accessibility (WCAG 2.1 AA), rich data-driven sections, privacy-first professional networking (zero consumer social media bloat), and enterprise-grade SEO.

![Thumbnail](https://raw.githubusercontent.com/hugo-themes/toha/main/images/screenshot.png)

- **Reference & Live Test Site:** [nickmeyer.phd](https://nickmeyer.phd) ([github.com/nick5435/website2](https://github.com/nick5435/website2))
- **Example Site:** [toha-example-site](https://toha-example-site.netlify.app)
- **Documentation:** [toha-docs.netlify.app](https://toha-docs.netlify.app/posts)

---

## Key Highlights

- **Configuration over Code:** Structure your entire portfolio via `hugo.yaml` and YAML/JSON data files in `data/` without modifying HTML or CSS.
- **Academic & Research Showcase:** Native, modular sections for Academic Publications (DOIs, abstracts, category filters), Selected Talks (interactive client-side filtering), Students Advised (theses, independent studies, mentorship), Professional Service (committees, peer review), and Calendar embeds.
- **Professional-First Networking & Privacy:** Strictly limited to career and academic platforms (**LinkedIn**, **GitHub**, **ORCID**, **Google Scholar**, **ResearchGate**). Consumer social media platforms (Twitter/X, Facebook, Instagram, Reddit, TikTok, Mastodon, etc.) are disabled and filtered out across the theme.
- **Enterprise SEO & Structured Data:** Built-in Schema.org JSON-LD graphs (`WebSite`, `Person` with verified academic `sameAs` profiles, `ScholarlyArticle`, `BlogPosting`), canonical URLs, multilingual `hreflang` tags, OpenGraph previews, and automated `robots.txt` crawler directives.
- **Centered Visual Hierarchy & Alignment:** Balanced center-alignment hierarchy (`Title` $\rightarrow$ `Subtitle` $\rightarrow$ `Topical Badge Pills`) standardized across all homepage sections.
- **Modern Showcase Sections:**
  - **Technology:** Condensed responsive 3x2 card grid highlighting computational environments, programming languages (Python, SageMath, WebAssembly/Pyodide), typesetting systems (LaTeX, TikZ), and workstations.
  - **Outside the Classroom:** Visual cards for personal pursuits, hobbies, and creative pastimes with rounded icon wrappers and hover elevation.
- **Accessibility by Design (WCAG 2.1 AA):** Built-in semantic HTML5 landmarks (`<main id="main-content">`), accessible keyboard skip links, contextual link underlines, high-contrast tokens, and descriptive attributes.
- **Performance & CSS Containment:** Modern Dart Sass styling with CSS containment (`content-visibility: auto`, `contain-intrinsic-size`) on heavy homepage sections for 60fps scrolling.
- **Modern Asset Pipeline:** Dart Sass module architecture (`@use`/`@forward`), ESBuild bundling, automated minification, and cache-busting fingerprints via Hugo Pipes.
- **Typography & Math:** Self-hosted Poppins font (`@fontsource/poppins`), MathJax v4 formula rendering (`mathjax@^4.1.3`) with inline (`$`) and display (`$$`) delimiters, and custom Font Awesome Pro Kit icons (`@awesome.me/kit-f6f8bfcfbd`, v7.3.1 Pro).
- **Dynamic Themes:** Dark mode, light mode, and automatic system detection (`prefers-color-scheme`) with WCAG-compliant contrast tokens (`text-over-accent-color` and `hero-text-color`).
- **Deterministic Toolchain:** Single truth workflow powered by [Mise](https://mise.jdx.dev) (`mise.toml`).

---

## Features

### Comprehensive Homepage Sections

Toha Professional Modern provides a rich catalog of modular, data-driven homepage sections that can be individually enabled, ordered, and styled:

| Section | Description | Template & Data |
| :--- | :--- | :--- |
| **About** | Biography, avatar portrait, contact details, and formatted academic summary paragraphs with centered alignment. | `sections/about.html` |
| **Technology** | Responsive 3x2 card grid highlighting languages, computational packages, typesetting pipelines, and workstations. | `sections/technology.html` |
| **Outside the Classroom** | Hobbies, creative pursuits, athletics, and pastimes with rounded icon wrappers and card elevation hover effects. | `sections/activities.html` |
| **Selected Talks** | Presentations, colloquia, and seminar talks with interactive category filtering (`filter: true`), venues, dates, and abstracts. | `sections/talks.html` & `cards/talk.html` |
| **Publications** | Academic papers, preprints, citations, DOI links, and abstract accordions with category filter buttons. | `sections/publications.html` & `cards/publication.html` |
| **Students Advised** | Supervised graduate and undergraduate students, master's theses, independent studies, and profile links. | `sections/students.html` & `cards/students.html` |
| **Professional Service** | Editorial duties, peer review, department committees, and academic community contributions. | `sections/service.html` & `cards/service.html` |
| **Calendar** | Responsive Google Calendar or schedule embed for office hours, teaching schedules, and appointments. | `sections/calendar.html` |
| **Education** | Academic degrees and honors; supports both standard tabular format and alternate card timeline. | `sections/education.html` (or `education-alt.html`) |
| **Experiences** | Interactive chronological career and work experience timeline. | `sections/experiences.html` |
| **Projects** | Filterable project cards with action links, badges, and modal dialogs. | `sections/projects.html` & `cards/project.html` |
| **Skills** | Competency categories with proficiency bars or pill tags. | `sections/skills.html` |
| **Accomplishments & Achievements** | Certifications, honors, and awards. | `sections/accomplishments.html`, `achievements.html` |
| **Recent & Featured Posts** | Latest blog posts and highlighted articles directly on the homepage. | `sections/recent-posts.html`, `featured-posts.html` |

### Data-Driven Section Conventions

Every section YAML file in `data/en/sections/<section-name>.yaml` shares a consistent configuration header:

```yaml
section:
  name: "Section Name"          # Display heading (supports markdownify)
  id: "section-id"              # HTML anchor ID (e.g. "outside-the-classroom")
  enable: true                  # Toggle section visibility (default: false)
  weight: 10                    # Homepage vertical ordering weight
  showOnNavbar: true            # Include in top navigation bar
  template: "sections/foo.html" # Optional explicit template override
  subtitle: "Descriptive line"  # Subtitle displayed in .activity-section-subtitle
  hideTitle: false              # Visually hide <h2> while preserving accessible semantics
  filter: true                  # Enable category filter buttons (e.g. talks, projects)

# Optional topical tags / badges rendered below the title and subtitle
tags:
  - "Low-Dimensional Topology"
  - "3- & 4-Manifolds"
```

- **Centered Visual Stack:** Section headers automatically format as a centered vertical stack:
  $$\text{Section Title} \longrightarrow \text{Section Subtitle} \longrightarrow \text{Topical Badge Pills}$$
- **Dynamic Template Resolution:** If `.section.template` is specified, Hugo loads that exact partial; otherwise, it falls back to `sections/<section.id>.html`.
- **Alternating Backgrounds:** Homepage automatically alternates between `bg-primary` and `bg-secondary` container holders.

---

### Professional-First Social & Privacy Standards

Unlike generic themes that bundle consumer social media trackers and share widgets, **Toha Professional Modern** strictly enforces a professional and academic focus:

- **Approved Professional Platforms:**
  - **LinkedIn** (`fab fa-linkedin`)
  - **GitHub** (`fab fa-github`)
  - **ORCID** (`fab fa-orcid`)
  - **Google Scholar** (`fas fa-graduation-cap`)
  - **ResearchGate** (`fab fa-researchgate`)
  - Professional email (`fas fa-envelope`) and telephone (`fas fa-phone-alt`)
- **Consumer Social Media Deprecation:**
  - Sites similar to Twitter/X, Facebook, Instagram, Reddit, TikTok, Tumblr, Pocket, Diaspora, Mastodon, WhatsApp, Threads, and Snapchat are considered non-professional and are **disabled and suppressed**.
  - Template guards in `about.html` and `footer.html` automatically filter out any accidental non-professional entries.
  - Blog post share buttons (`single.html`) are restricted strictly to **LinkedIn** and **Email**.
  - Brand color SCSS maps (`$brand-colors`) are streamlined to professional networks only.

---

### Comprehensive Modern SEO Suite

The theme includes a complete, automated SEO and discovery engine:

1. **Centralized SEO Meta (`layouts/partials/seo.html`):**
   - Contextual descriptions derived from page content, summary, or site parameters.
   - Intelligent keyword generation from tags and categories.
   - Canonical URL generation via `.Permalink` or `.Params.relcanonical`.
   - Multilingual `hreflang` alternate links with `x-default` fallback.
   - Dynamic robots directives (`index, follow` vs `noindex, nofollow` when `hidden: true`).
2. **Schema.org Structured Data (`layouts/partials/structured_data.html`):**
   - Full JSON-LD graphs for search engines and academic discovery.
   - Homepage: `WebSite` and `Person` entities with verified `sameAs` professional links (GitHub, LinkedIn, ORCID, Google Scholar, ResearchGate).
   - Articles: `BlogPosting` and `ScholarlyArticle` schemas with author, publisher, date published/modified, and featured image attributes.
3. **OpenGraph Protocol (`layouts/partials/opengraph.html`):**
   - Universal social preview cards (`og:title`, `og:description`, `og:image`, `og:url`, `og:site_name`, `og:locale`).
   - Platform-independent standard tags readable by LinkedIn, Slack, Discord, and messaging apps.
4. **Dynamic Crawler Directives (`layouts/robots.txt`):**
   - Search engine bot rules with dynamic sitemap discovery referencing `sitemap.xml`.

---

### Blog & Notes

- Categorized posts with tags and hierarchical table of contents.
- Reading time estimate and word count.
- Full MathJax v4 formula rendering with inline (`$`) and display (`$$`) notation.
- Code syntax highlighting with Highlight.js and one-click copy button.
- Client-side full-text search powered by Fuse.js and Mark.js.
- Standalone multi-topic Notes section.

### Analytics & Comments

- **Analytics:** Google Analytics, [Umami](https://umami.is/), [GoatCounter](https://www.goatcounter.com/), [counter.dev](https://counter.dev/), [Matomo](https://matomo.org/).
- **Comments:** [Giscus](https://giscus.app/), [Disqus](https://disqus.com/), [Utterances](https://utteranc.es/), [Valine](https://valine.js.org/).

---

## Available Translations

Toha supports multilingual sites out-of-the-box with translations in 23+ languages:

| Language | Language | Language |
| :--- | :--- | :--- |
| English | Français | Deutsch |
| Español | বাংলা (Bengali) | हिन्दी (Hindi) |
| 简体中文 (Simplified Chinese) | 繁體中文 (Traditional Chinese) | 日本語 (Japanese) |
| 한국어 (Korean) | Italiano | Português Europeu |
| Português Brasileiro | Nederlands | русский (Russian) |
| suomi (Finnish) | Tiếng Việt (Vietnamese) | Türkçe (Turkish) |
| Azerbaijan | Català | Hebrew (עברית) |
| Arabic (العربية) | Indonesian | |

To learn how to configure multilingual sites, visit the [Translation Guide](https://toha-docs.netlify.app/posts/translation/).

---

## Requirements

- **Hugo:** Version `0.163.0` (extended) or higher (tested with `0.167.0+ extended`).
- **Go:** Version `1.20` or higher (required for Hugo Modules).
- **Node.js & npm:** Node `v18.x` or later (Node 20+ recommended) and npm `8.x` or later.
- **Dart Sass:** Modern Dart Sass for compilation (`brew install dart-sass`).
- **Mise (Recommended):** For deterministic toolchains and task management (`brew install mise`).

---

## Usage

### Option 1: Quickstart via Hugo Modules (Recommended)

1. **Initialize Hugo module in your site repository:**

   ```bash
   hugo mod init github.com/<your-username>/<your-repo-name>
   ```

2. **Add Toha as a module dependency in `hugo.yaml`:**

   ```yaml
   module:
     imports:
       - path: github.com/nick5435/toha
   ```

3. **Install dependencies:**

   ```bash
   hugo mod tidy
   hugo mod npm pack
   npm install
   ```

4. **Run local server:**

   ```bash
   hugo server -w
   ```

### Option 2: Starter Template

Fork the [toha-example-site](https://github.com/hugo-themes/toha-example-site) sample repository and configure the `data/` and `hugo.yaml` settings to match your profile.

---

## Shortcodes

Enhance your Markdown content with built-in shortcodes:

| Shortcode | Description |
| :--- | :--- |
| `{{< alert type="info" >}}` | Styled alerts (`success`, `info`, `warning`, `danger`) |
| `{{< embed-pdf url="..." >}}` | Embed interactive PDF documents directly in pages |
| `{{< split >}}` | Multi-column side-by-side content layouts |
| `{{< video src="..." >}}` | Responsive HTML5 video player with Video.js v10 |
| `{{< img src="..." >}}` | Styled static image container |
| `{{< rimg src="..." >}}` | Responsive auto-resizing image using Hugo image processing |
| `{{< note >}}` | Callout note blocks for articles |
| `{{< vs size="2" >}}` | Vertical spacing between blocks |
| `{{< gist ... >}}` | Embed GitHub Gists |

---

## Local Development & Contributing

We use [Mise](https://mise.jdx.dev) (`mise.toml`) for deterministic tooling and task execution.

### Tooling Tasks (`mise`)

| Task | Command | Description |
| :--- | :--- | :--- |
| **Install Root Dependencies** | `mise run install` | Sets up theme root tools and installs npm dependencies. |
| **Install Example Site Deps** | `mise run install-example-deps` | Runs `hugo mod tidy`, `hugo mod npm pack`, and `npm install` in `website2`. |
| **Development Server** | `mise run example-site` | Launches Hugo dev server against `website2` (`http://localhost:1313`) with live reload. |
| **Linting** | `mise run lint` | Runs ESLint (`npm run lint`) and Prettier SCSS check (`npm run lint:scss`). |
| **Format SCSS** | `npm run format:scss` | Auto-formats modular stylesheets via Prettier. |
| **Production Build** | `mise run build` | Builds `website2` for production (`hugo --gc --minify --cleanDestinationDir`). |
| **Verification (Single Truth)** | `mise run check` | Executes full lint checks followed by the production build against `website2`. |
| **Update Dependencies** | `mise run update` | Updates npm dependencies and rebuilds `package.hugo.json`. |
| **Fix Security Issues** | `mise run fix-security` | Runs `npm audit fix --force`. |

### Design & Upstreaming Principles

- **Configuration over Code:** New visual features must be configurable via `hugo.yaml` or `data/` and **disabled by default**.
- **Professional-First Networking:** Never reintroduce consumer social media widgets or tracking scripts. Preserve strict focus on LinkedIn, GitHub, ORCID, Google Scholar, and ResearchGate.
- **Modern Sass:** Use Dart Sass `@use` and `@forward` syntax. `@import` is deprecated and forbidden.
- **Accessibility:** Ensure all color combinations pass WCAG 2.1 AA. Contextual links must feature visible underlines (`text-underline-offset: 2px`).
- **Primary Theme Authority:** Layout partials (`layouts/partials/...`) and styles (`assets/styles/...`) belong upstream in `toha`. The integration site (`website2`) maintains a minimal `override.scss` reserved for site-specific adjustments.
- **Internationalization:** Never hardcode English strings in templates; use `{{ i18n "string_id" }}`.
- **AI Agent Context:** See [`AGENTS.md`](AGENTS.md) for full architecture specifications, token conventions (`text-over-accent-color` vs `hero-text-color`), academic reference personas, and contributing workflows.

---

## Attribution & Thanks

- Original theme created by [Emruz Hossain](https://github.com/hossainemruz) and the [Toha Community](https://github.com/hugo-themes/toha).
- Maintained, modernized, and professionalized by [Nick Meyer](https://github.com/nick5435).
- Design guidance inspired by [Anup Deb](https://dribbble.com/anupdeb).
- Illustrations courtesy of [IconScout](https://iconscout.com/).
