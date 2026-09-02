---
title: "Videos"
layout: gridlay
sitemap: false
permalink: /videos/
---

## Research Videos

<div class="video-list" markdown="0">
{% assign _v_sorted = site.data.web.research | sort: "end_date" | reverse %}
{% for _v_item in _v_sorted %}
{% if _v_item.links.video and _v_item.links.video != "" %}
{% if _v_item.links.video contains "youtu" %}
{% if _v_item.links.video contains "youtu.be/" %}{% assign _v_id = _v_item.links.video | split: "youtu.be/" | last | split: "?" | first %}{% elsif _v_item.links.video contains "youtube.com/watch?v=" %}{% assign _v_id = _v_item.links.video | split: "v=" | last | split: "&" | first %}{% else %}{% assign _v_id = "" %}{% endif %}
{% if _v_id != "" %}
<div class="video-card-v">
<h3 class="video-card-v-title">{{ _v_item.title }}</h3>
<div class="video-card-v-embed">
<iframe src="https://www.youtube.com/embed/{{ _v_id }}" title="{{ _v_item.title }}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
{% if _v_item.keywords %}<div class="video-card-v-keywords">{% for kw in _v_item.keywords %}<span class="research-kw">{{ kw }}</span>{% endfor %}</div>{% endif %}
<p class="video-card-v-abstract">{{ _v_item.abstract | strip_newlines | strip }}</p>
</div>
{% endif %}
{% endif %}
{% endif %}
{% endfor %}
</div>

## Teaching & Student Project Videos

<div class="video-list" markdown="0">
{% for _t_course in site.data.profile.teaching %}
{% for _t_proj in _t_course.projects %}
{% if _t_proj.url contains "youtu" %}
{% if _t_proj.url contains "youtu.be/" %}{% assign _t_id = _t_proj.url | split: "youtu.be/" | last | split: "?" | first %}{% elsif _t_proj.url contains "youtube.com/watch?v=" %}{% assign _t_id = _t_proj.url | split: "v=" | last | split: "&" | first %}{% else %}{% assign _t_id = "" %}{% endif %}
{% if _t_id != "" %}
<div class="video-card-v">
<h3 class="video-card-v-title">{{ _t_proj.title }}</h3>
<div class="video-card-v-embed">
<iframe src="https://www.youtube.com/embed/{{ _t_id }}" title="{{ _t_proj.title }}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
<p class="video-card-v-abstract">{{ _t_course.name }} ({{ _t_course.code }})</p>
</div>
{% endif %}
{% endif %}
{% endfor %}
{% endfor %}
</div>
