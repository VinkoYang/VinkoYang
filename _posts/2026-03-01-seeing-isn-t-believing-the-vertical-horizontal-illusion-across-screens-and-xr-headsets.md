---
layout: research_post
title: "Seeing Isn't Believing: The Vertical-Horizontal Illusion Across Screens and XR Headsets"
date: 2026-03-01
categories: ["Research Projects"]
tags: ["mixed-reality", "head-mounted-displays", "human-computer-interaction", "spatial-perception"]
project_id: seeing-isn-t-believing-the-vertical-horizontal-illusion-across-screens-and-xr-headsets
---

## What problem this addresses

A square on a screen does not always look square. The Vertical-Horizontal Illusion (VHI) is a well-documented bias in which a vertical line is judged longer than a horizontal line of the same length. Psychophysics work has shown that the strength of the illusion depends on the shape of the visual field, the surrounding frame, and how stable the gaze is.

Extended reality (XR) headsets change exactly these conditions, with asymmetric fields of view (FOV), lens-induced warping, stereoscopic rendering, and a rendering surface that the designer can configure. Whether the VHI behaves the same way inside a headset had not been tested, and neither had the question of whether interface design can reduce it. We asked two research questions: (1) does the VHI persist in modern XR head-mounted displays (HMDs) with stereoscopic 3D rendering, and to what extent, and (2) can UI design reduce the size of the VHI in XR interfaces?

## Approach

To answer these questions, we built the Square Recognition Test (SRT), one task that runs on a phone, a PC, and an AR headset (see [Figure 1](#fig-1)). In each trial, five black rectangles appear in a row, with aspect ratios (width over height) drawn from {0.80, 0.90, 0.95, 1.00, 1.05, 1.10, 1.20} and shown in random order. The participant selects the one that "looks most like a perfect square." The height stays constant, so only the width changes. Each session has 10 trials with no correctness feedback, and not every trial contains a true square.

<figure id="fig-1" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/vhi/vhi-conditions.jpg' | relative_url }}" alt="Square Recognition Test interface on a phone, a PC monitor, and an AR headset with flat and curved canvases" loading="lazy">
<figcaption>Figure 1. The Square Recognition Test in the four conditions: (1) a mobile phone, (2) a PC monitor, (3) an AR HMD with a flat canvas, and (4) an AR HMD with a curved canvas.</figcaption>
</figure>

We ran a within-subject study with 24 participants and four conditions, with the order counterbalanced across participants. The phone condition used a 6.1-inch OLED touchscreen held at about 35 cm. The PC condition used a 27-inch monitor at about 60 cm with mouse input. Both AR conditions used a [Meta Quest 3S](https://www.meta.com/quest/quest-3s/) in passthrough mode with hand-gesture input: one rendered the rectangles on a flat canvas at about 2 m, and the other on a curved canvas with a 2 m radius. All participants gave informed consent, and the protocol was approved by the Lamar University IRB.

For each participant and device, we took the median chosen ratio as the point of subjective equality (PSE). A PSE above 1.00 means the participant needs a slightly wider-than-tall rectangle before it looks square. Accuracy is the share of trials (among those that contained a true square) in which the participant picked the 1.00 rectangle.

## Results

The PSE was above 1.00 on every device: 1.035 on PC, 1.044 on the phone, 1.026 on the flat AR canvas, and 1.019 on the curved AR canvas. Participants consistently picked slightly wider-than-tall rectangles as square, which is the direction the VHI predicts (see [Figure 2](#fig-2)). The numerical differences between devices were not statistically significant, and we see three possible explanations: the VHI may be device-invariant for square judgments, the study may be underpowered for small device effects, or individual variability may mask device effects.

<figure id="fig-2" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/vhi/vhi-choice-distribution.png' | relative_url }}" alt="Bar chart of the proportion of choices for each aspect ratio across PC, phone, AR flat, and AR curved" loading="lazy">
<figcaption>Figure 2. Distribution of "most square-like" choices by device. On every device, most choices fall at 1.00 or 1.05, and very few fall below 0.95.</figcaption>
</figure>

Accuracy was low on every device: 41.2% on PC, 32.3% on the phone, 25.2% on the flat AR canvas, and 40.6% on the curved AR canvas (see [Figure 3](#fig-3)). A Friedman test showed a significant device effect (χ²(3) = 8.216, p = 0.0418). After Holm-Bonferroni correction, two pairs differed: PC vs. flat AR (p = 0.018) and flat AR vs. curved AR (p = 0.0336). This indicates that, with the same headset and the same content, curving the rendering canvas raised accuracy to about the PC level (40.6% vs. 41.2%). The phone gave the fastest responses (median about 1.68 s), and the PC the slowest. Bias did not drift across the 10 trials, so learning and fatigue are unlikely to explain the device differences.

<figure id="fig-3" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/vhi/vhi-accuracy.png' | relative_url }}" alt="Box plot of square recognition accuracy for each device condition" loading="lazy">
<figcaption>Figure 3. Accuracy by device, measured as the share of valid trials in which the true square (1.00) was selected.</figcaption>
</figure>

## What's next

The curved-canvas result suggests that rendering geometry may be the more actionable lever for perceptual calibration in XR, since it changed accuracy without any change in hardware or content. We plan to test this with larger samples and higher-precision psychophysical methods, and to model each device's optics so that small display-induced distortions become detectable. In practice, nominally square UI elements may need a small aspect-ratio correction, and a short SRT-like test could serve as a calibration step in XR interface workflows.

This work was presented at ASME IDETC/CIE 2026 in Houston, TX ([citation]({{ '/publications/' | relative_url }}#yang2026seeing)), and the paper, slides, and demo video are linked at the top of this page.
