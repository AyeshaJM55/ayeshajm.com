import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

import useReducedMotion from '../../../hooks/useReducedMotion'


function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > 320)

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })

    return () => window.removeEventListener('scroll', updateVisibility)
  }, [])

  const handleClick = () => {
    window.scrollTo({
      behavior: reducedMotion ? 'auto' : 'smooth',
      top: 0,
    })
  }

  return (
    <button
      aria-label='Scroll to top'
      className={`fixed bottom-6 right-4 z-[9998] inline-flex size-10 items-center justify-center rounded-full border border-black/15 bg-white text-black shadow-sm outline-none transition-[opacity,transform,background-color,color] duration-300 hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:right-6 ${isVisible ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
      onClick={handleClick}
      type='button'
    >
      <ArrowUp aria-hidden='true' className='size-4' strokeWidth={2} />
    </button>
  )
}


export default ScrollToTop
