# Photo Gallery

A small React app that shows photos from the Picsum Photos API. You can search by author name and mark photos as favourites.

## Features

- Fetches 30 photos on load, with a loading spinner and an error message
- Responsive grid: 4 columns on desktop, 2 on tablet, 1 on mobile
- Real-time search by author name (filters the data already fetched)
- Favourite photos with a heart button, saved in localStorage so they stay after a refresh

## Built With

- React (Vite)
- Tailwind CSS
- Hooks: `useState`, `useEffect`, `useReducer`, `useMemo`, `useCallback`
- Custom hook: `useFetchPhotos`

## Run It Locally

```
git clone https://github.com/Vi-rgb-star/photo-gallery.git
cd photo-gallery
npm install
npm run dev
```

Then open the link shown in the terminal ( http://localhost:5173).

## Project Structure


src/
  components/ Gallery.jsx, PhotoCard.jsx
  hooks/ useFetchPhotos.js
  reducers/ favouritesReducer.js
