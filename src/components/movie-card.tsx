"use client"

import { useState } from "react"
import { Star, Play, Plus } from "lucide-react"
import { Button } from "../components/ui/button"

interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  release_date: string
}

interface MovieCardProps {
  movie: Movie
  onSelect?: (movie: Movie) => void
}

export default function MovieCard({ movie, onSelect }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false)

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `/placeholder.svg?height=450&width=300&query=${encodeURIComponent(movie.title + " movie poster")}`

  const handleClick = () => {
    if (onSelect) {
      onSelect(movie)
    }
  }

  return (
    <div
      className="relative flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Movie Poster */}
      <div className="relative w-[150px] md:w-[200px] lg:w-[250px] h-[225px] md:h-[300px] lg:h-[375px] rounded-lg overflow-hidden bg-gray-800">
        <img
          src={posterUrl || "/placeholder.svg"}
          alt={movie.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        )}

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="icon" className="bg-white/20 hover:bg-white/30 text-white border-0">
              <Play className="w-6 h-6 fill-current" />
            </Button>
          </div>
        </div>
      </div>

      {/* Hover Preview Card */}
      {isHovered && (
        <div className="absolute top-0 left-0 w-[300px] md:w-[350px] bg-gray-900 rounded-lg shadow-2xl z-50 transform -translate-y-4 transition-all duration-300 border border-gray-700">
          {/* Preview Image */}
          <div className="relative h-[180px] md:h-[200px] rounded-t-lg overflow-hidden">
            <img
              src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

            {/* Play Button */}
            <div className="absolute bottom-4 left-4">
              <Button size="sm" className="bg-white text-black hover:bg-gray-200">
                <Play className="w-4 h-4 mr-1 fill-current" />
                Play
              </Button>
            </div>

            {/* Add Button */}
            <div className="absolute bottom-4 right-4">
              <Button
                size="icon"
                variant="outline"
                className="w-8 h-8 border-white text-white hover:bg-white hover:text-black bg-transparent"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Movie Info */}
          <div className="p-4 space-y-2">
            <h3 className="text-white font-semibold text-lg line-clamp-1">{movie.title}</h3>

            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>

            <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">{movie.overview}</p>
          </div>
        </div>
      )}
    </div>
  )
}
