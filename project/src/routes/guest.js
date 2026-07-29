import { lazy } from 'react'
import defaultSocialImage from '../assets/featured-work/render-1.png'
import aboutSocialImage from '../assets/featured-work/studio-renders.png'
import { getBlogPosts } from '../content/loadBlogPosts'
import { getProjects } from '../data/projects'
import { getServices } from '../data/services'

const createLazyPage = (loadPage) => ({ loadPage, Page: lazy(loadPage) })
const homePage = createLazyPage(() => import('../pages/guest/Home/Home'))
const aboutPage = createLazyPage(() => import('../pages/guest/About/About'))
const servicesPage = createLazyPage(() => import('../pages/guest/Services/Services'))
const portfolioPage = createLazyPage(() => import('../pages/guest/Portfolio/Portfolio'))
const contactPage = createLazyPage(() => import('../pages/guest/Contact/Contact'))
const bookPage = createLazyPage(() => import('../pages/guest/Book/Book'))
const blogPage = createLazyPage(() => import('../pages/guest/Blog/Blog'))
const blogDetailPage = createLazyPage(() => import('../pages/guest/BlogDetail/BlogDetail'))
const authorDetailPage = createLazyPage(() => import('../pages/guest/AuthorDetail/AuthorDetail'))
const serviceDetailPage = createLazyPage(() => import('../pages/guest/ServiceDetail/ServiceDetail'))
const workDetailPage = createLazyPage(() => import('../pages/guest/WorkDetail/WorkDetail'))
const notFoundPage = createLazyPage(() => import('../pages/guest/NotFound/NotFound'))

const services = getServices('en')
const projects = getProjects('en')
const posts = getBlogPosts('en')

const guestRoutes = [
  { id: 'home', path: '/', image: defaultSocialImage, ...homePage },
  { id: 'about', path: '/about', image: aboutSocialImage, ...aboutPage },
  { id: 'services', path: '/services', image: services[0].heroMedia, ...servicesPage },
  { id: 'portfolio', path: '/portfolio', image: projects[0].coverImage, ...portfolioPage },
  { id: 'blog', path: '/blog', image: posts.find((post) => post.featured)?.coverImage ?? posts[0]?.coverImage ?? defaultSocialImage, pageType: 'website', ...blogPage },
  { id: 'contact', path: '/contact', image: defaultSocialImage, ...contactPage },
  { id: 'book', path: '/book', image: defaultSocialImage, ...bookPage },
  { id: 'blogDetail', path: '/blog/:slug', pattern: /^\/blog\/(?<slug>[a-z0-9-]+)\/?$/, pageType: 'article', ...blogDetailPage },
  { id: 'authorDetail', path: '/authors/:slug', pattern: /^\/authors\/(?<slug>[a-z0-9-]+)\/?$/, pageType: 'profile', ...authorDetailPage },
  { id: 'serviceDetail', path: '/services/:slug', pattern: /^\/services\/(?<slug>[a-z0-9-]+)\/?$/, ...serviceDetailPage },
  { id: 'workDetail', path: '/work/:slug', pattern: /^\/work\/(?<slug>[a-z0-9-]+)\/?$/, ...workDetailPage },
  { id: 'notFound', path: '*', image: defaultSocialImage, ...notFoundPage },
]

export default guestRoutes
