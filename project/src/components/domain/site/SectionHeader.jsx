import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import useReducedMotion from '../../../hooks/useReducedMotion'
import { motionDuration, motionEase, motionViewport } from '../../../motion/constants'
import { fadeUp, staggerContainer } from '../../../motion/variants'

function SectionHeader({ description, eyebrow, title }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.header
      className='max-w-3xl'
      initial={reducedMotion ? false : 'hidden'}
      variants={staggerContainer(reducedMotion ? 0 : 0.08)}
      viewport={motionViewport}
      whileInView='visible'
    >
      {eyebrow ? <motion.p className='text-xs font-semibold uppercase tracking-[0.16em] text-black/45' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>{eyebrow}</motion.p> : null}
      <motion.h2 className='mt-4 text-4xl font-semibold tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>{title}</motion.h2>
      {description ? <motion.p className='mt-4 text-base leading-7 text-black/55 sm:text-lg sm:leading-8' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>{description}</motion.p> : null}
    </motion.header>
  )
}

SectionHeader.propTypes = {
  description: PropTypes.string,
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default SectionHeader
