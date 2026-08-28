# Lab News — Design

Date: 2026-08-28
Status: Approved (design), pending implementation

## Problem

The site has two content streams and neither fits lab activity:

- `_data/web/news.yml` — one-line personal news, rendered as a text timeline on the
  homepage sidebar and `/allnews.html`. No images, no detail view.
- `_posts` — long-form blog articles at `/blogs/:title/`, with a TOC sidebar, category
  filter, and an RSS feed.

Lab happenings (visiting speakers, seminars, demos, conference trips, new equipment)
need a third form: image-first, short body, its own page. They must not leak into the
blog list or the RSS feed, and they must stay distinct from the personal news line.

## Solution overview

A new Jekyll collection `lab_news`, surfaced in three places:

1. A carousel section on `/lab/`, below the "About XRAI Lab" card.
2. An archive grid at `/lab/news/`.
3. A detail page per item at `/lab/news/<name>/`.

## 1. Content model

`_config.yml`:

```yaml
collections:
  lab_news:
    output: true
    permalink: /lab/news/:name/
```

The site-wide `permalink: /blogs/:title/` applies only to `_posts`; a collection needs
its own. `:name` is the filename with the date prefix stripped.

Also add a `lab_news` default so items need not repeat `layout:`:

```yaml
defaults:
  - scope: {path: "", type: "lab_news"}
    values: {layout: "lab_news"}
```

One file per item in `_lab_news/`, named `YYYY-MM-DD-<slug>.md`:

```yaml
---
title: "Human–Machine Symbiosis: Seminar with Simon Saurbier (KIT)"
date: 2026-08-28
summary: "One-line teaser, shown on the carousel slide and the archive card."
cover: lab/news/2026-08-28-saurbier/IMG_3422.jpeg
gallery:
  - src: lab/news/2026-08-28-saurbier/IMG_3417.jpeg
    caption: "Wide view of the room during the talk."
  - src: lab/news/2026-08-28-saurbier/IMG_3421.jpeg
    caption: "Simon Saurbier presenting the IPEK research focus."
tags: [seminar, visitor, human-machine-systems]
---

Body in Markdown.
```

Field rules:

- `title`, `date`, `summary`, `cover` are required. A missing `cover` means the item is
  skipped by the carousel (which is image-driven) but still appears in the archive with
  a placeholder tile and still has a detail page.
- `gallery` is optional. Paths in `cover` and `gallery[].src` are relative to `images/`,
  matching the convention already used by `research.yml`, `equipment.yml`, and
  `research_areas.yml`.
- `tags` is optional, stored but not rendered as a filter UI.

`feed.xml` iterates `site.posts` only, and `/blogs/` iterates `site.posts` only, so no
extra filtering is needed to keep lab news out of either.

## 2. Carousel on the lab page

New include `_includes/lab_news_carousel.html`, inserted in `_pages/lab.md` between the
"About XRAI Lab" `section-card` and the `## Research Focus` heading. The lab page front
matter keeps `hero_image: images/lab/xrai_lab_wide.png` unchanged.

Data: `site.lab_news | sort: "date" | reverse`, limited to 5, skipping items with no
`cover`.

Slide markup: a 16:9 image with a bottom gradient scrim carrying the date and title; the
whole slide is a single `<a>` to the item URL. A header row above the track holds the
`Lab News` heading on the left and an `All lab news` link to `/lab/news/` on the right.

Mechanism: native CSS `scroll-snap-type: x mandatory` on the track with
`scroll-snap-align: center` on slides, driven by about 40 lines added to
`assets/js/site.js`. Bootstrap's carousel SCSS is vendored but the site loads no
Bootstrap JS bundle, so pulling one in for a single component is not worth it.

Behavior:

- Auto-advance every 6s, wrapping at the end.
- Pause on hover, on focus within, and when the tab is hidden
  (`document.visibilitychange`).
- Dot indicators below the track; clicking a dot scrolls to that slide.
- With `prefers-reduced-motion: reduce`, no auto-advance and no smooth scroll; dots and
  swipe still work.
- With exactly one item, render the slide but no dots and no auto-advance.
- With zero items, the include outputs nothing — the whole section is wrapped in a Liquid
  guard so the lab page renders exactly as it does today.

Accessibility: the track gets `aria-roledescription="carousel"`; dots are real
`<button>` elements with `aria-label="Go to slide N"`; the active dot carries
`aria-current="true"`.

## 3. Archive page

`_pages/lab_news.md`, `permalink: /lab/news/`, `layout: gridlay`, `title: "Lab News"`.

A cover-image card grid, all items, newest first. Each card: cover image, date, title,
`summary`. New class `.labnews-grid`, visually consistent with the existing
`.home-projects-grid`.

Jekyll writes the archive to `/lab/news/index.html` and each item to
`/lab/news/<name>/index.html`, so the archive URL and the item URLs do not collide.

## 4. Detail page layout

New `_layouts/lab_news.html`. Not a reuse of `post.html`, which hardcodes a breadcrumb to
`/blogs/`, a TOC sidebar, and `schema.org/BlogPosting`.

Structure, top to bottom:

- Breadcrumb: Home / Lab / Lab News / title
- `<h1>` title
- Date line
- Cover image, full content width
- Rendered body
- Gallery: image grid with captions; each image links to its own full-size file
- Footer link back to the archive

Marked up as `schema.org/NewsArticle`. No TOC — these items are short.

## 5. Images

Stored under `images/lab/news/<YYYY-MM-DD-slug>/`, one directory per item.

Source photos are 4032x3024 to 5712x4284 (roughly 4-6 MB each) and must not be committed
at that size. Each is resized to a 1600px long edge at quality 82 (about 300-500 KB)
before being added. The repo has no image toolchain, so this is a one-off resize step at
authoring time, not a build step.

## 6. Styling

New `_sass/components/_lab-news.scss` holding both the carousel and the archive-grid
styles, imported from `assets/main.scss` alongside the existing component partials. Uses
the existing CSS custom properties (`--space-*`, `--border-color`, accent rungs) so dark
mode works without extra rules.

## 7. First content item

`_lab_news/2026-08-28-hms-seminar-saurbier.md` — the Human–Machine Symbiosis seminar by
Simon Saurbier (Head, Human–Machine Systems Research Group, IPEK, Karlsruhe Institute of
Technology), hosted by the XRAI Lab in Cherry 2629 on Friday, August 28, 2026.

Body covers what the talk was about (effect-equivalent human representation, smart
exoskeletons, human modeling) and what the discussion turned to (validating such a
representation against real users; the future balance between humans and robotics).

Source photos: `IMG_3417.jpeg`, `IMG_3421.jpeg`, `IMG_3422.jpeg` from
`100 - Work/170 - Service/Seminar_Saurbier_20260828/`. `IMG_3422` is the cover.

## 8. Site conventions

`CHANGELOG.md` documents the repo's release process at the top of the file: work on
`dev` appends a technical record to the `## [待发布]` section; `_data/web/whatsnew.yml`,
the version number, the `### [X.Y.Z]` history entry, and the git tag are all written
later, when `dev` is merged into `source`.

This change therefore updates, on `dev`:

- `CHANGELOG.md` — technical detail appended under `## [待发布]`, in Chinese, matching
  the style of the existing entries.
- `_data/web/news.yml` — one short personal-news line about hosting the seminar, linking
  to the lab news item. This deliberately exercises the split between the two streams.

No version is bumped and `whatsnew.yml` is not touched. When this work is released it
will be a minor bump (2.3.1 to 2.4.0), since it adds a module without changing site
structure — but that number is written at merge time, not now.

## Out of scope

- No new top-level nav item; `/lab/news/` is reached from the lab page.
- No pagination on the archive — revisit past roughly 20 items.
- No tag filter UI; `tags` is stored only.
- No lightbox; gallery images link to the full-size file.
- No RSS feed for lab news.
