'use client';

import { useState, useCallback } from 'react';
import { BeadPosition } from '@/types';

export function useAbacus(columns: number = 6) {
  const [beadStates, setBeadStates] = useState<BeadPosition[]>([]);
  const [currentValue, setCurrentValue] = useState<number>(0);

  const calculateColumnValue = useCallback((column: number, states: BeadPosition[]) => {
    const columnBeads = states.filter(b => b.column === column);

    let value = 0;
    const topBead = columnBeads.find(b => b.type === 'top');
    if (topBead?.active) {
      value += 5;
    }

    const bottomBeads = columnBeads.filter(b => b.type === 'bottom' && b.active);
    value += bottomBeads.length;

    return value;
  }, []);

  const calculateTotalValue = useCallback((states: BeadPosition[]) => {
    let total = 0;
    for (let i = 0; i < columns; i++) {
      const columnValue = calculateColumnValue(i, states);
      const power = columns - 1 - i;
      total += columnValue * Math.pow(10, power);
    }
    return total;
  }, [columns, calculateColumnValue]);

  const toggleBead = useCallback((bead: BeadPosition) => {
    setBeadStates(prevStates => {
      const newStates = [...prevStates];
      const beadIndex = newStates.findIndex(
        b => b.column === bead.column && b.type === bead.type && b.index === bead.index
      );

      if (bead.type === 'top') {
        if (beadIndex !== -1) {
          newStates[beadIndex].active = !newStates[beadIndex].active;
        }
      } else {
        // Bottom beads logic
        const columnBottomBeads = newStates
          .filter(b => b.column === bead.column && b.type === 'bottom')
          .sort((a, b) => a.index - b.index);

        if (beadIndex !== -1 && newStates[beadIndex].active) {
          // Deactivate this bead and all above it
          for (let i = 0; i <= bead.index; i++) {
            const idx = newStates.findIndex(
              b => b.column === bead.column && b.type === 'bottom' && b.index === i
            );
            if (idx !== -1) {
              newStates[idx].active = false;
            }
          }
        } else {
          // Activate this bead and all below it
          for (let i = bead.index; i < 4; i++) {
            const idx = newStates.findIndex(
              b => b.column === bead.column && b.type === 'bottom' && b.index === i
            );
            if (idx !== -1) {
              newStates[idx].active = true;
            }
          }
        }
      }

      const newValue = calculateTotalValue(newStates);
      setCurrentValue(newValue);
      return newStates;
    });
  }, [calculateTotalValue]);

  const setValue = useCallback((number: number) => {
    const digits = String(number)
      .padStart(columns, '0')
      .split('')
      .map(Number);

    const newStates: BeadPosition[] = [];

    for (let col = 0; col < columns; col++) {
      const digit = digits[col];

      // Add top bead
      newStates.push({
        column: col,
        type: 'top',
        index: 0,
        active: digit >= 5,
      });

      // Add bottom beads
      const bottomBeadsCount = digit >= 5 ? digit - 5 : digit;
      for (let i = 0; i < 4; i++) {
        newStates.push({
          column: col,
          type: 'bottom',
          index: i,
          active: i >= (4 - bottomBeadsCount),
        });
      }
    }

    setBeadStates(newStates);
    setCurrentValue(number);
  }, [columns]);

  const reset = useCallback(() => {
    const newStates: BeadPosition[] = [];

    for (let col = 0; col < columns; col++) {
      newStates.push({
        column: col,
        type: 'top',
        index: 0,
        active: false,
      });

      for (let i = 0; i < 4; i++) {
        newStates.push({
          column: col,
          type: 'bottom',
          index: i,
          active: false,
        });
      }
    }

    setBeadStates(newStates);
    setCurrentValue(0);
  }, [columns]);

  const initialize = useCallback(() => {
    reset();
  }, [reset]);

  return {
    beadStates,
    currentValue,
    toggleBead,
    setValue,
    reset,
    initialize,
  };
}
