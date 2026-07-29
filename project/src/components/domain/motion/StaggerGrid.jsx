import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import useReducedMotion from '../../../hooks/useReducedMotion'
import { motionViewport } from '../../../motion/constants'
import { staggerContainer } from '../../../motion/variants'

function StaggerGrid({ children, className = '', delay = 0, stagger = 0.08 }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : 'hidden'}
      variants={staggerContainer(reducedMotion ? 0 : stagger, reducedMotion ? 0 : delay)}
      viewport={motionViewport}
      whileInView='visible'
    >
      {children}
    </motion.div>
  )
}

StaggerGrid.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
  stagger: PropTypes.number,
}

export default StaggerGrid
