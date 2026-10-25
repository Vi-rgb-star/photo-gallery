import { useState, useEffect, useReducer, useCallback, useMemo } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import PhotoCard from './PhotoCard'
import { favouritesReducer } from '../reducers/favouritesReducer'

function loadFavourites() {
  try {
    const saved = localStorage.getItem('favourites')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [searchTerm, setSearchTerm] = useState('')
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    loadFavourites
  )

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites))
  }, [favourites])

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value)
  }, [])

  const handleToggleFavourite = useCallback((id) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: id })
  }, [])

  const filteredPhotos = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return photos
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(term)
    )
  }, [photos, searchTerm])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <p className="text-center text-red-600 py-20">
        Something went wrong: {error}
      </p>
    )
  }

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by author name..."
        className="w-full md:w-1/2 mb-6 px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {filteredPhotos.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No photos found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Gallery