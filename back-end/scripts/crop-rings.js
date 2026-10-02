const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const ringsDir = path.join(__dirname, '..', 'images', 'rings');
const sourcePath = path.join(ringsDir, 'source.png');

// 3x3 grid — skip empty (1,0)
const crops = [
  { id: 1, row: 0, col: 0, slug: 'bronze', name: 'Bronze Gear' },
  { id: 2, row: 0, col: 1, slug: 'silver', name: 'Silver Crystal' },
  { id: 3, row: 0, col: 2, slug: 'gold', name: 'Gold Wings' },
  { id: 4, row: 1, col: 1, slug: 'fire', name: 'Fire' },
  { id: 5, row: 1, col: 2, slug: 'soccer', name: 'Soccer Neon' },
  { id: 6, row: 2, col: 0, slug: 'soccer-trail', name: 'Soccer Trail' },
  { id: 7, row: 2, col: 1, slug: 'energy', name: 'Energy Orbit' },
  { id: 8, row: 2, col: 2, slug: 'royal', name: 'Royal Crown' },
];

async function makeDarkBgTransparent(inputBuffer) {
  const { data, info } = await sharp(inputBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const maxc = Math.max(r, g, b);
    const minc = Math.min(r, g, b);
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    const sat = maxc === 0 ? 0 : (maxc - minc) / maxc;

    // Drop near-black / dark-gray sheet background; keep metal, glow, particles
    if (luminance < 42 && sat < 0.22) {
      data[i + 3] = 0;
    } else if (luminance < 28) {
      data[i + 3] = 0;
    }
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();
}

async function punchCenterHole(inputBuffer, holeRatio = 0.62) {
  const meta = await sharp(inputBuffer).metadata();
  const size = meta.width;
  const r = Math.round((size / 2) * holeRatio);
  const hole = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="white"/>
    </svg>`
  );

  // dest-out removes the filled circle → transparent avatar hole
  return sharp(inputBuffer)
    .ensureAlpha()
    .composite([{ input: hole, blend: "dest-out" }])
    .png()
    .toBuffer();
}

async function main() {
  if (!fs.existsSync(sourcePath)) {
    console.error('Missing source image:', sourcePath);
    process.exit(1);
  }

  fs.mkdirSync(ringsDir, { recursive: true });

  const meta = await sharp(sourcePath).metadata();
  const cellW = Math.floor(meta.width / 3);
  const cellH = Math.floor(meta.height / 3);

  console.log(`Source ${meta.width}x${meta.height}, cell ${cellW}x${cellH}`);

  const manifest = [];

  for (const crop of crops) {
    const left = crop.col * cellW;
    const top = crop.row * cellH;
    const outPath = path.join(ringsDir, `ring-${crop.id}.png`);

    const cellBuf = await sharp(sourcePath)
      .extract({ left, top, width: cellW, height: cellH })
      .png()
      .toBuffer();

    // Slightly different hole sizes — ornate rings need a bit more face room
    const holeRatio =
      crop.slug === "fire" || crop.slug === "energy" || crop.slug === "royal"
        ? 0.52
        : crop.slug === "soccer" || crop.slug === "soccer-trail"
          ? 0.5
          : crop.slug === "gold"
            ? 0.5
            : 0.54;

    let processed = await makeDarkBgTransparent(cellBuf);
    processed = await punchCenterHole(processed, holeRatio);

    await sharp(processed).png().toFile(outPath);
    console.log(`Wrote ring-${crop.id}.png (${crop.slug})`);
    manifest.push({ id: crop.id, slug: crop.slug, name: crop.name, file: `ring-${crop.id}.png` });
  }

  fs.writeFileSync(
    path.join(ringsDir, 'manifest.json'),
    JSON.stringify({ rings: manifest }, null, 2)
  );
  console.log('Wrote manifest.json');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
