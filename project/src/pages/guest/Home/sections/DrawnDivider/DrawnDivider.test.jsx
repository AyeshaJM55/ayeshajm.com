import { render, screen } from '@testing-library/react'

import { LocaleProvider } from '../../../../../locales/LocaleProvider'
import DrawnDivider from './DrawnDivider'

const renderDivider = (locale = 'en') => render(
  <LocaleProvider locale={locale}>
    <DrawnDivider />
  </LocaleProvider>,
)

describe('DrawnDivider', () => {
  it('renders the decorative divider with a visible physical pen anchor', () => {
    const { container } = renderDivider()

    expect(screen.getByRole('region', { name: 'Decorative hand-drawn divider' })).toBeInTheDocument()
    expect(container.querySelector('[data-drawn-divider-pen]')).toHaveClass('left-0', 'z-10')
    expect(container.querySelector('[data-drawn-divider-pen-image]')).not.toHaveStyle({ transform: 'scaleX(-1)' })
  })

  it('flips the pen horizontally for right-to-left drawing', () => {
    const { container } = renderDivider('ar')

    expect(container.querySelector('[data-drawn-divider-pen]')).toHaveClass('left-0')
    expect(container.querySelector('[data-drawn-divider-pen-image]')).toHaveStyle({ transform: 'scaleX(-1)' })
  })
})
