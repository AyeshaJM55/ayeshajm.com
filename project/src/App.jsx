import siteRoutes from './routes'

function App() {
  const currentRoute = siteRoutes.find(({ path }) => path === window.location.pathname) ?? siteRoutes[0]
  const Page = currentRoute.Page

  return <Page />
}

export default App
