import PropTypes from 'prop-types'

function MediaGrid({ images, title }) {
  return (
    <section aria-label={title} className='grid gap-4 sm:grid-cols-2'>
      {images.map((image, index) => (
        <figure className={index === 0 ? 'sm:col-span-2' : ''} key={`${image}-${index}`}>
          <div className={index === 0 ? 'aspect-[16/9]' : 'aspect-square'}>
            <img alt={`${title} view ${index + 1}`} height='900' className='size-full object-cover' width='1200' loading='lazy' src={image} />
          </div>
        </figure>
      ))}
    </section>
  )
}

MediaGrid.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
}

export default MediaGrid
