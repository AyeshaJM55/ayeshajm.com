import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import useReducedMotion from '../../../hooks/useReducedMotion'
import { motionDuration, motionEase, motionViewport } from '../../../motion/constants'

const offsets = {
  down: { x: 0, y: -28 },
  left: { x: 34, y: 0 },
  right: { x: -34, y: 0 },
  up: { x: 0, y: 28 },
}

function ViewportReveal({ amount = motionViewport.amount, children, className = '', delay = 0, direction = 'up', distance, duration = motionDuration.base, once = true }) {
  const reducedMotion = useReducedMotion()
  const offset = offsets[direction]
  const initialOffset = distance === undefined
    ? offset
    : {
        x: offset.x === 0 ? 0 : Math.sign(offset.x) * distance,
        y: offset.y === 0 ? 0 : Math.sign(offset.y) * distance,
      }

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, ...initialOffset }}
      transition={{ delay, duration: reducedMotion ? 0 : duration, ease: motionEase }}
      viewport={{ amount, margin: motionViewport.margin, once }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
    >
      {children}
    </motion.div>
  )
}

ViewportReveal.propTypes = {
  amount: PropTypes.number,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
  direction: PropTypes.oneOf(['down', 'left', 'right', 'up']),
  distance: PropTypes.number,
  duration: PropTypes.number,
  once: PropTypes.bool,
}

export default ViewportReveal
