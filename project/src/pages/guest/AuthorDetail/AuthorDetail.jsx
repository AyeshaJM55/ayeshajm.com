import PropTypes from 'prop-types'

import AnimatedPage from '../../../components/domain/motion/AnimatedPage'
import AuthorCard from '../../../components/domain/blog/AuthorCard'
import BlogCard from '../../../components/domain/blog/BlogCard'
import BlogProse from '../../../components/domain/blog/BlogProse'
import { getPostsByAuthor } from '../../../content/loadBlogPosts'
import { getAuthorBySlug } from '../../../content/loadAuthors'
import { useLocale } from '../../../locales/useLocale'
import NotFound from '../NotFound/NotFound'

function AuthorDetail({ params }) {
  const { formatMessage, locale, t } = useLocale()
  const author = getAuthorBySlug(params.slug, locale)
  if (!author) return <NotFound />
  const posts = getPostsByAuthor(author.slug, locale)

  return (
    <AnimatedPage ariaLabel={formatMessage(t('pages.author-detail.ariaLabel'), { name: author.name })}>
      <section className='bg-white pb-20 pt-32 sm:pb-24 sm:pt-40'>
        <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <AuthorCard author={author} />
          <div className='mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]'>
            <BlogProse content={author.biography} />
            <aside className='border-t border-black/15 pt-6 lg:border-s lg:border-t-0 lg:ps-8 lg:pt-0'>
              {author.location ? <p className='text-sm text-black/55'>{author.location}</p> : null}
              {author.email ? <a className='mt-4 block font-medium underline underline-offset-4' dir='ltr' href={`mailto:${author.email}`}>{author.email}</a> : null}
              <ul className='mt-6 space-y-3'>{Object.entries(author.socials).map(([network, href]) => <li key={network}><a className='text-sm font-medium outline-none hover:opacity-55 focus-visible:ring-2 focus-visible:ring-black' href={href} rel='noreferrer' target='_blank'>{author.socialLabels?.[network] ?? network}</a></li>)}</ul>
            </aside>
          </div>
        </div>
      </section>

      <section className='bg-neutral-50 py-20 sm:py-24'>
        <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <p className='text-xs font-semibold text-black/40'>{t('labels.articlesBy', { name: author.name })}</p>
          <h2 className='mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl'>{t('labels.publishedThinking')}</h2>
          {posts.length ? <div className='mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3'>{posts.map((post) => <BlogCard key={post.slug} post={post} />)}</div> : <p className='mt-10 text-lg text-black/55'>{t('labels.noPublishedArticles')}</p>}
        </div>
      </section>
    </AnimatedPage>
  )
}

AuthorDetail.propTypes = { params: PropTypes.shape({ slug: PropTypes.string.isRequired }).isRequired }
export default AuthorDetail
