import React from 'react';

/**
 * SearchBar component for filtering photos by author name.
 * 
 * @param {{ searchTerm: string, onSearchChange: Function }} props
 */
export function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div className="relative">
        {/* Search icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search by author name..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          aria-label="Search by author name"
        />

        {/* Clear query button if text exists */}
        {searchTerm && (
          <button
            type="button"
            onClick={() => onSearchChange({ target: { value: '' } })}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default React.memo(SearchBar);
