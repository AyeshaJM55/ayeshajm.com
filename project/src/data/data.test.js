import { describe, expect, it } from 'vitest'
import { projects } from './projects'
import { services } from './services'

describe('site data', () => {
  it('contains unique service and project slugs with valid references', () => {
    expect(new Set(services.map((service) => service.slug)).size).toBe(services.length)
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length)

    const projectSlugs = new Set(projects.map((project) => project.slug))
    const serviceSlugs = new Set(services.map((service) => service.slug))

    services.forEach((service) => service.relatedProjectSlugs.forEach((slug) => expect(projectSlugs.has(slug)).toBe(true)))
    projects.forEach((project) => {
      expect(projectSlugs.has(project.nextProjectSlug)).toBe(true)
      project.services.forEach((slug) => expect(serviceSlugs.has(slug)).toBe(true))
    })
  })
})
