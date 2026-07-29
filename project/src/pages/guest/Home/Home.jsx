import BookNowStrip from './sections/BookNowStrip/BookNowStrip'
import DrawnDivider from './sections/DrawnDivider/DrawnDivider'
import Faq from './sections/Faq/Faq'
import FeaturedWork from './sections/FeaturedWork/FeaturedWork'
import Hero from './sections/Hero'
import HighlightCards from './sections/HighlightCards/HighlightCards'
import LeaveMessage from './sections/LeaveMessage/LeaveMessage'
import PartnersStrip from './sections/PartnersStrip/PartnersStrip'
import Services from './sections/Services/Services'
import Testimonials from './sections/Testimonials/Testimonials'
import { useLocale } from '../../../locales/useLocale'

function Home() {
  const { content } = useLocale()

  return (
    <main aria-label={content.pages.home.ariaLabel} id='main-content'>
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
