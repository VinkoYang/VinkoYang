---
title: "Research"
layout: gridlay
sitemap: false
permalink: /research/
---

## Research

<input type="text" class="pub-search" id="researchSearch" placeholder="Search by title or keyword...">

{% assign kw_string = "" %}
{% for item in site.data.web.research %}
  {% if item.keywords %}
    {% for kw in item.keywords %}
      {% if kw and kw != "" %}{% assign kw_string = kw_string | append: kw | append: "|||" %}{% endif %}
    {% endfor %}
  {% endif %}
{% endfor %}
{% assign kw_array = kw_string | split: "|||" | uniq | sort %}

{% assign yr_string = "" %}
{% for item in site.data.web.research %}
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
<button class="research-dropdown-btn" id="focusDropdownBtn" aria-expanded="false"><i class="fa-solid fa-layer-group"></i> <span id="focusLabel">Focus</span> <i class="fa-solid fa-chevron-down"></i></button>
<div class="research-dropdown-menu" id="focusDropdownMenu">
<div class="research-dropdown-item selected" data-focus="__all__">All areas</div>
{% for area in site.data.web.research_areas %}<div class="research-dropdown-item" data-focus="{{ area.id }}">{{ area.name }}</div>{% endfor %}
</div>
</div>
<div class="research-dropdown">
<button class="research-dropdown-btn" id="kwDropdownBtn" aria-expanded="false"><i class="fa-solid fa-tag"></i> <span id="kwLabel">Keyword</span> <i class="fa-solid fa-chevron-down"></i></button>
<div class="research-dropdown-menu" id="kwDropdownMenu">
<div class="research-dropdown-item selected" data-kw="__all__">All keywords</div>
{% for kw in kw_array %}{% if kw != "" %}<div class="research-dropdown-item" data-kw="{{ kw | downcase }}">{{ kw }}</div>{% endif %}{% endfor %}
</div>
</div>
<div class="research-dropdown">
<button class="research-dropdown-btn" id="yearDropdownBtn" aria-expanded="false"><i class="fa-regular fa-calendar"></i> <span id="yearLabel">Year</span> <i class="fa-solid fa-chevron-down"></i></button>
<div class="research-dropdown-menu" id="yearDropdownMenu">
<div class="research-dropdown-item selected" data-year="__all__">All years</div>
{% for yr in year_array %}{% if yr != "" %}<div class="research-dropdown-item" data-year="{{ yr }}">{{ yr }}</div>{% endif %}{% endfor %}
</div>
</div>
</div>

{% assign sorted_research = site.data.web.research | sort: "end_date" | reverse %}
<div class="research-list" id="researchList">
{% for item in sorted_research %}
{% assign kw_joined = item.keywords | join: "|" %}
{% assign card_start_yr = item.start_date | split: "-" | first %}
{% if item.end_date %}{% assign card_end_yr = item.end_date | split: "-" | first %}{% else %}{% assign card_end_yr = 'now' | date: "%Y" %}{% endif %}
{% assign card_id = item.title | slugify %}
{% assign focus_joined = item.focus | join: "|" %}
<div class="research-card-h" id="{{ card_id }}" data-research-searchable data-keywords="{{ kw_joined | downcase }}" data-focus="{{ focus_joined }}" data-start-year="{{ card_start_yr }}" data-end-year="{{ card_end_yr }}">
<div class="research-card-h-img">
{% if item.image and item.image != "" %}
  {% if item.image contains ".pdf" %}
<canvas class="research-card-pdf" data-pdf="{{ site.url }}{{ site.baseurl }}/images/{{ item.image }}"></canvas>
  {% else %}
<img src="{{ site.url }}{{ site.baseurl }}/images/{{ item.image }}" alt="{{ item.title }}" loading="lazy">
  {% endif %}
{% else %}
<div class="research-card-h-img-placeholder"><i class="fa-solid fa-flask"></i></div>
{% endif %}
</div>
<div class="research-card-h-body">
<h3 class="research-card-h-title">{{ item.title }}</h3>
{% if item.authors or item.mentors or item.start_date %}
<div class="research-meta">
{% if item.authors and item.authors.size > 0 %}
<span><i class="fa-solid fa-user"></i> {% for a in item.authors %}{% if a.name and a.name != "" %}{% assign _ps = site.data.web.people.students | where: "name", a.name | first %}{% unless _ps %}{% assign _ps = site.data.web.people.collaborators | where: "name", a.name | first %}{% endunless %}{% unless _ps %}{% assign _ps = site.data.web.people.alumni | where: "name", a.name | first %}{% endunless %}{% if a.name == site.name %}{% assign _href = site.data.web.people.pi.website %}{% elsif _ps.website and _ps.website != "" %}{% assign _href = _ps.website %}{% elsif a.url and a.url != "" %}{% assign _href = a.url %}{% else %}{% assign _href = "" %}{% endif %}{% if _href != "" %}<a href="{{ _href }}" target="_blank">{{ a.name }}</a>{% else %}{{ a.name }}{% endif %}{% unless forloop.last %}, {% endunless %}{% endif %}{% endfor %}</span>
{% endif %}
{% if item.mentors and item.mentors.size > 0 %}
<span><i class="fa-solid fa-graduation-cap"></i> {% for m in item.mentors %}{% if m.name and m.name != "" %}{% assign _ps = site.data.web.people.students | where: "name", m.name | first %}{% unless _ps %}{% assign _ps = site.data.web.people.collaborators | where: "name", m.name | first %}{% endunless %}{% unless _ps %}{% assign _ps = site.data.web.people.alumni | where: "name", m.name | first %}{% endunless %}{% if m.name == site.name %}{% assign _href = site.data.web.people.pi.website %}{% elsif _ps.website and _ps.website != "" %}{% assign _href = _ps.website %}{% elsif m.url and m.url != "" %}{% assign _href = m.url %}{% else %}{% assign _href = "" %}{% endif %}{% if _href != "" %}<a href="{{ _href }}" target="_blank">{{ m.name }}</a>{% else %}{{ m.name }}{% endif %}{% unless forloop.last %}, {% endunless %}{% endif %}{% endfor %}</span>
{% endif %}
{% if item.start_date %}<span><i class="fa-regular fa-calendar"></i> {{ item.start_date }}{% if item.end_date %} &ndash; {{ item.end_date }}{% else %} &ndash; Present{% endif %}</span>{% endif %}
</div>
{% endif %}
{% if item.keywords %}
<div class="research-card-h-keywords">
{% for kw in item.keywords %}<span class="research-kw">{{ kw }}</span>{% endfor %}
</div>
{% endif %}
<p class="research-card-h-abstract">{{ item.abstract }}</p>
{% assign has_link = false %}
{% if item.links.paper and item.links.paper != "" %}{% assign has_link = true %}{% endif %}
{% if item.links.webpage and item.links.webpage != "" %}{% assign has_link = true %}{% endif %}
{% if item.links.video and item.links.video != "" %}{% assign has_link = true %}{% endif %}
{% if item.links.bib and item.links.bib != "" %}{% assign has_link = true %}{% endif %}
{% if item.links.poster and item.links.poster != "" %}{% assign has_link = true %}{% endif %}
{% if item.links.slide and item.links.slide != "" %}{% assign has_link = true %}{% endif %}
{% if item.links.github and item.links.github != "" %}{% assign has_link = true %}{% endif %}
{% if item.links.arxiv and item.links.arxiv != "" %}{% assign has_link = true %}{% endif %}
{% if item.links.supplementary and item.links.supplementary != "" %}{% assign has_link = true %}{% endif %}
{% if has_link %}
<div class="research-card-h-links">{% if item.links.paper and item.links.paper != "" %}{% if item.links.paper contains "://" %}<a href="{{ item.links.paper }}" target="_blank" class="research-link"><i class="fa-regular fa-file-pdf"></i> Paper</a>{% else %}<a href="{{ site.baseurl }}/papers/{{ item.links.paper }}" target="_blank" type="application/pdf" class="research-link"><i class="fa-regular fa-file-pdf"></i> Paper</a>{% endif %}{% endif %}{% if item.links.webpage and item.links.webpage != "" %}<a href="{{ item.links.webpage }}" target="_blank" class="research-link"><i class="fa-solid fa-globe"></i> Webpage</a>{% endif %}{% if item.links.video and item.links.video != "" %}<a href="{{ item.links.video }}" target="_blank" class="research-link"><i class="fa-brands fa-youtube"></i> Video</a>{% endif %}{% if item.links.arxiv and item.links.arxiv != "" %}<a href="{{ item.links.arxiv }}" target="_blank" class="research-link"><i class="fa-solid fa-file-lines"></i> arXiv</a>{% endif %}{% if item.links.poster and item.links.poster != "" %}<a href="{{ site.baseurl }}/{{ item.links.poster }}" target="_blank" type="application/pdf" class="research-link"><i class="fa-regular fa-image"></i> Poster</a>{% endif %}{% if item.links.slide and item.links.slide != "" %}<a href="{{ site.baseurl }}/{{ item.links.slide }}" target="_blank" type="application/pdf" class="research-link"><i class="fa-regular fa-file-powerpoint"></i> Slide</a>{% endif %}{% if item.links.supplementary and item.links.supplementary != "" %}<a href="{{ item.links.supplementary }}" target="_blank" class="research-link"><i class="fa-regular fa-file-zipper"></i> Supplementary</a>{% endif %}{% if item.links.bib and item.links.bib != "" %}<a href="{{ item.links.bib }}" class="research-link"><i class="fa-solid fa-quote-right"></i> BibTeX</a>{% endif %}{% if item.links.github and item.links.github != "" %}<a href="{{ item.links.github }}" target="_blank" class="research-link"><i class="fa-brands fa-github"></i> GitHub</a>{% endif %}
</div>
{% endif %}
</div>
</div>
{% endfor %}
</div>

<script>
(function () {
  var searchInput = document.getElementById('researchSearch');
  var cards = document.querySelectorAll('[data-research-searchable]');
  var activeFocus = '__all__';
  var activeKw = '__all__';
  var activeYear = '__all__';

  function applyFilters() {
    var query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    cards.forEach(function (card) {
      var text = card.textContent.toLowerCase();
      var kwAttr = card.getAttribute('data-keywords') || '';
      var kwArr = kwAttr.split('|').map(function (k) { return k.trim(); });
      var focusAttr = card.getAttribute('data-focus') || '';
      var focusArr = focusAttr.split('|').map(function (f) { return f.trim(); });
      var startYr = parseInt(card.getAttribute('data-start-year') || '0', 10);
      var endYr = parseInt(card.getAttribute('data-end-year') || '9999', 10);
      var selectedYr = parseInt(activeYear, 10);
      var matchesText = !query || text.includes(query);
      var matchesFocus = activeFocus === '__all__' || focusArr.indexOf(activeFocus) >= 0;
      var matchesKw = activeKw === '__all__' || kwArr.indexOf(activeKw) >= 0;
      var matchesYear = activeYear === '__all__' || (selectedYr >= startYr && selectedYr <= endYr);
      card.style.display = (matchesText && matchesFocus && matchesKw && matchesYear) ? '' : 'none';
    });
  }

  if (searchInput) searchInput.addEventListener('input', applyFilters);

  function setupDropdown(btnId, menuId, labelId, onSelect) {
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

  setupDropdown('focusDropdownBtn', 'focusDropdownMenu', 'focusLabel', function (item, btn) {
    activeFocus = item.getAttribute('data-focus');
    document.getElementById('focusLabel').textContent = activeFocus === '__all__' ? 'Focus' : item.textContent.trim();
    activeFocus !== '__all__' ? btn.classList.add('active') : btn.classList.remove('active');
  });

  setupDropdown('kwDropdownBtn', 'kwDropdownMenu', 'kwLabel', function (item, btn) {
    activeKw = item.getAttribute('data-kw');
    document.getElementById('kwLabel').textContent = activeKw === '__all__' ? 'Keyword' : item.textContent.trim();
    activeKw !== '__all__' ? btn.classList.add('active') : btn.classList.remove('active');
  });

  setupDropdown('yearDropdownBtn', 'yearDropdownMenu', 'yearLabel', function (item, btn) {
    activeYear = item.getAttribute('data-year');
    document.getElementById('yearLabel').textContent = activeYear === '__all__' ? 'Year' : item.textContent.trim();
    activeYear !== '__all__' ? btn.classList.add('active') : btn.classList.remove('active');
  });

  document.addEventListener('click', function () {
    document.querySelectorAll('.research-dropdown-menu').forEach(function (m) { m.classList.remove('open'); });
    document.querySelectorAll('.research-dropdown-btn').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
  });
})();
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
<script>
(function () {
  var PDFJS = window['pdfjs-dist/build/pdf'];
  PDFJS.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  document.querySelectorAll('canvas.research-card-pdf[data-pdf]').forEach(function (canvas) {
    var url = canvas.getAttribute('data-pdf');
    var dpr = window.devicePixelRatio || 1;
    PDFJS.getDocument(url).promise.then(function (pdf) {
      return pdf.getPage(1);
    }).then(function (page) {
      var container = canvas.parentElement;
      var w = container.offsetWidth || 240;
      var h = container.offsetHeight || 180;
      var viewport = page.getViewport({ scale: 1 });
      var scale = Math.max(w / viewport.width, h / viewport.height) * dpr;
      var scaled = page.getViewport({ scale: scale });
      canvas.width = scaled.width;
      canvas.height = scaled.height;
      canvas.style.width = (scaled.width / dpr) + 'px';
      canvas.style.height = (scaled.height / dpr) + 'px';
      page.render({ canvasContext: canvas.getContext('2d'), viewport: scaled });
    }).catch(function () {});
  });
})();
</script>
