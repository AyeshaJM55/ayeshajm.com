import { useEffect } from 'react'

import siteRoutes from './routes'

function App() {
  const currentRoute = siteRoutes.find(({ path }) => path === window.location.pathname) ?? siteRoutes[0]
  const Page = currentRoute.Page

  useEffect(() => {
    document.title = `Ayesha J. | ${currentRoute.title}`
  }, [currentRoute.title])

  return <Page />
}

export default App
