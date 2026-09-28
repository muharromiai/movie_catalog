# MovieCatalog - Website Katalog Film

Website katalog film modern yang dibangun dengan Next.js 15, TypeScript, Tailwind CSS, dan shadcn/ui. Menggunakan API dari TMDB (The Movie Database).

## Fitur Utama

1. **Discovery Halaman Utama**
   - Hero Section/Carousel untuk film Trending hari ini
   - Baris horizontal terpisah untuk: Top Rated, Now Playing, Upcoming

2. **Smart Search**
   - Kolom pencarian di Navbar
   - Debounce 500ms - API dipanggil setelah user berhenti mengetik

3. **Halaman Detail Film Secara Lengkap**
   - Poster & Backdrop ukuran besar
   - Informasi meta: sinopsis, genre, durasi, tanggal rilis, rating
   - Daftar pemeran utama (Cast) dari endpoint Credits
   - Trailer YouTube (modal)

4. **Watchlist / Favorit (Tanpa Login)**
   - Tombol Favorite/Simpan di setiap poster & halaman detail
   - Halaman khusus "My Watchlist"
   - Data disimpan di LocalStorage

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Context + LocalStorage
- **Data Fetching**: Server Components + TanStack Query (client)
- **API**: TMDB (The Movie Database)
- **Icons**: Lucide React

## How to Start

### Requirement

- Node.js 18+
- npm/yarn/pnpm
- TMDB API Key ([TMDB](https://www.themoviedb.org/settings/api))

### Instalasi

```bash
# Clone repository
cd movie-catalog

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local dan masukkan TMDB API Key Anda
# NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here

# Run development server
npm run dev
```


## Struktur Project

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/search/         # Search API route
│   ├── movies/
│   │   ├── [id]/           # Dynamic movie detail page
│   │   ├── top-rated/      # Top rated movies page
│   │   ├── now-playing/    # Now playing movies page
│   │   └── upcoming/       # Upcoming movies page
│   ├── search/             # Search results page
│   ├── watchlist/          # Watchlist page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── movies/             # MovieCard, MovieRow, HeroCarousel, Search
│   └── ui/                 # shadcn/ui components (Button, Card, Input, Badge, Separator)
├── context/
│   └── WatchlistContext.tsx # Watchlist state management
├── lib/
│   ├── tmdb.ts             # TMDB API client
│   └── utils.ts            # Utility functions
├── hooks/                  # Custom hooks
└── types/
    └── movie.ts            # TypeScript types
```

## UI Components (shadcn/ui)

Components used:
- Button
- Card
- Input
- Badge
- Separator

All components are in `src/components/ui/` and can be customized.

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

## Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1400px)
- Horizontal scroll untuk movie rows di mobile
- Collapsible mobile menu di Navbar

## Accessibility

- Semantic HTML
- ARIA labels & roles
- Focus visible states
- Keyboard navigation
- Color contrast compliance
- Alt text untuk gambar

## Dark Mode

Supported via CSS variables (class strategy). Toggle dengan `document.documentElement.classList.toggle('dark')`.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_TMDB_API_KEY` | Yes | TMDB API Key v3 |
| `TMDB_ACCESS_TOKEN` | No | TMDB Access Token v4 (optional) |

## Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request