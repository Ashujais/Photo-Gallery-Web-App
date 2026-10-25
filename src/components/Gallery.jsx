import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import {
  favoritesReducer,
  getInitialFavorites,
  FAVORITES_ACTIONS,
  FAVORITES_STORAGE_KEY,
} from '../reducers/favoritesReducer';
import SearchBar from './SearchBar';
import PhotoCard from './PhotoCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

/**
 * Gallery component: fetches photos, renders search bar and responsive photo grid,
 * and manages favourites with useReducer and localStorage.
 */
export function Gallery() {
  // Requirement 6: Custom hook returning photos, loading, and error
  const { photos, loading, error } = useFetchPhotos();

  // Search input query state
  const [searchTerm, setSearchTerm] = useState('');

  // Requirement 5: useReducer managing favourites list with localStorage persistence
  const [favorites, dispatch] = useReducer(favoritesReducer, [], getInitialFavorites);

  // Persist favourites to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (err) {
      console.error('Failed to save favourites to localStorage:', err);
    }
  }, [favorites]);

  // Requirement 7: useCallback on search filter handler
  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  // Handler to toggle a photo as favourite
  const handleToggleFavorite = useCallback((photoId) => {
    dispatch({
      type: FAVORITES_ACTIONS.TOGGLE_FAVORITE,
      payload: photoId,
    });
  }, []);

  // Requirement 7: useMemo to compute filtered photo list
  const filteredPhotos = useMemo(() => {
    const trimmed = searchTerm.trim().toLowerCase();
    if (!trimmed) {
      return photos;
    }
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(trimmed)
    );
  }, [photos, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Photo Gallery
        </h1>
        <p className="mt-2 text-base text-gray-500">
          Explore photographs from Picsum and mark your favorites.
        </p>
      </header>

      {/* Requirement 4: Search input at top, real-time filtering without API call */}
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      {/* Requirement 2: Show loading spinner while fetching */}
      {loading && <LoadingSpinner />}

      {/* Requirement 2: Show error message if fetch fails */}
      {!loading && error && <ErrorMessage message={error} />}

      {/* Requirement 3: Responsive photo grid */}
      {!loading && !error && (
        <>
          {filteredPhotos.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No photos found matching &ldquo;{searchTerm}&rdquo;
              </p>
            </div>
          ) : (
            /* Desktop: 4 columns, Tablet: 2 columns, Mobile: 1 column */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  isFavorite={favorites.includes(photo.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Gallery;
