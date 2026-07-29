import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import useReducedMotion from '../../../hooks/useReducedMotion'
import { motionDuration, motionEase } from '../../../motion/constants'

function Breadcrumbs({ items }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.nav
      animate={{ opacity: 1, y: 0 }}
      aria-label='Breadcrumb'
      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
      transition={{ delay: reducedMotion ? 0 : 0.04, duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }}
    >
      <ol className='flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/45'>
        {items.map((item, index) => (
          <li className='flex items-center gap-2' key={item.label}>
            {index > 0 ? <span aria-hidden='true'>/</span> : null}
            {item.href ? <a className='outline-none transition-colors hover:text-black focus-visible:ring-2 focus-visible:ring-black' href={item.href}>{item.label}</a> : <span aria-current='page'>{item.label}</span>}
          </li>
        ))}
      </ol>
    </motion.nav>
  )
}

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ href: PropTypes.string, label: PropTypes.string.isRequired })).isRequired,
}

export default Breadcrumbs
