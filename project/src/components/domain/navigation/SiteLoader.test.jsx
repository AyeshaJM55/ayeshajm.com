import { render, screen } from '@testing-library/react'

import SiteLoader from './SiteLoader'


describe('SiteLoader', () => {
  it('fills the viewport and displays the A. monogram', () => {
    render(<SiteLoader />)

    expect(screen.getByRole('status', { name: 'Loading website' })).toHaveClass('fixed', 'inset-0')
    expect(screen.getByText('A.')).toBeInTheDocument()
  })
})
