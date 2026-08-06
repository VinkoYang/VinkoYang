# 更新日志 Changelog

本文件记录 `dev` 分支的技术改动，合并到 `source`（发布）时打 tag。
版本号遵循语义化版本 semver：`vX.Y.Z`

- **Z（patch）**：文字/内容补丁，无结构改动。例：改简介文字、修一个错别字、加一条 news。
- **Y（minor）**：某个页面/模块的调整或新功能，不影响整体结构。例：CV 界面调整、新增一个 section、样式改版。
- **X（major）**：页面结构或站点架构重大调整。例：导航结构重排、数据模型迁移、换主题。

**当前版本：v2.0.1**（`source` 分支，已发布，2026-08-04）。

## 两份日志，别混

| 文件 | 受众 | 写什么 |
|---|---|---|
| 本文件 `CHANGELOG.md` | 自己（技术记录） | 改了哪些文件/数据结构，为什么改 |
| `_data/web/whatsnew.yml` | 访客，公开在 `/whatsnew/` | 只写访客能感知的变化，一两句话 |

## 使用约定

**提交到 `dev` 时**：往最上面「待发布」段里追加一条改动记录。

**合并 `dev` → `source` 时**（= 一次发布），三步：

1. 把这次改动总结成访客视角的条目，加进 `_data/web/whatsnew.yml` **最上面**。
2. 决定版本号该加 X/Y/Z 哪一位（看上面规则）。把「待发布」里逐条累积的流水账**重新归纳总结**（按主题合并同类项，不要照搬罗列），作为 `### [X.Y.Z] - 日期` 插进下面「历史版本」**最上面**。
3. 清空「待发布」段，供下次 dev 提交继续追加。

然后合并打 tag：

```bash
git checkout source && git merge --no-ff dev
git tag -a v1.7.0 -m "版本说明"
git push origin source --tags
```

---

## [待发布]

- 新增 Projects 板块（个人软件项目，与学术 research 分开）：`_pages/projects.md`（permalink `/projects/`，复用 research 页的 `research-card-h` / `research-dropdown` 样式，筛选改为 Tech + Year）、数据源 `_data/web/projects.yml`（字段：title/image/start_date/end_date/role/status/stack/abstract/links{webpage,github,demo,docs,blog}；`blog` 支持站内相对路径或外链，站内路径自动补 `site.url`+`baseurl`，渲染成「Blog post」按钮）、`_config.yml` 的 `nav_pages` 在 research 后插入 projects。首条内容为 Wherefold（https://wherefold.com），配图 `images/projects/wherefold.png`（由 TripCompass 仓库 logo 缩放到 600×600）。仓库当前为私有，暂不放 github 链接。
- `_data/web/news.yml` 顶部加一条 2026-08-06 的 Wherefold 上线消息（含站点外链）。
- 首页 `_pages/home.md`：About me 末尾加一句 software/Wherefold 介绍并链到 `/projects`；原「Recent Projects」小标题改名「Recent Research」（避免与新 Projects 板块混淆）；其后新增「Software I've Built」横向长卡片区（读 `_data/web/projects.yml`，取最近 2 条，卡片直链项目官网，底部 "See all projects" 指向 `/projects`）。样式为 `_sass/layouts/_home.scss` 新增的 `.home-software-list` / `.home-software-card` 系列：200px 图 + 内容两栏 grid（≤600px 转竖排），含 status 药丸、role/日期 meta 行、技术栈 chip（超 6 个折叠成 "+N more"）、箭头 CTA；hover/focus-visible 用 `--accent` 描边与 250ms 位移，并带 `prefers-reduced-motion` 降级。刻意与 research 的方卡不同形，让两类工作在视觉上分开。
- 新增博文 `_posts/2026-08-06-building-wherefold.md`（category: Industry Insights）与 `_data/web/projects.yml` 摘要重写，强调本人贡献分两块：① 结构化数据库整理（5110 景点 × 20+ 字段：坐标/分类/营业时间/价格档位/联系方式/双语简介/建议时长/最佳时间/交通/拍照建议，城市侧另有别称/气候/机场/铁路/税率/都市圈分组等字段）② 在此之上做的可视化平台（交互地图/筛选/搜索/社区纠错）。博文加了「如何使用」分步指南和 v0.1.0→v0.13.0-alpha（2026-06-26～2026-07-29）开发里程碑时间线。
- 清理仓库结构：删除无引用的 `_sass/bootstrap_bak.scss`；5 篇带空格/大写文件名的 `_posts` 统一改为 kebab-case（`target-journals-and-conferences`、`top-100-ai-llm-keywords`、`top-100-hri-hrc-research-keywords`、`top-100-robotics-research-keywords`、`top-100-xr-ar-vr-mr-keywords`）。
- 静态资源目录分层。原则：`assets/` = 构建资源（不动）、`papers/` = 仅自己发表的论文 PDF（**URL 保持不变**，避免破坏 Google Scholar / 外部直链）、`images/` = 图片、`files/` = 其他可下载文件。
  - `images/` 根目录 14 个散文件归位：`images/logos/`（NSF / NIH / DOE / ONR / Lamar CFR / TX Hazardous Waste 六个资助方 logo）、`images/profile/`（`VinkoYang-1-1.jpg`、`avatartion_yang_01.png`、`headshot.jpg`）、团队占位图 `rock.jpg` 并入 `images/team/`。
  - `files/` 由平铺杂物袋改为分层：`files/slides/`、`files/posters/`、`files/teaching/`、`files/templates/`；`files/cv.pdf` 保持原位（`cv/build-cv.js` 的产出路径 + 外链稳定）。
  - 消除 poster 分裂：`papers/Motion_Spring_Conference_Poster.pdf` 移入 `files/posters/`，`papers/` 此后只放论文。
  - 同步更新引用：`_config.yml`（`photo` / `share_image`）、`_data/web/funders.yml`、`_data/web/people.yml`、`_data/web/research.yml`（poster / slide 共 6 处）、`_data/profile/teaching.yml`、`_posts/2026-06-26-academic-reading-training.md`；各数据文件顶部的路径注释示例一并改成新前缀，避免以后再写错。
  - 修两处失效的 syllabus 链接：`teaching.yml` 中 `ST_AR_VR_in_Manufacturing` 路径误写成 `files/files files/...`（多余前缀）、`Intro_Robotics_INEN_5358` 缺 `files/` 前缀导致解析到站点根目录 404。
  - 删除零引用文件：`images/nnsa_logo.png`、`images/banner.jpg`、`images/avatartion_yang_01.svg`、`images/yang_notion_avatar_c-1.png`、空目录 `images/banner/`，以及被自动生成的 `files/cv.pdf` 取代的手工旧版 `files/My_Academic_CV_2026-6-11.pdf`。
  - 验证：`bundle exec jekyll build` 通过，构建产物中 59 个站内资源链接逐个校验，无死链。

## 历史版本

从 fork 模板改成自己站点内容起(2026-06-11)算起，追溯自动归版。每版一段简要总结，细节改动看对应 commit。

### [2.0.1] - 2026-08-04

新增 4 篇关键词速查博文（AI/LLM、Robotics、XR、HRI & HRC），补 categories/tags，修正草稿遗留的拼写/文件名/格式问题。

### [2.0.0] - 2026-07-30

排版/配色系统重做(Material Blue 四档 accent scale，覆盖 CV 与全站)、`_data` 拆分 profile/web 并接入 CV 自动生成流水线(`cv/build-cv.js` + puppeteer 出 PDF)、CV 排版与字体改版、What's New 移到页脚、修复若干布局 bug(标题间距、页面淡入、`liu2026all` bib 词条类型)。

### [1.6.0] - 2026-07-29

上线 blog 板块(LLM skills / Unity VC / 文献检索指南)，avatar+favicon 换 SVG，post 目录样式调整。

### [1.5.0] - 2026-07-11

Lab 页打磨、alumni 更新、加 Google Analytics、可访问性/对比度修正。

### [1.4.0] - 2026-06-21

加访客地图、独立 Videos 页、research 项目排版改进。

### [1.3.0] - 2026-06-18

Lab 页通栏 banner、PI 简介扩充、people 数据合并、图片压缩提速。

### [1.2.0] - 2026-06-15

换自定义域名、主页改版、publication 搜索/引用改进。

### [1.1.0] - 2026-06-13

加 Lab 页(设备/alumni 表)、扩充 research 项目(AR/遥操作机器人/网络安全)。

### [1.0.0] - 2026-06-11

站点用自己内容首次上线：publications、academic services、education。

v1.0.0 之前(2020-2026-04)是上游模板 sbryngelson/academic-website-template 自身的开发历史，不算进本站版本号。
