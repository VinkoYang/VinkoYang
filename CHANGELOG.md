# 更新日志 Changelog

本文件记录 `dev` 分支的技术改动，合并到 `source`（发布）时打 tag。
版本号遵循语义化版本 semver：`vX.Y.Z`

- **Z（patch）**：文字/内容补丁，无结构改动。例：改简介文字、修一个错别字、加一条 news。
- **Y（minor）**：某个页面/模块的调整或新功能，不影响整体结构。例：CV 界面调整、新增一个 section、样式改版。
- **X（major）**：页面结构或站点架构重大调整。例：导航结构重排、数据模型迁移、换主题。

**当前版本：v2.4.2**（`source` 分支，已发布，2026-09-02）。

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

（空）

---

## 历史版本

从 fork 模板改成自己站点内容起(2026-06-11)算起，追溯自动归版。每版一段简要总结，细节改动看对应 commit。

### [2.4.2] - 2026-09-02

`_data/profile/teaching.yml` 新增两门 Fall 2026 课程：INEN 6301 Advanced Robotics（博士级 special topics，在 INEN 5301 hands-on UR10e 基础上延伸到 homogeneous transform / DH 正运动学、解析逆运动学与 Jacobian、阻抗与力控、闭环控制推导与 PID、hand-eye calibration、优化式 robot cell 设计，含文献综述与 UR10 原创研究项目、会议论文格式撰写与展示）；INEN 4375 Simulation of Industrial Engineering Systems（离散事件仿真：九步方法论、排队论 Kendall/Little's Law/M-M-1/M-M-c/M-G-1、随机数与逆变换随机变量生成、spreadsheet 手算排队、Arena 建模 + verification/validation + 统计输出分析、capstone 项目）。teaching 页 `site.data.profile.teaching` 循环自动渲染，无模板改动。

### [2.4.1] - 2026-09-02

新增 lab news 条目 `_lab_news/inen5301-fall2025-cohort.md`（date 2025-12-07）：INEN-5301 Collaborative Robot Operations and Programming 第二次开课（首次 fall 2024，本次 2025 fall，10 人注册 / 7 个 A），涵盖课程内容、UR10 cobot 两个学生个人项目（Task-1 Pick & Place、Task-2 Writing Task with L-ID）与期末展示合影（Md Al Amin Khan、Arafat Bin Fazle，instructor Wenhao Yang 居中）。封面图 `images/lab/news/2025-12-07-collab-robotics/presentation-day.jpg`（1600×900，原图即 16:9，quality 82）。无 gallery，未加首页 news 短条目。

两个学生 demo 视频（Task 1 `owRrbLbY2q0`、Task 2 `22OX8TqLNnA`）落三处：lab news 正文内嵌播放器（新增 `.labnews-videos` 网格 + `.labnews-video` 响应式 iframe，样式在 `_sass/components/_lab-news.scss`，raw HTML 块带 `markdown="0"`，iframe `loading="lazy"`）；`_data/profile/teaching.yml` 中 INEN 5301-05 课的 `projects:`（原空）加两条，teaching 页自动渲染成链接；`_pages/videos.md` 新增 "Teaching & Student Project Videos" 段，遍历 `site.data.profile.teaching` 各 `projects` 中带 youtu 链接的条目并嵌入播放器，复用 research videos 段的 youtu.be / watch?v= ID 解析逻辑。

### [2.4.0] - 2026-08-29

新增 lab news 模块（XRAI Lab 图文动态，与首页个人 news 短条目、blog 长文三者分开）。新建 collection `lab_news`（`_config.yml` 加 `collections` + `defaults`），条目放 `_lab_news/` 且**不带日期前缀** —— 非 `_posts` 的 collection，Jekyll 不剥离文件名日期，排序统一走 front matter 的 `date:`。front matter 含 `cover`（封面，与 gallery 分开）、`gallery`（`{src, caption}`）、`summary`、`tags`，图片路径相对 `images/`，与 `research.yml`、`equipment.yml` 一致。

三个渲染面：`_includes/lab_news_carousel.html` 轮播（lab 页 About 卡片下方，最新 5 条）、`_pages/lab_news.md` 归档页 `/lab/news/`、`_layouts/lab_news.html` 详情页（未复用 `post.html` —— 后者硬编码 `/blogs/` 面包屑、TOC 侧栏与 `BlogPosting` schema，本 layout 用 `NewsArticle` 且无 TOC）。轮播走原生 CSS scroll-snap + `assets/js/site.js` 里一个独立 IIFE，未引入 Bootstrap JS bundle；样式集中在新建的 `_sass/components/_lab-news.scss`，全部用现有 CSS 变量，暗色模式无需额外规则。lab news 天然不进 `/blogs/` 与 `feed.xml`（两者分别遍历 `site.posts` / `site.posts` + `site.data.web.news`，都不碰 `site.lab_news`）；`assets/search.json` 则补了一段遍历 `site.lab_news`，否则详情页永不进站内搜索索引。

轮播最终定为纯手动：初版的自动播放 + 暂停/播放按钮全部拿掉 —— 按钮本是为 WCAG 2.2.2（自动移动内容需可暂停）而加，内容不再自动移动后按钮连同 `pauseReasons` 状态模型一起失去存在理由。期间还修掉一个致命问题：kramdown 会转义 `.labnews-carousel-head` 等三处标记，导致轮播在 `/lab/` 上一直是坏的。归档页与轮播统一改成先对完整 `site.lab_news` 按 `date` 倒序、再做 `where_exp` 过滤（Liquid 的 `where` 之后再 sort 顺序不稳，两处会不一致甚至跨构建横跳）。可访问性收尾：圆点保留 8px 视觉尺寸但用 `padding` + `background-clip: content-box` 撑出 24px 热区并补 `:focus-visible`；封面图 `alt` 置空避免屏幕阅读器把标题读两遍；日期格式统一 `%b`。详情页排版另修一处：wrapper 加 `labnews-wrapper` 收到 `46rem` 并解除 `.post-body p, li` 的 `max-width: 68ch` —— 那个 68ch 是给 `post.html` 的「正文 + 220px TOC」两栏设计的，本页无侧栏时文字被压在 1100px 容器左侧、右边空一大块，而封面图和标题却满宽。

首条内容：2026-08-28 Simon Saurbier（KIT / IPEK）human–machine symbiosis seminar，配三张现场照（长边 1600px、quality 82），首页 news 加一条短条目指向详情页。

VHI（IDETC/CIE 2026）成果补齐 slides 与 talk 视频：`research.yml` 对应条目补 `video` 与 `slide`，Research 页与 Videos 页自动生效（后者遍历 `research.yml` 中带 youtu 链接的条目）。`assets/ref.bib` 的 `yang2026seeing` 与 `talk2026idetc_vhi` 补 `slides={}` / `video={}`；`_layouts/bibtemplate.html` 原不认这两个字段，新增 Slides / Video 两个 `btn-pill`，`_sass/components/_buttons.scss` 补对应配色。Publications 与 Talks 共用该 template，两页同时生效。

### [2.3.1] - 2026-08-23

News 加一条 ASME IDETC-CIE 2026 参会消息：chair 两个 VARE UX / Human-Machine Interaction session（CIE-31-01、CIE-31-02，附 session gallery 链接），本人 presentation《Seeing Isn’t Believing: the Vertical–Horizontal Illusion Across Screens and XR Headsets》，学生 Rezwanul Ashraf Ruddro presentation《An LLM-Integrated VR Framework for Avatar-Driven Oral Assessment of Student Learning Outcomes》。首页侧栏 news 显示条数从 3 条改为 5 条（`_includes/sidebar.html`）。

### [2.3.0] - 2026-08-22

新增 research 条目《Path Planning Using Industrial Robotics for Automation of Route-Based Vibration Data Collection》（Avinash 主导，TurtleBot 4 / ROS 2 路线式振动巡检，mentor 以 Wenhao Yang 领衔），含配图与 YouTube 演示（最终 `YtjXZ8cdC8E`），经 `_pages/videos.md` 的 `links.video` 自动同步到 /videos/，News 加一条。post 支持 `last_modified_at` front matter，详情页与列表页在 date 后显示 "Updated"；`links-resources` post 补充 Cardinal Connect 笔电借用与 Remove Equipment from Campus 信息。修复顶部导航在 768–992px 宽度下 tab 显示不全（展开断点 md 改 lg，加 overflow-x 兜底）。移除退出 program 的 Abdul Aziz Rashid Hamed Al Badi（people.yml 条目 + 照片）。

### [2.2.0] - 2026-08-17

Team 页支持新的导师分类（本科生/高中生导师），学生卡片新增 Lamar ID 展示，补充一张学生照片。首页 Recent Research 模块从 3 卡单行改为 4 卡 2x2 网格。

### [2.1.1] - 2026-08-14

新增两篇教学向博文：《Graduate Research Presentation Expectations》讲研究生做 research PPT 的标准与常见问题；《How to Build a Good Research Presentation》讲通用 research talk 结构/大纲/时间分配/格式规范，附外部资源链接（Princeton PCUR、PLOS Ten Simple Rules、UCSB Grad Slam、UNC poster tips 等）。另将 office 房间号改为 Cherry Building Room 2628。

### [2.1.0] - 2026-08-06

新增 Projects 板块（个人软件项目，与学术 research 分开）：`/projects/` 页面 + 数据源 `_data/web/projects.yml`（含 webpage/github/demo/docs/blog 多链接类型），`nav_pages` 加入 projects；首条内容 Wherefold，强调「自建结构化景点数据库 + 在此之上做的可视化平台」两层贡献。首页新增「Software I've Built」横向长卡片区（`_sass/layouts/_home.scss` 新样式，含 status 药丸/技术栈 chip/CTA，独立于 research 卡片形状），About 段落加一句引导；「Recent Projects」标题改名「Recent Research」避免混淆。新增建站博文《Building Wherefold》（数据库字段清单、使用指南、v0.1.0→v0.13.0-alpha 开发里程碑）。News 加一条 Wherefold 上线消息。

配套仓库整理：删除无引用的 `_sass/bootstrap_bak.scss`，5 篇 `_posts` 文件名统一 kebab-case；静态资源目录分层（`images/logos`、`images/profile`、`files/slides`、`files/posters`、`files/teaching`、`files/templates` 等），修正 `teaching.yml` 中两处失效的 syllabus 链接，清理若干零引用文件。构建产物 59 个站内资源链接逐一校验无死链。

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
