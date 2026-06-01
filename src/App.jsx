import { useState } from 'react'

function App() {
  const [search, setSearch] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  const searchMovies = async (e) => {
    e.preventDefault()
    if (!search) return

    setLoading(true)
    const response = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=97ee378`)
    const data = await response.json()
    setMovies(data.Search || [])
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Movie Finder</h1> 
      
      <form onSubmit={searchMovies} className="max-w-2xl mx-auto mb-12">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search for movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-6 py-3 rounded-lg bg-gray-800 text-white border-2 border-gray-700 focus:border-blue-500 outline-none"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
          >
            Search
          </button>
        </div>
      </form>

      {loading && <p className="text-center text-xl">Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
              alt={movie.Title}
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{movie.Title}</h3>
              <p className="text-gray-400">{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
