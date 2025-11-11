// hooks/useLatency.js
import { useState, useEffect } from 'react';

export function useLatency(exchanges, intervalMs = 10000) {
  const [latencyMap, setLatencyMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let timerId;

    const fetchLatency = async () => {
      console.log('fetching latency');
      try {
        const res = await fetch('/api/latency');
        if (!res.ok) throw new Error('API fetch failed');
        const data = await res.json();
        setLatencyMap(data.latencyMap);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchLatency();
    timerId = setInterval(fetchLatency, intervalMs);
    return () => clearInterval(timerId);
  }, [exchanges, intervalMs]);

  return { latencyMap, loading, error };
}
