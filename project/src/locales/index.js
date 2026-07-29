import localeRegistry from './locales.json'
import { getIntlLocale } from './formatters'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, getLocaleFromPath, isSupportedLocale, stripLocalePath } from './getLocaleFromPath'
import { loadLocaleContent } from './loadLocaleContent'
import { localizePath, switchLocalePath } from './localizePath'

export const setActiveLocale = (locale) => isSupportedLocale(locale) ? locale : DEFAULT_LOCALE
export const getActiveLocale = () => DEFAULT_LOCALE
export const getLocaleMetadata = (locale = DEFAULT_LOCALE) => localeRegistry[locale] ?? localeRegistry[DEFAULT_LOCALE]
export const getLocaleDirection = (locale = DEFAULT_LOCALE) => getLocaleMetadata(locale).mode === 'RTL' ? 'rtl' : 'ltr'
export const resolveLocaleFromPath = getLocaleFromPath
export const translate = (key, locale = DEFAULT_LOCALE, fallback) => {
  const value = key.split('.').reduce((current, segment) => current?.[segment], loadLocaleContent(locale))
  if (value !== undefined && value !== null) return value
  if (fallback !== undefined) return fallback
  throw new Error(`[locales] Missing ${locale} translation: ${key}`)
}

export { DEFAULT_LOCALE, SUPPORTED_LOCALES, getIntlLocale, getLocaleFromPath, isSupportedLocale, loadLocaleContent, localeRegistry, localizePath, stripLocalePath, switchLocalePath }
