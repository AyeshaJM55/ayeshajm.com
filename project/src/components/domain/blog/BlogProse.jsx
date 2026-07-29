import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


const isExternalHref = (href = '') => /^https?:\/\//i.test(href)

function BlogProse({ content }) {
  return (
    <div className='max-w-3xl text-black'>
      <ReactMarkdown
        components={{
          a: ({ children, href }) => <a className='font-medium underline decoration-black/30 underline-offset-4 hover:decoration-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black' href={href} rel={isExternalHref(href) ? 'noreferrer' : undefined} target={isExternalHref(href) ? '_blank' : undefined}>{children}</a>,
          blockquote: ({ children }) => <blockquote className='my-10 border-l-4 border-black pl-6 text-xl font-medium leading-8 tracking-[-0.02em] text-black/75'>{children}</blockquote>,
          code: ({ children, className }) => className ? <code className={`${className} block overflow-x-auto bg-neutral-950 p-5 text-sm leading-7 text-white`}>{children}</code> : <code className='bg-neutral-100 px-1.5 py-1 text-[0.92em]'>{children}</code>,
          h2: ({ children }) => <h2 className='mb-5 mt-14 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl'>{children}</h2>,
          h3: ({ children }) => <h3 className='mb-4 mt-10 text-2xl font-semibold tracking-[-0.035em]'>{children}</h3>,
          hr: () => <hr className='my-12 border-black/15' />,
          img: ({ alt, src }) => <img alt={alt ?? ''} className='my-10 h-auto w-full bg-neutral-100 object-contain' decoding='async' height='900' loading='lazy' src={src} width='1600' />,
          li: ({ children }) => <li className='pl-2'>{children}</li>,
          ol: ({ children }) => <ol className='my-6 list-decimal space-y-3 pl-6 text-base leading-8 text-black/65 sm:text-lg'>{children}</ol>,
          p: ({ children }) => <p className='my-6 text-base leading-8 text-black/65 sm:text-lg sm:leading-9'>{children}</p>,
          pre: ({ children }) => <pre className='my-8 overflow-hidden'>{children}</pre>,
          table: ({ children }) => <div className='my-8 overflow-x-auto'><table className='w-full border-collapse text-left text-sm'>{children}</table></div>,
          td: ({ children }) => <td className='border border-black/15 p-3 text-black/65'>{children}</td>,
          th: ({ children }) => <th className='border border-black/20 bg-neutral-100 p-3 font-semibold'>{children}</th>,
          ul: ({ children }) => <ul className='my-6 list-disc space-y-3 pl-6 text-base leading-8 text-black/65 sm:text-lg'>{children}</ul>,
        }}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

BlogProse.propTypes = { content: PropTypes.string.isRequired }
export default BlogProse
