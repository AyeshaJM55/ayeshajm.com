import { render, screen } from '@testing-library/react'

import Home from './Home'


describe('Home', () => {
  it('renders the main homepage sections', () => {
    render(<Home />)

    expect(screen.getByRole('main', { name: 'Homepage' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /3d product experiences/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Selected clients' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Experience and project highlights' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Featured Work' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Services' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Trusted by Clients' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /bring your product to life/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'FAQs' })).toBeInTheDocument()
  })
})
