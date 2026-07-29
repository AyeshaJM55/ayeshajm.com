import PropTypes from 'prop-types'

function ProcessSteps({ steps }) {
  return (
    <ol className='grid border-l border-t border-black/15 sm:grid-cols-2 lg:grid-cols-4'>
      {steps.map((step, index) => (
        <li className='min-h-64 border-b border-r border-black/15 p-6 sm:p-8' key={step.title}>
          <p className='text-xs font-semibold uppercase tracking-[0.16em] text-black/35'>{String(index + 1).padStart(2, '0')}</p>
          <h3 className='mt-12 text-2xl font-semibold tracking-[-0.035em] text-black'>{step.title}</h3>
          <p className='mt-4 text-sm leading-6 text-black/55'>{step.description}</p>
        </li>
      ))}
    </ol>
  )
}

ProcessSteps.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({ description: PropTypes.string.isRequired, title: PropTypes.string.isRequired })).isRequired,
}

export default ProcessSteps
