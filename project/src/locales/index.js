import localeRegistry from './locales.json'
import { getIntlLocale } from './formatters'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, getLocaleFromPath, isSupportedLocale, stripLocalePath } from './getLocaleFromPath'
import { loadLocaleContent } from './loadLocaleContent'
import { localizePath, switchLocalePath } from './localizePath'

let activeLocale = DEFAULT_LOCALE

export const setActiveLocale = (locale) => { activeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE; return activeLocale }
export const getActiveLocale = () => activeLocale
export const getLocaleMetadata = (locale = activeLocale) => localeRegistry[locale] ?? localeRegistry[DEFAULT_LOCALE]
export const getLocaleDirection = (locale = activeLocale) => getLocaleMetadata(locale).mode === 'RTL' ? 'rtl' : 'ltr'
export const resolveLocaleFromPath = getLocaleFromPath
export const translate = (key, locale = activeLocale, fallback = '') => {
  const value = key.split('.').reduce((current, segment) => current?.[segment], loadLocaleContent(locale))
  if (value !== undefined && value !== null) return value
  const defaultValue = key.split('.').reduce((current, segment) => current?.[segment], loadLocaleContent(DEFAULT_LOCALE))
  return defaultValue ?? fallback ?? key
}

export { DEFAULT_LOCALE, SUPPORTED_LOCALES, getIntlLocale, getLocaleFromPath, isSupportedLocale, loadLocaleContent, localeRegistry, localizePath, stripLocalePath, switchLocalePath }
