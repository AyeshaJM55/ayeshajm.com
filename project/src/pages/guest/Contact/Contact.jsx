import { useState } from 'react'
import PageHero from '../../../components/domain/site/PageHero'
import ProcessSteps from '../../../components/domain/site/ProcessSteps'
import SectionHeader from '../../../components/domain/site/SectionHeader'
import { services } from '../../../data/services'
import { site } from '../../../data/site'
import SiteLayout from '../../../layouts/SiteLayout/SiteLayout'

const fieldClassName = 'w-full border-b border-black/20 bg-transparent px-0 py-4 text-base text-black outline-none placeholder:text-black/35 focus:border-black'

function Contact() {
  const [status, setStatus] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(`This form is not connected to a delivery service yet. Please email ${site.email}.`)
  }

  return (
    <SiteLayout>
      <main aria-label='Contact page' id='main-content'>
        <PageHero actions={<a className='inline-flex min-h-14 items-center bg-black px-7 text-sm font-semibold text-white' href={`mailto:${site.email}`}>Email directly</a>} description='Share the product, launch timing, intended use, and the visual deliverables you need. A focused brief makes the first response far more useful.' eyebrow='Contact' title='Let’s make the product clear before it reaches the customer.' />

        <section className='bg-white py-20 sm:py-24 lg:py-28'>
          <div className='mx-auto grid w-full max-w-[1600px] gap-16 px-4 sm:px-6 lg:grid-cols-[0.6fr_1fr] lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            <div>
              <SectionHeader description='The form is ready for project details, though actual delivery still needs a backend provider. Civilization remains unfinished.' eyebrow='Project inquiry' title='Tell me what you are building.' />
              <a className='mt-8 inline-block text-xl font-semibold text-black underline decoration-black/20 underline-offset-8' href={`mailto:${site.email}`}>{site.email}</a>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='grid gap-x-8 sm:grid-cols-2'>
                {[
                  ['Name', 'name', 'text', 'Your name'],
                  ['Email', 'email', 'email', 'you@example.com'],
                  ['Company', 'company', 'text', 'Company or brand'],
                  ['Timeline', 'timeline', 'text', 'Target launch or delivery'],
                ].map(([label, name, type, placeholder]) => <label className='mb-8 block' htmlFor={`contact-${name}`} key={name}><span className='text-sm font-medium text-black'>{label}</span><input className={fieldClassName} id={`contact-${name}`} name={name} placeholder={placeholder} required={name === 'name' || name === 'email'} type={type} /></label>)}

                <label className='mb-8 block' htmlFor='contact-service'><span className='text-sm font-medium text-black'>Service</span><select className={`${fieldClassName} appearance-none`} defaultValue='' id='contact-service' name='service' required><option disabled value=''>Select a service</option>{services.map((service) => <option key={service.slug} value={service.slug}>{service.title}</option>)}</select></label>
                <label className='mb-8 block' htmlFor='contact-stage'><span className='text-sm font-medium text-black'>Project stage</span><select className={`${fieldClassName} appearance-none`} defaultValue='' id='contact-stage' name='stage'><option value=''>Select a stage</option><option value='concept'>Concept</option><option value='pre-production'>Pre-production</option><option value='manufactured'>Manufactured</option><option value='existing-assets'>Existing 3D assets</option></select></label>
                <label className='mb-8 block' htmlFor='contact-use'><span className='text-sm font-medium text-black'>Intended use</span><input className={fieldClassName} id='contact-use' name='use' placeholder='Website, marketplace, social, campaign...' type='text' /></label>
                <label className='mb-8 block' htmlFor='contact-budget'><span className='text-sm font-medium text-black'>Budget range</span><input className={fieldClassName} id='contact-budget' name='budget' placeholder='Optional' type='text' /></label>
              </div>
              <label className='block' htmlFor='contact-details'><span className='text-sm font-medium text-black'>Project details</span><textarea className={`${fieldClassName} min-h-40 resize-y`} id='contact-details' name='details' placeholder='Describe the product, deliverables, timing, references, and anything that may affect scope.' required rows='6' /></label>
              <p className='mt-4 text-sm leading-6 text-black/45'>Files cannot be uploaded here yet. Mention what CAD, drawings, photography, or references are available.</p>
              <button className='mt-8 min-h-14 bg-black px-8 text-sm font-semibold text-white outline-none hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4' type='submit'>Prepare inquiry</button>
              <p aria-live='polite' className='mt-5 text-sm text-black/55'>{status}</p>
            </form>
          </div>
        </section>

        <section className='bg-neutral-50 py-20 sm:py-24'>
          <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            <SectionHeader eyebrow='What happens next' title='Three useful steps. No ceremonial fog.' />
            <div className='mt-12'><ProcessSteps steps={[
              { title: 'Brief review', description: 'The product, usage, files, timeline, and open questions are reviewed.' },
              { title: 'Scope and estimate', description: 'Deliverables, process, revision points, schedule, and cost are defined.' },
              { title: 'Production start', description: 'Work begins after the scope, assets, and first milestone are confirmed.' },
            ]} /></div>
          </div>
        </section>
      </main>
    </SiteLayout>
  )
}

export default Contact
