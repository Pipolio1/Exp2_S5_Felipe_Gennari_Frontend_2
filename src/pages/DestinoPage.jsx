import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDestinoDetalle } from '../services/graphql';
import useFetch from '../hooks/useFetch';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import VueloCard from '../components/VueloCard';
import HotelCard from '../components/HotelCard';

function DestinoPage() {
  const { nombre } = useParams();
  // Pestañas con estado local: alternar entre vuelos y hoteles no
  // repite la consulta, los datos ya vienen en la misma respuesta GraphQL.
  const [tab, setTab] = useState('vuelos');
  // Fetcher con identidad estable: la consulta se repite solo cuando
  // cambia el destino, no en cada render.
  const fetcher = useCallback((options) => fetchDestinoDetalle(nombre, options), [nombre]);
  const { data: destino, loading, error, retry } = useFetch(
    fetcher,
    `/graphql:destino:${nombre}`
  );

  if (loading) {
    return <LoadingSpinner message={`Buscando vuelos y hoteles en ${nombre}...`} />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={retry} />;
  }

  const viendoVuelos = tab === 'vuelos';
  const items = viendoVuelos ? destino.vuelos : destino.hoteles;

  return (
    <section>
      <h1>{destino.nombre}</h1>
      <p className="subtitle">{destino.pais} — planifica tu viaje eligiendo vuelo y hotel.</p>

      <div className="tab-bar" role="tablist" aria-label="Opciones de viaje">
        <button
          type="button"
          role="tab"
          aria-selected={viendoVuelos}
          className={viendoVuelos ? 'tab active' : 'tab'}
          onClick={() => setTab('vuelos')}
        >
          ✈️ Vuelos ({destino.vuelos.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={!viendoVuelos}
          className={viendoVuelos ? 'tab' : 'tab active'}
          onClick={() => setTab('hoteles')}
        >
          🏨 Hoteles ({destino.hoteles.length})
        </button>
      </div>

      {items.length === 0 ? (
        <p className="empty-message">
          No hay {viendoVuelos ? 'vuelos' : 'hoteles'} disponibles para este destino por ahora.
          Vuelve pronto.
        </p>
      ) : (
        <ul className="card-list">
          {items.map((item) => (
            <li key={item.id}>
              {viendoVuelos ? <VueloCard vuelo={item} /> : <HotelCard hotel={item} />}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default DestinoPage;
