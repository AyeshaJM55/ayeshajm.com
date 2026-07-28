import { render, screen } from '@testing-library/react'
import PartnersStrip from './PartnersStrip'

describe('PartnersStrip', () => {
  it('renders the horizontally animated partner strip', () => {
    render(<PartnersStrip />)

    expect(screen.getByRole('region', { name: 'Selected clients' })).toBeInTheDocument()
    expect(screen.getAllByText('Small Cliffs').length).toBeGreaterThan(1)
    expect(screen.getAllByText('Golden Pets').length).toBeGreaterThan(1)
    expect(screen.getAllByText('Savva').length).toBeGreaterThan(1)
  })
})
