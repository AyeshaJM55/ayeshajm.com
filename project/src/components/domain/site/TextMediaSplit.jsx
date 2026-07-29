import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import useReducedMotion from '../../../hooks/useReducedMotion'
import { motionDuration, motionEase, motionViewport } from '../../../motion/constants'


function TextMediaSplit({ children, fit = 'cover', image, imageAlt, reverse = false }) {
  const reducedMotion = useReducedMotion()
  const primaryImageClassName = fit === 'contain' ? 'size-full object-contain p-5 sm:p-8' : 'size-full object-cover'
  const textX = reverse ? 36 : -36

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

      <div className={`aspect-[4/3] overflow-hidden bg-neutral-100 ${reverse ? 'lg:order-1' : ''}`}>
        <img
          alt={imageAlt}
          className={primaryImageClassName}
          decoding='async'
          height='900'
          loading='lazy'
          src={image}
          width='1200'
        />
      </div>
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
