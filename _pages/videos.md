---
title: "Videos"
layout: gridlay
sitemap: false
permalink: /videos/
---

## Research Videos

<div class="video-list" markdown="0">
{% for v in site.data.videos %}
{% if v.section == "research" %}
<div class="video-card-v">
<h3 class="video-card-v-title">{{ v.title }}</h3>
<div class="embed-16x9">
<iframe src="{{ v.embed_src }}" title="{{ v.title }}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
{% if v.keywords %}<div class="video-card-v-keywords">{% for kw in v.keywords %}<span class="research-kw">{{ kw }}</span>{% endfor %}</div>{% endif %}
<div class="video-card-v-desc" data-clamp>
<p class="video-card-v-abstract js-clamp-text" id="video-abstract-{{ forloop.index }}">{{ v.abstract | strip_newlines | strip }}</p>
<button type="button" class="js-clamp-toggle" aria-expanded="false" aria-controls="video-abstract-{{ forloop.index }}" hidden><span class="js-clamp-label">Show more</span> <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>
</div>
</div>
{% endif %}
{% endfor %}
</div>

## Teaching & Student Project Videos

<div class="video-list" markdown="0">
{% for v in site.data.videos %}
{% if v.section == "teaching" %}
<div class="video-card-v">
<h3 class="video-card-v-title">{{ v.title }}</h3>
<div class="embed-16x9">
<iframe src="{{ v.embed_src }}" title="{{ v.title }}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
<p class="video-card-v-abstract">{{ v.course_label }}</p>
</div>
{% endif %}
{% endfor %}
</div>
