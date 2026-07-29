import { ChevronDown } from 'lucide-react'
import PropTypes from 'prop-types'

function FaqItem({ answer, isOpen, onToggle, question }) {
  return (
    <article className='border-t border-black/15 last:border-b'>
      <h3>
        <button aria-expanded={isOpen} className='group flex w-full items-center justify-between gap-6 py-6 text-start outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4' onClick={onToggle} type='button'>
          <span className='text-lg font-medium tracking-[-0.02em] text-black sm:text-xl'>{question}</span>
          <span className='flex size-10 shrink-0 items-center justify-center rounded-full border border-black/15 transition-colors duration-300 group-hover:bg-black group-hover:text-white'>
            <ChevronDown aria-hidden='true' className={`size-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </span>
        </button>
      </h3>
      <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className='overflow-hidden'><p className='max-w-2xl pb-7 pe-12 text-base leading-7 text-black/55'>{answer}</p></div>
      </div>
    </article>
  )
}

FaqItem.propTypes = { answer: PropTypes.string.isRequired, isOpen: PropTypes.bool.isRequired, onToggle: PropTypes.func.isRequired, question: PropTypes.string.isRequired }
export default FaqItem
