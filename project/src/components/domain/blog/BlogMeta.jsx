import PropTypes from 'prop-types'


const formatDate = (date) => new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date(`${date}T00:00:00`))

function BlogMeta({ author, publishedAt, readingTime, updatedAt = '' }) {
  return (
    <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-black/50'>
      <a className='font-medium text-black outline-none hover:opacity-55 focus-visible:ring-2 focus-visible:ring-black' href={`/authors/${author.slug}`}>{author.name}</a>
      <span aria-hidden='true'>•</span>
      <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
      <span aria-hidden='true'>•</span>
      <span>{readingTime} min read</span>
      {updatedAt ? <><span aria-hidden='true'>•</span><span>Updated <time dateTime={updatedAt}>{formatDate(updatedAt)}</time></span></> : null}
    </div>
  )
}


BlogMeta.propTypes = {
  author: PropTypes.shape({ name: PropTypes.string.isRequired, slug: PropTypes.string.isRequired }).isRequired,
  publishedAt: PropTypes.string.isRequired,
  readingTime: PropTypes.number.isRequired,
  updatedAt: PropTypes.string,
}

export default BlogMeta
