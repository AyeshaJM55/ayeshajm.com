import { Suspense, useEffect, useState } from 'react'

import PageLoader from './components/domain/navigation/PageLoader'
import PageScrollProgress from './components/domain/navigation/PageScrollProgress'
import { site } from './data/site'
import SiteLayout from './layouts/SiteLayout/SiteLayout'
import siteRoutes from './routes'
import matchRoute from './routes/matchRoute'


const getCurrentLocation = () => `${window.location.pathname}${window.location.search}${window.location.hash}`


function App() {
  const [location, setLocation] = useState(getCurrentLocation)
  const [isRouteReady, setIsRouteReady] = useState(false)
  const pathname = location.split(/[?#]/)[0]
  const { params, route } = matchRoute(pathname, siteRoutes)
  const Page = route.Page
  const title = route.getTitle ? route.getTitle(params) : route.title
  const documentTitle = route.getDocumentTitle ? route.getDocumentTitle(params) : `Ayesha J. | ${title}`
  const description = route.getDescription ? route.getDescription(params) : route.description
  const canonical = route.getCanonical ? route.getCanonical(params) : `${site.url}${pathname === '/' ? '' : pathname}`
  const socialImage = route.getImage ? route.getImage(params) : ''
  const pageType = route.pageType ?? 'website'
  const publishedAt = route.getPublishedAt ? route.getPublishedAt(params) : ''
  const modifiedAt = route.getModifiedAt ? route.getModifiedAt(params) : ''
  const authorName = route.getAuthorName ? route.getAuthorName(params) : ''

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
      <title>{documentTitle}</title>
      <meta content={description} name='description' />
      <link href={canonical} rel='canonical' />
      <meta content={documentTitle} property='og:title' />
      <meta content={description} property='og:description' />
      <meta content={pageType} property='og:type' />
      <meta content={canonical} property='og:url' />
      <meta content={site.name} property='og:site_name' />
      <meta content='summary_large_image' name='twitter:card' />
      <meta content={documentTitle} name='twitter:title' />
      <meta content={description} name='twitter:description' />
      {socialImage ? <meta content={socialImage} property='og:image' /> : null}
      {socialImage ? <meta content={socialImage} name='twitter:image' /> : null}
      {publishedAt ? <meta content={publishedAt} property='article:published_time' /> : null}
      {modifiedAt ? <meta content={modifiedAt} property='article:modified_time' /> : null}
      {authorName ? <meta content={authorName} name='author' /> : null}
      <SiteLayout>
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


export default App
