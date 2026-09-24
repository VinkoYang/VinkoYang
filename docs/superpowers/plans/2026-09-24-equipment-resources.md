# Equipment Resources Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give each lab equipment card a manual link and, where a writeup exists, a clickable name leading to a full onboarding post — starting with the UR10e.

**Architecture:** Two optional fields (`manual`, `tutorials`) in `_data/web/equipment.yml`, plus a reverse lookup from `_pages/lab.md` into `site.posts` on an `equipment_id` front-matter key. Same binding pattern `_pages/research.md:83` already uses for research project writeups. A card with no post renders exactly as it does today.

**Tech Stack:** Jekyll 4 + Liquid, kramdown, SCSS (`_sass/layouts/_lab.scss`), Font Awesome 6.5.1.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-09-23-equipment-resources-design.md`. Read it before starting.
- **Serial numbers, asset tag labels, and student assignment records MUST NOT be added to this repository in any form** — not in a data file, not in a post, not in a comment, not behind `published: false`, not in `_config.yml` `exclude:`. The site is published from a GitHub Pages repo where every committed file is publicly readable and permanent. This plan models only publicly shareable fields.
- Every commit on `dev` MUST append a technical entry to the `## [待发布]` section of `CHANGELOG.md`. This is a repo rule, not optional. Each task below gives the exact line.
- Do NOT merge to `source` or tag. This work ships in a later release.
- Work on branch `dev`.
- Slugs are always the Liquid `slugify` filter. Never hand-roll a slug.
- `bundle exec jekyll build` must finish with no error after every task.
- Verification diffs must strip cache-busting query strings first: asset URLs carry `?v=<build timestamp>`, which changes on every build. Always pipe through `sed -E 's/\?v=[0-9]+//g'` before diffing.
- Baseline files go in `/tmp/eqr/`. Create it with `mkdir -p /tmp/eqr` in the step that needs it; shell state does not persist between commands.
- This is a static site with no unit-test framework. "Test" here means: build the site, then assert on the generated HTML in `_site/`. That is the real contract — what a visitor receives.
- Liquid inside `_pages/lab.md` sits in a kramdown document. Keep each generated HTML element's markup on ONE line. kramdown decides whether a block is raw HTML by line structure, and stray newlines inside card markup have broken this site's HTML blocks before.
- Font Awesome is 6.5.1 free (`_includes/head.html:25`). Only `fa-solid` / `fa-regular` / `fa-brands` classes that exist in 6.5.1 free may be used. `fa-book`, `fa-book-open-reader`, and `fa-circle-play` all do.

## File Structure

| File | Responsibility |
|---|---|
| `_data/web/equipment.yml` (modify) | Gains an optional `manual` URL per item. `tutorials` is documented as a fallback field but no item uses it yet. |
| `_pages/lab.md` (modify) | Resolves the post for each equipment item, links the name, renders the links row. |
| `_sass/layouts/_lab.scss` (modify) | `.equipment-links` / `.equipment-link` pill row, and the name-link rule. |
| `_posts/2026-09-24-ur10e-onboarding-path.md` (create) | The UR10e onboarding writeup; carries `equipment_id`. |
| `CHANGELOG.md` (modify) | One `[待发布]` entry per task. |

No navigation change, no new page, no new include, no new data file, no `_config.yml` change.

---

### Task 1: Card links row and linked equipment name

**Files:**
- Modify: `_sass/layouts/_lab.scss:299-305`
- Modify: `_pages/lab.md:76-92`
- Modify: `_data/web/equipment.yml` (UR10e entry)
- Modify: `CHANGELOG.md`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces:
  - `_data/web/equipment.yml` item fields `manual` (string URL, optional) and `tutorials` (list of `{title, url}`, optional).
  - The front-matter key `equipment_id` on a post, matched against `item.name | slugify`. Task 2 relies on this exact key name and on the slug of `"Universal Robots UR10e"` being `universal-robots-ur10e`.
  - CSS classes `.equipment-links` (the row) and `.equipment-link` (one pill).

- [ ] **Step 1: Capture the baseline output**

The five equipment items with no `manual` and no post must render byte-identically after this task.

```bash
mkdir -p /tmp/eqr
cd "/c/Users/wyang2/OneDrive - Lamar University/700 - AI/academic-website"
bundle exec jekyll build
sed -E 's/\?v=[0-9]+//g' _site/lab/index.html > /tmp/eqr/lab-before.html
grep -c 'equipment-card' /tmp/eqr/lab-before.html
```

Expected: build finishes with no error; the grep prints `6`.

- [ ] **Step 2: Confirm the slug the lookup will use**

The whole binding rests on `"Universal Robots UR10e" | slugify` being `universal-robots-ur10e`. Verify rather than assume — Liquid's default slugify mode strips non-alphanumerics and lowercases, and a surprise here would silently produce a card that never links.

```bash
cd "/c/Users/wyang2/OneDrive - Lamar University/700 - AI/academic-website"
bundle exec ruby -e 'require "jekyll"; puts Jekyll::Utils.slugify("Universal Robots UR10e")'
```

Expected: `universal-robots-ur10e`

If it prints anything else, use the printed value as `equipment_id` in Task 2 and note the change in the commit message.

- [ ] **Step 3: Add the pill styles**

In `_sass/layouts/_lab.scss`, inside the `.equipment-card` block, immediately after the `.equipment-desc` rule (which ends at line 304 with `}`) and before the closing `}` of `.equipment-card`, add:

```scss
  .equipment-name a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: var(--accent);
    }
  }

  .equipment-links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-top: auto;
    padding-top: var(--space-4);
  }

  .equipment-link {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.2rem 0.7rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-full);
    background: var(--bg-secondary);
    color: var(--text-secondary);
    font-size: 0.78rem;
    line-height: 1.6;
    text-decoration: none;
    transition: color var(--transition-base), border-color var(--transition-base);

    &:hover {
      color: var(--accent);
      border-color: var(--accent);
      text-decoration: none;
    }

    i {
      font-size: 0.72rem;
    }
  }
```

`margin-top: auto` pushes the row to the bottom of `.equipment-body`, which is already `flex: 1` inside a column-flex card, so the rows line up across cards with descriptions of different lengths.

- [ ] **Step 4: Verify the tokens used above actually exist**

`--radius-full` and `--transition-base` are used here; a typo'd token silently renders as nothing.

```bash
cd "/c/Users/wyang2/OneDrive - Lamar University/700 - AI/academic-website"
grep -n -- '--radius-full\|--transition-base\|--bg-secondary\|--border-color' _sass/base/_variables.scss | head
```

Expected: each of the four appears as a definition (`--name: value;`). If one is missing, substitute the nearest existing token in that family and say so in the commit message.

- [ ] **Step 5: Rewrite the equipment loop in `_pages/lab.md`**

Replace the whole block from `<div class="equipment-grid">` through its closing `</div>` (currently lines 77-92) with:

```liquid
<div class="equipment-grid">
{% for item in site.data.web.equipment %}
{% assign equip_id = item.name | slugify %}
{% assign equip_post = site.posts | where: "equipment_id", equip_id | first %}
<div class="equipment-card">
{% if item.image and item.image != "" %}
<img src="{{ site.url }}{{ site.baseurl }}/images/{{ item.image }}" class="equipment-thumb" alt="{{ item.name }}" loading="lazy">
{% else %}
<div class="equipment-thumb-placeholder"><i class="fa-solid fa-microchip"></i></div>
{% endif %}
<div class="equipment-body">
<p class="equipment-category">{{ item.category }}</p>
<h4 class="equipment-name">{% if equip_post %}<a href="{{ site.url }}{{ site.baseurl }}{{ equip_post.url }}">{{ item.name }}</a>{% else %}{{ item.name }}{% endif %}</h4>
<p class="equipment-desc">{{ item.description }}</p>
{% assign has_manual = false %}{% if item.manual and item.manual != "" %}{% assign has_manual = true %}{% endif %}
{% assign show_tutorials = false %}{% unless equip_post %}{% if item.tutorials and item.tutorials.size > 0 %}{% assign show_tutorials = true %}{% endif %}{% endunless %}
{% if has_manual or equip_post or show_tutorials %}
<div class="equipment-links">{% if has_manual %}<a href="{{ item.manual }}" class="equipment-link"{% if item.manual contains "://" %} target="_blank" rel="noopener"{% endif %}><i class="fa-solid fa-book"></i> Manual</a>{% endif %}{% if equip_post %}<a href="{{ site.url }}{{ site.baseurl }}{{ equip_post.url }}" class="equipment-link"><i class="fa-solid fa-book-open-reader"></i> Training Guide</a>{% endif %}{% if show_tutorials %}{% for t in item.tutorials %}<a href="{{ t.url }}" class="equipment-link"{% if t.url contains "://" %} target="_blank" rel="noopener"{% endif %}><i class="fa-solid fa-circle-play"></i> {{ t.title }}</a>{% endfor %}{% endif %}</div>
{% endif %}
</div>
</div>
{% endfor %}
</div>
```

Three things about this block that are deliberate, not style:

1. `equip_post` is resolved once per item and reused three times. `where` on `site.posts` is not free; do not inline it.
2. The `<div class="equipment-links">` element and everything inside it is on ONE line — see the kramdown constraint above.
3. `tutorials` renders only when there is no post (`{% unless equip_post %}`). A post owns the tutorial list; the card must not duplicate it.

- [ ] **Step 6: Add the UR10e manual URL**

In `_data/web/equipment.yml`, in the `Universal Robots UR10e` entry, after the `description:` block, add:

```yaml
  manual: "https://www.universal-robots.com/manuals/EN/PDF/SW5_19/user-manual-UR10e-PDF_online/711-039-00_UR10e_User_Manual_en_Global.pdf"
```

Indentation is two spaces, matching the sibling keys. Do not add `tutorials` to this item — it gets a post in Task 2, and tutorials would not render.

- [ ] **Step 7: Build and verify the UR10e card gained exactly one pill**

```bash
cd "/c/Users/wyang2/OneDrive - Lamar University/700 - AI/academic-website"
bundle exec jekyll build
sed -E 's/\?v=[0-9]+//g' _site/lab/index.html > /tmp/eqr/lab-after.html
grep -c 'equipment-link"' /tmp/eqr/lab-after.html
grep -c 'equipment-links' /tmp/eqr/lab-after.html
```

Expected: build clean; first grep prints `1` (the single Manual pill), second prints `1` (one links row). There is no post yet, so no Training Guide pill.

- [ ] **Step 8: Verify the other five cards are untouched**

```bash
cd "/c/Users/wyang2/OneDrive - Lamar University/700 - AI/academic-website"
diff /tmp/eqr/lab-before.html /tmp/eqr/lab-after.html
```

Expected: the ONLY differences are the added `<div class="equipment-links">…Manual…</div>` line. If any other card's markup changed, the loop rewrite dropped or reordered something — fix before committing.

- [ ] **Step 9: Verify no equipment name is a link yet**

```bash
cd "/c/Users/wyang2/OneDrive - Lamar University/700 - AI/academic-website"
grep -o '<h4 class="equipment-name">[^<]*<' /tmp/eqr/lab-after.html | head
```

Expected: six lines, each showing the plain equipment name immediately followed by `<` (the closing `</h4>`), i.e. no `<a` between them. This confirms the no-post path still renders plain text.

- [ ] **Step 10: Add the CHANGELOG entry**

Append to the end of the `## [待发布]` list in `CHANGELOG.md` (before the `---` that closes the section):

```markdown
- `_pages/lab.md` / `_sass/layouts/_lab.scss` / `_data/web/equipment.yml`：设备卡片加资源链接行。`equipment.yml` 新增两个可选字段，`manual`（厂商手册 URL）和 `tutorials`（`{title, url}` 列表）；卡片在描述下方渲染一排 pill（`.equipment-links` / `.equipment-link`，`margin-top: auto` 贴底，卡片高度不一时链接行仍对齐）。同时卡片按 `item.name | slugify` 反查 `site.posts` 里 `equipment_id` 匹配的 post，命中则设备名变链接并多一个 Training Guide pill，未命中就保持纯文本——与 `_pages/research.md` 用 `project_id` 绑定项目 writeup 的写法一致，yml 里不存 URL。`tutorials` 只在没有 post 时渲染，有 post 时由 post 承载完整清单，避免两处重复维护。本次只给 UR10e 填了 `manual`，其余五台不变。注意：SN、资产标签、借用人这类内部资产信息不进这个仓库——站点由公开 repo 发布，提交进去的文件无论是否被页面渲染都可被读取且永久留在 git 历史里。
```

- [ ] **Step 11: Commit**

```bash
cd "/c/Users/wyang2/OneDrive - Lamar University/700 - AI/academic-website"
git add _pages/lab.md _sass/layouts/_lab.scss _data/web/equipment.yml CHANGELOG.md
git commit -m "feat(lab): add resource link row to equipment cards

Equipment cards dead-ended at a description. Each item now takes an optional
manual URL, rendered as a pill, and an optional tutorials fallback list.

The card also reverse-looks-up a post whose equipment_id matches the slugified
equipment name, mirroring how research.md binds a project to its writeup: when
one exists the equipment name links to it and a Training Guide pill appears,
and the tutorials fallback stands down so the list lives in one place.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 2: UR10e onboarding post

**Files:**
- Create: `_posts/2026-09-24-ur10e-onboarding-path.md`
- Modify: `CHANGELOG.md`

**Interfaces:**
- Consumes: the `equipment_id` front-matter key and the slug value confirmed in Task 1 Step 2 (`universal-robots-ur10e`); the `.equipment-link` markup that Task 1 emits for a matched post.
- Produces: nothing later tasks depend on. Further equipment writeups follow this file as the template.

- [ ] **Step 1: Create the post**

Create `_posts/2026-09-24-ur10e-onboarding-path.md` with exactly this content:

```markdown
---
layout: post
title: "Getting Started with the UR10e Cobot"
date: 2026-09-24
categories: ["Teaching & Learning"]
tags: ["equipment", "ur10e", "cobot", "robotics", "collaborative-robot", "tutorial"]
equipment_id: universal-robots-ur10e
---

Every student who joins a project on the UR10e asks some version of the same question: what do I need to know before I am allowed to touch it? This post is the answer, and it is the same answer for everyone, so it lives here rather than in my outbox.

The order below matters more than the volume. Work through it top to bottom. Steps 1 and 2 are prerequisites for anything hands-on; steps 3 and 4 depend on what your project actually uses, and you can stop after step 2 if your work never touches the camera or the LiDAR safety system.

## How to use this

- **Do step 1 before you touch the robot.** Not because of the paperwork, but because PolyScope makes very little sense until you have seen it explained once, and a confused operator next to a 12.5 kg-payload arm is the exact situation the safety training exists to prevent.
- **You can practice on the physical robot while you work through the material.** If you need access for that, ask me and I will arrange it. Do not wait until you have "finished" the e-learning — that moment never arrives.
- **Read the manual sections you are about to use, not the whole thing.** The user manual is a reference, not a course. Operation, safety, and I/O are the sections that pay for themselves immediately.
- **Everything below is free**, though the UR Academy requires a free account.

## 1. Universal Robots fundamentals

Start here regardless of what your project is about. This is the required first step.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [UR e-Series e-Learning](https://academy.universal-robots.com/free-e-learning/e-series-e-learning/) | Official module series from UR Academy | The baseline for everything else. Register a free account to unlock all modules. |

The modules cover the robot hardware, the PolyScope interface, basic program structure, and safety. By the end you should be able to jog the arm, build a simple waypoint program, and explain what a safety configuration limit is and why you cannot change it casually.

## 2. The UR10e user manual

Read this after the e-learning, or in parallel with it. The modules teach you the platform; the manual tells you about the specific arm in our lab.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [UR10e User Manual (PDF)](https://www.universal-robots.com/manuals/EN/PDF/SW5_19/user-manual-UR10e-PDF_online/711-039-00_UR10e_User_Manual_en_Global.pdf) | The full manual for our model | Model-specific limits, safety functions, and electrical interfaces |

Focus on the sections covering **operation**, **safety**, and **I/O**. The I/O chapter in particular is the one people skip and then lose an afternoon to, because every gripper, sensor, and conveyor handshake on our setup eventually comes back to a tool or controller I/O pin.

## 3. Camera and vision

Relevant if your project involves the wrist camera — object detection, part location, or any vision-guided pick.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [Wrist Camera Advanced Parameters](https://elearning.robotiq.com/course/view.php?id=5#section-0) | Robotiq e-learning course | Exposure, focus, and detection parameters — the settings that decide whether your snapshot works |
| [Wrist Camera Instruction Manual (PDF)](https://assets.robotiq.com/website-assets/support_documents/document/Wrist_20Camera_Instruction_20Manual_PDF_20210406.pdf) | Robotiq reference manual | Mounting, calibration, and the camera node's behavior in a program |

Take the course first and the manual second. Most early vision failures are not algorithmic — they are lighting, exposure, or a teach-object step done under conditions that no longer hold.

## 4. LiDAR and human–robot collaboration

Relevant if your project involves shared workspace, speed-and-separation monitoring, or any question about what the robot does when a person walks up to it.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [UR Marketplace: LiDAR safety solution](https://www.universal-robots.com/marketplace/products/01tP40000071NhmIAE/) | Product page for the LiDAR-based safety system | What the hardware actually provides, and where it sits in the safety chain |
| [LiDAR-based safety in HRC](https://www.mdpi.com/1424-8220/23/9/4305) | Research paper, *Sensors* 23(9):4305 | The research framing: how zone monitoring translates into collaborative operation |

Read the product page for the mechanism and the paper for the reasoning. The distinction that matters here is between a safety function that is *certified* and a perception feature that is merely *useful* — collaborative operation depends entirely on which one you are relying on.

## What comes next

Once you have worked through the steps relevant to your project, come see me and we will scope a first task on the actual hardware. Bring a specific thing you want the arm to do; "learn the robot" is not a task and you have already done it by this point.
```

- [ ] **Step 2: Build and verify the post is live**

```bash
cd "/c/Users/wyang2/OneDrive - Lamar University/700 - AI/academic-website"
bundle exec jekyll build
ls _site/blogs/getting-started-with-the-ur10e-cobot/index.html
```

Expected: the file exists. The site's post permalink is `/blogs/:title/` (`_config.yml:89`), so the URL derives from the title, not the filename.

- [ ] **Step 3: Verify the card name is now a link and the Training Guide pill appeared**

This is the actual contract of the whole feature — the lookup connecting post to card.

```bash
cd "/c/Users/wyang2/OneDrive - Lamar University/700 - AI/academic-website"
grep -o '<h4 class="equipment-name">.\{0,90\}' _site/lab/index.html | head -3
grep -c 'Training Guide' _site/lab/index.html
grep -c 'equipment-link"' _site/lab/index.html
```

Expected: the first UR10e heading now contains `<a href="…/blogs/getting-started-with-the-ur10e-cobot/">`; `Training Guide` appears once; `equipment-link"` counts `2` (Manual + Training Guide).

If the name is still plain text, the `equipment_id` does not match `item.name | slugify` — recheck against the value printed in Task 1 Step 2.

- [ ] **Step 4: Verify the post is listed on the blog page**

```bash
cd "/c/Users/wyang2/OneDrive - Lamar University/700 - AI/academic-website"
grep -c 'getting-started-with-the-ur10e-cobot' _site/blogs/index.html
```

Expected: `1`. The post carries an existing category (`Teaching & Learning`), so the existing filter chip picks it up with no change to `_pages/blogs.md`.

- [ ] **Step 5: Verify the outbound links resolve**

Six external URLs, and a dead link in an onboarding post costs a student an hour.

```bash
cd "/c/Users/wyang2/OneDrive - Lamar University/700 - AI/academic-website"
for u in \
  "https://academy.universal-robots.com/free-e-learning/e-series-e-learning/" \
  "https://www.universal-robots.com/manuals/EN/PDF/SW5_19/user-manual-UR10e-PDF_online/711-039-00_UR10e_User_Manual_en_Global.pdf" \
  "https://elearning.robotiq.com/course/view.php?id=5#section-0" \
  "https://assets.robotiq.com/website-assets/support_documents/document/Wrist_20Camera_Instruction_20Manual_PDF_20210406.pdf" \
  "https://www.universal-robots.com/marketplace/products/01tP40000071NhmIAE/" \
  "https://www.mdpi.com/1424-8220/23/9/4305" ; do
  printf '%s %s\n' "$(curl -sS -o /dev/null -w '%{http_code}' -L --max-time 20 "$u")" "$u"
done
```

Expected: `200` for each. A `403` from MDPI or Robotiq is a bot filter, not a broken link — open it in a browser to confirm before changing anything. Any `404` means the URL has moved and must be corrected in the post before committing.

- [ ] **Step 6: Add the CHANGELOG entry**

Append to the end of the `## [待发布]` list in `CHANGELOG.md`:

```markdown
- `_posts/2026-09-24-ur10e-onboarding-path.md`：新增 UR10e 上手路径 post，`equipment_id: universal-robots-ur10e` 与 lab 页设备卡片绑定，点设备名即进。内容是四步顺序路径而非链接堆：UR e-Series e-Learning（必做，需注册免费账号）→ UR10e 用户手册（重点 operation / safety / I/O）→ Robotiq 腕部相机课程与手册（做视觉才需要）→ LiDAR 安全方案与 HRC 论文（做共享工作空间才需要）。形态沿用 `2026-09-17-unity-xr-learning-path.md`：序言 + 每步一张资源表 + 一段说明这步为什么在这个位置。category 用现有的 `Teaching & Learning`，没有新开「Lab Equipment」类别——`_pages/blogs.md` 的筛选 chip 已经有八个，等设备 post 攒到四五篇再拆。
```

- [ ] **Step 7: Commit**

```bash
cd "/c/Users/wyang2/OneDrive - Lamar University/700 - AI/academic-website"
git add _posts/2026-09-24-ur10e-onboarding-path.md CHANGELOG.md
git commit -m "content: add the UR10e onboarding path post

A curated four-step path rather than a link dump: UR e-Series e-learning,
then the UR10e manual, then the wrist camera material, then LiDAR and
human-robot collaboration. The last two are conditional on what a project
actually uses.

equipment_id binds it to the UR10e card on the lab page, which now links its
name to the post and shows a Training Guide pill.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Verification after both tasks

```bash
cd "/c/Users/wyang2/OneDrive - Lamar University/700 - AI/academic-website"
bundle exec jekyll build
grep -c 'equipment-card' _site/lab/index.html          # 6 — no card lost
grep -c 'equipment-links' _site/lab/index.html         # 1 — only UR10e has resources
grep -c 'equipment-link"' _site/lab/index.html         # 2 — Manual + Training Guide
git status --short                                     # clean
git log --oneline -2
```

Then open `/lab/` in a browser at a narrow viewport and confirm the pill row wraps rather than overflowing the card, in both light and dark mode.
