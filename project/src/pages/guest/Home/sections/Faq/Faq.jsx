import { useState } from 'react'

import { useLocale } from '../../../../../locales/useLocale'
import FaqItem from './FaqItem'

function Faq() {
  const [openIndex, setOpenIndex] = useState(-1)
  const { content } = useLocale()
  const copy = content.pages.home.faq

  return (
    <section aria-labelledby='faq-title' className='bg-white py-14 sm:py-16 lg:py-20'>
      <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
        <header className='ms-auto max-w-2xl text-end'><h2 className='text-4xl font-semibold tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl' id='faq-title'>{copy.title}</h2></header>
        <div className='mt-8 grid grid-cols-1 gap-x-12 sm:mt-10 lg:grid-cols-2 lg:gap-x-16'>
          {copy.items.map((faq, index) => (
            <FaqItem answer={faq.answer} isOpen={openIndex === index} key={faq.question} onToggle={() => setOpenIndex((current) => current === index ? -1 : index)} question={faq.question} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Faq
