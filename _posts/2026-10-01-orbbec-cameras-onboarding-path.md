---
layout: post
title: "Getting Started with Our Orbbec Depth Cameras"
date: 2026-10-01
categories: ["Teaching & Learning"]
tags: ["equipment", "orbbec", "depth-camera", "computer-vision", "ros2", "tutorial"]
equipment_id: ["orbbec-astra-3d-camera", "orbbec-gemini-335l"]
---

The lab has two kinds of Orbbec depth camera: three Astra+ units and one Gemini 335L. Both give you a color image and a depth image you can turn into a point cloud, and both plug in over USB-C. They are different generations, though, and the most common way to lose a day is to install the software for one and plug in the other. This post covers both, because the first thing to learn is which is which.

The order below matters more than the volume. Step 1 is for everyone. Then do step 2 or step 3 for the camera you are using, and step 4 once you have frames coming in.

## How to use this

- **Each camera needs its own SDK.** The Astra+ works only with Orbbec SDK v1, which Orbbec now keeps in limited maintenance. The Gemini 335L is supported by both, but Orbbec recommends SDK v2 for it. SDK v2 does not support the Astra+ at all. The same split applies to the ROS 2 driver: the `main` branch for the Astra+, the `v2-main` branch for the Gemini 335L.
- **If your project uses both models, tell me before you start**, so we can plan the software for both instead of finding the conflict halfway through.
- **Look at the camera in Orbbec Viewer before you write code.** Each SDK release comes with a viewer for its cameras. If the image is bad in the viewer, your code will not fix it.
- **You can borrow a camera while you work through the material.** Ask me and I will arrange it; the cameras are signed out through me, not self-served.
- **Everything below is free**, and the SDKs and ROS 2 driver are open source.

## 1. Choosing the right camera

Start here regardless of what your project is about.

| | Astra+ (×3) | Gemini 335L (×1) |
| --- | --- | --- |
| Depth technology | Structured light | Active and passive stereo |
| Depth range | 0.6–8 m | Optimal 0.25–6 m; works from 0.17 m |
| Depth resolution | Up to 1280 × 1024 at 30 fps | Up to 1280 × 800 at 30 fps |
| Depth field of view | 58.4° × 45.5° | 90° × 65° |
| Color | Up to 1920 × 1080 at 30 fps | Up to 1280 × 800 at 60 fps |
| Environment | Indoors only | Indoors or outdoors, IP65 |
| IMU | No | Yes |
| Software | Orbbec SDK v1 only | Orbbec SDK v2 (recommended) |

| Resource | What it is | Why bother |
| --- | --- | --- |
| [Astra+ product page](https://www.orbbec.com/products/structured-light-camera/astra-3/) | Orbbec's specs for the Astra+ | Range, precision, field of view, and power |
| [Gemini 335L product page](https://www.orbbec.com/products/stereo-vision-camera/gemini-335l/) | Orbbec's specs for the Gemini 335L | Range, precision, field of view, and environment rating |

The Astra+ projects its own infrared pattern to measure depth, which works well indoors but is washed out by sunlight. Use it for fixed, indoor setups where 0.6 m minimum range is not a problem. The Gemini 335L is the one to mount on a robot: it sees much closer, has a wider view, tolerates outdoor light and dust, and its IMU tells you how the camera itself is moving. With three Astra+ units and one Gemini 335L, multi-camera setups will usually be Astra+.

## 2. Astra+ software (Orbbec SDK v1)

Relevant if you are using an Astra+.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [Orbbec SDK v1](https://github.com/orbbec/OrbbecSDK) | The SDK that supports the Astra+, with C and C++ samples | Opening the camera and reading color, depth, and point clouds |
| [Orbbec SDK v1 releases](https://github.com/orbbec/OrbbecSDK/releases) | Prebuilt downloads | The SDK and the v1 Orbbec Viewer for Windows and Linux |
| [ROS 2 driver, `main` branch](https://github.com/orbbec/OrbbecSDK_ROS2/tree/main) | Orbbec's ROS 2 wrapper built on SDK v1 | Depth, color, and point clouds as ROS 2 topics |

When you build the ROS 2 driver, check out the `main` branch explicitly. The repository's default branch is `v2-main`, which is the one that does not support the Astra+.

## 3. Gemini 335L software (Orbbec SDK v2)

Relevant if you are using the Gemini 335L.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [Gemini 330 series documentation](https://www.orbbec.com/docs/orbbec-gemini-330-series-documentation/) | Orbbec's setup and tuning guide for the series | Depth presets, exposure, firmware, and calibration |
| [Gemini 330 series datasheet](https://www.orbbec.com/docs/g330-orbbec-gemini-330-series-datasheet/) | Full specifications for the series | Exact ranges, precision, and interfaces for the 335L |
| [Orbbec SDK v2](https://github.com/orbbec/OrbbecSDK_v2) | The recommended SDK for the Gemini 335L, with C and C++ samples | Opening the camera, aligning depth to color, and reading frames and IMU data |
| [Orbbec SDK v2 releases](https://github.com/orbbec/OrbbecSDK_v2/releases) | Prebuilt downloads | The SDK and the v2 Orbbec Viewer |
| [ROS 2 driver, `v2-main` branch](https://github.com/orbbec/OrbbecSDK_ROS2/tree/v2-main) | Orbbec's ROS 2 wrapper built on SDK v2 | Depth, color, point clouds, and IMU as ROS 2 topics |
| [ROS 2 driver documentation](https://orbbec.github.io/OrbbecSDK_ROS2/) | The wrapper's own manual | Installing the driver, launch files, and parameters |

The 335L is a member of Orbbec's Gemini 330 series, so most of its documentation is written for the whole series. Learn the depth presets in Orbbec Viewer before you collect data: they trade range, accuracy, and noise against each other, and the default is not always the right one for your scene.

## 4. Using depth well

Relevant once you have frames coming in, on either camera.

- **Align depth to color before you combine them.** The depth and color images come from different sensors with different fields of view. Both SDKs can align one to the other; use that rather than overlaying raw images.
- **Know where your camera is.** A point cloud is in the camera's own frame. If a robot or a second camera needs to use it, you need the camera's position and orientation relative to them. Measure or calibrate it, write it down, and keep the mount from moving.
- **Check depth against something you can measure.** Put a flat board at a known distance and compare. It takes ten minutes and tells you whether your setup is within the precision Orbbec quotes.

## What comes next

Once you have worked through the steps for your camera, come see me and we will scope a first task. Bring a specific thing you want the camera to measure; "learn the camera" is not a task and you have already done it by this point.
