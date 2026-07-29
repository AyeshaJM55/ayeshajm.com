import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import useReducedMotion from '../../../hooks/useReducedMotion'
import { motionDuration, motionEase, motionViewport } from '../../../motion/constants'

function ContactCta({ description, href = '/contact', label = 'Start a project', title }) {
  const reducedMotion = useReducedMotion()

  return (
    <section className='overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-[clamp(2.5rem,4vw,4.75rem)] lg:py-24'>
      <motion.div
        className='mx-auto grid min-h-[36svh] w-full max-w-[1600px] bg-black text-white md:grid-cols-[minmax(0,1fr)_14rem]'
        initial={reducedMotion ? false : { opacity: 0, y: 30 }}
        transition={{ duration: reducedMotion ? 0 : motionDuration.slow, ease: motionEase }}
        viewport={motionViewport}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className='flex flex-col justify-center p-8 sm:p-12 lg:p-16'
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          transition={{ delay: reducedMotion ? 0 : 0.14, duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }}
          viewport={motionViewport}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className='max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-7xl'>{title}</h2>
          <p className='mt-5 max-w-2xl text-base leading-7 text-white/60 sm:text-lg'>{description}</p>
        </motion.div>
        <motion.a
          aria-label={label}
          className='group flex min-h-52 items-center justify-center border-t border-white/15 outline-none transition-colors duration-300 hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white md:border-l md:border-t-0'
          href={href}
          initial={reducedMotion ? false : { clipPath: 'inset(0 0 0 100%)', opacity: 0 }}
          transition={{ delay: reducedMotion ? 0 : 0.2, duration: reducedMotion ? 0 : motionDuration.slow, ease: motionEase }}
          viewport={motionViewport}
          whileInView={{ clipPath: 'inset(0 0 0 0%)', opacity: 1 }}
        >
          <ArrowUpRight aria-hidden='true' className='size-28 stroke-[1.1] transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2 group-focus-visible:-translate-y-2 group-focus-visible:translate-x-2' />
        </motion.a>
      </motion.div>
    </section>
  )
}

ContactCta.propTypes = {
  description: PropTypes.string.isRequired,
  href: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default ContactCta
