import { ArrowUpRight } from 'lucide-react'
import PropTypes from 'prop-types'

import { useLocale } from '../../../locales/useLocale'

function AuthorInline({ author }) {
  const { localizePath, t } = useLocale()

  return (
    <a className='group grid gap-5 border-y border-black/15 py-8 outline-none focus-visible:ring-2 focus-visible:ring-black sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:items-center' href={localizePath(`/authors/${author.slug}`)}>
      <img alt={author.avatarAlt} className='size-20 rounded-full object-cover' height='160' loading='eager' src={author.avatar} width='160' />
      <div>
        <p className='text-xs font-semibold uppercase tracking-[0.14em] text-black/40'>{t('common.labels.writtenBy')}</p>
        <h2 className='mt-2 text-2xl font-semibold tracking-[-0.035em]'>{author.name}</h2>
        <p className='mt-2 max-w-2xl text-sm leading-6 text-black/55'>{author.shortBio}</p>
      </div>
      <ArrowUpRight aria-hidden='true' className='size-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1 rtl:group-focus-visible:-translate-x-1' />
    </a>
  )
}

AuthorInline.propTypes = { author: PropTypes.object.isRequired }
export default AuthorInline
