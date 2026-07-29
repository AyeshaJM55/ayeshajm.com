import { render, screen } from '@testing-library/react'

import { LocaleProvider } from '../../../../../locales/LocaleProvider'
import Testimonials from './Testimonials'

const renderTestimonials = (locale = 'en') => render(
  <LocaleProvider locale={locale}>
    <Testimonials />
  </LocaleProvider>,
)

describe('Testimonials', () => {
  it('renders the testimonials section and carousel controls', () => {
    renderTestimonials()

    expect(screen.getByRole('region', { name: 'Trusted by Clients' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Previous testimonial' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next testimonial' })).toBeInTheDocument()
    expect(screen.getByText('Small Cliffs')).toBeInTheDocument()
  })

  it('keeps the physical arrow directions correct in RTL', () => {
    renderTestimonials('ar')

    expect(screen.getByTestId('previous-testimonial-icon')).toHaveClass('lucide-chevron-left')
    expect(screen.getByTestId('next-testimonial-icon')).toHaveClass('lucide-chevron-right')
  })
})
