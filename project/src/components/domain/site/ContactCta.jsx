import { ArrowUpRight } from 'lucide-react'
import PropTypes from 'prop-types'

function ContactCta({ description, href = '/contact', label = 'Start a project', title }) {
  return (
    <section className='bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-[clamp(2.5rem,4vw,4.75rem)] lg:py-24'>
      <div className='mx-auto grid min-h-[36svh] w-full max-w-[1600px] bg-black text-white md:grid-cols-[minmax(0,1fr)_14rem]'>
        <div className='flex flex-col justify-center p-8 sm:p-12 lg:p-16'>
          <h2 className='max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-7xl'>{title}</h2>
          <p className='mt-5 max-w-2xl text-base leading-7 text-white/60 sm:text-lg'>{description}</p>
        </div>
        <a aria-label={label} className='group flex min-h-52 items-center justify-center border-t border-white/15 outline-none hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white md:border-l md:border-t-0' href={href}>
          <ArrowUpRight aria-hidden='true' className='size-28 stroke-[1.1] transition-transform group-hover:-translate-y-2 group-hover:translate-x-2' />
        </a>
      </div>
    </section>
  )
}

ContactCta.propTypes = {
  description: PropTypes.string.isRequired,
  href: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default ContactCta
