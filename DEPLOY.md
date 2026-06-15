# Deploy & Ops — rangeway-redesign (redesign.rangeway.co)

The redesign of the Rangeway marketing site. **Self-hosted on a Hostinger VPS**
(not GitHub Pages), served by Nginx at **https://redesign.rangeway.co** from
`/var/www/rangeway-redesign/` on the VPS `72.60.71.39`.

## How to deploy
**Push to `main`.** GitHub Actions (`.github/workflows/deploy.yml`) builds the Astro site and
force-pushes `dist/` to the repo's **`deploy-dist` branch**. The VPS polls that branch every
~2 min (`rangeway-deploy.timer`) and rsyncs it into the web root — CI never connects to the VPS
(Hostinger's edge intermittently drops inbound connections from GitHub runner IPs, so deploys
are pull-based). Live within ~2–4 min of a push.
- Only `main` deploys; other branches don't.
- Watch the build: repo → **Actions** tab, or `gh run watch`.
- Watch the pull on the server: `ssh rangeway-vps journalctl -t rangeway-deploy -f`.
- If a deploy fails, the live site keeps serving its last good version — no outage.

## Local development
Astro (static). Node 22.
```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to dist/
npm run preview    # serve the built dist/ locally
```

## TLS / DNS
- HTTPS via **Let's Encrypt** (certbot on the VPS) — auto-renews, nothing to manage.
- DNS at **Cloudflare, DNS-only (grey cloud)**: A record `redesign.rangeway.co` → `72.60.71.39`.

## Infra notes
- Server path: `/var/www/rangeway-redesign/`, Nginx server block for `redesign.rangeway.co`.
- Pull-deploy registration: line `rangeway-redesign /var/www/rangeway-redesign` in
  `/etc/rangeway-deploy.conf` on the VPS.
- The `public/CNAME` file is no longer load-bearing (routing is by DNS, not GitHub Pages);
  harmless if present.
- This is the redesign of the production site at **rangeway.co** (repo: `rangeway-pages`).
