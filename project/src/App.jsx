import siteRoutes from './routes'
import matchRoute from './routes/matchRoute'

function App() {
  const { params, route } = matchRoute(window.location.pathname, siteRoutes)
  const Page = route.Page
  const title = route.getTitle ? route.getTitle(params) : route.title
  const description = route.getDescription ? route.getDescription(params) : route.description

  return (
    <>
      <title>{`Ayesha J. | ${title}`}</title>
      <meta content={description} name='description' />
      <Page params={params} />
    </>
  )
}

export default App
