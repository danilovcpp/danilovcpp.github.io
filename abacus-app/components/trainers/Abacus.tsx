'use client';

import React, { useEffect } from 'react';
import { AbacusColumn } from './AbacusColumn';
import { useAbacus } from '@/hooks/useAbacus';
import { Card } from '@/components/ui/Card';

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
    <Card className="bg-gradient-to-br from-[rgba(102,126,234,0.1)] to-[rgba(118,75,162,0.1)]">
      <h2 className="text-3xl mb-5 bg-gradient-accent bg-clip-text text-transparent font-bold">
        Соробан (Японский абакус)
      </h2>

      <div className="flex justify-center py-10">
        <div className="flex gap-4 bg-black/30 p-8 rounded-2xl shadow-[inset_0_5px_20px_rgba(0,0,0,0.5)]">
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
        <div className="text-center mt-5 text-white/70">
          <p className="mb-1">Нажимайте на бусины, чтобы двигать их</p>
          <p>Верхняя бусина = 5, нижние бусины = 1</p>
        </div>
      )}
    </Card>
  );
};
