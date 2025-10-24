import React from 'react';
import { cn } from '@/lib/utils';
import styles from './Card.module.scss';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hoverable = true }) => {
  return (
    <div
      className={cn(
        styles.card,
        hoverable && styles.hoverable,
        className
      )}
    >
      {children}
    </div>
  );
};
