const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const soccerDir = path.join(__dirname, '..', 'images', 'soccer');
const sourcePath = path.join(soccerDir, 'source.png');

// Unique cells only — skip (1,1) Kane dup and (2,0) Haaland dup
const crops = [
  { id: 1, row: 0, col: 0, name: 'Lionel Messi' },
  { id: 2, row: 0, col: 1, name: 'Cristiano Ronaldo' },
  { id: 3, row: 0, col: 2, name: 'Kylian Mbappé' },
  { id: 4, row: 1, col: 0, name: 'Harry Kane' },
  { id: 5, row: 1, col: 2, name: 'Erling Haaland' },
  { id: 6, row: 2, col: 1, name: 'Lamine Yamal' },
  { id: 7, row: 2, col: 2, name: 'Vinícius Júnior' },
];

async function main() {
  if (!fs.existsSync(sourcePath)) {
    console.error('Missing source image:', sourcePath);
    process.exit(1);
  }

  const meta = await sharp(sourcePath).metadata();
  const cellW = Math.floor(meta.width / 3);
  const cellH = Math.floor(meta.height / 3);

  console.log(`Source ${meta.width}x${meta.height}, cell ${cellW}x${cellH}`);

  for (const crop of crops) {
    const left = crop.col * cellW;
    const top = crop.row * cellH;
    const outPath = path.join(soccerDir, `AV${crop.id}.png`);

    await sharp(sourcePath)
      .extract({ left, top, width: cellW, height: cellH })
      .png()
      .toFile(outPath);

    console.log(`Wrote AV${crop.id}.png (${crop.name})`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
