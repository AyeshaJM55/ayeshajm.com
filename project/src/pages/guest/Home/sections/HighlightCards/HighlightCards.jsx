import { useLayoutEffect, useRef } from 'react'


const highlights = [
  {
    value: '4+',
    target: 4,
    suffix: '+',
    duration: 1.7,
    label: 'Years Experience',
    description: 'Delivering polished, high-quality 3D work across products, brands, and industries.',
  },
  {
    value: '400+',
    target: 400,
    suffix: '+',
    duration: 2.2,
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
  const sectionRef = useRef(null)
  const valueRefs = useRef([])

  useLayoutEffect(() => {
    const section = sectionRef.current

    if (!section || import.meta.env.MODE === 'test') return undefined

    let context
    let cancelled = false

    async function setupAnimation() {
      const [gsapModule, scrollTriggerModule] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      if (cancelled) return

      const gsap = gsapModule.gsap ?? gsapModule.default
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger ?? scrollTriggerModule.default
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      gsap.registerPlugin(ScrollTrigger)

      context = gsap.context(() => {
        if (reduceMotion) return

        highlights.forEach((highlight, index) => {
          const element = valueRefs.current[index]
          if (!element || typeof highlight.target !== 'number') return

          element.textContent = `0${highlight.suffix}`
        })

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: 'top 72%',
          once: true,
          onEnter: () => {
            const timeline = gsap.timeline({ delay: 0.3 })

            highlights.forEach((highlight, index) => {
              const element = valueRefs.current[index]
              if (!element) return

              if (typeof highlight.target === 'number') {
                const counter = { value: 0 }

                timeline.to(
                  counter,
                  {
                    value: highlight.target,
                    duration: highlight.duration,
                    ease: 'power2.out',
                    onUpdate: () => {
                      element.textContent = `${Math.round(counter.value)}${highlight.suffix}`
                    },
                    onComplete: () => {
                      element.textContent = highlight.value
                    },
                  },
                  index * 0.16,
                )
              } else {
                timeline.fromTo(
                  element,
                  { opacity: 0, y: 14 },
                  { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
                  index * 0.16,
                )
              }
            })
          },
        })

        return () => trigger.kill()
      }, section)
    }

    setupAnimation()

    return () => {
      cancelled = true
      context?.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby='highlight-cards-title'
      className='bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-[clamp(2.5rem,4vw,4.75rem)] lg:py-24'
    >
      <div className='mx-auto w-full max-w-[1600px]'>
        <h2 id='highlight-cards-title' className='sr-only'>Experience and project highlights</h2>

        <div className='overflow-hidden bg-black text-white shadow-[0_24px_70px_rgba(0,0,0,0.14)]'>
          <div className='grid divide-y divide-white/15 md:grid-cols-3 md:divide-x md:divide-y-0'>
            {highlights.map((highlight, index) => (
              <article
                key={highlight.label}
                className='flex min-h-[290px] flex-col justify-between gap-10 p-8 sm:p-10 lg:min-h-[340px] lg:p-12'
              >
                <p
                  aria-label={highlight.value}
                  className='text-[clamp(3.5rem,7vw,5.5rem)] font-semibold leading-none tracking-[-0.055em] text-white'
                >
                  <span
                    ref={(element) => {
                      valueRefs.current[index] = element
                    }}
                    aria-hidden='true'
                  >
                    {highlight.value}
                  </span>
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
