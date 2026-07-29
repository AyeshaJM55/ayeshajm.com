import PropTypes from 'prop-types'

function TextMediaSplit({ children, image, imageAlt, reverse = false }) {
  return (
    <div className='grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16'>
      <div className={reverse ? 'lg:order-2' : ''}>{children}</div>
      <div className={`aspect-[4/3] overflow-hidden bg-neutral-100 ${reverse ? 'lg:order-1' : ''}`}>
        <img alt={imageAlt} height='900' className='size-full object-cover' width='1200' loading='lazy' src={image} />
      </div>
    </div>
  )
}

TextMediaSplit.propTypes = {
  children: PropTypes.node.isRequired,
  image: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  reverse: PropTypes.bool,
}

export default TextMediaSplit
