import { render, screen } from '@testing-library/react'

import RouteLoader from './RouteLoader'


describe('RouteLoader', () => {
  it('renders a simple spinner inside the persistent layout', () => {
    const { container } = render(<RouteLoader />)

    expect(screen.getByRole('status', { name: 'Loading page' })).not.toHaveClass('fixed', 'inset-0')
    expect(container.querySelector('.route-spinner')).toBeInTheDocument()
    expect(screen.queryByText('A.')).not.toBeInTheDocument()
  })
})
