import { readFile } from 'fs/promises';

const builds = [];

for (let n of [50, 100, 250, 500, 1000, 1500, 2000]) {
  builds.push({
    input: 'app',
    treeshake: false,
    output: {
      file: `generated/bundle${n}.js`
    },
    plugins: [{
      resolveId: id => id,
      async load (id) {
        if (id === 'app') {
          let source = '';
          for (let i = 1; i <= n; i++)
            source += `import "./generated/app${i}.js";\n`;
          return source;
        }
        if (id.indexOf('?') !== -1)
          id = id.slice(0, id.indexOf('?'));
        if (id === 'lib/preact.js' || id === './preact.js')
          id = './generated/preact.js';
        return (await readFile(id)).toString();
      }
    }]
  });
}

export default builds;
