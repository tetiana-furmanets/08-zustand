// components/NotePreview/NotePreview.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';

type Props = {
  id: string;
};

export default function NotePreview({ id }: Props) {
  const { data: note, isLoading, error } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: async () => {
      const n = await fetchNoteById(id);
      if (!n) throw new Error('Note not found');
      return n;
    },
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong or note not found.</p>; // <-- перевірка note

  return (
    <div>
      {note && (  
        <>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </>
      )}
    </div>
  );
}
