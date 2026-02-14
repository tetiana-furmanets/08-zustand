// app/error.tsx


'use client';

type ErrorProps = Readonly<{
  error: Error;
  reset: () => void;
}>;

export default function NotesError({ error, reset }: ErrorProps) {
  return (
    <div style={{ padding: '1rem', color: 'red' }}>
      <p>Could not fetch the list of notes. {error.message}</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
