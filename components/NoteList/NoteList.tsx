'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import type { Note } from '@/types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  readonly notes: readonly Note[];
}

export default function NoteList({ notes }: Readonly<NoteListProps>) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <div className={css.list}>
      {notes.map((note) => (
        <div key={note.id} className={css.item}>
          <h3 className={css.title}>{note.title}</h3>

          <p className={css.tag}>{note.tag}</p>

          <p className={css.content}>{note.content}</p>

          <div className={css.actions}>
            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
            </Link>

            <button
              type="button"
              className={css.deleteButton}
              onClick={() => deleteMutation.mutate(note.id)}
              disabled={deleteMutation.isPending}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
