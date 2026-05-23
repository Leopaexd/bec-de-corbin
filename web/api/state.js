// Shared character/campaign state, persisted as Blob objects at state/<key>.json.
// GET  /api/state?c=<key>            -> the saved JSON object, or {} if none.
// POST /api/state?c=<key>  body { password, data } -> writes it (password-gated).
const { put, list } = require('@vercel/blob');

function readBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object') return resolve(req.body);
    let raw = '';
    req.on('data', (c) => { raw += c; if (raw.length > 5_000_000) req.destroy(); });
    req.on('end', () => {
      if (!raw) return resolve({});
      try { resolve(JSON.parse(raw)); } catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

function sanitizeKey(k) {
  return String(k || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64);
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const url = new URL(req.url, 'http://localhost');
  const key = sanitizeKey(url.searchParams.get('c'));
  if (!key) { res.statusCode = 400; return res.end(JSON.stringify({ error: 'missing c' })); }

  const pathname = `state/${key}.json`;

  if (req.method === 'GET') {
    try {
      // Find the blob (its public URL contains a random suffix, so we list by prefix).
      const { blobs } = await list({ prefix: pathname });
      const match = blobs.find((b) => b.pathname === pathname) || blobs[0];
      if (!match) { res.statusCode = 200; return res.end('{}'); }
      const r = await fetch(match.url, { cache: 'no-store' });
      if (!r.ok) { res.statusCode = 200; return res.end('{}'); }
      const text = await r.text();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(text || '{}');
    } catch (e) {
      res.statusCode = 200; // never break the sheet on a read failure
      res.setHeader('Content-Type', 'application/json');
      return res.end('{}');
    }
  }

  if (req.method === 'POST') {
    let body;
    try { body = await readBody(req); } catch (e) {
      res.statusCode = 400; return res.end(JSON.stringify({ error: 'bad json' }));
    }
    const secret = process.env.CAMPAIGN_SECRET;
    if (!secret || body.password !== secret) {
      res.statusCode = 401; return res.end(JSON.stringify({ error: 'unauthorized' }));
    }
    try {
      await put(pathname, JSON.stringify(body.data || {}), {
        access: 'public',
        contentType: 'application/json',
        allowOverwrite: true,
      });
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ ok: true }));
    } catch (e) {
      res.statusCode = 500;
      return res.end(JSON.stringify({ error: 'write failed', detail: String(e && e.message || e) }));
    }
  }

  res.statusCode = 405;
  return res.end(JSON.stringify({ error: 'method not allowed' }));
};
