# English with Taha — Hostinger deployment

## Deployment decision

- **Framework:** Next.js 16.3.4 App Router with React 19.2.8 and TypeScript
- **Build tool:** `next build` (Next.js/Turbopack)
- **Static deployment possible:** Yes
- **Hostinger PHP/HTML compatible:** Yes
- **Recommended method:** Next.js static export uploaded as ordinary files to a Hostinger **PHP/HTML Website**
- **Production output:** `out/`
- **Ready-to-upload archive:** `hostinger-deploy.zip`

The project has one static route (`/`). It has no Server Actions, API routes, middleware, request-time rendering, database, server-only runtime dependency, or client-side routes. The existing `output: "export"` setting creates a complete static site. Hostinger does not need Node.js to serve it.

## Build and package used

From the project root:

```powershell
npm ci
npm run build
```

`npm run build` creates `out/`, including `out/index.html`. The supplied `hostinger-deploy.zip` was created from the deployable contents, not from the project source.

The ZIP root is intentionally structured like this:

```text
index.html
404.html
favicon.ico
images/
_next/
_not-found/
...Next.js static data files
```

There is no enclosing `out/` or `dist/` folder in the archive. After extraction, `index.html` must be directly inside `public_html`.

## First deployment to Hostinger

1. Sign in to Hostinger hPanel.
2. Open **Hostinger → Websites → Create/Add Website**.
3. Choose **PHP/HTML Website** (sometimes shown as **Custom PHP/HTML**) and assign the intended domain or temporary domain.
4. Open the new website's **Dashboard → File Manager**, then enter `public_html`.
5. Back up any existing live files before replacing them. Do not upload the project folder, `node_modules`, `.next`, `src`, or `out` itself.
6. Upload `hostinger-deploy.zip` into `public_html`.
7. Select or right-click the ZIP and choose **Extract**. Extract it directly into `public_html`.
8. If Hostinger extracts into an extra folder, move that folder's contents up one level. The required final path is `public_html/index.html`, not `public_html/out/index.html` and not `public_html/hostinger-deploy/index.html`.
9. Remove the uploaded ZIP from the server after confirming the extraction, if you do not want to keep it as a server-side backup.
10. Open the temporary URL or domain in a private/incognito window and test the page at desktop and mobile widths.

Hostinger's current File Manager instructions are documented at <https://www.hostinger.com/support/1869114-how-to-upload-backups-with-file-manager-in-hostinger/>.

## Connect the domain

1. In **Websites**, open the site's dashboard and use the domain connection/check guide shown by Hostinger.
2. If the domain is registered with Hostinger and already uses the hosting plan's nameservers, no additional DNS change may be needed.
3. If the domain is registered elsewhere, either change its nameservers to the exact Hostinger nameservers displayed in **Websites → Dashboard → Plan Details**, or use the A-record method shown by Hostinger.
4. Do not copy nameserver values from a generic tutorial: use the exact values shown for this hosting plan.
5. Allow DNS propagation time. Hostinger advises that it can take up to 24 hours.

Official references: <https://support.hostinger.com/en/articles/1863967-how-to-point-a-domain-to-hostinger> and <https://support.hostinger.com/en/articles/1583247-where-to-find-hostinger-nameservers>.

## Enable and verify SSL

1. Point the domain to Hostinger first.
2. Open **Websites → Dashboard → Security → SSL**.
3. Confirm the certificate status is **Active**. Hostinger normally installs its Lifetime SSL automatically for hosted domains.
4. If no certificate is present, select **Install SSL** and wait for it to become Active.
5. Confirm HTTPS is forced. Hostinger normally enables this automatically after SSL installation; otherwise use **Force HTTPS** on the SSL page.
6. Visit `https://your-domain.example` in a private/incognito window and confirm the browser shows a secure connection.

Official references: <https://support.hostinger.com/en/articles/1583258-how-to-install-lifetime-ssl-at-hostinger> and <https://www.hostinger.com/support/1583201-how-to-enable-or-disable-https-for-your-website-at-hostinger/>.

## Environment variables

No environment variables are currently used. There is no `.env` or `.env.local` requirement, and the static site has no runtime secrets.

The existing WhatsApp recipient number is configured directly in the client component as `212600211281`. That value was preserved and is necessarily public in a frontend-generated WhatsApp URL. The message is encoded with `encodeURIComponent` before the browser opens WhatsApp.

If a future change introduces `NEXT_PUBLIC_*` variables, set them locally before `npm run build`; their values will be compiled into the static frontend and must never contain secrets. Server-only secrets cannot be used on this PHP/HTML static deployment.

## Update the website later

1. Make and review the source changes locally.
2. Run `npm ci` after dependency or lockfile changes.
3. Run `npm run lint`.
4. Run `npx tsc --noEmit`.
5. Run `npm run build` and confirm `out/index.html` exists.
6. Test the files from `out/` through a static HTTP server, not with `npm run dev` alone.
7. Create a new ZIP whose root contains the contents of `out/` directly.
8. In Hostinger File Manager, back up the current `public_html`, then replace its deployed site files with the new archive contents.
9. Clear any Hostinger/CDN cache and retest the live HTTPS URL.

## Routing

The current site has only `/` and uses no client-side page routes. An Apache SPA fallback would be unnecessary and could hide real 404 errors, so no `.htaccess` rewrite file is included. In-page interactions and modals are JavaScript state, not URL routes.

## SEO and production URL

The export includes the existing title, meta description, and favicon. No final production domain is configured in the repository, so no canonical URL or domain-specific Open Graph URL was invented. The project currently has no `robots.txt` or sitemap. Add domain-specific metadata only after the real public domain is known.

## Troubleshooting

- **Hostinger shows a directory listing or blank page:** verify `public_html/index.html` exists directly at the root.
- **Styles, JavaScript, fonts, or images are missing:** verify the complete `_next/` and `images/` directories were extracted and retain their names exactly. Linux hosting paths are case-sensitive.
- **The site is under `public_html/out/`:** move the contents of `out` into `public_html`; do not leave the wrapper directory.
- **A direct unknown URL returns 404:** expected. The project has no additional page routes and does not need an SPA fallback.
- **WhatsApp does not open:** confirm pop-ups/external-app links are allowed, then verify the deployed JavaScript was not omitted. The generated URL uses `https://api.whatsapp.com/send`, the preserved phone number, and a URL-encoded message.
- **The domain does not resolve:** verify the domain points to this Hostinger website and wait for DNS propagation.
- **HTTPS is not active:** confirm DNS points to Hostinger, then check **Websites → Dashboard → Security → SSL**.
- **A new build fails:** use the locked dependencies with `npm ci`, then resolve build/type/lint errors before uploading anything.

