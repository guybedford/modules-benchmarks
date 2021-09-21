import { writeFileSync } from 'fs';

const browser = 'safari';

const names = [
  'bundle',
  'bundle-cached',
  'separate',
  'separate-cached',
  'separate-esms',
  'separate-esms-cached',
  'separate-esms-csp',
  'separate-esms-csp-cached'
];

const template = name => `
{
  "$schema": "https://raw.githubusercontent.com/Polymer/tachometer/master/config.schema.json",
  "sampleSize": 5,
  "benchmarks": [
    {
      "name": "${browser}-50",
      "url": "${name}.html?n=50",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${browser}-100",
      "url": "${name}.html?n=100",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${browser}-250",
      "url": "${name}.html?n=250",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${browser}-500",
      "url": "${name}.html?n=500",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${browser}-1000",
      "url": "${name}.html?n=1000",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${browser}-1500",
      "url": "${name}.html?n=1500",
      "browser": {
        "name": "${browser}"
      }
    },
    {
      "name": "${browser}-2000",
      "url": "${name}.html?n=2000",
      "browser": {
        "name": "${browser}"
      }
    }
  ]
}
`;

for (const name of names) {
  writeFileSync(`./${name}.json`, template(name));
}
