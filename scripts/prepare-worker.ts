import { access, mkdir, rename, rm, writeFile } from "node:fs/promises";

const assets = ".vercel/output/static";
const source = `${assets}/_worker.js`;
const entry = ".vercel/worker/entry";

await access(`${source}/index.js`);
await mkdir(".vercel/worker", { recursive: true });
await rm(entry, { recursive: true, force: true });
await rename(source, entry);
await writeFile(`${assets}/.assetsignore`, "/_routes.json\n");
