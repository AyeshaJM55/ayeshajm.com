import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

const fieldClassName =
  'w-full border-b border-black/20 bg-transparent px-0 py-4 text-base text-black outline-none transition-colors placeholder:text-black/35 focus:border-black sm:text-lg'

function LeaveMessage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      aria-labelledby='leave-message-title'
      className='flex min-h-[100svh] items-center bg-white py-20 sm:py-24 lg:py-28'
      id='contact'
    >
      <div className='mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(480px,1fr)] lg:gap-20 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
        <header className='flex flex-col justify-between lg:min-h-[620px]'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.16em] text-black/45'>
              Start a project
            </p>
            <h2
              className='mt-5 max-w-2xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-black sm:text-6xl lg:text-7xl xl:text-8xl'
              id='leave-message-title'
            >
              Leave a message
            </h2>
          </div>

          <p className='mt-8 max-w-lg text-base leading-7 text-black/55 sm:text-lg sm:leading-8 lg:mt-16'>
            Share a few details about your product, goals, timeline, and the visuals you need. Every useful project begins with someone filling out a form, because apparently telepathy still has terrible browser support.
          </p>
        </header>

        <form
          className='flex flex-col justify-center'
          onSubmit={handleSubmit}
        >
          <div className='grid grid-cols-1 gap-x-8 sm:grid-cols-2'>
            <label className='block' htmlFor='leave-message-name'>
              <span className='text-sm font-medium text-black'>Name</span>
              <input
                className={fieldClassName}
                id='leave-message-name'
                name='name'
                placeholder='Your name'
                required
                type='text'
              />
            </label>

            <label className='mt-8 block sm:mt-0' htmlFor='leave-message-email'>
              <span className='text-sm font-medium text-black'>Email</span>
              <input
                className={fieldClassName}
                id='leave-message-email'
                name='email'
                placeholder='you@example.com'
                required
                type='email'
              />
            </label>

            <label className='mt-8 block' htmlFor='leave-message-company'>
              <span className='text-sm font-medium text-black'>Company</span>
              <input
                className={fieldClassName}
                id='leave-message-company'
                name='company'
                placeholder='Company or brand'
                type='text'
              />
            </label>

            <label className='mt-8 block' htmlFor='leave-message-project-type'>
              <span className='text-sm font-medium text-black'>Project type</span>
              <select
                className={`${fieldClassName} appearance-none`}
                defaultValue=''
                id='leave-message-project-type'
                name='projectType'
                required
              >
                <option disabled value=''>Select a service</option>
                <option value='3d-modeling'>3D Modeling</option>
                <option value='product-renders'>Product Renders</option>
                <option value='animation'>CGI Animation</option>
                <option value='lifestyle-renders'>Lifestyle Renders</option>
              </select>
            </label>
          </div>

          <label className='mt-8 block' htmlFor='leave-message-details'>
            <span className='text-sm font-medium text-black'>Project details</span>
            <textarea
              className={`${fieldClassName} min-h-36 resize-y`}
              id='leave-message-details'
              name='message'
              placeholder='Tell me about the product, deliverables, timeline, and anything else that matters.'
              required
              rows='5'
            />
          </label>

          <div className='mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between'>
            <button
              className='group inline-flex min-h-14 items-center justify-center gap-3 bg-black px-8 text-base font-semibold text-white transition-colors duration-300 hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4'
              type='submit'
            >
              Send Message
              <ArrowUpRight
                aria-hidden='true'
                className='size-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1'
              />
            </button>

            <p
              aria-live='polite'
              className='text-sm text-black/55'
            >
              {submitted ? 'Thank you. Your message is ready to be reviewed.' : 'Required fields are marked by the browser.'}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

export default LeaveMessage
