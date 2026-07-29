import { motion } from 'framer-motion'

import AnimatedPage from '../../../components/domain/motion/AnimatedPage'
import ViewportReveal from '../../../components/domain/motion/ViewportReveal'
import PageHero from '../../../components/domain/site/PageHero'
import ProcessSteps from '../../../components/domain/site/ProcessSteps'
import SectionHeader from '../../../components/domain/site/SectionHeader'
import { site } from '../../../data/site'
import useReducedMotion from '../../../hooks/useReducedMotion'
import SiteLayout from '../../../layouts/SiteLayout/SiteLayout'
import { motionDuration, motionEase, motionViewport } from '../../../motion/constants'

const preparationSteps = [
  { title: 'Product overview', description: 'What it is, who it is for, and what stage it has reached.' },
  { title: 'Deliverables', description: 'The images, animation, formats, or campaign assets you expect.' },
  { title: 'Timeline', description: 'Launch dates, review milestones, and any immovable deadlines.' },
  { title: 'Available assets', description: 'CAD, references, measurements, photography, brand guidelines, or prototypes.' },
]

function Book() {
  const reducedMotion = useReducedMotion()

  return (
    <SiteLayout>
      <AnimatedPage ariaLabel='Book a call page'>
        <PageHero description='A short project call is useful when the product, timeline, or service mix needs discussion before a formal scope is prepared.' eyebrow='Book a call' title='Start with the product, not a sales performance.' />

        <section className='bg-white py-20 sm:py-24 lg:py-28'>
          <div className='mx-auto grid w-full max-w-[1600px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.7fr_1fr] lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            <SectionHeader description='A scheduling provider has not been connected yet, so this page avoids dressing a decorative rectangle as an appointment system.' eyebrow='Scheduling' title='Booking integration coming next.' />
            <motion.div
              className='flex min-h-[420px] flex-col items-center justify-center border border-dashed border-black/25 bg-neutral-50 p-8 text-center'
              initial={reducedMotion ? false : { opacity: 0, clipPath: 'inset(8% 8% 8% 8%)', y: 28 }}
              transition={{ duration: reducedMotion ? 0 : motionDuration.slow, ease: motionEase }}
              viewport={motionViewport}
              whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', y: 0 }}
            >
              <p className='max-w-md text-lg leading-8 text-black/60'>Until a calendar provider is connected, send a preferred date, timezone, and a short project summary by email.</p>
              <motion.a className='mt-8 inline-flex min-h-14 items-center bg-black px-7 text-sm font-semibold text-white' href={`mailto:${site.email}?subject=Project%20call%20request`} whileHover={reducedMotion ? undefined : { y: -3 }} whileTap={reducedMotion ? undefined : { scale: 0.98 }}>Request a call by email</motion.a>
            </motion.div>
          </div>
        </section>

        <ViewportReveal>
          <section className='bg-neutral-50 py-20 sm:py-24'>
            <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
              <SectionHeader eyebrow='Prepare' title='Four things worth bringing.' />
              <div className='mt-12'><ProcessSteps steps={preparationSteps} /></div>
            </div>
          </section>
        </ViewportReveal>
      </AnimatedPage>
    </SiteLayout>
  )
}

export default Book
