# Research Project Pages — Design

Date: 2026-09-17
Status: Approved (design), pending implementation

## Problem

`/research/` shows 18 project cards. Each card carries a title, an image, a
three-line abstract, keyword chips, and link buttons — and that is the end of the
road. There is nowhere to tell the story of a project: why it was started, how the
system works, what the results were, what the figures show. Anything longer than the
abstract has no home.

The projects also vary enormously in how much there is to say, and the writeups will
be produced one at a time over weeks, each reviewed before it goes live. The design
has to make a half-finished set of writeups a normal state rather than a problem.

## Solution overview

Each project gets an ordinary blog post under `_posts/`, rendered by a dedicated
layout that pulls the project's metadata from `_data/web/research.yml` rather than
repeating it. A post is tied to its project by a `project_id` field holding the
slugified project title.

Three states, and the site is correct in all of them:

| Post state | `/research/` card title | `/blogs/`, RSS, search |
|---|---|---|
| no post file | plain text (today's behavior) | absent |
| `published: false` | plain text | absent |
| `published: true` | links to the post | listed under "Research Projects" |

`published: false` is Jekyll's own switch: the file is not built at all. An
unfinished stub is therefore invisible everywhere, including after a release to
`source` — which is why this work needs no feature branch of its own.

## 1. Content model

One post per project, in `_posts/`, named by the usual `YYYY-MM-DD-<slug>.md`
convention:

```yaml
---
layout: research_post
title: "Advanced Mixed Reality Training for First Responders in Hurricane Scenarios"
date: 2026-04-20
categories: ["Research Projects"]
tags: ["mixed-reality", "training", "unity"]
project_id: advanced-mixed-reality-training-for-first-responders-in-hurricane-scenarios
published: false
---
```

- `project_id` — the research.yml title run through `slugify`. This is the same value
  `_pages/research.md` already computes as `card_id` for the card anchor, so the two
  pages agree by construction.
- `date` — when the work concluded (or a sensible date for ongoing work); it sets the
  post's position in the blog list and its URL is unaffected (`permalink: /blogs/:title/`).
- `categories` — always `["Research Projects"]`, which drives the blog filter chip.
- `tags` — seeded from the project's research.yml keywords, lowercased and hyphenated.
- `published` — `false` until the writeup has been reviewed.

The body is free markdown: the story, figures, extra videos. Nothing in the body
repeats metadata that research.yml already holds.

## 2. Layout: `_layouts/research_post.html`

Wraps `layout: default`, like `_layouts/lab_news.html` does. It resolves its project
once:

```liquid
{% assign project = nil %}
{% for item in site.data.web.research %}
  {% assign slug = item.title | slugify %}
  {% if slug == page.project_id %}{% assign project = item %}{% endif %}
{% endfor %}
```

A loop rather than `where:` because Liquid cannot slugify inside a filter argument.
18 items, once per page — the cost is irrelevant.

The page renders, in order:

1. Breadcrumb: Home › Research › *title*.
2. `<h1>` from `page.title`.
3. Meta row from the project: authors and mentors (with the same people.yml link
   resolution `_pages/research.md` uses), start–end dates. Reuses `.research-meta`.
4. Keyword chips from `project.keywords`, reusing `.research-kw`.
5. Link buttons from `project.links` — paper, webpage, arXiv, poster, slide,
   supplementary, BibTeX, GitHub — reusing `.research-link`.
6. Every video for the project, embedded. These come from `site.data.videos`
   filtered by `project_id`, so the YouTube id parsing stays in
   `_plugins/videos.rb` and is not repeated in Liquid.
7. The post body.
8. A "Back to all research" link.

If no project matches `project_id`, the layout renders the body with the title and
skips the metadata blocks rather than failing the build. A mismatch is a content
error, not a crash.

**Author link resolution.** `_pages/research.md` currently inlines a long Liquid
expression to turn an author name into a link via people.yml. The layout needs the
identical logic, so it moves to `_includes/research_people.html`, taking a list and
an icon, and both `research.md` and `research_post.html` include it. This is the one
piece of existing markup this work refactors; it is not optional, because the
alternative is a second copy of a fiddly expression that must stay in step.

## 3. Wiring

**`_plugins/videos.rb`** — each research entry it emits gains
`'project_id' => Jekyll::Utils.slugify(project['title'])`. Calling Jekyll's own
helper, rather than reimplementing it, guarantees the Ruby side and Liquid's
`slugify` filter can never drift apart. The Videos page ignores the new field; the
layout filters on it.

**`_pages/research.md`** — before rendering a card title, look for a published post
for that card:

```liquid
{% assign project_post = site.posts | where: "project_id", card_id | first %}
```

`site.posts` contains only published documents, so nothing further is needed. If
`project_post` exists, the title renders as a link to it; otherwise it stays plain
text. The card keeps its anchor id either way.

**`_pages/blogs.md`** — one more filter chip, `Research Projects`. The chip list is
hardcoded; the filter itself is generic over `data-category`.

**`_pages/projects.md`** is out of scope. Only research projects get writeups.

## 4. Scaffolding the 18 stubs

Generated from research.yml, one file per project, all `published: false`, with the
front matter above filled in and a body skeleton that names what the writeup needs:

```markdown
## What problem this addresses
<!-- Why the project exists. What was broken, missing, or unmeasured. -->

## Approach
<!-- The system: hardware, software, what was actually built. -->

## Results
<!-- What came out of it: findings, numbers, a demo, a deployment, a paper. -->

## Figures
<!-- ![Caption](/images/research/<file>) — send the image files and captions. -->

## What's next
<!-- Optional. Where this is heading, or what it fed into. -->
```

Filling one is then: paste material, write the prose, flip `published: true`,
review, commit. The dates in the stub filenames come from each project's `end_date`
(or `start_date` for ongoing work) and can be changed freely while unpublished.

## 5. Styling

No new stylesheet. The layout reuses `.post-wrapper`, `.post-breadcrumb`,
`.post-body`, `.research-meta`, `.research-kw`, `.research-link`, and the video embed
wrapper from `_sass/layouts/_videos.scss`. If the video embed styles turn out to be
too entangled with `.video-card-v` to reuse, they move to a shared class in the same
pass rather than being duplicated.

## 6. Verification

- `bundle exec jekyll build` is clean.
- With every stub `published: false`: `/research/` is byte-identical to before, and
  no stub appears in `/blogs/`, `feed.xml`, or `assets/search.json`.
- Flipping one stub to `published: true`: its card title becomes a link, the page
  renders the project's metadata, keywords, buttons, and videos, and the post appears
  under the Research Projects chip on `/blogs/`.
- A post whose `project_id` matches nothing still builds, showing title and body.

## Out of scope

- Migrating research.yml into a collection. The card metadata stays where it is.
- Writeups for `/projects/` entries.
- Any change to how videos are ordered or rendered on `/videos/`.
