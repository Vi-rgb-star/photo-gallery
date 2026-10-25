function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <img
        src={`https://picsum.photos/id/${photo.id}/400/300`}
        alt={`Photo by ${photo.author}`}
        className="w-full h-48 object-cover"
      />
      <div className="flex items-center justify-between p-3">
        <p className="text-sm font-medium text-gray-800">{photo.author}</p>
        <button
          onClick={() => onToggleFavourite(photo.id)}
          aria-label="Toggle favourite"
          className="text-2xl"
        >
          {isFavourite ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  )
}

export default PhotoCard
