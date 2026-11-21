export const destinos = [
  {
    id: 1,
    nombre: 'París',
    pais: 'Francia',
    descripcion: 'La ciudad de la luz, capital del arte y la gastronomía.',
    actividades: ['Torre Eiffel', 'Museo del Louvre', 'Paseo por el Sena'],
  },
  {
    id: 2,
    nombre: 'Tokio',
    pais: 'Japón',
    descripcion: 'Metrópoli donde la tradición convive con la tecnología.',
    actividades: ['Templo Senso-ji', 'Shibuya Crossing', 'Mercado de Tsukiji'],
  },
  {
    id: 3,
    nombre: 'Cusco',
    pais: 'Perú',
    descripcion: 'Antigua capital inca y puerta de entrada a Machu Picchu.',
    actividades: ['Machu Picchu', 'Plaza de Armas', 'Valle Sagrado'],
  },
  {
    id: 4,
    nombre: 'Nueva York',
    pais: 'Estados Unidos',
    descripcion: 'La ciudad que nunca duerme, centro cultural y financiero.',
    actividades: ['Times Square', 'Central Park', 'Estatua de la Libertad'],
  },
  {
    id: 5,
    nombre: 'Roma',
    pais: 'Italia',
    descripcion: 'La ciudad eterna, museo al aire libre de la historia occidental.',
    actividades: ['Coliseo Romano', 'Fontana di Trevi', 'Ciudad del Vaticano'],
  },
  {
    id: 6,
    nombre: 'Sídney',
    pais: 'Australia',
    descripcion: 'Puerto icónico, playas y la famosa Ópera de Sídney.',
    actividades: ['Ópera de Sídney', 'Bondi Beach', 'Harbour Bridge'],
  },
];

// Detalle por destino consultado vía GraphQL: vuelos y hoteles con
// precios, fechas y disponibilidad.
export const detallesPorDestino = {
  'París': {
    vuelos: [
      { id: 'v-par-1', aerolinea: 'Air France', fechaSalida: '2025-08-10', fechaRegreso: '2025-08-24', precio: '$950.000', asientosDisponibles: 12 },
      { id: 'v-par-2', aerolinea: 'LATAM', fechaSalida: '2025-08-12', fechaRegreso: '2025-08-26', precio: '$880.000', asientosDisponibles: 7 },
      { id: 'v-par-3', aerolinea: 'Iberia', fechaSalida: '2025-09-02', fechaRegreso: '2025-09-16', precio: '$810.000', asientosDisponibles: 20 },
    ],
    hoteles: [
      { id: 'h-par-1', nombre: 'Hôtel Le Marais', estrellas: 4, precioNoche: '$180.000', habitacionesDisponibles: 5 },
      { id: 'h-par-2', nombre: 'Montmartre Suites', estrellas: 3, precioNoche: '$120.000', habitacionesDisponibles: 9 },
      { id: 'h-par-3', nombre: 'Ritz París', estrellas: 5, precioNoche: '$650.000', habitacionesDisponibles: 2 },
    ],
  },
  'Tokio': {
    vuelos: [
      { id: 'v-tok-1', aerolinea: 'ANA', fechaSalida: '2025-08-15', fechaRegreso: '2025-08-30', precio: '$1.250.000', asientosDisponibles: 8 },
      { id: 'v-tok-2', aerolinea: 'Japan Airlines', fechaSalida: '2025-09-05', fechaRegreso: '2025-09-20', precio: '$1.180.000', asientosDisponibles: 14 },
    ],
    hoteles: [
      { id: 'h-tok-1', nombre: 'Shinjuku Granbell', estrellas: 4, precioNoche: '$150.000', habitacionesDisponibles: 6 },
      { id: 'h-tok-2', nombre: 'Capsule Inn Akihabara', estrellas: 2, precioNoche: '$45.000', habitacionesDisponibles: 18 },
    ],
  },
  'Cusco': {
    vuelos: [
      { id: 'v-cus-1', aerolinea: 'LATAM', fechaSalida: '2025-08-08', fechaRegreso: '2025-08-15', precio: '$320.000', asientosDisponibles: 22 },
      { id: 'v-cus-2', aerolinea: 'Sky Airline', fechaSalida: '2025-08-20', fechaRegreso: '2025-08-27', precio: '$280.000', asientosDisponibles: 11 },
    ],
    hoteles: [
      { id: 'h-cus-1', nombre: 'Palacio del Inka', estrellas: 5, precioNoche: '$210.000', habitacionesDisponibles: 4 },
      { id: 'h-cus-2', nombre: 'Hostal El Grial', estrellas: 3, precioNoche: '$60.000', habitacionesDisponibles: 10 },
    ],
  },
  'Nueva York': {
    vuelos: [
      { id: 'v-nyc-1', aerolinea: 'American Airlines', fechaSalida: '2025-08-11', fechaRegreso: '2025-08-21', precio: '$720.000', asientosDisponibles: 16 },
      { id: 'v-nyc-2', aerolinea: 'Delta', fechaSalida: '2025-09-01', fechaRegreso: '2025-09-12', precio: '$690.000', asientosDisponibles: 9 },
    ],
    hoteles: [
      { id: 'h-nyc-1', nombre: 'The Manhattan Grand', estrellas: 4, precioNoche: '$260.000', habitacionesDisponibles: 7 },
      { id: 'h-nyc-2', nombre: 'Brooklyn Loft Hotel', estrellas: 3, precioNoche: '$140.000', habitacionesDisponibles: 12 },
    ],
  },
  'Roma': {
    vuelos: [
      { id: 'v-rom-1', aerolinea: 'ITA Airways', fechaSalida: '2025-08-18', fechaRegreso: '2025-09-01', precio: '$890.000', asientosDisponibles: 10 },
      { id: 'v-rom-2', aerolinea: 'Iberia', fechaSalida: '2025-09-07', fechaRegreso: '2025-09-21', precio: '$830.000', asientosDisponibles: 15 },
    ],
    hoteles: [
      { id: 'h-rom-1', nombre: 'Hotel Trastevere', estrellas: 4, precioNoche: '$170.000', habitacionesDisponibles: 8 },
      { id: 'h-rom-2', nombre: 'Domus Aurea B&B', estrellas: 3, precioNoche: '$95.000', habitacionesDisponibles: 6 },
    ],
  },
  // Listas vacías a propósito: permite probar cómo reacciona la interfaz
  // cuando un destino no tiene vuelos ni hoteles disponibles.
  'Sídney': {
    vuelos: [],
    hoteles: [],
  },
};
