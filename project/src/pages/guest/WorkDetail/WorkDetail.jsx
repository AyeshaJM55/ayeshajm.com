import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import PropTypes from 'prop-types'

import AnimatedPage from '../../../components/domain/motion/AnimatedPage'
import ScrollProgress from '../../../components/domain/motion/ScrollProgress'
import StaggerGrid from '../../../components/domain/motion/StaggerGrid'
import ViewportReveal from '../../../components/domain/motion/ViewportReveal'
import Breadcrumbs from '../../../components/domain/site/Breadcrumbs'
import ContactCta from '../../../components/domain/site/ContactCta'
import MediaGrid from '../../../components/domain/site/MediaGrid'
import MetricStrip from '../../../components/domain/site/MetricStrip'
import { getProjectBySlug } from '../../../data/projects'
import { getServiceBySlug } from '../../../data/services'
import useReducedMotion from '../../../hooks/useReducedMotion'
import SiteLayout from '../../../layouts/SiteLayout/SiteLayout'
import { motionDuration, motionEase, motionViewport } from '../../../motion/constants'
import { fadeUp, mediaReveal, staggerContainer } from '../../../motion/variants'
import NotFound from '../NotFound/NotFound'

function WorkDetail({ params }) {
  const project = getProjectBySlug(params.slug)
  const reducedMotion = useReducedMotion()

  if (!project) return <NotFound />

  const nextProject = getProjectBySlug(project.nextProjectSlug)
  const relatedServices = project.services.reduce((items, slug) => {
    const service = getServiceBySlug(slug)
    return service ? [...items, service] : items
  }, [])
  const relatedServiceNames = relatedServices.reduce((label, service, index) => `${label}${index > 0 ? ', ' : ''}${service.shortTitle}`, '')

  return (
    <SiteLayout>
      <AnimatedPage ariaLabel={`${project.title} project page`}>
        <section className='overflow-hidden bg-hero-surface px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-[clamp(2.5rem,4vw,4.75rem)] lg:pb-24 lg:pt-40'>
          <motion.div animate='visible' className='mx-auto w-full max-w-[1600px]' initial={reducedMotion ? false : 'hidden'} variants={staggerContainer(reducedMotion ? 0 : 0.1, reducedMotion ? 0 : 0.04)}>
            <Breadcrumbs items={[{ href: '/portfolio', label: 'Portfolio' }, { label: project.title }]} />
            <motion.p className='mt-10 text-xs font-semibold uppercase tracking-[0.16em] text-black/40' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>{project.category}</motion.p>
            <motion.h1 className='mt-5 max-w-6xl text-[clamp(3.5rem,8vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-black' transition={{ duration: reducedMotion ? 0 : motionDuration.slow, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>{project.title}</motion.h1>
            <motion.p className='mt-8 max-w-3xl text-lg leading-8 text-black/60 sm:text-xl' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>{project.summary}</motion.p>
          </motion.div>
        </section>

        <motion.div animate='visible' className='aspect-[16/8] w-full overflow-hidden bg-white' initial={reducedMotion ? false : 'hidden'} transition={{ delay: reducedMotion ? 0 : 0.12, duration: reducedMotion ? 0 : motionDuration.slow, ease: motionEase }} variants={reducedMotion ? undefined : mediaReveal}>
          <img alt={`${project.title} cover`} className='size-full object-contain p-4 sm:p-8' height='900' src={project.coverImage} width='1200' />
        </motion.div>

        <section className='bg-white py-16 sm:py-20'><div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'><MetricStrip items={[{ label: 'Client', value: project.client }, { label: 'Year', value: project.year }, { label: 'Services', value: relatedServiceNames }, { label: 'Deliverables', value: project.deliverables.join(', ') }]} /></div></section>

        <section className='bg-neutral-50 py-20 sm:py-24 lg:py-28'>
          <div className='mx-auto grid w-full max-w-[1600px] gap-16 overflow-hidden px-4 sm:px-6 lg:grid-cols-2 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            <ViewportReveal direction='right'><article><p className='text-xs font-semibold uppercase tracking-[0.16em] text-black/40'>Challenge</p><h2 className='mt-5 text-4xl font-semibold tracking-[-0.045em] text-black'>What needed to be solved.</h2><p className='mt-6 text-lg leading-8 text-black/60'>{project.challenge}</p></article></ViewportReveal>
            <ViewportReveal delay={0.08} direction='left'><article><p className='text-xs font-semibold uppercase tracking-[0.16em] text-black/40'>Approach</p><h2 className='mt-5 text-4xl font-semibold tracking-[-0.045em] text-black'>How the visual system was built.</h2><p className='mt-6 text-lg leading-8 text-black/60'>{project.approach}</p></article></ViewportReveal>
          </div>
        </section>

        <ScrollProgress className='bg-black py-20 text-white sm:py-24'>
          <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'><MediaGrid fit='contain' images={project.gallery} title={`${project.title} gallery`} /></div>
        </ScrollProgress>

        <section className='bg-white py-20 sm:py-24'>
          <div className='mx-auto grid w-full max-w-[1600px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.55fr_1fr] lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            <ViewportReveal direction='right'><div><p className='text-xs font-semibold uppercase tracking-[0.16em] text-black/40'>Outcome</p><h2 className='mt-5 text-4xl font-semibold tracking-[-0.045em] text-black'>Ready for real use.</h2></div></ViewportReveal>
            <ViewportReveal delay={0.08}><p className='text-xl leading-9 text-black/65 sm:text-2xl sm:leading-10'>{project.outcome}</p></ViewportReveal>
          </div>
        </section>

        <section className='bg-neutral-50 py-16'>
          <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            <ViewportReveal><p className='text-xs font-semibold uppercase tracking-[0.16em] text-black/40'>Related services</p></ViewportReveal>
            <StaggerGrid className='mt-6 flex flex-wrap gap-3'>
              {relatedServices.map((service) => <motion.a className='rounded-full border border-black/20 px-5 py-3 text-sm font-semibold text-black transition-colors hover:border-black' href={`/services/${service.slug}`} key={service.slug} transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp} whileHover={reducedMotion ? undefined : { y: -2 }}>{service.title}</motion.a>)}
            </StaggerGrid>
          </div>
        </section>

        {nextProject ? (
          <motion.a className='group grid min-h-[50svh] overflow-hidden bg-black text-white outline-none md:grid-cols-2' href={`/work/${nextProject.slug}`} initial={reducedMotion ? false : { opacity: 0, y: 28 }} transition={{ duration: reducedMotion ? 0 : motionDuration.slow, ease: motionEase }} viewport={motionViewport} whileInView={{ opacity: 1, y: 0 }}>
            <motion.div className='flex flex-col justify-center p-8 sm:p-12 lg:p-16' initial={reducedMotion ? false : { opacity: 0, x: -24 }} transition={{ delay: reducedMotion ? 0 : 0.12, duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} viewport={motionViewport} whileInView={{ opacity: 1, x: 0 }}>
              <p className='text-xs uppercase tracking-[0.16em] text-white/40'>Next project</p><h2 className='mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-7xl'>{nextProject.title}</h2><ArrowRight aria-hidden='true' className='mt-10 size-10 transition-transform duration-300 group-hover:translate-x-3' />
            </motion.div>
            <motion.div className='min-h-80 overflow-hidden bg-white' initial={reducedMotion ? false : { clipPath: 'inset(0 0 0 18%)', opacity: 0 }} transition={{ delay: reducedMotion ? 0 : 0.16, duration: reducedMotion ? 0 : motionDuration.slow, ease: motionEase }} viewport={motionViewport} whileInView={{ clipPath: 'inset(0 0 0 0%)', opacity: 1 }}>
              <img alt='' aria-hidden='true' className='size-full object-contain p-6 transition-transform duration-700 group-hover:scale-[1.035] sm:p-10' height='900' src={nextProject.coverImage} width='1200' />
            </motion.div>
          </motion.a>
        ) : null}

        <ContactCta description='Reference this project category and share the product, timing, and intended deliverables.' title='Build the next product story.' />
      </AnimatedPage>
    </SiteLayout>
  )
}

WorkDetail.propTypes = { params: PropTypes.shape({ slug: PropTypes.string.isRequired }).isRequired }

export default WorkDetail
