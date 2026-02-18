'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';
import type { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

const TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

interface NoteFormProps {
  readonly onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const [form, setForm] = useState<{
  title: string;
  content: string;
  tag: NoteTag;
}>({
  title: draft.title,
  content: draft.content,
  tag: draft.tag,
});


  useEffect(() => {
    setForm({
      title: draft.title,
      content: draft.content,
      tag: draft.tag,
    });
  }, [draft]);

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      onClose();
    },
  });

 const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) => {
  const { name, value } = e.target;

  const updatedForm = {
    ...form,
    [name]: name === 'tag' ? (value as NoteTag) : value,
  };

  setForm(updatedForm);
  setDraft(updatedForm);
};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.field}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.field}>
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          maxLength={500}
        />
      </div>

      <div className={css.field}>
        <select name="tag" value={form.tag} onChange={handleChange} required>
          {TAGS.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" disabled={mutation.isPending}>
          Create Note
        </button>
      </div>
    </form>
  );
}
