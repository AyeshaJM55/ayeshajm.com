import { motion } from 'framer-motion'
import { CalendarCheck2 } from 'lucide-react'
import PropTypes from 'prop-types'
import { useLayoutEffect, useRef, useState } from 'react'

import useHeaderScrollAnimation from '../../../../hooks/useHeaderScrollAnimation'
import useReducedMotion from '../../../../hooks/useReducedMotion'
import LocaleSwitcher from '../../../../components/navigation/LocaleSwitcher'
import { useLocale } from '../../../../locales/useLocale'
import headerLinks from './HeaderLinks'


const isLinkActive = ({ activePrefixes, href }, pathname) => pathname === href
  || activePrefixes?.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))


function Header({ pathname = typeof window === 'undefined' ? '/' : window.location.pathname }) {
  const headerRef = useRef(null)
  const innerRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const reducedMotion = useReducedMotion()
  const { localizePath, t } = useLocale()
  const localizedLinks = headerLinks.map((link) => ({
    ...link,
    activePrefixes: link.activePrefixes.map((prefix) => localizePath(prefix)),
    href: localizePath(link.href),
    label: t(`navigation.${link.id}`),
  }))

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
        <div className='flex items-center justify-between gap-3 lg:gap-5'>
          <a
            className='shrink-0 whitespace-nowrap text-xl font-semibold uppercase tracking-wide text-black outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4'
            href={localizePath('/')}
          >
            {t('brand')}
          </a>

          <nav aria-label={t('header.primaryNavigation')} className='hidden min-w-0 items-center gap-4 md:flex lg:gap-5 xl:gap-6'>
            {localizedLinks.map(({ activePrefixes, label, href }) => (
              <motion.a
                aria-current={isLinkActive({ activePrefixes, href }, pathname) ? 'page' : undefined}
                key={href}
                className='whitespace-nowrap text-[0.69rem] font-semibold uppercase tracking-[0.055em] text-black outline-none transition-opacity hover:opacity-50 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 aria-[current=page]:opacity-45 lg:text-xs xl:text-[0.82rem]'
                href={href}
                whileHover={reducedMotion ? undefined : { y: -2 }}
              >
                {label}
              </motion.a>
            ))}
          </nav>

          <div className='flex shrink-0 items-center gap-2'>
            <motion.a
              className='hidden items-center gap-2 whitespace-nowrap rounded-full bg-black/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.05em] text-black outline-none transition-colors hover:bg-black/15 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 md:flex lg:px-5 lg:text-sm'
              href={localizePath('/book')}
              whileHover={reducedMotion ? undefined : { y: -2 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            >
              {t('navigation.book')}
              <CalendarCheck2 aria-hidden='true' size={16} strokeWidth={1.8} />
            </motion.a>
                <LocaleSwitcher className='hidden md:block' pathname={pathname} />
                <LocaleSwitcher className='md:hidden' onNavigate={() => setIsMenuOpen(false)} pathname={pathname} />

            <button
              aria-expanded={isMenuOpen}
              aria-label={t(isMenuOpen ? 'header.closeMenu' : 'header.toggleMenu')}
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
          <nav aria-label={t('header.mobileNavigation')} className='md:hidden'>
            <div className='grid gap-1 pt-4'>
              {localizedLinks.map(({ activePrefixes, label, href }) => (
                <a
                  aria-current={isLinkActive({ activePrefixes, href }, pathname) ? 'page' : undefined}
                  key={href}
                  className='rounded-full px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-black outline-none hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-black aria-[current=page]:bg-neutral-100'
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
              <a
                className='mt-2 flex items-center justify-center gap-2 rounded-full bg-black px-4 py-3 text-sm font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2'
                href={localizePath('/book')}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.book')}
                <CalendarCheck2 aria-hidden='true' size={16} strokeWidth={1.8} />
              </a>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  )
}


Header.propTypes = {
  pathname: PropTypes.string,
}


export default Header
