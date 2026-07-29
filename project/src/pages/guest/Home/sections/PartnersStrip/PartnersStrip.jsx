import { useLayoutEffect, useMemo, useRef } from 'react'

import { useLocale } from '../../../../../locales/useLocale'

function PartnersStrip() {
  const sectionRef = useRef(null)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const itemRefs = useRef([])
  const { content, direction } = useLocale()
  const copy = content.pages.home.partners
  const repeatedPartners = useMemo(() => Array.from({ length: 10 }, () => copy.names).flat(), [copy.names])

  useLayoutEffect(() => {
    const section = sectionRef.current
    const viewport = viewportRef.current
    const track = trackRef.current

    if (!section || !viewport || !track || import.meta.env.MODE === 'test') return undefined

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
        const updateOpacity = () => {
          const bounds = viewport.getBoundingClientRect()
          const center = bounds.left + bounds.width / 2
          const fadeDistance = bounds.width * 0.52

          itemRefs.current.forEach((item) => {
            if (!item) return
            const itemBounds = item.getBoundingClientRect()
            const itemCenter = itemBounds.left + itemBounds.width / 2
            const distance = Math.min(Math.abs(itemCenter - center) / fadeDistance, 1)
            gsap.set(item, { opacity: 0.14 + 0.86 * Math.pow(1 - distance, 1.8) })
          })
        }

        if (reduceMotion) {
          gsap.set(track, { x: 0 })
          gsap.set(itemRefs.current, { opacity: 0.65 })
          return
        }

        const getStartX = () => viewport.clientWidth * (direction === 'rtl' ? -0.18 : 0.18)
        const getX = (self) => getStartX() + (self.scroll() - self.start) * (direction === 'rtl' ? 1 : -1)
        const scrollTrigger = ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          invalidateOnRefresh: true,
          onRefresh: (self) => { gsap.set(track, { x: getX(self) }); updateOpacity() },
          onUpdate: (self) => { gsap.set(track, { x: getX(self) }); updateOpacity() },
        })

        updateOpacity()
        requestAnimationFrame(() => ScrollTrigger.refresh())
        return () => scrollTrigger.kill()
      }, section)
    }

    setupAnimation()
    return () => { cancelled = true; context?.revert() }
  }, [direction])

  return (
    <section aria-label={copy.ariaLabel} className='bg-white' ref={sectionRef}>
      <div className='w-full overflow-hidden border-y border-black/5' ref={viewportRef}>
        <div className='flex w-max items-center will-change-transform' ref={trackRef}>
          {repeatedPartners.map((name, index) => (
            <div className='flex shrink-0 items-center' key={`${name}-${index}`}>
              <span
                className='select-none whitespace-nowrap px-8 py-5 text-xl font-semibold italic leading-none text-strip-ink opacity-15 sm:px-10 sm:py-6 sm:text-2xl lg:px-12 lg:text-[1.8rem]'
                ref={(element) => { itemRefs.current[index] = element }}
              >
                {name}
              </span>
              <span aria-hidden='true' className='size-3 shrink-0 rounded-full bg-strip-dot' />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnersStrip
