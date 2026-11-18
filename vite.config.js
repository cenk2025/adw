import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import en from './src/i18n/en.js'
import sv from './src/i18n/sv.js'

const SITE = 'https://ads.voon.fi'
const OG_LOCALE = { en: 'en_GB', sv: 'sv_SE' }

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// The site is one SPA, but /en and /sv need their own HTML so search engines see the right language,
// title, description and canonical without running JavaScript. Writes dist/en/index.html and
// dist/sv/index.html from the built Finnish page.
function localizedHtml() {
  return {
    name: 'localized-html',
    apply: 'build',
    closeBundle() {
      const dist = path.resolve('dist')
      const base = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
      for (const [locale, dict] of Object.entries({ en, sv })) {
        const url = `${SITE}/${locale}`
        const title = escapeAttr(dict.meta.title)
        const description = escapeAttr(dict.meta.description)
        const html = base
          .replace('<html lang="fi">', `<html lang="${locale}">`)
          .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
          .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${description}$2`)
          .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
          .replace(/(<meta property="og:locale" content=")[^"]*(")/, `$1${OG_LOCALE[locale]}$2`)
          .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
          .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${description}$2`)
          .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
        for (const marker of [`lang="${locale}"`, `href="${url}"`, `<title>${title}</title>`]) {
          if (!html.includes(marker)) throw new Error(`localized-html: ${locale} is missing ${marker}`)
        }
        fs.mkdirSync(path.join(dist, locale), { recursive: true })
        fs.writeFileSync(path.join(dist, locale, 'index.html'), html)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // The Turnstile site key is public; it is inlined into the client bundle. The secret key is only
  // read by api/send-email.js at runtime.
  const env = loadEnv(mode, path.resolve(), '')
  return {
    plugins: [react(), localizedHtml()],
    define: {
      'import.meta.env.TURNSTILE_SITE_KEY': JSON.stringify(env.TURNSTILE_SITE_KEY || ''),
    },
  }
})
