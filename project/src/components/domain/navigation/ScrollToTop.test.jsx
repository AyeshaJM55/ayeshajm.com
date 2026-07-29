import { fireEvent, render, screen } from '@testing-library/react'

import ScrollToTop from './ScrollToTop'


describe('ScrollToTop', () => {
  it('appears after scrolling and returns the page to the top', () => {
    const scrollTo = vi.fn()
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 500 })
    Object.defineProperty(window, 'scrollTo', { configurable: true, value: scrollTo })

    render(<ScrollToTop />)
    fireEvent.scroll(window)
    fireEvent.click(screen.getByRole('button', { name: 'Scroll to top' }))

    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }))
  })
})
