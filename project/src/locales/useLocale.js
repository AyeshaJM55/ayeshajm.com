import { useContext } from 'react'

import { DEFAULT_LOCALE } from './getLocaleFromPath'
import { LocaleContext } from './localeContext'
import { buildLocaleValue } from './localeValue'

const defaultValue = buildLocaleValue(DEFAULT_LOCALE)

export function useLocale() {
  return useContext(LocaleContext) ?? defaultValue
}

export default useLocale
