import PropTypes from 'prop-types'

import AnimatedPage from '../../../components/domain/motion/AnimatedPage'
import AuthorCard from '../../../components/domain/blog/AuthorCard'
import BlogCard from '../../../components/domain/blog/BlogCard'
import BlogProse from '../../../components/domain/blog/BlogProse'
import { getPostsByAuthor } from '../../../content/loadBlogPosts'
import { getAuthorBySlug } from '../../../content/loadAuthors'
import NotFound from '../NotFound/NotFound'


function AuthorDetail({ params }) {
  const author = getAuthorBySlug(params.slug)
  if (!author) return <NotFound />
  const posts = getPostsByAuthor(author.slug)

  return (
    <AnimatedPage ariaLabel={`${author.name} author page`}>
      <section className='bg-white pb-20 pt-32 sm:pb-24 sm:pt-40'>
        <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <AuthorCard author={author} />
          <div className='mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]'>
            <BlogProse content={author.biography} />
            <aside className='border-t border-black/15 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0'>
              {author.location ? <p className='text-sm text-black/55'>{author.location}</p> : null}
              {author.email ? <a className='mt-4 block font-medium underline underline-offset-4' href={`mailto:${author.email}`}>{author.email}</a> : null}
              <ul className='mt-6 space-y-3'>{Object.entries(author.socials).map(([network, href]) => <li key={network}><a className='capitalize text-sm font-medium outline-none hover:opacity-55 focus-visible:ring-2 focus-visible:ring-black' href={href} rel='noreferrer' target='_blank'>{network}</a></li>)}</ul>
            </aside>
          </div>
        </div>
      </section>

      <section className='bg-neutral-50 py-20 sm:py-24'>
        <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <p className='text-xs font-semibold uppercase tracking-[0.16em] text-black/40'>Articles by {author.name}</p>
          <h2 className='mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl'>Published thinking</h2>
          {posts.length ? <div className='mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3'>{posts.map((post) => <BlogCard key={post.slug} post={post} />)}</div> : <p className='mt-10 text-lg text-black/55'>No published articles yet.</p>}
        </div>
      </section>
    </AnimatedPage>
  )
}

AuthorDetail.propTypes = { params: PropTypes.shape({ slug: PropTypes.string.isRequired }).isRequired }
export default AuthorDetail
