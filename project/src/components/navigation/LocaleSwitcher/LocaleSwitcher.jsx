import { Check, ChevronDown } from 'lucide-react'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'

import { useLocale } from '../../../locales/useLocale'

function LocaleSwitcher({ className = '', onNavigate, pathname = typeof window === 'undefined' ? '/' : `${window.location.pathname}${window.location.search}${window.location.hash}` }) {
  const { locale, registry, switchLocalePath, symbol, t } = useLocale()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        rootRef.current?.querySelector('button')?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div className={`relative ${className}`} ref={rootRef}>
      <button aria-expanded={open} aria-haspopup='menu' aria-label={t('header.localeTrigger', { symbol })} className='inline-flex min-h-11 items-center gap-1.5 rounded-full border border-black/15 bg-white px-3 text-xs font-bold tracking-[0.08em] text-black outline-none transition-colors hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2' onClick={() => setOpen((value) => !value)} type='button'>
        <span>{symbol}</span><ChevronDown aria-hidden='true' className='size-3.5' />
      </button>
      {open ? (
        <ul className='absolute end-0 top-full z-50 mt-2 min-w-28 overflow-hidden rounded-2xl border border-black/10 bg-white p-1 shadow-xl' role='menu'>
          {Object.entries(registry).map(([code, metadata]) => {
            const active = code === locale
            return (
              <li key={code} role='none'>
                <a aria-current={active ? 'true' : undefined} aria-label={active ? t('header.currentLocale', { symbol: metadata.symbol }) : t('header.switchTo', { symbol: metadata.symbol })} className='flex min-h-10 items-center justify-between gap-3 rounded-xl px-3 text-xs font-bold tracking-[0.08em] text-black outline-none hover:bg-neutral-100 focus-visible:bg-neutral-100' href={switchLocalePath(pathname, code)} lang={code} onClick={() => { setOpen(false); onNavigate?.() }} role='menuitem'>
                  <span>{metadata.symbol}</span>{active ? <Check aria-hidden='true' className='size-4' /> : null}
                </a>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

LocaleSwitcher.propTypes = { className: PropTypes.string, onNavigate: PropTypes.func, pathname: PropTypes.string }
export default LocaleSwitcher
