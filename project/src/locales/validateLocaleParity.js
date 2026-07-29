import localeRegistry from './locales.json'
import { loadLocaleContent } from './loadLocaleContent'

function compare(left, right, path = '') {
  const leftType = Array.isArray(left) ? 'array' : typeof left
  const rightType = Array.isArray(right) ? 'array' : typeof right
  if (leftType !== rightType) throw new Error(`[locales] Type mismatch at ${path || '<root>'}: ${leftType} !== ${rightType}`)
  if (leftType === 'string' && !left.trim()) throw new Error(`[locales] Empty string at ${path}`)
  if (leftType !== 'object' || left === null) return
  const leftKeys = Object.keys(left).sort()
  const rightKeys = Object.keys(right).sort()
  if (leftKeys.join('|') !== rightKeys.join('|')) throw new Error(`[locales] Key mismatch at ${path || '<root>'}`)
  leftKeys.forEach((key) => compare(left[key], right[key], path ? `${path}.${key}` : key))
}

export function validateLocaleParity() {
  const entries = Object.entries(localeRegistry)
  entries.forEach(([locale, metadata]) => {
    const keys = Object.keys(metadata).sort()
    if (keys.join('|') !== 'mode|symbol') throw new Error(`[locales] ${locale} registry entry must contain only symbol and mode.`)
  })
  const base = loadLocaleContent('en')
  entries.forEach(([locale]) => compare(base, loadLocaleContent(locale)))
  return true
}
