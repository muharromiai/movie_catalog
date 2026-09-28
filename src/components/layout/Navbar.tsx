'use client';

import Link from 'next/link';
import { SearchInput } from '@/components/movies/Search';
import { useWatchlist } from '@/context/WatchlistContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Film, Heart, Menu, X, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navbar() {
  const { watchlist } = useWatchlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/movies/top-rated', label: 'Top Rated' },
    { href: '/movies/now-playing', label: 'Sedang Tayang' },
    { href: '/movies/upcoming', label: 'Akan Datang' },
    { href: '/watchlist', label: 'Watchlist' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-sm border-b border-border shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary" aria-label="Movie Catalog Home">
            <Film className="h-8 w-8" />
            <span className="hidden sm:inline">MovieCatalog</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search & Watchlist */}
          <div className="flex items-center gap-4">
            {/* Search - Desktop */}
            <div className="hidden md:block w-72">
              <SearchInput onSearch={handleSearch} placeholder="Cari film..." />
            </div>

            {/* Watchlist Link */}
            <Link
              href="/watchlist"
              className="relative p-2 text-muted-foreground hover:text-red-500 transition-colors"
              aria-label={`Watchlist (${watchlist.length} film)`}
            >
              <Heart className="h-5 w-5" />
              {watchlist.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-bold">
                  {watchlist.length > 9 ? '9+' : watchlist.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-down">
            <div className="mb-4">
              <SearchInput
                onSearch={handleSearch}
                placeholder="Cari film..."
                debounceMs={300}
              />
            </div>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                  {link.href === '/watchlist' && watchlist.length > 0 && (
                    <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                      {watchlist.length}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}