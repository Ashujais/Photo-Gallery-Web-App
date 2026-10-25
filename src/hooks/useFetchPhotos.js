import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch 30 photos from the Picsum Photos API.
 * 
 * @returns {{ photos: Array, loading: boolean, error: string | null }}
 */
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPhotos = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://picsum.photos/v2/list?limit=30', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch photos: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        // Ignore aborts caused by component unmounting
        if (err.name !== 'AbortError') {
          setError(err.message || 'An error occurred while fetching photos.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPhotos();

    return () => {
      controller.abort();
    };
  }, []);

  return { photos, loading, error };
}

export default useFetchPhotos;
