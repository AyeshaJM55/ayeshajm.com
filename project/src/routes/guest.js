import About from '../pages/guest/About/About'
import Book from '../pages/guest/Book/Book'
import Contact from '../pages/guest/Contact/Contact'
import Home from '../pages/guest/Home/Home'
import NotFound from '../pages/guest/NotFound/NotFound'
import Portfolio from '../pages/guest/Portfolio/Portfolio'
import ServiceDetail from '../pages/guest/ServiceDetail/ServiceDetail'
import Services from '../pages/guest/Services/Services'
import WorkDetail from '../pages/guest/WorkDetail/WorkDetail'
import { getProjectBySlug } from '../data/projects'
import { getServiceBySlug } from '../data/services'

const guestRoutes = [
  { path: '/', title: 'Home', description: '3D product visualization, CGI animation, and campaign-ready imagery for brands and e-commerce.', Page: Home },
  { path: '/about', title: 'About', description: 'About Ayesha J. and the process behind clear, commercially useful 3D product visuals.', Page: About },
  { path: '/services', title: 'Services', description: '3D modeling, photorealistic rendering, CGI animation, and lifestyle rendering services.', Page: Services },
  { path: '/portfolio', title: 'Portfolio', description: 'Selected 3D product visualization, e-commerce, lifestyle, and material-development work.', Page: Portfolio },
  { path: '/contact', title: 'Contact', description: 'Start a 3D product visualization, rendering, animation, or lifestyle-image project.', Page: Contact },
  { path: '/book', title: 'Book a Call', description: 'Request a project consultation with Ayesha J.', Page: Book },
  {
    path: '/services/:slug',
    pattern: /^\/services\/(?<slug>[a-z0-9-]+)\/?$/,
    getTitle: ({ slug }) => getServiceBySlug(slug)?.title ?? 'Page Not Found',
    getDescription: ({ slug }) => getServiceBySlug(slug)?.description ?? 'The requested service page could not be found.',
    Page: ServiceDetail,
  },
  {
    path: '/work/:slug',
    pattern: /^\/work\/(?<slug>[a-z0-9-]+)\/?$/,
    getTitle: ({ slug }) => getProjectBySlug(slug)?.title ?? 'Page Not Found',
    getDescription: ({ slug }) => getProjectBySlug(slug)?.summary ?? 'The requested project page could not be found.',
    Page: WorkDetail,
  },
  { path: '*', title: 'Page Not Found', description: 'The requested page could not be found.', Page: NotFound },
]

export default guestRoutes
