// components/Modal/Modal.tsx
'use client';

import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void; 
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div
      onClick={onClose} 
      style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()} 
        style={{ backgroundColor: 'white', margin: '100px auto', padding: '20px', width: 'fit-content' }}
      >
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
