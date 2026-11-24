// Blog view and like counter.
//
//   GET  /stats                           -> { "/blogs/x/": { "views": 12, "likes": 3 }, ... }
//   POST /view  { path }                  -> { views, likes }
//   POST /like  { path, visitor, liked }  -> { likes, liked }
//
// No cookies. Views are de-duplicated per (path, salted IP hash, day); the
// hash includes the day, so a visitor cannot be followed across days. Likes are
// keyed by a random browser UUID from localStorage, throttled per IP per day.

const PATH_RE = /^\/blogs\/[a-z0-9][a-z0-9-]{0,150}\/$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const MAX_LIKES_PER_IP_PER_POST_PER_DAY = 5;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const allowed = env.ALLOWED_ORIGINS.split(",").map((s) => s.trim());
    const origin = request.headers.get("Origin") || "";
    const cors = {
      "Access-Control-Allow-Origin": allowed.includes(origin) ? origin : allowed[0],
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    };

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });

    try {
      if (request.method === "GET" && url.pathname === "/stats") {
        return json(await allStats(env), cors, 200, "public, max-age=60");
      }

      if (request.method === "POST") {
        // Browsers always send Origin on cross-site POST; refuse other sites.
        if (!allowed.includes(origin)) return json({ error: "origin not allowed" }, cors, 403);
        const body = await request.json().catch(() => null);
        if (!body || typeof body.path !== "string" || !PATH_RE.test(body.path)) {
          return json({ error: "bad path" }, cors, 400);
        }
        const day = today();
        const ipDay = await sha256(`${env.HASH_SALT}|${day}|${request.headers.get("CF-Connecting-IP") || ""}`);

        if (url.pathname === "/view") return json(await recordView(env, body.path, ipDay, day), cors);
        if (url.pathname === "/like") {
          if (typeof body.visitor !== "string" || !UUID_RE.test(body.visitor)) {
            return json({ error: "bad visitor" }, cors, 400);
          }
          return await setLike(env, body.path, body.visitor, body.liked !== false, ipDay, cors);
        }
      }

      return json({ error: "not found" }, cors, 404);
    } catch (err) {
      console.error(err);
      return json({ error: "server error" }, cors, 500);
    }
  },

  async scheduled(_event, env) {
    await env.DB.prepare("DELETE FROM view_seen WHERE day < ?").bind(today(-1)).run();
  },
};

async function allStats(env) {
  const [views, likes] = await env.DB.batch([
    env.DB.prepare("SELECT path, count FROM views"),
    env.DB.prepare("SELECT path, COUNT(*) AS count FROM likes GROUP BY path"),
  ]);
  const out = {};
  for (const r of views.results) out[r.path] = { views: r.count, likes: 0 };
  for (const r of likes.results) (out[r.path] ||= { views: 0, likes: 0 }).likes = r.count;
  return out;
}

async function recordView(env, path, ipDay, day) {
  const seen = await env.DB.prepare("INSERT OR IGNORE INTO view_seen (path, visitor, day) VALUES (?, ?, ?)")
    .bind(path, ipDay, day)
    .run();
  if (seen.meta.changes > 0) {
    await env.DB.prepare(
      "INSERT INTO views (path, count) VALUES (?, 1) ON CONFLICT(path) DO UPDATE SET count = count + 1"
    )
      .bind(path)
      .run();
  }
  return countsFor(env, path);
}

async function setLike(env, path, visitor, liked, ipDay, cors) {
  if (liked) {
    const recent = await env.DB.prepare("SELECT COUNT(*) AS n FROM likes WHERE path = ? AND ip_day = ?")
      .bind(path, ipDay)
      .first();
    if (recent.n >= MAX_LIKES_PER_IP_PER_POST_PER_DAY) {
      return json({ error: "too many likes" }, cors, 429);
    }
    await env.DB.prepare(
      "INSERT OR IGNORE INTO likes (path, visitor, ip_day, created_at) VALUES (?, ?, ?, ?)"
    )
      .bind(path, visitor, ipDay, Date.now())
      .run();
  } else {
    await env.DB.prepare("DELETE FROM likes WHERE path = ? AND visitor = ?").bind(path, visitor).run();
  }
  const { likes } = await countsFor(env, path);
  return json({ likes, liked }, cors);
}

async function countsFor(env, path) {
  const [v, l] = await env.DB.batch([
    env.DB.prepare("SELECT count FROM views WHERE path = ?").bind(path),
    env.DB.prepare("SELECT COUNT(*) AS count FROM likes WHERE path = ?").bind(path),
  ]);
  return { views: v.results[0]?.count ?? 0, likes: l.results[0]?.count ?? 0 };
}

function today(offsetDays = 0) {
  return new Date(Date.now() + offsetDays * 86400000).toISOString().slice(0, 10);
}

async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function json(data, cors, status = 200, cache = "no-store") {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...cors, "Content-Type": "application/json", "Cache-Control": cache },
  });
}
