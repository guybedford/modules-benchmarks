import { writeFile, mkdir } from 'fs/promises';

try {
  await mkdir('results');
}
catch {}

const browser = process.env.BROWSER || 'chrome';

const nModules = [
  'bundle',
  'bundle-cached',
  'parallel',
  'parallel-cached',
  'parallel-mapped',
  'parallel-mapped-cached',
  'parallel-mapped-esms',
  'parallel-mapped-esms-cached',
  'parallel-mapped-esms-debug',
  'parallel-mapped-esms-debug-cached'
];

for (const name of nModules) {
  await writeFile(`benchmarks/${name}.bench.json`, `
{
  "$schema": "https://raw.githubusercontent.com/Polymer/tachometer/master/config.schema.json",
  "sampleSize": 5,
  "benchmarks": [
    {
      "name": "${browser}-50",
      "url": "benchmarks/${name}.html?n=50",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${browser}-100",
      "url": "benchmarks/${name}.html?n=100",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${browser}-250",
      "url": "benchmarks/${name}.html?n=250",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${browser}-500",
      "url": "benchmarks/${name}.html?n=500",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${browser}-1000",
      "url": "benchmarks/${name}.html?n=1000",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${browser}-1500",
      "url": "benchmarks/${name}.html?n=1500",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${browser}-2000",
      "url": "benchmarks/${name}.html?n=2000",
      "browser": {
        "name": "${browser}"
      }
    }
  ]
}
`);
}

const depthModules = [
  'waterfall',
  'waterfall-mapped',
  'waterfall-mapped-esms',
  'waterfall-modulepreload',
  'waterfall-mapped-modulepreload',
  'waterfall-mapped-esms-modulepreload'
];

for (const name of depthModules) {
  await writeFile(`benchmarks/${name}.bench.json`, `
{
  "$schema": "https://raw.githubusercontent.com/Polymer/tachometer/master/config.schema.json",
  "sampleSize": 25,
  "benchmarks": [
    {
      "name": "${browser}-1",
      "url": "benchmarks/${name}.html?d=1",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${browser}-2",
      "url": "benchmarks/${name}.html?d=2",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${browser}-4",
      "url": "benchmarks/${name}.html?d=4",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${browser}-8",
      "url": "benchmarks/${name}.html?d=8",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${browser}-16",
      "url": "benchmarks/${name}.html?d=16",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${browser}-32",
      "url": "benchmarks/${name}.html?d=32",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${browser}-64",
      "url": "benchmarks/${name}.html?d=64",
      "browser": {
        "name": "${browser}"
      }
    }
  ]
}
`);
}

