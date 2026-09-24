---
layout: post
title: "Getting Started with the UR10e Cobot"
date: 2026-09-24
categories: ["Teaching & Learning"]
tags: ["equipment", "ur10e", "cobot", "robotics", "collaborative-robot", "tutorial"]
equipment_id: universal-robots-ur10e
---

Every student who joins a project on the UR10e asks some version of the same question: what do I need to know before I am allowed to touch it? This post is the answer, and it is the same answer for everyone, so it lives here rather than in my outbox.

The order below matters more than the volume. Work through it top to bottom. Steps 1 and 2 are prerequisites for anything hands-on; steps 3 and 4 depend on what your project actually uses, and you can stop after step 2 if your work never touches the camera or the LiDAR safety system.

## How to use this

- **Do step 1 before you touch the robot.** Not because of the paperwork, but because PolyScope makes very little sense until you have seen it explained once, and a confused operator next to a 12.5 kg-payload arm is the exact situation the safety training exists to prevent.
- **You can practice on the physical robot while you work through the material.** If you need access for that, ask me and I will arrange it. Do not wait until you have "finished" the e-learning — that moment never arrives.
- **Read the manual sections you are about to use, not the whole thing.** The user manual is a reference, not a course. Operation, safety, and I/O are the sections that pay for themselves immediately.
- **Everything below is free**, though the UR Academy requires a free account.

## 1. Universal Robots fundamentals

Start here regardless of what your project is about. This is the required first step.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [UR e-Series e-Learning](https://academy.universal-robots.com/free-e-learning/e-series-e-learning/) | Official module series from UR Academy | The baseline for everything else. Register a free account to unlock all modules. |

The modules cover the robot hardware, the PolyScope interface, basic program structure, and safety. By the end you should be able to jog the arm, build a simple waypoint program, and explain what a safety configuration limit is and why you cannot change it casually.

## 2. The UR10e user manual

Read this after the e-learning, or in parallel with it. The modules teach you the platform; the manual tells you about the specific arm in our lab.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [UR10e User Manual (PDF)](https://www.universal-robots.com/manuals/EN/PDF/SW5_19/user-manual-UR10e-PDF_online/711-039-00_UR10e_User_Manual_en_Global.pdf) | The full manual for our model | Model-specific limits, safety functions, and electrical interfaces |

Focus on the sections covering **operation**, **safety**, and **I/O**. The I/O chapter in particular is the one people skip and then lose an afternoon to, because every gripper, sensor, and conveyor handshake on our setup eventually comes back to a tool or controller I/O pin.

## 3. Camera and vision

Relevant if your project involves the wrist camera — object detection, part location, or any vision-guided pick.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [Wrist Camera Advanced Parameters](https://elearning.robotiq.com/course/view.php?id=5#section-0) | Robotiq e-learning course | Exposure, focus, and detection parameters — the settings that decide whether your snapshot works |
| [Wrist Camera Instruction Manual (PDF)](https://assets.robotiq.com/website-assets/support_documents/document/Wrist_20Camera_Instruction_20Manual_PDF_20210406.pdf) | Robotiq reference manual | Mounting, calibration, and the camera node's behavior in a program |

Take the course first and the manual second. Most early vision failures are not algorithmic — they are lighting, exposure, or a teach-object step done under conditions that no longer hold.

## 4. LiDAR and human–robot collaboration

Relevant if your project involves shared workspace, speed-and-separation monitoring, or any question about what the robot does when a person walks up to it.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [UR Marketplace: LiDAR safety solution](https://www.universal-robots.com/marketplace/products/01tP40000071NhmIAE/) | Product page for the LiDAR-based safety system | What the hardware actually provides, and where it sits in the safety chain |
| [LiDAR-based safety in HRC](https://www.mdpi.com/1424-8220/23/9/4305) | Research paper, *Sensors* 23(9):4305 | The research framing: how zone monitoring translates into collaborative operation |

Read the product page for the mechanism and the paper for the reasoning. The distinction that matters here is between a safety function that is *certified* and a perception feature that is merely *useful* — collaborative operation depends entirely on which one you are relying on.

## What comes next

Once you have worked through the steps relevant to your project, come see me and we will scope a first task on the actual hardware. Bring a specific thing you want the arm to do; "learn the robot" is not a task and you have already done it by this point.
