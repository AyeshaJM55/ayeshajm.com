import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { useLocale } from '../../../../../locales/useLocale'
import TestimonialCard from './TestimonialCard'
import { AUTO_ADVANCE_DELAY } from './TestimonialsData'

import './Testimonials.css'

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const { content, formatNumber, t } = useLocale()
  const copy = content.pages.home.testimonials
  const testimonials = copy.items
  const total = testimonials.length

  const showNext = useCallback(() => { setCurrentIndex((index) => (index + 1) % total) }, [total])
  const showPrevious = () => { setCurrentIndex((index) => (index - 1 + total) % total) }

  useEffect(() => {
    if (isPaused) return undefined
    const intervalId = window.setInterval(showNext, AUTO_ADVANCE_DELAY)
    return () => window.clearInterval(intervalId)
  }, [isPaused, showNext])

  return (
    <section aria-labelledby='testimonials-title' className='overflow-hidden bg-white py-20 sm:py-24 lg:py-28'>
      <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
        <header className='max-w-2xl'>
          <h2 className='text-4xl font-semibold tracking-[-0.045em] text-testimonial-ink sm:text-5xl lg:text-6xl' id='testimonials-title'>{copy.title}</h2>
          <p className='mt-3 text-sm leading-6 text-black/55 sm:text-base sm:leading-7'>{copy.description}</p>
        </header>
        <div className='mx-auto mt-12 grid w-full max-w-6xl grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center gap-3 sm:mt-14 sm:grid-cols-[3rem_minmax(0,1fr)_3rem] sm:gap-6 lg:gap-10'>
          <button aria-label={t('accessibility.previousTestimonial')} className='z-20 flex size-11 items-center justify-center rounded-full border border-testimonial-ink/25 bg-white text-testimonial-ink transition-colors duration-200 hover:bg-testimonial-ink hover:text-white' onClick={showPrevious} type='button'><ChevronLeft aria-hidden='true' className='size-5' data-testid='previous-testimonial-icon' /></button>
          <div
            className='testimonials-stack w-full min-w-0'
            onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false) }}
            onFocusCapture={() => setIsPaused(true)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className='grid'>{testimonials.map((testimonial, index) => <TestimonialCard key={`${testimonial.name}-${testimonial.role}`} relativeIndex={(index - currentIndex + total) % total} testimonial={testimonial} />)}</div>
          </div>
          <button aria-label={t('accessibility.nextTestimonial')} className='z-20 flex size-11 items-center justify-center rounded-full border border-testimonial-ink/25 bg-white text-testimonial-ink transition-colors duration-200 hover:bg-testimonial-ink hover:text-white' onClick={showNext} type='button'><ChevronRight aria-hidden='true' className='size-5' data-testid='next-testimonial-icon' /></button>
        </div>
        <div aria-label={t('accessibility.chooseTestimonial')} className='mt-7 flex items-center justify-center gap-2' role='group'>
          {testimonials.map((testimonial, index) => (
            <button aria-label={t('accessibility.goToTestimonial', { index: formatNumber(index + 1) })} className={`h-2.5 rounded-full transition-[width,background-color] duration-300 ${index === currentIndex ? 'w-8 bg-testimonial-ink' : 'w-2.5 bg-testimonial-dot'}`} key={testimonial.name} onClick={() => setCurrentIndex(index)} type='button' />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
