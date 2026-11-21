// Las peticiones viven bajo BASE_URL para que el Service Worker,
// registrado con scope en la subcarpeta (GitHub Pages), las intercepte.
const API_BASE = `${import.meta.env.BASE_URL}api`;

// Error que conserva el estado de la respuesta (404, 5xx, 'network'),
// para que la interfaz pueda ofrecer acciones de recuperación pertinentes.
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function fetchJson(url, { signal } = {}) {
  let response;
  try {
    response = await fetch(url, { signal });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new ApiError(
      'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo nuevamente.',
      'network'
    );
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new ApiError('El destino solicitado no existe en el catálogo.', 404);
    }
    if (response.status >= 500) {
      throw new ApiError(
        'El servidor tuvo un problema al responder. Inténtalo de nuevo en unos segundos.',
        response.status
      );
    }
    throw new ApiError(`La solicitud falló con estado ${response.status}.`, response.status);
  }

  try {
    return await response.json();
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new ApiError(
      'El servidor respondió con datos inválidos. Inténtalo nuevamente.',
      response.status
    );
  }
}

// API REST mock: lista los destinos disponibles con país y actividades.
export function fetchDestinos(options) {
  return fetchJson(`${API_BASE}/destinos`, options);
}
