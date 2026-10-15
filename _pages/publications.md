---
title: "Publications"
layout: gridlay
permalink: /publications/
description: "Journal articles and conference papers by Wenhao Yang on augmented reality, human-robot interaction, and robotics, with PDFs, DOIs, and BibTeX."
---

# Publications

<input type="text" class="pub-search" id="pubSearch" placeholder="Filter by title, author, or year...">

<div class="section-card" id="pubList">
{% capture preprint_count %}{% bibliography_count --query @unpublished %}{% endcapture %}
{% if preprint_count != "0" %}
<h3>Preprints</h3>

{% bibliography --query @unpublished %}
{% endif %}

<h3>Refereed Journal Articles</h3>

{% bibliography --query @article %}

<h3>Refereed Conference Proceedings</h3>

{% bibliography --query @inproceedings %}
</div>
