import PropTypes from 'prop-types'


function AuthorCard({ author }) {
  return (
    <section className='grid gap-8 border-b border-black/15 pb-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-end'>
      <img alt={author.avatarAlt} className='aspect-square w-full max-w-64 rounded-full object-cover' decoding='async' height='500' loading='eager' src={author.avatar} width='500' />
      <div>
        <p className='text-xs font-semibold uppercase tracking-[0.16em] text-black/40'>Author</p>
        <h1 className='mt-5 text-[clamp(3.5rem,9vw,8rem)] font-semibold leading-[0.88] tracking-[-0.07em]'>{author.name}</h1>
        <p className='mt-6 text-xl font-medium tracking-[-0.025em]'>{author.role}</p>
        <p className='mt-4 max-w-3xl text-base leading-8 text-black/55 sm:text-lg'>{author.shortBio}</p>
      </div>
    </section>
  )
}

AuthorCard.propTypes = { author: PropTypes.object.isRequired }
export default AuthorCard
