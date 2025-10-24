import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-semibold text-white/70 text-sm">{label}</label>
      )}
      <input
        className={cn(
          'px-4 py-4 text-lg border-2 border-white/10 rounded-xl bg-black/30 text-white transition-all duration-300',
          'focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_20px_rgba(102,126,234,0.3)]',
          className
        )}
        {...props}
      />
    </div>
  );
};
