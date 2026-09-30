# COCOON 2027 Website

Website of the 33rd International Computing and Combinatorics Conference (COCOON 2027),
18–21 July 2027, Melbourne, Australia.

A plain static site (HTML + CSS + one small JavaScript file), hosted on GitHub Pages.
No build step: open `index.html` in a browser to preview.

## Structure

| File / folder | Purpose |
|---|---|
| `index.html`, `*.html` | One file per page |
| `menu.js` | Menu, footer, contact e-mail and countdown, shared by all pages |
| `style.css` | Shared styles (colours at the top) |
| `_template.html` | Starting point for a new page (not published) |
| `images/`, `download/`, `fonts/` | Images, downloadable files, Lato font (SIL OFL) |

## Common updates

- **Show or hide a page in the menu:** set `show: true` / `false` in `menu.js`.
- **Publish a prepared page:** delete its "Coming soon" block and remove `hidden` from `<div class="page-body hidden">`.
- **Show or hide any block:** add or remove the class `hidden`.
- **News:** add a new `<li>` at the top of the News list in `index.html`.
- **Important dates:** update both `index.html` (sidebar) and `call-for-papers.html`.
- **Add a page:** copy `_template.html`, then add it to `menu.js`.

## Publishing

Push to the `main` branch. GitHub Pages (Settings → Pages → Deploy from a branch → `main` / root)
updates the site within a few minutes.

Contact: cocoon2027.melbourne@gmail.com
