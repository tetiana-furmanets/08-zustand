// app/notes/[id]/page.tsx

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import type { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  if (!note) {
    return {
      title: 'Note not found',
      description: 'The requested note does not exist in NoteHub.',
      openGraph: {
        title: 'Note not found',
        description: 'The requested note does not exist in NoteHub.',
        url: `https://08-zustand-1vb4-jqdoseqjj-tetiana-furmanets.vercel.app/notes/${params.id}`,
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          },
        ],
      },
    };
  }

  return {
    title: note.title,
    description: note.content.slice(0, 150), // короткий опис нотатки
    openGraph: {
      title: note.title,
      description: note.content.slice(0, 150),
      url: `https://your-vercel-url.vercel.app/notes/${params.id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        },
      ],
    },
  };
}

export default async function NotePage({ params }: Props) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
