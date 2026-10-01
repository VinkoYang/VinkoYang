# 更新日志 Changelog

本文件记录 `dev` 分支的技术改动，合并到 `source`（发布）时打 tag。
版本号遵循语义化版本 semver：`vX.Y.Z`

- **Z（patch）**：文字/内容补丁，无结构改动。例：改简介文字、修一个错别字、加一条 news。
- **Y（minor）**：某个页面/模块的调整或新功能，不影响整体结构。例：CV 界面调整、新增一个 section、样式改版。
- **X（major）**：页面结构或站点架构重大调整。例：导航结构重排、数据模型迁移、换主题。

**当前版本：v2.6.0**（`source` 分支，已发布，2026-09-29）。

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

- 新增 `files/teaching/UR_Lab_Manual_v1_2026-10-01.pdf`（80 页，INEN 5301/6301 实验课手册，Modules 5–11 共 37 个 activity；原文件名含空格，改为下划线命名）。`teaching.yml` 新增可选字段 `lab_manual`，INEN 5301-05 和 INEN 6301 都挂上；`_pages/teaching.md` 把 Syllabus 和 Lab Manual 放进同一行 flex，任一存在即显示（INEN 6301 无 syllabus 也能显示手册）。UR10e Training Guide 第 1 步资源表加一行手册，并补一段说明它是 e-learning 的实操部分。
- xArm 6 设备页，照 UR10e 的格式。`equipment.yml`：名称改为官方写法 `UFACTORY xArm 6`（slug 仍是 `ufactory-xarm-6`）；简介只写机械臂本身（5 kg / 700 mm / ±0.1 mm），夹爪和相机挪进新加的 `accessories`；`manual` 指向在线 hardware manual。配件三条：X-Arm Gripper（G1，照片标签 `AG1011…` 不是 G2 的 `AG1200`，规格取自 V1.11.0 说明书：0–84 mm、30 N、802 g、RS-485 Modbus RTU）、X-Arm Camera Stand（官方为 RealSense D435 设计，我们装的是 Gemini 335）、Orbbec Gemini 335（规格取自 Orbbec 产品页）；产品页统一用 ufactory.us，3D 文件指向 ufactory.us/downloads。新 post `_posts/2026-10-01-xarm6-onboarding-path.md`（`equipment_id: ufactory-xarm-6`，lab 卡片自动出 Training Guide 链接）：四步——上手视频（Generation Robots）+ xArm User Manual（Google Drive PDF，即 1305 型 hardware manual V2.6.0）+ 在线版 + downloads 页 → UFACTORY Studio 页与手册 → Python SDK / API 文档 / Developer Manual V2.0.1（ufactory.cc，比 ufactory.us 上的 V1.10.0 新） / xarm_ros2 / xarm_ros（ROS 1 仅限旧项目）→ Orbbec SDK v2 与 ROS 2 wrapper；注明 UFACTORY 官方视觉示例针对 RealSense，Gemini 335 需自行适配。GitHub 链接去掉 utm 参数。所有链接逐条 curl 验证 200。
- Virtualis MotionVR 设备页。`equipment.yml`：名称改为官方写法 `Virtualis MotionVR Station`（slug 变为 `virtualis-motionvr-station`，此前无引用）；`manual` 指向 Interacoustics 托管的 MotionVR User Manual V3.0 PDF；简介只修空格和测试名称，暂无 accessories。新 post `_posts/2026-10-01-virtualis-motionvr-onboarding-path.md`：四步——安全与操作（IFU：开关机顺序、护栏 1.00/1.15/1.25/1.40 m 档位、急停、按身高 S/M/L 站位）→ Patient Manager 软件（手册、模块导航、protocol、SteamVR room setup，MotionVR 地面校准 −12 cm）→ CDP 评估（SOT / LoS / ADT / MCT 视频，MCT 仅 MotionVR+）→ 背景课程与数据导出（CSV 导出见 Patient Manager 手册 5.11，原始 CoP 与平台 pitch/height 记录见 IFU 10.3）。“How to use this”加了研究场景的约束：不得单人操作、受试者需 IRB、结果是研究数据不是诊断。Interacoustics 支持页里针对 VIVE Focus Vision（无线）的文章没收，我们的头显是有线的。所有链接 curl 验证 200（WebFetch 对该站证书报错，改用 curl 读正文）。
- Husky A300 设备页。`equipment.yml`：名称改为 `Clearpath Husky A300 with Robot Arm`（slug `clearpath-husky-a300-with-robot-arm`）；简介补 IP54 / 2 m/s / 30° 爬坡 / ROS 2 Jazzy；`manual` 指向 Clearpath 在线 Husky A300 User Manual。配件两条：Kinova Gen3 lite（照片确认：白色细长夹爪、蓝指尖、无腕部相机；规格取自 Clearpath 集成页：6 DOF、760 mm、0.5 kg、250 mm/s、5.4 kg）和 Intel RealSense D435（规格取自 Clearpath 集成页）。曾有“Gen3 6-axis、5 kg、700 mm”的说法，与照片和两款臂的官方规格都对不上，已与用户确认为 Gen3 lite。新 post `_posts/2026-10-01-husky-a300-onboarding-path.md`：四步——安全与平台（前后急停 + Safety Restart、Battery Breaker、首次上电架空车轮、载荷）→ 驾驶与联网（手柄 L1 慢速 0.3 m/s / R1 快速 2 m/s、配对、networking、offboard PC）→ robot.yaml / Gazebo Harmonic 仿真 / Nav2 demos → 机械臂与相机（Gen3 lite 用户指南、manipulators yaml、MoveIt 仿真与双机）。Intel 官网 D435 页 curl 超时，没收，改用 Clearpath 集成页和 realsense-ros / librealsense。
- Varjo VR-3 与 Meta Quest 3 & 3S 设备页。`equipment.yml`：VR-3 简介补 115° FOV、200 Hz 眼动（取自 varjo.com 产品页），`manual` 指向 Varjo 的 XR-3/VR-3 setup 页；Quest 条目不动。新 post `_posts/2026-10-01-varjo-vr-3-onboarding-path.md`：头条约束是 Varjo Base 不得升级过 4.14（Varjo 2026-01-01 停止支持 VR-3，4.15 起只认 XR-4）；三步——setup 与 SteamVR 基站追踪 → 眼动与 Varjo Base 免代码 gaze 记录（CSV + 视频）→ 开发（OpenXR / Unity XR SDK / UE5 / Native，插件版本须兼容 4.14）。新 post `_posts/2026-10-01-meta-quest-3-onboarding-path.md`：先写 3 与 3S 的镜片、分辨率、FOV 差异（取自 Meta compare 页），同一研究别混用；四步——健康安全与 boundary → 开发者模式 / MQDH / Link → 构建（链到已有的 Unity XR learning path，只补 Quest 专属层：Meta Unity hub、Building Blocks、Interaction SDK）→ Passthrough 与 Passthrough Camera API。两篇都无 accessories 段。
- 新增两台设备：Clearpath TurtleBot 4 与 HTC VIVE Pro。图片 `images/lab/TurtleBot4.jpg`、`htc_vive_pro.jpg` 改名为 `equip_turtlebot4.jpg`、`equip_htc_vive_pro.jpg`，与现有 `equip_` 命名一致。`equipment.yml`：TurtleBot 4 插在 Husky 之后（category `Mobile Robot`，规格取自 TB4 手册 Features 表；按照片当作标准版），配件 OAK-D Pro 与 RPLIDAR A1M8；VIVE Pro 插在 Varjo 之后（规格 1440×1600/眼、90 Hz、110°，HTC 产品页已跳转 Pro 2，规格取自 developer.vive.com），配件 VIVE Tracker (3.0)（规格取自 Developer Guidelines v1.1）。新 post `2026-10-01-turtlebot-4-onboarding-path.md`：头条是校园 Wi-Fi 屏蔽 multicast，需 Discovery Server；四步——setup 与 networking → 驾驶与 Create 3（safe mode 0.31 m/s、dock）→ SLAM / Nav2 / Navigator / 仿真 → 自写节点、TurtleBot4Lessons、SD 卡备份。新 post `2026-10-01-htc-vive-pro-onboarding-path.md`：三步——头显、基站与 play area（用户指南 PDF）→ Tracker 配对与安装规则（240° 视野、金属离天线 ≥30 mm、避开白色反光面）→ OpenXR 与 VIVE Input Utility 的 tracker role。
- 新增 Orbbec Astra+ 3D Camera（3 台）与 Orbbec Gemini 335L 两张卡片（category `Depth Camera`；图片 `Astra_1.jpg`、`Gemini_335L_00A.webp` 改名为 `equip_orbbec_astra_plus.jpg`、`equip_orbbec_gemini_335l.webp`；规格取自 Orbbec 产品页）。两台共用一篇 guide `_posts/2026-10-01-orbbec-cameras-onboarding-path.md`，`equipment_id` 写成列表 `[orbbec-astra-3d-camera, orbbec-gemini-335l]`——Jekyll 的 `where` 对数组字段做包含匹配，`_pages/lab.md` 不用改，两张卡都能链到它（`equipment_accessories.html` 只接受字符串，但这篇不用该 include）。头条是 SDK 分代：Astra+ 只受 Orbbec SDK v1 支持（limited maintenance），SDK v2 不支持；Gemini 335L 推荐 SDK v2；ROS 2 wrapper 同理分 `main`（v1）与默认分支 `v2-main`（v2），依据是 OrbbecSDK_v2 与 OrbbecSDK_ROS2 README 的设备支持表。四步——两台对比表 → Astra+ 软件 → 335L 软件 → 深度使用要点（深度对齐彩色、相机外参、用已知距离平板核对精度）。
- 新增 Dobot Magician Robotic Arm（10 台，RobotLAB 的 V3 Standard Edition）。图片 `RobotLAB Dobot Robotic Arm-1-2-3.png`（3502×2418，2.7 MB）缩到 1600 宽并改名 `equip_dobot_magician.png`（0.56 MB），原文件删除。`equipment.yml`：插在 xArm 6 之后，category `Desktop Robot Arm`，规格取自 Dobot 官方产品页（4 轴、500 g、320 mm、±0.2 mm）；`manual` 指向该产品页；配件一条 Standard Edition Tool Kit（吸盘、夹爪、笔架、3D 打印套件，规格取自官方页；激光雕刻不在此版）。新 post `_posts/2026-10-01-dobot-magician-onboarding-path.md`：Dobot 的手册和软件都在产品页 Downloads 下、需点按钮下载、没有直链，所以按文件原名指路（Magician V2 User Guide (DobotLab-based)、DobotLab V2.3.4、DobotLink V6.7.4、API Description v1.2.3、Communication Protocol v1.1.5 等）；三步——setup 与示教回放 → 四种末端工具 → Blockly 到 Python（官方 API/Demo + 社区库 pydobot，注明非官方、2021 年后未更新；官方 ROS demo 是 2019 年的 ROS 1）。
- `equipment.yml` 条目按类别重排，桌面宽度下 lab 页设备网格每行 3 张（`.equipment-grid` 为 `auto-fill, minmax(280px, 1fr)`，容器 1100px）：机械臂 UR10e / xArm 6 / Dobot → 移动机器人与平台 Husky / TurtleBot 4 / MotionVR → 头显 Varjo VR-3 / VIVE Pro / Quest 3 & 3S → 深度相机 Astra+ / Gemini 335L。此前 Quest 排在最后、与另两台头显隔开。窄屏列数变少，分组顺序不变。

---

## 历史版本

从 fork 模板改成自己站点内容起(2026-06-11)算起，追溯自动归版。每版一段简要总结，细节改动看对应 commit。

### [2.6.0] - 2026-09-29

**设备配件与卡片改版。** `_data/web/equipment.yml` 新增可选字段 `accessories`（`name` / `maker` / `description` / `specs` / `links[{label, url, note}]`）。UR10e 录入 7 个配件：WINGMAN 换刀器、Robotiq Screwdriving Solution、EPick、2F-85、Wrist Camera、UR Academy Hardware Set（传送带 + I/O simulator + presence sensors 合为一条）、2 台 SICK nanoScan3 Core；链接以 Robotiq support 站资料为主（说明书、quick start、TCP 与质心表、EC/EU declaration、CAD），外加 UR Marketplace、e-Learning、视频和一条 UR Forum 帖，全部逐条验证可打开（只有 TripleA 产品页对脚本返回 455，浏览器正常）。新 include `_includes/equipment_accessories.html` 按 `equipment_id` 渲染完整条目，链接用博文三线表（Resource / What it is）；标题 `h3` 只放配件名，因为 TOC 原样复制 `h3` 文字，厂商放下一行。UR10e Training Guide 加 “Accessories on our UR10e” 一节并指向 robotiq.com/support，第 3、4 步各加一行跳到对应配件，并修正第 4 步失效的 UR Marketplace 链接（`NhmIAE` → `NhnIAE`，SICK sBot Stop）。Lab 页卡片：图片 1:1，Description 和 Accessories 改成原生 `<details>` 折叠（默认收起，Accessories 标题带数量），UR10e 简介只写机械臂本身，去掉旧的 AirPick 错误；`.equipment-link` 挪到顶层复用。样式在 `_lab.scss` 和新文件 `_sass/layouts/_equipment_accessories.scss`；设计与计划在 `docs/superpowers/` 的 2026-09-29 spec/plan。

**Lab news 与团队。** 新增 lab news《Advanced Robotics (INEN 6301): Cobot Lab Session and a Pick-and-Place Race》：2026-09-28 实验课，UR10e 小组竞速 Group 1 以 11.328 s、0 errors 夺冠，并介绍课程的 UR Educational Robotics Training – Core 认证和装修后的 XRAI Lab；封面图缩到 1600×1200，首页 news 加一条指向。`people.yml`：Rezwanul 换新头像（600×600 JPEG）；Rohith Naini 加头像和 LinkedIn 并在 team 页显示；新增 DE 学生 Mohammad Asifur R Rabby（2025–now）；删除未被引用的 `mobin.jpg`。

**PI 联系方式。** About 和 Team 页 PI 卡片地址下加 `Office · Tel` 一行（电话可点击拨号，样式 `.pi-office`）。`_config.yml` 电话从 1981 更正为 1891，楼名改为 Cherry Engineering Building；城市邮编拆到新字段 `office_city`，只在 CV 抬头由 `build-cv.js` 拼回。

### [2.5.4] - 2026-09-24

**CV 的 Student Guidance 补全。** `cv/build-cv.js` 新增两个此前不存在的小节：`Master Thesis Committee`（读 `student_guidance.yml` 新增的 `master_thesis_committee` 键）和 `Senior Design Team Mentor`（读 `senior_design_teams`）。后者的条目形态与前面几节不同——它记的是一支队伍而不是单个学生，所以另写了 `seniorDesignLine()`：队名放人名栏，项目 / 课程 / 赞助方 / 五名队员逗号分隔放 meta 栏，年份放年份栏，复用现成的 `.cv-people` 样式不新增 CSS。首批内容为博士委员会 Rafiul Azim Jowarder、硕士委员会 Mohammad Mostafijur Rahman、senior design 团队 MechGenius Creations（INEN 4385，赞助方 Lower Neches Valley Authority）。各条目里的 `email` / `advisor` / `note` / `instructor_of_record` / `sponsor_contact` / `qualifying_exam` 等字段只作内部留档，`guidanceLine()` 与 `seniorDesignLine()` 都不渲染——尤其 `instructor_of_record`，senior design 的授课教师另有其人，印在 CV 上会读成自己教的课。

**人员数据补全。** `_data/web/people.yml`：Ayden J Hicks 补 `degree`；alumni 里 Mubarik 和 Ruddro 的 `degree` 从 `M.S.` 改成 `M.S. Industrial Engineering`（这个字段同时喂 CV 的 Master Thesis Advisor 和 team 页 Alumni 表格的 Degree 列）；新增博士生 Rohith Naini（2026 – now）与 Saleh Mohammad Mobin（2024 – 2026）。Mobin 已转投其他导师且尚未毕业，所以留在 `students` 段而非 `alumni`——他没从本组毕业，进校友表是错的；`show_team: false` 只出现在 CV 与 about.md 的 mentoring 履历里，YAML 里加注释说明缘由，免得以后有人看到 `year_end: 2026` 又把他挪进校友表。Rohith 与 Mobin 均无照片，不进卡片网格。

### [2.5.3] - 2026-09-24

**实验室设备资源。** `_data/web/equipment.yml` 新增两个可选字段：`manual`（厂商手册 URL）和 `tutorials`（`{title, url}` 列表）。lab 页设备卡片在描述下方多一排 pill（`.equipment-links` / `.equipment-link`，`margin-top: auto` 贴底，卡片高度不一时链接行仍对齐）；同时按 `item.name | slugify` 反查 `site.posts` 里 `equipment_id` 匹配的 post，命中则设备名变链接并多一个 Training Guide pill，未命中保持纯文本——与 `_pages/research.md` 用 `project_id` 绑定项目 writeup 同一套写法，yml 里不存 URL，改名或写错 slug 只会静默退回纯文本而不是坏页面。`tutorials` 只在没有 post 时渲染，有 post 时由 post 承载完整清单，两处不重复维护。`_pages/lab.md` 里这个 div 必须带 `markdown="0"` 并给相邻 Liquid 标签加 `-%}` 裁空白：不加的话 kramdown 把这一行当成紧跟段落的行内内容，`</div>` 被转义、后面几张卡片的缩进跟着乱（同文件 `.rf-grid`、`.rr-card` 早有同样处理）。首篇内容是 `_posts/2026-09-24-ur10e-onboarding-path.md`，UR10e 四步上手路径——UR e-Series e-Learning（必做，需注册免费账号）、UR10e 用户手册（重点 operation / safety / I/O）、Robotiq 腕部相机课程与手册、LiDAR 安全方案与 HRC 论文，形态沿用 `2026-09-17-unity-xr-learning-path.md`，category 用现有的 `Teaching & Learning` 没另开类别。设计与实施记录在 `docs/superpowers/` 下的 spec 与 plan。注意：SN、资产标签、借用人这类内部资产信息不进这个仓库——站点由公开 repo 发布，提交进去的文件无论是否被页面渲染都可被读取且永久留在 git 历史里。

**CV 与个人资料。** `cv/style.css` 的 `.cv-numbered` `padding-left` 从 16px 加到 24px——`<ol>` 序号右对齐在这条 padding 槽内边缘，槽宽不够时往左溢出，Patents and Publications 到第 10 条时两位数的 "10." 在 9.6pt 下被页边距裁掉半个字；同时给 `::marker` 加 `font-variant-numeric: tabular-nums`。`cv/build-cv.js` 新增 `boldOwner()`，把 Grants 作者串里 CV 主人自己的名字加粗——grants.yml 存的是排好的作者串不是 bib 记录，`formatAuthors()` 够不着；只作用于 CV，About 页不受影响。`_data/profile/experience.yml` 把实验室名统一成 `XRAI (Extended Reality, Artificial Intelligence, and Robotics) Lab`（与 lab.md、home.md 一致），并补上 Advanced Robotics (INEN-6301) 与 Simulation of Industrial Systems (INEN-4375) 两门课，`teaching_experience` 同步；INEN-4375 是本科课，相应条目改成 "at the graduate and undergraduate levels"。`_data/profile/committee_memberships.yml` 跟进 ASME CIE 分委会 2025 年更名 VES → VARE：Secretary 任期收尾为 `2025 – 2026`，新增 `Vice Chair`（`2026 – Present`），2023 – 2025 的 Member-at-Large 发生在改名前保留 VES 原名。

**新论文。** `assets/ref.bib` 新增 AHFE 2026 合作论文 `@inproceedings{rahman2026human}`（A Human-Centered AI Task Management System for Cognitive Load Reduction and Decision Support in Industrial Plant Management，第六作者，PDF 在 `papers/AHFE-Paper-0637.pdf`）及对应的 `@incollection{talk2026ahfe_taskmanager}`（AHFE Hawaii International Conference，Dec 1–3 2026）。`volume`、`pages`、`url` 暂缺：手上是预印版，刊头仍印 "Vol. XXX"，页码不作数，DOI `10.54941/AHFE-Paper-0637` 目前解析不到页面，正式出版后补。PDF 的 `/Title` 元数据是 AHFE 模板残留（Hunt et al. 那篇），标题作者取自正文。

### [2.5.2] - 2026-09-22

**Research 项目写作页的地基（本次发布对访客还不可见）。** 新增 `_layouts/research_post.html`：每个 research 项目一篇长文，front matter 只写 `project_id`（research.yml 标题的 slug），作者 / mentors / 起止时间 / 关键词 / paper·slide·video 按钮全部由 layout 反查 research.yml 渲染，视频取 `site.data.videos`（`_plugins/videos.rb` 给每条 research 视频补 `project_id`，用 `Jekyll::Utils.slugify` 与 Liquid 同源），正文只写内容，元数据不会两边打架。配套把 `_pages/research.md` 里的作者链接和 links 按钮抽成 `_includes/research_people.html`、`_includes/research_links.html`，16:9 播放器容器从 `_videos.scss` 提成通用 `.embed-16x9`，`.research-meta` 等三条规则从 `.research-card-h` 里提到顶层——都是为了写作页和卡片页共用一套实现，不留要同步的副本。`_posts/` 下 17 篇项目写作占位文章全部 `published: false`，逐篇写完审核后改 `true`，research 卡片标题即自动变成链接；`_pages/blogs.md` 的 "Research Projects" chip 只在已发布数量大于零时渲染。新增 `_plugins/research_post_check.rb`，已发布的写作页若 `project_id` 对不上 research.yml 任何标题就直接构建失败——以前是元数据静默消失、构建照样绿。

**团队名单。** `_data/web/people.yml` 新增三名学生：Amrit Silwal（`master_advisor`）、Ayden J Hicks（`undergraduate_advisor`，专业未定故不写 `degree`）、Paniz Bioucki（`doctoral_advisor`）。`_pages/team.md` 的 Current Students 从一个大网格拆成按学位层级分组，分组依据就是上面这个 `mentoring_role`，和 about.md「Students and Mentoring」共用同一套 category 列表，一处改角色两处同时归位；无 `mentoring_role` 的条目落进末尾的无标题网格，不会消失。卡片 markup 抽成 `_includes/team_card.html`，组名样式 `.team-group-title` 沿用 alumni 表头那套全大写微标题语气。学号那行渲染注释掉（数据仍留在 `people.yml` 作内部记录）。`_data/profile/student_guidance.yml` 新增博士委员会成员 Arif Ibrahim Uyanik——委员会成员按惯例只进这个 CV 专用文件，所以只出现在 CV 的 Student Guidance 小节。

### [2.5.1] - 2026-09-17

新增博文《A Learning Path for Unity and XR Development》(`_posts/2026-09-17-unity-xr-learning-path.md`，分类 `Teaching & Learning`)：把零散的 Unity / VR / AR / 建模资源整合成分阶段学习路径。相对原始清单补齐几处关键缺口 —— Unity 下做 AR 的入口是 AR Foundation 而非直接写 ARCore / ARKit，VR 侧是 XR Interaction Toolkit + OpenXR 而非厂商 SDK；另加 Unity 基础与 C#、独立头显性能优化（on-device profiling、foveated rendering）、素材授权记录习惯、XR 无障碍，以及八周上手计划表。内链到已有的 Unity 版本控制、XR 关键词、目标期刊三篇。`forum.unity.com` 更新为 `discussions.unity.com`。

`docs/2026-09-17-research-project-pages-design.md`：per-project research writeup 页面的设计文档，仅内部记录，站点无改动。

### [2.5.0] - 2026-09-17

视频数据模型重做。原来 `/videos/` 按项目 `end_date` 排序、一个项目只能挂一条视频，两个假设都不成立（视频发布时间常和项目结束时间对不上，一个项目也可能出多条）。现在 `research.yml` 的 `links.video` 是列表 `[{url, date}]`、`teaching.yml` 的 project 视频与 `video_playlist` 各自带 `date`；新增 Jekyll generator `_plugins/videos.rb`，构建时把 research 与 teaching 的视频拍平成 `site.data.videos` 按各自日期全局倒序，YouTube / playlist ID 解析也从 Liquid 挪进 Ruby。`videos.md` 只负责按 `section` 过滤渲染，research 卡片的 Video 按钮支持多条（"Video 1" / "Video 2"），lab 页 "Recent Research" 改取最新一条研究视频。旧数据按原 `end_date` 回填 date，排序不变。同时补上 hurricane MR training 项目的演示视频。

卡片长简介收进 3 行 + "Show more"。抽成通用组件 `_sass/components/_clamp.scss`（`[data-clamp]` / `.js-clamp-text` / `.js-clamp-toggle`）加 site.js 里一个 IIFE，Videos / Research / Projects 三个页面共用。按钮只在文字真被截断时出现——判断不能用 `scrollHeight > clientHeight`，`-webkit-line-clamp` 元素在 Chromium 里两者恒等，改成临时解除 clamp 量完整高度再还原；被筛选隐藏（高度 0）的卡片跳过不误判。clamp 规则挂在 `.js` 下（`head.html` pre-paint 脚本加该 class），无 JS 时显示完整全文而不是展不开的截断。另修 `footer.html`：`site.min.js` 一直没有 `?v=` 缓存参数（`main.css` 早有），导致改了 JS 回访用户仍跑旧脚本。

内容与排版：新增研究项目 "Predictive and Safe Human-Aware Mobile Robot Navigation"（Lamar 2026 SRUF 本科生 fellowship，Justin Barrera 主导，mentors HomChaudhuri / Yang），people.yml 相应新增该 collaborator 与 student；新增博客「Presentation Strategy by Venue」并把 presentation 系列三篇互相内链；博客里的 markdown 表格补上三线表（booktabs）样式，窄屏改为表格自身横向滚动。

### [2.4.3] - 2026-09-05

`_data/profile/teaching.yml`：INEN 5301-05 Collaborative Robot Operations and Programming 的 `semesters` 加 "Fall 2026"。

INEN 5301-05 与 INEN 4375 两门课加课程视频 playlist：teaching.yml 各自新增 `video_playlist` 字段（YouTube watch+list URL）+ `links` 里一条 `playlist?list=` 链接。`_pages/videos.md` 的 "Teaching & Student Project Videos" 段扩展：course 带 `video_playlist` 且 URL 含 `list=` 时，取出 list id 嵌入 `youtube.com/embed/videoseries?list=<id>` 播放器。teaching 页 links 块本就渲染，无模板改动。

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
