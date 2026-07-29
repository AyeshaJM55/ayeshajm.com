function RouteLoader() {
  return (
    <main
      aria-busy='true'
      aria-label='Loading page'
      className='route-loader grid min-h-[70svh] place-items-center bg-white'
      role='status'
    >
      <span aria-hidden='true' className='route-spinner' />
    </main>
  )
}


export default RouteLoader
