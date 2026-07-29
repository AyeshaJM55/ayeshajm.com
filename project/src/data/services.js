import { getActiveLocale, loadLocaleContent } from '../locales'
import { assets } from '../locales/assetManifests'

export const serviceManifest = [
  { slug: '3d-modeling', number: '01', heroMedia: 'productDesign', supportingMedia: 'materialStudy', video: 'serviceVideoA', relatedProjectSlugs: ['3d-product-design', 'product-visualization', 'studio-renders'] },
  { slug: 'photorealistic-renders', number: '02', heroMedia: 'photorealisticRenders', supportingMedia: 'amazonHero', video: 'serviceVideoB', relatedProjectSlugs: ['photorealistic-renders', 'amazon-product-visuals', 'studio-renders'] },
  { slug: 'product-cgi-animation', number: '03', heroMedia: 'productRender', supportingMedia: 'materialStudy', video: 'serviceVideoA', relatedProjectSlugs: ['product-visualization', '3d-product-design', 'amazon-product-visuals'] },
  { slug: 'lifestyle-renders', number: '04', heroMedia: 'lifestyleRender', supportingMedia: 'lifestyleRenderTwo', video: 'serviceVideoB', relatedProjectSlugs: ['lifestyle-rendering', 'lifestyle-art-direction', 'material-exploration'] },
]

export function getServices(locale = getActiveLocale()) {
  const copy = loadLocaleContent(locale).services
  return serviceManifest.map((item) => ({ ...item, ...copy[item.slug], heroMedia: assets[item.heroMedia], supportingMedia: assets[item.supportingMedia], video: assets[item.video] }))
}

export const getServiceBySlug = (slug, locale = getActiveLocale()) => getServices(locale).find((service) => service.slug === slug)
export const services = getServices('en')
