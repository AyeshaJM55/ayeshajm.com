import PropTypes from 'prop-types'

import AnimatedPage from '../../../components/domain/motion/AnimatedPage'
import AuthorInline from '../../../components/domain/blog/AuthorInline'
import BlogMeta from '../../../components/domain/blog/BlogMeta'
import BlogProse from '../../../components/domain/blog/BlogProse'
import BlogTagList from '../../../components/domain/blog/BlogTagList'
import RelatedPosts from '../../../components/domain/blog/RelatedPosts'
import { getBlogPostBySlug, getRelatedPosts } from '../../../content/loadBlogPosts'
import { useLocale } from '../../../locales/useLocale'
import NotFound from '../NotFound/NotFound'

function BlogDetail({ params }) {
  const { content, formatMessage, locale, t } = useLocale()
  const post = getBlogPostBySlug(params.slug, locale)
  if (!post) return <NotFound />

  return (
    <AnimatedPage ariaLabel={formatMessage(content.pages['blog-detail'].ariaLabel, { title: post.title })}>
      <article className='bg-white pb-20 pt-32 sm:pb-24 sm:pt-40'>
        <header className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <p className='text-xs font-semibold text-black/40'>{post.category}{post.draft ? ` · ${t('labels.draftPreview')}` : ''}</p>
          <h1 className='mt-6 max-w-6xl text-[clamp(3.5rem,9vw,8.5rem)] font-semibold leading-[0.88] tracking-[-0.07em]'>{post.title}</h1>
          <p className='mt-8 max-w-3xl text-lg leading-8 text-black/55 sm:text-xl sm:leading-9'>{post.description}</p>
          <div className='mt-8'><BlogMeta author={post.author} publishedAt={post.publishedAt} readingTime={post.readingTime} updatedAt={post.updatedAt} /></div>
          <img alt={post.coverAlt} className='mt-12 aspect-[16/9] w-full bg-white object-contain' decoding='async' fetchPriority='high' height='1000' loading='eager' src={post.coverImage} width='1800' />
        </header>

        <div className='mx-auto grid w-full max-w-[1600px] gap-12 px-4 pt-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_14rem] lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <BlogProse content={post.content} />
          <aside className='lg:sticky lg:top-32 lg:self-start'><p className='mb-4 text-xs font-semibold text-black/40'>{content.pages['blog-detail'].topics}</p><BlogTagList tags={post.tags} /></aside>
        </div>

        <div className='mx-auto mt-16 w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'><AuthorInline author={post.author} /></div>
      </article>
      <RelatedPosts posts={getRelatedPosts(post, locale)} />
    </AnimatedPage>
  )
}

BlogDetail.propTypes = { params: PropTypes.shape({ slug: PropTypes.string.isRequired }).isRequired }
export default BlogDetail
