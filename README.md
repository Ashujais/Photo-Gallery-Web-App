# Photo Gallery Web App

A responsive, high-performance Photo Gallery web application built with **React**, **Vite**, and **Tailwind CSS** for the **Celebrare Frontend Intern Pre-Screening Assignment**.

---

## 🚀 Live Demo & Quick Start

### 1. Prerequisites
- **Node.js**: v18+ or v20+
- **npm**: v9+ or v10+

### 2. Setup and Installation
```bash
# Clone the repository
git clone <YOUR_GITHUB_REPO_URL>
cd Celebrare_FullStack

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Open your browser at `http://localhost:5173`.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack & Architecture

- **React 18**: Functional components with hooks only (no class components).
- **Vite**: Ultra-fast build tool and dev server.
- **Tailwind CSS**: Utility-first styling (zero external UI component libraries like MUI, Bootstrap, or Ant Design).
- **Picsum Photos API**: `https://picsum.photos/v2/list?limit=30`

---

## 📋 Implementation of the 7 Requirements

### 1. Project Setup
- Configured React with Vite and Tailwind CSS from scratch.
- Pure Tailwind CSS utility classes used for all layout, grid systems, card styling, and animations.
- Zero external UI libraries used.

### 2. Fetch Photos from API
- Fetches 30 photos from `https://picsum.photos/v2/list?limit=30` on initial load.
- Displays an accessible animated loading spinner (`LoadingSpinner.jsx`) while fetching.
- Catches network/HTTP errors and displays an informative error card (`ErrorMessage.jsx`) if the API fails.

### 3. Responsive Grid
- Responsive column layout configured via Tailwind breakpoints:
  - **Desktop (>= 1024px)**: `lg:grid-cols-4` (4 columns)
  - **Tablet (768px – 1023px)**: `md:grid-cols-2` (2 columns)
  - **Mobile (< 768px)**: `grid-cols-1` (1 column)
- Each card displays:
  - High-performance photo thumbnail (`600x400` aspect-ratio container with lazy loading)
  - Author name
  - Interactive SVG heart icon button to toggle favourites

### 4. Real-Time Search Filter
- Search bar at the top allows users to filter photos in real-time by author name.
- Real-time, case-insensitive string matching.
- Client-side filtering only — no page reload and no additional API requests.

### 5. Favourites with `useReducer` & `localStorage`
- Managed using `useReducer` instead of `useState` (`favoritesReducer.js`).
- Handles `TOGGLE_FAVORITE` action to add or remove photo IDs.
- Favourites state is lazily initialized from `localStorage` on mount (`getInitialFavorites`) and automatically persisted via `useEffect`.
- Persists across full page refreshes and browser sessions.

### 6. Custom Hook (`useFetchPhotos`)
- Encapsulates API fetching logic in `src/hooks/useFetchPhotos.js`.
- Returns `{ photos, loading, error }`.
- Includes `AbortController` cleanup to avoid state updates on unmounted components.
- The `Gallery` component consumes this hook directly rather than calling `fetch`.

### 7. Performance Optimization: `useCallback` + `useMemo`
- **`useCallback` on Search Handler**:
  ```jsx
  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);
  ```
  Ensures a stable function reference is passed down to the `SearchBar` component, preventing unnecessary re-renders of the search input when other parts of the gallery update.
- **`useMemo` on Filtered Photos**:
  ```jsx
  const filteredPhotos = useMemo(() => {
    const trimmed = searchTerm.trim().toLowerCase();
    if (!trimmed) return photos;
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(trimmed)
    );
  }, [photos, searchTerm]);
  ```
  Memoizes the derived filtered array so that photo filtering runs only when `photos` or `searchTerm` changes, avoiding redundant computations when the user toggles favourites.

---

## 📁 Project Structure

```
Celebrare_FullStack/
├── public/
├── src/
│   ├── components/
│   │   ├── ErrorMessage.jsx     # Error state UI
│   │   ├── Gallery.jsx          # Main gallery view
│   │   ├── LoadingSpinner.jsx   # Loading state spinner
│   │   ├── PhotoCard.jsx        # Individual photo card with heart toggle
│   │   └── SearchBar.jsx        # Search input with clear button
│   ├── hooks/
│   │   └── useFetchPhotos.js    # Custom data fetching hook
│   ├── reducers/
│   │   └── favoritesReducer.js  # Pure reducer for managing favourite IDs
│   ├── App.jsx                  # Root application component
│   ├── index.css                # Tailwind directives & base styles
│   └── main.jsx                 # Application entry point
├── index.html                   # HTML template
├── package.json                 # Project scripts and dependencies
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── vite.config.js               # Vite bundler configuration
└── README.md                    # Project documentation & video script
```

---
