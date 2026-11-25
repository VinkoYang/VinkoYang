---
layout: research_post
title: "A global calibration to solve the misregistration problems in VST AR system"
date: 2023-02-01
categories: ["Research Projects"]
tags: ["augmented-reality", "calibration", "errors", "robots"]
project_id: a-global-calibration-to-solve-the-misregistration-problems-in-vst-ar-system
---

## What problem this addresses

In AR-based robot programming, the operator places virtual waypoints and virtual obstacles in the real workspace, and the robot acts on them. This only works if the virtual content stays where it was placed. In our earlier AR robot programming systems ([MSEC 2021]({{ '/publications/' | relative_url }}#yang2021augmented), [HAR2bot]({{ '/publications/' | relative_url }}#yang2024ha)), we observed that virtual objects floated as the viewer turned their head. A user-defined waypoint that looked correct from one angle appeared shifted from another, which confused users and caused errors in the robot program.

Our [earlier error propagation model]({{ '/publications/' | relative_url }}#yang2022visualization) for video see-through (VST) AR sorts the error sources into seven categories: camera extrinsic calibration, virtual object alignment, display, tracking, camera intrinsic calibration, rendering, and tracker alignment. However, the following research question remained open: what is the specific impact of each error source on misregistration in a VST AR system?

## Approach

We built a VST AR system by connecting a ZED Mini stereo camera to an Oculus Quest (1st generation) headset through a PC, with Unity as the graphics engine (see [Figure 1](#fig-1)). The custom setup is deliberate, because in teleoperation the stereo camera sits in the remote workspace and moves on a gimbal, so it has to be separate from the headset, and commercial headsets with built-in cameras do not allow this. Note that the research objective is not to compare registration accuracy with commercial headsets but to understand how each error source affects registration.

<figure id="fig-1" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/vst-calibration/vst-system.jpg' | relative_url }}" alt="System framework connecting the ZED Mini, Oculus Quest, ZED SDK, Oculus SDK, and Unity rendering" loading="lazy">
<figcaption>Figure 1. The VST AR system. The ZED Mini provides stereo video and visual-inertial localization, the Oculus Quest tracks the head pose, and Unity fuses both to render the AR view on the headset.</figcaption>
</figure>

To see the problem directly, we attached a small virtual ball to the tip of a calibration tool. The observer stayed 0.5 m away and only rotated their head, so the ball appeared in different zones of the image. The ball should have stayed on the tip, but it drifted away (see [Figure 2](#fig-2)). Based on the error propagation analysis, the main error comes from the camera extrinsics, that is, the transformation from the headset to the camera.

<figure id="fig-2" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/vst-calibration/vst-misregistration.jpg' | relative_url }}" alt="Four stereo image pairs showing a virtual ball drifting away from the tip of a calibration tool" loading="lazy">
<figcaption>Figure 2. Misregistration before calibration. (a) The virtual ball is registered at the tip of the calibration tool. (b)–(d) As the head rotates, the ball drifts away from the tip in both the left and right camera views.</figcaption>
</figure>

We then built a mathematical model of the headset-to-camera transformation, which separates its six parameters (three translations and three rotations) and simulates the misregistration each one produces. Based on the model, the proposed calibration has two steps: the manufacturer's default offset serves as the initial estimate, and the six parameters are then corrected to reduce the remaining error. Some parameters produce similar corrections (for example, an X translation and a Y rotation), so we choose which ones to adjust by their uncertainty and sensitivity. Camera position has a larger effect on nearby points, and camera orientation has a larger effect on distant points.

## Results

For the qualitative evaluation, we registered a virtual 9 × 7 grid of circles (20 mm pitch) onto a physical checkerboard. After calibration, the virtual circles stayed on the grid intersections as the viewpoint changed. When errors were introduced on purpose, a Z translation zoomed the grid in or out, X and Y translations shifted it, a Z rotation rotated it around the image center, and X and Y rotations displaced it, which matched the patterns in the model's simulations.

For the quantitative evaluation, we adapted the three-point method used to define user frames in robotics. Users aligned three virtual balls with three 10 mm spheres on a 3D-printed calibration tool placed 1 m from the camera. To keep the viewpoints repeatable, the headset was mounted on an Aubo i5 manipulator (repeatability ±0.05 mm). There were two camera-motion conditions: rotating in place so the target moved across the image, and moving while keeping the target centered. The registration error is the pixel offset of each ball center, measured before and after calibration. A two-tailed t-test on 12 sets under each condition showed a significant reduction in misregistration after calibration in both conditions (see [Figure 3](#fig-3)).

<figure id="fig-3" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/vst-calibration/vst-calibration-result.jpg' | relative_url }}" alt="Box plot of misregistration in pixels before and after calibration under two conditions" loading="lazy">
<figcaption>Figure 3. Misregistration (in pixels) before (blue) and after (orange) calibration. Condition 1: the camera rotates in place. Condition 2: the camera moves while the target stays centered.</figcaption>
</figure>

## What's next

This study does not yet explain how registration accuracy depends on the depth of the target. Points at different depths in a shared workspace will not share the same registration error, and that distribution still needs to be studied. A second open question is registration for a specific application, such as AR-based robot programming, where the virtual world has to be aligned through the robot base so that the virtual and real robots share the same workspace. The same ZED Mini and Quest setup later became the AR front end of our [RADAR assembly system]({{ '/blogs/radar-robotics-assembly-by-demonstration-via-augmented-reality/' | relative_url }}).

This work was published in the ASME [Journal of Computing and Information Science in Engineering (JCISE)](https://asmedigitalcollection.asme.org/computingengineering/article/24/3/031003/1166670/A-Global-Correction-Framework-for-Camera) in 2024, and the paper is linked at the top of this page.
