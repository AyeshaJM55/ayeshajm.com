import { ArrowUpRight } from 'lucide-react'

function BookNowStrip() {
  return (
    <section
      aria-labelledby='book-now-title'
      className='bg-white py-12 sm:py-16 lg:py-20'
    >
      <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
        <div className='grid min-h-[30svh] grid-cols-1 bg-black text-white md:grid-cols-[minmax(0,1fr)_minmax(220px,0.32fr)]'>
          <div className='flex flex-col items-start justify-center px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16'>
            <h2
              className='max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-6xl'
              id='book-now-title'
            >
              Bring your product to life.
            </h2>

            <p className='mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg'>
              Book a project consultation to discuss your product, visual direction, timeline, and the right 3D approach for your brand.
            </p>

            <a
              className='mt-8 inline-flex min-h-12 items-center justify-center bg-white px-7 text-sm font-semibold text-black transition-colors duration-300 hover:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black sm:min-h-14 sm:px-8 sm:text-base'
              href='/book'
            >
              Book Now
            </a>
          </div>

          <div className='flex items-stretch border-t border-white/15 md:border-l md:border-t-0'>
            <a
              aria-label='Book a project consultation'
              className='group flex min-h-48 w-full items-center justify-center bg-black text-white transition-colors duration-300 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white'
              href='/book'
            >
              <ArrowUpRight
                aria-hidden='true'
                className='size-28 stroke-[1.15] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:translate-x-2 sm:size-36 lg:size-44'
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookNowStrip
