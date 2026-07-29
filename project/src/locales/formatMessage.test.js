import { formatMessage } from './formatMessage'
import { createFormatters } from './formatters'

describe('formatMessage', () => {
  it('selects English plurals with a numeric count', () => {
    const formatters = createFormatters('en')
    const message = { one: '{count} project', other: '{count} projects' }
    expect(formatMessage(message, { count: 1 }, formatters.pluralRules, formatters.formatNumber)).toBe('1 project')
    expect(formatMessage(message, { count: 4 }, formatters.pluralRules, formatters.formatNumber)).toBe('4 projects')
  })

  it('selects Arabic categories using the raw number and interpolates Arabic digits', () => {
    const formatters = createFormatters('ar')
    const message = {
      zero: 'لا توجد مشروعات',
      one: 'مشروع واحد',
      two: 'مشروعان',
      few: '{count} مشروعات',
      many: '{count} مشروعاً',
      other: '{count} مشروع',
    }
    expect(formatMessage(message, { count: 0 }, formatters.pluralRules, formatters.formatNumber)).toBe('لا توجد مشروعات')
    expect(formatMessage(message, { count: 2 }, formatters.pluralRules, formatters.formatNumber)).toBe('مشروعان')
    expect(formatMessage(message, { count: 7 }, formatters.pluralRules, formatters.formatNumber)).toBe('٧ مشروعات')
    expect(formatMessage(message, { count: 18 }, formatters.pluralRules, formatters.formatNumber)).toBe('١٨ مشروعاً')
  })
})
