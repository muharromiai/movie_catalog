import { NextRequest, NextResponse } from 'next/server';
import { tmdb } from '@/lib/tmdb';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const page = parseInt(searchParams.get('page') || '1');

  if (!query || query.trim() === '') {
    return NextResponse.json({ results: [], total_pages: 0, total_results: 0, page: 1 });
  }

  try {
    const data = await tmdb.searchMovies(query.trim(), page);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Gagal mencari film' },
      { status: 500 }
    );
  }
}