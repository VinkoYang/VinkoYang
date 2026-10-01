---
layout: post
title: "Getting Started with the HTC VIVE Pro and VIVE Trackers"
date: 2026-10-01
categories: ["Teaching & Learning"]
tags: ["equipment", "htc-vive", "vive-tracker", "virtual-reality", "motion-tracking", "tutorial"]
equipment_id: htc-vive-pro
---

The VIVE Pro is the headset students use when the real world has to show up in VR: a tool in the participant's hand, a robot moving next to them, or the participant's own feet. That comes from the VIVE Trackers, small pucks that the same base stations track as precisely as the headset. Everyone who starts on it asks what to learn first, and the answer is the same for everyone, so it lives here.

The order below matters more than the volume. Step 1 is a prerequisite for putting the headset on anyone. Steps 2 and 3 depend on whether your project uses trackers and whether you build your own application.

## How to use this

- **It runs from the lab's VR computer through SteamVR.** The headset connects to a Windows PC through its link box, and the base stations mounted in the room track it. Use the PC it is set up on.
- **Do not move the base stations.** Tracking depends on where they are. If one is moved or knocked, redo the room setup in SteamVR before anyone puts the headset on.
- **Running anyone other than yourself is human-subjects research.** It needs an approved IRB protocol before the first session.
- **HTC has moved on from the VIVE Pro**; its product page now redirects to the VIVE Pro 2. The support pages and SteamVR still work, but treat the hardware with care: a broken part may be hard to replace.
- **You can practice on the headset while you work through the material.** If you need access for that, ask me and I will arrange it — time on the VIVE Pro is arranged through me, not self-served.
- **Everything below is free.**

## 1. Headset, base stations, and play area

Start here regardless of what your project is about. This is the required first step.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [VIVE Pro User Guide (PDF)](https://dl4.htc.com/Web_materials/Manual/Vive_Pro(Enterprise)/UserGuide/VIVE_Pro_User_Guide.pdf) | HTC's 72-page guide | System requirements, the link box, base stations, play area, and care |
| [VIVE Pro support](https://www.vive.com/us/support/vive-pro-hmd/) | HTC's support site | Troubleshooting and firmware |
| [SteamVR](https://store.steampowered.com/app/250820/SteamVR/) | Valve's VR runtime | The software that runs the headset, base stations, and trackers |

From the user guide, read the headset section, the base station section, and the play area section. A room-scale play area needs at least 2 m × 1.5 m of clear floor. The base stations sit diagonally at opposite corners, above head height (ideally more than 2 m), angled down. Fit the headset properly every time, including the interpupillary distance (IPD) knob; a badly adjusted headset gives blurry images and tired eyes, and it changes what participants perceive.

## 2. VIVE Tracker (3.0)

Relevant if your project tracks anything besides the headset and controllers.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [VIVE Tracker (3.0) support](https://www.vive.com/us/support/tracker3/) | HTC's support pages | Pairing, charging, and firmware |
| [Developer Guidelines (PDF)](https://developer.vive.com/documents/850/HTC_Vive_Tracker_3.0_Developer_Guidelines_v1.1_06022021.pdf) | HTC's 45-page developer guide | Mounting rules, the five supported use cases, and Unity setup |

A tracker pairs from SteamVR: plug in its wireless dongle, choose Pair Controller, and hold the tracker's power button for two seconds. It can also send its data over a USB cable instead.

How you mount it decides how well it tracks. The guidelines spell it out: the tracker sees 240° around itself, so nothing should block that view, and metal parts of a mount should stay at least 30 mm from its antenna. Reflective or white surfaces near the tracker can confuse the base stations, so avoid them on a mount. Use the 1/4-inch screw and the pin recess so it cannot rotate. A tracker that wobbles on its mount adds that wobble to every measurement.

Specs and links for the tracker: [VIVE Tracker (3.0)](#accessory-vive-tracker-3-0) under Accessories below.

## 3. Building for the VIVE Pro

Relevant if your project runs its own application.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [A Learning Path for Unity and XR Development](/blogs/unity-xr-learning-path/) | My guide to Unity and XR | Start here if Unity is new to you; it applies to every headset |
| [OpenXR](https://www.khronos.org/openxr/) | The cross-vendor XR standard | What SteamVR exposes to Unity and Unreal, and what to build against |
| [VIVE Input Utility](https://github.com/ViveSoftware/ViveInputUtility-Unity) | HTC's Unity toolkit | Reading trackers in Unity and assigning each one a role, such as left foot or tool |

Build against OpenXR through SteamVR. For trackers in Unity, give each tracker a fixed role (for example, "right foot" or "robot base") rather than relying on the order they connect. Then you can swap a tracker with a low battery without changing your code.

## Accessories on our VIVE Pro

These are used with our headset. Each entry lists the maker's documentation where it exists.

{% include equipment_accessories.html equipment_id=page.equipment_id %}

## What comes next

Once you have worked through the steps relevant to your project, come see me and we will scope a first session with the headset. Bring a specific thing you want to track or measure; "learn the headset" is not a task and you have already done it by this point.
