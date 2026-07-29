import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import useReducedMotion from '../../../hooks/useReducedMotion'
import { motionDuration, motionEase } from '../../../motion/constants'
import { fadeUp } from '../../../motion/variants'

function RevealItem({ children, className = '' }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }}
      variants={reducedMotion ? undefined : fadeUp}
    >
      {children}
    </motion.div>
  )
}

RevealItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default RevealItem
