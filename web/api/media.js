// Shared image / map uploads, stored as Blob objects under media/<scope>/.
// GET  /api/media?scope=<scope>                              -> [{url,pathname,uploadedAt}] newest first
// POST /api/media?scope=<scope> body { password, filename, dataUrl } -> uploads (password-gated) -> {url}
const { put, list } = require('@vercel/blob');

function readBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object') return resolve(req.body);
    let raw = '';
    req.on('data', (c) => { raw += c; if (raw.length > 12_000_000) req.destroy(); });
    req.on('end', () => {
      if (!raw) return resolve({});
      try { resolve(JSON.parse(raw)); } catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

function sanitizeScope(s) {
  return String(s || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64);
}

function safeFilename(name) {
  return String(name || 'fil')
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .slice(0, 80) || 'fil';
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const url = new URL(req.url, 'http://localhost');
  const scope = sanitizeScope(url.searchParams.get('scope'));
  if (!scope) { res.statusCode = 400; return res.end(JSON.stringify({ error: 'missing scope' })); }

  const prefix = `media/${scope}/`;

  if (req.method === 'GET') {
    try {
      const { blobs } = await list({ prefix });
      const items = blobs
        .map((b) => ({ url: b.url, pathname: b.pathname, uploadedAt: b.uploadedAt }))
        .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify(items));
    } catch (e) {
      res.statusCode = 200; // never break the gallery on a read failure
      res.setHeader('Content-Type', 'application/json');
      return res.end('[]');
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
    const m = /^data:([^;,]+)?(;base64)?,(.*)$/s.exec(body.dataUrl || '');
    if (!m || !m[2]) {
      res.statusCode = 400; return res.end(JSON.stringify({ error: 'expected base64 data URL' }));
    }
    const contentType = m[1] || 'application/octet-stream';
    let buffer;
    try { buffer = Buffer.from(m[3], 'base64'); } catch (e) {
      res.statusCode = 400; return res.end(JSON.stringify({ error: 'bad base64' }));
    }
    const pathname = `${prefix}${Date.now()}-${safeFilename(body.filename)}`;
    try {
      const blob = await put(pathname, buffer, { access: 'public', contentType });
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ url: blob.url }));
    } catch (e) {
      res.statusCode = 500;
      return res.end(JSON.stringify({ error: 'upload failed', detail: String(e && e.message || e) }));
    }
  }

  res.statusCode = 405;
  return res.end(JSON.stringify({ error: 'method not allowed' }));
};
