import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'


function FooterDotField({ footerRef }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const footer = footerRef.current
    const canvas = canvasRef.current

    if (!footer || !canvas || typeof window.ResizeObserver === 'undefined') return undefined

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia?.('(pointer: fine)').matches

    if (reducedMotion || !finePointer) return undefined

    const context = canvas.getContext('2d')
    if (!context) return undefined

    const pointer = {
      active: 0,
      currentX: -2000,
      currentY: -2000,
      targetX: -2000,
      targetY: -2000,
      targetActive: 0,
    }

    let width = 0
    let height = 0
    let animationFrame = 0
    const spacing = 32
    const maximumRadius = 5.5
    const influenceRadius = 160
    const dotColor = getComputedStyle(document.documentElement).getPropertyValue('--footer-dot').trim()

    const resizeCanvas = () => {
      const bounds = footer.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)

      width = bounds.width
      height = bounds.height
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    const setPointer = (event, immediate = false) => {
      const bounds = footer.getBoundingClientRect()
      pointer.targetX = event.clientX - bounds.left
      pointer.targetY = event.clientY - bounds.top
      pointer.targetActive = 1

      if (immediate) {
        pointer.currentX = pointer.targetX
        pointer.currentY = pointer.targetY
      }
    }

    const deactivatePointer = () => {
      pointer.targetActive = 0
    }

    const draw = () => {
      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.12
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.12
      pointer.active += (pointer.targetActive - pointer.active) * 0.12

      context.clearRect(0, 0, width, height)
      context.fillStyle = dotColor

      if (pointer.active > 0.004) {
        for (let y = 0; y <= height + spacing; y += spacing) {
          for (let x = 0; x <= width + spacing; x += spacing) {
            const distance = Math.hypot(x - pointer.currentX, y - pointer.currentY)
            if (distance >= influenceRadius) continue

            const proximity = 1 - distance / influenceRadius
            const radius = maximumRadius * proximity * proximity * pointer.active

            context.beginPath()
            context.arc(x, y, radius, 0, Math.PI * 2)
            context.fill()
          }
        }
      }

      animationFrame = window.requestAnimationFrame(draw)
    }

    const handlePointerEnter = (event) => setPointer(event, true)
    const handlePointerMove = (event) => setPointer(event)
    const resizeObserver = new ResizeObserver(resizeCanvas)

    resizeObserver.observe(footer)
    resizeCanvas()
    footer.addEventListener('pointerenter', handlePointerEnter)
    footer.addEventListener('pointermove', handlePointerMove)
    footer.addEventListener('pointerleave', deactivatePointer)
    animationFrame = window.requestAnimationFrame(draw)

    return () => {
      resizeObserver.disconnect()
      footer.removeEventListener('pointerenter', handlePointerEnter)
      footer.removeEventListener('pointermove', handlePointerMove)
      footer.removeEventListener('pointerleave', deactivatePointer)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [footerRef])

  return (
    <canvas
      aria-hidden='true'
      className='pointer-events-none absolute inset-0 z-0 size-full'
      ref={canvasRef}
    />
  )
}

FooterDotField.propTypes = {
  footerRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
}

export default FooterDotField
