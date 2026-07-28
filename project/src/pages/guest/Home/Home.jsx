import SiteLayout from '../../../layouts/SiteLayout/SiteLayout'
import Hero from './sections/Hero'

function Home() {
  return (
    <SiteLayout>
      <main aria-label='Homepage' id='main-content'>
        <Hero />
      </main>
    </SiteLayout>
  )
}

export default Home
