import { motion } from 'framer-motion'

import AnimatedPage from '../../../components/domain/motion/AnimatedPage'
import ViewportReveal from '../../../components/domain/motion/ViewportReveal'
import PageHero from '../../../components/domain/site/PageHero'
import ProcessSteps from '../../../components/domain/site/ProcessSteps'
import SectionHeader from '../../../components/domain/site/SectionHeader'
import { site } from '../../../data/site'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { useLocale } from '../../../locales/useLocale'
import { motionDuration, motionEase, motionViewport } from '../../../motion/constants'

function Book() {
  const reducedMotion = useReducedMotion()
  const { content, t } = useLocale()
  const copy = content.pages.book
  const subject = encodeURIComponent(content.forms.mailSubject)

  return (
    <AnimatedPage ariaLabel={copy.ariaLabel}>
      <PageHero description={copy.hero.description} eyebrow={copy.hero.eyebrow} title={copy.hero.title} />

      <section className='bg-white py-20 sm:py-24 lg:py-28'>
        <div className='mx-auto grid w-full max-w-[1600px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.7fr_1fr] lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <SectionHeader description={copy.scheduling.description} eyebrow={copy.scheduling.eyebrow} title={copy.scheduling.title} />
          <motion.div
            className='flex min-h-[420px] flex-col items-center justify-center border border-dashed border-black/25 bg-neutral-50 p-8 text-center'
            initial={reducedMotion ? false : { opacity: 0, clipPath: 'inset(8% 8% 8% 8%)', y: 28 }}
            transition={{ duration: reducedMotion ? 0 : motionDuration.slow, ease: motionEase }}
            viewport={motionViewport}
            whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', y: 0 }}
          >
            <p className='max-w-md text-lg leading-8 text-black/60'>{copy.scheduling.body}</p>
            <motion.a className='mt-8 inline-flex min-h-14 items-center bg-black px-7 text-sm font-semibold text-white' href={`mailto:${site.email}?subject=${subject}`} whileHover={reducedMotion ? undefined : { y: -3 }} whileTap={reducedMotion ? undefined : { scale: 0.98 }}>{t('actions.requestCall')}</motion.a>
          </motion.div>
        </div>
      </section>

      <ViewportReveal>
        <section className='bg-neutral-50 py-20 sm:py-24'>
          <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            <SectionHeader eyebrow={copy.prepare.eyebrow} title={copy.prepare.title} />
            <div className='mt-12'><ProcessSteps steps={copy.prepare.items} /></div>
          </div>
        </section>
      </ViewportReveal>
    </AnimatedPage>
  )
}

export default Book
