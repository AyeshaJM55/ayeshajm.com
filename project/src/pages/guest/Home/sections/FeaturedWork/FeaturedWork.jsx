import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../../../../data/projects'

function FeaturedWork() {
  return (
    <section aria-labelledby='featured-work-title' className='bg-white py-16 sm:py-20 lg:py-24' id='portfolio'>
      <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
        <header className='mb-8 sm:mb-10'><h2 className='text-3xl font-semibold tracking-[-0.035em] text-black sm:text-4xl lg:text-5xl' id='featured-work-title'>Featured Work</h2><p className='mt-3 max-w-2xl text-base leading-7 text-black/55 sm:text-lg'>A selection of product visualization, rendering, and art-direction work created for digital-first brands.</p></header>
        <div className='grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 sm:py-6 lg:grid-cols-4'>
          {projects.map((project) => <article key={project.slug}><a aria-label={`Open ${project.title}`} className='group relative block aspect-square overflow-hidden bg-neutral-100 outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4' href={`/work/${project.slug}`}><img alt={project.title} height='900' className='h-full w-full object-contain object-top transition-transform duration-700 ease-out group-hover:scale-[1.06] group-focus-visible:scale-[1.06]' width='900' loading='lazy' src={project.coverImage} /><div className='absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-black/90 via-black/55 to-transparent transition-[height] duration-500 ease-out group-hover:h-[55%] group-focus-visible:h-[55%]' /><div className='absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6'><h3 className='text-xl font-semibold tracking-[-0.025em] text-white sm:text-2xl'>{project.title}</h3><p className='mt-0 max-h-0 translate-y-3 overflow-hidden text-sm leading-6 text-white/75 opacity-0 transition-all duration-500 ease-out group-hover:mt-3 group-hover:max-h-24 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:mt-3 group-focus-visible:max-h-24 group-focus-visible:translate-y-0 group-focus-visible:opacity-100'>{project.summary}</p></div><span className='absolute right-4 top-4 z-20 inline-flex size-11 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-sm shadow-black/15 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100'><span className='sr-only'>Open project</span><ArrowUpRight aria-hidden='true' size={19} strokeWidth={1.8} /></span></a></article>)}
        </div>
      </div>
      <footer className='mt-4 w-full bg-featured-footer'><div className='mx-auto flex w-full max-w-[1600px] flex-col gap-5 px-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'><p className='text-base font-medium text-black/70 sm:text-lg'>Explore more product visuals and brand-focused 3D work.</p><a className='inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-semibold text-white outline-none transition-transform duration-300 hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4' href='/portfolio'>View all projects <ArrowUpRight aria-hidden='true' size={17} strokeWidth={1.9} /></a></div></footer>
    </section>
  )
}

export default FeaturedWork
