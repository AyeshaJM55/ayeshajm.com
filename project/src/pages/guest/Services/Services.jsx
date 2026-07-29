import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useMemo } from 'react'

import AnimatedPage from '../../../components/domain/motion/AnimatedPage'
import StaggerGrid from '../../../components/domain/motion/StaggerGrid'
import ContactCta from '../../../components/domain/site/ContactCta'
import PageHero from '../../../components/domain/site/PageHero'
import ProjectCard from '../../../components/domain/site/ProjectCard'
import SectionHeader from '../../../components/domain/site/SectionHeader'
import TextMediaSplit from '../../../components/domain/site/TextMediaSplit'
import { getProjects } from '../../../data/projects'
import { getServices } from '../../../data/services'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { useLocale } from '../../../locales/useLocale'
import { motionDuration, motionEase, motionViewport } from '../../../motion/constants'
import { fadeUp, staggerContainer } from '../../../motion/variants'

function Services() {
  const reducedMotion = useReducedMotion()
  const { content, formatNumber, locale, localizePath, t } = useLocale()
  const copy = content.pages.services
  const services = useMemo(() => getServices(locale), [locale])
  const projects = useMemo(() => getProjects(locale), [locale])
  const showcaseImages = [projects[0]?.coverImage, projects[1]?.coverImage, projects[5]?.coverImage, projects[2]?.coverImage]

  return (
    <AnimatedPage ariaLabel={copy.ariaLabel}>
      <PageHero
        actions={<motion.a className='inline-flex min-h-14 items-center bg-black px-7 text-sm font-semibold text-white outline-none hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4' href={localizePath('/contact')} whileHover={reducedMotion ? undefined : { y: -3 }} whileTap={reducedMotion ? undefined : { scale: 0.98 }}>{t('actions.discussProject')}</motion.a>}
        description={copy.hero.description}
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
      />

      <section className='bg-white py-20 sm:py-24 lg:py-32'>
        <div className='mx-auto w-full max-w-[1600px] space-y-24 px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          {services.map((service, index) => (
            <TextMediaSplit fit='contain' image={showcaseImages[index]} imageAlt={copy.featuredWorkAlt.replace('{title}', service.title)} key={service.slug} reverse={index % 2 === 1}>
              <p className='text-xs font-semibold text-black/40'>{formatNumber(index + 1, { minimumIntegerDigits: 2 })}</p>
              <h2 className='mt-5 text-4xl font-semibold tracking-[-0.05em] text-black sm:text-5xl lg:text-6xl'>{service.title}</h2>
              <p className='mt-5 max-w-xl text-base leading-8 text-black/60'>{service.description}</p>
              <ul className='mt-8 border-t border-black/15'>{service.deliverables.slice(0, 3).map((item) => <li className='border-b border-black/15 py-3 text-sm text-black/65' key={item}>{item}</li>)}</ul>
              <a className='group mt-8 inline-flex min-h-14 items-center justify-center gap-3 bg-black px-8 text-base font-semibold text-white transition-colors duration-300 hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4' href={localizePath(`/services/${service.slug}`)}>{t('actions.exploreService')} <ArrowUpRight aria-hidden='true' className='size-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1' /></a>
            </TextMediaSplit>
          ))}
        </div>
      </section>

      <section className='bg-neutral-50 py-20 sm:py-24 lg:py-28'>
        <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <SectionHeader description={copy.combined.description} eyebrow={copy.combined.eyebrow} title={copy.combined.title} />
          <motion.div className='mt-12 grid gap-px bg-black/15 md:grid-cols-2 lg:grid-cols-4' initial={reducedMotion ? false : 'hidden'} variants={staggerContainer(reducedMotion ? 0 : 0.1)} viewport={motionViewport} whileInView='visible'>
            {copy.combined.packages.map((item) => (
              <motion.div className='group min-h-44 bg-white p-6 sm:p-8' key={item} transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
                <h3 className='text-2xl font-semibold tracking-[-0.035em] text-black'>{item}</h3><span aria-hidden='true' className='mt-8 block h-px w-0 bg-black transition-all duration-500 group-hover:w-full' />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className='bg-white py-20 sm:py-24 lg:py-28'>
        <div className='mx-auto grid w-full max-w-[1600px] gap-14 px-4 sm:px-6 lg:grid-cols-[0.56fr_1fr] lg:gap-24 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <SectionHeader description={copy.process.description} eyebrow={copy.process.eyebrow} title={copy.process.title} />
          <motion.ol className='border-t border-black/25' initial={reducedMotion ? false : 'hidden'} variants={staggerContainer(reducedMotion ? 0 : 0.1)} viewport={motionViewport} whileInView='visible'>
            {copy.process.items.map((step, index) => (
              <motion.li className='grid grid-cols-[3rem_minmax(0,1fr)] gap-5 border-b border-black/20 py-7 sm:grid-cols-[4.5rem_0.72fr_1fr] sm:gap-7 sm:py-9' key={step.title} transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
                <span className='pt-1 text-sm font-semibold text-black/35'>{formatNumber(index + 1, { minimumIntegerDigits: 2 })}</span><h3 className='text-2xl font-semibold tracking-[-0.035em] text-black'>{step.title}</h3><p className='col-start-2 text-base leading-7 text-black/55 sm:col-start-auto'>{step.description}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      <section className='bg-neutral-50 py-20 sm:py-24 lg:py-28'>
        <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <SectionHeader eyebrow={copy.related.eyebrow} title={copy.related.title} />
          <StaggerGrid className='mt-12 grid gap-8 md:grid-cols-3'>{projects.slice(0, 3).map((project) => <ProjectCard key={project.slug} project={project} />)}</StaggerGrid>
        </div>
      </section>

      <ContactCta description={copy.cta.description} href={localizePath('/contact')} title={copy.cta.title} />
    </AnimatedPage>
  )
}

export default Services
