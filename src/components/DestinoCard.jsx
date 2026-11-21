import { Link } from 'react-router-dom';

function DestinoCard({ destino }) {
  return (
    <Link
      to={`/destino/${encodeURIComponent(destino.nombre)}`}
      className="destination-card"
    >
      <span className="destination-icon">🌍</span>
      <h2>{destino.nombre}</h2>
      <p className="destination-country">{destino.pais}</p>
      <ul className="tag-list">
        {destino.actividades.map((actividad) => (
          <li key={actividad} className="tag">{actividad}</li>
        ))}
      </ul>
    </Link>
  );
}

export default DestinoCard;
