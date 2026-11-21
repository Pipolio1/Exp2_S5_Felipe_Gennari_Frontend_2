import { fetchDestinos } from '../services/api';
import useFetch from '../hooks/useFetch';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import DestinoCard from '../components/DestinoCard';

function HomePage() {
  const { data: destinos, loading, error, retry } = useFetch(fetchDestinos, '/api/destinos');

  if (loading) {
    return <LoadingSpinner message="Cargando destinos..." />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={retry} />;
  }

  return (
    <section>
      <h1>Explora nuestros destinos</h1>
      <p className="subtitle">Elige un destino para ver los vuelos y hoteles disponibles.</p>
      <div className="destination-grid">
        {destinos.map((destino) => (
          <DestinoCard key={destino.id} destino={destino} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
