import React from 'react';

/**
 * PhotoCard component displaying a photo, author name, and a heart toggle button.
 * 
 * @param {{
 *   photo: { id: string, author: string, width: number, height: number, url: string, download_url: string },
 *   isFavorite: boolean,
 *   onToggleFavorite: (id: string) => void
 * }} props
 */
export function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  // Using Picsum's dimensions route for high-performance, fast-loading thumbnails
  const imageUrl = `https://picsum.photos/id/${photo.id}/600/400`;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 flex flex-col transition-shadow duration-200">
      {/* Photo with aspect ratio container */}
      <div className="relative aspect-[3/2] w-full bg-gray-100 overflow-hidden">
        <img
          src={imageUrl}
          alt={`Photograph by ${photo.author}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Card Footer: Author name & Heart icon button */}
      <div className="p-4 flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-800 truncate" title={photo.author}>
            {photo.author}
          </p>
          <p className="text-xs text-gray-400">ID: #{photo.id}</p>
        </div>

        {/* Heart icon button */}
        <button
          type="button"
          onClick={() => onToggleFavorite(photo.id)}
          className="p-2 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          aria-label={isFavorite ? `Remove photo by ${photo.author} from favourites` : `Add photo by ${photo.author} to favourites`}
          title={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
        >
          <svg
            className={`w-6 h-6 transition-all duration-200 ${
              isFavorite
                ? 'fill-red-500 text-red-500 scale-110'
                : 'fill-none text-gray-400 hover:text-red-500 hover:scale-110'
            }`}
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default React.memo(PhotoCard);
