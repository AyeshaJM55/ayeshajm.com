import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import useReducedMotion from '../../../hooks/useReducedMotion'
import { useLocale } from '../../../locales/useLocale'
import { motionDuration, motionEase, motionViewport } from '../../../motion/constants'

function MediaGrid({ fit = 'cover', images, title }) {
  const reducedMotion = useReducedMotion()
  const { formatNumber, t } = useLocale()
  const imageClassName = fit === 'contain' ? 'size-full object-contain p-4 sm:p-8' : 'size-full object-cover'

  return (
    <section aria-label={title} className='grid gap-4 sm:grid-cols-2'>
      {images.map((image, index) => (
        <motion.figure className={index === 0 ? 'sm:col-span-2' : ''} initial={reducedMotion ? false : { clipPath: 'inset(0 0 18% 0)', opacity: 0, y: 22 }} key={`${image}-${index}`} transition={{ delay: reducedMotion ? 0 : Math.min(index * 0.08, 0.2), duration: reducedMotion ? 0 : motionDuration.slow, ease: motionEase }} viewport={motionViewport} whileInView={{ clipPath: 'inset(0 0 0% 0)', opacity: 1, y: 0 }}>
          <div className={`overflow-hidden ${fit === 'contain' ? 'bg-white' : 'bg-neutral-900'} ${index === 0 ? 'aspect-[16/9]' : 'aspect-square'}`}>
            <img alt={t('accessibility.galleryView', { index: formatNumber(index + 1), title })} className={imageClassName} height='900' loading='lazy' src={image} width='1200' />
          </div>
        </motion.figure>
      ))}
    </section>
  )
}

MediaGrid.propTypes = { fit: PropTypes.oneOf(['contain', 'cover']), images: PropTypes.arrayOf(PropTypes.string).isRequired, title: PropTypes.string.isRequired }
export default MediaGrid
