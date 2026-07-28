import SiteLayout from '../../../layouts/SiteLayout/SiteLayout'
import Hero from './sections/Hero'
import PartnersStrip from './sections/PartnersStrip/PartnersStrip'
import HighlightCards from './sections/HighlightCards/HighlightCards'
import FeaturedWork from './sections/FeaturedWork/FeaturedWork'
import Services from './sections/Services/Services'
import Testimonials from './sections/Testimonials/Testimonials'
import BookNowStrip from './sections/BookNowStrip/BookNowStrip'
import Faq from './sections/Faq/Faq'

function Home() {
  return (
    <SiteLayout>
      <main aria-label='Homepage' id='main-content'>
        <Hero />
        <PartnersStrip />
        <HighlightCards />
        <FeaturedWork />
        <Services />
        <Testimonials />
        <BookNowStrip />
        <Faq />
      </main>
    </SiteLayout>
  )
}

export default Home
