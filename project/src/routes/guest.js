import { lazy } from 'react'

import { getProjectBySlug } from '../data/projects'
import { getServiceBySlug } from '../data/services'


const createLazyPage = (loadPage) => ({ loadPage, Page: lazy(loadPage) })

const homePage = createLazyPage(() => import('../pages/guest/Home/Home'))
const aboutPage = createLazyPage(() => import('../pages/guest/About/About'))
const servicesPage = createLazyPage(() => import('../pages/guest/Services/Services'))
const portfolioPage = createLazyPage(() => import('../pages/guest/Portfolio/Portfolio'))
const contactPage = createLazyPage(() => import('../pages/guest/Contact/Contact'))
const bookPage = createLazyPage(() => import('../pages/guest/Book/Book'))
const serviceDetailPage = createLazyPage(() => import('../pages/guest/ServiceDetail/ServiceDetail'))
const workDetailPage = createLazyPage(() => import('../pages/guest/WorkDetail/WorkDetail'))
const notFoundPage = createLazyPage(() => import('../pages/guest/NotFound/NotFound'))


const guestRoutes = [
  { path: '/', title: 'Home', description: '3D product visualization, CGI animation, and campaign-ready imagery for brands and e-commerce.', ...homePage },
  { path: '/about', title: 'About', description: 'About Ayesha J. and the process behind clear, commercially useful 3D product visuals.', ...aboutPage },
  { path: '/services', title: 'Services', description: '3D modeling, photorealistic rendering, CGI animation, and lifestyle rendering services.', ...servicesPage },
  { path: '/portfolio', title: 'Portfolio', description: 'Selected 3D product visualization, e-commerce, lifestyle, and material-development work.', ...portfolioPage },
  { path: '/contact', title: 'Contact', description: 'Start a 3D product visualization, rendering, animation, or lifestyle-image project.', ...contactPage },
  { path: '/book', title: 'Book a Call', description: 'Request a project consultation with Ayesha J.', ...bookPage },
  {
    path: '/services/:slug',
    pattern: /^\/services\/(?<slug>[a-z0-9-]+)\/?$/,
    getTitle: ({ slug }) => getServiceBySlug(slug)?.title ?? 'Page Not Found',
    getDescription: ({ slug }) => getServiceBySlug(slug)?.description ?? 'The requested service page could not be found.',
    ...serviceDetailPage,
  },
  {
    path: '/work/:slug',
    pattern: /^\/work\/(?<slug>[a-z0-9-]+)\/?$/,
    getTitle: ({ slug }) => getProjectBySlug(slug)?.title ?? 'Page Not Found',
    getDescription: ({ slug }) => getProjectBySlug(slug)?.summary ?? 'The requested project page could not be found.',
    ...workDetailPage,
  },
  { path: '*', title: 'Page Not Found', description: 'The requested page could not be found.', ...notFoundPage },
]


export default guestRoutes
