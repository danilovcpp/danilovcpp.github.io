import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hoverable = true }) => {
  return (
    <div
      className={cn(
        'bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 mb-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)] animate-fadeInUp',
        hoverable && 'transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.4)]',
        className
      )}
    >
      {children}
    </div>
  );
};
