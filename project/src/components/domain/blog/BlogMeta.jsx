import PropTypes from 'prop-types'

import { useLocale } from '../../../locales/useLocale'

function BlogMeta({ author, publishedAt, readingTime, updatedAt = '' }) {
  const { formatDate, formatMessage, localizePath, t } = useLocale()
  const formattedReadingTime = formatMessage(t('common.labels.readingTime'), { count: readingTime })

  return (
    <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-black/50'>
      <a className='font-medium text-black outline-none hover:opacity-55 focus-visible:ring-2 focus-visible:ring-black' href={localizePath(`/authors/${author.slug}`)}>{author.name}</a>
      <span aria-hidden='true'>•</span>
      <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
      <span aria-hidden='true'>•</span>
      <span>{formattedReadingTime}</span>
      {updatedAt ? <><span aria-hidden='true'>•</span><span>{t('common.labels.updated', { date: formatDate(updatedAt) })}</span></> : null}
    </div>
  )
}

BlogMeta.propTypes = {
  author: PropTypes.shape({ name: PropTypes.string.isRequired, slug: PropTypes.string.isRequired }).isRequired,
  publishedAt: PropTypes.string.isRequired, readingTime: PropTypes.number.isRequired, updatedAt: PropTypes.string,
}

export default BlogMeta
