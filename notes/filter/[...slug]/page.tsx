// app/(public routes)/notes/filter/[...slug]/page.tsx
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug?: string[] }>; 
};

export default async function FilterPage({ params }: Props) {
  const resolvedParams = await params; 
  const tag = resolvedParams.slug?.[0];

  return (
    <div className="app" style={{ padding: '16px' }}>
      <h1>Notes: {tag || 'All'}</h1>
      <NotesClient tag={tag === 'all' ? undefined : tag} />
    </div>
  );
}
