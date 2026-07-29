import PropTypes from 'prop-types'

function MetricStrip({ items }) {
  return (
    <dl className='grid border-l border-t border-black/15 sm:grid-cols-2 lg:grid-cols-4'>
      {items.map((item) => (
        <div className='border-b border-r border-black/15 p-6 sm:p-8' key={item.label}>
          <dt className='text-xs font-semibold uppercase tracking-[0.14em] text-black/40'>{item.label}</dt>
          <dd className='mt-4 text-xl font-semibold tracking-[-0.025em] text-black'>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

MetricStrip.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string.isRequired, value: PropTypes.string.isRequired })).isRequired,
}

export default MetricStrip
