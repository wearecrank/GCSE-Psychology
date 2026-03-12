# Deploy to Railway (from GitHub)

## 1. Push this repo to GitHub

If the repo isn’t yours, fork it or use the repo you have access to. Push the latest code (including `server.js`, `package.json`, and the updated `index.html`).

```bash
git add .
git commit -m "Add Railway server and server-side API key"
git push origin main
```

(Use your branch name if it’s not `main`.)

## 2. Create a Railway project and deploy from GitHub

1. Go to [railway.app](https://railway.app) and sign in (GitHub is fine).
2. **New Project** → **Deploy from GitHub repo**.
3. Select the GitHub account/org that owns the repo, then choose the `GCSE-Psychology` repo (or the fork).
4. Railway will detect Node.js and run `npm install` and `npm start` using `package.json` and `server.js`.

## 3. Add the API key on Railway

1. In the Railway project, open your service.
2. Go to the **Variables** tab.
3. Click **Add Variable** (or **New Variable**).
4. Name: `ANTHROPIC_API_KEY`  
   Value: your Anthropic API key (starts with `sk-ant-`).
5. Save. Railway will redeploy with the new variable.

## 4. Get the public URL

- In the same service, open the **Settings** tab (or **Deployments**).
- Under **Networking** / **Public networking**, click **Generate domain** (or use the default one).
- Open that URL in the browser. The app will be served by the Node server and AI feedback will use the key from Railway.

## Summary

- **Repo**: Any GitHub repo you have access to (yours or a fork).
- **Build**: Railway runs `npm install` and `npm start`.
- **API key**: Set `ANTHROPIC_API_KEY` in the service **Variables**; the server uses it for the `/api/anthropic` proxy. Users never enter or see the key.
