import { ArrowUpRight } from 'lucide-react'
import PropTypes from 'prop-types'

import BlogMeta from './BlogMeta'
import BlogTagList from './BlogTagList'


function BlogCard({ featured = false, imageLoading = 'lazy', post }) {
  return (
    <article className={featured ? 'grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-14' : ''}>
      <a className='group block overflow-hidden bg-white outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4' href={`/blog/${post.slug}`}>
        <img
          alt={post.coverAlt}
          className={`w-full object-contain transition-transform duration-700 group-hover:scale-[1.025] ${featured ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}
          decoding='async'
          fetchPriority={featured ? 'high' : 'auto'}
          height='900'
          loading={imageLoading}
          src={post.coverImage}
          width='1400'
        />
      </a>
      <div className={featured ? '' : 'border-t border-black/15 pt-5'}>
        <p className='text-xs font-semibold uppercase tracking-[0.14em] text-black/40'>{post.category}{post.draft ? ' · Draft' : ''}</p>
        <div className='mt-3'><BlogTagList tags={post.tags} /></div>
        <h2 className={`${featured ? 'mt-5 text-4xl sm:text-5xl' : 'mt-4 text-2xl'} font-semibold tracking-[-0.045em] text-black`}>
          <a className='outline-none hover:opacity-55 focus-visible:ring-2 focus-visible:ring-black' href={`/blog/${post.slug}`}>{post.title}</a>
        </h2>
        <p className='mt-4 text-base leading-7 text-black/55'>{post.description}</p>
        <div className='mt-5'><BlogMeta author={post.author} publishedAt={post.publishedAt} readingTime={post.readingTime} /></div>
        <a className='group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-black outline-none focus-visible:ring-2 focus-visible:ring-black' href={`/blog/${post.slug}`}>Read article <ArrowUpRight aria-hidden='true' className='size-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1' /></a>
      </div>
    </article>
  )
}

BlogCard.propTypes = {
  featured: PropTypes.bool,
  imageLoading: PropTypes.oneOf(['eager', 'lazy']),
  post: PropTypes.shape({
    author: PropTypes.object.isRequired,
    category: PropTypes.string.isRequired,
    coverAlt: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    draft: PropTypes.bool.isRequired,
    publishedAt: PropTypes.string.isRequired,
    readingTime: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}

export default BlogCard
