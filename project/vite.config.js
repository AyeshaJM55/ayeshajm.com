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
          const html = transformedTemplate
            .replace('<!--seo-head-->', rendered.head)
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
