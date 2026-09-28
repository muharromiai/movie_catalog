'use client';

import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export function SearchInput({ onSearch, placeholder = 'Cari film...', debounceMs = 500 }: SearchProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, debounceMs);

    if (query.trim()) {
      setIsSearching(true);
    }

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  // Trigger search when debounced query changes
  useEffect(() => {
    if (debouncedQuery !== query) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
    onSearch('');
  }, [onSearch]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setDebouncedQuery(query);
  }, [query]);

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <div className="relative">
        <Search
          className={cn(
            'absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors',
            isSearching ? 'text-primary animate-spin' : 'text-muted-foreground'
          )}
          aria-hidden="true"
        />
        <Input
          type="search"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="pl-10 pr-10"
          aria-label="Cari film"
          autoComplete="off"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={handleClear}
            aria-label="Hapus pencarian"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        {isSearching && (
          <Loader2
            className="absolute right-10 top-1/2 -translate-y-1/2 h-5 w-5 text-primary animate-spin"
            aria-hidden="true"
          />
        )}
      </div>
    </form>
  );
}