'use client';

import React, { useEffect } from 'react';
import { AbacusColumn } from './AbacusColumn';
import { useAbacus } from '@/hooks/useAbacus';
import { Card } from '@/components/ui/Card';
import styles from './Abacus.module.scss';

interface AbacusProps {
  columns?: number;
  value?: number;
  onChange?: (value: number) => void;
  showValue?: boolean;
}

export const Abacus: React.FC<AbacusProps> = ({
  columns = 6,
  value,
  onChange,
  showValue = true,
}) => {
  const { beadStates, currentValue, toggleBead, setValue, initialize } = useAbacus(columns);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (value !== undefined && value !== currentValue) {
      setValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (onChange) {
      onChange(currentValue);
    }
  }, [currentValue, onChange]);

  return (
    <Card className={styles.abacusCard}>
      <h2 className={styles.title}>
        Соробан (Японский абакус)
      </h2>

      <div className={styles.container}>
        <div className={styles.abacusFrame}>
          {Array.from({ length: columns }, (_, i) => columns - 1 - i).map((col) => (
            <AbacusColumn
              key={col}
              column={col}
              totalColumns={columns}
              beads={beadStates}
              onBeadClick={toggleBead}
            />
          ))}
        </div>
      </div>

      {showValue && (
        <div className={styles.footer}>
          <p>Нажимайте на бусины, чтобы двигать их</p>
          <p>Верхняя бусина = 5, нижние бусины = 1</p>
        </div>
      )}
    </Card>
  );
};
