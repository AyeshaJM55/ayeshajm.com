import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

import ContactCta from '../../../components/domain/site/ContactCta'
import PageHero from '../../../components/domain/site/PageHero'
import ProjectCard from '../../../components/domain/site/ProjectCard'
import SectionHeader from '../../../components/domain/site/SectionHeader'
import { projectCategories, projects } from '../../../data/projects'
import { services } from '../../../data/services'
import SiteLayout from '../../../layouts/SiteLayout/SiteLayout'

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')
  const visibleProjects = activeCategory === 'All' ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <SiteLayout>
      <main aria-label='Portfolio page' id='main-content'>
        <PageHero
          description={`${projects.length} selected projects across product design, e-commerce, lifestyle, material development, and photorealistic rendering.`}
          eyebrow='Portfolio'
          title='Work made to clarify, persuade, and launch.'
        />

        <section className='bg-white py-16 sm:py-20 lg:py-24'>
          <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            <div aria-label='Filter projects' className='flex flex-wrap gap-2' role='group'>
              {projectCategories.map((category) => (
                <button
                  aria-pressed={category === activeCategory}
                  className={`min-h-11 rounded-full border px-5 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-black ${category === activeCategory ? 'border-black bg-black text-white' : 'border-black/20 bg-white text-black hover:border-black'}`}
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  type='button'
                >
                  {category}
                </button>
              ))}
            </div>

            <p aria-live='polite' className='mt-6 text-sm text-black/45'>
              {visibleProjects.length} project{visibleProjects.length === 1 ? '' : 's'} shown
            </p>

            <div className='mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3'>
              {visibleProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
            </div>
          </div>
        </section>

        <section className='bg-neutral-50 py-20 sm:py-24 lg:py-28'>
          <div className='mx-auto grid w-full max-w-[1600px] gap-14 px-4 sm:px-6 lg:grid-cols-[0.58fr_1fr] lg:gap-24 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            <SectionHeader
              description='Move from a finished project into the capability behind it.'
              eyebrow='Capabilities'
              title='Explore the work by how it was made.'
            />

            <div className='border-t border-black/25'>
              {services.map((service) => (
                <a
                  className='group grid grid-cols-[3rem_minmax(0,1fr)_auto] items-start gap-4 border-b border-black/20 py-7 outline-none transition-colors hover:text-black/55 focus-visible:ring-2 focus-visible:ring-black sm:grid-cols-[4rem_0.8fr_1fr_auto] sm:gap-6'
                  href={`/services/${service.slug}`}
                  key={service.slug}
                >
                  <span className='pt-1 text-xs font-semibold tracking-[0.14em] text-black/35'>{service.number}</span>
                  <h2 className='text-xl font-semibold tracking-[-0.03em] text-black sm:text-2xl'>{service.title}</h2>
                  <p className='col-start-2 mt-2 text-sm leading-6 text-black/50 sm:col-start-auto sm:mt-0'>{service.description}</p>
                  <ArrowUpRight aria-hidden='true' className='size-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1' />
                </a>
              ))}
            </div>
          </div>
        </section>

        <ContactCta description='Share the product, intended platform, and the kind of visual outcome you need.' title='Need visuals like these?' />
      </main>
    </SiteLayout>
  )
}

export default Portfolio
