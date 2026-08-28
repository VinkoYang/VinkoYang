---
title: "Lab News"
layout: gridlay
sitemap: false
permalink: /lab/news/
---

## Lab News

News, visits, and events from the [XRAI Lab]({{ site.url }}{{ site.baseurl }}/lab/).
For short one-line updates, see [News]({{ site.url }}{{ site.baseurl }}/allnews.html).

{% assign labnews = site.lab_news | sort: "date" | reverse %}
{% if labnews.size > 0 %}
<div class="labnews-grid" markdown="0">
{% for item in labnews %}
<a class="labnews-card" href="{{ site.url }}{{ site.baseurl }}{{ item.url }}">
{% if item.cover and item.cover != "" %}
<div class="labnews-card-media">
<img src="{{ site.url }}{{ site.baseurl }}/images/{{ item.cover }}" alt="{{ item.title | escape }}" loading="lazy">
</div>
{% else %}
<div class="labnews-card-media labnews-card-media-empty"><i class="fa-solid fa-newspaper"></i></div>
{% endif %}
<div class="labnews-card-body">
<span class="labnews-card-date">{{ item.date | date: "%b %-d, %Y" }}</span>
<h4 class="labnews-card-title">{{ item.title }}</h4>
{% if item.summary %}<p class="labnews-card-summary">{{ item.summary }}</p>{% endif %}
</div>
</a>
{% endfor %}
</div>
{% else %}
<p class="text-muted">No lab news yet.</p>
{% endif %}
