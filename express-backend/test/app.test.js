const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const app = require('../src/app');

test('GET /api/health returns healthy status', async () => {
  const server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));

  const { port } = server.address();
  const response = await new Promise((resolve, reject) => {
    http.get({ hostname: '127.0.0.1', port, path: '/api/health' }, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    }).on('error', reject);
  });

  assert.equal(response.statusCode, 200);
  assert.match(response.body, /"status":"ok"/);

  await new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
});
