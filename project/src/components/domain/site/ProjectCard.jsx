import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import useReducedMotion from '../../../hooks/useReducedMotion'
import { useLocale } from '../../../locales/useLocale'
import { motionDuration, motionEase, motionViewport } from '../../../motion/constants'

function ProjectCard({ project }) {
  const reducedMotion = useReducedMotion()
  const { localizePath } = useLocale()
  return (
    <motion.article initial={reducedMotion ? false : { opacity: 0, y: 24 }} transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} viewport={motionViewport} whileInView={{ opacity: 1, y: 0 }}>
      <a className='group block outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4' href={localizePath(`/work/${project.slug}`)}>
        <div className='aspect-square overflow-hidden bg-white'><motion.img alt={project.title} className='size-full object-contain p-3 sm:p-5' height='900' loading='lazy' src={project.coverImage} transition={{ duration: reducedMotion ? 0 : 0.55, ease: motionEase }} whileHover={reducedMotion ? undefined : { scale: 1.035 }} width='1200' /></div>
        <div className='flex items-start justify-between gap-5 border-t border-black/15 py-5'><div><p className='text-xs font-semibold uppercase tracking-[0.14em] text-black/40'>{project.category}</p><h3 className='mt-2 text-2xl font-semibold tracking-[-0.035em] text-black'>{project.title}</h3><p className='mt-2 max-w-xl text-sm leading-6 text-black/55'>{project.summary}</p></div><ArrowUpRight aria-hidden='true' className='mt-1 size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 rtl:-scale-x-100' /></div>
      </a>
    </motion.article>
  )
}

ProjectCard.propTypes = { project: PropTypes.shape({ category: PropTypes.string.isRequired, coverImage: PropTypes.string.isRequired, slug: PropTypes.string.isRequired, summary: PropTypes.string.isRequired, title: PropTypes.string.isRequired }).isRequired }
export default ProjectCard
