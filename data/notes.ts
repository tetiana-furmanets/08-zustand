export type Note = {
  id: number;
  title: string;
  content: string;
  category: 'work' | 'personal';
  priority: 'low' | 'medium' | 'high';
  date: 'today' | 'yesterday' | 'last-week';
};

export const notes: Note[] = [
  {
    id: 1,
    title: 'React homework',
    content: 'Finish homework for GOIT',
    category: 'work',
    priority: 'high',
    date: 'today',
  },
  {
    id: 2,
    title: 'Buy groceries',
    content: 'Milk, eggs, bread',
    category: 'personal',
    priority: 'medium',
    date: 'yesterday',
  },
  {
    id: 3,
    title: 'Meeting with team',
    content: 'Discuss Next.js migration',
    category: 'work',
    priority: 'high',
    date: 'last-week',
  },
  {
    id: 4,
    title: 'Yoga class',
    content: 'Morning session',
    category: 'personal',
    priority: 'low',
    date: 'today',
  },
];
