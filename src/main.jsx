import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Mock de MSW activo también en producción: la demo en GitHub Pages
// no cuenta con un backend real, así que el Service Worker responde
// las solicitudes de /api directamente en el navegador.
async function enableMocking() {
  const { worker } = await import('./mocks/browser')
  return worker.start({
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
  })
}

// Si el Service Worker no se registra, se muestra un aviso en lugar
// de dejar la pantalla en blanco.
function showStartupError(error) {
  console.error('No se pudo iniciar el mock de MSW:', error)
  document.getElementById('root').innerHTML = `
    <main class="container">
      <div class="error-box" role="alert">
        <h2>No se pudo iniciar la aplicación</h2>
        <p>El servicio de datos local no está disponible. Recarga la página para intentarlo nuevamente.</p>
        <div class="error-actions">
          <button type="button" class="btn" onclick="window.location.reload()">Recargar página</button>
        </div>
      </div>
    </main>
  `
}

enableMocking()
  .then(() => {
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  })
  .catch(showStartupError)
