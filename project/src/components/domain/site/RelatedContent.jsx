import PropTypes from 'prop-types'

import { useLocale } from '../../../locales/useLocale'
import StaggerGrid from '../motion/StaggerGrid'
import ProjectCard from './ProjectCard'
import SectionHeader from './SectionHeader'

function RelatedContent({ projects, title }) {
  const { t } = useLocale()
  return (
    <section className='bg-white py-20 sm:py-24 lg:py-28'>
      <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
        <SectionHeader eyebrow={t('common.labels.selectedProjects')} title={title ?? t('common.labels.relatedWork')} />
        <StaggerGrid className='mt-12 grid gap-8 md:grid-cols-3'>{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</StaggerGrid>
      </div>
    </section>
  )
}

RelatedContent.propTypes = { projects: PropTypes.arrayOf(PropTypes.object).isRequired, title: PropTypes.string }
export default RelatedContent
