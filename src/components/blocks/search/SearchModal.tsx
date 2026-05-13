'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchBox from './SearchBox';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchModal({ isOpen, onClose }: Props) {
  // ✅ Lock background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // ✅ Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm p-4">
      {/* Modal Card */}

      <div
        className="w-full max-w-2xl mt-20 rounded-2xl shadow-xl border
  bg-gradient-to-br from-amber-50 to-white p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <SearchBox onClose={onClose} showDropdown={true} />
      </div>
    </div>
  );
}
