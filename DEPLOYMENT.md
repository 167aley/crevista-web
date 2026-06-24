# CREVISTA — Deployment Guide

Next.js 16 (App Router) front-end. Needs a **Node.js server** runtime (not pure static).

- **Node:** 20.9+
- **Install:** `npm ci`
- **Build:** `npm run build`
- **Start:** `npm start` (serves on port 3000)
- **Env vars:** none required (mock data; Leaflet uses free OpenStreetMap tiles)

---

## A. Vercel (current — recommended)

### Step 1 — Put the code on GitHub
Create a new **empty** repo on GitHub (no README/license), then from the project folder:

```bash
git remote add origin https://github.com/<your-username>/crevista-web.git
git push -u origin main
```

### Step 2 — Import to Vercel
1. Go to **https://vercel.com** → sign in with GitHub
2. **Add New… → Project** → select the `crevista-web` repo → **Import**
3. Vercel auto-detects Next.js — leave everything default:
   - Framework: **Next.js**
   - Build Command: `next build` (auto)
   - Output: auto
   - Install: `npm install` (auto)
4. Click **Deploy** → wait ~1–2 min → live at `https://<project>.vercel.app`

### Step 3 — Custom domain (optional)
Vercel → Project → **Settings → Domains** → add your domain → update DNS at your registrar (Vercel shows the exact A/CNAME records). SSL is automatic & free.

### Updates
Every `git push` to `main` auto-redeploys. That's it.

> Alternative without GitHub — **Vercel CLI:**
> ```bash
> npm i -g vercel
> vercel login
> vercel --prod
> ```

---

## B. Own VPS (later)

On an Ubuntu server with Node 20+ installed:

```bash
git clone https://github.com/<your-username>/crevista-web.git
cd crevista-web
npm ci
npm run build

# keep it running with PM2 (auto-restart on crash/reboot)
npm i -g pm2
pm2 start "npm start" --name crevista
pm2 save && pm2 startup
```

Then put **Nginx** in front (reverse proxy 3000 → 80/443):

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Add free SSL: `sudo certbot --nginx -d yourdomain.com`

---

## Notes
- All listings/forms are **mock/UI only** right now — no backend. A database/API is a later phase.
- `/search` and `/search/map` are server-rendered (dynamic); the rest are static/SSG.
