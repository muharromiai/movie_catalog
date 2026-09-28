'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { WatchlistMovie } from '@/types/movie';

interface WatchlistContextType {
  watchlist: WatchlistMovie[];
  addToWatchlist: (movie: WatchlistMovie) => void;
  removeFromWatchlist: (id: number) => void;
  isInWatchlist: (id: number) => boolean;
  toggleWatchlist: (movie: WatchlistMovie) => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

const STORAGE_KEY = 'movie-catalog-watchlist';

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<WatchlistMovie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setWatchlist(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load watchlist from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
      } catch (error) {
        console.error('Failed to save watchlist to localStorage:', error);
      }
    }
  }, [watchlist, isLoaded]);

  const addToWatchlist = (movie: WatchlistMovie) => {
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, { ...movie, addedAt: new Date().toISOString() }];
    });
  };

  const removeFromWatchlist = (id: number) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  };

  const isInWatchlist = (id: number) => {
    return watchlist.some((m) => m.id === id);
  };

  const toggleWatchlist = (movie: WatchlistMovie) => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        toggleWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}