import { useLayoutEffect, useRef } from 'react'

import { useLocale } from '../../../../../locales/useLocale'

const animationConfig = [
  { duration: 1.7, suffix: '+', target: 4 },
  { duration: 2.2, suffix: '+', target: 400 },
  {},
]

function HighlightCards() {
  const sectionRef = useRef(null)
  const valueRefs = useRef([])
  const { content, direction, formatNumber } = useLocale()
  const copy = content.pages.home.highlights

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section || import.meta.env.MODE === 'test') return undefined

    let context
    let cancelled = false

    async function setupAnimation() {
      const [gsapModule, scrollTriggerModule] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      if (cancelled) return
      const gsap = gsapModule.gsap ?? gsapModule.default
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger ?? scrollTriggerModule.default
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      gsap.registerPlugin(ScrollTrigger)

      context = gsap.context(() => {
        if (reduceMotion) return
        animationConfig.forEach((config, index) => {
          const element = valueRefs.current[index]
          if (element && typeof config.target === 'number') element.textContent = direction === 'rtl' ? '+٠' : '0+'
        })

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: 'top 72%',
          once: true,
          onEnter: () => {
            const timeline = gsap.timeline({ delay: 0.3 })
            animationConfig.forEach((config, index) => {
              const element = valueRefs.current[index]
              if (!element) return
              if (typeof config.target === 'number') {
                const counter = { value: 0 }
                timeline.to(counter, {
                  value: config.target,
                  duration: config.duration,
                  ease: 'power2.out',
                  onUpdate: () => {
                    const value = formatNumber(Math.round(counter.value))
                    element.textContent = direction === 'rtl' ? `${config.suffix}${value}` : `${value}${config.suffix}`
                  },
                  onComplete: () => { element.textContent = copy.items[index].value },
                }, index * 0.16)
              } else {
                timeline.fromTo(element, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' }, index * 0.16)
              }
            })
          },
        })
        return () => trigger.kill()
      }, section)
    }

    setupAnimation()
    return () => { cancelled = true; context?.revert() }
  }, [copy.items, direction, formatNumber])

  return (
    <section aria-labelledby='highlight-cards-title' className='bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-[clamp(2.5rem,4vw,4.75rem)] lg:py-24' ref={sectionRef}>
      <div className='mx-auto w-full max-w-[1600px]'>
        <h2 className='sr-only' id='highlight-cards-title'>{copy.ariaLabel}</h2>
        <div className='overflow-hidden bg-black text-white shadow-[0_24px_70px_rgba(0,0,0,0.14)]'>
          <div className='grid divide-y divide-white/15 md:grid-cols-3 md:divide-x md:divide-y-0 rtl:md:divide-x-reverse'>
            {copy.items.map((highlight, index) => (
              <article className='flex min-h-[290px] flex-col justify-between gap-10 p-8 sm:p-10 lg:min-h-[340px] lg:p-12' key={highlight.label}>
                <p aria-label={highlight.value} className='text-[clamp(3.5rem,7vw,5.5rem)] font-semibold leading-none tracking-[-0.055em] text-white'>
                  <span aria-hidden='true' ref={(element) => { valueRefs.current[index] = element }}>{highlight.value}</span>
                </p>
                <div>
                  <h3 className='text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl'>{highlight.label}</h3>
                  <p className='mt-4 max-w-md text-base leading-7 text-white/65 sm:text-lg'>{highlight.description}</p>
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
