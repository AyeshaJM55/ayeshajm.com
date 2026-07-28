import { useCallback, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { A11y, EffectCoverflow, Keyboard, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import ServiceCard from './ServiceCard'
import { SCROLL_PER_TRANSITION_VH, services, SLIDE_SPEED } from './ServicesData'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import './Services.css'


gsap.registerPlugin(ScrollTrigger)

function Services() {
  const sectionRef = useRef(null)
  const swiperRef = useRef(null)
  const scrollTriggerRef = useRef(null)
  const videoRefs = useRef([])
  const scrollDrivenRef = useRef(false)

  const updateVideoPlayback = useCallback((activeIndex) => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return

      if (index !== activeIndex) {
        video.pause()
        return
      }

      try {
        video.currentTime = 0
        video.play()?.catch(() => {})
      } catch {
        // Browsers may delay autoplay until the media is ready.
      }
    })
  }, [])

  const syncScrollToSlide = useCallback((swiper) => {
    if (scrollDrivenRef.current) return

    const scrollTrigger = scrollTriggerRef.current
    const lastIndex = services.length - 1

    updateVideoPlayback(swiper.realIndex)

    if (!scrollTrigger || lastIndex <= 0 || !scrollTrigger.isActive) return

    const progress = swiper.realIndex / lastIndex
    const targetScroll = scrollTrigger.start + progress * (scrollTrigger.end - scrollTrigger.start)

    window.scrollTo({
      top: targetScroll,
      behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }, [updateVideoPlayback])

  useLayoutEffect(() => {
    const section = sectionRef.current
    const swiper = swiperRef.current

    if (!section || !swiper) return undefined

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const lastIndex = services.length - 1

    updateVideoPlayback(0)

    if (reducedMotion || lastIndex <= 0) return undefined

    const context = gsap.context(() => {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${window.innerHeight * SCROLL_PER_TRANSITION_VH * lastIndex}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: 1 / lastIndex,
          duration: { min: 0.2, max: 0.45 },
          delay: 0.08,
          ease: 'power1.inOut',
        },
        onUpdate: (self) => {
          const nextIndex = Math.min(lastIndex, Math.round(self.progress * lastIndex))
          if (swiper.realIndex === nextIndex) return

          scrollDrivenRef.current = true
          swiper.slideTo(nextIndex, SLIDE_SPEED, false)
          updateVideoPlayback(nextIndex)
          window.requestAnimationFrame(() => {
            scrollDrivenRef.current = false
          })
        },
      })
    }, section)

    ScrollTrigger.refresh()

    return () => {
      scrollTriggerRef.current = null
      context.revert()
    }
  }, [updateVideoPlayback])

  return (
    <section
      aria-labelledby='services-title'
      className='relative flex min-h-[100svh] flex-col overflow-hidden bg-white pb-8 pt-16 text-black sm:pb-10 sm:pt-20 lg:pb-12 lg:pt-24'
      ref={sectionRef}
    >
      <header className='relative z-20 mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
        <h2 className='text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl' id='services-title'>
          Services
        </h2>
        <p className='mt-3 max-w-2xl text-sm leading-6 text-black/55 sm:text-base sm:leading-7'>
          From precise modeling to campaign-ready CGI, each service is built to present products with clarity and impact.
        </p>
      </header>

      <div className='relative flex min-h-0 flex-1 items-center'>
        <Swiper
          a11y={{ prevSlideMessage: 'Previous service', nextSlideMessage: 'Next service', paginationBulletMessage: 'Go to service {{index}}' }}
          centeredSlides
          className='services-swiper'
          coverflowEffect={{ rotate: 4, stretch: '-6%', depth: 180, modifier: 1, scale: 0.82, slideShadows: false }}
          effect='coverflow'
          grabCursor
          keyboard={{ enabled: true }}
          modules={[EffectCoverflow, Pagination, Keyboard, A11y]}
          onSlideChange={syncScrollToSlide}
          onSwiper={(swiper) => { swiperRef.current = swiper }}
          pagination={{ clickable: true }}
          slideToClickedSlide
          slidesPerView='auto'
          speed={SLIDE_SPEED}
          watchSlidesProgress
        >
          {services.map((service, index) => (
            <SwiperSlide key={service.title}>
              {({ isActive }) => (
                <ServiceCard
                  index={index}
                  isActive={isActive}
                  service={service}
                  videoRef={(video) => { videoRefs.current[index] = video }}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Services
