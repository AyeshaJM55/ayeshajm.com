import { render, screen } from '@testing-library/react'

import AuthorDetail from './AuthorDetail/AuthorDetail'
import Blog from './Blog/Blog'
import BlogDetail from './BlogDetail/BlogDetail'


describe('blog and author pages', () => {
  it('renders the blog listing and published cards', () => {
    render(<Blog />)
    expect(screen.getByRole('main', { name: 'Blog page' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Product Rendering for E-commerce/ })).toHaveAttribute('href', '/blog/product-rendering-for-ecommerce')
  })

  it('renders Markdown article content and author attribution', () => {
    render(<BlogDetail params={{ slug: 'product-rendering-for-ecommerce' }} />)
    expect(screen.getByRole('main', { name: 'Product Rendering for E-commerce article page' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Start with a clear image hierarchy' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ayesha J.' })).toHaveAttribute('href', '/authors/ayesha-jm')
  })

  it('renders an author biography and authored posts', () => {
    render(<AuthorDetail params={{ slug: 'ayesha-jm' }} />)
    expect(screen.getByRole('main', { name: 'Ayesha J. author page' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Areas of focus' })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /Product Rendering for E-commerce/ }).length).toBeGreaterThan(0)
  })
})
