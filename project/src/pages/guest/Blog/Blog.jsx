import { Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import BlogCard from '../../../components/domain/blog/BlogCard'
import AnimatedPage from '../../../components/domain/motion/AnimatedPage'
import PageHero from '../../../components/domain/site/PageHero'
import { blogPosts } from '../../../content/loadBlogPosts'


const POSTS_PER_PAGE = 6

function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeTag, setActiveTag] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['All', ...blogPosts.reduce((values, post) => {
    values.add(post.category)
    return values
  }, new Set())]
  const tags = ['All', ...blogPosts.reduce((values, post) => {
    post.tags.forEach((tag) => values.add(tag))
    return values
  }, new Set())]
  const featuredPost = blogPosts.find((post) => post.featured)

  const filteredPosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return blogPosts.filter((post) => {
      const categoryMatches = activeCategory === 'All' || post.category === activeCategory
      const tagMatches = activeTag === 'All' || post.tags.includes(activeTag)
      const searchMatches = !normalizedQuery || [
        post.title,
        post.description,
        post.category,
        ...post.tags,
      ].some((value) => value.toLowerCase().includes(normalizedQuery))

      return categoryMatches && tagMatches && searchMatches && post.slug !== featuredPost?.slug
    })
  }, [activeCategory, activeTag, featuredPost?.slug, searchQuery])

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
  const visiblePosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory, activeTag, searchQuery])

  const clearFilters = () => {
    setActiveCategory('All')
    setActiveTag('All')
    setSearchQuery('')
  }

  return (
    <AnimatedPage ariaLabel='Blog page'>
      <PageHero description='Notes on product visualization, CGI production, art direction, and building commercially useful image systems.' eyebrow='Blog' title='Useful thinking behind the final image.' />

      {featuredPost ? (
        <section className='bg-white pb-20 sm:pb-24'>
          <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            <BlogCard featured imageLoading='eager' post={featuredPost} />
          </div>
        </section>
      ) : null}

      <section className='bg-neutral-50 py-20 sm:py-24 lg:py-28'>
        <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <div className='border-b border-black/15 pb-10'>
            <label className='block max-w-3xl' htmlFor='blog-search'>
              <span className='mb-4 block text-xs font-semibold uppercase tracking-[0.14em] text-black/40'>Search</span>
              <span className='flex items-center gap-3 border-b border-black/25 bg-white px-4'>
                <Search aria-hidden='true' className='size-5 shrink-0 text-black/40' />
                <input
                  className='min-h-14 w-full bg-transparent text-base text-black outline-none placeholder:text-black/35'
                  id='blog-search'
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder='Search articles, categories, or tags'
                  type='search'
                  value={searchQuery}
                />
              </span>
            </label>

            <div className='mt-10'>
              <p className='mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-black/40'>Category</p>
              <div className='flex flex-wrap gap-2'>
                {categories.map((category) => (
                  <button
                    aria-pressed={activeCategory === category}
                    className='border border-black/15 px-4 py-2 text-sm font-medium transition-colors hover:bg-black hover:text-white aria-pressed:bg-black aria-pressed:text-white'
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    type='button'
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className='mt-8'>
              <p className='mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-black/40'>Tags</p>
              <div className='flex flex-wrap gap-2'>
                {tags.map((tag) => (
                  <button
                    aria-pressed={activeTag === tag}
                    className='border border-black/15 px-4 py-2 text-sm font-medium transition-colors hover:bg-black hover:text-white aria-pressed:bg-black aria-pressed:text-white'
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    type='button'
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {visiblePosts.length ? (
            <>
              <div className='mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3'>
                {visiblePosts.map((post) => <BlogCard imageLoading='eager' key={post.slug} post={post} />)}
              </div>

              {totalPages > 1 ? (
                <nav aria-label='Blog pagination' className='mt-16 flex flex-wrap items-center justify-center gap-2'>
                  <button
                    className='min-h-11 border border-black/15 px-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-35'
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                    type='button'
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                      aria-current={currentPage === page ? 'page' : undefined}
                      aria-label={`Page ${page}`}
                      className='grid size-11 place-items-center border border-black/15 text-sm font-semibold aria-[current=page]:bg-black aria-[current=page]:text-white'
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      type='button'
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    className='min-h-11 border border-black/15 px-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-35'
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                    type='button'
                  >
                    Next
                  </button>
                </nav>
              ) : null}
            </>
          ) : (
            <div className='mt-12 border border-black/15 bg-white p-10'>
              <h2 className='text-3xl font-semibold tracking-[-0.04em]'>No articles match your search and filters.</h2>
              <button className='mt-6 bg-black px-6 py-3 text-sm font-semibold text-white' onClick={clearFilters} type='button'>Clear filters</button>
            </div>
          )}
        </div>
      </section>
    </AnimatedPage>
  )
}

export default Blog
