---
title: "About"
layout: gridlay
sitemap: false
permalink: /about/
---

## About

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

{% if site.data.profile.education %}
<div class="section-card">
<h3>Education</h3>
{% for edu in site.data.profile.education %}
<div>
<div class="experience-header">
<div>
<h4 style="margin: 0; margin-bottom: var(--space-1);">{{ edu.degree }} ｜ {{ edu.institution }}</h4>
<p style="margin: 0; font-size: 0.9rem; color: var(--text-tertiary);">{{ edu.location }}</p>
</div>
<p class="experience-dates">{{ edu.dates }}</p>
</div>
<ul style="margin-top: var(--space-2); padding-left: 1.5rem;">
{% for detail in edu.details %}
<li style="margin-bottom: var(--space-1); font-size: 0.95rem;">{{ detail }}</li>
{% endfor %}
</ul>
</div>
{% unless forloop.last %}<hr style="border: none; border-top: 1px solid var(--border-color); margin: var(--space-4) 0;">{% endunless %}
{% endfor %}
</div>
{% endif %}





{% if site.data.profile.experience.professional_experience %}
<div class="section-card">
<h3>Professional Experience</h3>
{% for job in site.data.profile.experience.professional_experience %}
<div>
<div class="experience-header">
<div>
<h4 style="margin: 0; margin-bottom: var(--space-1);">{{ job.position }}</h4>
<p style="margin: 0; margin-bottom: var(--space-1); color: var(--text-secondary);">{{ job.company }}</p>
<p style="margin: 0; font-size: 0.9rem; color: var(--text-tertiary);">{{ job.location }}</p>
</div>
<p class="experience-dates">{{ job.dates }}</p>
</div>
<ul style="margin-top: var(--space-2); padding-left: 1.5rem;">
{% for highlight in job.highlights %}
<li style="margin-bottom: var(--space-1); font-size: 0.95rem;">{{ highlight }}</li>
{% endfor %}
</ul>
</div>
{% unless forloop.last %}<hr style="border: none; border-top: 1px solid var(--border-color); margin: var(--space-4) 0;">{% endunless %}
{% endfor %}
</div>
{% endif %}

{% if site.data.profile.experience.teaching_experience %}
<div class="section-card">
<h3>Teaching Experience</h3>
{% for job in site.data.profile.experience.teaching_experience %}
<div>
<div class="experience-header">
<div>
<h4 style="margin: 0; margin-bottom: var(--space-1);">{{ job.position }}</h4>
<p style="margin: 0; margin-bottom: var(--space-1); color: var(--text-secondary);">{{ job.institution }}{% if job.course %} · {{ job.course }}{% endif %}</p>
<p style="margin: 0; font-size: 0.9rem; color: var(--text-tertiary);">{{ job.location }}</p>
</div>
<p class="experience-dates">{{ job.dates }}</p>
</div>
{% if job.description %}
<p style="margin: var(--space-2) 0; font-size: 0.95rem;">{{ job.description }}</p>
{% endif %}
{% if job.courses %}
<ul style="margin-top: var(--space-2); padding-left: 1.5rem;">
{% for course in job.courses %}
<li style="margin-bottom: var(--space-1); font-size: 0.95rem;">{{ course }}</li>
{% endfor %}
</ul>
{% endif %}
{% if job.highlights %}
<ul style="margin-top: var(--space-2); padding-left: 1.5rem;">
{% for highlight in job.highlights %}
<li style="margin-bottom: var(--space-1); font-size: 0.95rem;">{{ highlight }}</li>
{% endfor %}
</ul>
{% endif %}
</div>
{% unless forloop.last %}<hr style="border: none; border-top: 1px solid var(--border-color); margin: var(--space-4) 0;">{% endunless %}
{% endfor %}
</div>
{% endif %}

{% if site.data.profile.grants %}
<div class="section-card">
<h3>Grants</h3>
<ul>
{% for grant in site.data.profile.grants %}
<li>{{ grant.name | replace: "Yang, W.", "<strong>Yang, W.</strong>" }}</li>
{% endfor %}
</ul>
</div>
{% endif %}

{% if site.data.profile.awards %}
<div class="section-card">
<h3>Awards</h3>
<ul>
{% for award in site.data.profile.awards %}
<li>{{ award.name | replace: "-","&#8211;" }}</li>
{% endfor %}
</ul>
</div>
{% endif %}

{% assign mentored_students = site.data.web.people.students | where_exp: "s", "s.show_about == true" %}
{% assign mentored_alumni = site.data.web.people.alumni | where_exp: "a", "a.mentoring_role != nil and a.mentoring_role != ''" %}
{% assign all_mentored = mentored_students | concat: mentored_alumni %}
{% if all_mentored.size > 0 %}
<div class="section-card">
<h3>Students and Mentoring</h3>
{% assign mentoring_categories = "doctoral_advisor,master_advisor,doctoral_committee,master_committee" | split: "," %}
{% assign mentoring_labels = "Doctoral Dissertation Advisor,Master Thesis Advisor,Doctoral Dissertation Committee,Master Thesis Committee" | split: "," %}
{% for cat in mentoring_categories %}
  {% assign cat_students = all_mentored | where: "mentoring_role", cat %}
  {% if cat_students.size > 0 %}
    {% assign cat_index = forloop.index0 %}
    {% assign sorted_students = cat_students | sort: "year_end" | reverse %}
<h4 style="margin-top: var(--space-4); margin-bottom: var(--space-2);">{{ mentoring_labels[cat_index] }}</h4>
<ul>
    {% for student in sorted_students %}
<li>{{ student.name }}{% if student.location %}, {{ student.location }}{% elsif student.affiliation %}, {{ student.affiliation }}{% endif %}{% if student.degree or student.year_start %} ({% if student.degree %}{{ student.degree }}{% endif %}{% if student.degree and student.year_start %}, {% endif %}{% if student.year_start %}{{ student.year_start }}{% if student.year_end %} – {{ student.year_end }}{% endif %}{% endif %}){% endif %}{% if student.thesis %}<br><span style="font-size: 0.9em; color: var(--text-secondary);">Thesis: {{ student.thesis }}</span>{% endif %}</li>
    {% endfor %}
</ul>
  {% endif %}
{% endfor %}
</div>
{% endif %}

{% if site.data.profile.services %}
<div class="section-card">
<h3>Academic Services</h3>
{% for service in site.data.profile.services %}
<h4 style="margin-top: var(--space-4); margin-bottom: var(--space-2);">{{ service.category }}</h4>
<ul>
{% for item in service.items %}
<li>{{ item.name }}{% if item.years %}: {{ item.years }}{% endif %}</li>
{% endfor %}
</ul>
{% endfor %}
</div>
{% endif %}

{% if site.data.web.funders %}
<div class="section-card">
<h4>Sponsors</h4>
<div class="sponsor-logos" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: var(--space-6);">
{% for funder in site.data.web.funders %}
<a href="{{ funder.url }}" target="_blank"><img src="{{ site.url }}{{ site.baseurl }}/images/{{ funder.image }}" alt="Funder logo" style="max-height: 80px; max-width: 200px; border-radius: 0;" loading="lazy"></a>
{% endfor %}
</div>
</div>
{% endif %}
