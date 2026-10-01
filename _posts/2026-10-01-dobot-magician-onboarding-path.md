---
layout: post
title: "Getting Started with the Dobot Magician"
date: 2026-10-01
categories: ["Teaching & Learning"]
tags: ["equipment", "dobot", "robot-arm", "robotics", "education", "tutorial"]
equipment_id: dobot-magician-robotic-arm
---

The Dobot Magician is the lab's teaching arm. It is a small 4-axis arm that sits on a desk, and we have ten of them, so a whole class can each have one. It is where students first program a robot: teach it points, swap its tools, and then drive it from code. Everyone who starts on it asks what to learn first, and the answer is the same for everyone, so it lives here.

The order below matters more than the volume. Step 1 is a prerequisite for using the arm at all. Steps 2 and 3 depend on what you are doing with it.

## How to use this

- **Dobot's manuals and software sit behind download buttons on its product page.** There are no direct links to give you. Below, each file is named exactly as it appears under **Downloads** on the [Dobot Magician page](https://www.dobot-robots.com/products/education/magician.html); open that section and look for the name.
- **Use DobotLab, Dobot's current software.** The older DobotStudio and DobotBlock still appear on the download list. Pick one program for a whole class so everyone's screen matches the instructions.
- **Do not update or reflash the firmware without asking me.** The firmware tools are on the download list too. Ten arms on ten different firmware versions is how a class lab falls apart.
- **Keep loads light.** The arm is rated for 500 g; stay well under that, and well inside its 320 mm reach.
- **You can practice on an arm while you work through the material.** If you need access outside a scheduled lab, ask me and I will arrange it — the arms are signed out through me, not self-served.
- **Everything below is free.**

## 1. Setup and first moves

Start here regardless of what you are doing. This is the required first step.

| Resource | Where to find it | Why bother |
| --- | --- | --- |
| Dobot Magician V2 User Guide (DobotLab-based) | Product page → Downloads → User Manual | Setting up, teach and playback, writing and drawing, 3D printing, and Blockly |
| DobotLab Win Local version V2.3.4 | Product page → Downloads → Control Software | The program you will run the arm from |
| DobotLink Win Local version V6.7.4 | Product page → Downloads → Control Software | The connection service DobotLab uses to talk to the arm |
| [RobotLAB Standard Edition page](https://www.robotlab.com/store/dobot-magician-v3-standard-edition/) | RobotLAB's store | What came in the box, so you know which tools you have |

Dobot's current user guides are titled "Magician V2"; those are the ones written for DobotLab. Work through the guide's setup and teach-and-playback sections with the arm in front of you: connect it, move it by hand and by the on-screen controls, record a few points, and play them back. That is the whole of step 1, and everything after it builds on it.

## 2. Tools: suction, gripper, pen, and 3D printing

Relevant once you can move the arm. Each tool mounts on the end of the arm in place of the others.

| Tool | What it does | Notes |
| --- | --- | --- |
| Suction cup | Picks up flat, smooth objects | 20 mm cup; the simplest pick-and-place tool |
| Gripper | Picks up objects by their sides | 27.5 mm opening, 8 N grip |
| Pen holder | Writing, drawing, and plotting | Takes pens up to 10 mm across |
| 3D printing kit | Prints small PLA parts | Up to 150 × 150 × 150 mm; see the slicing parameters file under Downloads → Other |

The user guide has its own sections on writing and drawing and on 3D printing. Start with suction, which forgives the most; move to the gripper once your points are accurate, because a gripper that closes a few millimeters off target simply misses. Before 3D printing, read the guide's chapter and the "Reptier-Host & Cura 3D Printing Slicing Parameters for Magician" file. The print head gets hot; let it cool before you touch it or swap tools.

Specs for each tool: [Standard Edition Tool Kit](#accessory-standard-edition-tool-kit) under Accessories below.

## 3. Programming

Relevant once teach-and-playback is no longer enough.

| Resource | Where to find it | Why bother |
| --- | --- | --- |
| Blockly in DobotLab | Built into DobotLab | Block programming: loops and conditions without syntax errors |
| DOBOT Magician API Description v1.2.3 | Product page → Downloads → Secondary Development | Every command the arm accepts from code |
| Dobot Demo (DOBOT Magician) v2.3 | Product page → Downloads → Secondary Development | Dobot's official example programs |
| Dobot Communication Protocol (DOBOT Magician) v1.1.5 | Product page → Downloads → Secondary Development | The serial protocol underneath, if you write your own driver |
| [pydobot](https://github.com/luismesas/pydobot) | Community Python library on GitHub | A short path to Python control over USB; unofficial, last updated in 2021 |

Do a task in Blockly first, then rewrite the same task in Python. If you already know what the program should do, the only new thing is the API. Dobot's ROS demo on the download list dates from 2019 and targets ROS 1; for ROS 2 work, use one of the lab's other arms.

## Accessories on our Dobot Magicians

These come with each arm. Each entry lists where to find the maker's documentation.

{% include equipment_accessories.html equipment_id=page.equipment_id %}

## What comes next

Once you have worked through the steps relevant to your project, come see me and we will scope a first task. Bring a specific thing you want the arm to do; "learn the robot" is not a task and you have already done it by this point.
