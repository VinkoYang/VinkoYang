// Blog view and like counts from the post-stats Cloudflare Worker
// (workers/post-stats). Loaded only when site.post_stats.endpoint is set.
// Everything stays hidden if the Worker is unreachable.
(function () {
  var script = document.currentScript;
  var api = script && script.getAttribute('data-endpoint');
  if (!api || !window.fetch) return;
  api = api.replace(/\/$/, '');

  var fmt = window.Intl && Intl.NumberFormat
    ? new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
    : { format: String };

  function setText(root, name, value) {
    var el = root.querySelector('[data-stat="' + name + '"]');
    if (el) el.textContent = fmt.format(value || 0);
  }

  function post(route, body) {
    return fetch(api + route, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); });
  }

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, value);
    } catch (e) { return null; }
  }

  function visitorId() {
    var id = store('ps-visitor');
    if (!id && window.crypto && crypto.randomUUID) { id = crypto.randomUUID(); store('ps-visitor', id); }
    return id;
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Blog index: fill every card from one request
    var rows = document.querySelectorAll('[data-stats-path]');
    if (rows.length) {
      fetch(api + '/stats').then(function (r) { return r.json(); }).then(function (all) {
        rows.forEach(function (row) {
          var s = all[row.getAttribute('data-stats-path')] || {};
          setText(row, 'views', s.views);
          setText(row, 'likes', s.likes);
          row.hidden = false;
        });
      }).catch(function () {});
    }

    // Single post: count the view, then wire the like button
    var box = document.querySelector('[data-post-stats]');
    if (!box) return;
    var path = box.getAttribute('data-path');
    var btn = box.querySelector('.post-like');
    var likedKey = 'ps-liked:' + path;
    var likes = 0;

    function render(liked) {
      btn.setAttribute('aria-pressed', liked ? 'true' : 'false');
      setText(box, 'likes', likes);
    }

    post('/view', { path: path }).then(function (s) {
      likes = s.likes;
      setText(box, 'views', s.views);
      render(store(likedKey) === '1');
      box.hidden = false;
    }).catch(function () {});

    btn.addEventListener('click', function () {
      var visitor = visitorId();
      if (!visitor || btn.disabled) return;
      var liked = btn.getAttribute('aria-pressed') !== 'true';
      likes += liked ? 1 : -1;
      render(liked);
      btn.disabled = true;
      post('/like', { path: path, visitor: visitor, liked: liked }).then(function (s) {
        likes = s.likes;
        store(likedKey, liked ? '1' : null);
        render(liked);
      }).catch(function () {
        likes += liked ? -1 : 1;
        render(!liked);
      }).then(function () { btn.disabled = false; });
    });
  });
})();
