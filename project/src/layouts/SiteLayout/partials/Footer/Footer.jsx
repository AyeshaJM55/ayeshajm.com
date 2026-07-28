import { useRef } from 'react'

import FooterDotField from './FooterDotField'
import SocialIcon from './SocialIcon'


const navigationLinks = [
  { label: 'Work', href: '#portfolio' },
  { label: 'About', href: '/' },
  { label: 'Services', href: '/' },
  { label: 'Contact', href: 'mailto:hello@ayeshajm.com' },
]

const socialLinks = [
  { label: 'Instagram', href: '/', icon: 'instagram' },
  { label: 'LinkedIn', href: '/', icon: 'linkedin' },
  { label: 'ArtStation', href: '/', icon: 'artstation' },
]


function Footer() {
  const footerRef = useRef(null)

  return (
    <footer
      aria-label='Site footer'
      className='relative isolate flex min-h-[40svh] w-full flex-col overflow-hidden bg-site-footer text-site-footer-ink'
      ref={footerRef}
    >
      <FooterDotField footerRef={footerRef} />

      <div className='relative z-10 mx-auto flex min-h-[40svh] w-full max-w-[1600px] flex-1 flex-col justify-between px-4 py-12 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)] lg:py-16'>
        <div className='flex flex-col gap-14 md:flex-row md:items-start md:justify-between'>
          <nav aria-label='Footer navigation'>
            <ul className='flex flex-col items-start gap-2'>
              {navigationLinks.map((link) => (
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

          <div className='flex min-w-0 flex-1 flex-col items-start md:items-end'>
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

            <a
              className='-mx-2 max-w-full px-2 py-2 outline-none transition-colors duration-[400ms] hover:bg-black focus-visible:bg-black focus-visible:ring-2 focus-visible:ring-white'
              href='mailto:hello@ayeshajm.com'
            >
              <span className='block break-all text-[clamp(2.35rem,6.2vw,6.75rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-white mix-blend-difference'>
                hello@ayeshajm.com
              </span>
            </a>
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
