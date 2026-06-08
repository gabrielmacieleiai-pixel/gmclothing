import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const publicDir = path.join(process.cwd(), "public");
const allowed = new Set([".jpg", ".jpeg", ".png"]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }

  return files;
}

const files = await walk(publicDir);

for (const file of files) {
  const ext = path.extname(file).toLowerCase();

  if (!allowed.has(ext)) continue;

  const output = file.replace(ext, ".webp");

  await sharp(file)
    .rotate()
    .resize({
      width: 1600,
      withoutEnlargement: true
    })
    .webp({
      quality: 78
    })
    .toFile(output);

  const oldStat = await fs.stat(file);
  const newStat = await fs.stat(output);

  console.log(
    `${path.relative(publicDir, file)} -> ${path.relative(publicDir, output)} | ${Math.round(oldStat.size / 1024)}KB -> ${Math.round(newStat.size / 1024)}KB`
  );
}