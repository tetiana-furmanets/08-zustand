// app/not-found.tsx

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 | Page not found',
  description: 'This page does not exist in NoteHub.',
  openGraph: {
    title: '404 | Page not found',
    description: 'This page does not exist in NoteHub.',
    url: 'https://your-vercel-url.vercel.app/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main>
      <h1>404 - Page not found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </main>
  );
}
