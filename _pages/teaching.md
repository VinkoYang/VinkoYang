---
title: "Teaching"
layout: gridlay
sitemap: false
permalink: /teaching/
---

## Teaching

{% for course in site.data.profile.teaching %}
<div class="section-card" id="{{ course.code | downcase | replace: ' ', '-' }}">

<div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-2);">
<div>
<h3 style="margin: 0 0 var(--space-1) 0;">{{ course.name }}</h3>
<p style="margin: 0; font-size: 0.9rem; color: var(--text-secondary);">{{ course.code }}</p>
</div>
<div style="display: flex; flex-wrap: wrap; gap: var(--space-2);">
{% for sem in course.semesters %}
<span class="chip chip-muted">{{ sem }}</span>
{% endfor %}
</div>
</div>

{% if course.description %}
<p style="margin: var(--space-4) 0 var(--space-3) 0; font-size: 0.95rem; line-height: 1.6;">{{ course.description }}</p>
{% endif %}

{% assign has_syllabus = false %}{% if course.syllabus and course.syllabus != "" %}{% assign has_syllabus = true %}{% endif %}
{% assign has_manual = false %}{% if course.lab_manual and course.lab_manual != "" %}{% assign has_manual = true %}{% endif %}
{% if has_syllabus or has_manual %}
<div style="font-size: 0.9rem; display: flex; flex-wrap: wrap; column-gap: var(--space-3); row-gap: 4px;">
{% if has_syllabus %}
<a href="{{ site.url }}{{ site.baseurl }}/{{ course.syllabus }}" target="_blank" style="display: inline-flex; align-items: center; gap: 6px;">
  <i class="fa-solid fa-file-pdf"></i> Syllabus
</a>
{% endif %}
{% if has_manual %}
<a href="{{ site.url }}{{ site.baseurl }}/{{ course.lab_manual }}" target="_blank" style="display: inline-flex; align-items: center; gap: 6px;">
  <i class="fa-solid fa-file-pdf"></i> Lab Manual
</a>
{% endif %}
</div>
{% endif %}

{% assign has_textbooks = false %}
{% for tb in course.textbooks %}{% if tb.url and tb.url != "" %}{% assign has_textbooks = true %}{% endif %}{% endfor %}
{% if has_textbooks %}
<div style="font-size: 0.9rem; margin-top: var(--space-2);">
<span style="font-weight: 600; margin-right: var(--space-2);">Textbooks:</span>
<div style="display: flex; flex-wrap: wrap; column-gap: var(--space-3); row-gap: 4px; margin-top: 1px;">
{% for tb in course.textbooks %}{% if tb.url and tb.url != "" %}
<a href="{{ tb.url }}" target="_blank" style="display: inline-flex; align-items: center; gap: 6px;">
  <i class="fa-solid fa-book"></i> {{ tb.title | default: "Textbook" }}
</a>
{% endif %}{% endfor %}
</div>
</div>
{% endif %}

{% if course.projects and course.projects.size > 0 %}
<div style="font-size: 0.9rem; margin-top: var(--space-2);">
<span style="font-weight: 600; margin-right: var(--space-2);">Projects:</span>
<div style="display: flex; flex-wrap: wrap; gap: var(--space-3); margin-top: var(--space-1);">
{% for project in course.projects %}
<a href="{{ project.url }}" target="_blank" style="display: inline-flex; align-items: center; gap: 6px;">
  <i class="fa-solid fa-star"></i> {{ project.title }}
</a>
{% endfor %}
</div>
</div>
{% endif %}

{% assign has_links = false %}
{% for lk in course.links %}{% if lk.url and lk.url != "" %}{% assign has_links = true %}{% endif %}{% endfor %}
{% if has_links %}
<div style="font-size: 0.9rem; margin-top: var(--space-2);">
<span style="font-weight: 600; margin-right: var(--space-2);">Links:</span>
<div style="display: flex; flex-wrap: wrap; column-gap: var(--space-3); row-gap: 4px; margin-top: 1px;">
{% for lk in course.links %}{% if lk.url and lk.url != "" %}
<a href="{{ lk.url }}" target="_blank" style="display: inline-flex; align-items: center; gap: 6px;">
  <i class="fa-solid fa-link"></i> {{ lk.title | default: "Link" }}
</a>
{% endif %}{% endfor %}
</div>
</div>
{% endif %}

</div>
{% endfor %}
