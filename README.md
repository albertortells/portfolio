# Albert Ortells — Portfolio

Personal portfolio site. Vanilla HTML/CSS/JS, no framework, no build step — clone it and open `index.html`, or point any static host at the repo.

**Live features:**
- **Multi-language** — English, Spanish and Catalan, switchable at runtime. Language is detected from `?lang=`, then `localStorage`, then the browser's language, falling back to English.
- **Dark mode** — follows the OS `prefers-color-scheme` by default; the toggle in the top bar overrides it and remembers the choice. A tiny inline script in `<head>` applies the stored theme before first paint to avoid a flash of the wrong theme.

## File structure

| File | Purpose |
|---|---|
| `index.html` | Markup only. Every translatable string carries a `data-i18n="key"` attribute; the hero lede also carries `data-i18n-html` since it contains inline markup. |
| `style.css` | All styling. Theming runs on CSS custom properties defined in `:root` (light) and overridden in `:root[data-theme="dark"]` (dark). Colors that need an alpha channel also expose an `-rgb` variant (e.g. `--paper-rgb`) so `rgba(var(--paper-rgb), 0.92)` stays theme-aware without duplicating rules. |
| `script.js` | i18n engine (language detection, applying translations, updating the URL) and theme engine (detection, toggle, syncing with OS changes), plus the scroll-reveal `IntersectionObserver` and the experience entries' "show more" toggles. |
| `translations.js` | The `TRANSLATIONS` dictionary — one object per language (`en`, `es`, `ca`), each key matching a `data-i18n` path in `index.html`. |
| `favicon.svg` | Site icon. |
| `fonts/` | Self-hosted `.woff2` files (IBM Plex Mono, IBM Plex Sans, Roboto Slab — Latin subset). Loaded entirely from this domain, no request ever reaches Google's servers. |

## Running locally

No dependencies, no build. Any static file server works:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000`.

## Editing content

- **Text**: edit the matching key in all three language blocks of `translations.js`. Run this to confirm every `data-i18n` key in `index.html` has a translation in all three languages:

  ```bash
  node -e "
  const fs = require('fs');
  const html = fs.readFileSync('index.html', 'utf8');
  const keys = [...new Set([...html.matchAll(/data-i18n=\"([^\"]+)\"/g)].map(m => m[1]))];
  const T = new Function(fs.readFileSync('translations.js', 'utf8') + '\nreturn TRANSLATIONS;')();
  const get = (o, p) => p.split('.').reduce((a, k) => (a && a[k] !== undefined ? a[k] : undefined), o);
  const missing = ['en','es','ca'].flatMap(l => keys.filter(k => get(T[l], k) === undefined).map(k => l + ': ' + k));
  console.log(missing.length ? missing.join('\n') : 'All keys present in all 3 languages.');
  "
  ```

- **New translatable text**: add `data-i18n="section.key"` to the element, then add `section.key` under each of the three language objects in `translations.js`.
- **Colors / theme**: adjust the CSS custom properties in `style.css` — everything downstream references them, nothing is hardcoded.

## Deployment

Static files only — push to `main` and point your host at the repo (or `git pull` on the server, as configured here). No build step runs, so whatever is committed is exactly what serves.
