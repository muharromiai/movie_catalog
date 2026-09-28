const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const getApiKey = () => {
  return process.env.NEXT_PUBLIC_TMDB_API_KEY || '';
};

const getHeaders = () => ({
  Authorization: `Bearer ${getApiKey()}`,
  'Content-Type': 'application/json;charset=utf-8',
});

async function fetchFromTMDB<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
    headers: getHeaders(),
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  return response.json();
}

export const tmdb = {
  // Trending movies
  getTrending: (timeWindow: 'day' | 'week' = 'day') =>
    fetchFromTMDB<{ results: Movie[] }>(`/trending/movie/${timeWindow}?language=id-ID`),

  // Top rated movies
  getTopRated: (page = 1) =>
    fetchFromTMDB<{ results: Movie[] }>(`/movie/top_rated?language=id-ID&page=${page}`),

  // Now playing movies
  getNowPlaying: (page = 1) =>
    fetchFromTMDB<{ results: Movie[] }>(`/movie/now_playing?language=id-ID&page=${page}`),

  // Upcoming movies
  getUpcoming: (page = 1) =>
    fetchFromTMDB<{ results: Movie[] }>(`/movie/upcoming?language=id-ID&page=${page}`),

  // Movie details
  getMovieDetails: (id: number) =>
    fetchFromTMDB<MovieDetail>(`/movie/${id}?language=id-ID&append_to_response=credits,videos`),

  // Search movies
  searchMovies: (query: string, page = 1) =>
    fetchFromTMDB<SearchResult>(
      `/search/movie?query=${encodeURIComponent(query)}&language=id-ID&page=${page}&include_adult=false`
    ),

  // Get movie credits
  getMovieCredits: (id: number) =>
    fetchFromTMDB<Credits>(`/movie/${id}/credits?language=id-ID`),

  // Get movie videos
  getMovieVideos: (id: number) =>
    fetchFromTMDB<VideosResponse>(`/movie/${id}/videos?language=id-ID`),
};

// SVG placeholder generators (self-contained, no external files needed)
const placeholderMovieSvg = (size: string) => `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'%3E%3Crect fill='%23e5e7eb' width='${size}' height='${size}'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='${parseInt(size) * 0.15}' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E`;

const placeholderBackdropSvg = (size: string) => `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${Math.round(parseInt(size) * 0.5625)}' viewBox='0 0 ${size} ${Math.round(parseInt(size) * 0.5625)}'%3E%3Crect fill='%231f2937' width='${size}' height='${Math.round(parseInt(size) * 0.5625)}'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='${parseInt(size) * 0.1}' fill='%236b7280'%3ENo Backdrop%3C/text%3E%3C/svg%3E`;

const placeholderPersonSvg = (size: string) => `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'%3E%3Crect fill='%23e5e7eb' width='${size}' height='${size}'/%3E%3Ccircle cx='50%25' cy='35%25' r='${parseInt(size) * 0.15}' fill='%239ca3af'/%3E%3Cellipse cx='50%25' cy='80%25' rx='${parseInt(size) * 0.25}' ry='${parseInt(size) * 0.2}' fill='%239ca3af'/%3E%3C/svg%3E`;

// Image URL helpers
export const getImageUrl = (path: string | null, size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'): string => {
  if (!path) return placeholderMovieSvg(size.replace('w', ''));
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path: string | null, size: 'w300' | 'w780' | 'w1280' | 'original' = 'w1280'): string => {
  if (!path) return placeholderBackdropSvg(size.replace('w', ''));
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getProfileUrl = (path: string | null, size: 'w45' | 'w185' | 'h632' | 'original' = 'w185'): string => {
  if (!path) return placeholderPersonSvg(size.replace('w', '').replace('h', ''));
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

// Re-export types
export type { Movie, MovieDetail, Genre, CastMember, CrewMember, Video, TMDBResponse, SearchResult, WatchlistMovie } from '@/types/movie';