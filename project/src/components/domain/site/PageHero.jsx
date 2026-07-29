import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import useReducedMotion from '../../../hooks/useReducedMotion'
import { motionDuration, motionEase } from '../../../motion/constants'
import { fadeUp, mediaReveal, staggerContainer } from '../../../motion/variants'

function PageHero({ actions, description, eyebrow, image, imageAlt, imageFit = 'cover', title, titleClassName }) {
  const reducedMotion = useReducedMotion()
  const imageClassName = imageFit === 'contain' ? 'size-full object-contain p-4 sm:p-8' : 'size-full object-cover'

  return (
    <section className='overflow-hidden bg-hero-surface px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-[clamp(2.5rem,4vw,4.75rem)] lg:pb-24 lg:pt-40'>
      <div className={`mx-auto grid w-full max-w-[1600px] gap-12 ${image ? 'lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.75fr)] lg:items-end' : ''}`}>
        <motion.div
          animate='visible'
          initial={reducedMotion ? false : 'hidden'}
          variants={staggerContainer(reducedMotion ? 0 : 0.1, reducedMotion ? 0 : 0.05)}
        >
          {eyebrow ? <motion.p className='text-xs font-semibold uppercase tracking-[0.16em] text-black/45' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>{eyebrow}</motion.p> : null}
          <motion.h1 className={`mt-5 font-semibold tracking-[-0.065em] text-black ${titleClassName ?? 'max-w-5xl text-[clamp(3.25rem,8vw,8.5rem)] leading-[0.9]'}`} transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>{title}</motion.h1>
          {description ? <motion.p className='mt-8 max-w-3xl text-lg leading-8 text-black/60 sm:text-xl sm:leading-9' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>{description}</motion.p> : null}
          {actions ? <motion.div className='mt-9 flex flex-wrap gap-3' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>{actions}</motion.div> : null}
        </motion.div>

        {image ? (
          <motion.div
            animate='visible'
            className={`aspect-[4/3] overflow-hidden ${imageFit === 'contain' ? 'bg-white' : 'bg-neutral-200'}`}
            initial={reducedMotion ? false : 'hidden'}
            transition={{ delay: reducedMotion ? 0 : 0.16, duration: reducedMotion ? 0 : motionDuration.slow, ease: motionEase }}
            variants={reducedMotion ? undefined : mediaReveal}
          >
            <img alt={imageAlt} className={imageClassName} height='900' src={image} width='1200' />
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}

PageHero.propTypes = {
  actions: PropTypes.node,
  description: PropTypes.string,
  eyebrow: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  imageFit: PropTypes.oneOf(['contain', 'cover']),
  title: PropTypes.string.isRequired,
  titleClassName: PropTypes.string,
}

export default PageHero
