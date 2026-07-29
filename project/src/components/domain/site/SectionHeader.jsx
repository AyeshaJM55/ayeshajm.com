import PropTypes from 'prop-types'

function SectionHeader({ description, eyebrow, title }) {
  return (
    <header className='max-w-3xl'>
      {eyebrow ? <p className='text-xs font-semibold uppercase tracking-[0.16em] text-black/45'>{eyebrow}</p> : null}
      <h2 className='mt-4 text-4xl font-semibold tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl'>{title}</h2>
      {description ? <p className='mt-4 text-base leading-7 text-black/55 sm:text-lg sm:leading-8'>{description}</p> : null}
    </header>
  )
}

SectionHeader.propTypes = {
  description: PropTypes.string,
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default SectionHeader
