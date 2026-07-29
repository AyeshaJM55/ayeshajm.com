import PropTypes from 'prop-types'

function Breadcrumbs({ items }) {
  return (
    <nav aria-label='Breadcrumb'>
      <ol className='flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/45'>
        {items.map((item, index) => (
          <li className='flex items-center gap-2' key={item.label}>
            {index > 0 ? <span aria-hidden='true'>/</span> : null}
            {item.href ? <a className='outline-none hover:text-black focus-visible:ring-2 focus-visible:ring-black' href={item.href}>{item.label}</a> : <span aria-current='page'>{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ href: PropTypes.string, label: PropTypes.string.isRequired })).isRequired,
}

export default Breadcrumbs
