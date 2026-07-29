import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import PropTypes from 'prop-types'

import AnimatedPage from '../../../components/domain/motion/AnimatedPage'
import StaggerGrid from '../../../components/domain/motion/StaggerGrid'
import ViewportReveal from '../../../components/domain/motion/ViewportReveal'
import Breadcrumbs from '../../../components/domain/site/Breadcrumbs'
import ContactCta from '../../../components/domain/site/ContactCta'
import MediaGrid from '../../../components/domain/site/MediaGrid'
import ProcessSteps from '../../../components/domain/site/ProcessSteps'
import RelatedContent from '../../../components/domain/site/RelatedContent'
import SectionHeader from '../../../components/domain/site/SectionHeader'
import { getProjects } from '../../../data/projects'
import { getServiceBySlug, getServices } from '../../../data/services'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { useLocale } from '../../../locales/useLocale'
import { motionDuration, motionEase, motionViewport } from '../../../motion/constants'
import { fadeUp, mediaReveal, staggerContainer } from '../../../motion/variants'
import NotFound from '../NotFound/NotFound'

function ServiceDetail({ params }) {
  const reducedMotion = useReducedMotion()
  const { content, direction, formatMessage, formatNumber, locale, localizePath, t } = useLocale()
  const copy = content.pages['service-detail']
  const services = getServices(locale)
  const service = getServiceBySlug(params.slug, locale)

  if (!service) return <NotFound />

  const index = services.findIndex((item) => item.slug === service.slug)
  const previous = services[(index - 1 + services.length) % services.length]
  const next = services[(index + 1) % services.length]
  const relatedProjects = getProjects(locale).filter((project) => service.relatedProjectSlugs.includes(project.slug))
  const PreviousIcon = direction === 'rtl' ? ArrowRight : ArrowLeft
  const NextIcon = direction === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <AnimatedPage ariaLabel={formatMessage(copy.ariaLabel, { title: service.title })}>
      <section className='overflow-hidden bg-hero-surface px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-[clamp(2.5rem,4vw,4.75rem)] lg:pb-24 lg:pt-40'>
        <div className='mx-auto w-full max-w-[1600px]'>
          <Breadcrumbs items={[{ href: '/services', label: copy.breadcrumb }, { label: service.title }]} />
          <div className='mt-10 grid gap-12 lg:grid-cols-[0.9fr_0.75fr] lg:items-end'>
            <motion.div animate='visible' initial={reducedMotion ? false : 'hidden'} variants={staggerContainer(reducedMotion ? 0 : 0.1, reducedMotion ? 0 : 0.05)}>
              <motion.p className='text-sm font-semibold text-black/35' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>{formatNumber(index + 1, { minimumIntegerDigits: 2, useGrouping: false })}</motion.p>
              <motion.h1 className='mt-5 text-[clamp(3.5rem,8vw,8rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-black' transition={{ duration: reducedMotion ? 0 : motionDuration.slow, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>{service.title}</motion.h1>
              <motion.p className='mt-8 max-w-2xl text-lg leading-8 text-black/60 sm:text-xl' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>{service.description}</motion.p>
              <motion.div transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
                <motion.a className='mt-8 inline-flex min-h-14 items-center bg-black px-7 text-sm font-semibold text-white' href={localizePath(`/contact?service=${service.slug}`)} whileHover={reducedMotion ? undefined : { y: -3 }} whileTap={reducedMotion ? undefined : { scale: 0.98 }}>{copy.inquire}</motion.a>
              </motion.div>
            </motion.div>

            <motion.div animate='visible' className='aspect-[4/3] overflow-hidden bg-white' initial={reducedMotion ? false : 'hidden'} transition={{ delay: reducedMotion ? 0 : 0.16, duration: reducedMotion ? 0 : motionDuration.slow, ease: motionEase }} variants={reducedMotion ? undefined : mediaReveal}>
              <img alt={formatMessage(copy.heroAlt, { title: service.title })} className='size-full object-contain p-4 sm:p-8' height='900' src={service.heroMedia} width='1200' />
            </motion.div>
          </div>
        </div>
      </section>

      <section className='bg-white py-20 sm:py-24 lg:py-28'>
        <div className='mx-auto grid w-full max-w-[1600px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.6fr_1fr] lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <SectionHeader eyebrow={copy.overview.eyebrow} title={copy.overview.title} />
          <ViewportReveal delay={0.08}><p className='max-w-3xl text-xl leading-9 text-black/65 sm:text-2xl sm:leading-10'>{service.intro}</p></ViewportReveal>
        </div>
      </section>

      <section className='bg-neutral-50 py-20 sm:py-24'>
        <div className='mx-auto grid w-full max-w-[1600px] gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          {[
            { ...copy.deliverables, items: service.deliverables },
            { ...copy.idealFor, items: service.idealFor },
          ].map((column, columnIndex) => (
            <ViewportReveal delay={columnIndex * 0.08} direction={columnIndex === 0 ? (direction === 'rtl' ? 'left' : 'right') : (direction === 'rtl' ? 'right' : 'left')} key={column.eyebrow}>
              <div>
                <SectionHeader eyebrow={column.eyebrow} title={column.title} />
                <motion.ul className='mt-10 border-t border-black/15' initial={reducedMotion ? false : 'hidden'} variants={staggerContainer(reducedMotion ? 0 : 0.07)} viewport={motionViewport} whileInView='visible'>
                  {column.items.map((item) => <motion.li className='border-b border-black/15 py-4 text-lg text-black/70' key={item} transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>{item}</motion.li>)}
                </motion.ul>
              </div>
            </ViewportReveal>
          ))}
        </div>
      </section>

      <section className='bg-white py-20 sm:py-24 lg:py-28'>
        <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <SectionHeader eyebrow={copy.process.eyebrow} title={copy.process.title} />
          <div className='mt-12'><ProcessSteps steps={service.process} /></div>
        </div>
      </section>

      <section className='bg-black py-20 text-white sm:py-24'>
        <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <ViewportReveal><h2 className='mb-10 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl'>{copy.showcase}</h2></ViewportReveal>
          <MediaGrid fit='contain' images={[service.heroMedia, service.supportingMedia, service.heroMedia]} title={formatMessage(copy.showcaseLabel, { title: service.title })} />
        </div>
      </section>

      <RelatedContent projects={relatedProjects} />

      <section className='bg-neutral-50 py-20 sm:py-24'>
        <div className='mx-auto w-full max-w-[1200px] px-4 sm:px-6'>
          <SectionHeader eyebrow={copy.faq.eyebrow} title={formatMessage(copy.faq.title, { title: service.title })} />
          <StaggerGrid className='mt-10 divide-y divide-black/15 border-t border-black/15'>
            {service.faq.map((item) => (
              <motion.article className='py-6' key={item.question} transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
                <h3 className='text-xl font-semibold text-black'>{item.question}</h3><p className='mt-3 max-w-3xl text-base leading-7 text-black/55'>{item.answer}</p>
              </motion.article>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <motion.nav aria-label={content.accessibility.servicePagination} className='grid bg-white md:grid-cols-2' initial={reducedMotion ? false : { opacity: 0, y: 22 }} transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} viewport={motionViewport} whileInView={{ opacity: 1, y: 0 }}>
        <a className='group flex min-h-44 items-center gap-4 border-b border-black/15 px-6 outline-none transition-colors duration-300 hover:bg-black hover:text-white md:border-b-0 md:border-e sm:px-10' href={localizePath(`/services/${previous.slug}`)}><PreviousIcon aria-hidden='true' className='size-6 transition-transform duration-300 group-hover:-translate-x-2 rtl:group-hover:translate-x-2' /><span><span className='block text-xs opacity-45'>{t('labels.previousService')}</span><span className='mt-2 block text-2xl font-semibold'>{previous.title}</span></span></a>
        <a className='group flex min-h-44 items-center justify-end gap-4 px-6 text-end outline-none transition-colors duration-300 hover:bg-black hover:text-white sm:px-10' href={localizePath(`/services/${next.slug}`)}><span><span className='block text-xs opacity-45'>{t('labels.nextService')}</span><span className='mt-2 block text-2xl font-semibold'>{next.title}</span></span><NextIcon aria-hidden='true' className='size-6 transition-transform duration-300 group-hover:translate-x-2 rtl:group-hover:-translate-x-2' /></a>
      </motion.nav>

      <ContactCta description={copy.cta.description} href='/contact' title={formatMessage(copy.cta.title, { title: service.shortTitle })} />
    </AnimatedPage>
  )
}

ServiceDetail.propTypes = { params: PropTypes.shape({ slug: PropTypes.string.isRequired }).isRequired }
export default ServiceDetail
