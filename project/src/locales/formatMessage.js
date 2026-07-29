export function interpolate(template = '', values = {}) {
  return String(template).replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match)
}

export function formatMessage(message, values = {}, pluralRules) {
  if (typeof message === 'string') return interpolate(message, values)
  if (!message || typeof message !== 'object') return ''
  const category = pluralRules.select(Number(values.count ?? 0))
  return interpolate(message[category] ?? message.other ?? '', values)
}
