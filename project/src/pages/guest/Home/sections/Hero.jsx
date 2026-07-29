import { motion } from 'framer-motion'

import heroImage from '../../../../assets/featured-work/render-1.png'
import { useLocale } from '../../../../locales/useLocale'

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

function Hero() {
  const { content, localizePath } = useLocale()
  const copy = content.pages.home.hero

  return (
    <section
      aria-labelledby='hero-title'
      className='relative flex min-h-[calc(100svh+96px)] overflow-hidden bg-hero-surface px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:items-center lg:px-[clamp(2.5rem,4vw,4.75rem)] lg:pb-12 lg:pt-28'
    >
      <div className='mx-auto grid w-full max-w-[1920px] gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.85fr)] lg:items-center lg:gap-10 xl:gap-20'>
        <motion.div
          animate='visible'
          className='relative z-10 flex flex-col justify-center lg:min-h-[720px]'
          initial='hidden'
          transition={{ staggerChildren: 0.12, delayChildren: 0.08 }}
        >
          <motion.h1
            className='max-w-[760px] text-[clamp(2.75rem,7vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-black'
            id='hero-title'
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            variants={reveal}
          >
            {copy.title}
          </motion.h1>

          <motion.p
            className='mt-7 max-w-[650px] text-[clamp(1.125rem,2.3vw,1.75rem)] leading-[1.35] text-hero-ink'
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            variants={reveal}
          >
            {copy.description}
          </motion.p>

          <motion.div className='mt-10 h-px w-32 bg-hero-ink sm:w-36' transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} variants={reveal} />

          <motion.div className='mt-7' transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} variants={reveal}>
            <motion.a
              className='inline-flex min-h-14 items-center justify-center rounded-full bg-black px-8 text-base font-medium text-white outline-none transition-colors hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 sm:min-h-16 sm:min-w-64 sm:text-xl'
              href={localizePath('/portfolio')}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              {copy.cta}
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className='relative mx-auto flex w-full items-center justify-center'
          initial={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className='relative aspect-square w-full max-w-[680px] overflow-hidden rounded-full lg:w-[min(42vw,680px)]' transition={{ duration: 0.45, ease: 'easeOut' }} whileHover={{ scale: 0.985 }}>
            <img alt={copy.imageAlt} className='absolute inset-0 h-full w-full rotate-45 scale-[1.08] object-cover object-center' fetchPriority='high' src={heroImage} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
