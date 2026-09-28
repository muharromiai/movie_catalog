import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { WatchlistProvider } from '@/context/WatchlistContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'MovieCatalog - Temukan Film Favoritmu',
    template: '%s | MovieCatalog',
  },
  description: 'Jelajahi ribuan film, cari review, trailer, dan bangun watchlist pribadimu. Data dari TMDB.',
  keywords: ['film', 'movie', 'catalog', 'watchlist', 'TMDB', 'streaming', 'review'],
  authors: [{ name: 'MovieCatalog' }],
  creator: 'MovieCatalog',
  publisher: 'MovieCatalog',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://movie-catalog.example.com',
    siteName: 'MovieCatalog',
    title: 'MovieCatalog - Temukan Film Favoritmu',
    description: 'Jelajahi ribuan film, cari review, trailer, dan bangun watchlist pribadimu.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MovieCatalog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MovieCatalog',
    description: 'Jelajahi ribuan film, cari review, trailer, dan bangun watchlist pribadimu.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://image.tmdb.org" />
        <link rel="dns-prefetch" href="https://image.tmdb.org" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased text-foreground">
        <WatchlistProvider>
          <Navbar />
          <main className="pt-16 min-h-screen" id="main-content">
            {children}
          </main>
          <Footer />
        </WatchlistProvider>
      </body>
    </html>
  );
}