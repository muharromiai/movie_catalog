import { Metadata } from 'next';
import { MovieRow } from '@/components/movies/MovieRow';
import { tmdb } from '@/lib/tmdb';

export const metadata: Metadata = {
  title: 'Sedang Tayang',
  description: 'Film yang sedang tayang di bioskop saat ini.',
};

interface NowPlayingPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function NowPlayingPage({ searchParams }: NowPlayingPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');

  const data = await tmdb.getNowPlaying(page);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Sedang Tayang</h1>
        <p className="mt-2 text-muted-foreground">
          Film yang sedang tayang di bioskop saat ini.
        </p>
      </div>

      <MovieRow
        title="Sedang Tayang"
        movies={data.results}
      />

      {data.total_pages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {page > 1 && (
            <a
              href={`/movies/now-playing?page=${page - 1}`}
              className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
            >
              Sebelumnya
            </a>
          )}
          <span className="px-4 py-2 text-muted-foreground">
            Halaman {page} dari {data.total_pages}
          </span>
          {page < data.total_pages && (
            <a
              href={`/movies/now-playing?page=${page + 1}`}
              className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
            >
              Selanjutnya
            </a>
          )}
        </div>
      )}
    </div>
  );
}