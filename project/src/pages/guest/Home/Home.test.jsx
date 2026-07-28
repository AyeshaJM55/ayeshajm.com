import { render, screen } from '@testing-library/react'
import Home from './Home'

describe('Home', () => {
  it('renders the hero, partner strip, and temporary scroll section', () => {
    render(<Home />)

    expect(screen.getByRole('main', { name: 'Homepage' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /3d product experiences/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Selected clients' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Temporary scroll testing section' })).toBeInTheDocument()
  })
})
