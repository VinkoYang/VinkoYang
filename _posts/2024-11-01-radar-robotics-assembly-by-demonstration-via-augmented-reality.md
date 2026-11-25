---
layout: research_post
title: "RADAR: Robotics Assembly by Demonstration via Augmented Reality"
date: 2024-11-01
categories: ["Research Projects"]
tags: ["human-robot-collaboration", "augmented-reality", "robotic-assembly", "learning-from-demonstration", "task-planning"]
project_id: radar-robotics-assembly-by-demonstration-via-augmented-reality
---

## What problem this addresses

High-mix, low-volume (HMLV) manufacturing asks a robot to switch between many products in small batches. Long-horizon assembly is one of the hardest cases, since the robot has to reason over a sequence of subtasks and over the continuous motion inside each subtask, and one failed grasp or insertion can stop the whole job. Human operators are still better than robots at this kind of judgment. Therefore, human-robot collaboration (HRC) is a practical way to keep robots useful when the task keeps changing.

Augmented reality (AR) interfaces are a promising way to bridge humans and robots, since they support two-way communication and learning from demonstration (LfD). However, most AR-based HRC systems are built around one specific application, and they tend to assist the operator rather than let the robot do as much of the work as it can. We asked a design question: what should an AR-based HRC system for long-horizon assembly look like? RADAR (Robotics Assembly by Demonstration via Augmented Reality) is our answer to that question.

## Approach

RADAR puts a task planner and an AR interface in the same loop (see [Figure 1](#fig-1)). The planner reasons at two resolutions: at the coarse resolution, it computes a sequence of abstract actions, such as which part to pick next and in what order. At the fine resolution, it refines each abstract action into concrete robot motions. The operator can step in at either level through the AR interface, and the robot only executes a motion after the operator has confirmed it.

<figure id="fig-1" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/radar/radar-framework.jpg' | relative_url }}" alt="Block diagram of the RADAR framework linking the user, AR interface, task planner, planning libraries, and robot" loading="lazy">
<figcaption>Figure 1. The RADAR framework. The task planner splits an assembly job into coarse and fine subtasks, the operator demonstrates or corrects each level through the AR interface, and the robot executes the verified plan. Demonstrations are also stored as skill representations for later learning.</figcaption>
</figure>

In a typical run, we first let the planner generate coarse and fine subtasks from the assembly task. Then, the operator completes demonstrations, defines constraints, and repairs faults through the AR interface. The robot motion planning library generates trajectories, the operator checks them in AR, and the robot executes only the verified plan. Finally, the system records the demonstrations, constraints, and fault handling as output for future robot learning.

The AR interface offers six interaction modes (see [Figure 2](#fig-2)). Subtask organization, constraint definition, and error correction work at the coarse resolution, while the teach pendant, teleoperation, and passive observation modes work at the fine resolution. Note that the planner decides which level a subtask needs and the operator confirms or adjusts it, so the user does not have to sort coarse and fine tasks by hand.

<figure id="fig-2" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/radar/radar-ar-interactions.jpg' | relative_url }}" alt="Six AR views showing coarse and fine demonstration modes in RADAR" loading="lazy">
<figcaption>Figure 2. AR interactions in RADAR. Top row: coarse-resolution demonstration (subtask organization, constraint definition, and error correction). Bottom row: fine-resolution demonstration (teach pendant, teleoperation, and passive observation).</figcaption>
</figure>

The hardware builds on [our earlier video see-through (VST) AR setup]({{ '/blogs/a-global-calibration-to-solve-the-misregistration-problems-in-vst-ar-system/' | relative_url }}) (see [Figure 3](#fig-3)). A ZED Mini stereo camera is mounted on an Oculus Quest headset, an Intel RealSense D435i detects ArUco markers on the parts, and a [UFACTORY xArm 6](https://www.ufactory.us/xarm) with a two-finger gripper performs the assembly. Unity 3D runs the AR interface, and the [Robot Operating System (ROS)](https://www.ros.org/) runs perception, motion generation, and joint control.

<figure id="fig-3" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/radar/radar-hardware.jpg' | relative_url }}" alt="Hardware and software architecture of RADAR with ZED Mini, Oculus Quest, Unity, ROS, RealSense camera, and xArm 6" loading="lazy">
<figcaption>Figure 3. System architecture. Unity 3D on the PC handles AR display and interaction, ROS handles marker detection, path planning, and motion generation, and the xArm 6 control box receives the action commands.</figcaption>
</figure>

## Results

We validated RADAR on the [RAMP benchmark](https://arxiv.org/abs/2305.09644), an open-source benchmark for long-horizon robotic assembly with metal beams and pegs. The RAMP authors also released their own control algorithms, and we used them as the fully automated baseline (referred to as RAMP below). We split the benchmark into nine subtasks and compared completion time and success rate between RAMP and RADAR. Each subtask ran 15 trials, except picking a single peg out of a three-peg set, where the success depends on which position the peg sits in, so we ran 15 trials for each of the three positions (45 in total).

As shown in [Figure 4](#fig-4), RADAR was faster in all five pick-up subtasks, where the operator could select the target, set the orientation, and order the sequence directly in AR. RADAR was slower in the two peg insertion subtasks that relied on a single marker, because the operator demonstrated these fine motions instead of letting the algorithm run alone. Seven of the nine subtasks showed a statistically significant time difference (t-test). On the other side of this trade-off, RADAR reached a higher success rate than RAMP in all nine subtasks (see [Table 1](#tab-1)). The largest gains came in picking a single peg out of a full peg set (35.56% to 91.11%) and in the two single-marker insertions (46.67% to 86.67%, and 33.33% to 93.33%), and the latter two are the same subtasks where RADAR took longer. In other words, the operator made coarse decisions faster and made fine actions more reliable at the cost of extra time.

<figure id="fig-4" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/radar/radar-subtask-time.jpg' | relative_url }}" alt="Horizontal bar chart comparing completion time of nine RAMP subtasks between RAMP and RADAR" loading="lazy">
<figcaption>Figure 4. Completion time of the nine subtasks for the RAMP baseline (pink, hatched) and RADAR (blue). Bars show the mean of successful executions, error bars show ±1.5 SE, and asterisks mark statistically significant differences.</figcaption>
</figure>

Table 1. Success rate of each subtask. Each subtask ran 15 trials, except Task 2, which ran 45 trials (15 for each peg position).
{: #tab-1 .table-caption}

| Task | Action | Description | RAMP | RADAR |
|---|---|---|---:|---:|
| 1 | Pick up Single Peg | Grasp a single peg from a random position and place it in box A. | 66.67% | 86.67% |
| 2 | Pick up Peg Set (Single) | Grasp a single target peg from a full peg set and place it in box B. | 35.56% | 91.11% |
| 3 | Pick up Peg Set (Group) | Grasp 3 pegs with a designed sequence from a full peg set and place them in box B. | 20.00% | 66.67% |
| 4 | Pick up Beam (Short) | Grasp a target short beam from a random orientation and place it horizontally in area C. | 86.67% | 93.33% |
| 5 | Pick up Beam (Long) | Grasp a target long beam from a random orientation and place it horizontally in area C. | 53.33% | 93.33% |
| 6 | Insert Peg (Close, 1 Marker) | Grasp a target peg and insert it into the hole on joint D, guided by one joint marker. | 46.67% | 86.67% |
| 7 | Insert Peg (Far, 1 Marker) | Grasp a target peg and insert it into the hole on joint E, guided by one joint marker. | 33.33% | 93.33% |
| 8 | Insert Peg (Far, 2 Markers) | Grasp a target peg and insert it into the hole on joint F, guided by two joint markers. | 60.00% | 86.67% |
| 9 | Assemble & Push Beam | Grasp a target short beam, assemble it, and push it into joint G of a long beam. | 53.33% | 80.00% |

A clear limitation of this evaluation is that all trials were run by the system developers, not by recruited participants. Therefore, the results show what the framework can do with an experienced operator, and they do not yet tell us how a non-expert user on a shop floor would perform.

## What's next

The first step is a formal user study with non-robotics users, comparing RADAR with other AR interfaces for robot supervision. The second direction comes from the data RADAR already records: every demonstration, constraint, and fault repair is a labeled example, and we plan to use this AR demonstration data for imitation learning so the robot needs less help on the next task. We are also exploring interaction designs built on wearable sensors and language models, and more casual AR input through devices such as wristbands and haptic devices.

This work was published at [IEEE/RSJ IROS 2024](https://ieeexplore.ieee.org/document/10801493) (see the [citation]({{ '/publications/' | relative_url }}#yang2024radar)).
