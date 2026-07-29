import { useEffect, useRef } from 'react'

const DIVIDER_WIDTH = 1600
const DIVIDER_Y = 60

function DrawnDivider() {
  const sectionRef = useRef(null)
  const revealRef = useRef(null)
  const penRef = useRef(null)

  useEffect(() => {
    let context
    let cancelled = false

    const setupAnimation = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      if (
        cancelled ||
        !sectionRef.current ||
        !revealRef.current ||
        !penRef.current
      ) {
        return
      }

      gsap.registerPlugin(ScrollTrigger)

      context = gsap.context(() => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            end: 'bottom 20%',
            invalidateOnRefresh: true,
            scrub: true,
          },
        })

        timeline
          .fromTo(
            revealRef.current,
            { attr: { width: 0 } },
            {
              attr: { width: DIVIDER_WIDTH },
              ease: 'none',
            },
            0,
          )
          .fromTo(
            penRef.current,
            { x: 0, y: DIVIDER_Y },
            {
              ease: 'none',
              x: DIVIDER_WIDTH,
              y: DIVIDER_Y,
            },
            0,
          )
      }, sectionRef)
    }

    setupAnimation()

    return () => {
      cancelled = true
      context?.revert()
    }
  }, [])

  return (
    <section
      aria-label='Decorative hand-drawn divider'
      className='overflow-hidden bg-white py-10 sm:py-12 lg:py-14'
      ref={sectionRef}
    >
      <svg
        aria-hidden='true'
        className='block h-24 w-full overflow-visible text-black sm:h-28'
        preserveAspectRatio='none'
        viewBox={`0 0 ${DIVIDER_WIDTH} 120`}
        xmlns='http://www.w3.org/2000/svg'
      >
        <defs>
          <clipPath id='drawn-divider-reveal'>
            <rect
              height='120'
              ref={revealRef}
              width='0'
              x='0'
              y='0'
            />
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

        <g ref={penRef}>
          <g transform='scale(0.62)'>
            <g transform='translate(-3.253 -64.78)'>
              <path d='M53.379,31.378c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l2.416,2.416c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L53.379,31.378z' />
              <path d='M44.52,22.52c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l4.832,4.832c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L44.52,22.52z' />
              <path d='M66.176,22.564c-0.781-0.781-2.047-0.781-2.828,0l-3.292,3.292L43.883,9.686l3.293-3.293c0.781-0.781,0.781-2.047,0-2.828s-2.047-0.781-2.828,0l-3.335,3.334c-1.496-1.197-3.341-1.851-5.29-1.851h-0.001c-2.287,0-4.44,0.893-6.062,2.514c-1.611,1.611-2.505,3.75-2.516,6.022c-0.012,2.198,0.811,4.262,2.307,5.852l-19.78,4.028c-0.844,0.172-1.482,0.863-1.587,1.718L3.253,64.78c-0.074,0.609,0.137,1.221,0.571,1.656c0.377,0.377,0.887,0.586,1.414,0.586c0.081,0,0.161-0.006,0.242-0.016l39.599-4.832c0.851-0.104,1.541-0.738,1.716-1.576l4.115-19.715c1.566,1.438,3.581,2.232,5.727,2.232c2.287,0,4.44-0.893,6.062-2.516c3.283-3.284,3.341-8.578,0.177-11.909l3.3-3.3C66.957,24.611,66.957,23.345,66.176,22.564z M43.173,58.378L9.143,62.53l14.055-14.053c0.915,0.674,2.007,1.055,3.165,1.055c1.434,0,2.78-0.559,3.794-1.572s1.572-2.361,1.572-3.795c0-1.432-0.559-2.779-1.572-3.793s-2.36-1.572-3.794-1.572s-2.781,0.559-3.795,1.572s-1.571,2.361-1.571,3.793c0,1.027,0.297,2.006,0.832,2.854L7.731,61.116l4.15-34.021l20.824-4.24c0.039-0.008,0.074-0.025,0.112-0.035l14.774,14.771c-0.079,0.154-0.146,0.317-0.184,0.496L43.173,58.378z M22.997,44.165c0-0.898,0.35-1.744,0.985-2.379c0.636-0.637,1.481-0.986,2.381-0.986s1.745,0.35,2.38,0.986c0.637,0.635,0.986,1.48,0.986,2.379c0,0.9-0.35,1.746-0.986,2.381c-1.271,1.271-3.489,1.271-4.761,0C23.346,45.911,22.997,45.065,22.997,44.165z M59.871,37.773c-0.895,0.894-2.066,1.343-3.233,1.343c-1.153,0-2.303-0.438-3.179-1.314L32.458,16.803c-1.764-1.763-1.748-4.634,0.031-6.413c0.895-0.895,2.066-1.343,3.233-1.343c1.153,0,2.303,0.438,3.179,1.313L59.902,31.36C61.664,33.123,61.649,35.994,59.871,37.773z' />
            </g>
          </g>
        </g>
      </svg>
    </section>
  )
}

export default DrawnDivider
