// app/@modal/(.)notes/[id]/NotePreview.client.tsx

'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';
import Modal from '@/components/Modal/Modal';

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: async () => {
      const result = await fetchNoteById(id);
      if (!result) throw new Error('Note not found');
      return result;
    },
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError || !note) return <p>Error or note not found.</p>;

  return (
    <Modal onClose={handleClose}>
      <div>
        <button onClick={handleClose}>Close</button>

        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <p><strong>Tag:</strong> {note.tag}</p>
        <p>
          <strong>Created:</strong>{' '}
          {new Date(note.createdAt).toLocaleString()}
        </p>
      </div>
    </Modal>
  );
}
