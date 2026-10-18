import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const templatePath = resolve(projectRoot, "dist/index.html");
const serverEntryPath = resolve(projectRoot, "dist-ssr/entry-server.js");

// Every route gets its own HTML file, so search engines and link previews see real content.
// Pages other than "/" swap in their own title, description and canonical URL.
const routes = [
  { url: "/", file: "index.html" },
  {
    url: "/consults",
    file: "consults/index.html",
    title: "Precision Bio-Nutrition consults — The Food Lab, Bengaluru",
    description: "A free 20-minute Fit Call, then Baseline Mapping, an Interaction Blueprint and Adaptation Reviews. Precision Bio-Nutrition Starter ₹7,999 — personalised nutrition in Bengaluru that keeps the food you love.",
  },
];

const template = await readFile(templatePath, "utf8");
const { render } = await import(pathToFileURL(serverEntryPath).href);
const rootMarker = '<div id="root"></div>';

if (!template.includes(rootMarker)) {
  throw new Error(`Could not find ${rootMarker} in ${templatePath}`);
}

const escapeAttr = (text) => text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

for (const route of routes) {
  let html = template.replace(rootMarker, `<div id="root">${render(route.url)}</div>`);
  if (route.title) {
    const canonical = `https://thefoodlab.in${route.url}`;
    html = html
      .replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(route.title)}</title>`)
      .replace(/(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*"/g, `$1${escapeAttr(route.description)}"`)
      .replace(/(<meta (?:property|name)="(?:og:title|twitter:title)" content=")[^"]*"/g, `$1${escapeAttr(route.title)}"`)
      .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${canonical}"`)
      .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${canonical}"`);
  }
  const outPath = resolve(projectRoot, "dist", route.file);
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, html);
  console.log(`Prerendered ${route.url} into ${outPath}`);
}
