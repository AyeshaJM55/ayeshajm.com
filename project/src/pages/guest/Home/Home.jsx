import SiteLayout from '../../../layouts/SiteLayout/SiteLayout'
import Hero from './sections/Hero'
import PartnersStrip from './sections/PartnersStrip/PartnersStrip'
import HighlightCards from './sections/HighlightCards/HighlightCards'

function Home() {
  return (
    <SiteLayout>
      <main aria-label='Homepage' id='main-content'>
        <Hero />
        <PartnersStrip />
        <HighlightCards />
      </main>
    </SiteLayout>
  )
}

export default Home
