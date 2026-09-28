'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getBackdropUrl, getImageUrl } from '@/lib/tmdb';
import { getYear, truncate } from '@/lib/utils';
import type { Movie } from '@/types/movie';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroCarouselProps {
  movies: Movie[];
}

export function HeroCarousel({ movies }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  }, [movies.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  }, [movies.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentMovie = movies[currentIndex];

  if (!currentMovie || movies.length === 0) return null;

  return (
    <section className="relative w-full" aria-label="Trending movies carousel">
      <div className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
        {/* Background backdrop */}
        <div className="absolute inset-0 z-0">
          <Image
            src={getBackdropUrl(currentMovie.backdrop_path, 'w1280')}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-end h-full px-4 md:px-8 lg:px-16 pb-12 md:pb-20">
          <div className="max-w-4xl w-full">
            <div className="mb-4 flex flex-wrap gap-2" role="list" aria-label="Movie genres">
              {currentMovie.genre_ids.slice(0, 3).map((genreId, index) => (
                <span
                  key={genreId}
                  className="px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full text-white/90 border border-white/30"
                >
                  Genre {genreId}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {currentMovie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-4 text-white/80 text-sm">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {currentMovie.vote_average.toFixed(1)}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {getYear(currentMovie.release_date)}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {currentMovie.runtime ? `${currentMovie.runtime}m` : 'N/A'}
              </span>
            </div>

            <p className="text-white/90 text-base md:text-lg mb-6 max-w-2xl line-clamp-3">
              {truncate(currentMovie.overview, 300)}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href={`/movies/${currentMovie.id}`}>
                <Button size="lg" className="gap-2 bg-white text-black hover:bg-white/90">
                  <Play className="h-5 w-5" />
                  Lihat Detail
                </Button>
              </Link>
              <Link href={`/movies/${currentMovie.id}`}>
                <Button size="lg" variant="outline" className="gap-2 border-white/50 text-white hover:bg-white/10">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Info Lengkap
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className={cn(
            'absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors',
            'md:left-8'
          )}
          aria-label="Previous movie"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>

        <button
          onClick={nextSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className={cn(
            'absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors',
            'md:right-8'
          )}
          aria-label="Next movie"
        >
          <ChevronRight className="h-8 w-8" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                index === currentIndex
                  ? 'bg-white w-6'
                  : 'bg-white/50 hover:bg-white/75'
              )}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}