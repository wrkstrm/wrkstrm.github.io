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

// Wrkstrm agenda colors (5) are derived from WrkstrmColor Palette+Legacy.
// Mapping (Palette.Wrkstrm.rawValue -> Palette.Gradient.rawValue):
// physical=0 -> red, work=1 -> green, social=2 -> blue, deadTime=3 -> black, recovery=4 -> white.
const gradients = {
  red:   { start: [215, 25, 25],  cutoff: 4, endMul: [10, 20, 10] },
  green: { start: [25, 190, 25],  cutoff: 5, endMul: [10, 10, 10] },
  blue:  { start: [45, 100, 215], cutoff: 6, endMul: [12, 12, 10] },
  black: { start: [65, 65, 65],   cutoff: 7, endMul: [8, 8, 8] },
  white: { start: [200, 200, 200],cutoff: 6, endMul: [6, 6, 6] },
};
const agenda = ['red','green','blue','black','white'];

function rgbFor(gradientName, index, count, reversed=false) {
  const g = gradients[gradientName];
  let newIndex = index;
  let newCount = count;
  if (reversed) newIndex = newCount - newIndex;

  const [sR,sG,sB] = g.start;
  const cutoff = g.cutoff;
  const [mR,mG,mB] = g.endMul;
  const end = [sR + cutoff*mR, sG + cutoff*mG, sB + cutoff*mB];

  let delta = 1.0 / cutoff;
  if (newCount > cutoff) delta = 1.0 / newCount;
  else newCount = cutoff;

  const s = delta * (newCount - newIndex);
  const e = delta * newIndex;

  const [eR,eG,eB] = end;
  return [sR*s + eR*e, sG*s + eG*e, sB*s + eB*e];
}

function toHex([r,g,b]) {
  const c = (x)=>Math.max(0,Math.min(255,Math.round(x))).toString(16).padStart(2,'0');
  return `#${c(r)}${c(g)}${c(b)}`;
}

function agendaPalette(seed) {
  const name = agenda[seed % agenda.length];
  // choose 3 samples along the gradient
  const dark  = toHex(rgbFor(name, 2, 10));
  const mid   = toHex(rgbFor(name, 5, 10));
  const light = toHex(rgbFor(name, 9, 10));
  return { name, dark, mid, light };
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
  const pal = agendaPalette(seed);

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

function gridLines(w,h, step, stroke, opacity) {
  let out='';
  for (let x=step; x<w; x+=step) out += `<path d="M ${x} 0 L ${x} ${h}" stroke="${stroke}" stroke-width="1" opacity="${opacity}"/>`;
  for (let y=step; y<h; y+=step) out += `<path d="M 0 ${y} L ${w} ${y}" stroke="${stroke}" stroke-width="1" opacity="${opacity}"/>`;
  return out;
}

function svgIcon(slug, title) {
  const w = 256, h = 256;
  const { pal, rect, circle, tri } = genShapes({ w, h, slug });
  const seed = hash32(slug);
  const ink = '#0B0F14';
  const stroke = pal.light;
  const gStep = 32;

  // Node-link motif
  const n1 = { x: w*0.22, y: h*0.28 };
  const n2 = { x: w*0.62, y: h*0.34 };
  const n3 = { x: w*0.44, y: h*0.70 };

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(title)} icon</title>
  <desc id="desc">Wrkstrm Philographics icon for ${escapeXml(slug)} (agenda:${pal.name}).</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${pal.dark}"/>
      <stop offset="100%" stop-color="${ink}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  ${gridLines(w,h,gStep, pal.mid, 0.10)}

  <path d="M ${fmt(n1.x)} ${fmt(n1.y)} L ${fmt(n2.x)} ${fmt(n2.y)} L ${fmt(n3.x)} ${fmt(n3.y)} Z" fill="none" stroke="${stroke}" stroke-width="2" opacity="0.45"/>
  <circle cx="${fmt(n1.x)}" cy="${fmt(n1.y)}" r="6" fill="${stroke}" opacity="0.85"/>
  <circle cx="${fmt(n2.x)}" cy="${fmt(n2.y)}" r="6" fill="${stroke}" opacity="0.85"/>
  <circle cx="${fmt(n3.x)}" cy="${fmt(n3.y)}" r="6" fill="${stroke}" opacity="0.85"/>

  <rect x="${fmt(rect.x)}" y="${fmt(rect.y)}" width="${fmt(rect.w)}" height="${fmt(rect.h)}" rx="${fmt(rect.rx)}" fill="${pal.mid}" opacity="0.70"/>
  <circle cx="${fmt(circle.cx)}" cy="${fmt(circle.cy)}" r="${fmt(circle.r)}" fill="${pal.light}" opacity="0.30"/>
  <path d="M ${fmt(tri.p1x)} ${fmt(tri.p1y)} L ${fmt(tri.p2x)} ${fmt(tri.p2y)} L ${fmt(tri.p3x)} ${fmt(tri.p3y)} Z" fill="${pal.light}" opacity="0.18"/>
</svg>
`;
}

function svgCard(slug, title) {
  const w = 600, h = 400;
  const { pal, rect, circle, tri } = genShapes({ w, h, slug });
  const ink = '#0B0F14';
  const gStep = 48;

  // Layer + graph motif
  const x0 = w*0.16, y0=h*0.22;
  const layerW=w*0.62, layerH=h*0.16;

  const n1 = { x: w*0.20, y: h*0.66 };
  const n2 = { x: w*0.46, y: h*0.54 };
  const n3 = { x: w*0.72, y: h*0.62 };

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(title)} card</title>
  <desc id="desc">Wrkstrm Philographics card for ${escapeXml(slug)} (agenda:${pal.name}).</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${ink}"/>
      <stop offset="100%" stop-color="${pal.dark}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  ${gridLines(w,h,gStep, pal.mid, 0.08)}

  <rect x="${fmt(x0)}" y="${fmt(y0)}" width="${fmt(layerW)}" height="${fmt(layerH)}" rx="14" fill="${pal.mid}" opacity="0.45"/>
  <rect x="${fmt(x0+18)}" y="${fmt(y0+34)}" width="${fmt(layerW)}" height="${fmt(layerH)}" rx="14" fill="${pal.mid}" opacity="0.32"/>

  <path d="M ${fmt(n1.x)} ${fmt(n1.y)} L ${fmt(n2.x)} ${fmt(n2.y)} L ${fmt(n3.x)} ${fmt(n3.y)}" fill="none" stroke="${pal.light}" stroke-width="2" opacity="0.35"/>
  <circle cx="${fmt(n1.x)}" cy="${fmt(n1.y)}" r="7" fill="${pal.light}" opacity="0.75"/>
  <circle cx="${fmt(n2.x)}" cy="${fmt(n2.y)}" r="7" fill="${pal.light}" opacity="0.75"/>
  <circle cx="${fmt(n3.x)}" cy="${fmt(n3.y)}" r="7" fill="${pal.light}" opacity="0.75"/>

  <rect x="${fmt(rect.x)}" y="${fmt(rect.y)}" width="${fmt(rect.w)}" height="${fmt(rect.h)}" rx="${fmt(rect.rx)}" fill="${pal.mid}" opacity="0.30"/>
  <circle cx="${fmt(circle.cx)}" cy="${fmt(circle.cy)}" r="${fmt(circle.r)}" fill="${pal.light}" opacity="0.14"/>
  <path d="M ${fmt(tri.p1x)} ${fmt(tri.p1y)} L ${fmt(tri.p2x)} ${fmt(tri.p2y)} L ${fmt(tri.p3x)} ${fmt(tri.p3y)} Z" fill="${pal.light}" opacity="0.10"/>
</svg>
`;
}

function svgHero(slug, title) {
  const w = 1200, h = 600;
  const { pal, rect, circle, tri } = genShapes({ w, h, slug });
  const ink = '#070A0F';
  const gStep = 80;

  // Pipeline motif
  const px = w*0.12, py=h*0.22;
  const pw = w*0.76, ph=h*0.10;

  const n1 = { x: w*0.20, y: h*0.68 };
  const n2 = { x: w*0.46, y: h*0.56 };
  const n3 = { x: w*0.72, y: h*0.64 };
  const n4 = { x: w*0.88, y: h*0.44 };

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(title)} hero</title>
  <desc id="desc">Wrkstrm Philographics hero for ${escapeXml(slug)} (agenda:${pal.name}).</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${ink}"/>
      <stop offset="100%" stop-color="${pal.dark}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  ${gridLines(w,h,gStep, pal.mid, 0.06)}

  <rect x="${fmt(px)}" y="${fmt(py)}" width="${fmt(pw)}" height="${fmt(ph)}" rx="18" fill="${pal.mid}" opacity="0.28"/>
  <rect x="${fmt(px+26)}" y="${fmt(py+42)}" width="${fmt(pw)}" height="${fmt(ph)}" rx="18" fill="${pal.mid}" opacity="0.20"/>

  <path d="M ${fmt(n1.x)} ${fmt(n1.y)} L ${fmt(n2.x)} ${fmt(n2.y)} L ${fmt(n3.x)} ${fmt(n3.y)} L ${fmt(n4.x)} ${fmt(n4.y)}" fill="none" stroke="${pal.light}" stroke-width="3" opacity="0.30"/>
  ${[n1,n2,n3,n4].map(n=>`<circle cx="${fmt(n.x)}" cy="${fmt(n.y)}" r="10" fill="${pal.light}" opacity="0.55"/>`).join('')}

  <rect x="${fmt(rect.x)}" y="${fmt(rect.y)}" width="${fmt(rect.w)}" height="${fmt(rect.h)}" rx="${fmt(rect.rx)}" fill="${pal.mid}" opacity="0.18"/>
  <circle cx="${fmt(circle.cx)}" cy="${fmt(circle.cy)}" r="${fmt(circle.r)}" fill="${pal.light}" opacity="0.10"/>
  <path d="M ${fmt(tri.p1x)} ${fmt(tri.p1y)} L ${fmt(tri.p2x)} ${fmt(tri.p2y)} L ${fmt(tri.p3x)} ${fmt(tri.p3y)} Z" fill="${pal.light}" opacity="0.08"/>
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

  // Always (re)generate assets to match current brand profile.
  fs.writeFileSync(iconPath, svgIcon(slug, title), 'utf8');
  fs.writeFileSync(cardPath, svgCard(slug, title), 'utf8');
  fs.writeFileSync(heroPath, svgHero(slug, title), 'utf8');
  heroWritten++;

  let updated = mdText;
  updated = ensureMetadataAndOptions(updated, slug, title);
  updated = ensureHero(updated, slug, title);

  if (updated !== mdText) {
    fs.writeFileSync(file, updated, 'utf8');
    mdChanged++;
  }
}

console.log(JSON.stringify({ mdChanged, heroWritten }, null, 2));
