import localeRegistry from './locales.json'
import { formatMessage } from './formatMessage'
import { createFormatters } from './formatters'
import { DEFAULT_LOCALE, isSupportedLocale } from './getLocaleFromPath'
import { loadLocaleContent } from './loadLocaleContent'
import { localizePath, switchLocalePath } from './localizePath'

const getNestedValue = (source, path) => path.split('.').reduce((value, segment) => value?.[segment], source)

const resolveTranslation = (content, key) => {
  const candidates = [
    key,
    `common.${key}`,
    key === 'brand' ? 'common.site.name' : '',
    key.startsWith('navigation.') ? `navigation.primary.${key.slice('navigation.'.length)}` : '',
    key.startsWith('header.') ? `navigation.header.${key.slice('header.'.length)}` : '',
    key.startsWith('footer.') ? `navigation.footer.${key.slice('footer.'.length)}` : '',
  ].filter(Boolean)

  for (const candidate of candidates) {
    const value = getNestedValue(content, candidate)
    if (value !== undefined && value !== null) return value
  }
  return undefined
}

export function buildLocaleValue(locale) {
  const resolved = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE
  const metadata = localeRegistry[resolved]
  const direction = metadata.mode === 'RTL' ? 'rtl' : 'ltr'
  const content = loadLocaleContent(resolved)
  const formatters = createFormatters(resolved)

  const t = (key, values = {}, fallback) => {
    const message = resolveTranslation(content, key)
    if (message === undefined) {
      if (fallback !== undefined) return fallback
      if (import.meta.env.DEV || import.meta.env.MODE === 'test') throw new Error(`[locales] Missing ${resolved} translation: ${key}`)
      return key
    }
    return typeof message === 'string' || (message && typeof message === 'object')
      ? formatMessage(message, values, formatters.pluralRules, formatters.formatNumber)
      : message
  }

  return {
    locale: resolved,
    symbol: metadata.symbol,
    mode: metadata.mode,
    metadata,
    registry: localeRegistry,
    direction,
    content,
    t,
    ...formatters,
    localizePath: (path) => localizePath(path, resolved),
    switchLocalePath: (path, nextLocale) => switchLocalePath(path, nextLocale),
    formatMessage: (message, values = {}) => formatMessage(message, values, formatters.pluralRules, formatters.formatNumber),
    setLocale: (nextLocale, location = '/') => {
      if (!isSupportedLocale(nextLocale) || typeof window === 'undefined') return
      window.location.assign(switchLocalePath(location, nextLocale))
    },
  }
}
