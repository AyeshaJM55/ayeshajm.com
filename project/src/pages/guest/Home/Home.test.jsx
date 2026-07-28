import { render, screen } from '@testing-library/react'
import Home from './Home'

describe('Home', () => {
  it('renders the homepage with its hero section', () => {
    render(<Home />)

    expect(screen.getByRole('main', { name: 'Homepage' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /3d product experiences/i })).toBeInTheDocument()
  })
})
