import { AnimatePresence, motion } from 'framer-motion'
import { CalendarCheck2 } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import headerLinks from './HeaderLinks'

function Header() {
  const headerRef = useRef(null)
  const innerRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useLayoutEffect(() => {
    const header = headerRef.current
    const inner = innerRef.current

    if (!header || !inner || import.meta.env.MODE === 'test') return undefined

    let animationContext
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
        function compactHeader() {
          gsap.to(inner, {
            width: 'calc(100% - 24px)',
            maxWidth: '860px',
            paddingLeft: '28px',
            paddingRight: '12px',
            paddingTop: '8px',
            paddingBottom: '8px',
            borderRadius: isMenuOpen ? '24px' : '9999px',
            backgroundColor: 'var(--header-glass)',
            backdropFilter: 'blur(18px)',
            borderColor: 'var(--header-glass-border)',
            boxShadow: 'var(--header-shadow)',
            duration,
            ease: 'power2.out',
            overwrite: 'auto',
          })

          gsap.to(header, {
            paddingTop: '12px',
            duration,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }

        function expandHeader() {
          gsap.to(inner, {
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
            paddingTop: '0px',
            duration,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }

        const updateHeader = () => {
          if (window.scrollY > 80) {
            compactHeader()
          } else {
            expandHeader()
          }
        }

        ScrollTrigger.create({
          start: '80px top',
          onEnter: compactHeader,
          onLeaveBack: expandHeader,
        })

        window.addEventListener('scroll', updateHeader, { passive: true })
        updateHeader()

        return () => window.removeEventListener('scroll', updateHeader)
      }, header)
    }

    setupScrollAnimation()

    return () => {
      cancelled = true
      animationContext?.revert()
    }
  }, [isMenuOpen])

  return (
    <header ref={headerRef} className='fixed inset-x-0 top-0 z-50 flex justify-center' role='banner'>
      <div
        ref={innerRef}
        className='w-full max-w-full overflow-hidden border border-transparent bg-white px-4 py-4 sm:px-6 lg:px-10 lg:py-[18px]'
      >
        <div className='flex items-center justify-between gap-4'>
          <a
            className='whitespace-nowrap text-xl font-semibold uppercase tracking-wide text-black outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4'
            href='/'
          >
            Ayesha J.
          </a>

          <nav aria-label='Primary navigation' className='hidden items-center gap-8 md:flex'>
            {headerLinks.map(({ label, href }) => (
              <motion.a
                key={href}
                className='text-sm font-semibold uppercase tracking-[0.08em] text-black outline-none transition-opacity hover:opacity-50 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4'
                href={href}
                whileHover={{ y: -2 }}
              >
                {label}
              </motion.a>
            ))}
          </nav>

          <div className='flex items-center gap-2'>
            <motion.a
              className='flex items-center gap-2 whitespace-nowrap rounded-full bg-black/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.06em] text-black outline-none transition-colors hover:bg-black/15 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 sm:px-5 sm:text-sm'
              href='#contact'
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a call
              <CalendarCheck2 aria-hidden='true' size={16} strokeWidth={1.8} />
            </motion.a>

            <button
              aria-expanded={isMenuOpen}
              aria-label='Toggle navigation menu'
              className='grid size-11 place-items-center rounded-full border border-neutral-200 bg-white text-black outline-none focus-visible:ring-2 focus-visible:ring-black md:hidden'
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              type='button'
            >
              <span aria-hidden='true' className='text-xl leading-none'>
                {isMenuOpen ? '×' : '☰'}
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen ? (
            <motion.nav
              animate={{ height: 'auto', opacity: 1 }}
              aria-label='Mobile navigation'
              className='overflow-hidden md:hidden'
              exit={{ height: 0, opacity: 0 }}
              initial={{ height: 0, opacity: 0 }}
            >
              <div className='grid gap-1 pt-4'>
                {headerLinks.map(({ label, href }) => (
                  <a
                    key={href}
                    className='rounded-full px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-black outline-none hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-black'
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header
