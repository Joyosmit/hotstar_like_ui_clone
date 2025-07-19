// const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "your_api_key_here"
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY

const TMDB_BASE_URL = "https://api.themoviedb.org/3"

// In-memory cache
const cache = new Map()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

interface CacheEntry {
  data: any
  timestamp: number
}

function getCacheKey(endpoint: string, page: number, genre?: number): string {
  return `${endpoint}-${page}-${genre || "all"}`
}

function getFromCache(key: string): any | null {
  const entry: CacheEntry | undefined = cache.get(key)
  if (entry && Date.now() - entry.timestamp < CACHE_DURATION) {
    return entry.data
  }
  cache.delete(key)
  return null
}

function setCache(key: string, data: any): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  })
}

export async function fetchMovies(endpoint: string, page = 1, genre?: number) {
  const cacheKey = getCacheKey(endpoint, page, genre)

  // Check cache first
  const cachedData = getFromCache(cacheKey)
  if (cachedData) {
    return cachedData
  }

  let url = `${TMDB_BASE_URL}/movie/${endpoint}?api_key=${TMDB_API_KEY}&page=${page}`
    // let url = `/api/tmdb?endpoint=movie/${endpoint}&page=${page}`;


  if (endpoint === "discover" && genre) {
    console.log("Hiiiiii")
    url = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&page=${page}&with_genres=${genre}`
    // url = `/api/tmdb?endpoint=discover/movie&page=${page}&with_genres=${genre}`

  }

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Cache the result
    setCache(cacheKey, data)

    return data
  } catch (error) {
    console.error("Error fetching movies:", error)
    throw error
  }
}

export async function fetchMovieDetails(movieId: number) {
  const cacheKey = `movie-details-${movieId}`

  const cachedData = getFromCache(cacheKey)
  if (cachedData) {
    return cachedData
  }

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits`,
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    setCache(cacheKey, data)

    return data
  } catch (error) {
    console.error("Error fetching movie details:", error)
    throw error
  }
}
