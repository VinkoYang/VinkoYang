---
title: "Blog"
layout: gridlay
sitemap: false
permalink: /blogs/
---

## Blog

{% if site.posts.size > 0 %}
<div class="chip-container" id="blogFilter" markdown="0">
  <a href="#" class="chip" data-filter="all">All</a>
  <a href="#" class="chip chip-muted" data-filter="Teaching & Learning">Teaching & Learning</a>
  <a href="#" class="chip chip-muted" data-filter="Research & Scholarship">Research & Scholarship</a>
  <a href="#" class="chip chip-muted" data-filter="Industry Insights">Industry Insights</a>
  <a href="#" class="chip chip-muted" data-filter="Reading & Critical Thinking">Reading & Critical Thinking</a>
  <a href="#" class="chip chip-muted" data-filter="Life & Reflections">Life & Reflections</a>
  <a href="#" class="chip chip-muted" data-filter="Opinions & Dialogue">Opinions & Dialogue</a>
</div>

<div class="section-card" markdown="0">
{% for post in site.posts %}
<div class="news-item" data-category="{{ post.categories | join: ',' }}" style="padding: 1rem 0; border-bottom: 1px solid var(--border-color);">
<span class="news-date">{{ post.date | date: "%b %-d, %Y" }}</span>
{% if post.categories %}&nbsp;&middot;&nbsp;<span class="chip chip-muted" style="font-size:0.7rem; padding:0.15rem 0.6rem;">{{ post.categories | join: ", " }}</span>{% endif %}
<br>
<a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}" style="font-weight: 600;">{{ post.title }}</a>
{% if post.tags %}
<div style="margin-top: 0.4rem;">
{% for tag in post.tags %}<span class="chip chip-muted" style="font-size:0.68rem; padding:0.1rem 0.55rem; margin-right:0.3rem;">#{{ tag }}</span>{% endfor %}
</div>
{% endif %}
</div>
{% endfor %}
</div>

<script>
(function () {
  var buttons = document.querySelectorAll('#blogFilter .chip');
  var items = document.querySelectorAll('.news-item[data-category]');
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
{% else %}
<p class="text-muted">No blog posts yet.</p>
{% endif %}
