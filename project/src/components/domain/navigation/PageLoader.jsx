function PageLoader() {
  return (
    <main
      aria-busy='true'
      aria-label='Loading page'
      className='grid min-h-[72svh] place-items-center bg-white px-4 pt-24'
      id='main-content'
    >
      <div className='grid place-items-center' role='status'>
        <span aria-hidden='true' className='size-11 animate-spin rounded-full border-2 border-black/15 border-t-black' />
        <span className='sr-only'>Loading page</span>
      </div>
    </main>
  )
}


export default PageLoader
