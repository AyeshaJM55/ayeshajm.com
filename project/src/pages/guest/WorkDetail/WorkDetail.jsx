import { ArrowRight } from 'lucide-react'
import PropTypes from 'prop-types'
import Breadcrumbs from '../../../components/domain/site/Breadcrumbs'
import ContactCta from '../../../components/domain/site/ContactCta'
import MediaGrid from '../../../components/domain/site/MediaGrid'
import MetricStrip from '../../../components/domain/site/MetricStrip'
import { getProjectBySlug } from '../../../data/projects'
import { getServiceBySlug } from '../../../data/services'
import SiteLayout from '../../../layouts/SiteLayout/SiteLayout'
import NotFound from '../NotFound/NotFound'

function WorkDetail({ params }) {
  const project = getProjectBySlug(params.slug)
  if (!project) return <NotFound />
  const nextProject = getProjectBySlug(project.nextProjectSlug)
  const relatedServices = project.services.reduce((items, slug) => {
    const service = getServiceBySlug(slug)
    return service ? [...items, service] : items
  }, [])
  const relatedServiceNames = relatedServices.reduce((label, service, index) => `${label}${index > 0 ? ', ' : ''}${service.shortTitle}`, '')

  return (
    <SiteLayout>
      <main aria-label={`${project.title} project page`} id='main-content'>
        <section className='bg-hero-surface px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-[clamp(2.5rem,4vw,4.75rem)] lg:pb-24 lg:pt-40'>
          <div className='mx-auto w-full max-w-[1600px]'><Breadcrumbs items={[{ href: '/portfolio', label: 'Portfolio' }, { label: project.title }]} /><p className='mt-10 text-xs font-semibold uppercase tracking-[0.16em] text-black/40'>{project.category}</p><h1 className='mt-5 max-w-6xl text-[clamp(3.5rem,8vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-black'>{project.title}</h1><p className='mt-8 max-w-3xl text-lg leading-8 text-black/60 sm:text-xl'>{project.summary}</p></div>
        </section>

        <div className='aspect-[16/8] w-full overflow-hidden bg-neutral-100'><img alt={`${project.title} cover`} height='900' className='size-full object-cover' width='1200' src={project.coverImage} /></div>

        <section className='bg-white py-16 sm:py-20'><div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'><MetricStrip items={[{ label: 'Client', value: project.client }, { label: 'Year', value: project.year }, { label: 'Services', value: relatedServiceNames }, { label: 'Deliverables', value: project.deliverables.join(', ') }]} /></div></section>

        <section className='bg-neutral-50 py-20 sm:py-24 lg:py-28'><div className='mx-auto grid w-full max-w-[1600px] gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-[clamp(2.5rem,4vw,4.75rem)]'><article><p className='text-xs font-semibold uppercase tracking-[0.16em] text-black/40'>Challenge</p><h2 className='mt-5 text-4xl font-semibold tracking-[-0.045em] text-black'>What needed to be solved.</h2><p className='mt-6 text-lg leading-8 text-black/60'>{project.challenge}</p></article><article><p className='text-xs font-semibold uppercase tracking-[0.16em] text-black/40'>Approach</p><h2 className='mt-5 text-4xl font-semibold tracking-[-0.045em] text-black'>How the visual system was built.</h2><p className='mt-6 text-lg leading-8 text-black/60'>{project.approach}</p></article></div></section>

        <section className='bg-black py-20 text-white sm:py-24'><div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'><MediaGrid images={project.gallery} title={`${project.title} gallery`} /></div></section>

        <section className='bg-white py-20 sm:py-24'><div className='mx-auto grid w-full max-w-[1600px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.55fr_1fr] lg:px-[clamp(2.5rem,4vw,4.75rem)]'><div><p className='text-xs font-semibold uppercase tracking-[0.16em] text-black/40'>Outcome</p><h2 className='mt-5 text-4xl font-semibold tracking-[-0.045em] text-black'>Ready for real use.</h2></div><p className='text-xl leading-9 text-black/65 sm:text-2xl sm:leading-10'>{project.outcome}</p></div></section>

        <section className='bg-neutral-50 py-16'><div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'><p className='text-xs font-semibold uppercase tracking-[0.16em] text-black/40'>Related services</p><div className='mt-6 flex flex-wrap gap-3'>{relatedServices.map((service) => <a className='rounded-full border border-black/20 px-5 py-3 text-sm font-semibold text-black hover:border-black' href={`/services/${service.slug}`} key={service.slug}>{service.title}</a>)}</div></div></section>

        {nextProject ? <a className='group grid min-h-[50svh] bg-black text-white outline-none md:grid-cols-2' href={`/work/${nextProject.slug}`}><div className='flex flex-col justify-center p-8 sm:p-12 lg:p-16'><p className='text-xs uppercase tracking-[0.16em] text-white/40'>Next project</p><h2 className='mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-7xl'>{nextProject.title}</h2><ArrowRight aria-hidden='true' className='mt-10 size-10 transition-transform group-hover:translate-x-3' /></div><div className='min-h-80 overflow-hidden'><img alt='' aria-hidden='true' height='900' className='size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]' width='1200' src={nextProject.coverImage} /></div></a> : null}

        <ContactCta description='Reference this project category and share the product, timing, and intended deliverables.' title='Build the next product story.' />
      </main>
    </SiteLayout>
  )
}

WorkDetail.propTypes = { params: PropTypes.shape({ slug: PropTypes.string.isRequired }).isRequired }
export default WorkDetail
