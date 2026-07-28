import PropTypes from 'prop-types'

function SiteLayout({ children }) {
  return <div className='min-h-screen bg-canvas text-foreground'>{children}</div>
}

SiteLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SiteLayout
