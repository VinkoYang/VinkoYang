# Equipment Resources — Design

Date: 2026-09-23
Status: Approved (design), pending implementation

## Problem

`/lab/` renders six equipment cards from `_data/web/equipment.yml`. A card carries a
photo, a category, a name, and a three-to-four-line description — and that is the
end of the road. There is nowhere to put the material a student actually needs
before touching the hardware: the vendor manual, the required e-learning modules,
the camera and safety tutorials, the order those should be worked through.

Today that material lives in the PI's email, re-sent to each new student. It should
live on the site.

### What this is not

The starting request also covered serial numbers, asset tag labels, and
assigned-to-student records. Those are **out of scope and must not enter this
repository.** The site is published from `github.com/VinkoYang/VinkoYang` via GitHub
Pages; any file committed there is publicly readable regardless of whether a page
renders it, whether it sits in `exclude:`, or whether the page is unlisted — and it
stays in git history permanently. Asset inventory stays in the PI's own records,
outside this repo. Only publicly shareable fields are modeled below.

## Solution overview

Two additions, both optional per equipment item, so a half-finished set of writeups
is a normal state rather than a broken page:

1. A `manual` URL in `equipment.yml`, rendered as a pill on the card.
2. A per-equipment blog post carrying an `equipment_id`, which makes the equipment
   name on the card a link to it.

Three states, and the page is correct in all of them:

| Post state | Card name | Card pills |
|---|---|---|
| no post file | plain text | Manual (if set) + tutorial pills (if set) |
| `published: false` | plain text | Manual (if set) + tutorial pills (if set) |
| `published: true` | links to the post | Manual + Training Guide; tutorials live in the post |

`published: false` is Jekyll's own switch — the file is not built at all, so a draft
writeup is invisible everywhere including after a release to `source`. No feature
branch needed.

## 1. Data model

`_data/web/equipment.yml` gains two optional fields per item. Both are shown below
to document their shape; no single item necessarily carries both (UR10e, which gets
a post in §5, needs only `manual`):

```yaml
- name: "Universal Robots UR10e"
  category: "Collaborative Robot"
  image: "lab/equip_ur10e.jpeg"
  description: >
    ...
  manual: "https://www.universal-robots.com/manuals/EN/PDF/SW5_19/user-manual-UR10e-PDF_online/711-039-00_UR10e_User_Manual_en_Global.pdf"
  tutorials:
    - title: "Wrist Camera Advanced Parameters"
      url: "https://elearning.robotiq.com/course/view.php?id=5#section-0"
```

- `manual` — one vendor manual URL. Rendered whether or not a post exists; it is the
  single most-requested link and deserves one-click access from the card.
- `tutorials` — a list of `{title, url}`. **Fallback only:** rendered on the card
  only when the item has no published post. Once a post exists the post owns the
  tutorial list, and the card does not duplicate it.
- Both optional. Omitting them reproduces today's card exactly.

No `post:` / URL field. The post-to-equipment link is resolved by lookup (§2),
matching how `_pages/research.md:83` already ties a research project to its writeup.

## 2. Post-to-equipment binding

A detail post declares which equipment it documents:

```yaml
---
layout: post
title: "Getting Started with the UR10e Cobot"
date: 2026-09-24
categories: ["Teaching & Learning"]
tags: ["equipment", "ur10e", "cobot", "robotics", "tutorial"]
equipment_id: universal-robots-ur10e
---
```

- `equipment_id` — the equipment's `name` run through `slugify`. `_pages/lab.md`
  computes the same value for the card, so the two agree by construction.
- `layout: post` — the ordinary blog layout. No dedicated layout: unlike research
  project posts, an equipment writeup has no metadata worth re-displaying from yml.
- `categories: ["Teaching & Learning"]` — an existing chip on `/blogs/`. A dedicated
  "Lab Equipment" category is deliberately deferred; the filter row in
  `_pages/blogs.md` already carries eight chips, and splitting is worth doing once
  there are four or five equipment posts.

## 3. Card rendering

In `_pages/lab.md`, inside the existing `{% for item in site.data.web.equipment %}`
loop:

```liquid
{% assign equip_id = item.name | slugify %}
{% assign equip_post = site.posts | where: "equipment_id", equip_id | first %}
```

- **Name** — wrapped in `<a href="{{ equip_post.url }}">` when `equip_post` exists,
  plain text otherwise.
- **Links row** — emitted after `equipment-desc` only when there is something to
  show:
  - `manual` set → one pill, `fa-book`, label `Manual`.
  - `equip_post` present → a `fa-book-open-reader` pill labeled `Training Guide`
    pointing at the post, so the card has a visible entry point and not only a
    linked heading.
  - `equip_post` absent **and** `tutorials` non-empty → one pill per tutorial,
    `fa-circle-play`, label = the tutorial `title`.
- **External links** — a URL containing `://` gets `target="_blank" rel="noopener"`;
  site-relative URLs do not.

## 4. Styling

`_sass/layouts/_lab.scss`, a new `.equipment-links` rule inside `.equipment-card`,
placed after `.equipment-desc`:

- `display: flex; flex-wrap: wrap; gap: var(--space-2); margin-top: auto;` — the
  `margin-top: auto` pins the row to the card bottom so rows align across cards of
  unequal description length (the card is already `flex-direction: column` with
  `.equipment-body { flex: 1 }`).
- Pills reuse existing tokens: `--bg-secondary` background, `--radius-full`,
  `0.78rem`, `--text-secondary` text, border `--border-color`; on hover, border and
  text go to `--accent`.
- `.equipment-name a` — inherits color, no underline, `--accent` on hover.

No new SCSS partial, no new design tokens.

## 5. First post: UR10e

`_posts/2026-09-24-ur10e-onboarding-path.md`, following the shape of
`_posts/2026-09-17-unity-xr-learning-path.md`: a short framing intro, then one
section per step, each with a resource table (`Resource | What it is | Why bother`)
and a paragraph on why that step sits where it does. A curated path, not a link dump.

Four steps, from the PI's onboarding email:

1. **Universal Robots basics (required first).** UR e-Series e-Learning. Free
   account registration required. Covers hardware, PolyScope, basic programming,
   safety. Note in the post: students who need the physical robot for practice while
   working through this should ask the PI for access.
2. **UR10e user manual (reference, can run in parallel).** Focus on operation,
   safety, and I/O sections.
3. **Camera and vision.** Robotiq Wrist Camera advanced-parameters course plus the
   Wrist Camera instruction manual — setup, parameters, basic vision concepts.
4. **LiDAR and human–robot collaboration.** The UR marketplace LiDAR safety
   solution, plus a LiDAR/HRC research paper (Sensors 23(9):4305) as the research
   framing.

Source URLs are listed in §7.

## 6. Scope

Files touched:

| File | Change |
|---|---|
| `_data/web/equipment.yml` | add `manual` to the UR10e entry |
| `_pages/lab.md` | post lookup, linked name, links row |
| `_sass/layouts/_lab.scss` | `.equipment-links` + `.equipment-name a` rules |
| `_posts/2026-09-24-ur10e-onboarding-path.md` | new |
| `CHANGELOG.md` | one entry under 待发布 |

No navigation change, no new page, no new data file, no change to `_config.yml`.
The other five equipment items are untouched and keep rendering as they do today;
they gain `manual` and post coverage later, one at a time.

## 7. UR10e source URLs

- e-Series e-Learning — https://academy.universal-robots.com/free-e-learning/e-series-e-learning/
- UR10e User Manual (PDF) — https://www.universal-robots.com/manuals/EN/PDF/SW5_19/user-manual-UR10e-PDF_online/711-039-00_UR10e_User_Manual_en_Global.pdf
- Robotiq Wrist Camera advanced parameters course — https://elearning.robotiq.com/course/view.php?id=5#section-0
- Robotiq Wrist Camera instruction manual (PDF) — https://assets.robotiq.com/website-assets/support_documents/document/Wrist_20Camera_Instruction_20Manual_PDF_20210406.pdf
- UR Marketplace LiDAR safety solution — https://www.universal-robots.com/marketplace/products/01tP40000071NhmIAE/
- LiDAR + HRC paper — https://www.mdpi.com/1424-8220/23/9/4305
