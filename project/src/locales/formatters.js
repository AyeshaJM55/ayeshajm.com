const intlLocales = {
  en: 'en-US',
  ar: 'ar-SA-u-ca-gregory-nu-arab',
}

export const getIntlLocale = (locale = 'en') => intlLocales[locale] ?? intlLocales.en

export function createFormatters(locale = 'en') {
  const intlLocale = getIntlLocale(locale)
  const number = new Intl.NumberFormat(intlLocale)
  const pluralRules = new Intl.PluralRules(intlLocale)
  const date = new Intl.DateTimeFormat(intlLocale, { day: 'numeric', month: 'long', year: 'numeric' })
  const list = new Intl.ListFormat(intlLocale, { style: 'long', type: 'conjunction' })
  return {
    intlLocale,
    pluralRules,
    formatDate: (value) => date.format(new Date(`${value}T00:00:00`)),
    formatNumber: (value, options) => options ? new Intl.NumberFormat(intlLocale, options).format(value) : number.format(value),
    formatList: (values) => list.format(values),
  }
}
