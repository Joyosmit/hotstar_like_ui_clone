import { useState } from "react"
import Navigation from "./components/navigation"
import HeroSection from "./components/hero-section"
import MovieRow from "./components/movie-row"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      // @ts-ignore
      cacheTime: 10 * 60 * 1000,
    },
  },
})

const categories = [
  { title: "New Releases", endpoint: "now_playing" },
  { title: "Popular Movies", endpoint: "popular" },
  { title: "Top Rated", endpoint: "top_rated" },
  { title: "Upcoming", endpoint: "upcoming" },
  { title: "Action Movies", endpoint: "discover", genre: 28 },
  { title: "Comedy Movies", endpoint: "discover", genre: 35 },
  { title: "Horror Movies", endpoint: "discover", genre: 27 },
  { title: "Romance Movies", endpoint: "discover", genre: 10749 },
]

function HomePage() {
  const [featuredMovie, setFeaturedMovie] = useState(null)

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroSection featuredMovie={featuredMovie} />
      <div className="relative z-10 -mt-32 space-y-8 pb-20">
        {categories.map((category, index) => (
          <MovieRow
            key={category.title}
            title={category.title}
            endpoint={category.endpoint}
            genre={category.genre}
            onMovieSelect={index === 0 ? setFeaturedMovie : undefined}
          />
        ))}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  )
}
