import { render, screen } from '@testing-library/react'

import DrawnDivider from './DrawnDivider'

describe('DrawnDivider', () => {
  it('renders the decorative divider section', () => {
    render(<DrawnDivider />)

    expect(
      screen.getByRole('region', { name: 'Decorative hand-drawn divider' }),
    ).toBeInTheDocument()
  })
})
