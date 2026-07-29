import { render, screen, waitFor } from '@testing-library/react'

import App from './App'

describe('App routing', () => {
  const originalPath = window.location.pathname

  afterEach(() => {
    window.history.replaceState({}, '', originalPath)
  })

  it('renders the home page and updates its title', async () => {
    window.history.replaceState({}, '', '/')
    render(<App />)

    await waitFor(() => {
      expect(document.title).toBe('Ayesha J. | Home')
    })
  })

  it('renders a blank routed page and updates its title', async () => {
    window.history.replaceState({}, '', '/about')
    render(<App />)

    expect(screen.getByRole('main', { name: 'About page' })).toBeInTheDocument()
    await waitFor(() => {
      expect(document.title).toBe('Ayesha J. | About')
    })
  })
})
