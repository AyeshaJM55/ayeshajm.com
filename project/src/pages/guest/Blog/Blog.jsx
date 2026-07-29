import { useMemo, useState } from 'react'

import AnimatedPage from '../../../components/domain/motion/AnimatedPage'
import BlogCard from '../../../components/domain/blog/BlogCard'
import PageHero from '../../../components/domain/site/PageHero'
import { blogPosts } from '../../../content/loadBlogPosts'


function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeTag, setActiveTag] = useState('All')
  const categories = ['All', ...blogPosts.reduce((values, post) => {
    values.add(post.category)
    return values
  }, new Set())]
  const tags = ['All', ...blogPosts.reduce((values, post) => {
    post.tags.forEach((tag) => values.add(tag))
    return values
  }, new Set())]
  const featuredPost = blogPosts.find((post) => post.featured)
  const filteredPosts = useMemo(() => blogPosts.filter((post) => {
    const categoryMatches = activeCategory === 'All' || post.category === activeCategory
    const tagMatches = activeTag === 'All' || post.tags.includes(activeTag)
    return categoryMatches && tagMatches && post.slug !== featuredPost?.slug
  }), [activeCategory, activeTag, featuredPost?.slug])

  return (
    <AnimatedPage ariaLabel='Blog page'>
      <PageHero description='Notes on product visualization, CGI production, art direction, and building commercially useful image systems.' eyebrow='Blog' title='Useful thinking behind the final image.' />

      {featuredPost ? <section className='bg-white pb-20 sm:pb-24'><div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'><BlogCard featured post={featuredPost} /></div></section> : null}

      <section className='bg-neutral-50 py-20 sm:py-24 lg:py-28'>
        <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <div className='grid gap-8 border-b border-black/15 pb-10 lg:grid-cols-2'>
            <div><p className='mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-black/40'>Category</p><div className='flex flex-wrap gap-2'>{categories.map((category) => <button aria-pressed={activeCategory === category} className='border border-black/15 px-4 py-2 text-sm font-medium transition-colors hover:bg-black hover:text-white aria-pressed:bg-black aria-pressed:text-white' key={category} onClick={() => setActiveCategory(category)} type='button'>{category}</button>)}</div></div>
            <div><p className='mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-black/40'>Tag</p><div className='flex flex-wrap gap-2'>{tags.map((tag) => <button aria-pressed={activeTag === tag} className='border border-black/15 px-4 py-2 text-sm font-medium transition-colors hover:bg-black hover:text-white aria-pressed:bg-black aria-pressed:text-white' key={tag} onClick={() => setActiveTag(tag)} type='button'>{tag}</button>)}</div></div>
          </div>

          {filteredPosts.length ? <div className='mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3'>{filteredPosts.map((post) => <BlogCard key={post.slug} post={post} />)}</div> : <div className='mt-12 border border-black/15 bg-white p-10'><h2 className='text-3xl font-semibold tracking-[-0.04em]'>No articles match these filters.</h2><button className='mt-6 bg-black px-6 py-3 text-sm font-semibold text-white' onClick={() => { setActiveCategory('All'); setActiveTag('All') }} type='button'>Clear filters</button></div>}
        </div>
      </section>
    </AnimatedPage>
  )
}

export default Blog
