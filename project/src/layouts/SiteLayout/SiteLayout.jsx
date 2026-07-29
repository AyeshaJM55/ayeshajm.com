import PropTypes from 'prop-types'

import ScrollToTop from '../../components/domain/navigation/ScrollToTop'
import Footer from './partials/Footer/Footer'
import Header from './partials/Header/Header'


function SiteLayout({ children, pathname }) {
  return (
    <div className='min-h-screen bg-canvas text-foreground'>
      <Header pathname={pathname} />
      {children}
      <Footer />
      <ScrollToTop />
    </div>
  )
}


SiteLayout.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string,
}


export default SiteLayout
