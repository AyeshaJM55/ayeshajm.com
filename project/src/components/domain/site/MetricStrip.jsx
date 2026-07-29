import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import useReducedMotion from '../../../hooks/useReducedMotion'
import { motionDuration, motionEase, motionViewport } from '../../../motion/constants'
import { fadeUp, staggerContainer } from '../../../motion/variants'

function MetricStrip({ items }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.dl
      className='grid border-l border-t border-black/15 sm:grid-cols-2 lg:grid-cols-4'
      initial={reducedMotion ? false : 'hidden'}
      variants={staggerContainer(reducedMotion ? 0 : 0.09)}
      viewport={motionViewport}
      whileInView='visible'
    >
      {items.map((item) => (
        <motion.div className='border-b border-r border-black/15 p-6 sm:p-8' key={item.label} transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
          <dt className='text-xs font-semibold uppercase tracking-[0.14em] text-black/40'>{item.label}</dt>
          <dd className='mt-4 text-xl font-semibold tracking-[-0.025em] text-black'>{item.value}</dd>
        </motion.div>
      ))}
    </motion.dl>
  )
}

MetricStrip.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string.isRequired, value: PropTypes.string.isRequired })).isRequired,
}

export default MetricStrip
