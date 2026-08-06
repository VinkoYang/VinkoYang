---
layout: post
title: "Building Wherefold: Curating a US Travel Database and Turning It Into a Map"
date: 2026-08-06
categories: ["Industry Insights"]
tags: ["web-development", "React", "TypeScript", "Mapbox", "PostgreSQL", "side-projects"]
---
# Building Wherefold: Curating a US Travel Database and Turning It Into a Map

[Wherefold](https://wherefold.com) is a side project I shipped this summer, and it breaks into two pieces of work I did myself, end to end. First, I curated a structured attraction database from scratch: 5,110 attractions across 1,274 US cities and 36 national parks, each one carrying 20+ curated fields — coordinates, category, opening hours, pricing tier, contact info, bilingual description, suggested visit duration, best time to visit, transportation options, and more. Second, I designed and built the interactive bilingual (English/Chinese) map platform that turns that database into something a traveler can actually explore. This post covers both halves: how the database was assembled and reviewed, and how it became a product.

---

## 1. The Problem: The Map and the Guide Are Two Different Apps

Planning a US road trip usually means running two tools in parallel. The guide tells you what is worth seeing; the map tells you where it is and how far apart things are. Neither knows about the other, so you end up with a dozen browser tabs and a mental model that lives entirely in your head.

The second problem is coverage. Curated guides concentrate on a handful of large cities. Small towns and national parks — exactly the places where you most need opening hours, entrance fees, and a phone number that actually works — are thin or missing. And for a bilingual audience, English guides are dense and Chinese guides tend to be sparse, copied from each other, and out of date on precisely the operational details that matter.

Wherefold's premise is that the map *is* the guide: click a pin, the attraction detail opens in place, and route planning is something you do by looking rather than by cross-referencing.

---

## 2. The Database I Built

Before there was a map, there was a spreadsheet problem: assembling and verifying accurate, structured data for 5,110 attractions is most of the actual work behind Wherefold, and it's the part that doesn't show up in a screenshot.

Each attraction record I curated carries:

- **Location & identity** — coordinates, address, name in both English and Chinese
- **Categorization** — a 14-group / 53-subcategory taxonomy I built and applied across every record, plus a neutral tag system (e.g. `museum`, `free`) that drives filtering and search
- **Visitor logistics** — opening hours, a five-tier price level, suggested visit duration, best time to visit, and transportation notes — all bilingual
- **Contact & media** — address, phone, website, and cover imagery, with additional photo images per attraction
- **Bilingual narrative content** — an English and Chinese description for every listing, not machine-translated afterthoughts but reviewed text
- **Practical extras** — photo tips (best angle, lighting, what to wear, shooting restrictions) for a growing subset of attractions, plus third-party award/recognition badges where applicable
- **Community layer fields** — structured tips, reviews, and guide links that accumulate on top of the curated base as visitors contribute

At the city level, I curated a parallel set of fields — bilingual descriptions, nicknames, best months to visit, average seasonal temperatures, nearest airports, rail systems, sales tax, population, and metro-area groupings — so a city page reads as a real primer, not just a list of pins.

Building this required a pipeline, not a spreadsheet: an ingest script pulls raw candidate data from Google Places and Wikipedia, but every field that ends up published was reviewed and normalized by hand against a validation script before it touched the production database. Raw scrape output and curated output are kept as separate files on purpose — the scrape is cheap to redo, the curation is not, and keeping them apart means a data fix never has to re-spend API quota. The dataset grew from a handful of seed cities to full national coverage over about five weeks of continuous curation (see [Development Milestones](#5-development-milestones) below), with most releases pairing a product feature with a batch of data work: deduplication, bilingual backfills, and correcting mis-categorized entries as coverage expanded.

This curated database is the asset. The map is the interface I built to make it useful.

---

## 3. The Platform I Built On Top of It

- **One map, the whole country.** Every one of the 5,110 attractions sits on a single interactive Mapbox map — cities, small towns, and all 36 national parks together, not split across separate "top 10" lists. Zoom out for the big picture, zoom in for a neighborhood, click a pin for the details.
- **Click-through detail, no app switching.** Selecting a pin opens hours, price, address, phone number, and a description right there on the map. Planning a day's route means looking, not tab-hopping between a map app and a guide app.
- **Bilingual by default.** Every attraction's description, tips, and reviews are available in both English and Chinese — not a machine-translated afterthought, but a first-class part of every listing.
- **Community-verified information.** Anyone can leave a tip, a thumbs-up/down on existing tips, or flag a field as wrong or out of date — all without creating an account. Hours and prices drift constantly; the people best positioned to catch that are the ones standing in front of the door, so the fastest fix is letting them say so directly on the page.
- **One search box for everything.** Search across cities and attractions at once — no need to know which category something falls under before you can find it.
- **Filter by country, state, and category.** Narrow the map down to exactly the kind of trip you're planning — a single state, a category like "national park," or a country.
- **Works without an account, syncs when you have one.** Browsing, searching, and viewing detail pages need no sign-in. Logged-in users get a dashboard with recent view history and saved favorites.

---

## 4. How to Use Wherefold

A quick walkthrough of the actual site, for anyone about to plan a trip with it.

1. **Start on the map.** [wherefold.com/map](https://wherefold.com/map) opens with the whole country pinned. Pan and zoom like any map app — pins cluster automatically at country/state zoom and split apart as you zoom into a city.
2. **Filter down to your trip.** The sidebar filters by country, state, and category (national park, museum, landmark, food, and so on). Pick a state and a category and the map narrows to just those pins.
3. **Click a pin for the full picture.** The detail panel opens in place with hours, price, address, phone number, a description, and — for a growing set of attractions — photo tips: best time of day, camera angle, what to wear, and any shooting restrictions.
4. **Or skip the map and search.** The search bar at the top covers cities and attractions together — type a name, a city, or an address and go straight to it, from [wherefold.com/search](https://wherefold.com/search).
5. **Browse by city instead of by pin.** [wherefold.com's cities list](https://wherefold.com) groups attractions by city if you'd rather read a page than click around a map — useful for a "what's in Houston" kind of question.
6. **See something wrong? Fix it on the spot.** Every detail page has a tip box and a "report incorrect info" link. Both work without an account — leave a note about current hours, upvote/downvote an existing tip, or flag a field that's out of date.
7. **Sign in for a dashboard.** An account adds saved favorites and a "recently viewed" history — useful once you're comparing a shortlist of stops across several browsing sessions.
8. **Check what's changed.** [wherefold.com/whats-new](https://wherefold.com/whats-new) lists new features and content in plain language, updated with every release.

None of this requires reading documentation — the point of the design is that steps 1–4 are discoverable in under a minute. This section exists mostly so a first-time visitor knows the search bar and the filter sidebar are both there.

---

## 5. Development Milestones

Wherefold went from an empty repo to national coverage over about five weeks, shipping in small, frequent releases rather than one big launch. A few waypoints:

- **2026-06-26 (v0.1.0-alpha)** — First working version: interactive map, site-wide search, favorites, and the switch to PostgreSQL as the database.
- **2026-06-30 (v0.2.0-alpha)** — Cover images across the site, country/state filtering, mobile layout.
- **2026-07-04 (v0.3.0-alpha)** — Seed data expanded to 20+ states.
- **2026-07-06 (v0.4.0-alpha)** — Trip planning, clean slug URLs with pre-rendered pages for faster loads, a leaner cached API.
- **2026-07-09 (v0.5.0-alpha)** — Tips and reviews went bilingual; added city pages and a personal profile page.
- **2026-07-10 (v0.6.0-alpha)** — Pricing model reworked into structured ticket data; attraction categories restructured into 14 groups and 53 subcategories.
- **2026-07-12 (v0.7.0-alpha)** — Rebranded to Wherefold, added account login, finished bilingual UI site-wide, built an internal admin panel.
- **2026-07-16 (v0.8.0-alpha)** — Metro-area grouping, mobile map performance pass, cross-city duplicate cleanup.
- **2026-07-19 (v0.9.0-alpha)** — Tag system rebuilt; new city-overview sections.
- **2026-07-20 (v0.10.0-alpha)** — Map interaction fixes, desktop hover previews, bilingual opening hours across ~400 files.
- **2026-07-22 (v0.11.0-alpha)** — Bilingual login page, two-level grouping on city pages, best-time/transport info backfilled for ~3,300 attractions.
- **2026-07-26 (v0.12.0-alpha)** — Per-attraction honor badges, larger touch targets for mobile, accessibility labels site-wide, ~26 new cities and ~540 new attractions.
- **2026-07-29 (v0.13.0-alpha)** — Photo-tips section on detail pages, dedicated award pages, "new" badges on fresh tips/reviews, map clustering switched to supercluster to scale toward 30,000+ attractions.

The dataset grew alongside the product: from a handful of seed cities to 1,274 cities and 5,110 attractions across 20+ states and 36 national parks, with most releases carrying both a feature and a batch of data cleanup — deduplication, bilingual backfills, and correcting mis-categorized or placeholder entries as coverage expanded.

---

## 6. Architecture

The stack is deliberately boring, because a solo project's scarcest resource is attention, not compute.

| Layer | Choice |
|---|---|
| Frontend | React 18 · TypeScript · Vite · Tailwind CSS · Mapbox GL JS · Zustand |
| Backend | Node.js · Express · Prisma · PostgreSQL |
| Deployment | Vercel (frontend) · Railway (backend + database) |
| Local dev | Docker Compose for PostgreSQL |

A few decisions worth explaining:

**Mapbox GL with a GeoJSON layer, not React markers.** The obvious first implementation renders one React component per attraction. That falls over well before 5,000 pins. Feeding the whole attraction set to Mapbox as a single GeoJSON source and letting the GL layer handle clustering and hit-testing keeps panning smooth even with the full dataset loaded, and moves the work into the renderer where it belongs.

**Zustand instead of Redux or Context.** Map state (viewport, selected attraction, active filters) is read by many components and written by a few. Zustand gives that with almost no ceremony, and it does not re-render the map tree every time a filter chip toggles.

**Offline mock data.** The frontend falls back to bundled mock data when no API is reachable, so the dev server gives a fully working map with no database and no backend running. This turned out to be one of the highest-leverage things in the repo — most UI work never needs the full stack up.

---

## 7. If You're Building Something Similar

- Curate the database as its own deliverable, separate from the app that reads it — a reviewable, versioned dataset outlives any particular frontend built on top of it.
- Separate scraping from curation, and check the curated form into the repo. The scrape is cheap to redo; the curated result is a reviewable diff. Conflating the two means every data fix re-spends API quota.
- Get the second language into the schema on day one if you intend to have one at all — bilingual is a schema property, not a translation pass applied afterward.
- Push per-item rendering into the map library's own layer system before your pin count grows, not after.
- Make the frontend work with zero backend. It changes your development loop more than any tooling upgrade.
- Community correction beats a re-scrape schedule — give users a two-tap way to flag stale information instead of trying to keep everything fresh yourself.

Wherefold is live at [wherefold.com](https://wherefold.com). If you use it on a trip and find something out of date, the report button is right there — that's the whole idea.
