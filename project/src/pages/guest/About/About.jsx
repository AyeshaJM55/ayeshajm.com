import { motion } from 'framer-motion'

import AnimatedPage from '../../../components/domain/motion/AnimatedPage'
import StaggerGrid from '../../../components/domain/motion/StaggerGrid'
import ViewportReveal from '../../../components/domain/motion/ViewportReveal'
import ContactCta from '../../../components/domain/site/ContactCta'
import PageHero from '../../../components/domain/site/PageHero'
import ProcessSteps from '../../../components/domain/site/ProcessSteps'
import SectionHeader from '../../../components/domain/site/SectionHeader'
import TextMediaSplit from '../../../components/domain/site/TextMediaSplit'
import studioImage from '../../../assets/featured-work/studio-renders.png'
import lifestyleImage from '../../../assets/featured-work/lifestyle-render-2.png'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { useLocale } from '../../../locales/useLocale'
import { motionDuration, motionEase, motionViewport } from '../../../motion/constants'
import { fadeUp } from '../../../motion/variants'

function About() {
  const reducedMotion = useReducedMotion()
  const { content, formatNumber, localizePath } = useLocale()
  const copy = content.pages.about

  return (
    <AnimatedPage ariaLabel={copy.ariaLabel}>
      <PageHero
        description={copy.hero.description}
        eyebrow={copy.hero.eyebrow}
        image={studioImage}
        imageAlt={copy.hero.imageAlt}
        title={copy.hero.title}
      />

      <section className='bg-white py-20 sm:py-24 lg:py-32'>
        <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <TextMediaSplit image={lifestyleImage} imageAlt={copy.perspective.imageAlt}>
            <SectionHeader description={copy.perspective.description} eyebrow={copy.perspective.eyebrow} title={copy.perspective.title} />
            <p className='mt-8 max-w-xl text-base leading-8 text-black/60'>{copy.perspective.body}</p>
          </TextMediaSplit>
        </div>
      </section>

      <section className='bg-neutral-50 py-20 sm:py-24 lg:py-28'>
        <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <SectionHeader eyebrow={copy.capabilities.eyebrow} title={copy.capabilities.title} />
          <StaggerGrid className='mt-12'>
            <ul className='border-t border-black/15'>
              {copy.capabilities.items.map((capability) => (
                <motion.li
                  className='border-b border-black/15 py-5 text-2xl font-semibold tracking-[-0.035em] text-black sm:text-3xl'
                  key={capability}
                  transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }}
                  variants={reducedMotion ? undefined : fadeUp}
                >
                  {capability}
                </motion.li>
              ))}
            </ul>
          </StaggerGrid>
        </div>
      </section>

      <section className='bg-white py-20 sm:py-24 lg:py-28'>
        <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <SectionHeader description={copy.process.description} eyebrow={copy.process.eyebrow} title={copy.process.title} />
          <div className='mt-12'><ProcessSteps steps={copy.process.items} /></div>
        </div>
      </section>

      <section className='bg-black py-20 text-white sm:py-24 lg:py-28'>
        <motion.div
          className='mx-auto grid w-full max-w-[1600px] gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:px-[clamp(2.5rem,4vw,4.75rem)]'
          initial={reducedMotion ? false : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.12 } } }}
          viewport={motionViewport}
          whileInView='visible'
        >
          {copy.principles.map((principle, index) => (
            <motion.article className='border-t border-white/25 pt-6' key={principle.title} transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
              <p className='text-xs text-white/40'>{formatNumber(index + 1, { minimumIntegerDigits: 2 })}</p>
              <h2 className='mt-12 text-3xl font-semibold tracking-[-0.04em]'>{principle.title}</h2>
              <p className='mt-4 text-base leading-7 text-white/60'>{principle.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <ViewportReveal>
        <ContactCta description={copy.cta.description} href={localizePath('/contact')} title={copy.cta.title} />
      </ViewportReveal>
    </AnimatedPage>
  )
}

export default About
