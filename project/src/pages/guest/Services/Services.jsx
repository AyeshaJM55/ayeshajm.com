import { ArrowUpRight } from 'lucide-react'

import ContactCta from '../../../components/domain/site/ContactCta'
import PageHero from '../../../components/domain/site/PageHero'
import ProjectCard from '../../../components/domain/site/ProjectCard'
import SectionHeader from '../../../components/domain/site/SectionHeader'
import TextMediaSplit from '../../../components/domain/site/TextMediaSplit'
import { projects } from '../../../data/projects'
import { services } from '../../../data/services'
import SiteLayout from '../../../layouts/SiteLayout/SiteLayout'

const engagementProcess = [
  { title: 'Brief', description: 'Clarify goals, usage, assets, timing, and the decisions the visuals need to support.' },
  { title: 'Direction', description: 'Align on references, composition, materials, environments, and motion language.' },
  { title: 'Production', description: 'Build and refine the required models, scenes, images, and animation.' },
  { title: 'Delivery', description: 'Prepare final formats, variants, crops, and reusable project assets.' },
]

function Services() {
  return (
    <SiteLayout>
      <main aria-label='Services page' id='main-content'>
        <PageHero
          actions={<a className='inline-flex min-h-14 items-center bg-black px-7 text-sm font-semibold text-white outline-none hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4' href='/contact'>Discuss a project</a>}
          description='From product geometry to campaign imagery, services can stand alone or combine into a complete launch-ready visual system.'
          eyebrow='Services'
          title='Product visuals built from the inside out.'
        />

        <section className='bg-white py-20 sm:py-24 lg:py-32'>
          <div className='mx-auto w-full max-w-[1600px] space-y-24 px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            {services.map((service, index) => (
              <TextMediaSplit fit='contain' image={service.heroMedia} imageAlt={`${service.title} example`} key={service.slug} reverse={index % 2 === 1}>
                <p className='text-xs font-semibold uppercase tracking-[0.16em] text-black/40'>{service.number}</p>
                <h2 className='mt-5 text-4xl font-semibold tracking-[-0.05em] text-black sm:text-5xl lg:text-6xl'>{service.title}</h2>
                <p className='mt-5 max-w-xl text-base leading-8 text-black/60'>{service.description}</p>
                <ul className='mt-8 border-t border-black/15'>
                  {service.deliverables.slice(0, 3).map((item) => <li className='border-b border-black/15 py-3 text-sm text-black/65' key={item}>{item}</li>)}
                </ul>
                <a className='group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-black outline-none focus-visible:ring-2 focus-visible:ring-black' href={`/services/${service.slug}`}>
                  Explore service
                  <ArrowUpRight aria-hidden='true' className='size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1' />
                </a>
              </TextMediaSplit>
            ))}
          </div>
        </section>

        <section className='bg-neutral-50 py-20 sm:py-24 lg:py-28'>
          <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            <SectionHeader
              description='Modeling, stills, lifestyle imagery, and motion can be scoped as one connected production instead of four disconnected handoffs.'
              eyebrow='Combined engagements'
              title='One product. A complete visual system.'
            />
            <div className='mt-12 grid gap-px bg-black/15 md:grid-cols-2 lg:grid-cols-4'>
              {['Product launch package', 'E-commerce image suite', 'Campaign CGI package', 'Animation and stills package'].map((item) => (
                <div className='min-h-44 bg-white p-6 sm:p-8' key={item}>
                  <h3 className='text-2xl font-semibold tracking-[-0.035em] text-black'>{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className='bg-white py-20 sm:py-24 lg:py-28'>
          <div className='mx-auto grid w-full max-w-[1600px] gap-14 px-4 sm:px-6 lg:grid-cols-[0.56fr_1fr] lg:gap-24 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            <SectionHeader
              description='Each checkpoint resolves a different kind of risk before the final assets are produced.'
              eyebrow='Process'
              title='A clear route from brief to delivery.'
            />

            <ol className='border-t border-black/25'>
              {engagementProcess.map((step, index) => (
                <li className='grid grid-cols-[3rem_minmax(0,1fr)] gap-5 border-b border-black/20 py-7 sm:grid-cols-[4.5rem_0.72fr_1fr] sm:gap-7 sm:py-9' key={step.title}>
                  <span className='pt-1 text-sm font-semibold tracking-[0.12em] text-black/35'>{String(index + 1).padStart(2, '0')}</span>
                  <h3 className='text-2xl font-semibold tracking-[-0.035em] text-black'>{step.title}</h3>
                  <p className='col-start-2 text-base leading-7 text-black/55 sm:col-start-auto'>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className='bg-neutral-50 py-20 sm:py-24 lg:py-28'>
          <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            <SectionHeader eyebrow='Related work' title='See the services in context.' />
            <div className='mt-12 grid gap-8 md:grid-cols-3'>
              {projects.slice(0, 3).map((project) => <ProjectCard key={project.slug} project={project} />)}
            </div>
          </div>
        </section>

        <ContactCta description='Share the product, launch date, and intended deliverables. The right service mix can be shaped from there.' title='Not sure which service fits?' />
      </main>
    </SiteLayout>
  )
}

export default Services
