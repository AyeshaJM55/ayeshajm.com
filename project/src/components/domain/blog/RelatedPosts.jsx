import PropTypes from 'prop-types'

import BlogCard from './BlogCard'


function RelatedPosts({ posts }) {
  if (!posts.length) return null

  return (
    <section className='bg-neutral-50 py-20 sm:py-24'>
      <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
        <p className='text-xs font-semibold uppercase tracking-[0.16em] text-black/40'>Continue reading</p>
        <h2 className='mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl'>Related articles</h2>
        <div className='mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3'>{posts.map((post) => <BlogCard key={post.slug} post={post} />)}</div>
      </div>
    </section>
  )
}

RelatedPosts.propTypes = { posts: PropTypes.arrayOf(PropTypes.object).isRequired }
export default RelatedPosts
