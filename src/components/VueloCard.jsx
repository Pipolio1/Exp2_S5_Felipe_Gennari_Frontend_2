function VueloCard({ vuelo }) {
  return (
    <article className="info-card">
      <h2>{vuelo.aerolinea}</h2>
      <p className="info-detail">Salida: {vuelo.fechaSalida}</p>
      <p className="info-detail">Regreso: {vuelo.fechaRegreso}</p>
      <p className="info-availability">{vuelo.asientosDisponibles} asientos disponibles</p>
      <p className="info-price">{vuelo.precio}</p>
    </article>
  );
}

export default VueloCard;
