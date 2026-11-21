# Agencia de Viajes — Semana 5

Aplicación React de una **agencia de viajes** que integra dos tipos de API mock con
[Mock Service Worker (MSW)](https://mswjs.io/): una **API REST** para listar destinos
y una **API GraphQL** para consultar vuelos y hoteles de cada destino. La navegación
se implementa con **React Router**.

**Demo en vivo:** https://pipolio1.github.io/Exp2_S5_Felipe_Gennari_Frontend_2/

## Características

- **API REST mock** (`GET /api/destinos`): lista los destinos disponibles con país,
  descripción y actividades populares.
- **API GraphQL mock** (`POST /graphql`, operación `GetDestinoDetalle`): una sola
  consulta devuelve los vuelos y hoteles del destino seleccionado, con precios,
  fechas y disponibilidad — el cliente define los campos exactos que necesita,
  evitando over-fetching y múltiples solicitudes.
- **Flujo de planificación**: el usuario elige un destino en la portada (o en la
  barra de navegación) y luego alterna entre las pestañas **Vuelos** y **Hoteles**.
- Navegación con React Router: home con destinos, vista por destino y página 404.
- Manejo de estado con `useState`/`useEffect` (hook `useFetch` y pestañas),
  indicador de carga en cada petición y estados vacíos (p. ej. Sídney).
- Manejo de errores: códigos HTTP en REST y campo `errors` en GraphQL, con
  mensajes claros, botón de reintento (oculto cuando el destino no existe) y
  opción de volver al inicio.
- Optimización: caché en memoria con expiración (5 min), deduplicación de
  peticiones en curso, invalidación al reintentar y `AbortController` para
  cancelar peticiones obsoletas.
- Interfaz responsiva: media queries para pantallas pequeñas (< 640px).

## Requisitos

- Node.js 18+

## Ejecutar en desarrollo

```bash
npm install
npm run dev
```

Abrir http://localhost:5173

## Build de producción

```bash
npm run build
```

## Desplegar en GitHub Pages

```bash
npm run deploy
```

Publica `dist/` en la rama `gh-pages`. Los mocks de MSW también funcionan en
producción, por lo que la demo responde las solicitudes REST y GraphQL sin backend.

## Pruebas en distintos navegadores

La aplicación fue probada en **Google Chrome**, **Mozilla Firefox** y
**Microsoft Edge** (versiones actuales), verificando:

- Carga de destinos (REST) y detalle de vuelos/hoteles (GraphQL) sin errores.
- Navegación fluida entre rutas, incluida la página 404 y el botón de reintento.
- Diseño responsivo con el modo de dispositivo de las DevTools (móvil y escritorio).
- Compatibilidad del Service Worker de MSW (requiere HTTPS o localhost, condición
  cumplida en desarrollo y en GitHub Pages).

## Estructura

```
src/
├── mocks/        # MSW: datos, handlers REST y GraphQL, worker
├── services/     # api.js (REST), graphql.js (GraphQL), cache.js (caché)
├── hooks/        # useFetch: estados de carga/error, caché y reintento
├── components/   # Navbar, DestinoCard, VueloCard, HotelCard,
│                 # LoadingSpinner, ErrorMessage
└── pages/        # HomePage, DestinoPage, NotFoundPage
```
