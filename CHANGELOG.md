# 更新日志 Changelog

本文件记录 `dev` 分支的技术改动，合并到 `source`（发布）时打 tag。
版本号遵循语义化版本 semver：`vX.Y.Z`

- **Z（patch）**：文字/内容补丁，无结构改动。例：改简介文字、修一个错别字、加一条 news。
- **Y（minor）**：某个页面/模块的调整或新功能，不影响整体结构。例：CV 界面调整、新增一个 section、样式改版。
- **X（major）**：页面结构或站点架构重大调整。例：导航结构重排、数据模型迁移、换主题。

**当前版本：v2.1.0**（`source` 分支，已发布，2026-08-06）。

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

## 历史版本

从 fork 模板改成自己站点内容起(2026-06-11)算起，追溯自动归版。每版一段简要总结，细节改动看对应 commit。

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
