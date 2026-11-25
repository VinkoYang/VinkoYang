---
layout: research_post
title: "System design of a human-centered AR HRI with cognition awareness"
date: 2021-10-01
categories: ["Research Projects"]
tags: ["human-robot-interaction", "augmented-reality", "cognition-awareness", "cognitive-load-theory", "learning-science"]
project_id: system-design-of-a-human-centered-ar-hri-with-cognition-awareness
---

## What problem this addresses

Manufacturers are adopting collaborative robots (Cobots), but programming them for a complex workspace is still hard. Online programming, either by leading the arm by hand or jogging it with a teach pendant, keeps the operator in the loop but needs extensive experience and many rounds of trial and error. Offline programming can use automatic path planners, but it needs a CAD model or a 3D reconstruction of the environment, and random search planners often get stuck when the obstacles are complex. At the same time, the industry is short of experienced robot operators.

This led to the research question of the project: how would a new robot programming method help novice users complete complex tasks effectively, efficiently, and intuitively? To answer this question, we developed HAR²bot, a human-centered augmented reality (AR) programming interface that is aware of the operator's cognitive load. It builds on [our earlier AR robot programming interface]({{ '/publications/' | relative_url }}#yang2021augmented).

## Approach

We followed the NASA system design process and started from two assessments of the existing methods. The first came from stakeholder expectations: the method should work in a complex environment, be usable by novices, allow paths to be changed, be general, be efficient, and be safe. The second came from cognitive load theory (CLT). We ran a pilot study with a novice operator (about 2 months of experience) and an expert (more than 5 years) to see where each type of cognitive load comes from in online programming. Our strategy from this assessment was to optimize the intrinsic load by making invisible information visible, to reduce the extraneous load through simple interactions and instructions, and to increase the germane load through pre-training.

<figure id="fig-1" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/har2bot/har2bot-workflow.jpg' | relative_url }}" alt="HAR2bot workflow from waypoint definition to path generation, simulation, and real robot execution" loading="lazy">
<figcaption>Figure 1. The human-in-the-loop workflow of HAR²bot. The operator defines waypoints, orientations, and configurations in AR, checks the simulated path, and only then lets the real robot execute it.</figcaption>
</figure>

The resulting workflow keeps the human in the loop (see [Figure 1](#fig-1)). The operator wears an AR headset and defines waypoints with a virtual robot overlaid on the real workcell. For each waypoint, the operator sets the orientation of the end-effector and picks a robot configuration (see [Figure 2](#fig-2)). [IKFast](https://moveit.picknik.ai/main/doc/examples/ikfast/ikfast_tutorial.html) computes all possible configurations (up to 8 for a 6-DOF arm), and HAR²bot ranks them by how much the joints have to move from the previous waypoint. Note that this ranking is just a suggestion, and the final decision is still made by the operator. The [Open Motion Planning Library (OMPL)](https://ompl.kavrakilab.org/) then plans the motion between neighboring waypoints. The operator checks the simulated path against the real obstacles, with correct occlusion, before the physical robot moves. When the robot is executing the path, its workspace is highlighted in red and an audible alarm plays.

<figure id="fig-2" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/har2bot/har2bot-interface.jpg' | relative_url }}" alt="Ten AR views of the HAR2bot interface for waypoints, orientation gizmos, configurations, and planned path" loading="lazy">
<figcaption>Figure 2. The HAR²bot interface. (a) Ray-cast menus from the hand-held controller; (b) and (d) a pyramid marker and a rotation gizmo for the end-effector orientation; (f)–(i) the candidate robot configurations at a waypoint; (j) the planned path checked against the real obstacles.</figcaption>
</figure>

The primary difference from offline programming is that HAR²bot does not need a CAD model or a 3D reconstruction of the environment. The operator's own perception picks a feasible configuration, and the planner does the rest. The hardware consists of an Oculus Rift headset with a ZED Mini stereo camera and an AUBO i5 Cobot, and the software integrates Unity 3D with ROS.

## Results

We first verified HAR²bot with an expert user on two tasks inspired by industrial setups (see [Figure 3](#fig-3)). In Task 1, a 2 cm tip had to visit four window-like destinations in sequence, as in automotive welding. In Task 2, a T-shaped tool had to pass through a narrow slot. Each task included waypoint definition, path verification, and path adjustment. Compared with manual leading and pendant teaching, HAR²bot saved 58.2% and 48.1% of the time in Task 1, and 54.6% and 61.6% in Task 2.

<figure id="fig-3" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/har2bot/har2bot-tasks.jpg' | relative_url }}" alt="Two programming tasks with obstacles and destinations for the AUBO i5 robot" loading="lazy">
<figcaption>Figure 3. The two programming tasks. (a) Task 1: the tip visits destinations A–D through window-like openings. (b) Task 2: a 10 cm T-shaped tool moves from A to B through a narrow slot, and new obstacles are added for the adjustment step.</figcaption>
</figure>

We then ran a user study with 16 participants, comparing HAR²bot with the existing online programming methods (ONP). To eliminate any possible bias due to order, half of the participants used HAR²bot first and the other half used ONP first. The overall completion time dropped by 37% on average with HAR²bot (t(15) = 4.637, p = 0.0003), and participants defined fewer waypoints (p = 0.0005). The NASA Task Load Index score was significantly lower with HAR²bot (M = 28.33 vs. M = 42.19, t(15) = 2.448, p = 0.0271), as shown in [Figure 4](#fig-4). The total cognitive load from the CLC questionnaire was also significantly lower (p = 0.0482), and each of the three load types was lower with HAR²bot. In the interviews, 14 out of 16 participants reported feeling quite or extremely safe with HAR²bot. One participant (P14) described it as "easier to use and friendly for users".

<figure id="fig-4" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/har2bot/har2bot-nasa-tlx.jpg' | relative_url }}" alt="Bar chart and box plot of NASA-TLX scores for ONP and HAR2bot across 16 participants" loading="lazy">
<figcaption>Figure 4. NASA-TLX scores of the 16 participants. (a) Scores of each participant with ONP and HAR²bot; (b) the distribution for each method.</figcaption>
</figure>

## What's next

There are drawbacks mentioned by the participants. The visualization accuracy was not satisfactory, which made it hard to place waypoints precisely and to judge collisions. That limitation started our next line of work on [visualization error in video see-through AR]({{ '/blogs/visualization-error-analysis-for-augmented-reality-stereo-vst-system/' | relative_url }}). Some participants also preferred bare-hand interaction to the hand-held controllers, and others asked for a more detailed pre-training session. We believe an AI-based pre-training system could support operators better and increase their germane cognitive load.

This work was published in the [Journal of Intelligent Manufacturing](https://link.springer.com/article/10.1007/s10845-023-02096-2) (see the [citation]({{ '/publications/' | relative_url }}#yang2024ha)).
