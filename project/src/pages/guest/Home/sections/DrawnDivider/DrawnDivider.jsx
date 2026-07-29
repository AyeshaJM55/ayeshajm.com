import { useLayoutEffect, useRef } from 'react'

import penTool from '../../../../../assets/icons/pen-tool.svg'
import { useLocale } from '../../../../../locales/useLocale'

const DIVIDER_WIDTH = 1600
const DIVIDER_Y = 60
const PEN_SIZE = 56
const PEN_NIB_INSET = 3
const PEN_NIB_FROM_RIGHT = PEN_SIZE - PEN_NIB_INSET

function DrawnDivider() {
  const sectionRef = useRef(null)
  const revealRef = useRef(null)
  const penRef = useRef(null)
  const { content, direction } = useLocale()

  useLayoutEffect(() => {
    const section = sectionRef.current
    const reveal = revealRef.current
    const pen = penRef.current

    if (!section || !reveal || !pen || import.meta.env.MODE === 'test') return undefined

    let context
    let cancelled = false

    const setupAnimation = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      context = gsap.context(() => {
        const getPenStartX = () => direction === 'rtl'
          ? section.clientWidth - PEN_NIB_FROM_RIGHT
          : -PEN_NIB_INSET
        const getPenEndX = () => direction === 'rtl'
          ? -PEN_NIB_FROM_RIGHT
          : section.clientWidth - PEN_NIB_INSET

        if (reduceMotion) {
          gsap.set(reveal, { attr: { width: DIVIDER_WIDTH } })
          gsap.set(pen, { x: getPenEndX() })
          return
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'bottom 20%',
            invalidateOnRefresh: true,
            scrub: true,
          },
        })

        timeline
          .fromTo(
            reveal,
            { attr: { width: 0 } },
            { attr: { width: DIVIDER_WIDTH }, ease: 'none' },
            0,
          )
          .fromTo(
            pen,
            { x: getPenStartX },
            { ease: 'none', x: getPenEndX },
            0,
          )
      }, section)
    }

    setupAnimation()
    return () => {
      cancelled = true
      context?.revert()
    }
  }, [direction])

  return (
    <section aria-label={content.pages.home.dividerLabel} className='overflow-hidden bg-white py-10 sm:py-12 lg:py-14' ref={sectionRef}>
      <div className='relative h-24 w-full sm:h-28'>
        <svg
          aria-hidden='true'
          className='absolute inset-0 block h-full w-full text-black'
          preserveAspectRatio='none'
          style={{ transform: direction === 'rtl' ? 'scaleX(-1)' : undefined }}
          viewBox={`0 0 ${DIVIDER_WIDTH} 120`}
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <clipPath id='drawn-divider-reveal'>
              <rect height='120' ref={revealRef} width='0' x='0' y='0' />
            </clipPath>
          </defs>
          <path
            clipPath='url(#drawn-divider-reveal)'
            d={`M0 ${DIVIDER_Y} H${DIVIDER_WIDTH}`}
            fill='none'
            stroke='currentColor'
            strokeDasharray='12 12'
            strokeLinecap='butt'
            strokeWidth='2'
            vectorEffect='non-scaling-stroke'
          />
        </svg>

        <span
          aria-hidden='true'
          className='pointer-events-none absolute left-0 top-1/2 z-10 block size-14 -translate-y-[52px] select-none'
          data-drawn-divider-pen=''
          ref={penRef}
        >
          <img
            alt=''
            className='block size-14 max-w-none'
            data-drawn-divider-pen-image=''
            draggable='false'
            src={penTool}
            style={{ transform: direction === 'rtl' ? 'scaleX(-1)' : undefined }}
          />
        </span>
      </div>
    </section>
  )
}

export default DrawnDivider
