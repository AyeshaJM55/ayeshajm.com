import { ArrowLeft, ArrowRight } from 'lucide-react'
import PropTypes from 'prop-types'
import Breadcrumbs from '../../../components/domain/site/Breadcrumbs'
import ContactCta from '../../../components/domain/site/ContactCta'
import MediaGrid from '../../../components/domain/site/MediaGrid'
import ProcessSteps from '../../../components/domain/site/ProcessSteps'
import RelatedContent from '../../../components/domain/site/RelatedContent'
import SectionHeader from '../../../components/domain/site/SectionHeader'
import { projects } from '../../../data/projects'
import { getServiceBySlug, services } from '../../../data/services'
import SiteLayout from '../../../layouts/SiteLayout/SiteLayout'
import NotFound from '../NotFound/NotFound'

function ServiceDetail({ params }) {
  const service = getServiceBySlug(params.slug)
  if (!service) return <NotFound />

  const index = services.findIndex((item) => item.slug === service.slug)
  const previous = services[(index - 1 + services.length) % services.length]
  const next = services[(index + 1) % services.length]
  const relatedProjects = projects.filter((project) => service.relatedProjectSlugs.includes(project.slug))

  return (
    <SiteLayout>
      <main aria-label={`${service.title} service page`} id='main-content'>
        <section className='bg-hero-surface px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-[clamp(2.5rem,4vw,4.75rem)] lg:pb-24 lg:pt-40'>
          <div className='mx-auto w-full max-w-[1600px]'>
            <Breadcrumbs items={[{ href: '/services', label: 'Services' }, { label: service.title }]} />
            <div className='mt-10 grid gap-12 lg:grid-cols-[0.9fr_0.75fr] lg:items-end'>
              <div><p className='text-sm font-semibold text-black/35'>{service.number}</p><h1 className='mt-5 text-[clamp(3.5rem,8vw,8rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-black'>{service.title}</h1><p className='mt-8 max-w-2xl text-lg leading-8 text-black/60 sm:text-xl'>{service.description}</p><a className='mt-8 inline-flex min-h-14 items-center bg-black px-7 text-sm font-semibold text-white' href={`/contact?service=${service.slug}`}>Inquire about this service</a></div>
              <div className='aspect-[4/3] overflow-hidden bg-neutral-200'><img alt={`${service.title} hero`} height='900' className='size-full object-cover' width='1200' src={service.heroMedia} /></div>
            </div>
          </div>
        </section>

        <section className='bg-white py-20 sm:py-24 lg:py-28'><div className='mx-auto grid w-full max-w-[1600px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.6fr_1fr] lg:px-[clamp(2.5rem,4vw,4.75rem)]'><SectionHeader eyebrow='Overview' title='What this service does.' /><p className='max-w-3xl text-xl leading-9 text-black/65 sm:text-2xl sm:leading-10'>{service.intro}</p></div></section>

        <section className='bg-neutral-50 py-20 sm:py-24'><div className='mx-auto grid w-full max-w-[1600px] gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-[clamp(2.5rem,4vw,4.75rem)]'><div><SectionHeader eyebrow='Deliverables' title='Useful outputs, clearly defined.' /><ul className='mt-10 border-t border-black/15'>{service.deliverables.map((item) => <li className='border-b border-black/15 py-4 text-lg text-black/70' key={item}>{item}</li>)}</ul></div><div><SectionHeader eyebrow='Ideal for' title='When this service fits.' /><ul className='mt-10 border-t border-black/15'>{service.idealFor.map((item) => <li className='border-b border-black/15 py-4 text-lg text-black/70' key={item}>{item}</li>)}</ul></div></div></section>

        <section className='bg-white py-20 sm:py-24 lg:py-28'><div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'><SectionHeader eyebrow='Process' title='How the work moves.' /><div className='mt-12'><ProcessSteps steps={service.process} /></div></div></section>

        <section className='bg-black py-20 text-white sm:py-24'><div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'><h2 className='mb-10 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl'>Visual showcase</h2><MediaGrid images={[service.heroMedia, service.supportingMedia, service.heroMedia]} title={`${service.title} showcase`} /></div></section>

        <RelatedContent projects={relatedProjects} />

        <section className='bg-neutral-50 py-20 sm:py-24'><div className='mx-auto w-full max-w-[1200px] px-4 sm:px-6'><SectionHeader eyebrow='FAQ' title={`${service.title} questions.`} /><div className='mt-10 divide-y divide-black/15 border-t border-black/15'>{service.faq.map((item) => <article className='py-6' key={item.question}><h3 className='text-xl font-semibold text-black'>{item.question}</h3><p className='mt-3 max-w-3xl text-base leading-7 text-black/55'>{item.answer}</p></article>)}</div></div></section>

        <nav aria-label='Service pagination' className='grid bg-white md:grid-cols-2'><a className='group flex min-h-44 items-center gap-4 border-b border-black/15 px-6 outline-none hover:bg-black hover:text-white md:border-b-0 md:border-r sm:px-10' href={`/services/${previous.slug}`}><ArrowLeft aria-hidden='true' className='size-6' /><span><span className='block text-xs uppercase tracking-[0.14em] opacity-45'>Previous service</span><span className='mt-2 block text-2xl font-semibold'>{previous.title}</span></span></a><a className='group flex min-h-44 items-center justify-end gap-4 px-6 text-right outline-none hover:bg-black hover:text-white sm:px-10' href={`/services/${next.slug}`}><span><span className='block text-xs uppercase tracking-[0.14em] opacity-45'>Next service</span><span className='mt-2 block text-2xl font-semibold'>{next.title}</span></span><ArrowRight aria-hidden='true' className='size-6' /></a></nav>

        <ContactCta description='Share the product, available assets, timeline, and intended output.' title={`Start a ${service.shortTitle.toLowerCase()} project.`} />
      </main>
    </SiteLayout>
  )
}

ServiceDetail.propTypes = { params: PropTypes.shape({ slug: PropTypes.string.isRequired }).isRequired }
export default ServiceDetail
