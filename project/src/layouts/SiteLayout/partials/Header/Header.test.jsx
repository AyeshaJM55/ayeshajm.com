import { fireEvent, render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('renders the brand, navigation, and call to action', () => {
    render(<Header />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ayesha J.' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Book a call' })).toBeInTheDocument()
  })

  it('opens the mobile navigation', () => {
    render(<Header />)

    fireEvent.click(screen.getByRole('button', { name: 'Toggle navigation menu' }))

    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeInTheDocument()
  })
})
