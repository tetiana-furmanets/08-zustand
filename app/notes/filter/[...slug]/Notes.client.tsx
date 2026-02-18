// app/notes/filter/[...slug]/Notes.client.tsx

'use client';

import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import { Pagination } from '@/components/Pagination/Pagination';
import Link from 'next/link';

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, debounced, tag],
    queryFn: () => fetchNotes(page, 12, debounced, tag),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error</p>;

  return (
    <>
      <SearchBox value={search} onChange={setSearch} />

      <Link href="/notes/action/create">
        <button>Create note +</button>
      </Link>

      {data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found.</p>
      )}

      {data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </>
  );
}
