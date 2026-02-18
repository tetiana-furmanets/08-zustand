'use client';

import { useRouter } from 'next/navigation';
import NoteForm from '@/components/NoteForm/NoteForm';

export default function NoteFormWrapper() {
  const router = useRouter();

  return (
    <NoteForm onClose={() => router.push('/notes/filter/all')} />
  );
}
