import { fireEvent, render, screen } from '@testing-library/react'

import { LocaleProvider } from '../../../locales/LocaleProvider'
import LocaleSwitcher from './LocaleSwitcher'

const renderSwitcher = (locale, pathname) => render(
  <LocaleProvider locale={locale}>
    <LocaleSwitcher pathname={pathname} />
  </LocaleProvider>,
)

describe('LocaleSwitcher', () => {
  it('preserves path, query, and hash when switching to Arabic', () => {
    renderSwitcher('en', '/blog/product-rendering-for-ecommerce?ref=home#article')
    fireEvent.click(screen.getByRole('button', { name: /Current language: EN/ }))
    expect(screen.getByRole('menuitem', { name: /AR/ })).toHaveAttribute(
      'href',
      '/ar/blog/product-rendering-for-ecommerce?ref=home#article',
    )
  })

  it('removes the Arabic prefix when switching to English', () => {
    renderSwitcher('ar', '/ar/services/3d-modeling?from=nav#details')
    fireEvent.click(screen.getByRole('button', { name: /AR/ }))
    expect(screen.getByRole('menuitem', { name: /EN/ })).toHaveAttribute(
      'href',
      '/services/3d-modeling?from=nav#details',
    )
  })

  it('closes on Escape and returns focus to the trigger', () => {
    renderSwitcher('en', '/')
    const trigger = screen.getByRole('button', { name: /Current language: EN/ })
    fireEvent.click(trigger)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })
})
