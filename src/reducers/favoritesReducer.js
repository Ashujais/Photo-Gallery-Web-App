/**
 * Reducer and helper functions for managing favourite photo IDs.
 * Persists data across sessions via localStorage.
 */

export const FAVORITES_STORAGE_KEY = 'celebrare_gallery_favorites';

/**
 * Initializes favourites state from localStorage.
 * Passed as lazy initializer to useReducer.
 * 
 * @returns {Array<string>} Array of favourited photo IDs
 */
export function getInitialFavorites() {
  try {
    const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to parse favorites from localStorage:', error);
    return [];
  }
}

/**
 * Action types for favourites reducer
 */
export const FAVORITES_ACTIONS = {
  TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
};

/**
 * Reducer function for managing favourites.
 * 
 * @param {Array<string>} state Current list of favourited photo IDs
 * @param {{ type: string, payload: string }} action Dispatched action
 * @returns {Array<string>} Updated list of favourited photo IDs
 */
export function favoritesReducer(state, action) {
  switch (action.type) {
    case FAVORITES_ACTIONS.TOGGLE_FAVORITE: {
      const photoId = action.payload;
      const isAlreadyFavorite = state.includes(photoId);

      if (isAlreadyFavorite) {
        // Remove from favourites
        return state.filter((id) => id !== photoId);
      } else {
        // Add to favourites
        return [...state, photoId];
      }
    }

    default:
      return state;
  }
}
