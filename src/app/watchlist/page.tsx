'use client';

import { useWatchlist } from '@/context/WatchlistContext';
import { MovieCard } from '@/components/movies/MovieCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Film, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function WatchlistPage() {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  if (watchlist.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center py-16">
          <CardContent className="space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Film className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Watchlist Kosong</h1>
              <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                Kamu belum menyimpan film apapun. Mulai jelajahi dan tambahkan film favoritmu ke watchlist!
              </p>
            </div>
            <Link href="/">
              <Button className="gap-2 mx-auto">
                <Plus className="h-4 w-4" />
                Jelajahi Film
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Heart className="h-8 w-8 text-red-500" />
          Watchlist Saya
        </h1>
        <p className="mt-2 text-muted-foreground">
          {watchlist.length} film tersimpan
        </p>
      </div>

      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        role="list"
        aria-label="Watchlist movies"
      >
        {watchlist.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie as any}
            priority={false}
          />
        ))}
      </div>
    </div>
  );
}