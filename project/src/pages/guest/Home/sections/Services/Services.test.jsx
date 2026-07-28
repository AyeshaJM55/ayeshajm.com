import { render, screen } from '@testing-library/react'

import Services from './Services'


describe('Services', () => {
  it('renders the services carousel and all service cards', () => {
    render(<Services />)

    expect(screen.getByRole('region', { name: 'Services' })).toBeInTheDocument()
    expect(screen.getByRole('article', { name: '3D Modeling' })).toBeInTheDocument()
    expect(screen.getByRole('article', { name: 'Photorealistic Renders' })).toBeInTheDocument()
    expect(screen.getByRole('article', { name: 'Amazon Studio Renders' })).toBeInTheDocument()
  })
})
