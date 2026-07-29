import { motion } from 'framer-motion'

import AnimatedPage from '../../../components/domain/motion/AnimatedPage'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { motionDuration, motionEase } from '../../../motion/constants'
import { fadeUp, staggerContainer } from '../../../motion/variants'

function NotFound() {
  const reducedMotion = useReducedMotion()

  return (
    <AnimatedPage ariaLabel='Page not found' className='flex min-h-[100svh] items-center bg-white px-4 pb-20 pt-32 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
        <motion.div animate='visible' className='mx-auto w-full max-w-[1600px]' initial={reducedMotion ? false : 'hidden'} variants={staggerContainer(reducedMotion ? 0 : 0.1)}>
          <motion.p className='text-xs font-semibold uppercase tracking-[0.16em] text-black/40' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>404</motion.p>
          <motion.h1 className='mt-5 max-w-5xl text-[clamp(4rem,12vw,11rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-black' transition={{ duration: reducedMotion ? 0 : motionDuration.slow, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>This render is missing.</motion.h1>
          <motion.p className='mt-8 max-w-2xl text-lg leading-8 text-black/55' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>The requested page does not exist, moved, or escaped the scene before export.</motion.p>
          <motion.div className='mt-10 flex flex-wrap gap-3' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
            <motion.a className='inline-flex min-h-14 items-center bg-black px-7 text-sm font-semibold text-white' href='/' whileHover={reducedMotion ? undefined : { y: -3 }}>Home</motion.a><motion.a className='inline-flex min-h-14 items-center border border-black px-7 text-sm font-semibold text-black' href='/portfolio' whileHover={reducedMotion ? undefined : { y: -3 }}>Portfolio</motion.a><motion.a className='inline-flex min-h-14 items-center border border-black px-7 text-sm font-semibold text-black' href='/contact' whileHover={reducedMotion ? undefined : { y: -3 }}>Contact</motion.a>
          </motion.div>
        </motion.div>
      </AnimatedPage>
  )
}

export default NotFound
