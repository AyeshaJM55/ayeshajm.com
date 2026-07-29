import PropTypes from 'prop-types'

import serviceVideoA from '../../../../../assets/services/service-a.mp4'
import serviceVideoB from '../../../../../assets/services/service-b.mp4'
import { useLocale } from '../../../../../locales/useLocale'

function ServiceCard({ index, isActive, service, videoRef }) {
  const serviceVideo = index % 2 === 0 ? serviceVideoA : serviceVideoB
  const { formatNumber } = useLocale()

  return (
    <article aria-label={service.title} className='relative h-[58svh] min-h-[400px] max-h-[680px] overflow-hidden bg-neutral-900 shadow-2xl shadow-black/40'>
      <video aria-hidden='true' autoPlay={index === 0} className='absolute inset-0 size-full object-cover' loop muted playsInline preload='metadata' ref={videoRef} src={serviceVideo} />
      <div aria-hidden='true' className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent transition-[height,opacity] duration-700 ease-out ${isActive ? 'h-[55%] opacity-100' : 'h-[24%] opacity-70'}`} />
      <div className='absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 lg:p-10'>
        <p className='text-xs font-semibold uppercase tracking-[0.16em] text-white/55'>{formatNumber(index + 1, { minimumIntegerDigits: 2, useGrouping: false })}</p>
        <h3 className='mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl'>{service.title}</h3>
        <p className={`mt-4 max-w-2xl text-sm leading-6 text-white/70 transition-all duration-700 sm:text-base sm:leading-7 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>{service.description}</p>
      </div>
    </article>
  )
}

ServiceCard.propTypes = {
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  service: PropTypes.shape({ title: PropTypes.string.isRequired, description: PropTypes.string.isRequired }).isRequired,
  videoRef: PropTypes.func.isRequired,
}
export default ServiceCard
