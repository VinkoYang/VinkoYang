---
title: "Home"
layout: homelay
permalink: /
description: "Wenhao Yang is an Assistant Professor of Industrial and Systems Engineering at Lamar University and directs the XRAI Lab, researching AR/VR/MR, robotics, and human-robot interaction."
---

<h1 class="home-hero">{{ site.name }}</h1>
<p class="home-hero-sub">{{ site.title }}, {{ site.institution }}</p>

## About me

Dr. Wenhao Yang is an Assistant Professor in the [Department of Industrial and Systems Engineering](https://www.lamar.edu/engineering/industrial/) at
[Lamar University](https://www.lamar.edu), where he joined in Fall 2024.
His [research]({{ site.url }}{{ site.baseurl }}/research) focuses on the integration of Augmented Reality (AR),
Virtual Reality (VR), and Mixed Reality (MR) with robotics and industrial systems, with particular emphasis on
human-robot interaction, immersive training environments, and resilient system design.

He received his Ph.D. in the Department of Industrial and Systems Engineering from
[Rochester Institute of Technology (RIT)](https://www.rit.edu) in 2023.
His work spans interdisciplinary areas including advanced manufacturing, human-computer interaction (HCI), and
user-centered system design, aiming to develop scalable and effective solutions for complex engineering challenges.

Dr. Yang has extensive experience in developing and [teaching]({{ site.url }}{{ site.baseurl }}/teaching) courses
in robotics and immersive technologies, including ST: Collab Robot Ops Pro, ST: AR/VR in Manufacturing,
Introduction to Robotics, and Robotics and Automation in Manufacturing.
He is passionate about making complex technologies accessible and impactful through both research and education.

He directs the [XRAI Lab]({{ site.url }}{{ site.baseurl }}/lab), where his [team]({{ site.url }}{{ site.baseurl }}/lab/#team)
explores innovative approaches at the intersection of robotics, XR technologies, and industrial applications.
Dr. Yang welcomes motivated students to [join the lab]({{ site.url }}{{ site.baseurl }}/lab/#join-the-lab) and contribute to research in these areas.

Outside the lab, he builds and ships [software]({{ site.url }}{{ site.baseurl }}/projects) — most recently
[Wherefold](https://wherefold.com), a bilingual travel platform built on a structured database of 5,110 curated
US attractions that he assembled and now visualizes through an interactive map.

<div class="chip-container" markdown="0">
<a href="{{ site.url }}{{ site.baseurl }}/research" class="chip">Augmented Reality</a>
<a href="{{ site.url }}{{ site.baseurl }}/research" class="chip">Mixed Reality</a>
<a href="{{ site.url }}{{ site.baseurl }}/research" class="chip">Human-Robot Interaction</a>
<a href="{{ site.url }}{{ site.baseurl }}/research" class="chip">XR Rehabilitation</a>
<a href="{{ site.url }}{{ site.baseurl }}/research" class="chip">Industrial XR</a>
<a href="{{ site.url }}{{ site.baseurl }}/research" class="chip">Spatial Computing</a>
</div>

## Recent Research

{% assign sorted_research = site.data.web.research | sort: "end_date" | reverse %}
<div class="home-projects-grid" markdown="0">
{% for item in sorted_research limit:4 %}
{% assign card_id = item.title | slugify %}
<a href="{{ site.url }}{{ site.baseurl }}/research#{{ card_id }}" class="home-project-card">
{% if item.image and item.image != "" %}
{% include card_media.html image=item.image alt=item.title %}
{% endif %}
<div class="home-project-card-body">
<h3>{{ item.title }}</h3>
<p>{{ item.abstract | truncatewords: 20 }}</p>
</div>
</a>
{% endfor %}
</div>

{% if site.data.web.projects and site.data.web.projects.size > 0 %}
## Software I've Built

{% assign sorted_projects = site.data.web.projects | sort: "end_date" | reverse %}
<div class="home-software-list" markdown="0">
{% for item in sorted_projects limit:2 %}
{% assign card_id = item.title | slugify %}
{% assign project_url = site.url | append: site.baseurl | append: "/projects/#" | append: card_id %}
<article class="home-software-card">
{% if item.image and item.image != "" %}
<a class="home-software-card-media" href="{{ project_url }}" tabindex="-1" aria-hidden="true">
<img src="{{ site.url }}{{ site.baseurl }}/images/{{ item.image }}" alt="" loading="lazy">
</a>
{% endif %}
<div class="home-software-card-body">
<h3><a href="{{ project_url }}">{{ item.title }}</a></h3>
{% if item.status or item.role or item.start_date %}
<div class="home-software-meta">
{% if item.status and item.status != "" %}<span class="home-software-status">{{ item.status }}</span>{% endif %}
{% if item.role and item.role != "" %}<span>{{ item.role }}</span>{% endif %}
{% if item.start_date %}<span>{{ item.start_date }}{% if item.end_date %}&ndash;{{ item.end_date }}{% else %}&ndash;Present{% endif %}</span>{% endif %}
</div>
{% endif %}
<div data-clamp>
<p class="js-clamp-text" id="home-{{ card_id }}-abstract">{{ item.abstract }}</p>
<button type="button" class="js-clamp-toggle" aria-expanded="false" aria-controls="home-{{ card_id }}-abstract" hidden><span class="js-clamp-label">Show more</span> <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>
</div>
{% if item.stack %}
<div class="home-software-stack">
{% for tech in item.stack limit:6 %}<span>{{ tech }}</span>{% endfor %}{% if item.stack.size > 6 %}<span>+{{ item.stack.size | minus: 6 }} more</span>{% endif %}
</div>
{% endif %}
<a class="home-software-cta" href="{{ project_url }}">View project <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
</div>
</article>
{% endfor %}
</div>

<p style="margin-top: var(--space-4);"><a href="{{ site.url }}{{ site.baseurl }}/projects/">See all projects &rarr;</a></p>
{% endif %}
