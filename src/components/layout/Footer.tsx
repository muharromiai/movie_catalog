import Link from 'next/link';
import { Film, Github, Twitter, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary" aria-label="Movie Catalog Home">
              <Film className="h-8 w-8" />
              <span>MovieCatalog</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Temukan film favoritmu, jelajahi film terbaru, dan bangun watchlist pribadimu tanpa perlu login.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-foreground">Jelajahi</h3>
            <ul className="mt-4 space-y-2" role="list">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Beranda</Link></li>
              <li><Link href="/movies/top-rated" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Top Rated</Link></li>
              <li><Link href="/movies/now-playing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sedang Tayang</Link></li>
              <li><Link href="/movies/upcoming" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Akan Datang</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-foreground">Fitur</h3>
            <ul className="mt-4 space-y-2" role="list">
              <li><Link href="/watchlist" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Watchlist Pribadi</Link></li>
              <li><Link href="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pencarian Cerdas</Link></li>
              <li><span className="text-sm text-muted-foreground">Detail Film Lengkap</span></li>
              <li><span className="text-sm text-muted-foreground">Trailer & Cast</span></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold text-foreground">Tentang</h3>
            <ul className="mt-4 space-y-2" role="list">
              <li className="text-sm text-muted-foreground">Data dari <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">TMDB</a></li>
              <li className="text-sm text-muted-foreground">Dibangun dengan Next.js 15</li>
              <li className="text-sm text-muted-foreground">UI: Tailwind CSS + shadcn/ui</li>
              <li className="text-sm text-muted-foreground">State: React Context + LocalStorage</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {currentYear} MovieCatalog. Dibuat dengan <Heart className="inline h-4 w-4 text-red-500" aria-hidden="true" /> untuk pecinta film.
          </p>
          <p className="text-xs text-muted-foreground text-center md:text-right">
            Bukan produk resmi TMDB. Data film &copy; TMDB.
          </p>
        </div>
      </div>
    </footer>
  );
}