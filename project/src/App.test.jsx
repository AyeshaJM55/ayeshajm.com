import { render, waitFor } from '@testing-library/react'

import App from './App'

describe('App routing', () => {
  const originalPath = window.location.pathname

  afterEach(() => { window.history.replaceState({}, '', originalPath) })

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
})
