import { parse as parseYaml } from 'yaml'


const wordsPerMinute = 220
const frontMatterPattern = /^---\n([\s\S]*?)\n---(?:\n|$)/

export function calculateReadingTime(content) {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

export function parseMarkdown(source, sourcePath = 'unknown markdown file') {
  if (typeof source !== 'string') throw new Error(`[content] ${sourcePath}: expected raw Markdown text.`)

  const normalizedSource = source.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n')
  const frontMatterMatch = normalizedSource.match(frontMatterPattern)

  if (!frontMatterMatch) throw new Error(`[content] ${sourcePath}: missing or malformed YAML front matter.`)

  try {
    const data = parseYaml(frontMatterMatch[1]) ?? {}
    if (typeof data !== 'object' || Array.isArray(data)) throw new Error('front matter must parse to an object')

    return {
      content: normalizedSource.slice(frontMatterMatch[0].length).trim(),
      data,
      sourcePath,
    }
  } catch (error) {
    throw new Error(`[content] ${sourcePath}: ${error.message}`)
  }
}
