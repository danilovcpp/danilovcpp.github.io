'use client';

import React from 'react';
import { Bead } from './Bead';
import { BeadPosition } from '@/types';
import { getSuperscript } from '@/lib/utils';
import styles from './AbacusColumn.module.scss';

interface AbacusColumnProps {
  column: number;
  totalColumns: number;
  beads: BeadPosition[];
  onBeadClick: (bead: BeadPosition) => void;
}

export const AbacusColumn: React.FC<AbacusColumnProps> = ({
  column,
  totalColumns,
  beads,
  onBeadClick,
}) => {
  const power = totalColumns - 1 - column;
  const label = power === 0 ? '1' : `10${getSuperscript(power)}`;

  const topBead = beads.find(b => b.column === column && b.type === 'top');
  const bottomBeads = beads
    .filter(b => b.column === column && b.type === 'bottom')
    .sort((a, b) => a.index - b.index);

  return (
    <div className={styles.column}>
      <div className={styles.label}>{label}</div>

      <div className={styles.rodContainer}>
        {/* Rod */}
        <div className={styles.rod} />

        {/* Divider */}
        <div className={styles.divider} />

        {/* Top bead container */}
        <div className={styles.topBeadsContainer}>
          {topBead && (
            <Bead
              active={topBead.active}
              onClick={() => onBeadClick(topBead)}
              type="top"
            />
          )}
        </div>

        {/* Bottom beads container */}
        <div className={styles.bottomBeadsContainer}>
          {bottomBeads.map((bead) => (
            <Bead
              key={`${bead.column}-${bead.type}-${bead.index}`}
              active={bead.active}
              onClick={() => onBeadClick(bead)}
              type="bottom"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
