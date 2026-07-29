import { useLayoutEffect, useRef } from 'react'

import { footerNavigation } from '../../../../data/navigation'
import { services } from '../../../../data/services'
import { site } from '../../../../data/site'
import FooterDotField from './FooterDotField'
import SocialIcon from './SocialIcon'

const socialLinks = [
  { label: 'Instagram', href: '/', icon: 'instagram' },
  { label: 'LinkedIn', href: '/', icon: 'linkedin' },
  { label: 'ArtStation', href: '/', icon: 'artstation' },
]

function Footer() {
  const footerRef = useRef(null)
  const emailContainerRef = useRef(null)
  const emailRef = useRef(null)

  useLayoutEffect(() => {
    const container = emailContainerRef.current
    const email = emailRef.current

    if (!container || !email) return undefined

    const fitEmail = () => {
      const maximumSize = 144
      const minimumSize = 40

      email.style.fontSize = `${maximumSize}px`

      const availableWidth = container.clientWidth
      const renderedWidth = email.scrollWidth
      const fittedSize = renderedWidth > 0
        ? Math.min(maximumSize, Math.max(minimumSize, maximumSize * availableWidth / renderedWidth))
        : minimumSize

      email.style.fontSize = `${fittedSize}px`
    }

    fitEmail()

    const resizeObserver = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(fitEmail)

    resizeObserver?.observe(container)
    window.addEventListener('resize', fitEmail)

    return () => {
      resizeObserver?.disconnect()
      window.removeEventListener('resize', fitEmail)
    }
  }, [])

  return (
    <footer
      aria-label='Site footer'
      className='relative isolate flex min-h-[40svh] w-full flex-col overflow-hidden bg-site-footer text-site-footer-ink'
      ref={footerRef}
    >
      <FooterDotField footerRef={footerRef} />

      <div className='relative z-10 mx-auto flex min-h-[40svh] w-full max-w-[1600px] flex-1 flex-col justify-between px-4 py-12 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)] lg:py-16'>
        <div className='grid gap-y-12 md:grid-cols-[max-content_max-content_minmax(0,1fr)] md:gap-x-7 lg:gap-x-10'>
          <nav aria-label='Footer navigation'>
            <p className='mb-5 text-xs uppercase tracking-[0.16em] text-white/35'>Pages</p>
            <ul className='flex flex-col items-start gap-2'>
              {footerNavigation.map((link) => (
                <li key={link.label}>
                  <a
                    className='-mx-2 inline-flex px-2 py-1 text-lg font-medium tracking-wide outline-none transition-colors duration-[400ms] hover:bg-black focus-visible:bg-black focus-visible:ring-2 focus-visible:ring-white'
                    href={link.href}
                  >
                    <span className='text-white mix-blend-difference'>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label='Footer services'>
            <p className='mb-5 text-xs uppercase tracking-[0.16em] text-white/35'>Services</p>
            <ul className='flex flex-col items-start gap-2'>
              {services.map((service) => (
                <li key={service.slug}>
                  <a
                    className='-mx-2 inline-flex px-2 py-1 text-base text-white/70 outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-white'
                    href={`/services/${service.slug}`}
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className='flex min-w-0 flex-col items-start md:items-end md:pl-2 lg:pl-5'>
            <nav aria-label='Social media' className='mb-7'>
              <ul className='flex items-center gap-2'>
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      aria-label={link.label}
                      className='inline-flex size-16 items-center justify-center rounded-full outline-none transition-colors duration-[400ms] hover:bg-black focus-visible:bg-black focus-visible:ring-2 focus-visible:ring-white'
                      href={link.href}
                    >
                      <span className='inline-flex text-white mix-blend-difference'>
                        <SocialIcon name={link.icon} />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className='w-full min-w-0 overflow-hidden' ref={emailContainerRef}>
              <a
                className='block w-full py-2 text-left outline-none transition-opacity duration-300 hover:opacity-65 focus-visible:ring-2 focus-visible:ring-white md:text-right'
                href={`mailto:${site.email}`}
              >
                <span className='block whitespace-nowrap font-semibold leading-none tracking-[-0.065em] text-white mix-blend-difference' ref={emailRef}>
                  {site.email}
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className='mt-14 flex flex-col gap-2 border-t border-white/20 pt-6 text-xs uppercase tracking-[0.14em] sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-white/45 mix-blend-difference'>
            © {new Date().getFullYear()} Ayesha JM. All rights reserved.
          </p>
          <p className='text-white/45 mix-blend-difference'>Crafted with care</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
