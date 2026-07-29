import { render, screen } from '@testing-library/react'

import Footer from './Footer'


describe('Footer', () => {
  it('renders navigation, social icons, and the contact email', () => {
    render(<Footer />)

    expect(screen.getByRole('contentinfo', { name: 'Site footer' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Footer navigation' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Social media' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'ArtStation' })).toHaveAttribute('href', 'https://ayesha_jm.artstation.com')
    expect(screen.getByRole('link', { name: 'hello@ayeshajm.com' })).toHaveAttribute(
      'href',
      'mailto:hello@ayeshajm.com',
    )
  })
})
