# Equipment Accessories — Design

Date: 2026-09-29
Status: Approved (design), pending implementation

## Problem

The UR10e card on `/lab/` lists its accessories inside one long description
sentence, and that sentence is out of date (it says AirPick; the lab has an
EPick, and it misses the tool changer, the safety scanners, and the training
panel). The Training Guide post for the UR10e covers learning steps, but says
nothing about most of the hardware mounted around the arm.

Wanted:

1. Under each equipment card on `/lab/`, a short list of that equipment's
   accessories.
2. On the equipment's own page (its Training Guide post), a fuller entry per
   accessory: what it is, key specs, and links to product pages, manuals,
   e-learning, and videos.

## Solution overview

Accessories become structured data under each equipment entry in
`_data/web/equipment.yml`. Two views read the same data:

- The lab card renders the accessory names.
- A new include, `_includes/equipment_accessories.html`, renders the full
  entries; the Training Guide post calls it.

One source of truth. Adding an accessory is a yml edit; both views update.

Rejected: hand-written accessory sections in the post (duplicates the yml
list); a new per-equipment page collection (the Training Guide post already is
the equipment page, per the 2026-09-23 equipment-resources design).

## 1. Data model

New optional field `accessories` on an equipment entry:

```yaml
- name: "Universal Robots UR10e"
  ...
  accessories:
    - name: "WINGMAN Cobot Tool Changer"
      maker: "TripleA Robotics"
      description: >
        Two or three sentences in plain English.
      specs:                      # optional, short strings
        - "Changes end-effectors in seconds, automatically or by hand"
      links:                      # optional
        - type: product           # product | manual | elearning | video
          label: "Product page"
          url: "https://triplea-robotics.com/tool-changer/"
```

- `type` picks the icon: product `fa-arrow-up-right-from-square`, manual
  `fa-book`, elearning `fa-graduation-cap`, video `fa-circle-play`.
- `label` is the button text; keep it short ("Manual", "Quick Start",
  "UR Marketplace", "Demo video").
- Equipment without `accessories` renders exactly as today.

## 2. Lab card

Below `.equipment-desc`, when `accessories` is non-empty:

```html
<div class="equipment-accessories" markdown="0">
  <p class="equipment-accessories-title">Accessories</p>
  <ul>
    <li>WINGMAN Cobot Tool Changer <span class="equipment-accessory-maker">TripleA Robotics</span></li>
    ...
  </ul>
</div>
```

Names only, no links; the card's name and Training Guide button already lead to
the detail page. Styled small (0.8125rem), maker in `--text-tertiary`, compact
list spacing, placed above `.equipment-links` so the buttons stay at the card
bottom.

The UR10e `description` is rewritten to describe the arm only (6-DOF, 12.5 kg
payload, 1300 mm reach); the accessory sentence and the AirPick error go away.

## 3. Training Guide post

`_includes/equipment_accessories.html` takes `equipment_id`, finds the
equipment whose `name | slugify` matches, and renders for each accessory:

- `h3` with the accessory name only, `id` = `accessory-` + `name | slugify`
  (the post TOC copies `h3` text verbatim, so the maker must not sit inside
  the heading)
- maker as a small muted line under the heading
- description paragraph
- specs as a short `ul` (if any)
- links as a row of pill buttons reusing the `.equipment-link` look (if any),
  external links opening in a new tab

The UR10e post gets a new section before "What comes next":

```markdown
## Accessories on our UR10e

{% include equipment_accessories.html equipment_id=page.equipment_id %}
```

Headings are real `h3` elements so they appear in the post TOC sidebar.
Videos are links, not embeds.

Steps 3 (wrist camera) and 4 (LiDAR) stay as learning steps; each gains one
line linking to the matching accessory entry below by its `#accessory-...`
anchor.

## 4. UR10e accessory list

| # | Accessory | Maker | Known sources |
|---|---|---|---|
| 1 | WINGMAN Cobot Tool Changer | TripleA Robotics | product page, UR Marketplace, user guide PDF, overview video, demo video (from user) |
| 2 | Screwdriving Solution (SD-100 screwdriver + SF-300 screw feeder) | Robotiq | UR Marketplace, e-learning (from user); instruction manual and quick start guide to be found |
| 3 | EPick vacuum gripper | Robotiq | installation video (from user); manual/product page to be found |
| 4 | 2F-85 Adaptive Gripper | Robotiq | to be found |
| 5 | Wrist Camera | Robotiq | e-learning + manual already in the post |
| 6 | Beech Multiplex Panel with conveyor belts and I/O simulator | Universal Robots Academy Hardware Set | to be found; generic description if no official page |
| 7 | nanoScan3 Core safety laser scanner (×2) | SICK | UR Marketplace link already in the post; SICK operating instructions |
| 8 | Presence sensors | Academy Hardware Set | generic description, no model |

Specs come from the user's pasted Robotiq Screwdriving data and from
manufacturer pages. Every URL is checked to open before it is committed. Where
no official source is found, the entry has a description and no link, rather
than a guessed URL.

## 5. Scope

In: UR10e accessories data, lab card list, include, UR10e post section,
styles, CHANGELOG entry.

Out: accessories for the other equipment (the fields support them; content
later), embedded videos, per-accessory pages.

## 6. Verification

- Local server: `/lab/` UR10e card shows the 8 accessory names; other cards
  unchanged.
- `/blogs/ur10e-onboarding-path/` shows the new section with 8 entries and the
  TOC lists them.
- Every accessory URL returns a non-404 response (curl), or is noted as
  blocked-by-bot-protection and checked by hand.
