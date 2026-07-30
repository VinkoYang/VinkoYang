# 更新日志 Changelog

本文件记录 `dev` 分支的技术改动，合并到 `source`（发布）时打 tag。
版本号遵循语义化版本 semver：`vX.Y.Z`

- **Z（patch）**：文字/内容补丁，无结构改动。例：改简介文字、修一个错别字、加一条 news。
- **Y（minor）**：某个页面/模块的调整或新功能，不影响整体结构。例：CV 界面调整、新增一个 section、样式改版。
- **X（major）**：页面结构或站点架构重大调整。例：导航结构重排、数据模型迁移、换主题。

**当前版本：v2.0.0**（`source` 分支，已发布，2026-07-30）。

## 两份日志，别混

| 文件 | 受众 | 写什么 |
|---|---|---|
| 本文件 `CHANGELOG.md` | 自己（技术记录） | 改了哪些文件/数据结构，为什么改 |
| `_data/web/whatsnew.yml` | 访客，公开在 `/whatsnew/` | 只写访客能感知的变化，一两句话 |

## 使用约定

**提交到 `dev` 时**：往最上面「待发布」段里追加一条改动记录。

**合并 `dev` → `source` 时**（= 一次发布），三步：

1. 把这次改动总结成访客视角的条目，加进 `_data/web/whatsnew.yml` **最上面**。
2. 决定版本号该加 X/Y/Z 哪一位（看上面规则），把「待发布」换成实际版本号和日期。
3. 上面新起一个 `## [待发布]` 段，供下次 dev 提交继续追加。

然后合并打 tag：

```bash
git checkout source && git merge --no-ff dev
git tag -a v1.7.0 -m "版本说明"
git push origin source --tags
```

---

## [待发布]

## [2.0.0] - 2026-07-30

- 「What's New」从顶部导航移到页脚 Links 栏：`_config.yml` 的 `nav_pages` 去掉 `whatsnew` 条目，`_includes/footer.html` 的 Links 列加一条链接。页面本身和 `/whatsnew/` 固定链接不变。
- 修复页面标题与顶部导航之间的多余空隙（除首页外的所有页面）：`main.site-container` 自带 `padding-top: 2rem`，而全局 `h1~h6` 又带 `margin-top: 2.5rem`，padding 阻止了外边距合并，两者叠加成 4.5rem。`_sass/layouts/_grid.scss` 里把容器前两层的首个子元素 `margin-top` 归零。首页不受影响（首个子元素是 `.home-grid` 而非标题）。
- 修复每次刷新整页下滑：所有 layout 都把整页内容包在同一个 `.fade-in-section` 里，所以它实际是加载时的一次性淡入，不是滚动渐显。其中的 `transform: translateY(16px)` 会让整页起始位置低 16px 再滑上去。已去掉 transform，只保留透明度淡入。
- 修正 `assets/ref.bib` 中 `liu2026all` 的词条类型：改回 `@inproceedings`（NeurIPS 为会议论文集），撤销下方那条把它改成 `@article` 的记录。
- CV 配色改成 Material Blue（`cv/style.css`）：姓名/section 标题/条目符号（▸、–）统一用 `--accent`(#2196F3)，section 标题下划线单独用 `--accent-soft`(#90CAF9) 弱化层级；去掉 header 联系方式下面的黑色分割线。
- 网站 About 页 PI 信息卡改版 + 全站配色换成 Material Blue 四档 accent scale：
  - `.pi-name` 从 `--font-heading`(Quattrocento) 换成 `--font-display`(Cinzel)，跟自家注释里写的"hero name用Cinzel"对齐；职称/院系/地址拆成 `.pi-title`/`.pi-dept`/`.pi-address` 三级字号层级（原来三行同字号，只靠斜体区分）。顺手修了 `--text-tertiary` 变量根本没定义、地址行样式一直没生效的问题。
  - `_sass/base/_variables.scss` 的 accent 从单一色值改成四档 scale：`--accent-wash`(#E3F2FD 填充) / `--accent-soft`(#90CAF9 描边) / `--accent`(#2196F3 主交互) / `--accent-deep`(#0D47A1 强调/hover)，浅色深色模式各自定义（深色模式刻度反转：暗底上浅蓝承重）。背景色不变（浅色暖米、深色暖黑维持原值）。
  - 修复 `head.html` 里内联的 `:root{--accent:X;--accent-hover:X}` 覆盖 SCSS：该规则排在 main.css 之后，把深色模式 accent 顶掉、且强制 hover 和 base 同色，导致全站 hover 状态一直没变化。已删除，accent 统一由 SCSS 管理。
  - `accent_color` 保留在 `_config.yml`，但收窄成只给 `favicon.svg` 用（SVG 读不了 CSS 变量），需与 `--accent` 手动同步。
  - `.chip` 从纯色边框改成 wash 底/soft 边/deep 字三档叠加，列表里不再是一排饱和色边框。
- CV 排版与字体改版（`cv/style.css`、`cv/build-cv.js`）：
  - 字体换成 Stoke（姓名，大写）+ Cinzel（section 标题）+ Quattrocento（正文/subhead），与网站字体体系统一。
  - 修复页边距失效：`cv/style.css` 里的 `@page { margin: 0 }` 会覆盖 puppeteer `pdf()` 的 margin 选项，正文占满整页而 footer 仍按 margin 留白，导致页脚与正文重叠。移除后由 puppeteer 单独控制，边距调为上 18mm / 下 20mm / 左右 19mm。
  - `.cv-entry` 去掉 `break-inside: avoid`（原本任何放不下的条目整块推到次页，页底留大片空白），改用 `break-after: avoid` + `orphans/widows: 2`，页面填充正常，总页数 6 → 5。
  - `entryHead()` 把 meta 拆成机构/课程/地点三段分别着色（机构蓝色加粗、地点斜体灰），日期字号与职位对齐。
  - 页眉联系方式拆成两行：电话/邮箱/个人网站一行，LinkedIn/Scholar/ResearchGate/ORCiD/GitHub 一行，图标放大到 10.5px。
- 数据模型迁移：`_data/` 拆成 `_data/profile/`（简历相关，网页与 CV 共用）和 `_data/web/`（纯网站展示数据），所有 `site.data.*` 引用同步更新（about/team/research/lab/teaching/videos/home/feed/sidebar 等）。
- 新增 CV 自动生成流水线：`cv/build-cv.js` 直接从 `_data/profile/*.yml` + `_data/web/people.yml` + `assets/ref.bib` + `_config.yml` 生成 HTML，puppeteer 打印为 `files/cv.pdf`（CI 每次 push 重新构建，PDF 不入库）。改简历数据 = 网页和 CV 一起更新。
- `cv/style.css` 全新排版：语义化 class、CSS 变量、SVG mask 图标、日期/年份右对齐、防跨页断行。
- 新增 CV 专属数据文件：`summary.yml`、`committee_memberships.yml`、`conference_service.yml`、`student_guidance.yml`、`certifications.yml`、`memberships.yml`。
- `_data/profile/education.yml` 补全学位细节、`experience.yml`/`awards.yml` 补齐历史 CV 中缺失的条目。
- 修复 `assets/ref.bib` 中 `liu2026all` 词条类型错误（`@inproceedings` 误标，实际应为 `@article`，此前会在发表列表渲染出 "undefined"）。
- `_config.yml` 新增 `phone`、`office` 字段（CV 页眉用）。
- `package.json` 新增依赖 `js-yaml`、`puppeteer`，新增脚本 `npm run cv`。

## 历史版本

从 fork 模板改成自己站点内容起(2026-06-11)算起，追溯自动归版：

- v2.0.0 - 2026-07-30 — 排版/配色系统重做(Material Blue)、`_data` 拆分 profile/web(数据模型迁移)、CV 自动生成流水线、What's New 移到页脚、若干布局 bug 修复
- v1.6.0 - 2026-07-29 — 上线 blog 板块(LLM skills / Unity VC / 文献检索指南)、avatar+favicon 换 SVG、post 目录样式
- v1.5.0 - 2026-07-11 — Lab 页打磨、alumni 更新、加 Google Analytics、可访问性/对比度修正
- v1.4.0 - 2026-06-21 — 加访客地图、独立 Videos 页、research 项目排版改进
- v1.3.0 - 2026-06-18 — Lab 页通栏 banner、PI 简介扩充、people 数据合并、图片压缩提速
- v1.2.0 - 2026-06-15 — 换自定义域名、主页改版、publication 搜索/引用改进
- v1.1.0 - 2026-06-13 — 加 Lab 页(设备/alumni 表)、扩充 research 项目(AR/遥操作机器人/网络安全)
- v1.0.0 - 2026-06-11 — 站点用自己内容首次上线：publications、academic services、education

v1.0.0 之前(2020-2026-04)是上游模板 sbryngelson/academic-website-template 自身的开发历史，不算进本站版本号。
