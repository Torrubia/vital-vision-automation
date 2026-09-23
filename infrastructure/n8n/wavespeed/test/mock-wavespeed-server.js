#!/usr/bin/env node
// OFFLINE MOCK of the three WaveSpeed endpoints used by the ledger-guarded
// workflow. For non-paid structural testing only — never contacts WaveSpeed.
//
//   node mock-wavespeed-server.js [port]
//
// Control (all local):
//   POST /__scenario  {"price":0.2,"post":"ok|http500|http401|noid","polls":["processing","completed"]}
//   GET  /__stats     → {"price_calls":n,"paid_post_calls":n,"status_get_calls":n,"max_active_predictions":n}
// A prediction is "active" from its accepted POST until its completed/failed GET.
'use strict';

const http = require('http');

const port = Number(process.argv[2] || 18765);
let scenario = { price: 0.2, post: 'ok', polls: ['processing', 'processing', 'completed'] };
const freshStats = () => ({ price_calls: 0, paid_post_calls: 0, status_get_calls: 0, max_active_predictions: 0, paid_post_bodies: [] });
let stats = freshStats();
let pollIndex = {};
const active = new Set();

function send(res, code, obj) {
  res.writeHead(code, { 'content-type': 'application/json' });
  res.end(JSON.stringify(obj));
}

http.createServer((req, res) => {
  let raw = '';
  req.on('data', (c) => { raw += c; });
  req.on('end', () => {
    const url = req.url.split('?')[0];
    if (req.method === 'POST' && url === '/__scenario') {
      scenario = { ...scenario, ...JSON.parse(raw || '{}') };
      stats = freshStats();
      pollIndex = {};
      active.clear();
      return send(res, 200, { ok: true, scenario });
    }
    if (req.method === 'GET' && url === '/__stats') return send(res, 200, stats);

    if (req.method === 'POST' && url === '/api/v3/model/pricing') {
      stats.price_calls++;
      return send(res, 200, { code: 200, message: 'success', data: { model_id: 'wavespeed-ai/minimax-h3/text-to-video', unit_price: scenario.price, discounted_price: scenario.price, currency: 'USD' } });
    }
    if (req.method === 'POST' && url === '/api/v3/wavespeed-ai/minimax-h3/text-to-video') {
      stats.paid_post_calls++;
      stats.paid_post_bodies.push(raw);
      if (scenario.post === 'http500') return send(res, 500, { code: 500, message: 'internal error' });
      if (scenario.post === 'http401') return send(res, 401, { code: 401, message: 'unauthorized' });
      if (scenario.post === 'noid') return send(res, 200, { code: 200, data: {} });
      const id = `mock-pred-${stats.paid_post_calls}`;
      active.add(id);
      stats.max_active_predictions = Math.max(stats.max_active_predictions, active.size);
      return send(res, 200, { code: 200, message: 'success', data: { id, status: 'created', urls: { get: 'mock' } } });
    }
    const m = url.match(/^\/api\/v3\/predictions\/([^/]+)\/result$/);
    if (req.method === 'GET' && m) {
      stats.status_get_calls++;
      const i = pollIndex[m[1]] || 0;
      pollIndex[m[1]] = i + 1;
      const s = scenario.polls[Math.min(i, scenario.polls.length - 1)];
      if (s === 'completed' || s === 'failed') active.delete(m[1]);
      if (s === 'http503') return send(res, 503, { message: 'unavailable' });
      const outputs = s === 'completed' ? [`https://mock.invalid/outputs/${m[1]}.mp4`] : [];
      return send(res, 200, { code: 200, data: { id: m[1], status: s, outputs } });
    }
    return send(res, 404, { message: `mock: no route ${req.method} ${url}` });
  });
}).listen(port, '127.0.0.1', () => console.log(`mock wavespeed listening on 127.0.0.1:${port}`));
