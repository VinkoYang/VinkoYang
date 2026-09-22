# Research Project Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every research project an optional long-form writeup page, reachable by clicking its title on `/research/`, with metadata and videos pulled from existing data rather than retyped.

**Architecture:** One ordinary Jekyll post per project under `_posts/`, rendered by a new `research_post` layout. The post carries a `project_id` (the slugified research.yml title); the layout reverse-looks-up `_data/web/research.yml` for authors, dates, keywords and link buttons, and `site.data.videos` for embeds. Posts stay `published: false` until their writeup is reviewed, which makes an unfinished set invisible on the live site.

**Tech Stack:** Jekyll 4 + Liquid, kramdown, SCSS (`assets/main.scss` manifest), Ruby plugins in `_plugins/`, esbuild for `assets/js/site.min.js`.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-09-17-research-project-pages-design.md`. Read it before starting.
- Every commit on `dev` MUST append a technical entry to the `## [待发布]` section of `CHANGELOG.md`. This is a repo rule, not optional. Each task below gives the exact line.
- Do NOT merge to `source` or tag. This work ships in a later release.
- Do NOT edit `_data/web/research.yml`. The link between a post and its project lives in the post's front matter only.
- Slugs are always `Jekyll::Utils.slugify` (Ruby) or the `slugify` filter (Liquid). Never hand-roll a slug.
- `bundle exec jekyll build` must finish with no error after every task.
- Verification diffs must strip cache-busting query strings first: asset URLs carry `?v=<build timestamp>`, which changes on every build. Always pipe through `sed -E 's/\?v=[0-9]+//g'` before diffing.
- Baseline files go in `/tmp/rpp/`. Create it with `mkdir -p /tmp/rpp` in the step that needs it; shell state does not persist between commands.
- This is a static site with no unit-test framework. "Test" here means: build the site, then assert on the generated HTML in `_site/`. That is the real contract — what a visitor receives.

## File Structure

| File | Responsibility |
|---|---|
| `_includes/research_people.html` (create) | Render one list of people (authors or mentors) as linked names, resolving each name against people.yml. Used by the research cards and the new layout. |
| `_includes/research_links.html` (create) | Render the paper/webpage/arXiv/poster/slide/supplementary/BibTeX/GitHub/video button row for a project. Same two consumers. |
| `_sass/components/_embed.scss` (create) | `.embed-16x9` — the responsive 16:9 iframe wrapper, currently locked inside `.video-card-v`. |
| `_layouts/research_post.html` (create) | The project writeup page: breadcrumb, title, metadata from research.yml, videos from `site.data.videos`, post body. |
| `_plugins/videos.rb` (modify) | Tag each research video entry with `project_id` so the layout can filter without re-parsing URLs. |
| `_pages/research.md` (modify) | Use the two new includes; link a card title when a published post exists for it. |
| `_pages/videos.md` (modify) | Use the shared `.embed-16x9` class. |
| `_pages/blogs.md` (modify) | One more category filter chip. |
| `_sass/layouts/_videos.scss` (modify) | Drop the ratio rules that moved to `.embed-16x9`. |
| `_posts/*.md` (create, 18) | The writeup stubs, all `published: false`. |

**Deviation from the spec, deliberate:** the spec names `research_people.html` as the one piece of existing markup to extract. `research_links.html` and `.embed-16x9` are extracted on the same rationale — the layout needs both, and the alternative is a second copy of markup that must stay in step with the cards. Nothing else is refactored.

---

### Task 1: Extract the people and links markup into includes

**Files:**
- Create: `_includes/research_people.html`
- Create: `_includes/research_links.html`
- Modify: `_pages/research.md:86-112`
- Modify: `CHANGELOG.md`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces:
  - `{% include research_people.html people=<list> icon="<fa class>" %}` — renders `<span><i class="…"></i> Name, Name</span>`, or nothing when the list is empty.
  - `{% include research_links.html links=<project.links> %}` — renders the `<a class="research-link">` buttons, or nothing when every field is blank.

- [ ] **Step 1: Capture the baseline output**

The research page must render identically after this refactor — this is a pure extraction.

```bash
mkdir -p /tmp/rpp
bundle exec jekyll build
sed -E 's/\?v=[0-9]+//g' _site/research/index.html > /tmp/rpp/research-before.html
wc -l /tmp/rpp/research-before.html
```

Expected: a line count around 400-600, no build error.

- [ ] **Step 2: Create the people include**

Create `_includes/research_people.html`. Keep it on ONE line after the comment: kramdown decides whether a block is raw HTML by looking at line structure, and stray newlines inside the card markup have broken this site's HTML blocks before.

```liquid
{%- comment -%}
Renders a list of people as comma-separated linked names.
Params:
  include.people — list of {name, url} from research.yml
  include.icon   — Font Awesome classes for the leading icon
A name is linked to, in order: the PI website if it is the site owner, that
person's website from people.yml (students, then collaborators, then alumni),
then the url given on the entry itself. Unmatched names render as plain text.
{%- endcomment -%}
{% if include.people and include.people.size > 0 %}<span><i class="{{ include.icon }}"></i> {% for p in include.people %}{% if p.name and p.name != "" %}{% assign _ps = site.data.web.people.students | where: "name", p.name | first %}{% unless _ps %}{% assign _ps = site.data.web.people.collaborators | where: "name", p.name | first %}{% endunless %}{% unless _ps %}{% assign _ps = site.data.web.people.alumni | where: "name", p.name | first %}{% endunless %}{% if p.name == site.name %}{% assign _href = site.data.web.people.pi.website %}{% elsif _ps.website and _ps.website != "" %}{% assign _href = _ps.website %}{% elsif p.url and p.url != "" %}{% assign _href = p.url %}{% else %}{% assign _href = "" %}{% endif %}{% if _href != "" %}<a href="{{ _href }}" target="_blank">{{ p.name }}</a>{% else %}{{ p.name }}{% endif %}{% unless forloop.last %}, {% endunless %}{% endif %}{% endfor %}</span>{% endif %}
```

- [ ] **Step 3: Create the links include**

Create `_includes/research_links.html`, again one line after the comment. `video` is a list of `{url, date}`; a project with several videos gets numbered buttons.

```liquid
{%- comment -%}
Renders the link button row for a project.
Params: include.links — a project's `links` mapping from research.yml.
`paper` is a filename under /papers/ unless it contains "://".
`poster` and `slide` are paths relative to the site root.
`video` is a list of {url, date}; more than one gets numbered labels.
{%- endcomment -%}
{% if include.links.paper and include.links.paper != "" %}{% if include.links.paper contains "://" %}<a href="{{ include.links.paper }}" target="_blank" class="research-link"><i class="fa-regular fa-file-pdf"></i> Paper</a>{% else %}<a href="{{ site.baseurl }}/papers/{{ include.links.paper }}" target="_blank" type="application/pdf" class="research-link"><i class="fa-regular fa-file-pdf"></i> Paper</a>{% endif %}{% endif %}{% if include.links.webpage and include.links.webpage != "" %}<a href="{{ include.links.webpage }}" target="_blank" class="research-link"><i class="fa-solid fa-globe"></i> Webpage</a>{% endif %}{% if include.links.video and include.links.video.size > 0 %}{% for v in include.links.video %}<a href="{{ v.url }}" target="_blank" class="research-link"><i class="fa-brands fa-youtube"></i> {% if include.links.video.size > 1 %}Video {{ forloop.index }}{% else %}Video{% endif %}</a>{% endfor %}{% endif %}{% if include.links.arxiv and include.links.arxiv != "" %}<a href="{{ include.links.arxiv }}" target="_blank" class="research-link"><i class="fa-solid fa-file-lines"></i> arXiv</a>{% endif %}{% if include.links.poster and include.links.poster != "" %}<a href="{{ site.baseurl }}/{{ include.links.poster }}" target="_blank" type="application/pdf" class="research-link"><i class="fa-regular fa-image"></i> Poster</a>{% endif %}{% if include.links.slide and include.links.slide != "" %}<a href="{{ site.baseurl }}/{{ include.links.slide }}" target="_blank" type="application/pdf" class="research-link"><i class="fa-regular fa-file-powerpoint"></i> Slide</a>{% endif %}{% if include.links.supplementary and include.links.supplementary != "" %}<a href="{{ include.links.supplementary }}" target="_blank" class="research-link"><i class="fa-regular fa-file-zipper"></i> Supplementary</a>{% endif %}{% if include.links.bib and include.links.bib != "" %}<a href="{{ include.links.bib }}" class="research-link"><i class="fa-solid fa-quote-right"></i> BibTeX</a>{% endif %}{% if include.links.github and include.links.github != "" %}<a href="{{ include.links.github }}" target="_blank" class="research-link"><i class="fa-brands fa-github"></i> GitHub</a>{% endif %}
```

- [ ] **Step 4: Point research.md at the includes**

In `_pages/research.md`, replace the authors `<span>` (the line starting `{% if item.authors and item.authors.size > 0 %}<span><i class="fa-solid fa-user"></i>`) with:

```liquid
{% include research_people.html people=item.authors icon="fa-solid fa-user" %}
```

Replace the mentors `<span>` (the line starting `{% if item.mentors and item.mentors.size > 0 %}<span><i class="fa-solid fa-graduation-cap"></i>`) with:

```liquid
{% include research_people.html people=item.mentors icon="fa-solid fa-graduation-cap" %}
```

Both original lines are wrapped in `{% if … %}` / `{% endif %}` in research.md — delete those wrappers too, since the include tests the list itself.

Then replace the contents of the `research-card-h-links` div (the single long line inside it) with:

```liquid
<div class="research-card-h-links">{% include research_links.html links=item.links %}
</div>
```

Leave the `has_link` computation above it exactly as it is.

- [ ] **Step 5: Verify the output did not change**

```bash
bundle exec jekyll build
sed -E 's/\?v=[0-9]+//g' _site/research/index.html > /tmp/rpp/research-after.html
diff -B -w /tmp/rpp/research-before.html /tmp/rpp/research-after.html && echo "SAME MARKUP"
```

Expected: `SAME MARKUP`. `-B -w` ignores blank lines and whitespace runs, because moving a line into an include shifts newlines around without changing the markup. Any difference that survives those flags is a real change — investigate rather than accept it.

Then confirm kramdown still treated the card blocks as raw HTML. This is the failure mode that has bitten this site before: a newline in the wrong place makes kramdown escape the markup instead of emitting it.

```bash
grep -c 'class="research-meta"' _site/research/index.html
grep -c 'research-card-h-links' _site/research/index.html
grep -c '&lt;span\|&lt;a href' _site/research/index.html
```

Expected: 18 meta rows, 14 link rows (one per project that has at least one link), and `0` escaped tags. These are the counts the current site produces — they must not move.

- [ ] **Step 6: Commit**

Append to the `## [待发布]` section of `CHANGELOG.md`:

```markdown
- `_includes/research_people.html`、`_includes/research_links.html`：把 research 卡片里那段「作者名 → people.yml 链接」的长表达式和 links 按钮行抽成 include，`_pages/research.md` 改为引用。纯提取，`/research/` 产出逐字节不变；目的是即将新增的项目详情页 layout 能复用同一套逻辑，不留两份要同步的副本。
```

```bash
git add _includes/research_people.html _includes/research_links.html _pages/research.md CHANGELOG.md
git commit -m "refactor: extract research people and link markup into includes"
```

---

### Task 2: Share the 16:9 embed wrapper

**Files:**
- Create: `_sass/components/_embed.scss`
- Modify: `assets/main.scss:43` (component import list)
- Modify: `_sass/layouts/_videos.scss:40-57`
- Modify: `_pages/videos.md`
- Modify: `CHANGELOG.md`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: a `.embed-16x9` class — a `position: relative` box with a 56.25% bottom padding and an absolutely positioned `iframe` filling it. Task 3's layout uses it for project videos.

- [ ] **Step 1: Capture the baseline**

```bash
mkdir -p /tmp/rpp
bundle exec jekyll build
sed -E 's/\?v=[0-9]+//g' _site/videos/index.html > /tmp/rpp/videos-before.html
grep -c 'iframe' /tmp/rpp/videos-before.html
```

Expected: 13 iframes.

- [ ] **Step 2: Create the shared component**

Create `_sass/components/_embed.scss`:

```scss
// =============================================================
// Responsive embeds
//
// .embed-16x9 — a 16:9 box that an iframe fills. Used by the video cards on
// /videos/ and by the project videos on a research writeup page.
// =============================================================

.embed-16x9 {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  border-radius: var(--radius-lg);
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }
}
```

- [ ] **Step 3: Import it**

In `assets/main.scss`, add after the `components/clamp` import:

```scss
@import "components/embed";
```

- [ ] **Step 4: Remove the duplicated rules from the videos layout**

In `_sass/layouts/_videos.scss`, delete the whole `.video-card-v-embed { … }` block (the `position: relative` through the closing brace of its nested `iframe` rule). Nothing replaces it — the class is dropped from the markup in the next step.

- [ ] **Step 5: Swap the class in the markup**

In `_pages/videos.md`, both occurrences of:

```html
<div class="video-card-v-embed">
```

become:

```html
<div class="embed-16x9">
```

- [ ] **Step 6: Verify the rendered page still has its players, sized the same**

```bash
bundle exec jekyll build
grep -c 'embed-16x9' _site/videos/index.html
grep -o '\.embed-16x9{[^}]*}' _site/assets/main.css
grep -c 'video-card-v-embed' _site/videos/index.html _site/assets/main.css
```

Expected: 13 occurrences of `embed-16x9` in the page; the CSS rule prints with `padding-bottom:56.25%`; and `0` for the old class in both files.

- [ ] **Step 7: Commit**

Append to `## [待发布]`:

```markdown
- `_sass/components/_embed.scss`：新增 `.embed-16x9` 通用 16:9 内嵌播放器容器，原来这段比例规则嵌在 `_videos.scss` 的 `.video-card-v` 里没法复用；`_pages/videos.md` 改用新 class。为项目详情页复用同一套播放器样式做准备。
```

```bash
git add _sass/components/_embed.scss _sass/layouts/_videos.scss assets/main.scss _pages/videos.md CHANGELOG.md
git commit -m "refactor: share the 16:9 embed wrapper between video cards and pages"
```

---

### Task 3: The research_post layout

**Files:**
- Modify: `_plugins/videos.rb`
- Create: `_layouts/research_post.html`
- Create: `_posts/2026-04-01-advanced-mixed-reality-training-for-first-responders-in-hurricane-scenarios.md`
- Modify: `CHANGELOG.md`

**Interfaces:**
- Consumes: `research_people.html`, `research_links.html` (Task 1), `.embed-16x9` (Task 2).
- Produces:
  - Every research entry in `site.data.videos` carries `project_id` — the slugified project title.
  - `layout: research_post`, driven by a post's `project_id` front matter field.

- [ ] **Step 1: Tag video entries with their project**

In `_plugins/videos.rb`, inside the research loop, add the field to the pushed hash. The hash currently reads `'section' => 'research', 'title' => project['title'], …`; add after `'title'`:

```ruby
            'project_id' => Jekyll::Utils.slugify(project['title']),
```

Jekyll's own helper is used so this can never drift from Liquid's `slugify` filter.

- [ ] **Step 2: Write the layout**

Create `_layouts/research_post.html`:

```liquid
---
layout: default
---

{%- comment -%}
A long-form writeup for one research project.

The post declares `project_id` (the slugified research.yml title); everything
above the body — authors, mentors, dates, keywords, link buttons, videos — is
read back out of research.yml and site.data.videos, so a writeup never restates
metadata that already has a home. A post whose project_id matches nothing still
renders its title and body.
{%- endcomment -%}

{% assign project = nil %}
{% for _item in site.data.web.research %}{% assign _slug = _item.title | slugify %}{% if _slug == page.project_id %}{% assign project = _item %}{% endif %}{% endfor %}

<div class="post-wrapper labnews-wrapper">

  <nav class="post-breadcrumb" aria-label="breadcrumb">
    <a href="{{ site.url }}{{ site.baseurl }}/">{{ site.name }}</a>
    <span class="bc-sep">&rsaquo;</span>
    <a href="{{ site.url }}{{ site.baseurl }}/research/">Research</a>
    <span class="bc-sep">&rsaquo;</span>
    <span class="bc-current">{{ page.title | truncate: 50 }}</span>
  </nav>

  <article class="research-article" itemscope itemtype="http://schema.org/ScholarlyArticle">

    <h1 itemprop="headline">{{ page.title | escape }}</h1>

    {% if project %}
    <div class="research-meta">{% include research_people.html people=project.authors icon="fa-solid fa-user" %}{% include research_people.html people=project.mentors icon="fa-solid fa-graduation-cap" %}{% if project.start_date %}<span><i class="fa-regular fa-calendar"></i> {{ project.start_date }}{% if project.end_date %} &ndash; {{ project.end_date }}{% else %} &ndash; Present{% endif %}</span>{% endif %}</div>

    {% if project.keywords %}
    <div class="research-card-h-keywords">{% for kw in project.keywords %}<span class="research-kw">{{ kw }}</span>{% endfor %}</div>
    {% endif %}

    <div class="research-card-h-links">{% include research_links.html links=project.links %}
    </div>

    {% assign project_videos = site.data.videos | where: "project_id", page.project_id %}
    {% for v in project_videos %}
    <div class="embed-16x9">
      <iframe src="{{ v.embed_src }}" title="{{ v.title }}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
    {% endfor %}
    {% endif %}

    <div class="post-body" itemprop="articleBody">
      {{ content }}
    </div>

    <p class="research-article-back"><a href="{{ site.url }}{{ site.baseurl }}/research/#{{ page.project_id }}">&laquo; Back to all research</a></p>

  </article>
</div>
```

- [ ] **Step 3: Create the first stub, temporarily published, as the test fixture**

Create `_posts/2026-04-01-advanced-mixed-reality-training-for-first-responders-in-hurricane-scenarios.md`. Note `published: true` for now — Step 5 sets it back.

```markdown
---
layout: research_post
title: "Advanced Mixed Reality Training for First Responders in Hurricane Scenarios"
date: 2026-04-01
categories: ["Research Projects"]
tags: ["mixed-reality", "first-responders", "hurricane-scenarios", "training-simulation"]
project_id: advanced-mixed-reality-training-for-first-responders-in-hurricane-scenarios
published: true
---

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

- [ ] **Step 4: Build and assert the page renders its project's data**

```bash
bundle exec jekyll build
PAGE=_site/blogs/advanced-mixed-reality-training-for-first-responders-in-hurricane-scenarios/index.html
grep -c 'Muhammad Ilyas Mubarik' $PAGE
grep -c 'research-kw' $PAGE
grep -o 'youtube.com/embed/[A-Za-z0-9_-]*' $PAGE
grep -o 'mubarik2026mrtraining.pdf' $PAGE | head -1
grep -o 'Back to all research' $PAGE
```

Expected: the author name appears at least once; 4 keyword chips; exactly `youtube.com/embed/PVQMivtSj3w`; the paper filename present (proving the links include works from the layout); and the back link present.

If the embed line is missing, `project_id` is not reaching `site.data.videos` — check Step 1 rather than hardcoding the URL in the layout.

- [ ] **Step 5: Set the stub back to unpublished and confirm it disappears**

Change `published: true` to `published: false` in the post, then:

```bash
bundle exec jekyll build
ls _site/blogs/ | grep -c hurricane
grep -c 'Research Projects' _site/blogs/index.html
```

Expected: `0` for both. An unfinished writeup must leave no trace in the built site.

- [ ] **Step 6: Commit**

Append to `## [待发布]`:

```markdown
- 新增 `_layouts/research_post.html`：research 项目的长文写作页。文章 front matter 只写 `project_id`（research.yml 标题的 slug），作者 / mentors / 起止时间 / 关键词 / paper·slide·video 按钮全部由 layout 反查 research.yml 渲染，视频取 `site.data.videos`，正文只写内容，元数据不会两边打架。`_plugins/videos.rb` 每条 research 视频补 `project_id`（用 `Jekyll::Utils.slugify`，与 Liquid 的 slugify 同源）。首个占位文章（hurricane MR training）已建，`published: false`。
```

```bash
git add _plugins/videos.rb _layouts/research_post.html _posts/2026-04-01-advanced-mixed-reality-training-for-first-responders-in-hurricane-scenarios.md CHANGELOG.md
git commit -m "feat: add the research_post layout for per-project writeups"
```

---

### Task 4: Link card titles, and file the posts under their own blog category

**Files:**
- Modify: `_pages/research.md:83` (the card title line)
- Modify: `_pages/blogs.md:12-18` (the chip row)
- Modify: `CHANGELOG.md`

**Interfaces:**
- Consumes: the `project_id` convention and the layout from Task 3.
- Produces: a card title that is a link exactly when a published post exists for that project; a `Research Projects` filter chip on `/blogs/`.

- [ ] **Step 1: Make the card title conditional**

In `_pages/research.md`, the card title currently reads:

```liquid
<h3 class="research-card-h-title">{{ item.title }}</h3>
```

`card_id` is already assigned above this line as `item.title | slugify`. Replace with:

```liquid
{% assign project_post = site.posts | where: "project_id", card_id | first %}
<h3 class="research-card-h-title">{% if project_post %}<a href="{{ site.url }}{{ site.baseurl }}{{ project_post.url }}">{{ item.title }}</a>{% else %}{{ item.title }}{% endif %}</h3>
```

`site.posts` holds only published documents, so an unfinished stub cannot produce a link.

- [ ] **Step 2: Add the blog filter chip**

In `_pages/blogs.md`, inside `<div class="chip-container" id="blogFilter" markdown="0">`, add as the first chip after the `All` chip:

```html
  <a href="#" class="chip chip-muted" data-filter="Research Projects">Research Projects</a>
```

The filter script is generic over `data-category`, so no JS change is needed.

- [ ] **Step 3: Verify the unpublished case — the research page must be unchanged**

```bash
mkdir -p /tmp/rpp
bundle exec jekyll build
grep -c 'research-card-h-title"><a' _site/research/index.html
```

Expected: `0` — with every stub unpublished, no card title is a link.

- [ ] **Step 4: Verify the published case**

Temporarily set `published: true` in `_posts/2026-04-01-advanced-mixed-reality-training-for-first-responders-in-hurricane-scenarios.md`, then:

```bash
bundle exec jekyll build
grep -o 'research-card-h-title"><a href="[^"]*"' _site/research/index.html
grep -c 'data-category="Research Projects"' _site/blogs/index.html
grep -o 'data-filter="Research Projects"' _site/blogs/index.html | head -1
```

Expected: exactly one linked title, whose href ends in `/blogs/advanced-mixed-reality-training-for-first-responders-in-hurricane-scenarios/`; `1` post carrying the category; and the chip present.

- [ ] **Step 5: Set it back to unpublished**

Change `published: true` back to `published: false`, then:

```bash
bundle exec jekyll build
grep -c 'research-card-h-title"><a' _site/research/index.html
```

Expected: `0`.

- [ ] **Step 6: Commit**

Append to `## [待发布]`:

```markdown
- `_pages/research.md`：卡片标题在存在对应已发布文章时变成链接（按 `project_id` 反查 `site.posts`，未发布的占位文章不在 `site.posts` 里，所以标题保持纯文本）；`_pages/blogs.md` 新增 "Research Projects" 分类 chip，沿用现成的 `data-category` 筛选逻辑。
```

```bash
git add _pages/research.md _pages/blogs.md CHANGELOG.md
git commit -m "feat: link research cards to their writeups when published"
```

---

### Task 5: Scaffold the remaining 17 stubs

**Files:**
- Create: `_posts/<date>-<slug>.md` × 17
- Modify: `CHANGELOG.md`

**Interfaces:**
- Consumes: the front matter shape established in Task 3.
- Produces: one `published: false` stub per research.yml project, ready to fill in one at a time.

- [ ] **Step 1: Write the generator script**

The stubs are derived from research.yml, so generate them rather than hand-typing 17 files. Create `/tmp/rpp/gen_stubs.rb`:

```ruby
require 'jekyll'
require 'yaml'

research = YAML.load_file('_data/web/research.yml')
skeleton = <<~BODY

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
BODY

research.each do |project|
  title = project['title']
  slug = Jekyll::Utils.slugify(title)

  # research.yml months are not zero-padded ("2026-4"), so normalise before use.
  raw = project['end_date'] || project['start_date']
  year, month = raw.to_s.split('-')
  date = format('%s-%02d-01', year, month.to_i)

  next if Dir.glob("_posts/*-#{slug}.md").any?

  tags = (project['keywords'] || []).map { |k| Jekyll::Utils.slugify(k) }

  front = [
    '---',
    'layout: research_post',
    "title: #{title.inspect}",
    "date: #{date}",
    'categories: ["Research Projects"]',
    "tags: [#{tags.map(&:inspect).join(', ')}]",
    "project_id: #{slug}",
    'published: false',
    '---'
  ].join("\n")

  path = "_posts/#{date}-#{slug}.md"
  File.write(path, front + "\n" + skeleton)
  puts "wrote #{path}"
end
```

The `next if` guard skips the hurricane stub created in Task 3, whatever date it carries.

- [ ] **Step 2: Run it**

```bash
bundle exec ruby /tmp/rpp/gen_stubs.rb
ls _posts/ | wc -l
```

Expected: 17 `wrote …` lines, and 33 files in `_posts/` — 15 existing blog posts, the hurricane stub from Task 3, and 17 new stubs.

- [ ] **Step 3: Spot-check one generated stub**

```bash
cat "$(ls _posts/*seeing-isn-t-believing* )"
```

Expected front matter: `layout: research_post`, `date: 2026-03-01`, `categories: ["Research Projects"]`, tags `["mixed-reality", "head-mounted-displays", "human-computer-interaction", "spatial-perception"]`, `project_id: seeing-isn-t-believing-the-vertical-horizontal-illusion-across-screens-and-xr-headsets`, `published: false`, followed by the five skeleton headings.

If a `project_id` here does not match the `card_id` on the research page, the two slugify calls disagree — stop and fix the plugin/script rather than editing the stub by hand. Check with:

```bash
grep -o 'id="seeing-isn-t-believing[^"]*"' _site/research/index.html
```

- [ ] **Step 4: Verify none of it reaches the built site**

```bash
bundle exec jekyll build
grep -c 'data-category="Research Projects"' _site/blogs/index.html
grep -c 'research-card-h-title"><a' _site/research/index.html
grep -c 'vertical-horizontal-illusion\|hurricane-scenarios' _site/feed.xml _site/assets/search.json
ls _site/blogs/ | wc -l
```

Expected: `0` posts carrying the category (the chip itself is static markup and still appears — that is why the grep tests `data-category`, not the bare phrase), `0` linked card titles, `0` stub slugs in both the feed and the search index, and `17` entries in `_site/blogs/` — the same count as before this task.

- [ ] **Step 5: Commit**

Append to `## [待发布]`:

```markdown
- `_posts/` 新增 17 篇 research 项目写作占位文章（全部 `published: false`），front matter 由 research.yml 生成：标题、日期取项目 `end_date`（无则 `start_date`）、`project_id`、keywords 转成 tags，正文是一份骨架（问题 / 做法 / 结果 / 配图 / 下一步）。占位文章不构建，站上无任何痕迹；逐篇写完并审核后把 `published` 改成 `true`，research 卡片标题即自动变成链接。
```

```bash
git add _posts CHANGELOG.md
git commit -m "content: scaffold research project writeup stubs"
```

---

## Verification checklist

Run after Task 5, before handing back:

- [ ] `bundle exec jekyll build` — clean.
- [ ] `/research/` output, minus `?v=` query strings, is identical to the pre-Task-1 baseline: `diff /tmp/rpp/research-before.html <(sed -E 's/\?v=[0-9]+//g' _site/research/index.html)`.
- [ ] `/videos/` still renders 13 players.
- [ ] No stub appears in `_site/blogs/index.html`, `_site/feed.xml`, or `_site/assets/search.json`.
- [ ] One stub flipped to `published: true` produces: a linked card title, a page with that project's authors, keywords, buttons and videos, and an entry under the Research Projects chip. Flip it back to `false` afterwards.
- [ ] `git log --oneline` shows five commits, each with a matching `CHANGELOG.md` entry under `## [待发布]`.
