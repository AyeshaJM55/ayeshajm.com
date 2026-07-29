import { fireEvent, render, screen } from '@testing-library/react'

import { LocaleProvider } from '../../locales/LocaleProvider'
import AuthorDetail from './AuthorDetail/AuthorDetail'
import Blog from './Blog/Blog'
import BlogDetail from './BlogDetail/BlogDetail'


describe('blog and author pages', () => {
  it('gives Arabic article arrows matching top-left hover motion', () => {
    render(
      <LocaleProvider locale='ar'>
        <Blog />
      </LocaleProvider>,
    )

    const readLink = screen.getAllByRole('link', { name: /قراءة المقال/ })[0]
    const arrow = readLink.querySelector('svg')
    expect(arrow).toHaveClass('rtl:-scale-x-100', 'rtl:group-hover:-translate-x-1')
  })

  it('renders the blog listing, search, filters, and published cards', () => {
    render(<Blog />)

    expect(screen.getByRole('main', { name: 'Blog page' })).toBeInTheDocument()
    expect(screen.getByRole('searchbox', { name: 'Search' })).toBeInTheDocument()
    expect(screen.getByText('Tags')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Product Rendering for E-commerce/ })).toHaveAttribute('href', '/blog/product-rendering-for-ecommerce')
  })

  it('searches article titles, categories, and tags', () => {
    render(<Blog />)

    fireEvent.change(screen.getByRole('searchbox', { name: 'Search' }), { target: { value: 'e-commerce' } })
    expect(screen.getByRole('link', { name: /Product Rendering for E-commerce/ })).toBeInTheDocument()

    fireEvent.change(screen.getByRole('searchbox', { name: 'Search' }), { target: { value: 'nothing-will-match-this' } })
    expect(screen.getByRole('heading', { name: 'No articles match your search and filters.' })).toBeInTheDocument()
  })

  it('renders Markdown article content and author attribution', () => {
    render(<BlogDetail params={{ slug: 'product-rendering-for-ecommerce' }} />)
    expect(screen.getByRole('main', { name: 'Product Rendering for E-commerce article page' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Start with a clear image hierarchy' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ayesha JM' })).toHaveAttribute('href', '/authors/ayesha-jm')
  })

  it('renders an author biography and authored posts', () => {
    render(<AuthorDetail params={{ slug: 'ayesha-jm' }} />)
    expect(screen.getByRole('main', { name: 'Ayesha JM author page' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Areas of focus' })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /Product Rendering for E-commerce/ }).length).toBeGreaterThan(0)
  })
})
