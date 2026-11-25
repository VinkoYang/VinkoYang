---
layout: research_post
title: "Exploring the Adversarial Vulnerabilities of Vision-Language-Action Models in Robotics"
date: 2025-07-01
categories: ["Research Projects"]
tags: ["vision-language-action-vla", "robotics", "adversarial-attacks", "robustness-evaluation", "robot-trajectory-manipulation", "embodied-ai"]
project_id: exploring-the-adversarial-vulnerabilities-of-vision-language-action-models-in-robotics
---

## What problem this addresses

Vision-Language-Action (VLA) models such as [OpenVLA](https://openvla.github.io/) take a camera image and a language instruction as input and output robot actions directly. One model can handle many manipulation tasks, which is why VLA models are seen as a step toward generalist robots. The same end-to-end design also opens a new attack surface: anything that changes what the camera sees can change what the robot does.

Adversarial attacks on image classifiers are well studied, but a robot is a different target. Its output is a sequence of physical motions, and a wrong motion can knock over an object or move toward a person. Conventional attack objectives also ignore the physical constraints of robot movement, so they often fail to push the predicted actions far from the intended path. We asked two questions: how vulnerable are current VLA models when an attacker can only place a small patch in the camera's view, and which attack objectives match the way robots actually move?

## Approach

OpenVLA predicts a 7 degree-of-freedom (DoF) action at each step, and each DoF is output as a token that an action de-tokenizer maps to one of 256 discrete bins within the allowed range of that DoF. We designed three attack objectives around this structure (see [Figure 1](#fig-1)):

- The Untargeted Action Discrepancy Attack (UADA) pushes the predicted action of one or more DoFs toward the far end of its range, since larger actions usually mean more violent physical movement.
- The Untargeted Position-aware Attack (UPA) works on the three positional DoFs and turns the direction of the end-effector away from the ground-truth direction.
- The Targeted Manipulation Attack (TMA) drives the model toward an action chosen by the attacker, for example a zero motion on every DoF.

All three objectives are realized as an adversarial patch, a small colorful image that can be pasted into a simulated scene or printed and placed in the real workspace. To measure the physical effect of an attack, we also proposed the Normalized Action Discrepancy (NAD). NAD measures how far the predicted action deviates from the ground truth relative to the largest deviation possible within each DoF's range. It complements the task-level failure rate (FR), which is one minus the success rate.

<figure id="fig-1" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/vla-attack/vla-attack-framework.jpg' | relative_url }}" alt="Diagram of the adversarial attack framework on a vision-language-action model with three attack objectives" loading="lazy">
<figcaption>Figure 1. Attack framework. The robot captures an image, the VLA model outputs action tokens, and the de-tokenizer maps them to discrete bins for each DoF. The patch δ is optimized by backpropagating one of three objectives: UADA, UPA, or TMA.</figcaption>
</figure>

We evaluated the patches on four OpenVLA variants, each trained on one of the [LIBERO](https://github.com/Lifelong-Robot-Learning/LIBERO) simulation suites (Spatial, Object, Goal, and Long). Each suite has 10 tasks, and each task ran 50 trials, which gives 500 rollouts per suite. We generated patches in two settings: a simulation setting based on LIBERO-Long, and a physical setting based on the real-world [BridgeData V2](https://rail-berkeley.github.io/bridgedata/) dataset. For the real-world test, we used a [Universal Robots UR10e](https://www.universal-robots.com/products/ur10e/) with a Robotiq Hand-E gripper and one fixed RGB webcam with a shoulder view.

## Results

In simulation, UADA and UPA reached maximum average failure rates of 100% and 89.7%, compared with a benign average failure rate of 23.5%. Patches generated from the real-world BridgeData V2 data also transferred to the LIBERO models, which were trained on different data and tasks. In the real world, we ran 100 trials across three tasks (grasping, placement, and manipulation). The UADA patch reached an attack success rate above 43%, which is lower than in simulation, but the printed patches worked without any further adaptation, and the erratic arm movements they caused are a real safety risk to people and equipment nearby (see [Figure 2](#fig-2)).

<figure id="fig-2" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/vla-attack/vla-attack-real-world.jpg' | relative_url }}" alt="Two rows of UR10e frames for the task put the carrot in the bowl, benign on top and attacked on the bottom" loading="lazy">
<figcaption>Figure 2. Real-world rollouts of the task "Put the carrot in the bowl". Top row (green): benign execution. Bottom row (red): the same task with an adversarial patch on the table, where the robot fails to put the carrot in the bowl.</figcaption>
</figure>

We also tested four existing input-transformation defenses (JPEG compression, added noise, median blur, and bit-depth reduction), and our attacks bypassed most of them. An interesting observation is that several optimized patches look like the joints of a robot arm (see [Figure 3](#fig-3)). We hypothesize that current VLA models are trained on a narrow range of robots seen from restricted camera poses, so they learn a representation bias toward the appearance of the training robot, and the attack exploits that bias.

<figure id="fig-3" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/vla-attack/vla-attack-patches.jpg' | relative_url }}" alt="Three adversarial patches whose patterns resemble robot arm joints" loading="lazy">
<figcaption>Figure 3. Examples of optimized adversarial patches. Several patterns resemble the structural joints of a robotic arm.</figcaption>
</figure>

## What's next

The patch-bias observation points to two possible defenses. The first is to train VLA models on more varied scenes, including scenes with several robots, so the model does not tie its decisions to the look of one arm. The second is to use the physical structure of the arm: estimate the position of each joint, and reject predictions that violate the physical constraints even when the image contains something that looks like a joint. These are directions rather than tested defenses, and robust defenses of this kind are needed before VLA-based robots are deployed in the physical world.

This work was published at [ICCV 2025](https://openaccess.thecvf.com/content/ICCV2025/html/Wang_Exploring_the_Adversarial_Vulnerabilities_of_Vision-Language-Action_Models_in_Robotics_ICCV_2025_paper.html), and the paper, supplementary material, arXiv version, and project page are linked above.
