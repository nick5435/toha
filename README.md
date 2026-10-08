# Toha

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fhugo-themes%2Ftoha%2Fbadge%3Fref%3Dmain&style=flat)](https://github.com/nick5435/toha)
![Repository Size](https://img.shields.io/github/repo-size/nick5435/toha)
![Contributor](https://img.shields.io/github/contributors/nick5435/toha)
![License](https://img.shields.io/github/license/nick5435/toha)

A personal portfolio and academic theme for [Hugo](https://gohugo.io/) featuring minimalist elegance, high accessibility (WCAG 2.1 AA), rich data-driven sections, and high performance.

![Thumbnail](https://raw.githubusercontent.com/hugo-themes/toha/main/images/screenshot.png)

- **Example Site:** [toha-example-site](https://toha-example-site.netlify.app)
- **Documentation:** [toha-docs.netlify.app](https://toha-docs.netlify.app/posts)

---

## Key Highlights

- **Configuration over Code:** Structure your portfolio entirely via `hugo.yaml` and YAML/JSON data files in `data/` without writing custom HTML or CSS.
- **Academic & Professional Sections:** Complete support for Academic Publications, Invited Talks & Presentations, Academic Service, Student Mentorship & Advising, Calendar events, Experience timelines, Projects, Skills, and Achievements.
- **Accessibility by Design (WCAG 2.1 AA):** Built-in semantic HTML5 landmarks (`<main id="main-content">`), accessible keyboard skip-to-content links, contextual link underlines, high-contrast dark/light color tokens, and accessible image attributes.
- **Modern Asset Pipeline:** Dart Sass module architecture, ESBuild bundling, automated minification, and cache-busting fingerprints via Hugo Pipes.
- **Typography & Math:** Self-hosted Poppins font (`@fontsource/poppins`), MathJax v3 formula rendering (`mathjax@^3.2.2`), Font Awesome Pro Kit icons (`@awesome.me/kit-f6f8bfcfbd`), Feather icons, and Flag icons.
- **Dynamic Themes:** Dark mode, light mode, and automatic system detection (`prefers-color-scheme`) with WCAG-compliant contrast tokens.
- **Rich Diagrams & Media:** Native Mermaid diagram shortcodes, responsive Plyr media player, and TypeIt hero animations.

---

## Features

### Comprehensive Homepage Sections

Toha supports modular, data-driven homepage sections that can be individually enabled, ordered, and customized:

- **About:** Personal bio, avatar portrait, and contact details.
- **Skills:** Categorized skills with percentage bars or competency indicators.
- **Experiences:** Interactive chronological career and education timeline.
- **Education:** Degrees, thesis titles, and honors (with optional alternate layout).
- **Projects:** Filterable showcase with tags, GitHub links, and demo URLs.
- **Publications:** Academic papers, peer-reviewed articles, citations, DOI links, and BibTeX modals.
- **Talks:** Invited talks, conference presentations, slides, abstracts, and video recordings.
- **Academic Service:** Peer review, conference organization, committee roles, and journal editorial duties.
- **Student Mentorship:** Supervised PhD, Master's, and undergraduate students with research topics and current positions.
- **Calendar:** Upcoming talks, seminars, workshops, and schedule availability.
- **Achievements & Accomplishments:** Awards, honors, certificates, and recognitions.
- **Recent & Featured Posts:** Blog post previews right on the landing page.

### Blog & Notes

- Categorized posts with tags and hierarchical table of contents.
- Reading time estimate and word count.
- Math formula rendering with MathJax v3.
- Code syntax highlighting with Highlight.js.
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
- **Dart Sass:** Recommended for Sass compilation (`brew install dart-sass`).
- **Mise (Optional but Recommended):** For deterministic tool versions (`brew install mise`).

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
| `{{< mermaid >}}` | Render diagrams, flowcharts, and sequence charts |
| `{{< split >}}` | Multi-column side-by-side content layouts |
| `{{< video src="..." >}}` | Responsive HTML5 video player with Plyr |
| `{{< img src="..." >}}` | Styled static image container |
| `{{< rimg src="..." >}}` | Responsive auto-resizing image using Hugo image processing |
| `{{< note >}}` | Callout note blocks for articles |
| `{{< vs size="2" >}}` | Vertical spacing between blocks |
| `{{< gist ... >}}` | Embed GitHub Gists |
| `{{< mastodon ... >}}` | Embed federated Mastodon posts |

---

## Local Development & Contributing

We use [mise](https://mise.jdx.dev) for deterministic tooling and task management.

### Development Workflow

1. **Install tools and dependencies:**

   ```bash
   mise run install
   ```

2. **Start the local dev server:**

   ```bash
   mise run example-site
   ```

   Starts the development server with live reload and asset minification at `http://localhost:1313`.

3. **Verify all linters and production build:**

   ```bash
   mise run check
   ```

   Executes ESLint, Prettier SCSS checks, and a full production build (`hugo --gc --minify --cleanDestinationDir`).

### Coding Guidelines

- **Configuration over Code:** New visual features must be configurable via `hugo.yaml` or `data/` and **disabled by default**.
- **Modern Sass:** Use Dart Sass `@use` and `@forward` syntax. `@import` is deprecated and strictly forbidden.
- **Accessibility:** Ensure all color combinations pass WCAG 2.1 AA. Maintain `<main id="main-content">` semantic landmarks and link underline accessibility.
- **Internationalization:** Never hardcode English strings in templates; use `{{ i18n "string_id" }}`.
- **AI Agent Context:** Review [`AGENTS.md`](AGENTS.md) for detailed architecture, token conventions (`text-over-accent-color` vs `hero-text-color`), and coding patterns.

---

## Attribution & Thanks

- Original theme created by [Emruz Hossain](https://github.com/hossainemruz) and the [Toha Community](https://github.com/hugo-themes/toha).
- Design guidance inspired by [Anup Deb](https://dribbble.com/anupdeb).
- Illustrations courtesy of [IconScout](https://iconscout.com/).
