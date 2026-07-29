import { useState } from 'react'
import ContactCta from '../../../components/domain/site/ContactCta'
import PageHero from '../../../components/domain/site/PageHero'
import ProjectCard from '../../../components/domain/site/ProjectCard'
import { projectCategories, projects } from '../../../data/projects'
import { services } from '../../../data/services'
import SiteLayout from '../../../layouts/SiteLayout/SiteLayout'

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')
  const visibleProjects = activeCategory === 'All' ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <SiteLayout>
      <main aria-label='Portfolio page' id='main-content'>
        <PageHero description={`${projects.length} selected projects across product design, e-commerce, lifestyle, material development, and photorealistic rendering.`} eyebrow='Portfolio' title='Work made to clarify, persuade, and launch.' />

        <section className='bg-white py-16 sm:py-20 lg:py-24'>
          <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            <div aria-label='Filter projects' className='flex flex-wrap gap-2' role='group'>
              {projectCategories.map((category) => <button aria-pressed={category === activeCategory} className={`min-h-11 rounded-full border px-5 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-black ${category === activeCategory ? 'border-black bg-black text-white' : 'border-black/20 bg-white text-black hover:border-black'}`} key={category} onClick={() => setActiveCategory(category)} type='button'>{category}</button>)}
            </div>
            <p aria-live='polite' className='mt-6 text-sm text-black/45'>{visibleProjects.length} project{visibleProjects.length === 1 ? '' : 's'} shown</p>
            <div className='mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3'>{visibleProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
          </div>
        </section>

        <section className='bg-neutral-50 py-20 sm:py-24'>
          <div className='mx-auto grid w-full max-w-[1600px] gap-px bg-black/15 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            {services.map((service) => <a className='group min-h-48 bg-white p-6 outline-none hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-black' href={`/services/${service.slug}`} key={service.slug}><p className='text-xs uppercase tracking-[0.14em] opacity-45'>{service.number}</p><h2 className='mt-12 text-2xl font-semibold tracking-[-0.035em]'>{service.title}</h2></a>)}
          </div>
        </section>

        <ContactCta description='Share the product, intended platform, and the kind of visual outcome you need.' title='Need visuals like these?' />
      </main>
    </SiteLayout>
  )
}

export default Portfolio
