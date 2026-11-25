---
layout: research_post
title: "Visualization error analysis for augmented reality stereo VST system"
date: 2021-11-01
categories: ["Research Projects"]
tags: ["augmented-reality"]
project_id: visualization-error-analysis-for-augmented-reality-stereo-vst-system
---

## What problem this addresses

In AR-based robot programming, the operator places virtual waypoints in the real workspace, and the robot plans its path through them. If a virtual waypoint is drawn in the wrong place, the planned path is wrong too. In our [AR human-robot interaction system]({{ '/blogs/system-design-of-a-human-centered-ar-hri-with-cognition-awareness/' | relative_url }}), this problem showed up directly: when a virtual marker was observed from different distances and viewpoints, it no longer lined up with the tip of a physical calibration tool (see [Figure 1](#fig-1)).

Calibration of optical see-through (OST) headsets such as the HoloLens has been studied for years. However, there are few efforts to work out the nature and sources of these errors in video see-through (VST) headsets, where the real scene is captured by cameras and combined with virtual content before it reaches the eyes. Since the errors come from several components of the system, it is also unclear how each one affects the final AR image.

<figure id="fig-1" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/vst-error/vst-error-misregistration.jpg' | relative_url }}" alt="AR views showing a virtual marker misaligned with a physical calibration tool from different distances and viewpoints" loading="lazy">
<figcaption>Figure 1. Misregistration in the AR robot programming system. (a) The virtual and real robots; (b) a virtual marker registered at the tip of a calibration tool; (c)–(f) the marker drifts away from the tip when it is observed from different distances and viewpoints.</figcaption>
</figure>

## Approach

We built the analysis on the platform of our AR robot programming system (see [Figure 2](#fig-2)). It consists of an Oculus Rift headset, a ZED Mini stereo camera, hand-held controllers, and Oculus tracking sensors. Unity 3D combines the camera images with a virtual scene rendered by a virtual camera that shares the physical camera's settings, and the result is shown at 1280 × 720 pixels per eye. ROS connects the system to a collaborative robot.

<figure id="fig-2" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/vst-error/vst-error-system.jpg' | relative_url }}" alt="Illustration of a user with a video see-through headset programming a robot among obstacles, with tracking sensors" loading="lazy">
<figcaption>Figure 2. The AR VST system used in this study. The user wears a video see-through headset tracked by external sensors and defines robot waypoints among real obstacles.</figcaption>
</figure>

We first modeled how a point travels from the world coordinate system to the final AR image through two parallel chains. On the real side, the point passes through the tracking, headset, physical camera, and real image coordinate systems. On the virtual side, it passes through the virtual, virtual headset, virtual camera, and virtual image coordinate systems. The two images are then merged into one AR image. Based on this registration model, we enumerated and categorized the error sources into seven classes (see [Figure 3](#fig-3)): tracker alignment, tracking, camera extrinsic calibration, camera intrinsic calibration, rendering, display, and virtual object alignment. Each class has a static part and a dynamic part. For example, rendering errors come from occlusion handling: the depth of the virtual scene is reliable, but the depth of the real scene is measured coarsely, so a virtual object that should appear in front of a real one can disappear or be partly cut off.

<figure id="fig-3" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/vst-error/vst-error-sources.jpg' | relative_url }}" alt="Diagram mapping seven error classes onto the coordinate transformation chain of a VST AR system" loading="lazy">
<figcaption>Figure 3. The seven classes of registration error, mapped onto the transformation chain of a VST AR system from the world and virtual coordinate systems to the display.</figcaption>
</figure>

Finally, the paper summarizes possible corrections for the influential error sources. For the camera intrinsics, a set of known 3D points and their image points gives a linear system that can be solved with singular value decomposition (SVD), and radial and tangential distortion terms can be added to the pinhole model.

## Results

This work is a qualitative analysis, and its output is the registration model, the seven-class map of error sources, and a list of possible corrections for each class. A possible limitation is that we could not compare the error sources quantitatively, because there was no precise visualization to serve as ground truth.

## What's next

The paper proposes to split registration for VST headsets into two parts. System-related registration deals with the device chain, and one possible solution is a closed-loop calibration that reduces several errors at once without identifying each exact source. Task-related registration deals with aligning predefined models, such as a robot, a work cell, or a machine, in the AR space. As the first step, we decided to focus on the camera extrinsic error and build a model that allows a quantitative analysis, and that plan became our [global calibration framework for VST AR]({{ '/blogs/a-global-calibration-to-solve-the-misregistration-problems-in-vst-ar-system/' | relative_url }}).

This work was published in the proceedings of the ASME Manufacturing Science and Engineering Conference (MSEC) 2022, and the [paper PDF]({{ '/files/papers/yang2022visualization.pdf' | relative_url }}) and the [citation]({{ '/publications/' | relative_url }}#yang2022visualization) are on this site.
