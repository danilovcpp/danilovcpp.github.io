'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import styles from './Bead.module.scss';

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
        styles.bead,
        active ? styles.active : styles.inactive
      )}
    />
  );
};
