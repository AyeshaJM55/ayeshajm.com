import { getActiveLocale, loadLocaleContent } from '../locales'
import { assets } from '../locales/assetManifests'

export const projectManifest = [
  { slug: '3d-product-design', categoryId: 'product-design', services: ['3d-modeling', 'photorealistic-renders'], coverImage: 'productDesign', gallery: ['productDesign', 'studioRenders', 'productRender'], year: '2026', nextProjectSlug: 'amazon-product-visuals' },
  { slug: 'amazon-product-visuals', categoryId: 'ecommerce', services: ['photorealistic-renders', '3d-modeling'], coverImage: 'amazonHero', gallery: ['amazonHero', 'productRender', 'materialStudy'], year: '2026', nextProjectSlug: 'lifestyle-rendering' },
  { slug: 'lifestyle-rendering', categoryId: 'lifestyle', services: ['lifestyle-renders', 'photorealistic-renders'], coverImage: 'lifestyleRender', gallery: ['lifestyleRender', 'lifestyleRenderTwo', 'materialStudy'], year: '2026', nextProjectSlug: 'lifestyle-art-direction' },
  { slug: 'lifestyle-art-direction', categoryId: 'lifestyle', services: ['lifestyle-renders'], coverImage: 'lifestyleRenderTwo', gallery: ['lifestyleRenderTwo', 'lifestyleRender', 'studioRenders'], year: '2026', nextProjectSlug: 'material-exploration' },
  { slug: 'material-exploration', categoryId: 'material-studies', services: ['photorealistic-renders', '3d-modeling'], coverImage: 'materialStudy', gallery: ['materialStudy', 'photorealisticRenders', 'productDesign'], year: '2026', nextProjectSlug: 'photorealistic-renders' },
  { slug: 'photorealistic-renders', categoryId: 'photorealistic', services: ['photorealistic-renders'], coverImage: 'photorealisticRenders', gallery: ['photorealisticRenders', 'studioRenders', 'materialStudy'], year: '2026', nextProjectSlug: 'product-visualization' },
  { slug: 'product-visualization', categoryId: 'product-design', services: ['3d-modeling', 'photorealistic-renders', 'product-cgi-animation'], coverImage: 'productRender', gallery: ['productRender', 'productDesign', 'amazonHero'], year: '2026', nextProjectSlug: 'studio-renders' },
  { slug: 'studio-renders', categoryId: 'photorealistic', services: ['photorealistic-renders'], coverImage: 'studioRenders', gallery: ['studioRenders', 'photorealisticRenders', 'productRender'], year: '2026', nextProjectSlug: '3d-product-design' },
]

export function getProjects(locale = getActiveLocale()) {
  const copy = loadLocaleContent(locale).projects
  return projectManifest.map((item) => ({
    ...item, ...copy.items[item.slug], category: copy.categories[item.categoryId],
    coverImage: assets[item.coverImage], gallery: item.gallery.map((key) => assets[key]),
  }))
}

export const getProjectCategories = (locale = getActiveLocale()) => {
  const copy = loadLocaleContent(locale).projects.categories
  return [{ id: 'all', label: copy.all }, ...[...new Set(projectManifest.map((project) => project.categoryId))].map((id) => ({ id, label: copy[id] }))]
}
export const getProjectBySlug = (slug, locale = getActiveLocale()) => getProjects(locale).find((project) => project.slug === slug)
export const projects = getProjects('en')
export const projectCategories = getProjectCategories('en').map(({ label }) => label)
