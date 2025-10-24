import React from 'react';
import { cn } from '@/lib/utils';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <div className={styles.inputContainer}>
      {label && (
        <label className={styles.label}>{label}</label>
      )}
      <input
        className={cn(styles.input, className)}
        {...props}
      />
    </div>
  );
};
