import About from '../pages/guest/About/About'
import Contact from '../pages/guest/Contact/Contact'
import Home from '../pages/guest/Home/Home'
import Portfolio from '../pages/guest/Portfolio/Portfolio'
import Services from '../pages/guest/Services/Services'

const guestRoutes = [
  {
    path: '/',
    title: 'Home',
    Page: Home,
  },
  {
    path: '/about',
    title: 'About',
    Page: About,
  },
  {
    path: '/services',
    title: 'Services',
    Page: Services,
  },
  {
    path: '/portfolio',
    title: 'Portfolio',
    Page: Portfolio,
  },
  {
    path: '/contact',
    title: 'Contact',
    Page: Contact,
  },
]

export default guestRoutes
