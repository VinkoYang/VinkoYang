---
layout: research_post
title: "Advanced Mixed Reality Training for First Responders in Hurricane Scenarios"
date: 2026-04-01
categories: ["Research Projects"]
tags: ["mixed-reality", "first-responders", "hurricane-scenarios", "training-simulation"]
project_id: advanced-mixed-reality-training-for-first-responders-in-hurricane-scenarios
---

## What problem this addresses

Hurricanes put first responders into rising water, poor visibility, and floating debris, often with little time to decide. Live drills, classroom instruction, and tabletop exercises are the usual ways to prepare for this. However, they are limited by cost, logistics, and safety, and a live flood cannot be staged on demand or at different severities.

Mixed reality (MR) offers a different option, since virtual floodwater can be placed inside a real room and the trainee moves through a familiar physical space while the hazard changes around them. This project, the MS thesis of [Muhammad Ilyas Mubarik](https://www.linkedin.com/in/ilyasmubarik/), asked whether an MR environment with floodwater, debris, degraded lighting, and environmental audio creates a more demanding training context than a baseline AR condition, and how that shows up in workload and task performance.

## Approach

We built the system in Unity with the [Universal Render Pipeline (URP)](https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@latest) and deployed it on a [Meta Quest 3S](https://www.meta.com/quest/quest-3s/) headset. Its core is a depth-aware water shader (see [Figure 1](#fig-1)). The Quest cameras provide the passthrough view, the [Depth API](https://developers.meta.com/horizon/documentation/unity/unity-depthapi-overview/) estimates the room's geometry and surfaces, and the depth data is used to hide virtual water behind real objects, so the water reads as if it were actually in the room. The researcher can control the water level, rainfall intensity, storm lighting, and spatial audio, which makes the scenario severity adjustable and repeatable (see [Figure 2](#fig-2)).

<figure id="fig-1" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/mr-training/mr-training-rendering-pipeline.jpg' | relative_url }}" alt="Pipeline from passthrough view to environment depth, occlusion logic, and virtual floodwater" loading="lazy">
<figcaption>Figure 1. Mixed reality floodwater rendering in a real room. The passthrough view and the Depth API provide the room geometry, and the occlusion logic keeps the virtual water from appearing over real objects.</figcaption>
</figure>

<figure id="fig-2" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/mr-training/mr-training-flooded-room.jpg' | relative_url }}" alt="A real lab room seen through the headset with virtual brown floodwater and rain covering the chairs" loading="lazy">
<figcaption>Figure 2. The flooded condition as seen through the headset: virtual floodwater and rain rendered inside a real room, with the chairs partly submerged.</figcaption>
</figure>

We evaluated the system in a within-subject study with 16 participants, in which each participant experienced a normal AR environment and a flooded AR environment. To eliminate any possible bias due to order, 8 participants completed the normal condition first and 8 completed the flooded condition first. In each condition, participants answered 5 randomized multiple-choice questions inside the headset, and after each condition they filled out the NASA Task Load Index (NASA-TLX) outside the headset, and a short interview followed both conditions.

## Results

The flooded condition raised perceived workload, and the weighted NASA-TLX score increased from 29.34 to 38.02 (Wilcoxon signed-rank, p = 0.001). Effort (p = 0.002), temporal demand (p = 0.016), and mental demand (p = 0.025) also increased significantly (see [Figure 3](#fig-3)). Physical demand and frustration went up as well, but these changes were not significant.

<figure id="fig-3" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/mr-training/mr-training-nasa-tlx.jpg' | relative_url }}" alt="Bar chart of NASA-TLX dimensions for normal and flooded conditions" loading="lazy">
<figcaption>Figure 3. Mean NASA-TLX scores for each dimension in the normal (gray) and flooded (red) conditions.</figcaption>
</figure>

Objective performance changed less. Accuracy dropped from 87.50% to 80.00% (p = 0.070) and the mean response time rose from 18.06 s to 21.11 s (p = 0.464), but neither change was significant. This indicates that, in this sample, the flood environment increased the subjective burden more clearly than it changed task outcomes. We also found that order mattered. Participants who saw the normal condition first showed a clear workload increase in the flooded condition (26.70 to 37.63, p = 0.004), while those who saw the flood first did not (33.75 to 38.67, p = 0.219).

In the survey, participants rated the believability of the water behavior, their improved understanding of how floodwater behaves, and the value of the tool for first responder education most positively, while ratings of comfort, display clarity, and visual authenticity were more mixed. In the open-ended answers, participants pointed to the water behavior, environmental sounds, debris, and reduced visibility as the features that made the scene feel realistic and risky. They also asked for better visual detail, smoother interaction, and more scenarios.

## What's next

This study has clear limitations. The participants were university volunteers rather than professional first responders, no domain expert reviewed the scenario, and the study covered only one flood scenario. Participants also received no headset familiarization before the study, which added variation to both workload and answers. The next study will recruit first responder trainees or professionals, such as firefighters, paramedics, and flood rescue operators, and add an onboarding and practice phase built into the application. We also plan to record behavioral measures, such as hesitation time and repeated actions, to extend the system to other emergency scenarios, and to test whether repeated use improves preparedness and retention over time.

The [full thesis]({{ '/files/papers/mubarik2026mrtraining.pdf' | relative_url }}), [defense slides]({{ '/files/slides/2026_mrtraining_slide.pdf' | relative_url }}), and demo video are linked at the top of this page.
