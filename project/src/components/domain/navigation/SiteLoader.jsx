import { useLocale } from '../../../locales/useLocale'
import LoadingSpinner from './SnowBallLoadingSpinner'

function SiteLoader() {
  const { t } = useLocale()
  return <div aria-busy='true' aria-label={t('accessibility.loadingWebsite')} className='site-loader fixed inset-0 z-[9999] grid min-h-[100svh] place-items-center overflow-hidden bg-white' role='status'><LoadingSpinner /></div>
}

export default SiteLoader
