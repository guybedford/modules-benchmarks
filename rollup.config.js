import { readFile } from 'fs/promises';

export default {
  input: 'app',
  treeshake: false,
  output: {
    file: `generated/bundle.js`
  },
  plugins: [{
    resolveId: id => id,
    async load (id) {
      if (id === 'app')
        return `\
import { h, Component, render } from 'preact';

export class App extends Component {
  render() {
    return h('h1', null, 'Hello, world ##n##!');
  }
}

const el = document.createElement('div');
render(h(App), el);
`;
      if (id === 'preact')
        return (await readFile('node_modules/preact/dist/preact.module.js')).toString();
    }
  }]
};
