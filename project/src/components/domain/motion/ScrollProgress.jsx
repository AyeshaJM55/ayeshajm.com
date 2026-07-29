import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import PropTypes from 'prop-types'
import { useRef } from 'react'

import useReducedMotion from '../../../hooks/useReducedMotion'

function ScrollProgress({ children, className = '' }) {
  const targetRef = useRef(null)
  const progressRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start end', 'end start'] })
  const scaleX = useSpring(scrollYProgress, { damping: 28, stiffness: 180 })

  useMotionValueEvent(scaleX, 'change', (latest) => {
    if (progressRef.current) progressRef.current.style.transform = `scaleX(${latest})`
  })

  return (
    <div className={`relative ${className}`} ref={targetRef}>
      {reducedMotion ? null : <motion.div aria-hidden='true' className='absolute start-0 top-0 z-10 h-px w-full origin-left rtl:origin-right scale-x-0 bg-current' ref={progressRef} />}
      {children}
    </div>
  )
}

ScrollProgress.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default ScrollProgress
