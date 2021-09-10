import { createServer } from 'https';
import { readFileSync } from 'fs';
import { lookup } from 'mime-types';

const staticFileCache = Object.create(null);

const cacheControl = process.env.CACHE ? 'public, max-age=3600' : 'no-cache';

const POOL_MAX = 16;
let streamCnt = 0;
const poolQueue = [];

function streamEnd () {
  streamCnt--;
  if (streamCnt === 0) {
    while (streamCnt < POOL_MAX && poolQueue.length) {
      const { res, source } = poolQueue.shift();
      res.end(source);
      streamCnt++;
    }
  }
}

const server = createServer({
  key: readFileSync('key.pem'),
  cert: readFileSync('cert.pem')
}, function (req, res) {
  if (req.method !== 'GET')
    throw new Error('Expected GET');

  let path = req.url.slice(1);
  const queryStringIndex = path.indexOf('?');
  if (queryStringIndex !== -1)
    path = path.slice(0, queryStringIndex);

  let entry = staticFileCache[path];
  if (!entry) {
    try {
      var source = readFileSync(path);
    }
    catch (e) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    entry = staticFileCache[path] = {
      contentType: lookup(path),
      source
    };
  }

  res.writeHead(200, { 'content-type': entry.contentType, 'cache-control': cacheControl, 'Access-Control-Allow-Origin': '*' });

  res.on('close', streamEnd);
  if (streamCnt !== POOL_MAX) {
    streamCnt++;
    res.end(entry.source);
  }
  else {
    poolQueue.push({ res, source: entry.source });
  }
});

server.on('error', err => console.error(err));

server.listen(process.env.CACHE ? 8081 : 8080);
