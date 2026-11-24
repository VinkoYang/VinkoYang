# post-stats

博客浏览数和点赞数的 Cloudflare Worker，存储用 D1。网站这边读 `_config.yml` 里的 `post_stats.endpoint`；它为空时，列表页的计数和文章页的点赞按钮都不会渲染。

## 接口

| 方法 | 路径 | 请求体 | 返回 |
|---|---|---|---|
| GET | `/stats` | — | `{ "/blogs/x/": { "views": 12, "likes": 3 }, ... }`，缓存 60 秒 |
| POST | `/view` | `{ "path": "/blogs/x/" }` | `{ views, likes }` |
| POST | `/like` | `{ "path", "visitor": "<uuid>", "liked": true/false }` | `{ likes, liked }` |

- 同一 IP 同一篇文章，每天只算一次浏览。IP 只以「盐 + 日期 + IP」的哈希形式存储，跨天无法关联到同一个人。cron 每天删除前天及更早的去重记录。
- 点赞的身份是浏览器 localStorage 里的一个随机 UUID。同一 IP 同一篇文章每天最多 5 个赞，超过返回 429。
- 只接受 `ALLOWED_ORIGINS`(在 `wrangler.toml` 里)里的站点发来的 POST。
- `path` 必须符合 `/blogs/<小写-slug>/`。

## 首次部署

在本目录下执行：

```bash
npm install
npx wrangler login                          # 浏览器里授权 Cloudflare 账号
npx wrangler d1 create post-stats           # 把输出里的 database_id 填进 wrangler.toml
npx wrangler d1 migrations apply post-stats --remote
npx wrangler secret put HASH_SALT           # 粘贴一串随机字符，之后不要再改
npx wrangler deploy                         # 输出 https://post-stats.<子域>.workers.dev
```

最后把 deploy 输出的 URL 填进网站 `_config.yml`：

```yaml
post_stats:
  endpoint: "https://post-stats.<子域>.workers.dev"
```

## 改代码之后

只需要重新执行 `npx wrangler deploy`。要改表结构，就在 `migrations/` 里新加一个 `0002_*.sql`，然后执行 `migrations apply --remote`。

## 本地测试

`wrangler dev` 需要运行 `workerd.exe`，但在办公室那台学校电脑上它会被拒绝访问(`spawn EPERM`，估计是学校电脑的安全策略)。2026-11-24 是改用 Node 24 自带的 `node:sqlite` 模拟 D1 来测接口和前端的，部署本身不需要 workerd。

## 看数据

```bash
npx wrangler d1 execute post-stats --remote --command "SELECT * FROM views ORDER BY count DESC"
```
