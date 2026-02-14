// app/notes/filter/[...slug]/Notes.client.tsx

'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotesByTag } from '@/lib/api'; 
import type { Note } from '@/types/note';
import SearchBox from '@/components/SearchBox/SearchBox';

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {
  const [search, setSearch] = useState('');

  const { data, isLoading, error } = useQuery<Note[]>({
    queryKey: ['notes', tag, search],
    queryFn: () => fetchNotesByTag(tag), // або fetchNotes(tag, search)
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <div className="notes-container">
      <SearchBox value={search} onChange={setSearch} />
      <ul>
        {data?.map((note: Note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}