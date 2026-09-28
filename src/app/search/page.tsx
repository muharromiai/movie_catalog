'use client';

import { useState, useEffect, useCallback } from 'react';
import { Suspense } from 'react';
import { SearchInput } from '@/components/movies/Search';
import { MovieCard } from '@/components/movies/MovieCard';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Film, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchResultPageProps {
  searchParams: Promise<{ q?: string }>;
}

function SearchResults({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchResults = useCallback(async (searchQuery: string, pageNum = 1) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setTotalPages(0);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&page=${pageNum}`);
      if (!response.ok) throw new Error('Gagal mencari film');
      const data = await response.json();
      setResults(pageNum === 1 ? data.results : [...results, ...data.results]);
      setTotalPages(data.total_pages);
      setHasSearched(true);
    } catch (err) {
      setError('Terjadi kesalahan saat mencari. Silakan coba lagi.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [results]);

  useEffect(() => {
    fetchResults(query, 1);
    setPage(1);
  }, [query, fetchResults]);

  const handleLoadMore = () => {
    if (page < totalPages && !isLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchResults(query, nextPage);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Film className="h-8 w-8 text-primary" />
          Pencarian Film
        </h1>
        <p className="mt-2 text-muted-foreground">
          {hasSearched && query
            ? `Hasil pencarian untuk "${query}"`
            : 'Ketik judul film untuk mencari'}
        </p>
      </div>

      <SearchInput
        onSearch={setQuery}
        placeholder="Cari film..."
        debounceMs={500}
      />

      {error && (
        <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive" role="alert">
          {error}
        </div>
      )}

      {hasSearched && !query && (
        <Card className="mt-8">
          <CardContent className="py-12 text-center">
            <Film className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground">Mulai Mencari</h3>
            <p className="mt-2 text-muted-foreground">Ketik judul film di kolom pencarian di atas untuk menemukan film favoritmu.</p>
          </CardContent>
        </Card>
      )}

      {hasSearched && query && results.length === 0 && !isLoading && (
        <Card className="mt-8">
          <CardContent className="py-12 text-center">
            <X className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground">Tidak Ada Hasil</h3>
            <p className="mt-2 text-muted-foreground">Tidak ditemukan film untuk "{query}". Coba kata kunci lain.</p>
          </CardContent>
        </Card>
      )}

      {results.length > 0 && (
        <>
          <div
            className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            role="list"
            aria-label="Search results"
          >
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {page < totalPages && (
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                onClick={handleLoadMore}
                disabled={isLoading}
                className="gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Memuat...
                  </>
                ) : (
                  'Muat Lebih Banyak'
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function SearchPage({ searchParams }: SearchResultPageProps) {
  const params = await searchParams;
  const initialQuery = params.q || '';

  return (
    <Suspense fallback={
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <SearchResults initialQuery={initialQuery} />
    </Suspense>
  );
}