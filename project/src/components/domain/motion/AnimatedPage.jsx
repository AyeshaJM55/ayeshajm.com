import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import useReducedMotion from '../../../hooks/useReducedMotion'
import { motionDuration, motionEase } from '../../../motion/constants'

function AnimatedPage({ ariaLabel, children, className = '', id = 'main-content' }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.main
      animate={{ opacity: 1, y: 0 }}
      aria-label={ariaLabel}
      className={className}
      id={id}
      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
      transition={{ duration: reducedMotion ? 0 : motionDuration.fast, ease: motionEase }}
    >
      {children}
    </motion.main>
  )
}

AnimatedPage.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
}

export default AnimatedPage
