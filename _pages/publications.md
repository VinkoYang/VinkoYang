---
title: "Publications"
layout: gridlay
permalink: /publications/
description: "Journal articles, conference papers, and talks by Wenhao Yang on augmented reality, human-robot interaction, and robotics, with PDFs, DOIs, and BibTeX."
---

# Publications

<input type="text" class="pub-search" id="pubSearch" placeholder="Filter by title, author, venue, or year..." aria-label="Filter publications and talks">

{% capture preprint_count %}{% bibliography_count --query @unpublished %}{% endcapture %}
{% if preprint_count != "0" %}
## Preprints

<div class="section-card pub-list">
{% bibliography --query @unpublished %}
</div>
{% endif %}

## Refereed Journal Articles

<div class="section-card pub-list">
{% bibliography --query @article %}
</div>

## Refereed Conference Proceedings

<div class="section-card pub-list">
{% bibliography --query @inproceedings %}
</div>

## Talks

<div class="section-card pub-list">
<h3>Invited Talks</h3>

{% bibliography --query @incollection[keywords ^= invited] %}

<h3>Contributed Talks</h3>

{% bibliography --query @incollection[keywords != invited] %}
</div>
