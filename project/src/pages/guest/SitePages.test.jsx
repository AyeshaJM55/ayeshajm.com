import { render, screen } from '@testing-library/react'
import About from './About/About'
import Book from './Book/Book'
import Contact from './Contact/Contact'
import NotFound from './NotFound/NotFound'
import Portfolio from './Portfolio/Portfolio'
import ServiceDetail from './ServiceDetail/ServiceDetail'
import Services from './Services/Services'
import WorkDetail from './WorkDetail/WorkDetail'

describe('site pages', () => {
  it.each([
    ['About page', About],
    ['Services page', Services],
    ['Portfolio page', Portfolio],
    ['Contact page', Contact],
    ['Book a call page', Book],
    ['Page not found', NotFound],
  ])('renders %s', (name, Page) => {
    render(<Page />)
    expect(screen.getByRole('main', { name })).toBeInTheDocument()
  })

  it('renders service and work detail pages', () => {
    const { unmount } = render(<ServiceDetail params={{ slug: '3d-modeling' }} />)
    expect(screen.getByRole('main', { name: '3D Modeling service page' })).toBeInTheDocument()
    unmount()
    render(<WorkDetail params={{ slug: '3d-product-design' }} />)
    expect(screen.getByRole('main', { name: '3D Product Design project page' })).toBeInTheDocument()
  })
})
