import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'

import AnimatedPage from '../../../components/domain/motion/AnimatedPage'
import PageHero from '../../../components/domain/site/PageHero'
import SectionHeader from '../../../components/domain/site/SectionHeader'
import { getServices } from '../../../data/services'
import { site } from '../../../data/site'
import useReducedMotion from '../../../hooks/useReducedMotion'
import { useLocale } from '../../../locales/useLocale'
import { motionDuration, motionEase, motionViewport } from '../../../motion/constants'
import { fadeUp, staggerContainer } from '../../../motion/variants'

const fieldClassName = 'w-full border-b border-black/20 bg-transparent px-0 py-4 text-base text-black outline-none transition-colors duration-300 placeholder:text-black/35 focus:border-black'

function Contact() {
  const [status, setStatus] = useState('')
  const reducedMotion = useReducedMotion()
  const { content, formatMessage, formatNumber, locale, t } = useLocale()
  const copy = content.pages.contact
  const forms = content.forms
  const fields = forms.fields
  const services = useMemo(() => getServices(locale), [locale])

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(formatMessage(forms.contactUnavailable, { email: site.email }))
  }

  const textFields = [
    { id: 'name', required: true, type: 'text' },
    { id: 'email', required: true, type: 'email' },
    { id: 'company', required: false, type: 'text' },
    { id: 'timeline', required: false, type: 'text' },
  ]

  return (
    <AnimatedPage ariaLabel={copy.ariaLabel}>
      <PageHero
        actions={<motion.a className='inline-flex min-h-14 items-center bg-black px-7 text-sm font-semibold text-white' href={`mailto:${site.email}`} whileHover={reducedMotion ? undefined : { y: -3 }} whileTap={reducedMotion ? undefined : { scale: 0.98 }}>{t('actions.emailDirectly')}</motion.a>}
        description={copy.hero.description}
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        titleClassName='max-w-5xl text-[clamp(3rem,6vw,6.4rem)] leading-[0.96]'
      />

      <section className='bg-white py-20 sm:py-24 lg:py-28'>
        <div className='mx-auto grid w-full max-w-[1600px] gap-16 px-4 sm:px-6 lg:grid-cols-[0.6fr_1fr] lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <div>
            <SectionHeader description={copy.inquiry.description} eyebrow={copy.inquiry.eyebrow} title={copy.inquiry.title} />
            <motion.a className='mt-8 inline-block text-xl font-semibold text-black underline decoration-black/20 underline-offset-8' dir='ltr' href={`mailto:${site.email}`} whileHover={reducedMotion ? undefined : { y: -2 }}>{site.email}</motion.a>
          </div>

          <motion.form initial={reducedMotion ? false : 'hidden'} onSubmit={handleSubmit} variants={staggerContainer(reducedMotion ? 0 : 0.08)} viewport={motionViewport} whileInView='visible'>
            <div className='grid gap-x-8 sm:grid-cols-2'>
              {textFields.map(({ id, required, type }) => (
                <motion.label className='mb-8 block' htmlFor={`contact-${id}`} key={id} transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
                  <span className='text-sm font-medium text-black'>{fields[id].label}{required ? <span aria-hidden='true'> *</span> : null}</span>
                  <input className={fieldClassName} dir={type === 'email' ? 'ltr' : 'auto'} id={`contact-${id}`} name={id} placeholder={fields[id].placeholder} required={required} type={type} />
                </motion.label>
              ))}

              <motion.label className='mb-8 block' htmlFor='contact-service' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
                <span className='text-sm font-medium text-black'>{fields.service.label}<span aria-hidden='true'> *</span></span>
                <select className={`${fieldClassName} appearance-none`} defaultValue='' id='contact-service' name='service' required><option disabled value=''>{fields.service.placeholder}</option>{services.map((service) => <option key={service.slug} value={service.slug}>{service.title}</option>)}</select>
              </motion.label>

              <motion.label className='mb-8 block' htmlFor='contact-stage' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
                <span className='text-sm font-medium text-black'>{fields.stage.label}</span>
                <select className={`${fieldClassName} appearance-none`} defaultValue='' id='contact-stage' name='stage'><option value=''>{fields.stage.placeholder}</option>{Object.entries(forms.stages).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
              </motion.label>

              <motion.label className='mb-8 block' htmlFor='contact-use' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
                <span className='text-sm font-medium text-black'>{fields.use.label}</span><input className={fieldClassName} dir='auto' id='contact-use' name='use' placeholder={fields.use.placeholder} type='text' />
              </motion.label>

              <motion.label className='mb-8 block' htmlFor='contact-budget' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
                <span className='text-sm font-medium text-black'>{fields.budget.label}</span><input className={fieldClassName} dir='auto' id='contact-budget' name='budget' placeholder={fields.budget.placeholder} type='text' />
              </motion.label>
            </div>

            <motion.label className='block' htmlFor='contact-details' transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
              <span className='text-sm font-medium text-black'>{fields.details.label}<span aria-hidden='true'> *</span></span><textarea className={`${fieldClassName} min-h-40 resize-y`} dir='auto' id='contact-details' name='details' placeholder={fields.details.placeholder} required rows='6' />
            </motion.label>

            <motion.div transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
              <p className='mt-4 text-sm leading-6 text-black/45'>{forms.uploadHint}</p>
              <motion.button className='mt-8 min-h-14 bg-black px-8 text-sm font-semibold text-white outline-none hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4' type='submit' whileHover={reducedMotion ? undefined : { y: -3 }} whileTap={reducedMotion ? undefined : { scale: 0.98 }}>{t('actions.prepareInquiry')}</motion.button>
              <p aria-live='polite' className='mt-5 min-h-5 text-sm text-black/55'>{status}</p>
            </motion.div>
          </motion.form>
        </div>
      </section>

      <section className='bg-neutral-50 py-20 sm:py-24 lg:py-28'>
        <div className='mx-auto grid w-full max-w-[1600px] gap-14 px-4 sm:px-6 lg:grid-cols-[0.62fr_1fr] lg:gap-24 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
          <SectionHeader description={copy.next.description} eyebrow={copy.next.eyebrow} title={copy.next.title} />
          <motion.ol className='border-t border-black/25' initial={reducedMotion ? false : 'hidden'} variants={staggerContainer(reducedMotion ? 0 : 0.1)} viewport={motionViewport} whileInView='visible'>
            {copy.next.items.map((step, index) => (
              <motion.li className='grid grid-cols-[3rem_minmax(0,1fr)] gap-5 border-b border-black/20 py-7 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-7 sm:py-9' key={step.title} transition={{ duration: reducedMotion ? 0 : motionDuration.base, ease: motionEase }} variants={reducedMotion ? undefined : fadeUp}>
                <span className='text-sm font-semibold text-black/35'>{formatNumber(index + 1, { minimumIntegerDigits: 2 })}</span>
                <div className='grid gap-3 sm:grid-cols-[0.72fr_1fr] sm:gap-8'><h3 className='text-2xl font-semibold tracking-[-0.035em] text-black'>{step.title}</h3><p className='text-base leading-7 text-black/55'>{step.description}</p></div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>
    </AnimatedPage>
  )
}

export default Contact
