import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

import clientAvatar from '../../../../../assets/testimonials/client-avatar.jpg'
import { CARD_OFFSET, CARD_SCALE_STEP, MAX_VISIBLE_CARDS } from './TestimonialsData'

function TestimonialCard({ testimonial, relativeIndex }) {
  const isFront = relativeIndex === 0
  const isHidden = relativeIndex >= MAX_VISIBLE_CARDS

  return (
    <motion.article
      animate={{
        y: -(relativeIndex * CARD_OFFSET),
        scale: 1 - relativeIndex * CARD_SCALE_STEP,
        opacity: isHidden ? 0 : relativeIndex === MAX_VISIBLE_CARDS - 1 ? 0.35 : 1,
        zIndex: MAX_VISIBLE_CARDS - relativeIndex,
        filter: `brightness(${1 - relativeIndex * 0.1})`,
      }}
      aria-hidden={!isFront}
      className={`testimonial-card rounded-2xl border border-black/5 bg-white p-6 shadow-[0_20px_60px_rgba(46,33,61,0.1)] sm:p-8 lg:p-10 ${isFront ? 'testimonial-card--front' : 'testimonial-card--back'}`}
      initial={false}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
    >
      <div aria-hidden='true' className='select-none text-6xl leading-none text-testimonial-ink sm:text-7xl'>
        “
      </div>

      <blockquote className='mt-1 text-base italic leading-7 text-testimonial-copy sm:text-lg sm:leading-8'>
        {testimonial.quote}
      </blockquote>

      <footer className='mt-7 flex items-center gap-4'>
        <img
          alt=''
          className='size-12 shrink-0 rounded-full bg-neutral-100 object-cover'
          src={clientAvatar}
        />
        <div>
          <cite className='not-italic text-base font-semibold text-testimonial-name'>
            {testimonial.name}
          </cite>
          <p className='mt-0.5 text-sm font-medium text-testimonial-muted'>
            {testimonial.role}
          </p>
        </div>
      </footer>
    </motion.article>
  )
}

TestimonialCard.propTypes = {
  relativeIndex: PropTypes.number.isRequired,
  testimonial: PropTypes.shape({
    quote: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
}

export default TestimonialCard
