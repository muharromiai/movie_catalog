import { Metadata } from 'next';
import { HeroCarousel } from '@/components/movies/HeroCarousel';
import { MovieRow } from '@/components/movies/MovieRow';
import { tmdb } from '@/lib/tmdb';

export const metadata: Metadata = {
  title: 'Beranda',
  description: 'Jelajahi film trending, top rated, sedang tayang, dan film yang akan datang.',
};

interface HomePageProps {
  searchParams: Promise<{}>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  await searchParams;

  // Fetch all data in parallel
  const [trending, topRated, nowPlaying, upcoming] = await Promise.all([
    tmdb.getTrending('day'),
    tmdb.getTopRated(1),
    tmdb.getNowPlaying(1),
    tmdb.getUpcoming(1),
  ]);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section - Trending Movies */}
      <section aria-labelledby="trending-heading">
        <div className="sr-only" id="trending-heading">Film Trending Hari Ini</div>
        <HeroCarousel movies={trending.results.slice(0, 5)} />
      </section>

      {/* Movie Rows */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <MovieRow
          title="Top Rated"
          movies={topRated.results.slice(0, 12)}
          href="/movies/top-rated"
        />

        <MovieRow
          title="Sedang Tayang"
          movies={nowPlaying.results.slice(0, 12)}
          href="/movies/now-playing"
        />

        <MovieRow
          title="Akan Datang"
          movies={upcoming.results.slice(0, 12)}
          href="/movies/upcoming"
        />
      </div>
    </div>
  );
}