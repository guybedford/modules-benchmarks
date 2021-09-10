import { readFile, writeFile, mkdir } from 'fs/promises';

const preact = await readFile('../node_modules/preact/dist/preact.module.js');

try {
  await mkdir('generated');
}
catch {}

await writeFile('generated/preact.js', preact);

for (let i = 1; i <= 2000; i++) {
  await writeFile(`generated/app${i}.js`, `\
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
