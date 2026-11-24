---
title: "Blog"
layout: gridlay
permalink: /blogs/
description: "Guides by Wenhao Yang for new researchers: lab equipment onboarding, literature search, research presentations, and XR and robotics tools."
---

# Blog

{% assign research_project_posts = site.posts | where_exp: "p", "p.categories contains 'Research Projects'" %}
{% if site.posts.size > 0 %}
<div class="chip-container" id="blogFilter" markdown="0">
  <a href="#" class="chip" data-filter="all">All</a>
  {% if research_project_posts.size > 0 %}
  <a href="#" class="chip chip-muted" data-filter="Research Projects">Research Projects</a>
  {% endif %}
  <a href="#" class="chip chip-muted" data-filter="Teaching & Learning">Teaching & Learning</a>
  <a href="#" class="chip chip-muted" data-filter="Research & Scholarship">Research & Scholarship</a>
  <a href="#" class="chip chip-muted" data-filter="Industry Insights">Industry Insights</a>
  <a href="#" class="chip chip-muted" data-filter="Reading & Critical Thinking">Reading & Critical Thinking</a>
  <a href="#" class="chip chip-muted" data-filter="Life & Reflections">Life & Reflections</a>
  <a href="#" class="chip chip-muted" data-filter="Opinions & Dialogue">Opinions & Dialogue</a>
</div>

<div class="blog-list" markdown="0">
{% for post in site.posts %}
{%- assign excerpt = post.description -%}
{%- unless excerpt -%}{%- unless post.excerpt contains "<h" -%}{%- assign excerpt = post.excerpt -%}{%- endunless -%}{%- endunless -%}
<article class="blog-card" data-category="{{ post.categories | join: ',' }}">
  <div class="blog-card-body">
    <p class="blog-card-meta"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d, %Y" }}</time>{% if post.categories %}<span class="bc-dot" aria-hidden="true">&middot;</span>{{ post.categories | join: ", " }}{% endif %}</p>
    <h2 class="blog-card-title"><a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h2>
    {%- if excerpt %}
    <p class="blog-card-excerpt">{{ excerpt | strip_html | strip_newlines | normalize_whitespace }}</p>
    {%- endif %}
    {%- if site.post_stats.endpoint and site.post_stats.endpoint != "" %}
    <p class="blog-card-stats" data-stats-path="{{ post.url }}" hidden>
      <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg><span data-stat="views">0</span><span class="sr-only"> views</span></span>
      <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/></svg><span data-stat="likes">0</span><span class="sr-only"> likes</span></span>
    </p>
    {%- endif %}
  </div>
  <div class="blog-card-cover">
    {%- if post.cover -%}
    <img src="{{ post.cover | prepend: '/images/' | prepend: site.baseurl | prepend: site.url }}" alt="" width="1600" height="900" loading="lazy" decoding="async">
    {%- else -%}
    <span class="blog-card-cover-fallback" aria-hidden="true"><span>{{ post.categories.first }}</span></span>
    {%- endif -%}
  </div>
</article>
{% endfor %}
</div>

<script>
(function () {
  var buttons = document.querySelectorAll('#blogFilter .chip');
  var items = document.querySelectorAll('.blog-card[data-category]');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var filter = btn.getAttribute('data-filter');
      buttons.forEach(function (b) { b.classList.add('chip-muted'); });
      btn.classList.remove('chip-muted');
      items.forEach(function (item) {
        if (filter === 'all' || item.getAttribute('data-category').indexOf(filter) !== -1) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
})();
</script>
{% if site.post_stats.endpoint and site.post_stats.endpoint != "" %}
<script src="{{ site.baseurl }}/assets/js/post-stats.js" data-endpoint="{{ site.post_stats.endpoint }}" defer></script>
{% endif %}
{% else %}
<p class="text-muted">No blog posts yet.</p>
{% endif %}
