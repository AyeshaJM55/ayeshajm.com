import PropTypes from 'prop-types'

import { useLocale } from '../../../locales/useLocale'

function BlogTagList({ tags }) {
  const { t } = useLocale()
  if (!tags.length) return null

  return (
    <ul aria-label={t('accessibility.articleTags')} className='flex flex-wrap gap-2'>
      {tags.map((tag) => <li className='border border-black/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-black/55' key={tag}>{tag}</li>)}
    </ul>
  )
}

BlogTagList.propTypes = { tags: PropTypes.arrayOf(PropTypes.string).isRequired }
export default BlogTagList
