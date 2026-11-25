---
layout: research_post
title: "An application of depth map completion and super-resolution in AR rendering"
date: 2021-11-01
categories: ["Research Projects"]
tags: ["augmented-reality"]
project_id: an-application-of-depth-map-completion-and-super-resolution-in-ar-rendering
---

## What problem this addresses

A video see-through AR headset decides whether a virtual object should appear in front of or behind a real object by comparing depths. The depth of the virtual scene is exact, but the depth of the real scene comes from a consumer-level depth camera, which usually gives low resolution, missing regions, and jagged boundaries. In our [visualization error analysis]({{ '/blogs/visualization-error-analysis-for-augmented-reality-stereo-vst-system/' | relative_url }}), we listed this as the rendering error: when the real depth is wrong, a virtual object that should be in front of a real one can disappear or be partly cut off. In AR robot programming, this means the operator can misjudge whether the virtual robot collides with the real workcell.

Many methods exist for completing and upsampling RGB images, but depth images are harder, because their boundaries and geometry matter. This project tested whether a learned depth completion and super-resolution method can fix the occlusion problem in a real AR robot programming interface.

## Approach

The method is a multi-scale progressive fusion network, developed with Chuhua Xian and Jun Zhang (see [Figure 1](#fig-1)). It takes a raw depth image and its RGB image as input. A color encoder branch extracts texture and structure from the RGB image, a depth encoder branch extracts geometric features from the depth image, and a reconstruct branch fuses the features of both branches level by level to produce a complete or higher-resolution depth image, while a multi-dimension loss keeps the boundaries and geometric features sharp. To train depth completion at scale, the network uses a hybrid strategy that combines random masks with real and synthetic RGB-D data.

<figure id="fig-1" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/depth-completion/depth-network.jpg' | relative_url }}" alt="Encoder-decoder network with a depth encoder branch, a color encoder branch, and a reconstruct branch" loading="lazy">
<figcaption>Figure 1. The multi-scale progressive fusion network. The depth and color encoder branches extract features at several scales, and the reconstruct branch fuses them step by step to restore the depth image.</figcaption>
</figure>

Wenhao Yang and Jun Zhang carried out the human-robot collaboration applications. We applied the trained network, without additional training, to three scenarios: a remote-controlled robot on an unmanned ground vehicle (UGV), AR-based toolpath planning, and automatic toolpath extraction. For the first two, a ZED Mini camera captured depth at 1280 × 720 and 30 frames per second.

## Results

On the [NYU Depth V2](https://cs.nyu.edu/~fergus/datasets/nyu_depth_v2.html) and [Matterport3D](https://niessner.github.io/Matterport/) test sets, and other public datasets, the method outperformed the compared state-of-the-art methods in depth completion and super-resolution, both qualitatively and quantitatively. It is also fast, running at 0.15–0.18 s per frame for super-resolution on NYU Depth V2, which matters for real-time AR.

In the AR toolpath planning interface, the operator defines waypoints, checks the virtual robot traveling along the path, and only then lets the real robot move, so this check depends on correct occlusion. With the raw depth image, the missing depth on the corner of the frame structure made the virtual robot render incorrectly. After our method completed and refined the depth image, the virtual robot was rendered with proper occlusion (see [Figure 2](#fig-2)). The same holds for the UGV scenario, where the black boxes in [Figure 3](#fig-3) mark the regions that were missing in the raw depth and are filled in by our method.

<figure id="fig-2" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/depth-completion/depth-ar-occlusion.jpg' | relative_url }}" alt="AR toolpath planning view with depth map and AR scene rendering before and after depth completion" loading="lazy">
<figcaption>Figure 2. AR-based toolpath planning. (a) The operator defines the toolpath and watches the virtual robot travel along it; (b) the raw depth image causes an occlusion error in the AR rendering; (c) with the depth processed by our method, the virtual robot is rendered with correct occlusion.</figcaption>
</figure>

<figure id="fig-3" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/depth-completion/depth-ugv.jpg' | relative_url }}" alt="UGV robot, RGB image, raw depth, a baseline result, and the completed depth map in a production line" loading="lazy">
<figcaption>Figure 3. Depth completion for a remote-controlled UGV robot in a production line environment. Black boxes highlight the areas of the depth images that have been fully completed.</figcaption>
</figure>

## What's next

The AR test checked occlusion on real scenes, but it did not measure occlusion quality with a quantitative metric or with users. Note that better depth only addresses the rendering error. The other error classes remain, and the camera extrinsic error, which our analysis identified as the main source of misregistration, is addressed in our [global calibration framework]({{ '/blogs/a-global-calibration-to-solve-the-misregistration-problems-in-vst-ar-system/' | relative_url }}).

This work was published in the [Journal of Intelligent Manufacturing](https://link.springer.com/article/10.1007/s10845-023-02299-7) (see the [citation]({{ '/publications/' | relative_url }}#xian2024multi)).
