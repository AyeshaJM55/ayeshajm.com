import { useLayoutEffect } from 'react'

function useHeaderScrollAnimation(headerRef, innerRef) {
  useLayoutEffect(() => {
    const header = headerRef.current
    const inner = innerRef.current

    if (!header || !inner || import.meta.env.MODE === 'test') return undefined

    let animationContext
    let removeScrollListener = () => {}
    let cancelled = false

    async function setupScrollAnimation() {
      const [gsapModule, scrollTriggerModule] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      if (cancelled) return

      const gsap = gsapModule.gsap ?? gsapModule.default
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger ?? scrollTriggerModule.default
      const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.45

      gsap.registerPlugin(ScrollTrigger)

      animationContext = gsap.context(() => {
        let isCompact = null

        function setHeaderState(compact) {
          if (compact === isCompact) return
          isCompact = compact

          gsap.to(inner, compact ? {
            width: 'calc(100% - 24px)',
            maxWidth: '1080px',
            paddingLeft: '28px',
            paddingRight: '12px',
            paddingTop: '8px',
            paddingBottom: '8px',
            borderRadius: '9999px',
            backgroundColor: 'var(--header-glass)',
            backdropFilter: 'blur(18px)',
            borderColor: 'var(--header-glass-border)',
            boxShadow: 'var(--header-shadow)',
            duration,
            ease: 'power2.out',
            overwrite: 'auto',
          } : {
            width: '100%',
            maxWidth: '100%',
            paddingLeft: window.innerWidth >= 1024 ? '40px' : '16px',
            paddingRight: window.innerWidth >= 1024 ? '24px' : '16px',
            paddingTop: window.innerWidth >= 1024 ? '18px' : '16px',
            paddingBottom: window.innerWidth >= 1024 ? '18px' : '16px',
            borderRadius: '0px',
            backgroundColor: 'var(--header-solid)',
            backdropFilter: 'blur(0px)',
            borderColor: 'transparent',
            boxShadow: 'none',
            duration,
            ease: 'power2.out',
            overwrite: 'auto',
          })

          gsap.to(header, {
            paddingTop: compact ? '12px' : '0px',
            duration,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }

        const updateHeader = () => setHeaderState(window.scrollY > 80)

        ScrollTrigger.create({
          start: '80px top',
          onEnter: () => setHeaderState(true),
          onLeaveBack: () => setHeaderState(false),
        })

        window.addEventListener('scroll', updateHeader, { passive: true })
        removeScrollListener = () => window.removeEventListener('scroll', updateHeader)
        updateHeader()
      }, header)
    }

    setupScrollAnimation()

    return () => {
      cancelled = true
      removeScrollListener()
      animationContext?.revert()
    }
  }, [headerRef, innerRef])
}

export default useHeaderScrollAnimation
