import React from 'react';
import { cn } from '@/lib/utils';
import styles from './Select.module.scss';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select: React.FC<SelectProps> = ({ label, className, children, ...props }) => {
  return (
    <div className={styles.selectContainer}>
      {label && (
        <label className={styles.label}>{label}</label>
      )}
      <select
        className={cn(styles.select, className)}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};
