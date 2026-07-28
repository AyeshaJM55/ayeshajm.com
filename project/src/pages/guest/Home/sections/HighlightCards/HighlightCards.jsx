const highlights = [
  {
    value: '4+',
    label: 'Years Experience',
    description: 'Delivering polished, high-quality 3D work across products, brands, and industries.',
  },
  {
    value: '400+',
    label: 'Projects Completed',
    description: 'Helping brands and sellers present their products with clarity, detail, and impact.',
  },
  {
    value: 'Global',
    label: 'Remote Collaboration',
    description: 'Working reliably with clients across countries through clear communication and timely delivery.',
  },
]


function HighlightCards() {
  return (
    <section
      aria-labelledby='highlight-cards-title'
      className='bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-[clamp(2.5rem,4vw,4.75rem)] lg:py-24'
    >
      <div className='mx-auto w-full max-w-[1600px]'>
        <h2 id='highlight-cards-title' className='sr-only'>Experience and project highlights</h2>

        <div className='overflow-hidden bg-black text-white shadow-[0_24px_70px_rgba(0,0,0,0.14)]'>
          <div className='grid divide-y divide-white/15 md:grid-cols-3 md:divide-x md:divide-y-0'>
            {highlights.map((highlight) => (
              <article
                key={highlight.label}
                className='flex min-h-[290px] flex-col justify-between gap-10 p-8 sm:p-10 lg:min-h-[340px] lg:p-12'
              >
                <p className='text-[clamp(3.5rem,7vw,5.5rem)] font-semibold leading-none tracking-[-0.055em] text-white'>
                  {highlight.value}
                </p>

                <div>
                  <h3 className='text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl'>
                    {highlight.label}
                  </h3>
                  <p className='mt-4 max-w-md text-base leading-7 text-white/65 sm:text-lg'>
                    {highlight.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


export default HighlightCards
