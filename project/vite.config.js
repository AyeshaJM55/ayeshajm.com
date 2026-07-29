import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'


function seoHtmlRendering() {
  return {
    name: 'seo-html-rendering',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const acceptsHtml = request.headers.accept?.includes('text/html')
        const pathname = new URL(request.url ?? '/', 'http://localhost').pathname
        const isInternalRequest = pathname.startsWith('/@')
          || pathname.startsWith('/src/')
          || pathname.startsWith('/node_modules/')
          || pathname.includes('.')

        if (request.method !== 'GET' || !acceptsHtml || isInternalRequest) {
          next()
          return
        }

        try {
          const template = await readFile(resolve(process.cwd(), 'index.html'), 'utf8')
          const transformedTemplate = await server.transformIndexHtml(pathname, template)
          const { renderPage } = await server.ssrLoadModule('/src/entry-server.jsx')
          const rendered = await renderPage(pathname)
          const fontPreload = rendered.locale === 'ar'
            ? '<link rel="preload" href="/fonts/ibm-plex-sans-arabic/ibm-plex-sans-arabic-600.woff2" as="font" type="font/woff2" crossorigin>'
            : ''
          const html = transformedTemplate
            .replace(/<html[^>]*>/, `<html lang="${rendered.locale}" dir="${rendered.direction}" data-locale="${rendered.locale}" data-direction="${rendered.direction}">`)
            .replace('<body>', '<body data-prerendered="true" style="overflow:hidden">')
            .replace('<!--seo-head-->', `${fontPreload}${rendered.head}`)
            .replace('<div id="root"><!--app-html--></div>', `<div id="root" data-prerendered="true">${rendered.html}</div>`)

          response.statusCode = rendered.status
          response.setHeader('Content-Type', 'text/html; charset=utf-8')
          response.end(html)
        } catch (error) {
          server.ssrFixStacktrace(error)
          next(error)
        }
      })
    },
  }
}


function markdownContentRefresh() {
  const contentRoot = resolve(process.cwd(), 'content')
  const isContentMarkdown = (file) => file.startsWith(contentRoot) && file.endsWith('.md')

  return {
    name: 'markdown-content-refresh',
    configureServer(server) {
      server.watcher.add(contentRoot)

      const refreshContentMap = (file) => {
        if (!isContentMarkdown(file)) return
        server.ws.send({ path: '*', type: 'full-reload' })
      }

      server.watcher.on('add', refreshContentMap)
      server.watcher.on('unlink', refreshContentMap)
    },
  }
}


export default defineConfig({
  plugins: [seoHtmlRendering(), markdownContentRefresh(), react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
})
