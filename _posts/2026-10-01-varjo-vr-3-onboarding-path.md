---
layout: post
title: "Getting Started with the Varjo VR-3"
date: 2026-10-01
categories: ["Teaching & Learning"]
tags: ["equipment", "varjo", "virtual-reality", "eye-tracking", "tutorial"]
equipment_id: varjo-vr-3
---

The Varjo VR-3 is the headset students use when what a person sees, and where they look, is the measurement. Its center of view renders at 70 pixels per degree, and its built-in eye tracker runs at 200 Hz. Everyone who starts on it asks what to learn first, and the answer is the same for everyone, so it lives here.

The order below matters more than the volume. Step 1 is a prerequisite for putting the headset on anyone. Steps 2 and 3 depend on whether your project records gaze and whether you build your own application.

## How to use this

- **Never update Varjo Base past version 4.14.** Varjo ended support for the VR-3 on January 1, 2026. Version 4.14 is the last release that works with it; later versions require Varjo's newer XR-4 headsets. One accepted update prompt breaks the headset for every project in the lab.
- **It runs from the lab's VR computer, not your laptop.** The VR-3 needs a Windows PC with two DisplayPort outputs and two USB ports for its cables, which almost no laptop has.
- **Calibrate the eye tracker every time the headset goes on**, even if it is the same person who just took it off. Uncalibrated gaze data looks plausible and is wrong.
- **Running anyone other than yourself is human-subjects research.** It needs an approved IRB protocol before the first session.
- **You can practice on the headset while you work through the material.** If you need access for that, ask me and I will arrange it — time on the VR-3 is arranged through me, not self-served.
- **Everything below is free**, though downloading software from Varjo needs a free Varjo account.

## 1. Setup and tracking

Start here regardless of what your project is about. This is the required first step.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [Setting up XR-3 and VR-3](https://support.varjo.com/hc/en-us/setting-up-xr-3-vr-3) | Varjo's setup guide | Varjo Base, connecting the headset, and the first-time setup |
| [Setting up SteamVR Tracking](https://support.varjo.com/hc/en-us/setting-up-steamvr-tracking) | Varjo's tracking guide | How the base stations track the headset, and how to place them |
| [Room setup in SteamVR Tracking](https://support.varjo.com/hc/en-us/room-setup-steamvr-tracking) | Varjo's room setup steps | Redoing tracking after anything in the room moves |
| [End of support for XR-3, VR-3, and Aero](https://support.varjo.com/hc/en-us/end-of-support-for-older-generation-models-xr-3-vr-3-and-varjo-aero) | Varjo's support notice | What still works, and why we stay on Varjo Base 4.14 |

The VR-3 does not track itself. SteamVR base stations mounted around the room watch the headset, so it needs SteamVR installed alongside Varjo Base. Run a new room setup from Varjo Base whenever a base station has moved, and before a study session if anyone has rearranged the room.

Read the end-of-support notice once, so you understand the constraint: the headset still works fully on Varjo Base 4.14, but there will be no more updates, bug fixes, or out-of-warranty repairs. Treat it with that in mind.

## 2. Eye tracking and gaze data

Relevant if your project uses gaze, pupil size, or foveated rendering.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [Eye tracking with Varjo headsets](https://developer.varjo.com/docs/get-started/eye-tracking-with-varjo-headset) | Varjo developer guide | How the tracker works, enabling it, and calibration |
| [Gaze data logging](https://developer.varjo.com/docs/get-started/gaze-data-collection) | Varjo developer guide | Recording gaze to a file from Varjo Base, with no code |
| [Developer tools in Varjo Base](https://developer.varjo.com/docs/get-started/developer-tools-in-varjo-base) | Varjo developer guide | What Varjo Base offers developers beyond running the headset |

Eye tracking is off until you turn on **Allow eye tracking** in the System tab of Varjo Base. For a first study, you may not need to write any gaze code at all: with **Log eye tracking data** turned on under Settings > Eye tracking, a Varjo Base recording saves a video and a matching CSV of gaze, pupil, and eye-openness data to the Videos/Varjo folder.

If a participant takes the headset off partway through, calibrate again before you continue logging. Write that into your protocol, not just your memory.

## 3. Building for the VR-3

Relevant if your project runs its own application rather than an existing one.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [A Learning Path for Unity and XR Development](/blogs/unity-xr-learning-path/) | My guide to Unity and XR | Start here if Unity is new to you; it applies to every headset |
| [Varjo and OpenXR](https://developer.varjo.com/docs/openxr/openxr) | Varjo's OpenXR documentation | The cross-vendor route, and the default for new projects |
| [Varjo Unity XR SDK](https://developer.varjo.com/docs/unity-xr-sdk/unity-xr-sdk) | Varjo's Unity plugin | Varjo-specific features in Unity, including eye tracking |
| [Varjo for Unreal Engine 5](https://developer.varjo.com/docs/unreal/ue5/unreal5) | Varjo's Unreal guide | If your project is in Unreal instead of Unity |
| [Varjo Native SDK](https://developer.varjo.com/docs/native/varjo-native-sdk) | Varjo's C++ SDK | Lowest-level access, for custom tools and data pipelines |

Build against OpenXR unless you need something only Varjo's own plugin provides. Varjo's developer documentation is now written for the XR-4 and assumes the latest Varjo Base. Before you adopt a plugin release, check which Varjo Base version it needs; if it needs anything newer than 4.14, use an older release of the plugin instead.

## What comes next

Once you have worked through the steps relevant to your project, come see me and we will scope a first session on the headset. Bring a specific question you want to measure and your IRB status; "learn the headset" is not a study and you have already done it by this point.
