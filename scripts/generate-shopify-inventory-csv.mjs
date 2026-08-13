import { readFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { officialInventory } from "../src/data/official-inventory.ts";

const shopifyCatalogPath = process.env.SHOPIFY_CATALOG_PATH;
const shopifyCatalogUrl =
  process.env.SHOPIFY_CATALOG_URL ??
  "https://checkout-gmclo.myshopify.com/products.json?limit=250";
const locationName = process.env.SHOPIFY_LOCATION ?? "Minha loja";
const outputDirectory = join(process.cwd(), "outputs");
const csvPath = join(outputDirectory, "shopify-inventory-correction.csv");
const reportPath = join(
  outputDirectory,
  "shopify-inventory-correction-report.md",
);

const normalize = (value) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");

const escapeCsv = (value) => {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

const loadCatalog = async () => {
  if (shopifyCatalogPath) {
    return JSON.parse(await readFile(shopifyCatalogPath, "utf8"));
  }

  const response = await fetch(shopifyCatalogUrl);

  if (!response.ok) {
    throw new Error(
      `Falha ao consultar o catalogo Shopify (${response.status}).`,
    );
  }

  return response.json();
};

const catalog = await loadCatalog();
const products = catalog.products ?? [];
const productsByHandle = new Map(
  products.map((product) => [product.handle, product]),
);

const headers = [
  "Handle",
  "Title",
  "Option1 Name",
  "Option1 Value",
  "Option2 Name",
  "Option2 Value",
  "Option3 Name",
  "Option3 Value",
  "SKU",
  "Location",
  "On hand (current)",
  "On hand (new)",
];

const rows = [];
const unmatched = [];

for (const [handle, colors] of Object.entries(officialInventory)) {
  const product = productsByHandle.get(handle);

  if (!product) {
    unmatched.push(`${handle}: produto nao encontrado na Shopify`);
    continue;
  }

  const colorOption = product.options.find(
    (option) => normalize(option.name) === "cor",
  );
  const sizeOption = product.options.find(
    (option) => normalize(option.name) === "tamanho",
  );

  if (!colorOption || !sizeOption) {
    unmatched.push(`${handle}: opcoes Cor/Tamanho nao encontradas`);
    continue;
  }

  for (const [color, sizes] of Object.entries(colors)) {
    for (const [size, quantity] of Object.entries(sizes)) {
      const variant = product.variants.find((candidate) => {
        const values = [candidate.option1, candidate.option2, candidate.option3];
        return (
          normalize(values[colorOption.position - 1]) === normalize(color) &&
          normalize(values[sizeOption.position - 1]) === normalize(size)
        );
      });

      if (!variant) {
        unmatched.push(`${handle}: variante ${color} / ${size} nao encontrada`);
        continue;
      }

      if (!variant.sku) {
        unmatched.push(`${handle}: variante ${color} / ${size} sem SKU`);
        continue;
      }

      const optionValues = [variant.option1, variant.option2, variant.option3];
      rows.push([
        handle,
        product.title,
        product.options[0]?.name ?? "",
        optionValues[0] ?? "",
        product.options[1]?.name ?? "",
        optionValues[1] ?? "",
        product.options[2]?.name ?? "",
        optionValues[2] ?? "",
        variant.sku,
        locationName,
        "",
        quantity,
      ]);
    }
  }
}

if (unmatched.length > 0) {
  throw new Error(
    `CSV nao gerado: ${unmatched.length} correspondencia(s) insegura(s):\n${unmatched.join("\n")}`,
  );
}

await mkdir(outputDirectory, { recursive: true });

const csv = [headers, ...rows]
  .map((row) => row.map(escapeCsv).join(","))
  .join("\r\n");

// BOM improves accented text handling when Shopify/Excel opens the file.
await writeFile(csvPath, `\uFEFF${csv}\r\n`, "utf8");

const totalUnits = rows.reduce(
  (sum, row) => sum + Number(row[row.length - 1]),
  0,
);
const zeroedVariants = rows.filter((row) => Number(row[row.length - 1]) === 0)
  .length;
const report = `# Correcao de estoque Shopify

- Localizacao usada no CSV: **${locationName}**
- Variantes identificadas e incluidas: **${rows.length}**
- Variantes definidas como zero: **${zeroedVariants}**
- Total fisico vendavel informado: **${totalUnits} unidades**
- Produtos Shopify alterados: **${new Set(rows.map((row) => row[0])).size}**

## Seguranca da importacao

O campo \`On hand (current)\` foi deixado vazio intencionalmente. O arquivo substitui
\`On hand (new)\` pela contagem fisica aprovada, inclusive quando o valor e zero.
Precos, imagens, descricoes e variantes nao fazem parte deste CSV.

Antes do upload, confirme que a localizacao da Shopify se chama exatamente
**${locationName}** (maiusculas e espacos tambem contam).

## Itens excluidos por falta de correspondencia inequivoca

- Nike Air Frontal: verde-musgo, branca e preta
- Cristiano Ronaldo: branca (separada de off-white)
- Brasil 2026 Versao Torcedor: tamanho M
- Brasil 2026 Air Jordan Versao Torcedor azul: tamanho GG

Esses itens nao foram zerados nem alterados na Shopify.
`;

await writeFile(reportPath, report, "utf8");

console.log(`CSV criado: ${csvPath}`);
console.log(`Relatorio criado: ${reportPath}`);
console.log(`${rows.length} variantes; ${totalUnits} unidades totais.`);
