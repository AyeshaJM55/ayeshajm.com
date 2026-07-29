import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

import './src/index.css'
import App from './src/App'


const rootElement = document.getElementById('root')
const isPrerendered = rootElement.hasChildNodes()
const app = (
  <StrictMode>
    <App
      initialLocation={`${window.location.pathname}${window.location.search}${window.location.hash}`}
      initialRouteReady={isPrerendered}
    />
  </StrictMode>
)

if (isPrerendered) hydrateRoot(rootElement, app)
else createRoot(rootElement).render(app)
