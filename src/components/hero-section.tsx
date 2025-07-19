"use client"

import { Play, Volume2 } from "lucide-react"
import { Button } from "../components/ui/button"
import { useEffect, useState } from "react"

interface Movie {
  id: number
  title: string
  overview: string
  backdrop_path: string
  poster_path: string
}

interface HeroSectionProps {
  featuredMovie: Movie | null
}

export default function HeroSection({ featuredMovie }: HeroSectionProps) {
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null)

  useEffect(() => {
    if (featuredMovie) {
      setCurrentMovie(featuredMovie)
    } else {
      // Default featured movie data
      setCurrentMovie({
        id: 1,
        title: "",
        overview:
          "",
        backdrop_path: "/placeholder.svg?height=800&width=1400",
        poster_path: "/placeholder.svg?height=600&width=400",
      })
    }
  }, [featuredMovie])

  if (!currentMovie) return null

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${
            currentMovie.backdrop_path.startsWith("/placeholder")
              ? currentMovie.backdrop_path
              : `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`
          })`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-4 md:px-8 lg:px-16">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">{currentMovie.title}</h1>

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-xl">{currentMovie.overview}</p>

          <div className="flex items-center space-x-4">
            <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg font-semibold">
              <Play className="w-5 h-5 mr-2 fill-current" />
              PLAY
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-6 py-3 bg-transparent"
            >
              <Volume2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
