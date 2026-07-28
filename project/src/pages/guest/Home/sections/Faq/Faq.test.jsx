import { fireEvent, render, screen } from '@testing-library/react'

import Faq from './Faq'

describe('Faq', () => {
  it('renders and toggles FAQ answers', () => {
    render(<Faq />)

    expect(screen.getByRole('region', { name: 'FAQs' })).toBeInTheDocument()

    const triggers = screen.getAllByRole('button')
    expect(triggers).toHaveLength(5)
    triggers.forEach((trigger) => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })

    const trigger = screen.getByRole('button', { name: 'Which file formats can I provide?' })
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })
})
