import { NavLink } from 'react-router-dom';
import { fetchDestinos } from '../services/api';
import useFetch from '../hooks/useFetch';

// Los destinos vienen de la misma consulta REST que usa la portada
// (compartida vía caché), así ambas vistas muestran el mismo catálogo.
// Mientras carga o si falla, se muestra solo la marca: la portada
// comunica el estado de la consulta con su propio indicador y reintento.
function Navbar() {
  const { data: destinos } = useFetch(fetchDestinos, '/api/destinos');

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        ✈️ Agencia de Viajes
      </NavLink>
      {destinos && (
        <ul className="navbar-links">
          {destinos.map((destino) => (
            <li key={destino.id}>
              <NavLink
                to={`/destino/${encodeURIComponent(destino.nombre)}`}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {destino.nombre}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
