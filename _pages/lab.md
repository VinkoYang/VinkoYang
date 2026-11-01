---
title: "Lab"
layout: gridlay
permalink: /lab/
hero_image: images/lab/xrai_lab_wide.jpg
hero_slides:
  - src: images/lab/xrai_lab_wide.jpg
    alt: "XRAI Lab banner: extended reality, artificial intelligence, and robotics"
  - src: images/lab/environment/lab_space_1.jpg
    alt: "The lab floor with the Husky mobile robot, CNC mill, and the UR10e cell"
  - src: images/lab/environment/lab_space_2.jpg
    alt: "Rows of steel workbenches running the length of the lab"
  - src: images/lab/environment/lab_space_3.jpg
    alt: "Student workstations along the lab benches"
  - src: images/lab/environment/lab_space_4.jpg
    alt: "The Husky mobile robot in the open floor area"
  - src: images/lab/environment/lab_space_5.jpg
    alt: "Haas mini mill, studio lights, and the xArm 6 at the front of the lab"
description: "The XRAI Lab at Lamar University: research focus, team, how to join, and the robots, XR headsets, and cameras we use for extended reality, AI, and robotics research."
---
# XRAI Lab

<div class="section-card">
<p style="font-size: 0.95rem; line-height: 1.75; margin-bottom: var(--space-4);">
The <strong>Extended Reality, Artificial Intelligence, and Robotics (XRAI) Lab</strong> aims to advance the seamless integration of Extended Reality (XR), Artificial Intelligence (AI), and Robotics to create intelligent, interactive, and adaptive systems.
Our research focuses on next-generation technologies that seamlessly bridge the physical and virtual worlds, enabling intuitive human–machine interaction, augmenting human capabilities, and supporting collaborative autonomy.
</p>
<p style="font-size: 0.95rem; line-height: 1.75; margin: 0;">
Through interdisciplinary innovation, the XRAI Lab redefines how intelligent systems are designed, experienced, and deployed across real-world applications, including advanced manufacturing, engineering education, and human-centered automation.
</p>
</div>

{% include lab_news_carousel.html %}

## Research Focus

<div class="rf-grid" markdown="0">
{% for area in site.data.web.research_areas %}
<div class="section-card">
  <div class="rf-card">
    <div class="rf-image-wrap">
      <img src="{{ site.url }}{{ site.baseurl }}/images/{{ area.image }}" alt="{{ area.name }}" loading="lazy">
    </div>
    <div class="rf-content">
      <div class="rf-header">
        <span class="rf-number">{{ area.id }}</span>
        <h3 class="rf-name">{{ area.name }}</h3>
      </div>
      <p class="rf-desc">{{ area.description }}</p>
      <ul class="rf-projects">
        {% for proj in area.projects %}
        <li><a href="{{ site.url }}{{ site.baseurl }}/research/#{{ proj.slug }}">{{ proj.title }}</a></li>
        {% endfor %}
      </ul>
      <div class="rf-domains">
        {% for domain in area.domains %}
        <span class="chip chip-muted">{{ domain }}</span>
        {% endfor %}
      </div>
    </div>
  </div>
</div>
{% endfor %}
</div>

{% include lab_team.html %}

## Recent Research

{% assign _rr_video = nil %}
{% for v in site.data.videos %}{% if v.section == "research" and _rr_video == nil %}{% assign _rr_video = v %}{% endif %}{% endfor %}
{% if _rr_video %}

<div class="section-card rr-card" markdown="0">
<div class="rr-header">
<h3 class="rr-title">{{ _rr_video.title }}</h3>
</div>
<div class="rr-video-wrap">
{% include yt_embed.html src=_rr_video.embed_src title=_rr_video.title %}
</div>
<p class="rr-abstract">{{ _rr_video.abstract | strip_newlines | strip }}</p>
<div class="rr-actions">
<a href="{{ site.url }}{{ site.baseurl }}/videos/" class="rr-more-btn">Watch More »</a>
<a href="{{ site.url }}{{ site.baseurl }}/research/" class="rr-more-btn">Find More Projects »</a>
</div>
</div>
{% endif %}

## Equipment

<div class="equipment-grid">
{% for item in site.data.web.equipment %}{% unless item.shared %}
{% include equipment_card.html item=item %}
{% endunless %}{% endfor %}
</div>

### Shared Equipment

These machines are not owned by the XRAI Lab, but lab members can use them in their projects.

<div class="equipment-grid">
{% for item in site.data.web.equipment %}{% if item.shared %}
{% include equipment_card.html item=item %}
{% endif %}{% endfor %}
</div>
