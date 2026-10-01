---
layout: post
title: "Getting Started with the TurtleBot 4"
date: 2026-10-01
categories: ["Teaching & Learning"]
tags: ["equipment", "turtlebot4", "mobile-robot", "ros2", "navigation", "tutorial"]
equipment_id: clearpath-turtlebot-4
---

The TurtleBot 4 is the robot students learn ROS 2 on. It is small enough to run in a corridor, carries a lidar and a depth camera, and comes with mapping and navigation working out of the box, so a first project can start from "the robot already drives itself" rather than from wiring. Everyone who starts on it asks what to learn first, and the answer is the same for everyone, so it lives here.

The order below matters more than the volume. Steps 1 and 2 are prerequisites for driving the robot; steps 3 and 4 depend on what your project does.

## How to use this

- **Expect the network to be the hard part.** The robot is two computers, the Create 3 base and a Raspberry Pi, that talk to your laptop over Wi-Fi. ROS 2's default discovery relies on multicast, which university and corporate Wi-Fi networks often block. Ask me which network the robots are on before you start, and do not spend an afternoon debugging the campus Wi-Fi.
- **Run new code in the simulator first.** The TurtleBot 4 simulator has the same functionality as the real robot, so a bug costs nothing there.
- **Back up the SD card before you change anything on the robot.** The Raspberry Pi runs from it, and restoring a backup is far quicker than rebuilding the robot's software from scratch.
- **You can practice on the robot while you work through the material.** If you need access for that, ask me and I will arrange it — time on the TurtleBots is arranged through me, not self-served.
- **Everything below is free**, and the software is open source.

## 1. Setup and networking

Start here regardless of what your project is about. This is the required first step.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [TurtleBot 4 User Manual](https://turtlebot.github.io/turtlebot4-user-manual/) | Clearpath's official manual | The reference for everything below |
| [Features](https://turtlebot.github.io/turtlebot4-user-manual/overview/features.html) | Specs and hardware overview | What is on the robot and what it can carry |
| [Basic Setup](https://turtlebot.github.io/turtlebot4-user-manual/setup/basic.html) | Setting up your laptop and the robot | Installing the matching ROS 2 and Ubuntu versions |
| [Networking](https://turtlebot.github.io/turtlebot4-user-manual/setup/networking.html) | The two discovery options compared | Why the robot might be invisible to your laptop |
| [Discovery Server](https://turtlebot.github.io/turtlebot4-user-manual/setup/discovery_server.html) | The setup that avoids multicast | What works on networks that block multicast |

Your laptop must run the Ubuntu and ROS 2 versions that match the robot. Check which ROS 2 version the robot runs before you install anything; the manual has separate instructions for each, and mixing them does not work.

Read the Networking page carefully. Simple Discovery is the default and needs no setup, but it depends on multicast and on the Create 3 joining 2.4 GHz Wi-Fi. Discovery Server avoids both problems at the cost of some extra setup, and it is usually the one that works on a university network.

## 2. Driving and the Create 3 base

Read this after step 1, with the robot in front of you.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [Driving your TurtleBot 4](https://turtlebot.github.io/turtlebot4-user-manual/tutorials/driving.html) | Manual tutorial | Controller, keyboard, and command-line driving |
| [Create 3 in the manual](https://turtlebot.github.io/turtlebot4-user-manual/software/create3.html) | The base's ROS 2 actions and topics | Docking, undocking, driving a set distance, and the bump and cliff sensors |
| [Create 3 documentation](https://iroboteducation.github.io/create3_docs/) | iRobot's documentation for the base | The base's own web interface, firmware, and hardware |

Drive with the controller or keyboard before you drive from code. The robot is capped at 0.31 m/s in its default safe mode; leave safe mode on. Learn the dock and undock actions early, because a robot that docks itself at the end of every session is a robot that is charged for the next person.

## 3. Mapping and navigation

Relevant to most projects; this is what the TurtleBot 4 is best at.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [Generating a map](https://turtlebot.github.io/turtlebot4-user-manual/tutorials/generate_map.html) | Manual tutorial | Building a map of a room with SLAM |
| [Navigation](https://turtlebot.github.io/turtlebot4-user-manual/tutorials/navigation.html) | Manual tutorial | Localizing on that map and navigating with Nav2 |
| [TurtleBot 4 Navigator](https://turtlebot.github.io/turtlebot4-user-manual/tutorials/turtlebot4_navigator.html) | Python API for navigation | Sending goals and routes from your own script |
| [Simulation](https://turtlebot.github.io/turtlebot4-user-manual/software/simulation.html) | The robot in Gazebo | Practicing all of the above without the robot |

Do the whole sequence in simulation first: map, save the map, localize, navigate. Then repeat it on the robot in a room you have mapped yourself. Map with as few people moving around as possible; people walking through a scan end up as walls.

## 4. Writing your own code

Relevant once your project goes beyond the built-in demos.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [Creating your first node (Python)](https://turtlebot.github.io/turtlebot4-user-manual/tutorials/first_node_python.html) | Manual tutorial | A first ROS 2 node that reads the robot and drives it |
| [TurtleBot4Lessons](https://github.com/turtlebot/TurtleBot4Lessons) | Clearpath's lesson repository | Structured exercises, if you want a course rather than a reference |
| [Creating a backup of your SD card](https://turtlebot.github.io/turtlebot4-user-manual/tutorials/create_sd_image.html) | Manual tutorial | The backup from "How to use this," step by step |
| [FAQ](https://turtlebot.github.io/turtlebot4-user-manual/troubleshooting/faq.html) | Manual troubleshooting | The answers to most "why is it doing that" questions |

There is also a C++ version of the first-node tutorial. Write your code on your laptop and run it there, talking to the robot over the network, until it needs to run on the robot itself. The Raspberry Pi is already busy with the drivers.

Specs and links for the sensors: [OAK-D Pro Camera](#accessory-oak-d-pro-camera) and [RPLIDAR A1M8](#accessory-rplidar-a1m8) under Accessories below.

## Accessories on our TurtleBot 4

These are mounted on or wired to our robot. Each entry lists the maker's documentation and drivers where they exist.

{% include equipment_accessories.html equipment_id=page.equipment_id %}

## What comes next

Once you have worked through the steps relevant to your project, come see me and we will scope a first task on the actual hardware. Bring a specific thing you want the robot to do; "learn the robot" is not a task and you have already done it by this point.
