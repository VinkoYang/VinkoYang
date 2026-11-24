# Blog 封面 Gemini prompt 清单

20 篇没有封面的博客文章。9 篇设备教程已经用 `images/lab/equip_*` 实拍图，不在这里。

## 用法

1. 每次新开一个 Gemini 对话，先发「风格前缀」，再发某一篇的「主体」。两段拼起来发也行。
2. 生成后检查三点：图里**没有任何文字或字母**(Gemini 常会偷偷加)、主体在画面中间、颜色没有跑出米色/墨色/蓝色。不合格就回复 `Regenerate. No text or letters anywhere.`
3. 下载原图，按下表的文件名放进 `images/blog/`(格式不限，png/jpg 都行)。交给 Claude 后，由 Claude 转成 1600×900 的 WebP，并在文章里加上 `cover:` 字段。
4. 同一系列(演示系列、Top 100 系列)最好在**同一个对话**里连续生成，风格会更一致。

## 风格前缀(每张都用)

```
Editorial flat illustration, 16:9 landscape. Warm parchment background #f8f6f1, ink linework #2c2a25, a single accent blue #1565c0 with light blue #90caf9 as the only colors besides ink and parchment. Matte, subtle paper grain, generous negative space, main subject centered within the middle 60% of the frame. No text, no letters, no numbers, no logos, no faces, no hands, no gradients, no neon, no glow, no holograms.
```

## 每篇的主体

| # | 文章 | 文件名 | 主体 |
|---|---|---|---|
| 2 | Useful Links & Resources | `links-resources` | `Subject: a neat wooden desk organizer holding folders and bookmarks, with thin blue lines connecting each folder to small floating cards, like a map of resources.` |
| 3 | How to Actually Read an Academic Paper | `academic-reading-training` | `Subject: an open printed research paper shown as abstract grey text blocks and a simple chart, with blue highlighter marks and margin arrows, a magnifying glass resting on it.` |
| 4 | A Beginner's Guide to LLM Skills | `understanding-llm-skills` | `Subject: a central rounded chat-bubble shape with modular tool cards (a wrench, a magnifier, a calendar, a code bracket shape) plugging into it like puzzle pieces.` |
| 5 | Unity Version Control Tutorial | `unity-version-control-tutorial-introduction` | `Subject: a branching tree of commit nodes drawn as circles on ink lines, with small 3D cubes sitting on some nodes, two branches merging back into one.` |
| 6 | Literature Search and Paper Collection | `literature-search-and-paper-collection` | `Subject: a tall messy stack of papers on the left passing through a funnel-shaped filter into a single tidy unlabeled folder on the right.` |
| 7 | Target Journals and Conferences | `target-journals-and-conferences` | `Subject: a simple world map in ink outline with a few blue map pins, beside a short stack of bound journals with plain spines.` |
| 8 | Top 100 AI LLM Keywords | `top-100-ai-llm-keywords` | `Subject: a 10 by 10 grid of small square tiles; about a dozen tiles are blue and connected by thin lines into a small neural-network pattern.` |
| 9 | Top 100 HRI & HRC Keywords | `top-100-hri-hrc-research-keywords` | `Subject: a 10 by 10 grid of small square tiles in the background; in front, a small collaborative robot arm handing a coffee cup across a table.` |
| 10 | Top 100 Robotics Keywords | `top-100-robotics-research-keywords` | `Subject: a 10 by 10 grid of small square tiles in the background; in front, a small four-wheeled mobile robot with a lidar puck on top.` |
| 11 | Top 100 XR Keywords | `top-100-xr-ar-vr-mr-keywords` | `Subject: a 10 by 10 grid of small square tiles in the background; in front, a VR headset resting on the table, with a few tiles floating out of the grid toward it.` |
| 12 | Building Wherefold | `building-wherefold` | `Subject: an outline map of the continental United States with a dotted travel route linking several blue pins, and a small database cylinder icon beside it.` |
| 13 | Graduate Research Presentation Expectations | `graduate-research-presentation-expectations` | `Subject: a small seminar room seen from the back row: empty chairs, a projector screen showing a simple bar chart, a lectern on the side.` |
| 14 | How to Build a Good Research Presentation | `how-to-build-a-good-research-presentation` | `Subject: six blank slide frames laid out like a storyboard in two rows, with blue arrows showing the order and one slide containing a simple chart.` |
| 15 | Presentation Strategy by Venue | `presentation-strategy-by-venue` | `Subject: three stages side by side from small to large: a poster board, a seminar lectern, and a conference stage with a big screen.` |
| 16 | A Learning Path for Unity and XR | `unity-xr-learning-path` | `Subject: a winding path of stepping stones leading to a VR headset on a pedestal; the stones carry simple shapes: a cube, a gear, a cursor arrow.` |
| 17 | How to Meet People at a Scientific Conference | `how-to-meet-people-at-a-scientific-conference` | `Subject: a standing cocktail table in a conference hallway with two coffee cups and two blank lanyard name badges, poster boards in the background.` |
| 18 | Ten Habits for a Better Science Talk | `ten-habits-for-a-better-science-talk` | `Subject: a lectern with a microphone, and beside it a clipboard checklist with ten blank lines, several ticked in blue.` |
| 19 | A Quick Start on User Studies for XR | `user-study-quick-start` | `Subject: a VR headset, a stopwatch, and a clipboard with a row of blank rating circles, with faint wisps of smoke drifting across the background.` |
| 20 | (预留) 新文章 | `<slug>` | 照上面的格式写一句 `Subject: ...`：具体物体或场景，不要抽象概念，不要人脸和手。 |

13、14、15、18 是演示系列，8–11 是 Top 100 系列。同一系列放在一个 Gemini 对话里连着生成。
