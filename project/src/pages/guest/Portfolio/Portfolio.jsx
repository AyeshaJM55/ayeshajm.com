import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useMemo, useState } from 'react'

import AnimatedPage from '../../../components/domain/motion/AnimatedPage'
import ContactCta from '../../../components/domain/site/ContactCta'
import PageHero from '../../../components/domain/site/PageHero'
import ProjectCard from '../../../components/domain/site/ProjectCard'
import SectionHeader from '../../../components/domain/site/SectionHeader'
import { getProjectCategories, getProjects } from '../../../data/projects'
import { getServices } from '../../../data/services'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { useLocale } from '../../../locales/useLocale'
import { motionDuration, motionEase, motionViewport } from '../../../motion/constants'
import { fadeUp, staggerContainer } from '../../../motion/variants'

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all')
  const reducedMotion = useReducedMotion()
  const { content, formatMessage, formatNumber, locale, localizePath } = useLocale()
  const copy = content.pages.portfolio
  const projects = useMemo(() => getProjects(locale), [locale])
  const services = useMemo(() => getServices(locale), [locale])
  const categories = useMemo(() => getProjectCategories(locale), [locale])
  const visibleProjects = activeCategory === 'all' ? projects : projects.filter((project) => project.categoryId === activeCategory)

  return (
    <AnimatedPage ariaLabel={copy.ariaLabel}>
      <PageHero description={formatMessage(copy.hero.description, { count: projects.length })} eyebrow={copy.hero.eyebrow} title={copy.hero.title} />

      <section className='bg-white py-16 sm:py-20 lg:py-24'>
        <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <LayoutGroup id='portfolio-filters'>
            <motion.div aria-label={content.accessibility.filterProjects} className='flex flex-wrap gap-2' initial={reducedMotion ? false : { opacity: 0, y: 18 }} role='group' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} viewport={motionViewport} whileInView={{ opacity: 1, y: 0 }}>
              {categories.map((category) => {
                const active = category.id === activeCategory
                return (
                  <button aria-pressed={active} className={`relative min-h-11 overflow-hidden rounded-full border px-5 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-black ${active ? 'border-black text-white' : 'border-black/20 bg-white text-black hover:border-black'}`} key={category.id} onClick={() => setActiveCategory(category.id)} type='button'>
                    {active ? <motion.span className='absolute inset-0 bg-black' layoutId={reducedMotion ? undefined : 'portfolio-active-filter'} transition={{ duration: 0.35, ease: motionEase }} /> : null}
                    <span className='relative z-10'>{category.label}</span>
                  </button>
                )
              })}
            </motion.div>
          </LayoutGroup>

          <p aria-live='polite' className='mt-6 text-sm text-black/45'>{formatMessage(copy.results, { count: visibleProjects.length })}</p>

          <motion.div className='mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3' layout>
            <AnimatePresence mode='popLayout'>
              {visibleProjects.map((project) => (
                <motion.div animate={{ opacity: 1, scale: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, scale: 0.985 }} initial={reducedMotion ? false : { opacity: 0, y: 18 }} key={project.slug} layout transition={{ duration: reducedMotion ? 0 : 0.4, ease: motionEase }}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className='bg-neutral-50 py-20 sm:py-24 lg:py-28'>
        <div className='mx-auto grid w-full max-w-[1600px] gap-14 px-4 sm:px-6 lg:grid-cols-[0.58fr_1fr] lg:gap-24 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <SectionHeader description={copy.capabilities.description} eyebrow={copy.capabilities.eyebrow} title={copy.capabilities.title} />
          <motion.div className='border-t border-black/25' initial={reducedMotion ? false : 'hidden'} variants={staggerContainer(reducedMotion ? 0 : 0.09)} viewport={motionViewport} whileInView='visible'>
            {services.map((service, index) => (
              <motion.a className='group grid grid-cols-[3rem_minmax(0,1fr)_auto] items-start gap-4 border-b border-black/20 py-7 outline-none transition-colors hover:text-black/55 focus-visible:ring-2 focus-visible:ring-black sm:grid-cols-[4rem_0.8fr_1fr_auto] sm:gap-6' href={localizePath(`/services/${service.slug}`)} key={service.slug} transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
                <span className='pt-1 text-xs font-semibold text-black/35'>{formatNumber(index + 1, { minimumIntegerDigits: 2 })}</span><h2 className='text-xl font-semibold tracking-[-0.03em] text-black sm:text-2xl'>{service.title}</h2><p className='col-start-2 mt-2 text-sm leading-6 text-black/50 sm:col-start-auto sm:mt-0'>{service.description}</p><ArrowUpRight aria-hidden='true' className='size-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1' />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      <ContactCta description={copy.cta.description} href={localizePath('/contact')} title={copy.cta.title} />
    </AnimatedPage>
  )
}

export default Portfolio
