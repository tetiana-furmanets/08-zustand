// app/notes/[id]/error.tsx

'use client';

type NoteErrorProps = {
  error: Error;
  reset: () => void;
};

export default function NoteError({ error, reset }: NoteErrorProps) {
  return (
    <div style={{ padding: '1rem', color: 'red' }}>
      <p>Could not fetch note details. {error.message}</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
