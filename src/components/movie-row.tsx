"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import MovieCard from "./movie-card"
import { fetchMovies } from "../lib/tmdb-api"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../components/ui/button"

interface MovieRowProps {
  title: string
  endpoint: string
  genre?: number
  onMovieSelect?: (movie: any) => void
}

export default function MovieRow({ title, endpoint, genre, onMovieSelect }: MovieRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["movies", endpoint, genre],
    queryFn: ({ pageParam = 1 }) => fetchMovies(endpoint, pageParam, genre),
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined
    },
  })

  const movies = data?.pages.flatMap((page) => page?.results) || []

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8
      const newScrollLeft =
        direction === "left" ? scrollRef.current.scrollLeft - scrollAmount : scrollRef.current.scrollLeft + scrollAmount

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    checkScrollButtons()

    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      const isNearEnd = scrollLeft + clientWidth >= scrollWidth - 200

      if (isNearEnd && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }
  }

  useEffect(() => {
    checkScrollButtons()
  }, [movies])

  useEffect(() => {
    if (onMovieSelect && movies.length > 0) {
      onMovieSelect(movies[0])
    }
  }, [movies, onMovieSelect])

  return (
    <div className="relative group px-4 md:px-8 lg:px-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">{title}</h2>

      <div className="relative">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-red/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-full rounded-none"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
        )}

        {/* Right Scroll Button */}
        {canScrollRight && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-full rounded-none"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        )}

        {/* Movies Container */}
        <div
          ref={scrollRef}
          className="flex space-x-2 md:space-x-4 overflow-x-auto scrollbar-hide pb-4"
          onScroll={handleScroll}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie, index) => (
            <MovieCard key={`${movie.id}-${index}`} movie={movie} onSelect={onMovieSelect} />
          ))}

          {isFetchingNextPage && (
            <div className="flex items-center justify-center min-w-[200px] h-[300px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
