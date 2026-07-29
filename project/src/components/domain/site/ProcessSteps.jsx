import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import useReducedMotion from '../../../hooks/useReducedMotion'
import { motionDuration, motionEase, motionViewport } from '../../../motion/constants'
import { fadeUp, staggerContainer } from '../../../motion/variants'

function ProcessSteps({ steps }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.ol
      className='grid border-l border-t border-black/15 sm:grid-cols-2 lg:grid-cols-4'
      initial={reducedMotion ? false : 'hidden'}
      variants={staggerContainer(reducedMotion ? 0 : 0.1)}
      viewport={motionViewport}
      whileInView='visible'
    >
      {steps.map((step, index) => (
        <motion.li className='min-h-64 border-b border-r border-black/15 p-6 sm:p-8' key={step.title} transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
          <p className='text-xs font-semibold uppercase tracking-[0.16em] text-black/35'>{String(index + 1).padStart(2, '0')}</p>
          <h3 className='mt-12 text-2xl font-semibold tracking-[-0.035em] text-black'>{step.title}</h3>
          <p className='mt-4 text-sm leading-6 text-black/55'>{step.description}</p>
        </motion.li>
      ))}
    </motion.ol>
  )
}

ProcessSteps.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({ description: PropTypes.string.isRequired, title: PropTypes.string.isRequired })).isRequired,
}

export default ProcessSteps
