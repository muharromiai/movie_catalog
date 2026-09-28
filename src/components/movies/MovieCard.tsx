'use client';

import { useWatchlist } from '@/context/WatchlistContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getImageUrl } from '@/lib/tmdb';
import { getYear } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { Movie } from '@/types/movie';
import { Heart, Bookmark } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
  className?: string;
}

export function MovieCard({ movie, priority = false, className }: MovieCardProps) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  const handleToggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWatchlist({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      overview: movie.overview,
      genre_ids: movie.genre_ids,
    });
  };

  return (
    <Link href={`/movies/${movie.id}`} className="block group">
      <Card className={cn('overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1', className)}>
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={getImageUrl(movie.poster_path, 'w342')}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-2 right-2">
            <Badge variant="success" className="gap-1">
              <span className="text-xs font-bold">{movie.vote_average.toFixed(1)}</span>
            </Badge>
          </div>

          <div className="absolute bottom-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
            <Button
              size="icon"
              variant="ghost"
              className="bg-white/90 hover:bg-white text-primary"
              onClick={handleToggleWatchlist}
              aria-label={inWatchlist ? 'Hapus dari watchlist' : 'Tambah ke watchlist'}
            >
              <Heart className={cn('h-5 w-5', inWatchlist ? 'fill-current text-red-500' : '')} />
            </Button>
          </div>
        </div>

        <CardContent className="p-3 pb-4">
          <h3 className="font-semibold text-sm line-clamp-1 text-foreground group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <span>{getYear(movie.release_date)}</span>
            <span>·</span>
            <Badge variant="outline" className="text-xs px-2 py-0.5 h-auto">
              {movie.genre_ids?.slice(0, 2).map((id) => id).join(', ') || 'N/A'}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}