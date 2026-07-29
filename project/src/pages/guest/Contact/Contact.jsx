import { motion } from 'framer-motion'
import { useState } from 'react'

import AnimatedPage from '../../../components/domain/motion/AnimatedPage'
import PageHero from '../../../components/domain/site/PageHero'
import SectionHeader from '../../../components/domain/site/SectionHeader'
import { services } from '../../../data/services'
import { site } from '../../../data/site'
import useReducedMotion from '../../../hooks/useReducedMotion'
import SiteLayout from '../../../layouts/SiteLayout/SiteLayout'
import { motionDuration, motionEase, motionViewport } from '../../../motion/constants'
import { fadeUp, staggerContainer } from '../../../motion/variants'

const fieldClassName = 'w-full border-b border-black/20 bg-transparent px-0 py-4 text-base text-black outline-none transition-colors duration-300 placeholder:text-black/35 focus:border-black'

const nextSteps = [
  { title: 'Brief review', description: 'The product, intended usage, available files, timeline, and open questions are reviewed together.' },
  { title: 'Scope and estimate', description: 'Deliverables, review points, schedule, production approach, and cost are defined clearly.' },
  { title: 'Production start', description: 'Work begins once the scope, source assets, and first milestone have been confirmed.' },
]

function Contact() {
  const [status, setStatus] = useState('')
  const reducedMotion = useReducedMotion()

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(`This form is not connected to a delivery service yet. Please email ${site.email}.`)
  }

  return (
    <SiteLayout>
      <AnimatedPage ariaLabel='Contact page'>
        <PageHero actions={<motion.a className='inline-flex min-h-14 items-center bg-black px-7 text-sm font-semibold text-white' href={`mailto:${site.email}`} whileHover={reducedMotion ? undefined : { y: -3 }} whileTap={reducedMotion ? undefined : { scale: 0.98 }}>Email directly</motion.a>} description='Share the product, launch timing, intended use, and the visual deliverables you need. A focused brief makes the first response far more useful.' eyebrow='Contact' title='Let’s make the product clear before it reaches the customer.' titleClassName='max-w-5xl text-[clamp(3rem,6vw,6.4rem)] leading-[0.96]' />

        <section className='bg-white py-20 sm:py-24 lg:py-28'>
          <div className='mx-auto grid w-full max-w-[1600px] gap-16 px-4 sm:px-6 lg:grid-cols-[0.6fr_1fr] lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            <div>
              <SectionHeader description='The form is ready for project details, though actual delivery still needs a backend provider.' eyebrow='Project inquiry' title='Tell me what you are building.' />
              <motion.a className='mt-8 inline-block text-xl font-semibold text-black underline decoration-black/20 underline-offset-8' href={`mailto:${site.email}`} whileHover={reducedMotion ? undefined : { y: -2 }}>{site.email}</motion.a>
            </div>

            <motion.form initial={reducedMotion ? false : 'hidden'} onSubmit={handleSubmit} variants={staggerContainer(reducedMotion ? 0 : 0.08)} viewport={motionViewport} whileInView='visible'>
              <div className='grid gap-x-8 sm:grid-cols-2'>
                {[
                  ['Name', 'name', 'text', 'Your name'],
                  ['Email', 'email', 'email', 'you@example.com'],
                  ['Company', 'company', 'text', 'Company or brand'],
                  ['Timeline', 'timeline', 'text', 'Target launch or delivery'],
                ].map(([label, name, type, placeholder]) => (
                  <motion.label className='mb-8 block' htmlFor={`contact-${name}`} key={name} transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
                    <span className='text-sm font-medium text-black'>{label}</span>
                    <input className={fieldClassName} id={`contact-${name}`} name={name} placeholder={placeholder} required={name === 'name' || name === 'email'} type={type} />
                  </motion.label>
                ))}

                <motion.label className='mb-8 block' htmlFor='contact-service' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
                  <span className='text-sm font-medium text-black'>Service</span>
                  <select className={`${fieldClassName} appearance-none`} defaultValue='' id='contact-service' name='service' required><option disabled value=''>Select a service</option>{services.map((service) => <option key={service.slug} value={service.slug}>{service.title}</option>)}</select>
                </motion.label>

                <motion.label className='mb-8 block' htmlFor='contact-stage' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
                  <span className='text-sm font-medium text-black'>Project stage</span>
                  <select className={`${fieldClassName} appearance-none`} defaultValue='' id='contact-stage' name='stage'><option value=''>Select a stage</option><option value='concept'>Concept</option><option value='pre-production'>Pre-production</option><option value='manufactured'>Manufactured</option><option value='existing-assets'>Existing 3D assets</option></select>
                </motion.label>

                <motion.label className='mb-8 block' htmlFor='contact-use' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
                  <span className='text-sm font-medium text-black'>Intended use</span><input className={fieldClassName} id='contact-use' name='use' placeholder='Website, marketplace, social, campaign...' type='text' />
                </motion.label>

                <motion.label className='mb-8 block' htmlFor='contact-budget' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
                  <span className='text-sm font-medium text-black'>Budget range</span><input className={fieldClassName} id='contact-budget' name='budget' placeholder='Optional' type='text' />
                </motion.label>
              </div>

              <motion.label className='block' htmlFor='contact-details' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
                <span className='text-sm font-medium text-black'>Project details</span><textarea className={`${fieldClassName} min-h-40 resize-y`} id='contact-details' name='details' placeholder='Describe the product, deliverables, timing, references, and anything that may affect scope.' required rows='6' />
              </motion.label>

              <motion.div transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
                <p className='mt-4 text-sm leading-6 text-black/45'>Files cannot be uploaded here yet. Mention what CAD, drawings, photography, or references are available.</p>
                <motion.button className='mt-8 min-h-14 bg-black px-8 text-sm font-semibold text-white outline-none hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4' type='submit' whileHover={reducedMotion ? undefined : { y: -3 }} whileTap={reducedMotion ? undefined : { scale: 0.98 }}>Prepare inquiry</motion.button>
                <p aria-live='polite' className='mt-5 min-h-5 text-sm text-black/55'>{status}</p>
              </motion.div>
            </motion.form>
          </div>
        </section>

        <section className='bg-neutral-50 py-20 sm:py-24 lg:py-28'>
          <div className='mx-auto grid w-full max-w-[1600px] gap-14 px-4 sm:px-6 lg:grid-cols-[0.62fr_1fr] lg:gap-24 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            <SectionHeader description='A simple handoff from the first message into an agreed production plan.' eyebrow='What happens next' title='From inquiry to production.' />
            <motion.ol className='border-t border-black/25' initial={reducedMotion ? false : 'hidden'} variants={staggerContainer(reducedMotion ? 0 : 0.1)} viewport={motionViewport} whileInView='visible'>
              {nextSteps.map((step, index) => (
                <motion.li className='grid grid-cols-[3rem_minmax(0,1fr)] gap-5 border-b border-black/20 py-7 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-7 sm:py-9' key={step.title} transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
                  <span className='text-sm font-semibold tracking-[0.12em] text-black/35'>{String(index + 1).padStart(2, '0')}</span>
                  <div className='grid gap-3 sm:grid-cols-[0.72fr_1fr] sm:gap-8'><h3 className='text-2xl font-semibold tracking-[-0.035em] text-black'>{step.title}</h3><p className='text-base leading-7 text-black/55'>{step.description}</p></div>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </section>
      </AnimatedPage>
    </SiteLayout>
  )
}

export default Contact
