---
layout: research_post
title: "AI Identification and Mapping of Invasive Aquatic Plants"
date: 2026-05-01
categories: ["Research Projects"]
tags: ["computer-vision", "machine-learning", "environmental-monitoring", "remote-sensing", "ai-assisted-learning"]
project_id: ai-identification-and-mapping-of-invasive-aquatic-plants
published: false
---

## What problem this addresses

The [Lower Neches Valley Authority (LNVA)](https://lnva.dst.tx.us/) maintains a canal system in Southeast Texas, and floating invasive plants such as yellow floating heart (*Nymphoides peltata*) spread across the water surface and can slow the flow. LNVA crews find these infestations by visual survey during canal inspections, and then treat them with herbicide. Therefore, how much of the canal gets checked depends on how much of it a crew can drive and look at. A second problem is that several native floating plants, such as spatterdock and water lilies, have round leaves and yellow or white flowers that look like yellow floating heart from the bank.

This project was a two-semester senior design project in the Department of Industrial and Systems Engineering, sponsored by LNVA. The student team, MechGenius Creations, started in fall 2025 with a broad brief: a robot that identifies and removes vegetation from a canal. After a literature review of herbicide, mechanical, and manual removal and of the surface robots built for this job, we narrowed the spring 2026 scope to the step every removal method needs first: telling the target species apart from its native look-alikes, and recording where it was found.

## Approach

The first prototype was an image classification app built in Google AI Studio. It worked on a small set of test photos, but it took about 9 s per image, handled roughly 50 images per batch, and the team could not see or control what the underlying model was trained on. When the service became paid in early 2026, the team rebuilt the system on open-source tools.

The final system is the [Invasive Plant Identifier](https://github.com/lparker25/Invasive-Plant-Identifier), a Python application with a [Streamlit](https://streamlit.io/) interface. The classifier is a ResNet18 network pretrained on ImageNet and fine-tuned in PyTorch on the team's plant images. The app has three modes (see [Figure 1](#fig-1)). In the training mode, the user adds a species with its training and validation images, tags it as invasive or non-invasive, selects the species to train on, sets the number of epochs, and saves the classifier. In the identification mode, the user uploads images or a zip file and sets a confidence threshold, and any prediction below the threshold is labeled "other". In the analysis mode, every detection is stored in a SQLite database with the image name, species, confidence, invasive flag, timestamp, and optional GPS location. The user can correct a record there and export the table as CSV. The whole system runs offline on a Microsoft Surface laptop with an Intel i5 processor. A hosted copy also runs on [Streamlit Community Cloud](https://invasive-plant-identifier-xgcth8imhbdwbkcw6m3qcr.streamlit.app/). The team wrote the code with help from GitHub Copilot and Qwen.

<figure id="fig-1" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/plant-id/plant-id-app-screens.jpg' | relative_url }}" alt="Three screenshots of the Invasive Plant Identifier app: training, identification, and database views" loading="lazy">
<figcaption>Figure 1. The three modes of the Invasive Plant Identifier. Left: training, where species are added with training and validation images and the classifier is fine-tuned. Middle: identification, with the confidence threshold slider and an analyzed test image. Right: the database of detection records, which can be edited and exported as CSV.</figcaption>
</figure>

For mapping, the team planned a drone survey whose images would be classified and written back as a GIS layer of invasive plant coverage. The mission used a flight altitude of 200 ft, 70% image overlap, a nadir camera (90°), a speed of 11 to 12 mph, and ground control points. With these settings, the ground sample distance is about 3 cm per pixel. The team built orthomosaic layers in ArcGIS to check this workflow, so that a new layer can be compared with an earlier one to track growth.

## Results

The team trained the classifier on six species and evaluated it over 45 trials on three image datasets, with yellow floating heart and spatterdock as the primary targets. The average accuracy was 79.82%, the average processing time was 0.032 s per image (compared with about 9 s for the AI Studio prototype), and the average confidence score was 89.91%. For yellow floating heart, the accuracy was 88.57%, the recall was 90.91%, the specificity was 89.17%, and the precision was 65.90%. Spatterdock followed the same pattern (81.82%, 85.00%, 80.43%, and 65.00%). In other words, the classifier found about nine out of ten yellow floating heart images, but about one in three of its yellow floating heart labels were wrong. For a survey tool, a false alarm costs a crew a second look, while a miss lets an infestation keep spreading. Therefore, a high recall with a moderate precision fits a screening role, as long as a person checks each positive before treatment.

On April 3, 2026, the team visited a canal site southwest of Winnie, Texas, and photographed an active infestation (see [Figure 2](#fig-2)). They collected 110 images of two species: giant salvinia (*Salvinia molesta*), which is invasive, and pink evening primrose (*Oenothera speciosa*), a native plant on the canal bank. On this field set, the average accuracy was 77.67% at 0.021 s per image. Pink evening primrose was recognized well (recall 96.43%, precision 98.73%). Every image labeled giant salvinia was giant salvinia (precision 100%), but the model caught only 65.58% of the giant salvinia images. The yellow floating heart class picked up many false positives on this set (precision 31.60%). We do not have the confusion matrix for this set, so we cannot say which images were taken for yellow floating heart.

<figure id="fig-2" class="labnews-gallery-item" markdown="0">
<img src="{{ '/images/research/plant-id/plant-id-field-samples.jpg' | relative_url }}" alt="Field photos of giant salvinia covering a canal and pink evening primrose on the canal bank" loading="lazy">
<figcaption>Figure 2. Field samples from the canal site southwest of Winnie, Texas, collected on April 3, 2026. The left two photos show giant salvinia (invasive) covering the water surface, and the right two show pink evening primrose (non-invasive) on the canal bank. Photos by Adolfo Lares Leon.</figcaption>
</figure>

The identification screen in [Figure 1](#fig-1) shows a limitation that the numbers above do not. The test image is an American white waterlily, and the app labeled it spatterdock with a confidence of 0.94, which is above the 0.80 threshold. A confidence threshold only sends a photo to "other" when the model is unsure. It does not catch a confident mistake between look-alikes, or a species the model has never seen, and a canal has many more species than the six the model was trained on.

Against its three design goals, the project met the identification goal at 79.82% overall accuracy and the offline, lightweight goal on a laptop. The mapping goal was met at the planning level (mission parameters and the ground sample distance estimate). The step that runs the classifier on drone images and writes the result as a GIS layer was not built within the semester.

## What's next

The team listed the next steps as a larger image set with more field data, an automated training process, an improved interface, the link between the classifier and the GIS layer, and a removal strategy that uses the detections. Two more changes follow from the results. First, the training set needs the native species that actually grow at LNVA sites, so that a look-alike is labeled as itself instead of as the closest target. Second, the classifier labels whole images. Mapping coverage from drone imagery would need the model to say where in the image the plant is, which points to tiled classification or segmentation.

This prototype is now one input to a broader collaboration with LNVA on monitoring its canal system, in which a Lamar geospatial team has started flying drone surveys over LNVA sites. The project materials are linked above: the [code on GitHub](https://github.com/lparker25/Invasive-Plant-Identifier), the [final poster]({{ '/files/posters/2026_MechGenius_Poster.pdf' | relative_url }}), and the [final presentation]({{ '/files/slides/2026_MechGenius_Slide.pdf' | relative_url }}).
