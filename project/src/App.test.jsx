import { cleanup, render, waitFor } from '@testing-library/react'

import App from './App'

describe('App routing', () => {
  const originalPath = window.location.pathname

  afterEach(() => {
    cleanup()
    window.history.replaceState({}, '', originalPath)
  })

  it.each([
    ['/', 'Ayesha J. | Home'],
    ['/about', 'Ayesha J. | About'],
    ['/blog', 'Ayesha J. | Blog'],
    ['/blog/product-rendering-for-ecommerce', 'Product Rendering for E-commerce | Ayesha J.'],
    ['/authors/ayesha-jm', 'Ayesha J. | Author | Ayesha J.'],
    ['/services/3d-modeling', 'Ayesha J. | 3D Modeling'],
    ['/work/3d-product-design', 'Ayesha J. | 3D Product Design'],
    ['/missing-page', 'Ayesha J. | Page Not Found'],
  ])('resolves %s and updates title', async (path, title) => {
    window.history.replaceState({}, '', path)
    render(<App />)
    await waitFor(() => expect(document.title).toBe(title))
  })

  it('places prerendered content below a viewport guard during the site loader', () => {
    const originalReadyState = document.readyState
    Object.defineProperty(document, 'readyState', { configurable: true, value: 'loading' })

    const { container } = render(
      <App
        includeSeo={false}
        initialLoaderVisible
        initialLocation='/'
        initialPrerendered
        initialRouteReady
      />,
    )

    const guard = container.querySelector('[data-prerender-guard]')
    expect(guard).toHaveAttribute('style', expect.stringContaining('height: 100vh'))
    expect(guard).toHaveAttribute('style', expect.stringContaining('min-height: 100svh'))
    expect(document.body).toHaveStyle({ overflow: 'hidden' })

    Object.defineProperty(document, 'readyState', { configurable: true, value: originalReadyState })
  })


  it('does not lock scrolling for a non-prerendered initial loader', () => {
    render(<App initialLoaderVisible initialRouteReady />)
    expect(document.body).not.toHaveStyle({ overflow: 'hidden' })
  })

})
