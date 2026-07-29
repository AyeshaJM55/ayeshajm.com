import PageHero from '../../../components/domain/site/PageHero'
import ProcessSteps from '../../../components/domain/site/ProcessSteps'
import SectionHeader from '../../../components/domain/site/SectionHeader'
import { site } from '../../../data/site'
import SiteLayout from '../../../layouts/SiteLayout/SiteLayout'

function Book() {
  return (
    <SiteLayout>
      <main aria-label='Book a call page' id='main-content'>
        <PageHero description='A short project call is useful when the product, timeline, or service mix needs discussion before a formal scope is prepared.' eyebrow='Book a call' title='Start with the product, not a sales performance.' />
        <section className='bg-white py-20 sm:py-24 lg:py-28'>
          <div className='mx-auto grid w-full max-w-[1600px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.7fr_1fr] lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            <SectionHeader description='A scheduling provider has not been connected yet, so this page avoids dressing a decorative rectangle as an appointment system.' eyebrow='Scheduling' title='Booking integration coming next.' />
            <div className='flex min-h-[420px] flex-col items-center justify-center border border-dashed border-black/25 bg-neutral-50 p-8 text-center'>
              <p className='max-w-md text-lg leading-8 text-black/60'>Until a calendar provider is connected, send a preferred date, timezone, and a short project summary by email.</p>
              <a className='mt-8 inline-flex min-h-14 items-center bg-black px-7 text-sm font-semibold text-white' href={`mailto:${site.email}?subject=Project%20call%20request`}>Request a call by email</a>
            </div>
          </div>
        </section>
        <section className='bg-neutral-50 py-20 sm:py-24'>
          <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            <SectionHeader eyebrow='Prepare' title='Four things worth bringing.' />
            <div className='mt-12'><ProcessSteps steps={[
              { title: 'Product overview', description: 'What it is, who it is for, and what stage it has reached.' },
              { title: 'Deliverables', description: 'The images, animation, formats, or campaign assets you expect.' },
              { title: 'Timeline', description: 'Launch dates, review milestones, and any immovable deadlines.' },
              { title: 'Available assets', description: 'CAD, references, measurements, photography, brand guidelines, or prototypes.' },
            ]} /></div>
          </div>
        </section>
      </main>
    </SiteLayout>
  )
}

export default Book
