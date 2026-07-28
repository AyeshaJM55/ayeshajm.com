import { render, screen } from '@testing-library/react'
import Home from './Home'

describe('Home', () => {
  it('renders an empty accessible homepage', () => {
    render(<Home />)
    expect(screen.getByRole('main', { name: 'Homepage' })).toBeInTheDocument()
  })
})
