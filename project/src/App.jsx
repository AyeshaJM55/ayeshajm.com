import PropTypes from 'prop-types'
import { Suspense, useEffect, useRef, useState } from 'react'

import PageLoader from './components/domain/navigation/PageLoader'
import PageScrollProgress from './components/domain/navigation/PageScrollProgress'
import SiteLayout from './layouts/SiteLayout/SiteLayout'
import siteRoutes from './routes'
import matchRoute from './routes/matchRoute'
import SeoTags from './seo/SeoTags'
import { resolveRouteSeo } from './seo/routeSeo'


const getCurrentLocation = () => typeof window === 'undefined'
  ? '/'
  : `${window.location.pathname}${window.location.search}${window.location.hash}`


function App({ includeSeo = true, initialLocation, initialRouteReady = false }) {
  const [location, setLocation] = useState(() => initialLocation ?? getCurrentLocation())
  const [isRouteReady, setIsRouteReady] = useState(initialRouteReady)
  const skipInitialLoadRef = useRef(initialRouteReady)
  const pathname = location.split(/[?#]/)[0]
  const { params, route } = matchRoute(pathname, siteRoutes)
  const Page = route.Page
  const seo = resolveRouteSeo(pathname, route, params)

  useEffect(() => {
    const navigate = (nextLocation) => {
      setIsRouteReady(false)
      setLocation(nextLocation)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    const handleClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (!(event.target instanceof Element)) return

      const anchor = event.target.closest('a[href]')
      if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return

      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#') || /^(mailto:|tel:|javascript:)/i.test(href)) return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return

      const nextLocation = `${url.pathname}${url.search}${url.hash}`
      if (nextLocation === getCurrentLocation()) return

      event.preventDefault()
      window.history.pushState({}, '', nextLocation)
      navigate(nextLocation)
    }

    const handlePopState = () => navigate(getCurrentLocation())

    document.addEventListener('click', handleClick)
    window.addEventListener('popstate', handlePopState)

    return () => {
      document.removeEventListener('click', handleClick)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  useEffect(() => {
    if (skipInitialLoadRef.current) {
      skipInitialLoadRef.current = false
      return undefined
    }

    let cancelled = false
    let timeoutId
    const startedAt = Date.now()

    setIsRouteReady(false)

    route.loadPage()
      .catch(() => undefined)
      .finally(() => {
        const remainingDelay = Math.max(0, 160 - (Date.now() - startedAt))
        timeoutId = window.setTimeout(() => {
          if (!cancelled) setIsRouteReady(true)
        }, remainingDelay)
      })

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [location, route])

  return (
    <>
      {includeSeo ? <SeoTags seo={seo} /> : null}
      <SiteLayout pathname={pathname}>
        {isRouteReady ? (
          <Suspense fallback={<PageLoader />}>
            <Page key={location} params={params} />
          </Suspense>
        ) : <PageLoader />}
      </SiteLayout>
      <PageScrollProgress key={location} />
    </>
  )
}


App.propTypes = {
  includeSeo: PropTypes.bool,
  initialLocation: PropTypes.string,
  initialRouteReady: PropTypes.bool,
}


export default App
