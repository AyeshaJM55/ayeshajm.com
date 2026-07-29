import { useLocale } from '../../../locales/useLocale'

function RouteLoader() {
  const { t } = useLocale()
  return <main aria-busy='true' aria-label={t('accessibility.loadingPage')} className='route-loader grid min-h-[70svh] place-items-center bg-white' role='status'><span aria-hidden='true' className='route-spinner' /></main>
}

export default RouteLoader
