import PropTypes from 'prop-types'
import Header from './partials/Header/Header'

function SiteLayout({ children }) {
  return (
    <div className='min-h-screen bg-canvas text-foreground'>
      <Header />
      {children}
    </div>
  )
}

SiteLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SiteLayout
