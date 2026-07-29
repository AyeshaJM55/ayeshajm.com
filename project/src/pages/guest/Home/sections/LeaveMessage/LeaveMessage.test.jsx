import { fireEvent, render, screen } from '@testing-library/react'

import LeaveMessage from './LeaveMessage'

describe('LeaveMessage', () => {
  it('renders and submits the contact form', () => {
    render(<LeaveMessage />)

    expect(screen.getByRole('region', { name: 'Leave a message' })).toBeInTheDocument()

    fireEvent.submit(screen.getByRole('button', { name: 'Send Message' }).closest('form'))

    expect(screen.getByText('Thank you. Your message is ready to be reviewed.')).toBeInTheDocument()
  })
})
