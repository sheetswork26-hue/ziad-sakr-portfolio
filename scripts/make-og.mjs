// Regenerates the social share image (public/og.jpg, 1200x630) from your photo + logo.
// Run:  node scripts/make-og.mjs     (edit the texts below first if you like)
import sharp from 'sharp';
import fs from 'node:fs';

const NAME = 'Ziad Sakr';
const ROLE_1 = 'AI Automation Engineer';
const ROLE_2 = '&amp; Full-Stack Developer';
const LINE = 'n8n workflows · AI agents · Backend · Front-end';
const CHIPS = ['n8n', 'AI agents', 'Node.js', 'Astro'];

const W = 1200, H = 630;
const photo = await sharp('public/me.webp').resize(470, 630, { fit: 'cover', position: 'top' }).toBuffer();
const fade = Buffer.from(`<svg width="470" height="630"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#0e0b16"/><stop offset=".35" stop-color="#0e0b16" stop-opacity="0"/></linearGradient></defs><rect width="470" height="630" fill="url(#g)"/></svg>`);
const logo = await sharp(fs.readFileSync('public/favicon.svg'), { density: 400 }).resize(84, 84).png().toBuffer();

let x = 0;
const chips = CHIPS.map((c) => {
  const w = 40 + c.length * 12;
  const s = `<rect x="${x}" width="${w}" height="40" rx="20" fill="#221c33" stroke="#3a3152"/><text x="${x + w / 2}" y="27" text-anchor="middle" class="chip">${c}</text>`;
  x += w + 12;
  return s;
}).join('');

const text = Buffer.from(`<svg width="${W}" height="${H}">
  <style>
    .n { font: 700 70px Arial, Helvetica, sans-serif; fill: #fff; letter-spacing: -1.5px; }
    .r { font: 600 34px Arial, Helvetica, sans-serif; fill: #ea4b71; }
    .r2 { font: 500 30px Arial, Helvetica, sans-serif; fill: #c9c2da; }
    .d { font: 400 25px Arial, Helvetica, sans-serif; fill: #a59eb8; }
    .chip { font: 600 20px 'Courier New', monospace; fill: #eeeaf5; }
  </style>
  <text x="70" y="250" class="n">${NAME}</text>
  <text x="70" y="306" class="r">${ROLE_1}</text>
  <text x="70" y="350" class="r2">${ROLE_2}</text>
  <text x="70" y="410" class="d">${LINE}</text>
  <g transform="translate(70,470)">${chips}</g>
</svg>`);

await sharp({ create: { width: W, height: H, channels: 3, background: '#0e0b16' } })
  .composite([
    { input: photo, left: W - 470, top: 0 },
    { input: fade, left: W - 470, top: 0 },
    { input: text, left: 0, top: 0 },
    { input: logo, left: 70, top: 90 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile('public/og.jpg');
console.log('✓ public/og.jpg updated');
