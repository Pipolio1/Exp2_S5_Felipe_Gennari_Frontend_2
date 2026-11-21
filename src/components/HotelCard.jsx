function HotelCard({ hotel }) {
  return (
    <article className="info-card">
      <h2>{hotel.nombre}</h2>
      <p className="info-stars" aria-label={`${hotel.estrellas} estrellas`}>
        {'★'.repeat(hotel.estrellas)}{'☆'.repeat(5 - hotel.estrellas)}
      </p>
      <p className="info-availability">{hotel.habitacionesDisponibles} habitaciones disponibles</p>
      <p className="info-price">{hotel.precioNoche} <span className="info-price-note">/ noche</span></p>
    </article>
  );
}

export default HotelCard;
