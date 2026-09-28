'use client';

import { MovieCard } from './MovieCard';
import type { Movie } from '@/types/movie';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  href?: string;
  className?: string;
}

export function MovieRow({ title, movies, href, className }: MovieRowProps) {
  if (movies.length === 0) return null;

  return (
    <section className={className} aria-labelledby={title.toLowerCase().replace(/\s+/g, '-')}>
      <div className="flex items-center justify-between mb-4">
        <h2 id={title.toLowerCase().replace(/\s+/g, '-')} className="text-xl font-bold text-foreground">
          {title}
        </h2>
        {href && (
          <a
            href={href}
            className="text-sm text-primary hover:underline transition-colors"
          >
            Lihat Semua →
          </a>
        )}
      </div>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        role="list"
      >
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} priority={index < 4} />
        ))}
      </div>
    </section>
  );
}