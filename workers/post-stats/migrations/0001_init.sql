-- Total views per post path, e.g. "/blogs/user-study-quick-start/"
CREATE TABLE IF NOT EXISTS views (
  path  TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0
);

-- One row per (path, hashed visitor, day): a reload on the same day is not a new view.
-- The visitor hash includes the day, so it cannot be linked across days. Rows older
-- than yesterday are deleted by the cron trigger.
CREATE TABLE IF NOT EXISTS view_seen (
  path    TEXT NOT NULL,
  visitor TEXT NOT NULL,
  day     TEXT NOT NULL,
  PRIMARY KEY (path, visitor, day)
);

-- One row per (path, browser id). The browser id is a random UUID kept in
-- localStorage. ip_day is a salted daily hash used only to throttle abuse.
CREATE TABLE IF NOT EXISTS likes (
  path       TEXT NOT NULL,
  visitor    TEXT NOT NULL,
  ip_day     TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (path, visitor)
);
CREATE INDEX IF NOT EXISTS likes_ip ON likes (path, ip_day);
