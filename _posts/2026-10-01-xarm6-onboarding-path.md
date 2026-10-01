---
layout: post
title: "Getting Started with the UFACTORY xArm 6"
date: 2026-10-01
categories: ["Teaching & Learning"]
tags: ["equipment", "xarm6", "cobot", "robotics", "collaborative-robot", "tutorial"]
equipment_id: ufactory-xarm-6
---

The xArm 6 is the arm students reach for when a project needs code rather than a teach pendant: perception-driven manipulation, a ROS 2 pipeline, or a human–robot interaction study. Everyone who starts on it asks what to learn first, and the answer is the same for everyone, so it lives here.

The order below matters more than the volume. Work through it top to bottom. Steps 1 and 2 are prerequisites for anything hands-on; steps 3 and 4 depend on what your project actually uses. If you only need to teach waypoints and run the gripper, you can stop after step 2.

## How to use this

- **Read the safety chapter before you power the arm on.** The xArm is light, but it still moves at up to 1 m/s, and a script that sends the wrong target does not hesitate the way a person at a pendant does. Know where the E-stop is and what a collision-detection stop looks like before you run anything.
- **You can practice on the physical robot while you work through the material.** If you need access for that, ask me and I will arrange it — hands-on time on the arm is arranged through me, not self-served.
- **Drive it by hand in UFACTORY Studio before you drive it from code.** Every SDK call has a Studio equivalent, and seeing the motion once in Studio makes the API much easier to read.
- **Everything below is free**, and the SDKs are open source.

## 1. Hardware and safety

Start here regardless of what your project is about. This is the required first step.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [xArm 6 setup in under 10 minutes](https://www.youtube.com/watch?v=-GTDo5FAguU) | Two-minute video from Generation Robots, a UFACTORY reseller | Mounting, first moves, and the Blockly, Python, and ROS 2 options at a glance |
| [xArm User Manual (PDF)](https://drive.google.com/uc?export=download&id=1esoWKWnYBmg_75BJhsNIqrEs2S6HhdbJ) | UFACTORY's manual for the arm and control box (1305 models) | Safety rules, installation, electrical interfaces, and technical specs |
| [xArm User Manual (online)](https://docs.xarm.ufactory.cc/1.safety.html) | The same manual as web pages | Easier to search and link to a single chapter |
| [X-Arm Robot Downloads](https://www.ufactory.us/downloads) | UFACTORY USA's download page | Every manual, the arm's 3D models, and the accessory files in one place |

Watch the video first; it shows in two minutes what the manual takes chapters to describe. Then read the manual. Focus on **safety**, the **controller electrical interface**, and the **technical specifications**. The controller I/O chapter is the one people skip and then come back to, because the E-stop, the safeguard inputs, and any external sensor you add all run through it.

## 2. UFACTORY Studio

Read this after step 1, with the arm in front of you. Studio is UFACTORY's own interface for the arm: you jog it, teach positions, and build programs in Blockly without writing code.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [UFACTORY Studio](https://www.ufactory.us/ufactory-studio) | UFACTORY USA's Studio page | What Studio can do, and where to get it |
| [UFACTORY Studio User Manual (online)](https://docs.ufactory.cc/user_manual/ufactoryStudio/1.preface.html) | The full Studio manual | Connecting, jogging, teaching points, Blockly programs, and settings |
| [UFACTORY Studio User Manual (PDF)](https://www.ufactory.cc/wp-content/uploads/2025/05/UFACTORY_Studio_User_Manual_V2.6.0.pdf) | Version 2.6.0 as a single file | For reading offline |

By the end you should be able to enable the arm, jog it in joint and Cartesian space, set the TCP and payload for the gripper, open and close the gripper, and run a short Blockly program. Also find the collision sensitivity setting and understand why it should not be turned down to stop a program from tripping.

The gripper's own controls in Studio are covered in its manual: [X-Arm Gripper](#accessory-x-arm-gripper) under Accessories below.

## 3. Programming from code

Relevant if your project controls the arm from a script, a research pipeline, or ROS 2, which on this arm is most projects.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [xArm Python SDK](https://github.com/xArm-Developer/xArm-Python-SDK) | UFACTORY's official Python library, with examples | The fastest way to move the arm and the gripper from code |
| [UFACTORY API documentation](https://docs.api.ufactory.cc/) | Reference for the Python SDK, Modbus TCP, G-code, and other interfaces | Look up exact call names, units, and error codes |
| [xArm Developer Manual (PDF)](https://www.ufactory.cc/wp-content/uploads/2026/04/xArm-Developer-Manual-V2.0.1.pdf) | Communication protocol and controller reference | What happens under the SDK, if you need a language it does not cover |
| [xarm_ros2](https://github.com/xArm-Developer/xarm_ros2) | Official ROS 2 packages, one branch per ROS 2 distro | MoveIt 2 planning, Gazebo simulation, and driving the real arm from ROS 2 |
| [xarm_ros](https://github.com/xArm-Developer/xarm_ros) | Official ROS 1 driver | Only for older projects that still run ROS 1 |

Start with the Python SDK examples and run each one on the arm with the speed turned down. Move to `xarm_ros2` only when your project needs motion planning, simulation, or other ROS 2 nodes. Pick the branch that matches the ROS 2 distro on your machine, and run every new plan in simulation before you send it to the real arm. Use `xarm_ros` only if you are extending an existing ROS 1 project; new work goes on ROS 2.

## 4. Depth camera and vision

Relevant if your project involves the wrist-mounted depth camera: object detection, point clouds, or any vision-guided grasp.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [Orbbec SDK v2](https://github.com/orbbec/OrbbecSDK_v2) | Orbbec's SDK, with C/C++ and Python samples | Opening the camera, aligning depth to color, and reading frames |
| [OrbbecSDK_ROS2](https://github.com/orbbec/OrbbecSDK_ROS2) | Orbbec's ROS 2 wrapper | Depth, color, and point cloud as ROS 2 topics next to `xarm_ros2` |
| [Gemini 330 Series Documentation](https://www.orbbec.com/docs/orbbec-gemini-330-series-documentation/) | Orbbec's setup and tuning guide | Depth presets, exposure, and firmware for the Gemini 335 |

Get a clean depth image in Orbbec's viewer before you write any code. Then plan for hand–eye calibration: until you know where the camera sits relative to the gripper, a detected object's position means nothing to the arm. Note that UFACTORY's own vision examples are written for Intel RealSense cameras, so expect to adapt the camera parts of them for the Gemini 335.

Specs and links for the camera and its mount: [Gemini 335 Depth Camera](#accessory-gemini-335-depth-camera) and [X-Arm Camera Stand](#accessory-x-arm-camera-stand) under Accessories below. The stand's 3D file is the starting point for a hand–eye guess before you calibrate.

## Accessories on our xArm 6

These are mounted on or wired to our arm. Each entry lists the maker's manuals, software, and documentation where they exist.

{% include equipment_accessories.html equipment_id=page.equipment_id %}

## What comes next

Once you have worked through the steps relevant to your project, come see me and we will scope a first task on the actual hardware. Bring a specific thing you want the arm to do; "learn the robot" is not a task and you have already done it by this point.
