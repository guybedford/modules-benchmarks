import { readFile } from 'fs/promises';

const builds = [];

for (let n of [50, 100, 250, 500, 1000, 1500, 2000, 2500]) {
  builds.push({
    input: 'preact',
    treeshake: false,
    output: {
      file: `generated/bundle${n}.js`
    },
    plugins: [{
      resolveId: id => id,
      async load (id) {
        if (id === 'preact') {
          let source = '';
          for (let i = 0; i < n; i++)
            source += `import "../node_modules/preact/dist/preact.module.js?i=${i}";\n`;
          return source;
        }
        if (id.indexOf('?') !== -1)
          id = id.slice(0, id.indexOf('?'));
        return (await readFile(id)).toString();
      }
    }]
  });
}

export default builds;
