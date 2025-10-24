import React from 'react';
import { cn } from '@/lib/utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select: React.FC<SelectProps> = ({ label, className, children, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-semibold text-white/70 text-sm">{label}</label>
      )}
      <select
        className={cn(
          'px-4 py-3 text-base border-2 border-white/10 rounded-xl bg-black/30 text-white cursor-pointer transition-all duration-300',
          'hover:border-[#667eea] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_20px_rgba(102,126,234,0.3)]',
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};
