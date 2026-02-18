// app/notes/action/create/page.tsx

import type { Metadata } from 'next';
import NoteFormWrapper from './NoteFormWrapper';
import css from './CreateNote.module.css';

export const metadata: Metadata = {
  title: 'Create note | NoteHub',
  description: 'Create a new note in NoteHub.',
  openGraph: {
    title: 'Create note | NoteHub',
    description: 'Create a new note in NoteHub.',
    url: 'https://08-zustand-1vb4-jqdoseqjj-tetiana-furmanets.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteFormWrapper />
      </div>
    </main>
  );
}
