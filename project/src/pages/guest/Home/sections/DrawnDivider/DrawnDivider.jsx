import { useEffect, useRef } from 'react'

import penTool from '../../../../../assets/icons/pen-tool.svg'
import { useLocale } from '../../../../../locales/useLocale'

const DIVIDER_WIDTH = 1600
const DIVIDER_Y = 60
const PEN_NIB_X = 3

function DrawnDivider() {
  const sectionRef = useRef(null)
  const revealRef = useRef(null)
  const penRef = useRef(null)
  const { content, direction } = useLocale()

  useEffect(() => {
    let context
    let cancelled = false

    const setupAnimation = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      if (cancelled || !sectionRef.current || !revealRef.current || !penRef.current) return
      gsap.registerPlugin(ScrollTrigger)
      context = gsap.context(() => {
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', end: 'bottom 20%', invalidateOnRefresh: true, scrub: true },
        })
        timeline
          .fromTo(revealRef.current, { attr: { width: 0 } }, { attr: { width: DIVIDER_WIDTH }, ease: 'none' }, 0)
          .fromTo(
            penRef.current,
            { x: () => direction === 'rtl' ? sectionRef.current.clientWidth + PEN_NIB_X : -PEN_NIB_X },
            { ease: 'none', x: () => direction === 'rtl' ? -PEN_NIB_X : sectionRef.current.clientWidth - PEN_NIB_X },
            0,
          )
      }, sectionRef)
    }

    setupAnimation()
    return () => { cancelled = true; context?.revert() }
  }, [direction])

  return (
    <section aria-label={content.pages.home.dividerLabel} className='overflow-hidden bg-white py-10 sm:py-12 lg:py-14' ref={sectionRef}>
      <div className='relative h-24 w-full sm:h-28'>
        <svg aria-hidden='true' className='absolute inset-0 block h-full w-full text-black' preserveAspectRatio='none' style={{ transform: direction === 'rtl' ? 'scaleX(-1)' : undefined }} viewBox={`0 0 ${DIVIDER_WIDTH} 120`} xmlns='http://www.w3.org/2000/svg'>
          <defs><clipPath id='drawn-divider-reveal'><rect height='120' ref={revealRef} width='0' x='0' y='0' /></clipPath></defs>
          <path clipPath='url(#drawn-divider-reveal)' d={`M0 ${DIVIDER_Y} H${DIVIDER_WIDTH}`} fill='none' stroke='currentColor' strokeDasharray='12 12' strokeLinecap='butt' strokeWidth='2' vectorEffect='non-scaling-stroke' />
        </svg>
        <img alt='' aria-hidden='true' className='pointer-events-none absolute start-0 top-1/2 z-10 size-14 max-w-none -translate-y-[52px] select-none' draggable='false' ref={penRef} src={penTool} />
      </div>
    </section>
  )
}

export default DrawnDivider
