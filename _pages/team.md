---
title: "Team"
layout: gridlay
sitemap: false
permalink: /team/
---

## Team

**We are looking for new team members!**

## PI

<div class="section-card">
<div class="pi-card">
<img src="{{ site.url }}{{ site.baseurl }}/images/{{ site.photo }}" class="pi-photo" alt="{{ site.name }}" loading="lazy">
<div>
<h3 class="pi-name">{{ site.name }}</h3>
<p style="font-style: italic; color: var(--text-secondary); margin: 0;">{{ site.title }}</p>
{% if site.department %}<p style="color: var(--text-secondary); margin: 0;">{{ site.department }}</p>{% endif %}
{% if site.college %}<p style="color: var(--text-secondary); margin: 0;">{{ site.college }}</p>{% endif %}
<p style="color: var(--text-tertiary); font-size: 0.9rem; margin: 0;">{{ site.institution }}{% if site.institution_location %}, {{ site.institution_location }}{% endif %}</p>
<div class="pi-links">
{% if site.email %}<a href="mailto:{{ site.email }}" class="icon-link" title="Email"><i class="fa-solid fa-envelope"></i></a>{% endif %}
{% if site.links.cv and site.links.cv != "" %}<a href="{{ site.url }}{{ site.baseurl }}/{{ site.links.cv }}" class="icon-link" title="CV"><i class="ai ai-cv"></i></a>{% endif %}
{% if site.links.google_scholar and site.links.google_scholar != "" %}<a href="{{ site.links.google_scholar }}" class="icon-link" title="Google Scholar"><i class="ai ai-google-scholar"></i></a>{% endif %}
{% if site.links.github and site.links.github != "" %}<a href="{{ site.links.github }}" class="icon-link" title="GitHub"><i class="fa-brands fa-github"></i></a>{% endif %}
{% if site.links.researchgate and site.links.researchgate != "" %}<a href="{{ site.links.researchgate }}" class="icon-link" title="ResearchGate"><i class="ai ai-researchgate"></i></a>{% endif %}
{% if site.links.orcid and site.links.orcid != "" %}<a href="{{ site.links.orcid }}" class="icon-link" title="ORCID"><i class="ai ai-orcid"></i></a>{% endif %}
{% if site.links.twitter and site.links.twitter != "" %}<a href="{{ site.links.twitter }}" class="icon-link" title="Twitter"><i class="fa-brands fa-x-twitter"></i></a>{% endif %}
{% if site.links.linkedin and site.links.linkedin != "" %}<a href="{{ site.links.linkedin }}" class="icon-link" title="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>{% endif %}
{% if site.links.youtube and site.links.youtube != "" %}<a href="{{ site.links.youtube }}" class="icon-link" title="YouTube"><i class="fa-brands fa-youtube"></i></a>{% endif %}
</div>
</div>
</div>
</div>

{% assign visible_students = site.data.web.people.students | where_exp: "s", "s.show_team == true" %}
{% if visible_students.size > 0 %}
## Current Students

<div class="team-grid">
{% for member in visible_students %}
<div class="team-card">
<img src="{{ site.url }}{{ site.baseurl }}/images/{{ member.photo }}" class="team-photo" alt="{{ member.name }}" loading="lazy">
<h4 class="team-name">{{ member.name }}</h4>
<p class="team-info">{{ member.info }}</p>
<div class="team-links">
{% if member.email %}<a href="mailto:{{ member.email }}" class="icon-link" title="Email"><i class="fa-solid fa-envelope"></i></a>{% endif %}
{% if member.website %}<a href="{{ member.website }}" class="icon-link" title="Website"><i class="fa-solid fa-house"></i></a>{% endif %}
{% if member.scholar %}<a href="{{ member.scholar }}" class="icon-link" title="Google Scholar"><i class="ai ai-google-scholar"></i></a>{% endif %}
{% if member.github %}<a href="{{ member.github }}" class="icon-link" title="GitHub"><i class="fa-brands fa-github"></i></a>{% endif %}
</div>
</div>
{% endfor %}
</div>
{% endif %}

{% if site.data.web.people.alumni.size > 0 %}
## Alumni

<div class="section-card">
<table class="alumni-table">
<thead>
<tr><th>Name</th><th>Degree</th><th>Duration</th><th>Thesis</th><th>Current Position</th></tr>
</thead>
<tbody>
{% assign sorted_alumni = site.data.web.people.alumni | sort: "year_end" | reverse %}
{% for member in sorted_alumni %}
<tr>
<td data-label="Name">{% if member.website and member.website != "" %}<a href="{{ member.website }}" target="_blank">{{ member.name }}</a>{% else %}{{ member.name }}{% endif %}</td>
<td data-label="Degree">{{ member.degree }}</td>
<td data-label="Duration">{% if member.year_start %}{{ member.year_start }}{% if member.year_end %} – {{ member.year_end }}{% endif %}{% endif %}</td>
<td data-label="Thesis" style="font-style: italic;">{{ member.thesis }}</td>
<td data-label="Current Position">{{ member.current_position }}</td>
</tr>
{% endfor %}
</tbody>
</table>
</div>
{% endif %}

{% assign collab_list = site.data.web.people.collaborators | where_exp: "c", "c.show_collaborator == true" | sort: "last_name" %}
{% if collab_list.size > 0 %}
## Collaborators

<div class="section-card">
<table class="alumni-table">
<thead>
<tr><th>Name</th><th>Affiliation</th></tr>
</thead>
<tbody>
{% for c in collab_list %}
<tr>
<td data-label="Name">{% if c.website and c.website != "" %}<a href="{{ c.website }}" target="_blank">{{ c.name }}</a>{% else %}{{ c.name }}{% endif %}</td>
<td data-label="Affiliation">{% if c.email and c.email != "" %}<a href="mailto:{{ c.email }}">{{ c.affiliation }}</a>{% else %}{{ c.affiliation }}{% endif %}</td>
</tr>
{% endfor %}
</tbody>
</table>
</div>
{% endif %}

## Administrative Support

<a href="mailto:hmartindale@lamar.edu">Heather Martindale</a> is helping us (and other groups) with administration.
