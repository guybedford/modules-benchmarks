import { readFile, writeFile, mkdir } from 'fs/promises';

const preact = await readFile('../node_modules/preact/dist/preact.module.js');

try {
  await mkdir('generated');
}
catch {}

await writeFile('generated/preact.js', preact);
