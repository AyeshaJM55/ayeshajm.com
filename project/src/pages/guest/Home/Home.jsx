import Hero from './sections/Hero'
import PartnersStrip from './sections/PartnersStrip/PartnersStrip'
import HighlightCards from './sections/HighlightCards/HighlightCards'
import FeaturedWork from './sections/FeaturedWork/FeaturedWork'
import Services from './sections/Services/Services'
import Testimonials from './sections/Testimonials/Testimonials'
import BookNowStrip from './sections/BookNowStrip/BookNowStrip'
import LeaveMessage from './sections/LeaveMessage/LeaveMessage'
import DrawnDivider from './sections/DrawnDivider/DrawnDivider'
import Faq from './sections/Faq/Faq'

function Home() {
  return (
    <main aria-label='Homepage' id='main-content'>
        <Hero />
        <PartnersStrip />
        <HighlightCards />
        <FeaturedWork />
        <Services />
        <Testimonials />
        <BookNowStrip />
        <LeaveMessage />
        <DrawnDivider />
        <Faq />
      </main>
  )
}

export default Home
