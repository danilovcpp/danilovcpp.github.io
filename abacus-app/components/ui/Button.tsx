import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className,
  ...props
}) => {
  const baseStyles = 'px-8 py-4 text-base font-semibold rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden text-white disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-gradient-primary shadow-[0_10px_30px_rgba(102,126,234,0.4)] hover:shadow-[0_15px_40px_rgba(102,126,234,0.6)] active:scale-95',
    secondary: 'bg-gradient-secondary shadow-[0_10px_30px_rgba(240,147,251,0.4)] hover:shadow-[0_15px_40px_rgba(240,147,251,0.6)] active:scale-95',
    accent: 'bg-gradient-accent shadow-[0_10px_30px_rgba(79,172,254,0.4)] hover:shadow-[0_15px_40px_rgba(79,172,254,0.6)] active:scale-95',
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
