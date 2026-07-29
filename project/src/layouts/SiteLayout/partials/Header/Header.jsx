import { motion } from 'framer-motion'
import { CalendarCheck2 } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import useHeaderScrollAnimation from '../../../../hooks/useHeaderScrollAnimation'
import headerLinks from './HeaderLinks'

function Header() {
  const headerRef = useRef(null)
  const innerRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useHeaderScrollAnimation(headerRef, innerRef)

  useLayoutEffect(() => {
    const inner = innerRef.current

    if (!inner || window.innerWidth >= 768) return

    if (isMenuOpen) {
      inner.style.setProperty('border-radius', '24px', 'important')
      return
    }

    inner.style.removeProperty('border-radius')
    inner.style.borderRadius = window.scrollY > 80 ? '9999px' : '0px'
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
              href='/contact'
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

        {isMenuOpen ? (
          <nav aria-label='Mobile navigation' className='md:hidden'>
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
          </nav>
        ) : null}
      </div>
    </header>
  )
}

export default Header
