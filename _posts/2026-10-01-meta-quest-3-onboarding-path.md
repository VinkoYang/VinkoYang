---
layout: post
title: "Getting Started with the Meta Quest 3 and 3S"
date: 2026-10-01
categories: ["Teaching & Learning"]
tags: ["equipment", "meta-quest", "mixed-reality", "virtual-reality", "unity", "tutorial"]
equipment_id: meta-quest-3-3s
---

The Quest 3 and Quest 3S are the lab's standalone headsets: no PC, no cables, no base stations, and full-color passthrough for mixed reality. They are the default target for student XR projects, because a build that runs on a Quest can be shown anywhere. Everyone who starts on them asks what to learn first, and the answer is the same for everyone, so it lives here.

The order below matters more than the volume. Step 1 is a prerequisite for putting a headset on anyone. Step 2 is required before you install your own builds; steps 3 and 4 depend on what you are building.

## How to use this

- **The two models are not interchangeable in a study.** The Quest 3 has pancake lenses, 2064 × 2208 pixels per eye, a 110° horizontal field of view, and continuous lens-spacing adjustment. The Quest 3S has Fresnel lenses, 1832 × 1920 pixels per eye, a 96° field of view, and three lens-spacing positions. Anything perceptual will differ between them, so pick one model per study and record which one you used.
- **Set up the boundary in every new space.** Someone in a headset cannot see the desk edge, and passthrough does not make that safe on its own.
- **Running anyone other than yourself is human-subjects research.** It needs an approved IRB protocol before the first session, and participants should read Meta's health and safety warnings first.
- **These are shared headsets.** Ask me before you change the account on a headset, factory-reset it, or install anything other than your own builds.
- **You can practice on a headset while you work through the material.** If you need access for that, ask me and I will arrange it — time on the headsets is arranged through me, not self-served.
- **Everything below is free.**

## 1. Using the headset safely

Start here regardless of what your project is about. This is the required first step.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [Health and Safety Warnings](https://www.meta.com/legal/quest/health-and-safety-warnings/) | Meta's official warnings | Who should not use the headset, and the symptoms that mean stop now |
| [Set up your boundary](https://www.meta.com/help/quest/articles/in-vr-experiences/oculus-features/boundary/) | Meta Quest Help | Drawing the safe play area for each new space |
| [Quest 3S vs. Quest 3](https://www.meta.com/quest/compare/) | Meta's comparison page | The full spec differences between our two models |

Read the health and safety warnings yourself before you hand them to a participant; you are the one who has to recognize the signs of cybersickness and end a session. Then practice drawing a boundary until it takes you under a minute.

## 2. Developer setup

Required before you install your own builds.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [Set up your headset for development](https://developers.meta.com/horizon/documentation/unity/unity-env-device-setup/) | Meta developer guide | Developer mode, USB debugging, and connecting to your computer |
| [Meta Quest Developer Hub](https://developers.meta.com/horizon/documentation/unity/ts-mqdh/) | Meta's desktop tool | Installing builds, reading device logs, casting, and recording the headset view |
| [Use Link for app development](https://developers.meta.com/horizon/documentation/unity/unity-link/) | Meta developer guide | Running a Unity project on the headset straight from the Editor, without building |
| [Set up Link and Air Link](https://www.meta.com/help/quest/articles/headsets-and-accessories/oculus-link/) | Meta Quest Help | Connecting the headset to a Windows PC by cable or Wi-Fi |

Budget an afternoon for this the first time. Developer mode, USB debugging, and Android build settings are a separate skill from Unity, and they block everything downstream. Once they work, Link makes the edit-and-test loop much faster than building every time, but always test the final build on the headset itself: Link runs on the PC's hardware, and the headset's own performance is what your users will get.

## 3. Building applications

Relevant if your project builds its own application, which most do.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [A Learning Path for Unity and XR Development](/blogs/unity-xr-learning-path/) | My guide to Unity and XR | The full path from Unity basics to on-device performance |
| [Meta Horizon OS for Unity](https://developers.meta.com/horizon/develop/unity/) | Meta's Unity documentation hub | Build settings, platform features, and the Meta XR packages |
| [Building Blocks](https://developers.meta.com/horizon/documentation/unity/unity-building-blocks-overview/) | Meta's drag-in components | Passthrough, hands, and common interactions without writing setup code |
| [Interaction SDK](https://developers.meta.com/horizon/documentation/unity/unity-isdk-interaction-sdk-overview/) | Meta's interaction library | Grabbing, poking, and hand-tracked interaction done properly |

The learning path covers Unity itself, interaction design, comfort, and performance; this step only adds the Quest-specific layer. Building Blocks are the fastest way to a working prototype. Learn what each block adds to your scene, though, because you will need to change it later.

## 4. Mixed reality

Relevant if your project blends virtual content with the real room.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [Passthrough API](https://developers.meta.com/horizon/documentation/unity/unity-passthrough/) | Meta developer guide | Showing the real room behind or around your virtual content |
| [Passthrough Camera API](https://developers.meta.com/horizon/documentation/unity/unity-pca-overview/) | Meta developer guide | Reading the camera images in your own code, for computer vision |

Start with the Passthrough API, which displays the room but does not give your code the images. Move to the Passthrough Camera API only when your project needs to analyze what the cameras see, such as detecting objects. It needs extra permissions, and if participants are recorded, your IRB protocol has to say so.

## What comes next

Once you have worked through the steps relevant to your project, come see me and we will scope a first build. Bring a specific thing you want the headset to do; "learn the headset" is not a task and you have already done it by this point.
