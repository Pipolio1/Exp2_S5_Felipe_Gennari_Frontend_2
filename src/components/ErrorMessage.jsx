import { Link } from 'react-router-dom';

// Ante un 404 (categoría inexistente) no se ofrece reintentar: repetir
// la misma consulta no resuelve el problema, volver al inicio sí.
function ErrorMessage({ error, onRetry }) {
  const canRetry = Boolean(onRetry) && error?.status !== 404;

  return (
    <div className="error-box" role="alert">
      <h2>Algo salió mal</h2>
      <p>{error?.message}</p>
      <div className="error-actions">
        {canRetry && (
          <button type="button" className="btn" onClick={onRetry}>
            Reintentar
          </button>
        )}
        <Link to="/" className="btn btn-secondary">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default ErrorMessage;
