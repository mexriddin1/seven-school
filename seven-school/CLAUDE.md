# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing website for **Seven School** — a private school and preschool in Tashkent for children ages 4 through grade 7. After Seven School, students continue at Sodiq School to prepare for top world universities. All content is in Uzbek.

## Architecture

Pure HTML/CSS/JS — no build tools, no bundler, no package manager.

- **Pages**: `index.html`, `about.html`, `natijalar.html`, `mashgulotlar.html`, `blog.html`, `aloqa.html`
- **Styles**: Single `styles.css` with CSS custom properties (`:root` variables)
- **JS**: Single `main.js` — vanilla JS with IntersectionObserver for scroll animations, FAQ accordion, tabs, counter animations, mobile nav, form handling

## Development

Open any HTML file directly in a browser — no server required. For live reload, use any static server:

```
npx serve .
```

## Design Tokens

Defined in `:root` of `styles.css`:
- Colors: `--navy`, `--orange` (#FF8A32), `--gray-light`, `--gray-mid`
- Layout: `--max` (1240px), `--pad-x`, `--section-y`, `--radius`
- Font: Montserrat (Google Fonts, loaded in each HTML `<head>`)

## Conventions

- Each page includes its own `<header>` and `<footer>` markup (no templating system)
- Navigation links must be updated in all 6 HTML files when adding/removing pages
- CSS class `.reveal` triggers scroll-based fade-in animation via `main.js`
- Counter elements use class `.cu` with `data-target` attribute
- Inner pages use `class="header solid"` for a non-transparent header
