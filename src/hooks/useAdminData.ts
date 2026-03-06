import { useState, useEffect } from 'react';
import { adminFetch } from '@/lib/admin-fetch';

export function useAdminData<T>(endpoint: string, onData: (data: T) => void) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminFetch(endpoint)
      .then((res) => (res.ok ? res.json() : Promise.reject('Failed to load')))
      .then((json) => {
        if (json?.data) onData(json.data);
      })
      .catch((err) => {
        console.error(`Admin fetch ${endpoint}:`, err);
        setError(String(err));
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, error };
}
