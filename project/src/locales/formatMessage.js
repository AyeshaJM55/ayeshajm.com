export function interpolate(template = '', values = {}) {
  return String(template).replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match)
}

export function formatMessage(message, values = {}, pluralRules, formatNumber) {
  if (typeof message === 'string') return interpolate(message, values)
  if (!message || typeof message !== 'object') return ''

  const count = Number(values.count ?? 0)
  const category = pluralRules.select(count)
  const interpolationValues = {
    ...values,
    count: formatNumber && Number.isFinite(count) ? formatNumber(count) : values.count,
  }

  return interpolate(message[category] ?? message.other ?? '', interpolationValues)
}
