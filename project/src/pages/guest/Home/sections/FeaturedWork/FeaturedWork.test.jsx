import { render, screen } from '@testing-library/react'

import FeaturedWork from './FeaturedWork'


describe('FeaturedWork', () => {
  it('renders the featured work grid and project links', () => {
    render(<FeaturedWork />)

    expect(screen.getByRole('region', { name: 'Featured Work' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Open 3D Product Design' })).toHaveAttribute('href', '/work/3d-product-design')
    expect(screen.getByRole('link', { name: 'Open Studio Renders' })).toHaveAttribute('href', '/work/studio-renders')
    expect(screen.getByRole('link', { name: 'View all projects' })).toHaveAttribute('href', '/portfolio')
  })
})
