import { createRoot } from 'react-dom/client'
import '@fontsource/padauk/400.css'
import '@fontsource/padauk/700.css'
import './index.css'
import App from './App.tsx'
import { HashRouter } from 'react-router-dom'

// HashRouter keeps routes in the URL hash, so the offline build needs no web server.
createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <App />
  </HashRouter>,
)
