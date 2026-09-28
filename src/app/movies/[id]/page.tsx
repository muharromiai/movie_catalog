import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MovieDetailPage } from './MovieDetailClient';
import { tmdb } from '@/lib/tmdb';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const movie = await tmdb.getMovieDetails(parseInt(id));
    return {
      title: movie.title,
      description: movie.overview.slice(0, 160),
      openGraph: {
        title: movie.title,
        description: movie.overview.slice(0, 160),
        images: [
          {
            url: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
            width: 1280,
            height: 720,
            alt: movie.title,
          },
        ],
        type: 'video.movie',
      },
      twitter: {
        card: 'summary_large_image',
        title: movie.title,
        description: movie.overview.slice(0, 160),
        images: [`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`],
      },
    };
  } catch {
    return {
      title: 'Film Tidak Ditemukan',
    };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movieId = parseInt(id);

  if (isNaN(movieId)) {
    notFound();
  }

  try {
    const movie = await tmdb.getMovieDetails(movieId);
    return <MovieDetailPage movie={movie} />;
  } catch {
    notFound();
  }
}