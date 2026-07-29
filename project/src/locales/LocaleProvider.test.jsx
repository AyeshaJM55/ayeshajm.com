import { render, waitFor } from '@testing-library/react'

import { LocaleProvider } from './LocaleProvider'

function Content() {
  return <p>content</p>
}

describe('LocaleProvider document direction', () => {
  it.each([
    ['en', 'ltr'],
    ['ar', 'rtl'],
  ])('sets %s document metadata', async (locale, direction) => {
    render(<LocaleProvider locale={locale}><Content /></LocaleProvider>)
    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute('lang', locale)
      expect(document.documentElement).toHaveAttribute('dir', direction)
      expect(document.documentElement.dataset.locale).toBe(locale)
      expect(document.documentElement.dataset.direction).toBe(direction)
    })
  })
})
