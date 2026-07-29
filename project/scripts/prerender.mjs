import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'


const root = process.cwd()
const distDirectory = resolve(root, 'dist')
const serverDirectory = resolve(root, 'dist-ssr')
const template = await readFile(resolve(distDirectory, 'index.html'), 'utf8')
const serverEntry = await import(pathToFileURL(resolve(serverDirectory, 'entry-server.js')).href)


function injectDocument(source, rendered) {
  return source
    .replace(/<html[^>]*>/, `<html lang="${rendered.locale}" dir="${rendered.direction}">`)
    .replace('<body>', '<body data-prerendered="true" style="overflow:hidden">')
    .replace('<!--seo-head-->', rendered.head)
    .replace('<div id="root"><!--app-html--></div>', `<div id="root" data-prerendered="true">${rendered.html}</div>`)
}


function outputPathFor(pathname) {
  if (pathname === '/') return resolve(distDirectory, 'index.html')
  if (pathname === '/404') return resolve(distDirectory, '404.html')
  if (pathname === '/ar/404') return resolve(distDirectory, 'ar', '404.html')
  return resolve(distDirectory, pathname.slice(1), 'index.html')
}

const escapeXml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;')


const sitemapEntries = []

for (const pathname of serverEntry.prerenderPaths) {
  const rendered = await serverEntry.renderPage(pathname)
  const outputPath = outputPathFor(pathname)
  await mkdir(resolve(outputPath, '..'), { recursive: true })
  await writeFile(outputPath, injectDocument(template, rendered))

  if (!pathname.endsWith('/404') && pathname !== '/404' && rendered.status === 200) {
    sitemapEntries.push({
      alternates: rendered.alternates,
      canonical: rendered.canonical,
      modifiedAt: rendered.modifiedAt,
    })
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemapEntries.map(({ alternates, canonical, modifiedAt }) => `  <url>\n    <loc>${escapeXml(canonical)}</loc>\n    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(alternates.en)}" />\n    <xhtml:link rel="alternate" hreflang="ar" href="${escapeXml(alternates.ar)}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(alternates['x-default'])}" />${modifiedAt ? `\n    <lastmod>${modifiedAt}</lastmod>` : ''}\n  </url>`).join('\n')}\n</urlset>\n`

await writeFile(resolve(distDirectory, 'sitemap.xml'), sitemap)
await writeFile(resolve(distDirectory, 'robots.txt'), 'User-agent: *\nAllow: /\n\nSitemap: https://ayeshajm.com/sitemap.xml\n')
await rm(serverDirectory, { recursive: true, force: true })

console.log(`Prerendered ${serverEntry.prerenderPaths.length} routes with bilingual route-specific HTML and metadata.`)
