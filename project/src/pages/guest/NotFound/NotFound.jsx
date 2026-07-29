import SiteLayout from '../../../layouts/SiteLayout/SiteLayout'

function NotFound() {
  return (
    <SiteLayout>
      <main aria-label='Page not found' className='flex min-h-[100svh] items-center bg-white px-4 pb-20 pt-32 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]' id='main-content'>
        <div className='mx-auto w-full max-w-[1600px]'><p className='text-xs font-semibold uppercase tracking-[0.16em] text-black/40'>404</p><h1 className='mt-5 max-w-5xl text-[clamp(4rem,12vw,11rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-black'>This render is missing.</h1><p className='mt-8 max-w-2xl text-lg leading-8 text-black/55'>The requested page does not exist, moved, or escaped the scene before export.</p><div className='mt-10 flex flex-wrap gap-3'><a className='inline-flex min-h-14 items-center bg-black px-7 text-sm font-semibold text-white' href='/'>Home</a><a className='inline-flex min-h-14 items-center border border-black px-7 text-sm font-semibold text-black' href='/portfolio'>Portfolio</a><a className='inline-flex min-h-14 items-center border border-black px-7 text-sm font-semibold text-black' href='/contact'>Contact</a></div></div>
      </main>
    </SiteLayout>
  )
}

export default NotFound
