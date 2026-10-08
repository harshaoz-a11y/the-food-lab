import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const templatePath = resolve(projectRoot, "dist/index.html");
const serverEntryPath = resolve(projectRoot, "dist-ssr/entry-server.js");

const template = await readFile(templatePath, "utf8");
const { render } = await import(pathToFileURL(serverEntryPath).href);
const appHtml = render("/");
const rootMarker = '<div id="root"></div>';

if (!template.includes(rootMarker)) {
  throw new Error(`Could not find ${rootMarker} in ${templatePath}`);
}

const prerenderedHtml = template.replace(
  rootMarker,
  `<div id="root">${appHtml}</div>`,
);

await writeFile(templatePath, prerenderedHtml);
console.log(`Prerendered / into ${templatePath}`);
