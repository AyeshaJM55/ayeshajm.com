import { fireEvent, render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('renders the brand, navigation, and call to action', () => {
    render(<Header />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ayesha J.' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Book a call' })).toHaveAttribute('href', '/book')
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
    expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/services')
    expect(screen.getByRole('link', { name: 'Portfolio' })).toHaveAttribute('href', '/portfolio')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
  })

  it('opens the mobile navigation without animating the header radius', () => {
    const originalWidth = window.innerWidth
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 390 })

    render(<Header />)

    fireEvent.click(screen.getByRole('button', { name: 'Toggle navigation menu' }))

    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeInTheDocument()
    expect(screen.getByRole('banner').firstElementChild).toHaveStyle({ borderRadius: '24px' })

    Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalWidth })
  })
})
