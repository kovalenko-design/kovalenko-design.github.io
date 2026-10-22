import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { pageTitle } from './src/pageTitle.js'
import { checkCv, CV_PDF } from './scripts/cv-check.mjs'

const SITE = 'https://kovalenko.info'
const SITE_NAME = 'Vadim Kovalenko'
// The link-preview image every address shares (public/og-image.png, 1200×627).
const SHARE_IMAGE = { url: `${SITE}/og-image.png?v=2`, width: 1200, height: 627 }
const SITE_TITLE = pageTitle('Product Designer')
const SITE_DESCRIPTION =
  'Product designer in Warsaw with 7+ years building B2B, B2C and SaaS products in fintech, communication, retail and other domains. Case studies: Panther POS, BOSS Money, BOSS Revolution, zendit.'

// Who the site is about, as schema.org data for search engines (not shown on the page).
const PERSON = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  jobTitle: 'Product Designer',
  url: SITE,
  email: 'mailto:vadim.kavalenka@gmail.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Warsaw', addressCountry: 'PL' },
  sameAs: ['https://www.linkedin.com/in/vadim-kovalenko-design/'],
  subjectOf: { '@type': 'DigitalDocument', name: 'CV', url: `${SITE}/cv.md` },
}

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Reads a one-line string field (single or double quoted, on the same or the next line) from a case file.
function readField(source, name) {
  const match = source.match(
    new RegExp(`^\\s*${name}:\\s*(?:'((?:[^'\\\\]|\\\\.)*)'|"([^"]*)")`, 'm')
  )
  return (match?.[1] ?? match?.[2] ?? '').replace(/\\'/g, "'")
}

// Gives one address its own title, description, link-preview tags and a plain-text summary,
// so crawlers, link previews and readers without JavaScript see real content before the app loads.
function withPageInfo(html, { path, title, description, heading }) {
  const url = `${SITE}${path}`
  const head = [
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SHARE_IMAGE.url}" />`,
    `<meta property="og:image:width" content="${SHARE_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${SHARE_IMAGE.height}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<link rel="alternate" type="text/markdown" href="/cv.md" title="CV of ${SITE_NAME} (Markdown)" />`,
    `<script type="application/ld+json">${JSON.stringify(PERSON).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
  const summary = `<noscript><h1>${escapeHtml(heading)}</h1><p>${escapeHtml(description)}</p></noscript>`
  return html
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace('</head>', `  ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root"></div>\n    ${summary}`)
}

// GitHub Pages has no server that can send /panther or /about to the app, so a direct visit would be a 404.
// After the build, this copies the app's index.html into a folder for each address (dist/panther/index.html and so on).
// The case addresses come from the id of each file in src/cases, so a new case gets its own address automatically.
// Each copy carries that page's own title and description (see withPageInfo).
// It also saves a copy as 404.html, so a mistyped address opens the app, which sends the visitor to the home page.
// For search engines and AI agents it writes sitemap.xml and llms.txt (an index pointing to public/cv.md).
// The build stops if cv.md was not updated after a new CV PDF (see scripts/cv-check.mjs).
function addressPages() {
  return {
    name: 'address-pages',
    apply: 'build',
    buildStart() {
      const cv = checkCv()
      if (!cv.ok) this.error(cv.message)
    },
    closeBundle() {
      const casesDir = 'src/cases'
      const cases = readdirSync(casesDir)
        .filter((file) => file.endsWith('.js') && file !== 'index.js')
        .map((file) => readFileSync(join(casesDir, file), 'utf8'))
        .map((source) => ({
          id: readField(source, 'id'),
          title: readField(source, 'title'),
          subtitle: readField(source, 'subtitle'),
          description: readField(source, 'description'),
        }))
        .filter((c) => c.id)

      const shell = readFileSync(join('dist', 'index.html'), 'utf8')
      const home = withPageInfo(shell, {
        path: '/',
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        heading: SITE_TITLE,
      })
      writeFileSync(join('dist', 'index.html'), home)
      writeFileSync(join('dist', '404.html'), home)

      const pages = [
        {
          address: 'about',
          info: {
            path: '/about',
            title: pageTitle('About'),
            description: SITE_DESCRIPTION,
            heading: 'About Vadim Kovalenko',
          },
        },
        ...cases.map((c) => ({
          address: c.id,
          info: {
            path: `/${c.id}`,
            title: pageTitle(c.title),
            description: `${c.subtitle}. ${c.description}`,
            heading: `${c.title}: ${c.subtitle}`,
          },
        })),
      ]
      for (const { address, info } of pages) {
        mkdirSync(join('dist', address), { recursive: true })
        writeFileSync(join('dist', address, 'index.html'), withPageInfo(shell, info))
      }

      const urls = ['/', ...pages.map((p) => p.info.path)]
      writeFileSync(
        join('dist', 'sitemap.xml'),
        [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urls.map((path) => `  <url><loc>${SITE}${path}</loc></url>`),
          '</urlset>',
          '',
        ].join('\n')
      )

      writeFileSync(
        join('dist', 'llms.txt'),
        [
          `# ${SITE_NAME}`,
          '',
          `> ${SITE_DESCRIPTION}`,
          '',
          '## CV',
          '',
          `- [CV in Markdown](${SITE}/cv.md): the full CV as plain text`,
          `- [CV as PDF](${SITE}/${CV_PDF})`,
          '',
          '## Pages',
          '',
          `- [Home](${SITE}/): selected case studies`,
          `- [About](${SITE}/about): bio, skills and experience`,
          ...cases.map((c) => `- [${c.title}](${SITE}/${c.id}): ${c.subtitle}`),
          '',
        ].join('\n')
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), addressPages()],
  base: '/',
})
