import { render, screen } from '@testing-library/react'

import BookNowStrip from './BookNowStrip'

describe('BookNowStrip', () => {
  it('renders booking links to the book page', () => {
    render(<BookNowStrip />)

    expect(screen.getByRole('region', { name: /bring your product to life/i })).toBeInTheDocument()

    const bookingLinks = screen.getAllByRole('link')
    expect(bookingLinks).toHaveLength(2)
    bookingLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', '/book')
    })
  })
})
