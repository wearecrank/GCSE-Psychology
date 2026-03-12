const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Proxy to Anthropic so the API key stays on the server (Railway env)
app.post('/api/anthropic', async (req, res) => {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    res.status(503).json({ error: 'ANTHROPIC_API_KEY not set on server' });
    return;
  }
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(req.body),
    });
    const data = await r.json();
    if (!r.ok) {
      res.status(r.status).json(data);
      return;
    }
    res.json(data);
  } catch (e) {
    res.status(502).json({ error: e.message || 'Upstream request failed' });
  }
});

// Serve static files and SPA fallback
app.use(express.static(__dirname));
app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(PORT, () => console.log('Listening on', PORT));
