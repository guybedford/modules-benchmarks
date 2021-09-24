import { writeFile, mkdir } from 'fs/promises';
import rimraf from 'rimraf';

try { await mkdir('results') }
catch {}

try { rimraf.sync('benchmarks') }
catch {}

try { await mkdir('benchmarks') }
catch {}

const ports = {
  'fastest': 8000,
  'fastest-cached': 8001,
  'slow': 8002,
  'slow-cached': 8003,
  'fastest-brotli': 8004,
  'fastest-cached-brotli': 8005,
  'slow-brotli': 8006,
  'slow-cached-brotli': 8007,
};

for (const browser of ['safari', 'firefox', 'chrome']) {
  for (const type of Object.keys(ports)) {
    for (const min of [true, false]) {
      for (const name of [
        'bundle',
        'parallel',
        'parallel-mapped',
        'parallel-mapped-esms',
        'parallel-mapped-esms-debug',
      ]) {
        const fullName = `${browser}.${type}${min ? '.min' : ''}.${name}`;
        await writeFile(`benchmarks/${fullName}.bench.json`, nTemplate(browser, type, min, name, fullName));
      }

      for (const name of [
        'waterfall',
        'waterfall-mapped',
        'waterfall-mapped-esms',
        'waterfall-modulepreload',
        'waterfall-mapped-modulepreload',
        'waterfall-mapped-esms-modulepreload'
      ]) {
        const fullName = `${browser}.${type}${min ? '.min' : ''}.${name}`;
        await writeFile(`benchmarks/${fullName}.bench.json`, dTemplate(browser, type, min, name, fullName));
      }
    }
  }
}

function nTemplate (browser, type, min, name, fullName) {
  const port = ports[type];
  min = min ? '1' : '0';
  return `\
{
  "$schema": "https://raw.githubusercontent.com/Polymer/tachometer/master/config.schema.json",
  "sampleSize": 5,
  "timeout": 1,
  "benchmarks": [
    {
      "name": "${fullName}-50",
      "url": "cases/${name}.html?n=50&port=${port}&min=${min}",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${fullName}-100",
      "url": "cases/${name}.html?n=100&port=${port}&min=${min}",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${fullName}-250",
      "url": "cases/${name}.html?n=250&port=${port}&min=${min}",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${fullName}-500",
      "url": "cases/${name}.html?n=500&port=${port}&min=${min}",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${fullName}-1000",
      "url": "cases/${name}.html?n=1000&port=${port}&min=${min}",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${fullName}-1500",
      "url": "cases/${name}.html?n=1500&port=${port}&min=${min}",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${fullName}-2000",
      "url": "cases/${name}.html?n=2000&port=${port}&min=${min}",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${fullName}-5000",
      "url": "cases/${name}.html?n=5000&port=${port}&min=${min}",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${fullName}-10000",
      "url": "cases/${name}.html?n=10000&port=${port}&min=${min}",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${fullName}-20000",
      "url": "cases/${name}.html?n=20000&port=${port}&min=${min}",
      "browser": {
        "name": "${browser}"
      }
    }
  ]
}
`;
}

function dTemplate (browser, type, min, name, fullName) {
  const port = ports[type];
  min = min ? '1' : '0';
  return `\
{
  "$schema": "https://raw.githubusercontent.com/Polymer/tachometer/master/config.schema.json",
  "sampleSize": 10,
  "timeout": 1,
  "benchmarks": [
    {
      "name": "${fullName}-1",
      "url": "cases/${name}.html?d=1&port=${port}&min=${min}",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${fullName}-2",
      "url": "cases/${name}.html?d=2&port=${port}&min=${min}",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${fullName}-4",
      "url": "cases/${name}.html?d=4&port=${port}&min=${min}",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${fullName}-8",
      "url": "cases/${name}.html?d=8&port=${port}&min=${min}",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${fullName}-16",
      "url": "cases/${name}.html?d=16&port=${port}&min=${min}",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${fullName}-32",
      "url": "cases/${name}.html?d=32&port=${port}&min=${min}",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${fullName}-64",
      "url": "cases/${name}.html?d=64&port=${port}&min=${min}",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${fullName}-128",
      "url": "cases/${name}.html?d=128&port=${port}&min=${min}",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${fullName}-256",
      "url": "cases/${name}.html?d=256&port=${port}&min=${min}",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${fullName}-512",
      "url": "cases/${name}.html?d=512&port=${port}&min=${min}",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${fullName}-1024",
      "url": "cases/${name}.html?d=512&port=${port}&min=${min}",
      "browser": {
        "name": "${browser}"
      }
    }
  ]
}
`;
}
