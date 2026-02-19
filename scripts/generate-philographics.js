#!/usr/bin/env node
/*
Generate Philographics-style SVG icon+card assets for every DocC page
and ensure each page has @PageImage icon/card set.

- Icons: 256x256
- Cards: 600x400
- No <text> nodes (titles/desc are OK; no visible text)
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
  // FNV-1a 32-bit
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function pick(arr, seed) {
  return arr[seed % arr.length];
}

const palettes = [
  // deep navy / rose / stone
  { dark: '#0E3A53', mid: '#2A6F97', light: '#E5989B' },
  // forest / slate / mint
  { dark: '#1B263B', mid: '#2D6A4F', light: '#B8F2E6' },
  // plum / blue / warm gray
  { dark: '#5E548E', mid: '#2A6F97', light: '#ADB5BD' },
  // charcoal / rust / sand
  { dark: '#1F1F1F', mid: '#B23A48', light: '#F8F4EE' },
  // ocean / ink / soft pink
  { dark: '#14213D', mid: '#1B6CA8', light: '#F4ACB7' },
];

function fmt(n) {
  return Number(n).toFixed(2);
}

function genShapes({ w, h, slug }) {
  const seed = hash32(slug);
  const pal = pick(palettes, seed);

  // Geometry is deterministic but varied.
  const rectW = w * (0.42 + ((seed >>> 3) % 20) / 100); // 0.42..0.61
  const rectH = h * (0.22 + ((seed >>> 7) % 18) / 100); // 0.22..0.39
  const rectX = w * (0.18 + ((seed >>> 11) % 22) / 100); // 0.18..0.39
  const rectY = h * (0.55 + ((seed >>> 15) % 18) / 100); // 0.55..0.72
  const rx = Math.min(rectH, rectW) * (0.35 + ((seed >>> 19) % 15) / 100);

  const circleR = Math.min(w, h) * (0.14 + ((seed >>> 23) % 10) / 100); // 0.14..0.23
  const circleX = w * (0.55 + ((seed >>> 27) % 30) / 100); // 0.55..0.84
  const circleY = h * (0.33 + ((seed >>> 5) % 28) / 100); // 0.33..0.61

  // Triangle-ish shape
  const p1x = w * (0.48 + ((seed >>> 9) % 18) / 100);
  const p1y = h * (0.30 + ((seed >>> 13) % 18) / 100);
  const p2x = w * (0.70 + ((seed >>> 17) % 28) / 100);
  const p2y = h * (0.52 + ((seed >>> 21) % 20) / 100);
  const p3x = w * (0.90 + ((seed >>> 25) % 10) / 100);
  const p3y = h * (0.26 + ((seed >>> 29) % 24) / 100);

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

function escapeXml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function slugForMd(mdPath) {
  // mdPath relative to catalogDir
  const rel = path.relative(catalogDir, mdPath);
  const noExt = rel.replace(/\.md$/i, '');
  const parts = noExt.split(path.sep);
  // Flatten, but skip a leading 'index' folder name if it exists (not used here)
  return parts.join('-');
}

function titleFromMd(mdText, fallback) {
  const m = mdText.match(/^#\s+(.+)$/m);
  if (m) return m[1].trim();
  return fallback;
}

function ensurePageImages(mdText, slug, title) {
  // Only touch files that have a @Metadata block.
  const metaStart = mdText.indexOf('@Metadata');
  if (metaStart === -1) return mdText;

  // Find the first @Metadata { ... } block (naive but works for this repo's format)
  const openIdx = mdText.indexOf('{', metaStart);
  if (openIdx === -1) return mdText;

  // brace matching
  let depth = 0;
  let closeIdx = -1;
  for (let i = openIdx; i < mdText.length; i++) {
    const ch = mdText[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) { closeIdx = i; break; }
    }
  }
  if (closeIdx === -1) return mdText;

  const before = mdText.slice(0, openIdx + 1);
  const inside = mdText.slice(openIdx + 1, closeIdx);
  const after = mdText.slice(closeIdx);

  const iconName = `${slug}-icon.codex.svg`;
  const cardName = `${slug}-card.codex.svg`;

  let newInside = inside;

  const hasIcon = /@PageImage\(\s*purpose:\s*icon\b/.test(inside);
  const hasCard = /@PageImage\(\s*purpose:\s*card\b/.test(inside);

  // Insert after @TitleHeading if present, else at end of metadata block.
  const titleHeadingRe = /(^\s*@TitleHeading\([^\n]*\)\s*$)/m;
  const m = newInside.match(titleHeadingRe);

  const inject = [];
  if (!hasIcon) inject.push(`  @PageImage(purpose: icon, source: "${iconName}", alt: "${escapeXml(title)} icon")`);
  if (!hasCard) inject.push(`  @PageImage(purpose: card, source: "${cardName}", alt: "${escapeXml(title)} card")`);

  if (inject.length === 0) return mdText;

  if (m) {
    const idx = newInside.indexOf(m[1]) + m[1].length;
    newInside = newInside.slice(0, idx) + `\n` + inject.join('\n') + newInside.slice(idx);
  } else {
    newInside = newInside.replace(/\s*$/,'\n' + inject.join('\n') + '\n');
  }

  return before + newInside + after;
}

function isBlankSvg(svgText) {
  // Consider "blank" if it has no rect/circle/path (besides background) and is tiny.
  const hasShape = /<(rect|circle|path)\b/.test(svgText);
  // Many of our generated ones include these shapes.
  return !hasShape || svgText.trim().length < 200;
}

fs.mkdirSync(resourcesDir, { recursive: true });

let mdChanged = 0;
let svgWritten = 0;

for (const file of walk(catalogDir)) {
  if (!file.endsWith('.md')) continue;

  const mdText = fs.readFileSync(file, 'utf8');
  const slug = slugForMd(file);
  const title = titleFromMd(mdText, slug);

  const iconPath = path.join(resourcesDir, `${slug}-icon.codex.svg`);
  const cardPath = path.join(resourcesDir, `${slug}-card.codex.svg`);

  // Write SVGs if missing or blank.
  for (const [p, make] of [
    [iconPath, () => svgIcon(slug, title)],
    [cardPath, () => svgCard(slug, title)],
  ]) {
    if (!fs.existsSync(p)) {
      fs.writeFileSync(p, make(), 'utf8');
      svgWritten++;
    } else {
      const existing = fs.readFileSync(p, 'utf8');
      if (isBlankSvg(existing)) {
        fs.writeFileSync(p, make(), 'utf8');
        svgWritten++;
      }
    }
  }

  // Ensure @PageImage metadata.
  const updated = ensurePageImages(mdText, slug, title);
  if (updated !== mdText) {
    fs.writeFileSync(file, updated, 'utf8');
    mdChanged++;
  }
}

console.log(JSON.stringify({ mdChanged, svgWritten }, null, 2));
