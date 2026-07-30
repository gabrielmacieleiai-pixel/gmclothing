import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const publicDir = path.join(process.cwd(), "public");
const productsDir = path.join(publicDir, "products");
const optimizedDir = path.join(productsDir, "_optimized");
const allowed = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const variants = [
  { name: "card", width: 760, quality: 76 },
  { name: "detail", width: 1500, quality: 82 },
  { name: "hero", width: 1800, quality: 80 },
];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (full.startsWith(optimizedDir)) {
      continue;
    }

    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }

  return files;
}

function getOutputName(file) {
  const relative = path.relative(productsDir, file);
  const parsed = path.parse(relative);

  return `${path.join(parsed.dir, parsed.name)
    .replace(/[\\/]+/g, "__")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")}.webp`;
}

await fs.mkdir(optimizedDir, { recursive: true });

const files = (await walk(productsDir)).filter((file) =>
  allowed.has(path.extname(file).toLowerCase()),
);

for (const variant of variants) {
  await fs.mkdir(path.join(optimizedDir, variant.name), { recursive: true });
}

let generated = 0;

for (const file of files) {
  const outputName = getOutputName(file);

  for (const variant of variants) {
    const output = path.join(optimizedDir, variant.name, outputName);

    await sharp(file)
      .rotate()
      .resize({
        width: variant.width,
        withoutEnlargement: true,
      })
      .webp({
        quality: variant.quality,
        smartSubsample: true,
      })
      .toFile(output);

    generated += 1;
  }
}

console.log(
  `Generated ${generated} optimized images from ${files.length} source files.`,
);
