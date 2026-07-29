import { DEFAULT_LOCALE, isSupportedLocale, stripLocalePath } from './getLocaleFromPath'

export function localizePath(value = '/', locale = DEFAULT_LOCALE) {
  if (!value || /^(?:[a-z]+:|#|\/\/)/i.test(value)) return value
  const url = new URL(value, 'https://locale.invalid')
  const basePath = stripLocalePath(url.pathname)
  const resolved = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE
  const localizedPath = resolved === DEFAULT_LOCALE
    ? basePath
    : basePath === '/' ? `/${resolved}` : `/${resolved}${basePath}`
  return `${localizedPath}${url.search}${url.hash}`
}

export const switchLocalePath = (value, locale) => localizePath(value, locale)
