import { ApiError } from './api';

// Endpoint único de GraphQL, bajo BASE_URL para que el Service Worker
// lo intercepte también en la subcarpeta de GitHub Pages.
const GRAPHQL_ENDPOINT = `${import.meta.env.BASE_URL}graphql`;

// A diferencia de REST, el cliente define los campos exactos que necesita:
// una sola consulta trae vuelos y hoteles del destino, sin over-fetching.
const DESTINO_DETALLE_QUERY = `
  query GetDestinoDetalle($nombre: String!) {
    destino(nombre: $nombre) {
      nombre
      pais
      vuelos {
        id
        aerolinea
        fechaSalida
        fechaRegreso
        precio
        asientosDisponibles
      }
      hoteles {
        id
        nombre
        estrellas
        precioNoche
        habitacionesDisponibles
      }
    }
  }
`;

// API GraphQL mock: consulta el detalle de un destino (vuelos y hoteles).
// GraphQL responde con { data, errors }: los errores no dependen del
// código de estado HTTP, así que se revisan ambos por separado.
export async function fetchDestinoDetalle(nombre, { signal } = {}) {
  let response;
  try {
    response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: DESTINO_DETALLE_QUERY,
        variables: { nombre },
      }),
      signal,
    });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new ApiError(
      'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo nuevamente.',
      'network'
    );
  }

  if (!response.ok) {
    throw new ApiError(
      'El servidor tuvo un problema al responder. Inténtalo de nuevo en unos segundos.',
      response.status
    );
  }

  let payload;
  try {
    payload = await response.json();
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new ApiError(
      'El servidor respondió con datos inválidos. Inténtalo nuevamente.',
      response.status
    );
  }

  // Errores de GraphQL en el campo `errors`. Si el destino no existe,
  // se traduce a 404 para que la interfaz no ofrezca reintentar.
  if (payload.errors?.length) {
    const noEncontrado = !payload.data?.destino;
    throw new ApiError(
      payload.errors[0].message,
      noEncontrado ? 404 : response.status
    );
  }

  return payload.data.destino;
}
