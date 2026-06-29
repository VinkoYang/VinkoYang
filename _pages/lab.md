---
title: "Lab"
layout: gridlay
sitemap: false
permalink: /lab/
hero_image: images/lab/xrai_lab_wide.png
---
## XRAI Lab

<div class="section-card">
<h3>About XRAI Lab</h3>
<p style="font-size: 0.95rem; line-height: 1.75; margin-bottom: var(--space-4);">
The <strong>Extended Reality, Artificial Intelligence, and Robotics (XRAI) Lab</strong> aims to advance the seamless integration of Extended Reality (XR), Artificial Intelligence (AI), and Robotics to create intelligent, interactive, and adaptive systems.
Our research focuses on next-generation technologies that seamlessly bridge the physical and virtual worlds, enabling intuitive human–machine interaction, augmenting human capabilities, and supporting collaborative autonomy.
</p>
<p style="font-size: 0.95rem; line-height: 1.75; margin: 0;">
Through interdisciplinary innovation, the XRAI Lab redefines how intelligent systems are designed, experienced, and deployed across real-world applications, including advanced manufacturing, engineering education, and human-centered automation.
</p>
</div>

## Research Focus

<div class="rf-grid" markdown="0">
{% for area in site.data.research_areas %}
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

## Recent Research

{% assign _rr_sorted = site.data.research | sort: "end_date" | reverse %}
{% assign _rr_found = 0 %}
{% for _rr_item in _rr_sorted %}{% if _rr_found == 0 %}{% if _rr_item.links.video and _rr_item.links.video != "" %}{% if _rr_item.links.video contains "youtu" %}{% assign _rr_project = _rr_item %}{% assign _rr_found = 1 %}{% endif %}{% endif %}{% endif %}{% endfor %}
{% if _rr_found == 1 %}
{% if _rr_project.links.video contains "youtu.be/" %}{% assign _rr_vid = _rr_project.links.video | split: "youtu.be/" | last | split: "?" | first %}{% else %}{% assign _rr_vid = _rr_project.links.video | split: "v=" | last | split: "&" | first %}{% endif %}

<div class="section-card rr-card" markdown="0">
<div class="rr-header">
<h3 class="rr-title">{{ _rr_project.title }}</h3>
</div>
<div class="rr-video-wrap">
<iframe src="https://www.youtube.com/embed/{{ _rr_vid }}" title="{{ _rr_project.title }}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
<p class="rr-abstract">{{ _rr_project.abstract | strip_newlines | strip }}</p>
<div class="rr-actions">
<a href="{{ site.url }}{{ site.baseurl }}/videos/" class="rr-more-btn">Watch More »</a>
<a href="{{ site.url }}{{ site.baseurl }}/research/" class="rr-more-btn">Find More Projects »</a>
</div>
</div>
{% endif %}

## Equipment

<div class="equipment-grid">
{% for item in site.data.equipment %}
<div class="equipment-card">
{% if item.image and item.image != "" %}
<img src="{{ site.url }}{{ site.baseurl }}/images/{{ item.image }}" class="equipment-thumb" alt="{{ item.name }}" loading="lazy">
{% else %}
<div class="equipment-thumb-placeholder"><i class="fa-solid fa-microchip"></i></div>
{% endif %}
<div class="equipment-body">
<p class="equipment-category">{{ item.category }}</p>
<h4 class="equipment-name">{{ item.name }}</h4>
<p class="equipment-desc">{{ item.description }}</p>
</div>
</div>
{% endfor %}
</div>
