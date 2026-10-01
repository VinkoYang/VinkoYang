---
layout: post
title: "Getting Started with the Clearpath Husky A300"
date: 2026-10-01
categories: ["Teaching & Learning"]
tags: ["equipment", "husky", "mobile-manipulation", "ros2", "robotics", "tutorial"]
equipment_id: clearpath-husky-a300-with-robot-arm
---

The Husky A300 is our mobile manipulator: a four-wheel, all-terrain base with a Kinova Gen3 lite arm on top and a depth camera at the front. Projects on it combine driving somewhere with doing something once it gets there. Everyone who starts on it asks what to learn first, and the answer is the same for everyone, so it lives here.

The order below matters more than the volume. Work through it top to bottom. Steps 1 and 2 are prerequisites for driving the robot; step 3 is where nearly all software work starts; step 4 is for projects that use the arm.

## How to use this

- **Treat it as a vehicle, not a desktop robot.** The base weighs at least 78.5 kg before the arm and can reach 2 m/s. A wrong velocity command does not slow down for a wall, a table leg, or your foot.
- **Run new code in the simulator first.** Clearpath's simulator runs the same configuration and the same ROS 2 interfaces as the real robot. A bug found in Gazebo costs nothing.
- **You can practice on the robot while you work through the material.** If you need access for that, ask me and I will arrange it — time on the Husky is arranged through me, not self-served.
- **Everything below is free**, and the ROS 2 software is open source.

## 1. Safety and the platform

Start here regardless of what your project is about. This is the required first step.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [Husky A300 User Manual](https://docs.clearpathrobotics.com/docs_robots/outdoor_robots/husky/a300/user_manual_husky/) | Clearpath's online manual for the platform | Safety, emergency stops, start-up and shut-down, charging, specs, and status lights |
| [Husky A300 Troubleshooting](https://docs.clearpathrobotics.com/docs_robots/outdoor_robots/husky/a300/troubleshooting_husky) | Clearpath's troubleshooting page | What to check when the robot will not drive or a status light shows a fault |

Read the safety section, the emergency stop section, and **Basic Usage** in full. You must be able to do these without looking:

- **Emergency stop.** There is a red button on the front and one on the rear. Either one stops the robot. To recover, twist every pressed button until it pops back out, then press the Safety Restart button. The robot may start moving the moment you press Safety Restart, so clear the area first.
- **Start-up and shut-down.** The Battery Breaker sits behind the rear charge port door; power on and off with the Power Button. After shutting down, wait until every light is off.
- **First drive on blocks.** Clearpath recommends that the first time you power the robot on, it sits on blocks with the wheels off the ground. Do the same the first time you run any new driving code.
- **Payload and slopes.** The allowable payload drops with accessories, extra batteries, and terrain. The arm and camera already count against it.

## 2. Driving and connecting

Read this after step 1, with the robot in front of you.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [Driving a Robot](https://docs.clearpathrobotics.com/docs/ros/tutorials/driving) | Clearpath tutorial | Gamepad, keyboard, and command-line driving |
| [Joystick Controller Pairing](https://docs.clearpathrobotics.com/docs/ros/installation/controller) | Clearpath guide | Re-pairing the PS4 or PS5 controller |
| [Networking overview](https://docs.clearpathrobotics.com/docs/ros/networking/overview) | Clearpath's networking section | How the robot computer, Wi-Fi, and your laptop find each other in ROS 2 |
| [Offboard Computer Setup](https://docs.clearpathrobotics.com/docs/ros/installation/offboard_pc) | Clearpath guide | Setting up your own Ubuntu 24.04 laptop to see and command the robot |

Drive with the gamepad before you drive from code. Hold **L1** for slow mode, which is capped at 0.3 m/s, and keep to it indoors; **R1** is fast mode, up to 2 m/s, and has no place in the lab.

Expect to spend more time on networking than on driving. Most "the robot does not respond" problems are a laptop on the wrong network or a ROS 2 discovery setting, not the robot.

## 3. Configuration, simulation, and navigation

Relevant to every software project on the Husky.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [Robot YAML](https://docs.clearpathrobotics.com/docs/ros/config/yaml/overview) | Reference for `robot.yaml` | The one file that declares the robot's sensors, arm, and network |
| [Simulator](https://docs.clearpathrobotics.com/docs/ros/tutorials/simulator/overview) | Clearpath's Gazebo Harmonic simulator | Running the same robot, from the same `robot.yaml`, with nothing to break |
| [Installing the simulator](https://docs.clearpathrobotics.com/docs/ros/tutorials/simulator/install) | Clearpath guide | Getting it running on your laptop |
| [Navigation Demos](https://docs.clearpathrobotics.com/docs/ros/tutorials/navigation_demos/overview) | Clearpath tutorials for Nav2 and SLAM | Building a map and navigating autonomously, in simulation first |

Everything about this robot's software description comes from `robot.yaml`, which lives at `/etc/clearpath/robot.yaml` on the robot. Copy it to your laptop and run the simulator from your copy, so the robot you test against is the one we actually have. Do not edit the copy on the robot without asking me; every project shares it.

## 4. The arm and the camera

Relevant if your project uses the Kinova arm or the depth camera.

| Resource | What it is | Why bother |
| --- | --- | --- |
| [Kinova Gen3 lite User Guide (PDF)](https://docs.clearpathrobotics.com/assets/files/clearpath_robotics_022586-TDS2-e371286ff4ca19bcebd345a43380ef0f.pdf) | Kinova's full guide for the arm | Safety, gamepad control, the Web App, and the APIs |
| [Manipulators in robot.yaml](https://docs.clearpathrobotics.com/docs/ros/config/yaml/manipulators) | Clearpath reference | Declaring the arm and gripper, and turning MoveIt on |
| [Manipulation in Simulation](https://docs.clearpathrobotics.com/docs/ros/tutorials/manipulation/gazebo) | Clearpath tutorial | Planning and executing arm motions with MoveIt in Gazebo; its example arm is the Gen3 lite |
| [MoveIt on a second computer](https://docs.clearpathrobotics.com/docs/ros/tutorials/manipulation/remote) | Clearpath tutorial | Moving the heavy planning load off the robot's own computer |
| [Camera configuration](https://docs.clearpathrobotics.com/docs/ros/config/yaml/sensors/cameras) | Clearpath reference | How the RealSense is declared and what it publishes |

MoveIt is off by default in `robot.yaml`; turn it on in your simulator copy first. The arm's user guide also covers two pre-set poses: **retract**, which folds the arm compact, and **home**, a ready pose. Retract the arm before you drive anywhere.

Specs and links for the arm and the camera: [Gen3 lite Robot Arm](#accessory-gen3-lite-robot-arm) and [RealSense D435 Depth Camera](#accessory-realsense-d435-depth-camera) under Accessories below.

## Accessories on our Husky A300

These are mounted on or wired to our robot. Each entry lists the maker's manuals, software, and documentation where they exist.

{% include equipment_accessories.html equipment_id=page.equipment_id %}

## What comes next

Once you have worked through the steps relevant to your project, come see me and we will scope a first task on the actual hardware. Bring a specific thing you want the robot to do; "learn the robot" is not a task and you have already done it by this point.
