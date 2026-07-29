import PropTypes from 'prop-types'
import { useEffect, useMemo } from 'react'

import { DEFAULT_LOCALE } from './getLocaleFromPath'
import { LocaleContext } from './localeContext'
import { buildLocaleValue } from './localeValue'

const STORAGE_KEY = 'ayeshajm.locale.v1'

export function LocaleProvider({ children, locale = DEFAULT_LOCALE }) {
  const value = useMemo(() => buildLocaleValue(locale), [locale])

  useEffect(() => {
    document.documentElement.lang = value.locale
    document.documentElement.dir = value.direction
    document.documentElement.dataset.locale = value.locale
    document.documentElement.dataset.direction = value.direction
    try {
      window.localStorage.setItem(STORAGE_KEY, value.locale)
    } catch {
      // Storage can be unavailable.
    }
  }, [value.direction, value.locale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
  locale: PropTypes.string,
}
