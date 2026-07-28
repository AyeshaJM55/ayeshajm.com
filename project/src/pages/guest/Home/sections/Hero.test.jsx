import { render, screen } from '@testing-library/react'
import Hero from './Hero'

describe('Hero', () => {
  it('renders the hero content and portfolio call to action', () => {
    render(<Hero />)

    expect(screen.getByRole('heading', { name: /3d product experiences/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /3d product visualization/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View Portfolio' })).toHaveAttribute('href', '#portfolio')
  })
})
