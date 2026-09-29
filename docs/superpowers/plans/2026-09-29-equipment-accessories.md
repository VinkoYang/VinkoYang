# Equipment Accessories Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** List each equipment's accessories on its `/lab/` card and describe them in full, with links, on the equipment's Training Guide post.

**Architecture:** Accessories are structured data under each entry in `_data/web/equipment.yml`. `_pages/lab.md` renders the names on the card; a new include `_includes/equipment_accessories.html` renders full entries and is called from the UR10e Training Guide post. Styles: card list in `_sass/layouts/_lab.scss`; post entries in a new partial `_sass/layouts/_equipment_accessories.scss`; the pill-button style `.equipment-link` is un-nested so both views share it.

**Tech Stack:** Jekyll 4.3 (Liquid, kramdown GFM with `parse_block_html: true`), SCSS, Python 3 + PyYAML for data checks, curl against the running dev server (`http://localhost:4001`, watch mode on).

Spec: `docs/superpowers/specs/2026-09-29-equipment-accessories-design.md`

## Global Constraints

- Branch `dev`. One commit at the end (Task 4) with a `CHANGELOG.md` `[待发布]` entry — every `dev` commit needs one.
- Link `type` values: exactly `product | manual | elearning | video`.
- Icons: product `fa-arrow-up-right-from-square`, manual `fa-book`, elearning `fa-graduation-cap`, video `fa-circle-play`.
- Accessory heading ids: `accessory-` + `name | slugify`. Maker never inside the `h3` (the post TOC copies `h3` text verbatim).
- Videos are links, not embeds.
- No guessed URLs. Every URL in this plan returned 200 on 2026-09-29, except `https://triplea-robotics.com/tool-changer/` (455 bot-protection to curl; user-supplied, keep).
- Liquid inside markdown pages: emit one-line HTML blocks with `markdown="0"`; kramdown otherwise escapes closing tags (see existing comment in `_pages/lab.md`).
- Equipment without `accessories` must render exactly as before.

---

### Task 1: Accessories data

**Files:**
- Modify: `_data/web/equipment.yml:1-8` (UR10e entry)

**Interfaces:**
- Produces: `site.data.web.equipment[i].accessories` — list of `{name, maker, description, specs?: [string], links?: [{type, label, url}]}`. Accessory names used as anchors later: `Wrist Camera` → `#accessory-wrist-camera`, `nanoScan3 Core Safety Laser Scanners` → `#accessory-nanoscan3-core-safety-laser-scanners`.

- [ ] **Step 1: Write the failing check**

Save as `C:/Users/wyang2/AppData/Local/Temp/claude/c--Users-wyang2-OneDrive---Lamar-University-700---AI-academic-website/eb23342c-405c-4828-8f03-01185baaaf79/scratchpad/check_accessories.py`:

```python
import yaml
d = yaml.safe_load(open('_data/web/equipment.yml', encoding='utf-8'))
ur = next(e for e in d if e['name'] == 'Universal Robots UR10e')
assert 'AirPick' not in ur['description'], 'stale AirPick in description'
acc = ur['accessories']
assert len(acc) == 8, len(acc)
names = [a['name'] for a in acc]
assert 'Wrist Camera' in names and 'nanoScan3 Core Safety Laser Scanners' in names, names
for a in acc:
    assert a['name'] and a['maker'] and a['description'].strip(), a
    for l in a.get('links', []):
        assert l['type'] in {'product', 'manual', 'elearning', 'video'}, l
        assert l['label'] and l['url'].startswith('https://'), l
others = [e for e in d if e['name'] != 'Universal Robots UR10e']
assert all('accessories' not in e for e in others)
print('ok')
```

- [ ] **Step 2: Run it, expect failure**

Run (repo root): `python "<scratchpad>/check_accessories.py"`
Expected: `AssertionError: stale AirPick in description`

- [ ] **Step 3: Replace the UR10e entry**

Replace lines 1–8 of `_data/web/equipment.yml` (the whole `Universal Robots UR10e` entry, up to the blank line before `UFactory Xarm 6`) with:

```yaml
- name: "Universal Robots UR10e"
  category: "Collaborative Robot"
  image: "lab/equip_ur10e.jpeg"
  description: >
    A 6-DOF collaborative robot arm with a 12.5 kg payload, 1300 mm reach, and a force/torque sensor built into the tool flange.
    It anchors our robot cell for teaching and research in collaborative automation.
  manual: "https://www.universal-robots.com/manuals/EN/PDF/SW5_19/user-manual-UR10e-PDF_online/711-039-00_UR10e_User_Manual_en_Global.pdf"
  accessories:
    - name: "WINGMAN Cobot Tool Changer"
      maker: "TripleA Robotics"
      description: >
        A plug-and-play mechanical tool changer that lets the cobot switch end-effectors in seconds, automatically or by hand.
        Automatic changes need no power or compressed air: the arm's own motion through the tool holder locks and releases each tool.
        Optional pass-through modules carry electrical signals and air or vacuum to the mounted end-effector.
      specs:
        - "Manual or automatic tool change"
        - "Mechanical locking; no power or air needed to change tools"
        - "Tool holder supports end-effectors up to 5 kg"
        - "Optional electrical (M8/M12) and pneumatic/vacuum pass-through"
      links:
        - type: product
          label: "Product page"
          url: "https://triplea-robotics.com/tool-changer/"
        - type: product
          label: "UR Marketplace"
          url: "https://www.universal-robots.com/marketplace/products/01tP40000071NjMIAU/"
        - type: manual
          label: "User guide"
          url: "https://triplea-robotics.com/wp-content/uploads/TripleA-robotics_WINGMAN_User-Guide.pdf"
        - type: video
          label: "Overview video"
          url: "https://www.youtube.com/watch?v=4ZSUEO-6LlA"
        - type: video
          label: "Demo on UR"
          url: "https://www.youtube.com/watch?v=3M4gb9KVHWo"

    - name: "Screwdriving Solution"
      maker: "Robotiq"
      description: >
        A complete robotic screwdriving package. The SF-300 screw feeder presents screws one at a time, and the SD-100 screwdriver picks each one up by vacuum and drives it at a set torque.
        Programming runs on the teach pendant through the Robotiq_Screwdriving URCap, which adds force sensing to the drive.
      specs:
        - "Torque: 0.5–4 Nm"
        - "Screws: M2.5–M5, 4–25 mm long, any material"
        - "Vacuum air supply: 100 psi"
        - "URCap: Robotiq_Screwdriving (PolyScope 5.9.4 or later on e-Series)"
      links:
        - type: product
          label: "UR Marketplace"
          url: "https://www.universal-robots.com/marketplace/products/01tP40000071NgFIAU/"
        - type: manual
          label: "Instruction manual"
          url: "https://assets.robotiq.com/website-assets/support_documents/document/Robotiq_Screwdriving_Solution_Instruction_manual_20220209.pdf"
        - type: elearning
          label: "e-Learning course"
          url: "https://elearning.robotiq.com/course/view.php?id=101"

    - name: "EPick Vacuum Gripper"
      maker: "Robotiq"
      description: >
        An electric vacuum gripper with a built-in pump, so it runs without compressed air.
        It handles flat or smooth parts that fingers grip poorly, such as sheet metal, glass, boxes, and plastic panels.
      specs:
        - "Built-in electric vacuum pump; no compressed air"
        - "Single-, dual-, or quad-cup configurations"
      links:
        - type: product
          label: "UR Marketplace"
          url: "https://www.universal-robots.com/marketplace/products/01tP40000071NgGIAU/"
        - type: manual
          label: "Instruction manual"
          url: "https://assets.robotiq.com/website-assets/support_documents/document/EPick_Instruction_Manual_e-Series_PDF_20210709.pdf"
        - type: elearning
          label: "e-Learning course"
          url: "https://elearning.robotiq.com/course/view.php?id=6"
        - type: video
          label: "Installation video"
          url: "https://www.youtube.com/watch?v=O0l86pJWuMM"

    - name: "2F-85 Adaptive Gripper"
      maker: "Robotiq"
      description: >
        A two-finger electric gripper with an 85 mm stroke. The fingers can pinch a part in parallel or wrap around it, and the gripper reports object detection back to the robot program.
        It is the gripper students use in the pick-and-place exercises.
      specs:
        - "Stroke: 85 mm"
        - "Grip force: 20–235 N"
        - "Parallel and encompassing grip; object detection"
      links:
        - type: product
          label: "UR Marketplace"
          url: "https://www.universal-robots.com/marketplace/products/01tP40000071NgHIAU/"
        - type: manual
          label: "Instruction manual"
          url: "https://assets.robotiq.com/website-assets/support_documents/document/2F-85_2F-140_Instruction_Manual_e-Series_PDF_20190206.pdf"
        - type: elearning
          label: "e-Learning course"
          url: "https://elearning.robotiq.com/course/view.php?id=3"

    - name: "Wrist Camera"
      maker: "Robotiq"
      description: >
        A camera mounted between the robot's tool flange and the gripper.
        From the teach pendant, students teach it a part, and it then locates that part on the work surface and passes the position to the robot program, with no separate vision PC.
      links:
        - type: product
          label: "UR Marketplace"
          url: "https://www.universal-robots.com/marketplace/products/01tP40000071NgJIAU/"
        - type: manual
          label: "Instruction manual"
          url: "https://assets.robotiq.com/website-assets/support_documents/document/Wrist_20Camera_Instruction_20Manual_PDF_20210406.pdf"
        - type: elearning
          label: "e-Learning course"
          url: "https://elearning.robotiq.com/course/view.php?id=5"

    - name: "Training Panel with Conveyor Belts and I/O Simulator"
      maker: "Universal Robots Academy Hardware Set"
      description: >
        A beech multiplex panel carrying conveyor belts and an I/O simulator.
        Students use it to wire and program the robot's digital inputs and outputs, start and stop the belts, and build pick-and-place cycles that react to parts arriving on a conveyor.

    - name: "nanoScan3 Core Safety Laser Scanners"
      maker: "SICK"
      description: >
        Two compact safety laser scanners watch the floor around the cell. Each monitors a protective field and a warning field, and the robot stops when a person steps into the protective field.
        The fields are set up on the UR teach pendant with SICK's nanoScan3 Tool URCap.
      specs:
        - "Quantity: 2"
        - "Protective field range: 3 m"
        - "Scanning angle: 275°"
      links:
        - type: product
          label: "Product page"
          url: "https://www.sick.com/us/en/catalog/products/safety/safety-laser-scanners/nanoscan3/c/g507056"
        - type: product
          label: "UR Marketplace (sBot Stop)"
          url: "https://www.universal-robots.com/marketplace/products/01tP40000071NhnIAE/"
        - type: manual
          label: "URCap instructions"
          url: "https://www.sick.com/media/docs/4/24/624/operating_instructions_nanoscan3_tool_urcap_safety_system_en_im0094624.pdf"

    - name: "Presence Sensors"
      maker: "Universal Robots Academy Hardware Set"
      description: >
        Sensors on the training panel that detect when a part is in position, for example at the end of a conveyor.
        They feed the robot's digital inputs, so students can write programs that wait for a part or react when one arrives.
```

Keep the blank line before `- name: "UFactory Xarm 6"`.

- [ ] **Step 4: Run the check, expect pass**

Run: `python "<scratchpad>/check_accessories.py"`
Expected: `ok`

---

### Task 2: Accessory list on the lab card

**Files:**
- Modify: `_pages/lab.md:90` (after the `equipment-desc` line)
- Modify: `_sass/layouts/_lab.scss` (add card list styles; un-nest `.equipment-link`)

**Interfaces:**
- Consumes: `item.accessories[].name`, `item.accessories[].maker` from Task 1.
- Produces: top-level `.equipment-link` class (pill button), reused by Task 3.

- [ ] **Step 1: Failing check**

Run: `curl -s http://localhost:4001/lab/ | grep -c 'equipment-accessory-maker'`
Expected: `0`

- [ ] **Step 2: Add the list to the card**

In `_pages/lab.md`, directly after the line
`<p class="equipment-desc">{{ item.description }}</p>` insert:

```liquid
{% if item.accessories and item.accessories.size > 0 -%}
<div class="equipment-accessories" markdown="0"><p class="equipment-accessories-title">Accessories</p><ul>{% for acc in item.accessories %}<li>{{ acc.name }}{% if acc.maker %} <span class="equipment-accessory-maker">· {{ acc.maker }}</span>{% endif %}</li>{% endfor %}</ul></div>
{% endif -%}
```

- [ ] **Step 3: Styles**

In `_sass/layouts/_lab.scss`, inside `.equipment-card { ... }`, after the `.equipment-desc { ... }` block, add:

```scss
  .equipment-accessories {
    margin-top: var(--space-2);

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li {
      font-size: 0.8125rem;
      line-height: 1.6;
      color: var(--text-secondary);
      padding-left: 0.9rem;
      position: relative;

      &::before {
        content: "–";
        position: absolute;
        left: 0;
        color: var(--text-tertiary);
      }
    }
  }

  .equipment-accessories-title {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--text-tertiary);
    margin: 0 0 var(--space-1);
  }

  .equipment-accessory-maker {
    color: var(--text-tertiary);
  }
```

Then move the `.equipment-link { ... }` block (including its `&:hover` and `i` children) out of `.equipment-card` to top level, directly after the closing `}` of `.equipment-card`, un-indented by one level. Content unchanged.

- [ ] **Step 4: Check it renders**

Run: `sleep 8; curl -s http://localhost:4001/lab/ | grep -c 'equipment-accessory-maker'`
Expected: `8`

Run: `curl -s http://localhost:4001/lab/ | grep -c 'class="equipment-accessories"'`
Expected: `1` (only the UR10e card)

Run: `curl -s http://localhost:4001/lab/ | grep -c '&lt;/div'`
Expected: `0` (kramdown did not escape the block)

Open `http://localhost:4001/lab/`: UR10e card shows "ACCESSORIES" and 8 lines; Manual / Training Guide pills still sit at the card bottom and look unchanged.

---

### Task 3: Accessory entries on the Training Guide post

**Files:**
- Create: `_includes/equipment_accessories.html`
- Create: `_sass/layouts/_equipment_accessories.scss`
- Modify: `assets/main.scss:53` (import after `layouts/lab`)
- Modify: `_posts/2026-09-24-ur10e-onboarding-path.md` (new section; pointers in steps 3 and 4; fix dead marketplace link)

**Interfaces:**
- Consumes: `equipment_id` include parameter (string, the equipment `name | slugify`); `.equipment-link` top-level class from Task 2; data from Task 1.
- Produces: `h3#accessory-<slug>` anchors.

- [ ] **Step 1: Failing check**

Run: `curl -s http://localhost:4001/blogs/ur10e-onboarding-path/ | grep -c 'id="accessory-'`
Expected: `0`

- [ ] **Step 2: Create the include**

`_includes/equipment_accessories.html`:

```liquid
{%- comment -%}
  Full accessory entries for one equipment item.
  Usage: {% include equipment_accessories.html equipment_id=page.equipment_id %}
  equipment_id is the equipment name run through slugify (same key _pages/lab.md uses).
  Output is one-line blocks inside markdown="0" so kramdown leaves it alone.
{%- endcomment -%}
{%- assign acc_equip = nil -%}
{%- for e in site.data.web.equipment -%}{%- assign e_id = e.name | slugify -%}{%- if e_id == include.equipment_id -%}{%- assign acc_equip = e -%}{%- endif -%}{%- endfor -%}
{%- if acc_equip and acc_equip.accessories and acc_equip.accessories.size > 0 %}
<div class="accessory-list" markdown="0">
{%- for acc in acc_equip.accessories %}
<section class="accessory-entry">
<h3 id="accessory-{{ acc.name | slugify }}">{{ acc.name }}</h3>
{%- if acc.maker %}<p class="accessory-maker">{{ acc.maker }}</p>{% endif %}
<p class="accessory-desc">{{ acc.description | strip }}</p>
{%- if acc.specs and acc.specs.size > 0 %}<ul class="accessory-specs">{% for s in acc.specs %}<li>{{ s }}</li>{% endfor %}</ul>{% endif %}
{%- if acc.links and acc.links.size > 0 %}<div class="accessory-links">{% for l in acc.links %}{% case l.type %}{% when "manual" %}{% assign l_icon = "fa-book" %}{% when "elearning" %}{% assign l_icon = "fa-graduation-cap" %}{% when "video" %}{% assign l_icon = "fa-circle-play" %}{% else %}{% assign l_icon = "fa-arrow-up-right-from-square" %}{% endcase %}<a href="{{ l.url }}" class="equipment-link" target="_blank" rel="noopener"><i class="fa-solid {{ l_icon }}"></i> {{ l.label }}</a>{% endfor %}</div>{% endif %}
</section>
{%- endfor %}
</div>
{%- endif -%}
```

- [ ] **Step 3: Create the styles**

`_sass/layouts/_equipment_accessories.scss`:

```scss
// ============================================================
// Equipment accessories — full entries on a Training Guide post
// (rendered by _includes/equipment_accessories.html)
// ============================================================

.accessory-list {
  margin-top: var(--space-4);
}

.post-body .accessory-entry {
  padding: var(--space-6) 0;
  border-top: 1px solid var(--border-color);

  &:first-child {
    border-top: 0;
    padding-top: 0;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.125rem;
  }

  .accessory-maker {
    font-size: 0.8125rem;
    color: var(--text-tertiary);
    margin: 0 0 var(--space-2);
  }

  .accessory-desc {
    margin: 0;
  }

  .accessory-specs {
    font-size: 0.9rem;
    margin: var(--space-2) 0 0;
  }

  .accessory-links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-top: var(--space-3);

    .equipment-link:hover {
      text-decoration: none;
    }
  }
}
```

In `assets/main.scss`, after `@import "layouts/lab";` add:

```scss
@import "layouts/equipment_accessories";
```

- [ ] **Step 4: Add the section to the post**

In `_posts/2026-09-24-ur10e-onboarding-path.md`, directly before `## What comes next`, insert:

```markdown
## Accessories on our UR10e

These are mounted on or wired to our arm. Each entry has the maker's product page, manual, and training material where they exist.

{% include equipment_accessories.html equipment_id=page.equipment_id %}

```

- [ ] **Step 5: Pointers in steps 3 and 4, and fix the dead link**

In section `## 3. Camera and vision`, after the paragraph starting "Take the course first", add a new paragraph:

```markdown
Specs and links for the camera itself: [Wrist Camera](#accessory-wrist-camera) under Accessories below.
```

In section `## 4. LiDAR and human–robot collaboration`, replace the table row

```markdown
| [UR Marketplace: LiDAR safety solution](https://www.universal-robots.com/marketplace/products/01tP40000071NhmIAE/) | Product page for the LiDAR-based safety system | What the hardware actually provides, and where it sits in the safety chain |
```

with

```markdown
| [UR Marketplace: SICK sBot Stop](https://www.universal-robots.com/marketplace/products/01tP40000071NhnIAE/) | Product page for the nanoScan3 Core safety package on our cell | What the hardware actually provides, and where it sits in the safety chain |
```

(the old `...NhmIAE` id resolves to the generic Products listing), and after the paragraph starting "Read the product page for the mechanism" add:

```markdown
Specs for our two scanners: [nanoScan3 Core Safety Laser Scanners](#accessory-nanoscan3-core-safety-laser-scanners) under Accessories below.
```

- [ ] **Step 6: Check it renders**

Run: `sleep 8; P=$(curl -s http://localhost:4001/blogs/ur10e-onboarding-path/); echo "$P" | grep -c 'id="accessory-'; echo "$P" | grep -c 'NhmIAE'; echo "$P" | grep -c 'NhnIAE'; echo "$P" | grep -c '&lt;/'`
Expected: `8`, `0`, `2` (step 4 table + nanoScan3 entry), `0`

Run: `echo "$P" | grep -o 'id="accessory-[a-z0-9-]*"'`
Expected to include `id="accessory-wrist-camera"` and `id="accessory-nanoscan3-core-safety-laser-scanners"`.

Open `http://localhost:4001/blogs/ur10e-onboarding-path/`: TOC lists the 8 accessory names (no maker text glued on); pills show icons; the two in-text pointer links jump to the right entries; light and dark theme both readable.

---

### Task 4: Link check, CHANGELOG, commit

**Files:**
- Modify: `CHANGELOG.md` (`## [待发布]` list, append at end)
- Commit also: spec and this plan.

- [ ] **Step 1: Check every accessory URL**

```bash
python -c "
import yaml
for e in yaml.safe_load(open('_data/web/equipment.yml',encoding='utf-8')):
    for a in e.get('accessories',[]):
        for l in a.get('links',[]): print(l['url'])
" | while read u; do printf '%s %s\n' "$(curl -s -o /dev/null -L -A 'Mozilla/5.0' --max-time 25 -w '%{http_code}' "$u")" "$u"; done
```

Expected: all `200`, except `455 https://triplea-robotics.com/tool-changer/` (bot protection; user-supplied).

- [ ] **Step 2: CHANGELOG entry**

Append to the end of the `## [待发布]` list:

```markdown
- Equipment 配件：`_data/web/equipment.yml` 新增可选字段 `accessories`（`name` / `maker` / `description` / `specs` / `links[{type,label,url}]`，type 为 product|manual|elearning|video）。UR10e 录入 8 个配件：WINGMAN 换刀器、Robotiq Screwdriving Solution、EPick、2F-85、Wrist Camera、UR Academy 训练面板（传送带 + I/O simulator）、2 台 SICK nanoScan3 Core、presence sensors。UR10e 简介只描述机械臂本身，旧的 AirPick 错误一并去掉。Lab 页卡片在简介下列出配件名（`_pages/lab.md`，样式在 `_lab.scss`，`.equipment-link` 挪到顶层供复用）。新 include `_includes/equipment_accessories.html` 按 `equipment_id` 渲染完整配件条目（简介、参数、链接按钮），UR10e Training Guide 新增 “Accessories on our UR10e” 一节，样式在新文件 `_sass/layouts/_equipment_accessories.scss`；第 3、4 步各加一行跳到对应配件。修正 Training Guide 第 4 步失效的 UR Marketplace 链接（`NhmIAE` → `NhnIAE`，SICK sBot Stop）。设计与计划见 `docs/superpowers/specs/2026-09-29-equipment-accessories-design.md`、`docs/superpowers/plans/2026-09-29-equipment-accessories.md`。
```

- [ ] **Step 3: Commit**

```bash
git add _data/web/equipment.yml _pages/lab.md _sass/layouts/_lab.scss _sass/layouts/_equipment_accessories.scss assets/main.scss _includes/equipment_accessories.html _posts/2026-09-24-ur10e-onboarding-path.md CHANGELOG.md docs/superpowers/specs/2026-09-29-equipment-accessories-design.md docs/superpowers/plans/2026-09-29-equipment-accessories.md
git commit -F - <<'EOF'
feat(lab): list equipment accessories on cards and Training Guide

- Add an optional accessories list to equipment.yml and fill in the
  eight accessories on the UR10e cell, with specs and links.
- Show accessory names under the equipment description on /lab/.
- New equipment_accessories include renders full entries on the UR10e
  Training Guide, with manual, e-learning, and video links.
- Fix the dead UR Marketplace link in Training Guide step 4.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
EOF
```

Expected: commit succeeds; `git status --short` empty.
