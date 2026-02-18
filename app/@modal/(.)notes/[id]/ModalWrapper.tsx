'use client';

import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';

export default function ModalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      {children}
    </Modal>
  );
}
