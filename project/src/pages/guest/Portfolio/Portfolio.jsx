import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

import AnimatedPage from '../../../components/domain/motion/AnimatedPage'
import ContactCta from '../../../components/domain/site/ContactCta'
import PageHero from '../../../components/domain/site/PageHero'
import ProjectCard from '../../../components/domain/site/ProjectCard'
import SectionHeader from '../../../components/domain/site/SectionHeader'
import { projectCategories, projects } from '../../../data/projects'
import { services } from '../../../data/services'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { motionDuration, motionEase, motionViewport } from '../../../motion/constants'
import { fadeUp, staggerContainer } from '../../../motion/variants'

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')
  const reducedMotion = useReducedMotion()
  const visibleProjects = activeCategory === 'All' ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <AnimatedPage ariaLabel='Portfolio page'>
        <PageHero description={`${projects.length} selected projects across product design, e-commerce, lifestyle, material development, and photorealistic rendering.`} eyebrow='Portfolio' title='Work made to clarify, persuade, and launch.' />

        <section className='bg-white py-16 sm:py-20 lg:py-24'>
          <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            <LayoutGroup id='portfolio-filters'>
              <motion.div aria-label='Filter projects' className='flex flex-wrap gap-2' initial={reducedMotion ? false : { opacity: 0, y: 18 }} role='group' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} viewport={motionViewport} whileInView={{ opacity: 1, y: 0 }}>
                {projectCategories.map((category) => {
                  const active = category === activeCategory
                  return (
                    <button aria-pressed={active} className={`relative min-h-11 overflow-hidden rounded-full border px-5 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-black ${active ? 'border-black text-white' : 'border-black/20 bg-white text-black hover:border-black'}`} key={category} onClick={() => setActiveCategory(category)} type='button'>
                      {active ? <motion.span className='absolute inset-0 bg-black' layoutId={reducedMotion ? undefined : 'portfolio-active-filter'} transition={{ duration: 0.35, ease: motionEase }} /> : null}
                      <span className='relative z-10'>{category}</span>
                    </button>
                  )
                })}
              </motion.div>
            </LayoutGroup>

            <p aria-live='polite' className='mt-6 text-sm text-black/45'>{visibleProjects.length} project{visibleProjects.length === 1 ? '' : 's'} shown</p>

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
            <SectionHeader description='Move from a finished project into the capability behind it.' eyebrow='Capabilities' title='Explore the work by how it was made.' />
            <motion.div className='border-t border-black/25' initial={reducedMotion ? false : 'hidden'} variants={staggerContainer(reducedMotion ? 0 : 0.09)} viewport={motionViewport} whileInView='visible'>
              {services.map((service) => (
                <motion.a className='group grid grid-cols-[3rem_minmax(0,1fr)_auto] items-start gap-4 border-b border-black/20 py-7 outline-none transition-colors hover:text-black/55 focus-visible:ring-2 focus-visible:ring-black sm:grid-cols-[4rem_0.8fr_1fr_auto] sm:gap-6' href={`/services/${service.slug}`} key={service.slug} transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
                  <span className='pt-1 text-xs font-semibold tracking-[0.14em] text-black/35'>{service.number}</span><h2 className='text-xl font-semibold tracking-[-0.03em] text-black sm:text-2xl'>{service.title}</h2><p className='col-start-2 mt-2 text-sm leading-6 text-black/50 sm:col-start-auto sm:mt-0'>{service.description}</p><ArrowUpRight aria-hidden='true' className='size-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1' />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        <ContactCta description='Share the product, intended platform, and the kind of visual outcome you need.' title='Need visuals like these?' />
      </AnimatedPage>
  )
}

export default Portfolio
