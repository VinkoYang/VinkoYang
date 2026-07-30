// Builds files/cv.pdf directly from the same _data/ files the website renders,
// so editing one data source updates both the website and the CV.
//
//   _data/profile/*.yml ─┐
//   _data/web/people.yml ├─> build-cv.js ─> cv.generated.html ─> (puppeteer) ─> files/cv.pdf
//   assets/ref.bib      ─┘
//
// Run with `npm run cv`. Styling lives in cv/style.css.

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const readYaml = (p) => yaml.load(fs.readFileSync(path.join(ROOT, p), 'utf8'));

// ---------------------------------------------------------------------------
// Load data
// ---------------------------------------------------------------------------

const config = readYaml('_config.yml');
const summary = readYaml('_data/profile/summary.yml');
const education = readYaml('_data/profile/education.yml');
const experience = readYaml('_data/profile/experience.yml');
const awards = readYaml('_data/profile/awards.yml');
const grants = readYaml('_data/profile/grants.yml');
const services = readYaml('_data/profile/services.yml');
const committeeMemberships = readYaml('_data/profile/committee_memberships.yml');
const conferenceService = readYaml('_data/profile/conference_service.yml');
const studentGuidance = readYaml('_data/profile/student_guidance.yml');
const certifications = readYaml('_data/profile/certifications.yml');
const memberships = readYaml('_data/profile/memberships.yml');
const people = readYaml('_data/web/people.yml');

const SITE_URL = (config.url || '').replace(/\/$/, '');

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

// Data files may contain inline HTML (they already do, for the website).
// Only relative hrefs need fixing up, since a PDF has no site root.
function html(str) {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/href=(['"])\/(?!\/)/g, `href=$1${SITE_URL}/`)
    .trim();
}

const enDash = (s) => (s || '').replace(/--/g, '–');
const sup = (s) => (s || '').replace(/\^(\d)/g, '<sup>$1</sup>');

const section = (title, body) =>
  body ? `<section class="cv-section"><h2>${title}</h2>${body}</section>` : '';

const bullets = (items, cls = 'cv-bullets') =>
  items && items.length ? `<ul class="${cls}">${items.map((i) => `<li>${i}</li>`).join('')}</ul>` : '';

const subhead = (t) => `<h3 class="cv-subhead">${html(t)}</h3>`;

// Entry header: role on the left, dates right-aligned on the same line.
// metaParts: string, or array of strings rendered as "org · course · location"
// with the first part styled as the org (accent) and the last as location (italic).
function entryHead(title, metaParts, dates) {
  const parts = (Array.isArray(metaParts) ? metaParts : [metaParts]).filter(Boolean);
  const metaHtml = parts
    .map((m, i) => {
      let cls = 'cv-meta-mid';
      if (parts.length === 1) cls = 'cv-loc';
      else if (i === 0) cls = 'cv-org';
      else if (i === parts.length - 1) cls = 'cv-loc';
      return `<span class="${cls}">${html(m)}</span>`;
    })
    .join('<span class="cv-sep"> &middot; </span>');
  return (
    `<div class="cv-entry-head">` +
    `<div class="cv-entry-title"><span class="cv-role">${html(title)}</span>${metaHtml}</div>` +
    (dates ? `<span class="cv-dates">${html(dates)}</span>` : '') +
    `</div>`
  );
}

// ---------------------------------------------------------------------------
// Minimal BibTeX parser for assets/ref.bib
// ---------------------------------------------------------------------------

function parseBibtex(text) {
  const commentStart = text.indexOf('@Comment{');
  if (commentStart !== -1) {
    let depth = 0;
    let i = commentStart + '@Comment'.length;
    for (; i < text.length; i++) {
      if (text[i] === '{') depth++;
      else if (text[i] === '}') {
        depth--;
        if (depth === 0) { i++; break; }
      }
    }
    text = text.slice(0, commentStart) + text.slice(i);
  }

  const entries = [];
  const entryRe = /@(\w+)\s*\{/g;
  let m;
  while ((m = entryRe.exec(text))) {
    const type = m[1].toLowerCase();
    if (type === 'comment') continue;
    const braceStart = entryRe.lastIndex - 1;
    let depth = 0;
    let i = braceStart;
    for (; i < text.length; i++) {
      if (text[i] === '{') depth++;
      else if (text[i] === '}') {
        depth--;
        if (depth === 0) break;
      }
    }
    const body = text.slice(braceStart + 1, i);
    entryRe.lastIndex = i + 1;

    const commaIdx = body.indexOf(',');
    const key = body.slice(0, commaIdx).trim();
    const fieldsText = body.slice(commaIdx + 1);

    const fields = {};
    const fieldRe = /([a-zA-Z]+)\s*=\s*\{/g;
    let fm;
    while ((fm = fieldRe.exec(fieldsText))) {
      const fieldName = fm[1].toLowerCase();
      const fBraceStart = fieldRe.lastIndex - 1;
      let fDepth = 0;
      let j = fBraceStart;
      for (; j < fieldsText.length; j++) {
        if (fieldsText[j] === '{') fDepth++;
        else if (fieldsText[j] === '}') {
          fDepth--;
          if (fDepth === 0) break;
        }
      }
      fields[fieldName] = fieldsText.slice(fBraceStart + 1, j).replace(/\s+/g, ' ').trim();
      fieldRe.lastIndex = j + 1;
    }
    entries.push({ type, key, fields });
  }
  return entries;
}

function formatAuthors(authorField) {
  if (!authorField) return '';
  const names = authorField.split(/\s+and\s+/).map((n) => {
    const parts = n.split(',').map((s) => s.trim());
    const full = parts.length === 2 ? `${parts[1]} ${parts[0]}` : n.trim();
    return full === config.name ? `<strong>${full}</strong>` : full;
  });
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
}

function formatPublication(entry) {
  const f = entry.fields;
  const pages = enDash(f.pages);
  let venue;
  if (entry.type === 'article') {
    const locator = `${f.volume ? `${f.volume}${f.number ? `(${f.number})` : ''}` : ''}${pages ? `:${pages}` : ''}`;
    venue = `<em>${f.journal}</em>${locator ? `, ${locator}` : ''}, ${f.year}`;
  } else if (entry.type === 'inproceedings' && f.booktitle) {
    const org = f.organization || f.publisher || '';
    venue = `In <em>${f.booktitle}</em>${pages ? `, pages ${pages}` : ''}.${org ? ` ${org},` : ''} ${f.year}`;
  } else {
    venue = `${f.journal || f.booktitle || ''}, ${f.year}`;
  }
  const tag = f.doi || f.url ? `<span class="cv-tag">Peer-reviewed</span>` : '';
  return `<li>${formatAuthors(f.author)}. ${sup(f.title || '')}. ${venue}.${tag}</li>`;
}

const bib = parseBibtex(fs.readFileSync(path.join(ROOT, 'assets/ref.bib'), 'utf8'));
const byYearDesc = (a, b) => Number(b.fields.year || 0) - Number(a.fields.year || 0);

const publications = bib
  .filter((e) => ['article', 'inproceedings', 'unpublished'].includes(e.type))
  .sort(byYearDesc);

function talkDate(f) {
  const raw = f.data || f.date;
  if (raw && /^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return new Date(`${raw}T00:00:00Z`).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      timeZone: 'UTC',
    });
  }
  return f.year;
}

const formatTalk = (e) =>
  `<li>${formatAuthors(e.fields.author)} (${talkDate(e.fields)}). ` +
  `<em>${sup(e.fields.title || '')}</em>. ${e.fields.booktitle}.</li>`;

const talks = bib.filter((e) => e.type === 'incollection');
const invitedTalks = talks.filter((e) => (e.fields.keywords || '').includes('invited')).sort(byYearDesc);
const conferenceTalks = talks.filter((e) => (e.fields.keywords || '').includes('talk')).sort(byYearDesc);

// ---------------------------------------------------------------------------
// Student guidance — advisees derived from _data/web/people.yml
// ---------------------------------------------------------------------------

const byRole = { doctoral_advisor: [], master_advisor: [] };
[...(people.students || []), ...(people.alumni || [])].forEach((p) => {
  if (byRole[p.mentoring_role]) byRole[p.mentoring_role].push(p);
});

const guidanceLine = (p) =>
  `<span class="cv-person">${html(p.name)}</span>` +
  `<span class="cv-person-meta">${html(p.degree)}, ${html(p.institution || p.location || config.institution)}</span>` +
  `<span class="cv-person-years">${p.year_start} – ${p.year_end}</span>`;

const guidanceList = (list) =>
  list.length ? `<ul class="cv-people">${list.map((p) => `<li>${guidanceLine(p)}</li>`).join('')}</ul>` : '';

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

// Contacts render as two rows: how to reach him, then where to find his work.
// Splitting them keeps each row short enough to breathe at a readable size.
const links = config.links || {};
const reachContacts = [];
if (config.phone) reachContacts.push(['phone', `tel:${config.phone.replace(/[^\d+]/g, '')}`, config.phone]);
if (config.email) reachContacts.push(['email', `mailto:${config.email}`, config.email]);
if (config.url) reachContacts.push(['website', config.url, config.url.replace(/^https?:\/\//, '')]);

const profileContacts = [];
if (links.linkedin) profileContacts.push(['linkedin', links.linkedin, 'LinkedIn']);
if (links.google_scholar) profileContacts.push(['scholar', links.google_scholar, 'Google Scholar']);
if (links.researchgate) profileContacts.push(['researchgate', links.researchgate, 'ResearchGate']);
if (links.orcid) profileContacts.push(['orcid', links.orcid, 'ORCiD']);
if (links.github) profileContacts.push(['github', links.github, 'GitHub']);

const contactRow = (items, cls) =>
  items.length
    ? `<nav class="cv-contact ${cls}">` +
      items
        .map(([icon, href, label]) => `<a class="cv-contact-link" data-icon="${icon}" href="${href}">${label}</a>`)
        .join('') +
      `</nav>`
    : '';

const affiliation = [config.title, config.department, config.institution].filter(Boolean).join(', ');
const officeLine = config.office || config.institution_location || '';

// ---------------------------------------------------------------------------
// Assemble document body
// ---------------------------------------------------------------------------

const parts = [];

parts.push(
  `<header class="cv-header">` +
    `<h1>${html(config.name)}</h1>` +
    `<p class="cv-affiliation">${html(affiliation)}</p>` +
    (officeLine ? `<p class="cv-office">${html(officeLine)}</p>` : '') +
    contactRow(reachContacts, 'cv-contact-reach') +
    contactRow(profileContacts, 'cv-contact-profiles') +
    `</header>`
);

parts.push(section('Professional Summary', `<p class="cv-summary">${html(summary.text)}</p>`));

parts.push(
  section(
    'Professional Experience',
    (experience.professional_experience || [])
      .map(
        (job) =>
          `<article class="cv-entry">` +
          entryHead(job.position, [job.company, job.location], job.dates) +
          bullets((job.highlights || []).map(html)) +
          `</article>`
      )
      .join('')
  )
);

parts.push(
  section(
    'Teaching Experience',
    (experience.teaching_experience || [])
      .map((job) => {
        return (
          `<article class="cv-entry">` +
          entryHead(job.position, [job.institution, job.course, job.location], job.dates) +
          (job.description ? `<p class="cv-entry-desc">${html(job.description)}</p>` : '') +
          bullets([...(job.courses || []), ...(job.highlights || [])].map(html)) +
          `</article>`
        );
      })
      .join('')
  )
);

parts.push(
  section(
    'Education',
    (education || [])
      .map(
        (edu) =>
          `<article class="cv-entry">` +
          entryHead(`${edu.degree}, ${edu.institution}`, [edu.location], edu.dates) +
          bullets((edu.details || []).map(html)) +
          `</article>`
      )
      .join('')
  )
);

parts.push(
  section('Patents and Publications', `<ol class="cv-numbered">${publications.map(formatPublication).join('')}</ol>`)
);

parts.push(
  section('Grants', `<ol class="cv-numbered">${(grants || []).map((g) => `<li>${html(g.name)}</li>`).join('')}</ol>`)
);

const serviceGroups = (groups) =>
  (groups || [])
    .map(
      (g) =>
        subhead(g.category) +
        `<ul class="cv-service">` +
        (g.items || [])
          .map(
            (i) =>
              `<li><span class="cv-service-name">${html(i.name)}</span>` +
              (i.years ? `<span class="cv-service-years">${html(i.years)}</span>` : '') +
              `</li>`
          )
          .join('') +
        `</ul>`
    )
    .join('');

parts.push(section('Editorial and Review Activities', serviceGroups(services)));
parts.push(section('Committee Memberships', serviceGroups(committeeMemberships)));

parts.push(
  section(
    'Conference Leadership & Service',
    `<ul class="cv-service">` +
      (conferenceService || [])
        .map(
          (i) =>
            `<li><span class="cv-service-name"><strong>${html(i.role)}</strong>, ${html(i.name)}</span>` +
            `<span class="cv-service-years">${html(i.year)}</span></li>`
        )
        .join('') +
      `</ul>`
  )
);

parts.push(
  section(
    'Conference Presentations',
    (invitedTalks.length ? subhead('Invited Presentations') + `<ul class="cv-bullets">${invitedTalks.map(formatTalk).join('')}</ul>` : '') +
      (conferenceTalks.length
        ? subhead('Conference Papers / Oral Presentations') +
          `<ul class="cv-bullets">${conferenceTalks.map(formatTalk).join('')}</ul>`
        : '')
  )
);

parts.push(
  section(
    'Student Guidance',
    (byRole.doctoral_advisor.length ? subhead('Doctoral Dissertation Advisor') + guidanceList(byRole.doctoral_advisor) : '') +
      (byRole.master_advisor.length ? subhead('Master Thesis Advisor') + guidanceList(byRole.master_advisor) : '') +
      ((studentGuidance.doctoral_dissertation_committee || []).length
        ? subhead('Doctoral Dissertation Committee') + guidanceList(studentGuidance.doctoral_dissertation_committee)
        : '')
  )
);

parts.push(section('Honors and Awards', bullets((awards || []).map((a) => html(a.name)))));
parts.push(section('Certifications', bullets((certifications || []).map((c) => `${html(c.name)}, ${html(c.year)}`))));
parts.push(
  section('Professional Memberships', bullets((memberships || []).map((m) => `Member, ${html(m.name)}, since ${html(m.since)}`)))
);

// ---------------------------------------------------------------------------
// Render HTML + print PDF
// ---------------------------------------------------------------------------

const css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');

const document = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${config.name} — Curriculum Vitae</title>
<style>${css}</style>
</head>
<body>
${parts.join('\n')}
</body>
</html>`;

const htmlPath = path.join(__dirname, 'cv.generated.html');
fs.writeFileSync(htmlPath, document);

const today = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

const footerTemplate = `
  <div style="width:100%; font-family:'Source Serif 4',Georgia,serif; font-size:7.5pt; color:#888;
              padding:0 19mm; display:flex; justify-content:space-between;">
    <span>Last updated ${today}</span>
    <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
  </div>`;

(async () => {
  const outDir = path.join(ROOT, 'files');
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const page = await browser.newPage();
    await page.goto(`file://${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({
      path: path.join(outDir, 'cv.pdf'),
      format: 'Letter',
      printBackground: true,
      margin: { top: '18mm', bottom: '20mm', left: '19mm', right: '19mm' },
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate,
    });
  } finally {
    await browser.close();
  }
  console.log('Wrote files/cv.pdf');
})();
