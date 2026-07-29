import { render, screen } from '@testing-library/react'

import PageLoader from './PageLoader'


describe('PageLoader', () => {
  it('fills the viewport and displays the A. monogram', () => {
    render(<PageLoader />)

    expect(screen.getByRole('status', { name: 'Loading website' })).toHaveClass('fixed', 'inset-0')
    expect(screen.getByText('A.')).toBeInTheDocument()
  })
})
