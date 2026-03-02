# Deployment (GitHub Pages + Cloudflare)

## Current publish mode
- Repository: `siminyou-agent/cards`
- GitHub Pages source: `main` branch, `/` path
- Custom domain: `cards.simin.you`

## GitHub Pages setup
1. Repo → **Settings** → **Pages**
2. Source: `Deploy from a branch`
3. Branch: `main`, Folder: `/`
4. Custom domain: `cards.simin.you`
5. Save

> Note: via API, Pages source path supports only `/` or `/docs` (not `/public`).

## Cloudflare DNS
Create this record in `simin.you` zone:
- Type: `CNAME`
- Name: `cards`
- Target: `siminyou-agent.github.io`
- Proxy: `DNS only` (recommended while certificate is provisioning)

## HTTPS troubleshooting
If `https://cards.simin.you` is not working yet:
1. Confirm CNAME resolves to `siminyou-agent.github.io`
2. Keep Cloudflare proxy OFF (DNS only)
3. In GitHub Pages, re-save custom domain
4. Wait for cert issuance (usually minutes, sometimes longer)
5. Enable "Enforce HTTPS" when available

Common API error during enable:
- `The certificate does not exist yet` → wait and retry.

## Quick checks
```bash
# DNS
 dig +short cards.simin.you CNAME

# HTTP (should work early)
 curl -I http://cards.simin.you

# HTTPS (works after cert ready)
 curl -I https://cards.simin.you
```
