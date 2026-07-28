import PropTypes from 'prop-types'


function SocialIcon({ name }) {
  if (name === 'instagram') {
    return (
      <svg aria-hidden='true' fill='none' height='40' viewBox='0 0 24 24' width='40'>
        <rect height='17' rx='5' stroke='currentColor' strokeWidth='1.8' width='17' x='3.5' y='3.5' />
        <circle cx='12' cy='12' r='4' stroke='currentColor' strokeWidth='1.8' />
        <circle cx='17.5' cy='6.7' fill='currentColor' r='1' />
      </svg>
    )
  }

  if (name === 'linkedin') {
    return (
      <svg aria-hidden='true' fill='currentColor' height='40' viewBox='0 0 24 24' width='40'>
        <path d='M6.2 8.4H3.3V21h2.9V8.4ZM4.75 3A1.75 1.75 0 1 0 4.75 6.5 1.75 1.75 0 0 0 4.75 3ZM20.7 13.8c0-3.8-2-5.6-4.7-5.6-2.2 0-3.2 1.2-3.7 2v-1.8H9.4V21h2.9v-6.2c0-1.6.3-3.2 2.4-3.2 2 0 2.1 1.9 2.1 3.3V21h2.9l1-7.2Z' />
      </svg>
    )
  }

  return (
    <svg aria-hidden='true' fill='none' height='40' viewBox='0 0 24 24' width='40'>
      <path d='M8.1 4h7.8l5.1 9H10.7L8.1 8.5 5.4 13H3l5.1-9Z' fill='currentColor' />
      <path d='M10.9 15H21l-4.1 5H8l-2.8-5h5.7Z' fill='currentColor' />
    </svg>
  )
}

SocialIcon.propTypes = {
  name: PropTypes.oneOf(['instagram', 'linkedin', 'artstation']).isRequired,
}

export default SocialIcon
