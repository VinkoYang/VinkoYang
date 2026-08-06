---
title: "Projects"
layout: gridlay
sitemap: false
permalink: /projects/
---

## Projects

Software I have designed and built outside of my academic research.

<input type="text" class="pub-search" id="projectSearch" placeholder="Search by name, technology, or keyword...">

{% assign stack_string = "" %}
{% for item in site.data.web.projects %}
  {% if item.stack %}
    {% for tech in item.stack %}
      {% if tech and tech != "" %}{% assign stack_string = stack_string | append: tech | append: "|||" %}{% endif %}
    {% endfor %}
  {% endif %}
{% endfor %}
{% assign stack_array = stack_string | split: "|||" | uniq | sort %}

{% assign yr_string = "" %}
{% for item in site.data.web.projects %}
  {% if item.start_date %}
    {% assign start_yr = item.start_date | split: "-" | first | plus: 0 %}
    {% if item.end_date %}
      {% assign end_yr = item.end_date | split: "-" | first | plus: 0 %}
    {% else %}
      {% assign end_yr = 'now' | date: "%Y" | plus: 0 %}
    {% endif %}
    {% for y in (start_yr..end_yr) %}
      {% assign yr_string = yr_string | append: y | append: "|||" %}
    {% endfor %}
  {% endif %}
{% endfor %}
{% assign year_array = yr_string | split: "|||" | uniq | sort | reverse %}

<div class="research-filter-bar" markdown="0">
<div class="research-dropdown">
<button class="research-dropdown-btn" id="stackDropdownBtn" aria-expanded="false"><i class="fa-solid fa-code"></i> <span id="stackLabel">Tech</span> <i class="fa-solid fa-chevron-down"></i></button>
<div class="research-dropdown-menu" id="stackDropdownMenu">
<div class="research-dropdown-item selected" data-stack="__all__">All technologies</div>
{% for tech in stack_array %}{% if tech != "" %}<div class="research-dropdown-item" data-stack="{{ tech | downcase }}">{{ tech }}</div>{% endif %}{% endfor %}
</div>
</div>
<div class="research-dropdown">
<button class="research-dropdown-btn" id="projectYearDropdownBtn" aria-expanded="false"><i class="fa-regular fa-calendar"></i> <span id="projectYearLabel">Year</span> <i class="fa-solid fa-chevron-down"></i></button>
<div class="research-dropdown-menu" id="projectYearDropdownMenu">
<div class="research-dropdown-item selected" data-year="__all__">All years</div>
{% for yr in year_array %}{% if yr != "" %}<div class="research-dropdown-item" data-year="{{ yr }}">{{ yr }}</div>{% endif %}{% endfor %}
</div>
</div>
</div>

{% assign sorted_projects = site.data.web.projects | sort: "end_date" | reverse %}
<div class="research-list" id="projectList">
{% for item in sorted_projects %}
{% assign stack_joined = item.stack | join: "|" %}
{% assign card_start_yr = item.start_date | split: "-" | first %}
{% if item.end_date %}{% assign card_end_yr = item.end_date | split: "-" | first %}{% else %}{% assign card_end_yr = 'now' | date: "%Y" %}{% endif %}
{% assign card_id = item.title | slugify %}
<div class="research-card-h" id="{{ card_id }}" data-project-searchable data-stack="{{ stack_joined | downcase }}" data-start-year="{{ card_start_yr }}" data-end-year="{{ card_end_yr }}">
<div class="research-card-h-img">
{% if item.image and item.image != "" %}
<img src="{{ site.url }}{{ site.baseurl }}/images/{{ item.image }}" alt="{{ item.title }}" loading="lazy">
{% else %}
<div class="research-card-h-img-placeholder"><i class="fa-solid fa-laptop-code"></i></div>
{% endif %}
</div>
<div class="research-card-h-body">
<h3 class="research-card-h-title">{{ item.title }}</h3>
{% if item.role or item.status or item.start_date %}
<div class="research-meta">
{% if item.role and item.role != "" %}<span><i class="fa-solid fa-user"></i> {{ item.role }}</span>{% endif %}
{% if item.status and item.status != "" %}<span><i class="fa-solid fa-signal"></i> {{ item.status }}</span>{% endif %}
{% if item.start_date %}<span><i class="fa-regular fa-calendar"></i> {{ item.start_date }}{% if item.end_date %} &ndash; {{ item.end_date }}{% else %} &ndash; Present{% endif %}</span>{% endif %}
</div>
{% endif %}
{% if item.stack %}
<div class="research-card-h-keywords">
{% for tech in item.stack %}<span class="research-kw">{{ tech }}</span>{% endfor %}
</div>
{% endif %}
<p class="research-card-h-abstract">{{ item.abstract }}</p>
{% assign has_link = false %}
{% if item.links.webpage and item.links.webpage != "" %}{% assign has_link = true %}{% endif %}
{% if item.links.github and item.links.github != "" %}{% assign has_link = true %}{% endif %}
{% if item.links.demo and item.links.demo != "" %}{% assign has_link = true %}{% endif %}
{% if item.links.docs and item.links.docs != "" %}{% assign has_link = true %}{% endif %}
{% if item.links.blog and item.links.blog != "" %}{% assign has_link = true %}{% endif %}
{% if has_link %}
<div class="research-card-h-links">{% if item.links.webpage and item.links.webpage != "" %}<a href="{{ item.links.webpage }}" target="_blank" class="research-link"><i class="fa-solid fa-globe"></i> Visit site</a>{% endif %}{% if item.links.github and item.links.github != "" %}<a href="{{ item.links.github }}" target="_blank" class="research-link"><i class="fa-brands fa-github"></i> GitHub</a>{% endif %}{% if item.links.demo and item.links.demo != "" %}<a href="{{ item.links.demo }}" target="_blank" class="research-link"><i class="fa-brands fa-youtube"></i> Demo</a>{% endif %}{% if item.links.docs and item.links.docs != "" %}<a href="{{ item.links.docs }}" target="_blank" class="research-link"><i class="fa-regular fa-file-lines"></i> Docs</a>{% endif %}{% if item.links.blog and item.links.blog != "" %}{% if item.links.blog contains "://" %}<a href="{{ item.links.blog }}" target="_blank" class="research-link"><i class="fa-solid fa-pen-nib"></i> Blog post</a>{% else %}<a href="{{ site.url }}{{ site.baseurl }}{{ item.links.blog }}" class="research-link"><i class="fa-solid fa-pen-nib"></i> Blog post</a>{% endif %}{% endif %}
</div>
{% endif %}
</div>
</div>
{% endfor %}
</div>

<script>
(function () {
  var searchInput = document.getElementById('projectSearch');
  var cards = document.querySelectorAll('[data-project-searchable]');
  var activeStack = '__all__';
  var activeYear = '__all__';

  function applyFilters() {
    var query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    cards.forEach(function (card) {
      var text = card.textContent.toLowerCase();
      var stackAttr = card.getAttribute('data-stack') || '';
      var stackArr = stackAttr.split('|').map(function (s) { return s.trim(); });
      var startYr = parseInt(card.getAttribute('data-start-year') || '0', 10);
      var endYr = parseInt(card.getAttribute('data-end-year') || '9999', 10);
      var selectedYr = parseInt(activeYear, 10);
      var matchesText = !query || text.includes(query);
      var matchesStack = activeStack === '__all__' || stackArr.indexOf(activeStack) >= 0;
      var matchesYear = activeYear === '__all__' || (selectedYr >= startYr && selectedYr <= endYr);
      card.style.display = (matchesText && matchesStack && matchesYear) ? '' : 'none';
    });
  }

  if (searchInput) searchInput.addEventListener('input', applyFilters);

  function setupDropdown(btnId, menuId, onSelect) {
    var btn = document.getElementById(btnId);
    var menu = document.getElementById(menuId);
    if (!btn || !menu) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = menu.classList.contains('open');
      document.querySelectorAll('.research-dropdown-menu').forEach(function (m) { m.classList.remove('open'); });
      document.querySelectorAll('.research-dropdown-btn').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
      if (!isOpen) {
        menu.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
    menu.querySelectorAll('.research-dropdown-item').forEach(function (item) {
      item.addEventListener('click', function () {
        menu.querySelectorAll('.research-dropdown-item').forEach(function (i) { i.classList.remove('selected'); });
        item.classList.add('selected');
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        onSelect(item, btn);
        applyFilters();
      });
    });
  }

  setupDropdown('stackDropdownBtn', 'stackDropdownMenu', function (item, btn) {
    activeStack = item.getAttribute('data-stack');
    document.getElementById('stackLabel').textContent = activeStack === '__all__' ? 'Tech' : item.textContent.trim();
    activeStack !== '__all__' ? btn.classList.add('active') : btn.classList.remove('active');
  });

  setupDropdown('projectYearDropdownBtn', 'projectYearDropdownMenu', function (item, btn) {
    activeYear = item.getAttribute('data-year');
    document.getElementById('projectYearLabel').textContent = activeYear === '__all__' ? 'Year' : item.textContent.trim();
    activeYear !== '__all__' ? btn.classList.add('active') : btn.classList.remove('active');
  });

  document.addEventListener('click', function () {
    document.querySelectorAll('.research-dropdown-menu').forEach(function (m) { m.classList.remove('open'); });
    document.querySelectorAll('.research-dropdown-btn').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
  });
})();
</script>
