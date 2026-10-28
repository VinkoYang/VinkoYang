---
title: "Advanced Robotics (INEN 6301): Conveyor-Fed Palletizing Cycle-Time Challenge"
date: 2026-10-26
summary: "INEN 6301 students fed six cubes down the conveyor and had the UR10e stack them on a 2 × 3 pallet. The winning team finished in 71.794 s."
cover: lab/news/2026-10-26-cobot-palletizing/palletizing-winners.jpg
tags: [teaching, robotics, cobot, ur10e, lab]
---

On Monday, October 26, 2026, students in **INEN 6301: Advanced Robotics** ran
their palletizing lab session on the UR10e. The session followed Universal
Robots Academy module 9: the whole class built one program with the
**Palletizing** template, then each team copied it and raced the clock.

## The challenge

The task combined the conveyor and sensor I/O from the
[previous race](/lab/news/advanced-robotics-cobot-io-race/) with the new
pallet template:

1. Six cubes are placed in front of **Sensor 1** and **Sensor 3**, at the two
   ends of the conveyor.
2. The conveyor carries the cubes one at a time to **Sensor 2**, in the middle
   of the belt.
3. When Sensor 2 detects a cube, the UR10e picks it up and places it in the next
   nest of a **2 × 3 pallet grid**.
4. A counter stops the program after the sixth cube, and a timer reports the
   cycle time from Play to the last placement, conveyor time included.

Teams could raise the robot speeds up to fixed caps, add blend radii, lower the
approach and exit heights, remove waypoints they did not need, and time the
robot so it was already back over the belt when the next cube arrived. The
pallet corners, grid, and belt speed stayed fixed. A dropped cube or a move above
a speed cap cost 30 seconds, and a protective stop replaced the score with
240 seconds. For reference, Universal Robots' own version of this exercise runs
about 117 seconds at baseline speeds and about 89 seconds with the speed change
alone.

## The winners

The winning team stacked all six cubes in **71.794 seconds**. Pictured in the
front row is **Sajita Shrestha**. In the back row, from left to right:
**Prashant Thakuri**, **Adnan Shafi**, **Rocktim Shil**, **Vivian Latona**, and
**Aminat Ayankoya**. Five of the six also won the conveyor and sensor I/O race
three weeks earlier.

New to the UR10e? Start with the
[Getting Started with the UR10e Cobot](/blogs/ur10e-onboarding-path/) guide.
The conveyor and sensors are listed under the UR10e's accessories on the
[Lab](/lab/) page.
