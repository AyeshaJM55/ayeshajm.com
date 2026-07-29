import PropTypes from 'prop-types'

function TextMediaSplit({ children, fit = 'cover', image, imageAlt, reverse = false }) {
  const imageClassName = fit === 'contain' ? 'size-full object-contain p-4 sm:p-7' : 'size-full object-cover'

  return (
    <div className='grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16'>
      <div className={reverse ? 'lg:order-2' : ''}>{children}</div>
      <div className={`aspect-[4/3] overflow-hidden bg-neutral-100 ${reverse ? 'lg:order-1' : ''}`}>
        <img alt={imageAlt} className={imageClassName} height='900' loading='lazy' src={image} width='1200' />
      </div>
    </div>
  )
}

TextMediaSplit.propTypes = {
  children: PropTypes.node.isRequired,
  fit: PropTypes.oneOf(['contain', 'cover']),
  image: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  reverse: PropTypes.bool,
}

export default TextMediaSplit
