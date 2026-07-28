import { render, screen } from '@testing-library/react'

import Testimonials from './Testimonials'

describe('Testimonials', () => {
  it('renders the testimonials section and carousel controls', () => {
    render(<Testimonials />)

    expect(screen.getByRole('region', { name: 'Trusted by Clients' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Previous testimonial' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next testimonial' })).toBeInTheDocument()
    expect(screen.getByText('Small Cliffs')).toBeInTheDocument()
  })
})
