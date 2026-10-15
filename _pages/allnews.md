---
title: "News"
layout: gridlay
permalink: /allnews.html
description: "News from Wenhao Yang: papers, grants, talks, and XRAI Lab updates."
---

# News

<div class="section-card" markdown="0">
<div class="news-timeline">
{% for article in site.data.web.news %}
<div class="news-item">
<span class="news-date">{{ article.date }}</span>
<span class="news-headline">{{ article.headline }}</span>
</div>
{% endfor %}
</div>
</div>
