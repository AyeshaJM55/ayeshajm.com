import PropTypes from 'prop-types'

function PageHero({ actions, description, eyebrow, image, imageAlt, title, titleClassName }) {
  return (
    <section className='bg-hero-surface px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-[clamp(2.5rem,4vw,4.75rem)] lg:pb-24 lg:pt-40'>
      <div className={`mx-auto grid w-full max-w-[1600px] gap-12 ${image ? 'lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.75fr)] lg:items-end' : ''}`}>
        <div>
          {eyebrow ? <p className='text-xs font-semibold uppercase tracking-[0.16em] text-black/45'>{eyebrow}</p> : null}
          <h1 className={`mt-5 font-semibold tracking-[-0.065em] text-black ${titleClassName ?? 'max-w-5xl text-[clamp(3.25rem,8vw,8.5rem)] leading-[0.9]'}`}>
            {title}
          </h1>
          {description ? <p className='mt-8 max-w-3xl text-lg leading-8 text-black/60 sm:text-xl sm:leading-9'>{description}</p> : null}
          {actions ? <div className='mt-9 flex flex-wrap gap-3'>{actions}</div> : null}
        </div>

        {image ? (
          <div className='aspect-[4/3] overflow-hidden bg-neutral-200'>
            <img alt={imageAlt} className='size-full object-cover' height='900' src={image} width='1200' />
          </div>
        ) : null}
      </div>
    </section>
  )
}

PageHero.propTypes = {
  actions: PropTypes.node,
  description: PropTypes.string,
  eyebrow: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  title: PropTypes.string.isRequired,
  titleClassName: PropTypes.string,
}

export default PageHero
