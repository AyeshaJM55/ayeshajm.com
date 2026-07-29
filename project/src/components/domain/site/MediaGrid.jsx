import PropTypes from 'prop-types'

function MediaGrid({ fit = 'cover', images, title }) {
  const imageClassName = fit === 'contain' ? 'size-full object-contain p-4 sm:p-8' : 'size-full object-cover'

  return (
    <section aria-label={title} className='grid gap-4 sm:grid-cols-2'>
      {images.map((image, index) => (
        <figure className={index === 0 ? 'sm:col-span-2' : ''} key={`${image}-${index}`}>
          <div className={`overflow-hidden bg-neutral-900 ${index === 0 ? 'aspect-[16/9]' : 'aspect-square'}`}>
            <img alt={`${title} view ${index + 1}`} className={imageClassName} height='900' loading='lazy' src={image} width='1200' />
          </div>
        </figure>
      ))}
    </section>
  )
}

MediaGrid.propTypes = {
  fit: PropTypes.oneOf(['contain', 'cover']),
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
}

export default MediaGrid
