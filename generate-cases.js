import { readFile, writeFile, mkdir } from 'fs/promises';

const preact = await readFile('node_modules/preact/dist/preact.module.js');

try {
  await mkdir('generated');
}
catch {}

// Parallel

await writeFile('generated/preact.js', preact);

const bundle = await readFile('generated/bundle.js');
for (let n of [50, 100, 250, 500, 1000, 1500, 2000, 5000, 10000, 20000]) {
  let source = '';
  for (let i = 1; i <= n; i++) {
    source += `export let _App${i};\n{\n${bundle.toString().replace('##n##', i).replace(/export \{ App \};\s*$/, `_App${i} = App;`)}}\n`;
  }
  await writeFile(`generated/bundle${n}.js`, source);
}

for (let i = 1; i <= 20000; i++) {
  await writeFile(`generated/app${i}.js`, `\
import { h, Component, render } from './preact.js?n=${i}';

export class App extends Component {
  render() {
    return h('h1', null, 'Hello, world ${i}!');
  }
}

const el = document.createElement('div');
render(h(App), el);
`);
}

for (let i = 1; i <= 20000; i++) {
  await writeFile(`generated/app.mapped${i}.js`, `\
import { h, Component, render } from 'lib/preact.js?n=${i}';

export class App extends Component {
  render() {
    return h('h1', null, 'Hello, world ${i}!');
  }
}

const el = document.createElement('div');
render(h(App), el);
`);
}

// Waterfall

await writeFile(`generated/app.waterfall.0.js`, `\
import { h, Component } from './preact.js';

export class App extends Component {
  render() {
    return h('h1', null, 'Hello, world!');
  }
}
`);

for (let i = 1; i <= 1024; i++) {
  await writeFile(`generated/app.waterfall.${i}.js`, `\
export { App } from './app.waterfall.${i - 1}.js';
`);
}

for (const i of [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]) {
  await writeFile(`generated/app.waterfall${i}.js`, `\
import { h, render } from './preact.js';
import { App } from './app.waterfall.${i}.js';

const el = document.createElement('div');
render(h(App), el);
`);
}

for (const i of [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]) {
  await writeFile(`generated/app.waterfall${i}.mapped.js`, `\
import { h, render } from 'lib/preact.js';
import { App } from 'lib/app.waterfall.${i}.js';

const el = document.createElement('div');
render(h(App), el);
`);
}
