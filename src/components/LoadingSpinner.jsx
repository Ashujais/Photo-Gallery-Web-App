import React from 'react';

/**
 * LoadingSpinner component shown while fetching photos.
 */
export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24" role="status" aria-live="polite">
      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600 text-sm font-medium">Loading photos...</p>
      <span className="sr-only">Loading photos...</span>
    </div>
  );
}

export default LoadingSpinner;
