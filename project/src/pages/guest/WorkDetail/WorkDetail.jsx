import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
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
import { useLocale } from '../../../locales/useLocale'
import { motionDuration, motionEase, motionViewport } from '../../../motion/constants'
import { fadeUp, mediaReveal, staggerContainer } from '../../../motion/variants'
import NotFound from '../NotFound/NotFound'

function WorkDetail({ params }) {
  const reducedMotion = useReducedMotion()
  const { content, direction, formatList, formatMessage, locale, localizePath, t } = useLocale()
  const copy = content.pages['work-detail']
  const project = getProjectBySlug(params.slug, locale)

  if (!project) return <NotFound />

  const nextProject = getProjectBySlug(project.nextProjectSlug, locale)
  const relatedServices = project.services.reduce((items, slug) => {
    const service = getServiceBySlug(slug, locale)
    return service ? [...items, service] : items
  }, [])
  const NextIcon = direction === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <AnimatedPage ariaLabel={formatMessage(copy.ariaLabel, { title: project.title })}>
      <section className='overflow-hidden bg-hero-surface px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-[clamp(2.5rem,4vw,4.75rem)] lg:pb-24 lg:pt-40'>
        <motion.div animate='visible' className='mx-auto w-full max-w-[1600px]' initial={reducedMotion ? false : 'hidden'} variants={staggerContainer(reducedMotion ? 0 : 0.1, reducedMotion ? 0 : 0.04)}>
          <Breadcrumbs items={[{ href: '/portfolio', label: copy.breadcrumb }, { label: project.title }]} />
          <motion.p className='mt-10 text-xs font-semibold text-black/40' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>{project.category}</motion.p>
          <motion.h1 className='mt-5 max-w-6xl text-[clamp(3.5rem,8vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-black' transition={{ duration: reducedMotion ? 0 : motionDuration.slow, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>{project.title}</motion.h1>
          <motion.p className='mt-8 max-w-3xl text-lg leading-8 text-black/60 sm:text-xl' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>{project.summary}</motion.p>
        </motion.div>
      </section>

      <motion.div animate='visible' className='aspect-[16/8] w-full overflow-hidden bg-white' initial={reducedMotion ? false : 'hidden'} transition={{ delay: reducedMotion ? 0 : 0.12, duration: reducedMotion ? 0 : motionDuration.slow, ease: motionEase }} variants={reducedMotion ? undefined : mediaReveal}>
        <img alt={project.coverAlt || formatMessage(copy.coverAlt, { title: project.title })} className='size-full object-contain p-4 sm:p-8' height='900' src={project.coverImage} width='1200' />
      </motion.div>

      <section className='bg-white py-16 sm:py-20'><div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'><MetricStrip items={[{ label: t('labels.client'), value: project.client }, { label: t('labels.year'), value: project.year }, { label: t('labels.services'), value: formatList(relatedServices.map((service) => service.shortTitle)) }, { label: t('labels.deliverables'), value: formatList(project.deliverables) }]} /></div></section>

      <section className='bg-neutral-50 py-20 sm:py-24 lg:py-28'>
        <div className='mx-auto grid w-full max-w-[1600px] gap-16 overflow-hidden px-4 sm:px-6 lg:grid-cols-2 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <ViewportReveal direction={direction === 'rtl' ? 'left' : 'right'}><article><p className='text-xs font-semibold text-black/40'>{t('labels.challenge')}</p><h2 className='mt-5 text-4xl font-semibold tracking-[-0.045em] text-black'>{copy.challengeTitle}</h2><p className='mt-6 text-lg leading-8 text-black/60'>{project.challenge}</p></article></ViewportReveal>
          <ViewportReveal delay={0.08} direction={direction === 'rtl' ? 'right' : 'left'}><article><p className='text-xs font-semibold text-black/40'>{t('labels.approach')}</p><h2 className='mt-5 text-4xl font-semibold tracking-[-0.045em] text-black'>{copy.approachTitle}</h2><p className='mt-6 text-lg leading-8 text-black/60'>{project.approach}</p></article></ViewportReveal>
        </div>
      </section>

      <ScrollProgress className='bg-black py-20 text-white sm:py-24'>
        <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'><MediaGrid fit='contain' images={project.gallery} title={formatMessage(copy.galleryLabel, { title: project.title })} /></div>
      </ScrollProgress>

      <section className='bg-white py-20 sm:py-24'>
        <div className='mx-auto grid w-full max-w-[1600px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.55fr_1fr] lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <ViewportReveal direction={direction === 'rtl' ? 'left' : 'right'}><div><p className='text-xs font-semibold text-black/40'>{t('labels.outcome')}</p><h2 className='mt-5 text-4xl font-semibold tracking-[-0.045em] text-black'>{copy.outcomeTitle}</h2></div></ViewportReveal>
          <ViewportReveal delay={0.08}><p className='text-xl leading-9 text-black/65 sm:text-2xl sm:leading-10'>{project.outcome}</p></ViewportReveal>
        </div>
      </section>

      <section className='bg-neutral-50 py-16'>
        <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <ViewportReveal><p className='text-xs font-semibold text-black/40'>{t('labels.relatedServices')}</p></ViewportReveal>
          <StaggerGrid className='mt-6 flex flex-wrap gap-3'>
            {relatedServices.map((service) => <motion.a className='rounded-full border border-black/20 px-5 py-3 text-sm font-semibold text-black transition-colors hover:border-black' href={localizePath(`/services/${service.slug}`)} key={service.slug} transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp} whileHover={reducedMotion ? undefined : { y: -2 }}>{service.title}</motion.a>)}
          </StaggerGrid>
        </div>
      </section>

      {nextProject ? (
        <motion.a className='group grid min-h-[50svh] overflow-hidden bg-black text-white outline-none md:grid-cols-2' href={localizePath(`/work/${nextProject.slug}`)} initial={reducedMotion ? false : { opacity: 0, y: 28 }} transition={{ duration: reducedMotion ? 0 : motionDuration.slow, ease: motionEase }} viewport={motionViewport} whileInView={{ opacity: 1, y: 0 }}>
          <motion.div className='flex flex-col justify-center p-8 sm:p-12 lg:p-16' initial={reducedMotion ? false : { opacity: 0, x: direction === 'rtl' ? 24 : -24 }} transition={{ delay: reducedMotion ? 0 : 0.12, duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} viewport={motionViewport} whileInView={{ opacity: 1, x: 0 }}>
            <p className='text-xs text-white/40'>{t('labels.nextProject')}</p><h2 className='mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-7xl'>{nextProject.title}</h2><NextIcon aria-hidden='true' className='mt-10 size-10 transition-transform duration-300 group-hover:translate-x-3 rtl:group-hover:-translate-x-3' />
          </motion.div>
          <motion.div className='min-h-80 overflow-hidden bg-white' initial={reducedMotion ? false : { clipPath: direction === 'rtl' ? 'inset(0 18% 0 0)' : 'inset(0 0 0 18%)', opacity: 0 }} transition={{ delay: reducedMotion ? 0 : 0.16, duration: reducedMotion ? 0 : motionDuration.slow, ease: motionEase }} viewport={motionViewport} whileInView={{ clipPath: 'inset(0 0 0 0%)', opacity: 1 }}>
            <img alt='' aria-hidden='true' className='size-full object-contain p-6 transition-transform duration-700 group-hover:scale-[1.035] sm:p-10' height='900' src={nextProject.coverImage} width='1200' />
          </motion.div>
        </motion.a>
      ) : null}

      <ContactCta description={copy.cta.description} href='/contact' title={copy.cta.title} />
    </AnimatedPage>
  )
}

WorkDetail.propTypes = { params: PropTypes.shape({ slug: PropTypes.string.isRequired }).isRequired }
export default WorkDetail
