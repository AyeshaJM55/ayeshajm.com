import SiteLayout from '../../../layouts/SiteLayout/SiteLayout'
import Hero from './sections/Hero'
import PartnersStrip from './sections/PartnersStrip/PartnersStrip'
import TemporaryScrollSection from './sections/TemporaryScrollSection'

function Home() {
  return (
    <SiteLayout>
      <main aria-label='Homepage' id='main-content'>
        <Hero />
        <PartnersStrip />
        <TemporaryScrollSection />
      </main>
    </SiteLayout>
  )
}

export default Home
