#!/usr/bin/env node
/*
Ensure every DocC article page has per-page Philographics assets:
- icon: <slug>-icon.codex.svg
- card: <slug>-card.codex.svg
- hero: <slug>-hero.codex.svg

And ensure each page declares:
- @Metadata with @PageKind(article), @PageColor(gray), @TitleHeading, @PageImage icon+card
- @Options with @AutomaticSeeAlso(disabled)
- @Image hero after @Options (only if page doesn't already have an @Image)

No <text> nodes are generated.
*/

const fs = require('fs');
const path = require('path');

const repoRoot = process.cwd();
const catalogDir = path.join(repoRoot, 'index.docc');
const resourcesDir = path.join(catalogDir, 'resources');

function* walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) yield* walk(p);
    else yield p;
  }
}

function hash32(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

const palettes = [
  { dark: '#0E3A53', mid: '#2A6F97', light: '#E5989B' },
  { dark: '#1B263B', mid: '#2D6A4F', light: '#B8F2E6' },
  { dark: '#5E548E', mid: '#2A6F97', light: '#ADB5BD' },
  { dark: '#1F1F1F', mid: '#B23A48', light: '#F8F4EE' },
  { dark: '#14213D', mid: '#1B6CA8', light: '#F4ACB7' },
];

function pick(arr, seed) {
  return arr[seed % arr.length];
}

function fmt(n) {
  return Number(n).toFixed(2);
}

function escapeXml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function slugForMd(mdPath) {
  const rel = path.relative(catalogDir, mdPath);
  return rel.replace(/\.md$/i, '').split(path.sep).join('-');
}

function titleFromMd(mdText, fallback) {
  const m = mdText.match(/^#\s+(.+)$/m);
  if (m) return m[1].trim();
  return fallback;
}

function genShapes({ w, h, slug }) {
  const seed = hash32(slug);
  const pal = pick(palettes, seed);

  const rectW = w * (0.45 + ((seed >>> 3) % 16) / 100);
  const rectH = h * (0.24 + ((seed >>> 7) % 16) / 100);
  const rectX = w * (0.18 + ((seed >>> 11) % 20) / 100);
  const rectY = h * (0.58 + ((seed >>> 15) % 16) / 100);
  const rx = Math.min(rectH, rectW) * (0.34 + ((seed >>> 19) % 12) / 100);

  const circleR = Math.min(w, h) * (0.16 + ((seed >>> 23) % 10) / 100);
  const circleX = w * (0.62 + ((seed >>> 27) % 22) / 100);
  const circleY = h * (0.38 + ((seed >>> 5) % 22) / 100);

  const p1x = w * (0.50 + ((seed >>> 9) % 16) / 100);
  const p1y = h * (0.32 + ((seed >>> 13) % 16) / 100);
  const p2x = w * (0.72 + ((seed >>> 17) % 20) / 100);
  const p2y = h * (0.56 + ((seed >>> 21) % 18) / 100);
  const p3x = w * (0.92 + ((seed >>> 25) % 8) / 100);
  const p3y = h * (0.28 + ((seed >>> 29) % 18) / 100);

  return {
    pal,
    rect: { x: rectX, y: rectY, w: rectW, h: rectH, rx },
    circle: { cx: circleX, cy: circleY, r: circleR },
    tri: { p1x, p1y, p2x, p2y, p3x, p3y },
  };
}

function svgIcon(slug, title) {
  const w = 256, h = 256;
  const { pal, rect, circle, tri } = genShapes({ w, h, slug });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(title)} icon</title>
  <desc id="desc">Philographics icon for ${escapeXml(slug)}.</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${pal.mid}"/>
      <stop offset="100%" stop-color="${pal.dark}"/>
    </linearGradient>
  </defs>
  <rect x="${fmt(rect.x)}" y="${fmt(rect.y)}" width="${fmt(rect.w)}" height="${fmt(rect.h)}" rx="${fmt(rect.rx)}" fill="${pal.dark}" opacity="0.85"/>
  <circle cx="${fmt(circle.cx)}" cy="${fmt(circle.cy)}" r="${fmt(circle.r)}" fill="${pal.light}" opacity="0.90"/>
  <path d="M ${fmt(tri.p1x)} ${fmt(tri.p1y)} L ${fmt(tri.p2x)} ${fmt(tri.p2y)} L ${fmt(tri.p3x)} ${fmt(tri.p3y)} Z" fill="${pal.light}" opacity="0.60"/>
</svg>
`;
}

function svgCard(slug, title) {
  const w = 600, h = 400;
  const { pal, rect, circle, tri } = genShapes({ w, h, slug });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(title)} card</title>
  <desc id="desc">Philographics card for ${escapeXml(slug)}.</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${pal.mid}"/>
      <stop offset="100%" stop-color="${pal.dark}"/>
    </linearGradient>
  </defs>
  <rect x="${fmt(rect.x)}" y="${fmt(rect.y)}" width="${fmt(rect.w)}" height="${fmt(rect.h)}" rx="${fmt(rect.rx)}" fill="${pal.dark}" opacity="0.85"/>
  <circle cx="${fmt(circle.cx)}" cy="${fmt(circle.cy)}" r="${fmt(circle.r)}" fill="${pal.light}" opacity="0.90"/>
  <path d="M ${fmt(tri.p1x)} ${fmt(tri.p1y)} L ${fmt(tri.p2x)} ${fmt(tri.p2y)} L ${fmt(tri.p3x)} ${fmt(tri.p3y)} Z" fill="${pal.light}" opacity="0.60"/>
</svg>
`;
}

function svgHero(slug, title) {
  const w = 1200, h = 600;
  const { pal, rect, circle, tri } = genShapes({ w, h, slug });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(title)} hero</title>
  <desc id="desc">Philographics hero for ${escapeXml(slug)}.</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${pal.mid}"/>
      <stop offset="100%" stop-color="${pal.dark}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)" opacity="1"/>
  <rect x="${fmt(rect.x)}" y="${fmt(rect.y)}" width="${fmt(rect.w)}" height="${fmt(rect.h)}" rx="${fmt(rect.rx)}" fill="${pal.dark}" opacity="0.78"/>
  <circle cx="${fmt(circle.cx)}" cy="${fmt(circle.cy)}" r="${fmt(circle.r)}" fill="${pal.light}" opacity="0.90"/>
  <path d="M ${fmt(tri.p1x)} ${fmt(tri.p1y)} L ${fmt(tri.p2x)} ${fmt(tri.p2y)} L ${fmt(tri.p3x)} ${fmt(tri.p3y)} Z" fill="${pal.light}" opacity="0.55"/>
</svg>
`;
}

function hasMetadata(mdText) {
  return /@Metadata\s*\{/.test(mdText);
}

function ensureMetadataAndOptions(mdText, slug, title) {
  const icon = `${slug}-icon.codex.svg`;
  const card = `${slug}-card.codex.svg`;

  if (!hasMetadata(mdText)) {
    const meta = `@Metadata {\n  @PageKind(article)\n  @PageColor(gray)\n  @TitleHeading("${escapeXml(title)}")\n  @PageImage(purpose: icon, source: "${icon}", alt: "${escapeXml(title)} icon")\n  @PageImage(purpose: card, source: "${card}", alt: "${escapeXml(title)} card")\n}\n\n@Options {\n  @AutomaticSeeAlso(disabled)\n}\n\n`;
    const lines = mdText.split(/\n/);
    const idx = lines.findIndex(l => l.startsWith('# '));
    if (idx !== -1) {
      lines.splice(idx + 2, 0, meta);
      return lines.join('\n');
    }
    return meta + mdText;
  }

  let out = mdText;
  if (!/@PageImage\(purpose:\s*icon\b/.test(out)) {
    out = out.replace(/@TitleHeading\([^\n]*\)\s*\n/, m => m + `  @PageImage(purpose: icon, source: "${icon}", alt: "${escapeXml(title)} icon")\n`);
  }
  if (!/@PageImage\(purpose:\s*card\b/.test(out)) {
    out = out.replace(/@TitleHeading\([^\n]*\)\s*\n/, m => m + `  @PageImage(purpose: card, source: "${card}", alt: "${escapeXml(title)} card")\n`);
  }

  if (!/@Options\s*\{/.test(out)) {
    out = out.replace(/@Metadata\s*\{[\s\S]*?\}\s*\n/, m => m + `\n@Options {\n  @AutomaticSeeAlso(disabled)\n}\n`);
  } else if (!/@AutomaticSeeAlso\(disabled\)/.test(out)) {
    out = out.replace(/@Options\s*\{\s*\n/, m => m + `  @AutomaticSeeAlso(disabled)\n`);
  }

  return out;
}

function ensureHero(mdText, slug, title) {
  const hero = `${slug}-hero.codex.svg`;
  if (/@Image\(source:\s*"[^"]+"/.test(mdText)) return mdText;
  if (!/@Options\s*\{[\s\S]*?\}/.test(mdText)) return mdText;
  return mdText.replace(/(@Options\s*\{[\s\S]*?\}\s*\n)/, `$1\n@Image(source: "${hero}", alt: "${escapeXml(title)} hero")\n\n`);
}

fs.mkdirSync(resourcesDir, { recursive: true });

let mdChanged = 0;
let heroWritten = 0;

for (const file of walk(catalogDir)) {
  if (!file.endsWith('.md')) continue;

  // Skip the tech root index.md (bespoke assets)
  if (path.relative(catalogDir, file) === 'index.md') continue;

  const mdText = fs.readFileSync(file, 'utf8');
  const slug = slugForMd(file);
  const title = titleFromMd(mdText, slug);

  const iconPath = path.join(resourcesDir, `${slug}-icon.codex.svg`);
  const cardPath = path.join(resourcesDir, `${slug}-card.codex.svg`);
  const heroPath = path.join(resourcesDir, `${slug}-hero.codex.svg`);

  if (!fs.existsSync(iconPath)) fs.writeFileSync(iconPath, svgIcon(slug, title), 'utf8');
  if (!fs.existsSync(cardPath)) fs.writeFileSync(cardPath, svgCard(slug, title), 'utf8');
  if (!fs.existsSync(heroPath)) {
    fs.writeFileSync(heroPath, svgHero(slug, title), 'utf8');
    heroWritten++;
  }

  let updated = mdText;
  updated = ensureMetadataAndOptions(updated, slug, title);
  updated = ensureHero(updated, slug, title);

  if (updated !== mdText) {
    fs.writeFileSync(file, updated, 'utf8');
    mdChanged++;
  }
}

console.log(JSON.stringify({ mdChanged, heroWritten }, null, 2));
