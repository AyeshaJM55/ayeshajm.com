import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'


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
  plugins: [markdownContentRefresh(), react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
})
