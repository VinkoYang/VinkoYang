---
layout: research_post
title: "Seeing Isn't Believing: The Vertical-Horizontal Illusion Across Screens and XR Headsets"
date: 2026-03-01
categories: ["Research Projects"]
tags: ["mixed-reality", "head-mounted-displays", "human-computer-interaction", "spatial-perception"]
project_id: seeing-isn-t-believing-the-vertical-horizontal-illusion-across-screens-and-xr-headsets
---

## What problem this addresses

A square on a screen does not always look square. The Vertical-Horizontal Illusion (VHI) is a well-documented bias in which a vertical line is judged longer than a horizontal line of the same length. For a square, this means the height looks slightly larger than the width, so the shape appears a little taller than it is. Psychophysics work has shown that the strength of the illusion depends on the shape of the visual field, the surrounding frame, and how stable the gaze is.

Extended reality (XR) headsets change exactly these conditions. They have asymmetric fields of view (FOV) and lens-induced warping, they render in stereo, and the designer can choose the geometry of the surface that content is drawn on. Whether the VHI behaves the same way inside a headset had not been tested, and neither had the question of whether interface design can reduce it. We asked two research questions: (1) does the VHI persist in modern XR head-mounted displays (HMDs) with stereoscopic 3D rendering, and to what extent, and (2) can UI design reduce the size of the VHI in XR interfaces?

## Approach

To answer these questions, we built the Square Recognition Test (SRT), one task that runs on a phone, a PC, and an AR headset (see [Figure 1](#fig-1)). In each trial, five black rectangles appear in a row. Their aspect ratios (width over height) are sampled without replacement from {0.80, 0.90, 0.95, 1.00, 1.05, 1.10, 1.20} and placed in random left-to-right order. The participant selects the one that "looks most like a perfect square." The height stays constant, so only the width changes. Each session has 10 trials with no correctness feedback. Note that not every trial contains a true square, since only five of the seven ratios are drawn each time.

<figure id="fig-1" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/vhi/vhi-conditions.jpg' | relative_url }}" alt="Square Recognition Test interface on a phone, a PC monitor, and an AR headset with flat and curved canvases" loading="lazy">
<figcaption>Figure 1. The Square Recognition Test in the four conditions: (1) a mobile phone, (2) a PC monitor, (3) an AR HMD with a flat canvas, and (4) an AR HMD with a curved canvas.</figcaption>
</figure>

We ran a within-subject study with 24 participants and four conditions. To eliminate any possible bias due to order, the order of conditions was randomized and counterbalanced across participants. The phone condition used a 6.1-inch OLED touchscreen held at about 35 cm. The PC condition used a 27-inch monitor at about 60 cm with mouse input. Both AR conditions used a [Meta Quest 3S](https://www.meta.com/quest/quest-3s/) in passthrough mode with hand-gesture input. One rendered the rectangles on a flat canvas at a virtual distance of about 2 m, and the other on a curved canvas with a 2 m radius. The headset, the content, and the input were the same in the two AR conditions, so the canvas geometry was the only difference. All participants gave informed consent, and the protocol was approved by the Lamar University IRB.

For each participant and device, we took the median chosen ratio as the point of subjective equality (PSE), and defined the bias as PSE − 1. A PSE above 1.00 means the participant needs a slightly wider-than-tall rectangle before it looks square. Accuracy is the share of trials in which the participant picked the 1.00 rectangle, counted only over the trials that contained one.

## Results

The PSE was above 1.00 on every device: 1.035 on PC, 1.044 on the phone, 1.026 on the flat AR canvas, and 1.019 on the curved AR canvas. In other words, participants consistently picked rectangles about 2% to 4% wider than tall as the most square-like, which is the direction the VHI predicts (see [Figure 2](#fig-2)). A Kruskal-Wallis test did not show a significant difference in PSE between devices. We see three possible explanations: the VHI may be device-invariant for square judgments, the study may be underpowered for small device effects, or individual variability may mask device effects. The curved AR canvas gave the smallest bias of the four conditions, but this difference is descriptive only.

<figure id="fig-2" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/vhi/vhi-choice-distribution.png' | relative_url }}" alt="Bar chart of the proportion of choices for each aspect ratio across PC, phone, AR flat, and AR curved" loading="lazy">
<figcaption>Figure 2. Distribution of "most square-like" choices by device. On every device, most choices fall at 1.00 or 1.05, and the ratios 0.80 and 0.90 each account for less than 8% of choices.</figcaption>
</figure>

An interesting observation is where the most common choice falls. On the PC, it was the true square (31% of choices). On the phone and both AR canvases, it moved to 1.05, which reached 30% on the phone and 33% on the curved AR canvas.

Accuracy was low on every device: 41.2% on PC, 32.3% on the phone, 25.2% on the flat AR canvas, and 40.6% on the curved AR canvas (see [Figure 3](#fig-3)). A Friedman test showed a significant device effect (χ²(3) = 8.216, p = 0.0418, Kendall's W = 0.119). After Holm-Bonferroni correction, two pairs differed: PC vs. flat AR (p = 0.018) and flat AR vs. curved AR (p = 0.0336). This indicates that, with the same headset and the same content, the curved canvas brought accuracy back to about the PC level (40.6% vs. 41.2%).

<figure id="fig-3" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/vhi/vhi-accuracy.png' | relative_url }}" alt="Box plot of square recognition accuracy for each device condition" loading="lazy">
<figcaption>Figure 3. Accuracy by device, measured as the share of valid trials in which the true square (1.00) was selected.</figcaption>
</figure>

Response times also differed by device (Friedman χ²(3) = 134.79, p < 10⁻²⁸). After cleaning outliers, the median response time was 1.68 s on the phone, 3.73 s on the curved AR canvas, 4.40 s on the flat AR canvas, and 4.67 s on the PC. The phone was significantly faster than each of the other three devices, and the curved AR canvas was significantly faster than the PC. Within each participant, the spread of chosen ratios was low on all devices, and slightly broader in the two AR conditions than on the PC and the phone. Last, the bias did not drift across the 10 trials, and none of the participant-level slopes was significant, so learning and fatigue are unlikely to explain the device differences.

## What's next

The curved-canvas result suggests that rendering geometry may be the more actionable lever for perceptual calibration in XR, since it changed accuracy without any change in hardware or content. However, the study has clear limits. It used one headset and 10 trials per condition, and the ratio set moves in steps of 0.05 around 1.00, which is coarse for a bias of 2% to 4%. We plan to test the effect with larger samples and higher-precision psychophysical methods, and to model each device's optics so that small display-induced distortions become detectable. In practice, nominally square UI elements may need a small aspect-ratio correction, and a short SRT-like test could serve as a calibration step in XR interface workflows.

This work was presented at ASME IDETC/CIE 2026 in Houston, TX, in August 2026 (see the [citation]({{ '/publications/' | relative_url }}#yang2026seeing)). The paper, slides, and video are linked at the top of this page.
