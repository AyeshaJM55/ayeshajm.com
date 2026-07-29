import { render, screen } from '@testing-library/react'

import AnimatedPage from './AnimatedPage'
import StaggerGrid from './StaggerGrid'
import ViewportReveal from './ViewportReveal'

function MotionFixture() {
  return (
    <AnimatedPage ariaLabel='Animated test page'>
      <ViewportReveal><p>Visible content</p></ViewportReveal>
      <StaggerGrid><span>Staggered content</span></StaggerGrid>
    </AnimatedPage>
  )
}

describe('motion components', () => {
  it('keeps content available when motion is reduced', () => {
    render(<MotionFixture />)
    expect(screen.getByRole('main', { name: 'Animated test page' })).toBeInTheDocument()
    expect(screen.getByText('Visible content')).toBeVisible()
    expect(screen.getByText('Staggered content')).toBeVisible()
  })
})
