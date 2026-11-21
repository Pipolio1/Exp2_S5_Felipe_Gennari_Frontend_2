// Caché en memoria con expiración: evita repetir consultas al "servidor"
// por datos recientes y define cuándo vuelven a considerarse obsoletos.
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

const cache = new Map();

// Peticiones en curso: si dos vistas piden lo mismo a la vez,
// comparten la misma promesa en lugar de duplicar la consulta.
const pending = new Map();

export function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return undefined;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    cache.delete(key);
    return undefined;
  }
  return entry.data;
}

export function setCached(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
}

export function invalidate(key) {
  cache.delete(key);
}

export function getPending(key) {
  return pending.get(key);
}

export function setPending(key, promise) {
  pending.set(key, promise);
  const clear = () => {
    if (pending.get(key) === promise) pending.delete(key);
  };
  promise.then(clear, clear);
}

// Quita una petición del registro solo si sigue siendo la misma:
// evita borrar una consulta nueva registrada tras un abort.
export function clearPending(key, promise) {
  if (pending.get(key) === promise) pending.delete(key);
}
