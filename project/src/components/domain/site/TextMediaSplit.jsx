import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import useReducedMotion from '../../../hooks/useReducedMotion'
import { motionDuration, motionEase, motionViewport } from '../../../motion/constants'

function TextMediaSplit({ children, fit = 'cover', image, imageAlt, reverse = false }) {
  const reducedMotion = useReducedMotion()
  const imageClassName = fit === 'contain' ? 'size-full object-contain p-4 sm:p-7' : 'size-full object-cover'
  const textX = reverse ? 36 : -36
  const mediaX = reverse ? -36 : 36

  return (
    <div className='grid gap-10 overflow-hidden lg:grid-cols-2 lg:items-center lg:gap-16'>
      <motion.div
        className={reverse ? 'lg:order-2' : ''}
        initial={reducedMotion ? false : { opacity: 0, x: textX, y: 16 }}
        transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }}
        viewport={motionViewport}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
      >
        {children}
      </motion.div>
      <motion.div
        className={`aspect-[4/3] overflow-hidden ${fit === 'contain' ? 'bg-white' : 'bg-neutral-100'} ${reverse ? 'lg:order-1' : ''}`}
        initial={reducedMotion ? false : { clipPath: 'inset(0 0 100% 0)', opacity: 0, x: mediaX }}
        transition={{ delay: reducedMotion ? 0 : 0.08, duration: reducedMotion ? 0 : motionDuration.slow, ease: motionEase }}
        viewport={motionViewport}
        whileInView={{ clipPath: 'inset(0 0 0% 0)', opacity: 1, x: 0 }}
      >
        <img alt={imageAlt} className={imageClassName} height='900' loading='lazy' src={image} width='1200' />
      </motion.div>
    </div>
  )
}

TextMediaSplit.propTypes = {
  children: PropTypes.node.isRequired,
  fit: PropTypes.oneOf(['contain', 'cover']),
  image: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  reverse: PropTypes.bool,
}

export default TextMediaSplit
