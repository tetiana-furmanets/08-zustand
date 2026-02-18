// app/(public routes)/notes/filter/[...slug]/page.tsx

import type { Metadata } from 'next';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const resolvedParams = await params;

  const tag = resolvedParams.slug?.[0] ?? 'all';

  return {
    title: `Notes - Filter: ${tag}`,
    description: `View notes filtered by ${tag} in NoteHub.`,
    openGraph: {
      title: `Notes - Filter: ${tag}`,
      description: `View notes filtered by ${tag} in NoteHub.`,
      url: `https://your-vercel-url.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        },
      ],
    },
  };
}

export default async function FilterPage({ params }: Props) {
  const resolvedParams = await params;

  const tag = resolvedParams.slug?.[0];
  const normalizedTag = tag === 'all' ? undefined : tag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', normalizedTag],
    queryFn: () => fetchNotes(1, 12, '', normalizedTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={normalizedTag} />
    </HydrationBoundary>
  );
}
