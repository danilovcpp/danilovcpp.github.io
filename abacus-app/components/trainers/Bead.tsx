'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BeadProps {
  active: boolean;
  onClick: () => void;
  type: 'top' | 'bottom';
}

export const Bead: React.FC<BeadProps> = ({ active, onClick, type }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'w-9 h-9 rounded-full cursor-pointer transition-all duration-300 relative z-10',
        'shadow-[0_5px_15px_rgba(0,0,0,0.3)]',
        'hover:scale-110 hover:shadow-[0_8px_25px_rgba(240,147,251,0.6)] active:scale-95',
        active
          ? 'bg-gradient-success shadow-[0_5px_25px_rgba(67,233,123,0.6)]'
          : 'bg-gradient-secondary'
      )}
    />
  );
};
