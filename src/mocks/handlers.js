import { http, HttpResponse, delay } from 'msw';
import { graphql } from 'msw/graphql';
import { destinos, detallesPorDestino } from './data.js';

// API GraphQL: un único endpoint; el comodín intercepta la ruta con o
// sin el prefijo de la subcarpeta (BASE_URL) en desarrollo y gh-pages.
const api = graphql.link('*/graphql');

export const handlers = [
  // API REST: lista los destinos disponibles.
  // Comodín al inicio: intercepta la ruta con o sin el prefijo de la
  // subcarpeta (BASE_URL), tanto en desarrollo como en GitHub Pages.
  http.get('*/api/destinos', async () => {
    await delay(800);
    return HttpResponse.json(destinos);
  }),

  // API GraphQL: una sola consulta trae los vuelos y hoteles del destino,
  // demostrando la ventaja de GraphQL frente a múltiples endpoints REST.
  api.query('GetDestinoDetalle', async ({ variables }) => {
    await delay(1000);

    // Simula un fallo de servidor ocasional (~10%) para probar
    // el manejo de errores 500 en el frontend.
    if (Math.random() < 0.1) {
      return HttpResponse.json(
        { errors: [{ message: 'Error interno del servidor' }] },
        { status: 500, statusText: 'Internal Server Error' }
      );
    }

    const destino = destinos.find((d) => d.nombre === variables.nombre);
    const detalle = detallesPorDestino[variables.nombre];

    // Los errores de GraphQL viajan en el campo `errors` de la respuesta,
    // junto a los datos parciales (aquí, destino: null).
    if (!destino || !detalle) {
      return HttpResponse.json({
        data: { destino: null },
        errors: [{ message: `No existe el destino "${variables.nombre}"` }],
      });
    }

    return HttpResponse.json({
      data: {
        destino: {
          nombre: destino.nombre,
          pais: destino.pais,
          vuelos: detalle.vuelos,
          hoteles: detalle.hoteles,
        },
      },
    });
  }),
];
