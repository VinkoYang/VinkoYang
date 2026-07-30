# CV pipeline

`files/cv.pdf` is generated on every deploy — never uploaded by hand, never edited directly.

```
_data/profile/*.yml   ┐
_data/web/people.yml  ├─> cv/build-cv.js ─> cv.generated.html ─(headless Chrome)─> files/cv.pdf
assets/ref.bib        │        + cv/style.css
_config.yml           ┘
```

There is no Markdown step: `build-cv.js` reads the YAML and emits HTML directly, so layout is
controlled with ordinary CSS (`cv/style.css`) instead of Markdown conventions.

## Files

| File | Role |
|---|---|
| `build-cv.js` | Reads the data, builds the HTML, prints the PDF via puppeteer |
| `style.css` | All styling: fonts, colors, icons, spacing, page rules |
| `cv.generated.html` | Build artifact — open it in a browser to debug layout (git-ignored) |

## To update the CV content

Edit the data, not the PDF:

| Section | Source |
|---|---|
| Name, title, department, phone, office, email, links | `_config.yml` |
| Professional summary | `_data/profile/summary.yml` |
| Professional & teaching experience | `_data/profile/experience.yml` |
| Education | `_data/profile/education.yml` |
| Publications | `assets/ref.bib` — `@article` / `@inproceedings` |
| Talks | `assets/ref.bib` — `@incollection` with `keywords={invited}` or `{talk}` |
| Grants | `_data/profile/grants.yml` |
| Editorial & review service | `_data/profile/services.yml` |
| Committee memberships | `_data/profile/committee_memberships.yml` |
| Conference leadership & service | `_data/profile/conference_service.yml` |
| Doctoral / Master advisees | `_data/web/people.yml` — entries with `mentoring_role:` |
| Dissertation committees | `_data/profile/student_guidance.yml` |
| Honors & awards | `_data/profile/awards.yml` |
| Certifications | `_data/profile/certifications.yml` |
| Professional memberships | `_data/profile/memberships.yml` |

Everything under `_data/profile/` also drives the **About** page, so one edit updates the site and
the CV together. Fields may contain inline HTML (`<a href="…">`, `<sup>`) — relative links such as
`/teaching/#inen-5358` are rewritten to absolute URLs in the PDF automatically.

## To change the layout

Everything visual lives in `style.css`:

| Want to change | Where |
|---|---|
| Font family / base size | `:root` → `--font-body`, `--font-head`, `--size-body` |
| Accent color (headings, bullets, links) | `:root` → `--accent` |
| Section heading style | `.cv-section h2` |
| Job/degree entry rows (title left, dates right) | `.cv-entry-head`, `.cv-role`, `.cv-dates` |
| Bullet lists | `.cv-bullets` |
| Service rows with right-aligned years | `.cv-service` |
| Student guidance rows | `.cv-people` |
| Contact icons in the header | `.cv-contact-link[data-icon='…']` (inline SVG masks) |
| Page size, margins, footer | `pdf()` options at the bottom of `build-cv.js` |

To add a contact icon, add the link in `build-cv.js` (`contacts.push([...])`) and a matching
`[data-icon='…']::before` rule with an SVG mask in `style.css`.

The footer ("Last updated <date>" + "Page N of M") is generated at build time — the date is the
build date, so it is always current without anyone maintaining it.

## To preview locally

```bash
npm install     # first time only
npm run cv      # writes files/cv.pdf
```

`cv.generated.html` and `files/cv.pdf` are git-ignored; CI regenerates both on every push.
