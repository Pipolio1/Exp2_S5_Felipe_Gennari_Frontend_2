import { useState, useEffect, useCallback } from 'react';
import { getCached, setCached, invalidate, getPending, setPending, clearPending } from '../services/cache';

// Hook que centraliza el ciclo de una petición: estados de datos, carga
// y error, caché con expiración, cancelación al desmontar o cambiar el
// fetcher (AbortController) y reintento manual con datos frescos.
// `fetcher` debe tener identidad estable (p. ej. useCallback) y `cacheKey`
// identifica los datos en la caché compartida.
function useFetch(fetcher, cacheKey) {
  const [result, setResult] = useState(null); // { key, data } | { key, error }
  const [retryCount, setRetryCount] = useState(0);

  // El estado visible se deriva durante el render: primero la caché,
  // luego el último resultado obtenido para esta clave.
  const isCurrent = result?.key === cacheKey;
  const data = getCached(cacheKey) ?? (isCurrent && !result.error ? result.data : null);
  const error = isCurrent ? (result?.error ?? null) : null;
  const loading = data === null && error === null;

  useEffect(() => {
    if (getCached(cacheKey) !== undefined) return;

    // Otra vista ya está pidiendo estos datos: se comparte su promesa.
    const shared = getPending(cacheKey);
    if (shared) {
      shared
        .then((data) => setResult({ key: cacheKey, data }))
        .catch((err) => setResult({ key: cacheKey, error: err }));
      return;
    }

    const controller = new AbortController();
    const request = fetcher({ signal: controller.signal });
    setPending(cacheKey, request);

    request
      .then((data) => {
        setCached(cacheKey, data);
        setResult({ key: cacheKey, data });
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setResult({ key: cacheKey, error: err });
      });

    return () => {
      controller.abort();
      // La petición abortada deja de ser compartible de inmediato,
      // así un efecto posterior (p. ej. StrictMode) inicia una nueva.
      clearPending(cacheKey, request);
    };
  }, [fetcher, cacheKey, retryCount]);

  // El reintento invalida la entrada para consultar el servidor de nuevo
  // en lugar de devolver el dato almacenado.
  const retry = useCallback(() => {
    invalidate(cacheKey);
    setResult(null);
    setRetryCount((count) => count + 1);
  }, [cacheKey]);

  return { data, loading, error, retry };
}

export default useFetch;
