import { Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import BlogCard from '../../../components/domain/blog/BlogCard'
import AnimatedPage from '../../../components/domain/motion/AnimatedPage'
import PageHero from '../../../components/domain/site/PageHero'
import { getBlogPosts } from '../../../content/loadBlogPosts'
import { useLocale } from '../../../locales/useLocale'

const POSTS_PER_PAGE = 6

function Blog() {
  const { content, formatNumber, locale, t } = useLocale()
  const copy = content.pages.blog
  const posts = useMemo(() => getBlogPosts(locale), [locale])
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeTag, setActiveTag] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const categories = useMemo(() => [
    { id: 'all', label: t('labels.all') },
    ...[...new Set(posts.map((post) => post.categoryId))].map((id) => ({ id, label: content.blog.categories[id] })),
  ], [content.blog.categories, posts, t])
  const tags = useMemo(() => [
    { id: 'all', label: t('labels.all') },
    ...[...new Set(posts.flatMap((post) => post.tagIds))].map((id) => ({ id, label: content.blog.tags[id] })),
  ], [content.blog.tags, posts, t])
  const featuredPost = posts.find((post) => post.featured)

  const filteredPosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase(locale)
    return posts.filter((post) => {
      const categoryMatches = activeCategory === 'all' || post.categoryId === activeCategory
      const tagMatches = activeTag === 'all' || post.tagIds.includes(activeTag)
      const searchMatches = !normalizedQuery || [post.title, post.description, post.category, post.content, ...post.tags].some((value) => value.toLocaleLowerCase(locale).includes(normalizedQuery))
      return categoryMatches && tagMatches && searchMatches && post.slug !== featuredPost?.slug
    })
  }, [activeCategory, activeTag, featuredPost?.slug, locale, posts, searchQuery])

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
  const visiblePosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

  useEffect(() => { setCurrentPage(1) }, [activeCategory, activeTag, searchQuery])

  const clearFilters = () => {
    setActiveCategory('all')
    setActiveTag('all')
    setSearchQuery('')
  }

  return (
    <AnimatedPage ariaLabel={copy.ariaLabel}>
      <PageHero description={copy.hero.description} eyebrow={copy.hero.eyebrow} title={copy.hero.title} />

      {featuredPost ? <section className='bg-white pb-20 sm:pb-24'><div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'><BlogCard featured imageLoading='eager' post={featuredPost} /></div></section> : null}

      <section className='bg-neutral-50 py-20 sm:py-24 lg:py-28'>
        <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <div className='border-b border-black/15 pb-10'>
            <label className='block max-w-3xl' htmlFor='blog-search'>
              <span className='mb-4 block text-xs font-semibold text-black/40'>{copy.search}</span>
              <span className='flex items-center gap-3 border-b border-black/25 bg-white px-4'>
                <Search aria-hidden='true' className='size-5 shrink-0 text-black/40' />
                <input className='min-h-14 w-full bg-transparent text-base text-black outline-none placeholder:text-black/35' id='blog-search' onChange={(event) => setSearchQuery(event.target.value)} placeholder={copy.searchPlaceholder} type='search' value={searchQuery} />
              </span>
            </label>

            <div className='mt-10'>
              <p className='mb-4 text-xs font-semibold text-black/40'>{copy.category}</p>
              <div className='flex flex-wrap gap-2'>{categories.map((category) => <button aria-pressed={activeCategory === category.id} className='border border-black/15 px-4 py-2 text-sm font-medium transition-colors hover:bg-black hover:text-white aria-pressed:bg-black aria-pressed:text-white' key={category.id} onClick={() => setActiveCategory(category.id)} type='button'>{category.label}</button>)}</div>
            </div>

            <div className='mt-8'>
              <p className='mb-4 text-xs font-semibold text-black/40'>{copy.tags}</p>
              <div className='flex flex-wrap gap-2'>{tags.map((tag) => <button aria-pressed={activeTag === tag.id} className='border border-black/15 px-4 py-2 text-sm font-medium transition-colors hover:bg-black hover:text-white aria-pressed:bg-black aria-pressed:text-white' key={tag.id} onClick={() => setActiveTag(tag.id)} type='button'>{tag.label}</button>)}</div>
            </div>
          </div>

          {visiblePosts.length ? (
            <>
              <div className='mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3'>{visiblePosts.map((post) => <BlogCard imageLoading='eager' key={post.slug} post={post} />)}</div>
              {totalPages > 1 ? (
                <nav aria-label={content.accessibility.blogPagination} className='mt-16 flex flex-wrap items-center justify-center gap-2'>
                  <button className='min-h-11 border border-black/15 px-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-35' disabled={currentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} type='button'>{t('labels.previous')}</button>
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button aria-current={currentPage === page ? 'page' : undefined} aria-label={t('labels.page', { page: formatNumber(page) })} className='grid size-11 place-items-center border border-black/15 text-sm font-semibold aria-[current=page]:bg-black aria-[current=page]:text-white' key={page} onClick={() => setCurrentPage(page)} type='button'>{formatNumber(page)}</button>)}
                  <button className='min-h-11 border border-black/15 px-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-35' disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} type='button'>{t('labels.next')}</button>
                </nav>
              ) : null}
            </>
          ) : <div className='mt-12 border border-black/15 bg-white p-10'><h2 className='text-3xl font-semibold tracking-[-0.04em]'>{copy.emptyTitle}</h2><button className='mt-6 bg-black px-6 py-3 text-sm font-semibold text-white' onClick={clearFilters} type='button'>{copy.clearFilters}</button></div>}
        </div>
      </section>
    </AnimatedPage>
  )
}

export default Blog
