export default function LoadingSpinner() {
  return (
    <div aria-hidden='true' className='pl'>
      <div className='pl__outer-ring' />
      <div className='pl__inner-ring' />
      <div className='pl__track-cover' />
      <span className='pl__monogram'>A.</span>
      <div className='pl__ball'>
        <div className='pl__ball-texture' />
        <div className='pl__ball-outer-shadow' />
        <div className='pl__ball-inner-shadow' />
        <div className='pl__ball-side-shadows' />
      </div>
    </div>
  )
}
