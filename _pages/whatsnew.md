---
title: "What's New"
layout: gridlay
sitemap: false
permalink: /whatsnew/
---

## What's New

<div class="section-card" markdown="0">
<div class="news-timeline">
{% for release in site.data.web.whatsnew %}
<div class="news-item">
<span class="news-date">v{{ release.version }} &middot; {{ release.date }}</span>
<span class="news-headline">
<ul style="margin: 0; padding-left: 1.2em;">
{% for change in release.changes %}
<li>{{ change }}</li>
{% endfor %}
</ul>
</span>
</div>
{% endfor %}
</div>
</div>
