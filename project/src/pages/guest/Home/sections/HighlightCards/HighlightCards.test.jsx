import { render, screen } from '@testing-library/react'

import HighlightCards from './HighlightCards'


describe('HighlightCards', () => {
  it('renders the experience, project, and collaboration highlights', () => {
    render(<HighlightCards />)

    expect(screen.getByRole('region', { name: 'Experience and project highlights' })).toBeInTheDocument()
    expect(screen.getByText('4+')).toBeInTheDocument()
    expect(screen.getByText('400+')).toBeInTheDocument()
    expect(screen.getByText('Global')).toBeInTheDocument()
  })
})
