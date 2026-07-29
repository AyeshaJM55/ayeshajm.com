import { readdir, readFile } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'

const root = process.cwd()
const sourceRoot = join(root, 'src')
const extensions = new Set(['.js', '.jsx'])
const ignoredSegments = ['/locales/', '/test/', '/tests/']
const ignoredSuffixes = ['.test.js', '.test.jsx']
const allowedPublicCopy = new Set([
  'A.',
  'ArtStation',
  'Instagram',
  'LinkedIn',
  'className ?',
])
const allowedSymbols = new Set(['×', '☰'])
const findings = []

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await walk(path))
    else files.push(path)
  }
  return files
}

function lineNumber(source, index) {
  return source.slice(0, index).split('\n').length
}

function record(file, source, index, value, kind) {
  const normalized = value.replace(/\s+/g, ' ').trim()
  if (!normalized || allowedPublicCopy.has(normalized) || allowedSymbols.has(normalized)) return
  findings.push(`${relative(root, file)}:${lineNumber(source, index)} ${kind}: ${JSON.stringify(normalized)}`)
}

for (const file of await walk(sourceRoot)) {
  const normalizedPath = file.replaceAll('\\', '/')
  if (!extensions.has(extname(file))) continue
  if (ignoredSegments.some((segment) => normalizedPath.includes(segment))) continue
  if (ignoredSuffixes.some((suffix) => normalizedPath.endsWith(suffix))) continue

  const source = await readFile(file, 'utf8')

  for (const match of source.matchAll(/>([^<>{}\n]*[A-Za-z\u0600-\u06ff][^<>{}\n]*)</g)) {
    record(file, source, match.index, match[1], 'JSX text')
  }

  for (const match of source.matchAll(/\b(aria-label|alt|placeholder|title)=(['"])([^'"{}]*[A-Za-z\u0600-\u06ff][^'"{}]*)\2/g)) {
    record(file, source, match.index, match[3], match[1])
  }

  for (const match of source.matchAll(/\b(label|description|eyebrow|title):\s*(['"])([^'"\n]*[A-Za-z\u0600-\u06ff][^'"\n]*)\2/g)) {
    record(file, source, match.index, match[3], `${match[1]} property`)
  }
}

if (findings.length) {
  console.error('Suspicious visitor-facing copy remains outside src/locales:')
  console.error(findings.join('\n'))
  process.exitCode = 1
} else {
  console.log('Localized-copy audit passed.')
}
