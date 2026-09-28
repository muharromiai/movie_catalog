'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getImageUrl, getBackdropUrl, getProfileUrl } from '@/lib/tmdb';
import { formatDate, formatRuntime, formatCurrency, getYear, cn } from '@/lib/utils';
import { useWatchlist } from '@/context/WatchlistContext';
import type { MovieDetail, CastMember } from '@/types/movie';
import { Heart, Star, Clock, Calendar, Film, Users, PlayCircle, ChevronRight, YouTube, ArrowLeft } from 'lucide-react';

interface MovieDetailPageProps {
  movie: MovieDetail;
}

export function MovieDetailPage({ movie }: MovieDetailPageProps) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  // Find trailer
  const trailer = movie.videos?.results?.find(
    (v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official
  ) || movie.videos?.results?.find(
    (v) => v.site === 'YouTube' && v.type === 'Trailer'
  );

  if (trailer && !trailerKey) {
    setTrailerKey(trailer.key);
  }

  const handleToggleWatchlist = () => {
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

  const genres = movie.genres?.map((g) => g.name).join(', ') || 'N/A';
  const topCast = movie.credits?.cast?.slice(0, 10) || [];
  const directors = movie.credits?.crew?.filter((c) => c.job === 'Director').slice(0, 3) || [];

  return (
    <div className="min-h-screen">
      {/* Backdrop Hero */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full overflow-hidden">
        <Image
          src={getBackdropUrl(movie.backdrop_path, 'w1280')}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12">
          <div className="mx-auto max-w-7xl grid md:grid-cols-4 gap-8 items-end">
            {/* Poster */}
            <div className="md:col-span-1">
              <div className="relative aspect-[2/3] max-w-xs md:max-w-full mx-auto md:mx-0 drop-shadow-2xl">
                <Image
                  src={getImageUrl(movie.poster_path, 'w500')}
                  alt={movie.title}
                  fill
                  className="object-cover rounded-lg"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>

            {/* Info */}
            <div className="md:col-span-3 text-white space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 text-sm font-medium bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  {getYear(movie.release_date)}
                </span>
                {movie.runtime && (
                  <span className="px-3 py-1 text-sm font-medium bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                    {formatRuntime(movie.runtime)}
                  </span>
                )}
                <span className="px-3 py-1 text-sm font-medium bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  {movie.status}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-lg md:text-xl text-white/80 italic max-w-2xl">
                  "{movie.tagline}"
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-1.5 rounded-full border border-yellow-500/50">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-bold text-lg">{movie.vote_average.toFixed(1)}</span>
                  <span className="text-sm text-white/70">/10</span>
                  <span className="text-sm text-white/60">({movie.vote_count} rating)</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant={inWatchlist ? 'default' : 'outline'}
                    className={cn('gap-1.5 h-10', inWatchlist ? 'bg-red-500 text-white border-red-500' : 'border-white/50 text-white hover:bg-white/10')}
                    onClick={handleToggleWatchlist}
                  >
                    <Heart className={cn('h-5 w-5', inWatchlist ? 'fill-current' : '')} />
                    {inWatchlist ? 'Tersimpan' : 'Simpan'}
                  </Button>

                  {trailerKey && (
                    <Button
                      variant="outline"
                      className="gap-2 border-white/50 text-white hover:bg-white/10"
                      onClick={() => setShowTrailer(true)}
                    >
                      <PlayCircle className="h-5 w-5" />
                      Trailer
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-sm text-white/70">
                <span className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded border border-white/20">
                  {genres}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Overview & Details Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Overview */}
          <div className="lg:col-span-2 space-y-8">
            <section aria-labelledby="overview-heading">
              <h2 id="overview-heading" className="text-2xl font-bold text-foreground">Sinopsis</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {movie.overview || 'Sinopsis tidak tersedia.'}
              </p>
            </section>

            <Separator />

            {/* Details Grid */}
            <section aria-labelledby="details-heading">
              <h2 id="details-heading" className="text-2xl font-bold text-foreground">Detail Film</h2>
              <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-muted-foreground">Tanggal Rilis</dt>
                  <dd className="font-medium text-foreground">{formatDate(movie.release_date)}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Durasi</dt>
                  <dd className="font-medium text-foreground">{formatRuntime(movie.runtime)}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Genre</dt>
                  <dd className="font-medium text-foreground">{genres}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Bahasa Asli</dt>
                  <dd className="font-medium text-foreground capitalize">{movie.original_language}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Anggaran</dt>
                  <dd className="font-medium text-foreground">{movie.budget > 0 ? formatCurrency(movie.budget) : 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Pendapatan</dt>
                  <dd className="font-medium text-foreground">{movie.revenue > 0 ? formatCurrency(movie.revenue) : 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Status</dt>
                  <dd className="font-medium text-foreground">{movie.status}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Rating</dt>
                  <dd className="font-medium text-foreground">{movie.vote_average.toFixed(1)} / 10 ({movie.vote_count} suara)</dd>
                </div>
              </dl>
            </section>

            {movie.production_companies?.length > 0 && (
              <>
                <Separator />
                <section aria-labelledby="companies-heading">
                  <h2 id="companies-heading" className="text-2xl font-bold text-foreground">Perusahaan Produksi</h2>
                  <div className="mt-4 flex flex-wrap gap-4">
                    {movie.production_companies.map((company) => (
                      <div key={company.id} className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg">
                        {company.logo_path && (
                          <Image
                            src={getImageUrl(company.logo_path, 'w92')}
                            alt={company.name}
                            width={48}
                            height={24}
                            className="h-6 w-auto"
                          />
                        )}
                        <span className="text-sm font-medium">{company.name}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Cast */}
            {topCast.length > 0 && (
              <section aria-labelledby="cast-heading">
                <div className="flex items-center justify-between mb-4">
                  <h2 id="cast-heading" className="text-2xl font-bold text-foreground">Pemeran Utama</h2>
                  <Link
                    href={`/movies/${movie.id}/cast`}
                    className="text-sm text-primary hover:underline"
                  >
                    Lihat Semua <ChevronRight className="inline h-4 w-4" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {topCast.map((actor: CastMember) => (
                    <Link
                      key={actor.id}
                      href={`/person/${actor.id}`}
                      className="flex items-center gap-3 p-2 hover:bg-accent rounded-lg transition-colors group"
                    >
                      <div className="relative h-16 w-10 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={getProfileUrl(actor.profile_path, 'w185')}
                          alt={actor.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="40px"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{actor.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{actor.character}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Directors */}
            {directors.length > 0 && (
              <section aria-labelledby="crew-heading">
                <h2 id="crew-heading" className="text-2xl font-bold text-foreground">Sutradara</h2>
                <div className="mt-4 space-y-2">
                  {directors.map((director) => (
                    <Link
                      key={director.id}
                      href={`/person/${director.id}`}
                      className="flex items-center gap-3 p-2 hover:bg-accent rounded-lg transition-colors"
                    >
                      <div className="relative h-12 w-12 flex-shrink-0 rounded-full overflow-hidden">
                        <Image
                          src={getProfileUrl(director.profile_path, 'w185')}
                          alt={director.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{director.name}</p>
                        <p className="text-xs text-muted-foreground">Sutradara</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Trailer Modal */}
        {showTrailer && trailerKey && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setShowTrailer(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Trailer"
          >
            <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowTrailer(false)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
                aria-label="Tutup trailer"
              >
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
                  title={`${movie.title} - Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}