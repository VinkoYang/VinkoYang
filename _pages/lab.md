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

## Recent Research

{% assign _rr_video = nil %}
{% for v in site.data.videos %}{% if v.section == "research" and _rr_video == nil %}{% assign _rr_video = v %}{% endif %}{% endfor %}
{% if _rr_video %}

<div class="section-card rr-card" markdown="0">
<div class="rr-header">
<h3 class="rr-title">{{ _rr_video.title }}</h3>
</div>
<div class="rr-video-wrap">
<iframe src="{{ _rr_video.embed_src }}" title="{{ _rr_video.title }}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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
{% for item in site.data.web.equipment %}
{% assign equip_id = item.name | slugify %}
{% assign equip_post = site.posts | where: "equipment_id", equip_id | first %}
<div class="equipment-card">
{% if item.image and item.image != "" %}
<img src="{{ site.url }}{{ site.baseurl }}/images/{{ item.image }}" class="equipment-thumb" alt="{{ item.name }}" loading="lazy">
{% else %}
<div class="equipment-thumb-placeholder"><i class="fa-solid fa-microchip"></i></div>
{% endif %}
<div class="equipment-body">
<p class="equipment-category">{{ item.category }}</p>
<h4 class="equipment-name">{% if equip_post %}<a href="{{ site.url }}{{ site.baseurl }}{{ equip_post.url }}">{{ item.name }}</a>{% else %}{{ item.name }}{% endif %}</h4>
<p class="equipment-desc">{{ item.description }}</p>
{% assign has_manual = false %}{% if item.manual and item.manual != "" %}{% assign has_manual = true %}{% endif -%}
{% assign show_tutorials = false %}{% unless equip_post %}{% if item.tutorials and item.tutorials.size > 0 %}{% assign show_tutorials = true %}{% endif %}{% endunless -%}
{% if has_manual or equip_post or show_tutorials %}
<div class="equipment-links" markdown="0">{% if has_manual %}<a href="{{ item.manual }}" class="equipment-link"{% if item.manual contains "://" %} target="_blank" rel="noopener"{% endif %}><i class="fa-solid fa-book"></i> Manual</a>{% endif %}{% if equip_post %}<a href="{{ site.url }}{{ site.baseurl }}{{ equip_post.url }}" class="equipment-link"><i class="fa-solid fa-book-open-reader"></i> Training Guide</a>{% endif %}{% if show_tutorials %}{% for t in item.tutorials %}<a href="{{ t.url }}" class="equipment-link"{% if t.url contains "://" %} target="_blank" rel="noopener"{% endif %}><i class="fa-solid fa-circle-play"></i> {{ t.title }}</a>{% endfor %}{% endif %}</div>
{% endif -%}
</div>
</div>
{% endfor %}
</div>
