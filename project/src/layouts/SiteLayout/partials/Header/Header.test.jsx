import { fireEvent, render, screen, within } from '@testing-library/react'

import { LocaleProvider } from '../../../../locales/LocaleProvider'
import Header from './Header'

const renderHeader = (locale = 'en', pathname = locale === 'ar' ? '/ar' : '/') => render(
  <LocaleProvider locale={locale}>
    <Header pathname={pathname} />
  </LocaleProvider>,
)

describe('Header', () => {
  it('keeps the desktop call to action and locale switcher after navigation', () => {
    renderHeader()
    const banner = screen.getByRole('banner')
    const navigation = screen.getByRole('navigation', { name: 'Primary navigation' })
    const book = screen.getByRole('link', { name: 'Book a call' })
    const locale = screen.getAllByRole('button', { name: /Current language: EN/ })[0]

    expect(screen.getByRole('link', { name: 'Ayesha J.' })).toHaveAttribute('href', '/')
    expect(book).toHaveAttribute('href', '/book')
    expect(navigation).toHaveClass('md:flex')
    expect(book.compareDocumentPosition(locale) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(banner.firstElementChild).toHaveClass('overflow-visible')
    fireEvent.click(locale)
    expect(screen.getByRole('menu')).toHaveClass('z-[100]')
    expect(within(banner).getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
  })

  it('opens mobile navigation with Book a call as its final item', () => {
    const originalWidth = window.innerWidth
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 390 })
    renderHeader()

    fireEvent.click(screen.getByRole('button', { name: 'Toggle navigation menu' }))
    const mobileNavigation = screen.getByRole('navigation', { name: 'Mobile navigation' })
    const links = within(mobileNavigation).getAllByRole('link')

    expect(links.at(-1)).toHaveTextContent('Book a call')
    expect(links.at(-1)).toHaveAttribute('href', '/book')
    expect(screen.getByRole('banner').firstElementChild).toHaveStyle({ borderRadius: '24px' })
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalWidth })
  })

  it('renders localized Arabic links and RTL-ready route paths', () => {
    renderHeader('ar', '/ar/services')
    expect(screen.getByRole('link', { name: 'عائشة' })).toHaveAttribute('href', '/ar')
    expect(screen.getByRole('link', { name: 'الخدمات' })).toHaveAttribute('href', '/ar/services')
    expect(screen.getByRole('link', { name: 'احجز مكالمة' })).toHaveAttribute('href', '/ar/book')
  })
})
