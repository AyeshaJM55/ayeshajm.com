import { useEffect, useRef } from 'react'


function PageScrollProgress() {
  const progressRef = useRef(null)

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollHeight)) : 1

      if (progressRef.current) progressRef.current.style.width = `${progress * 100}%`
    }

    updateProgress()
    const timeoutId = window.setTimeout(updateProgress, 0)
    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateProgress)

    resizeObserver?.observe(document.body)
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.clearTimeout(timeoutId)
      resizeObserver?.disconnect()
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div aria-hidden='true' className='pointer-events-none fixed inset-x-0 bottom-0 z-[9999] h-[4px] bg-white'>
      <div className='h-full w-0 bg-black' ref={progressRef} />
    </div>
  )
}


export default PageScrollProgress
