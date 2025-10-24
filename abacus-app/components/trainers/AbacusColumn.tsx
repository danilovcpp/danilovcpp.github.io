'use client';

import React from 'react';
import { Bead } from './Bead';
import { BeadPosition } from '@/types';
import { getSuperscript } from '@/lib/utils';

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
    <div className="flex flex-col items-center gap-3">
      <div className="text-sm text-white/70 mb-1 font-semibold">{label}</div>

      <div className="relative">
        {/* Rod */}
        <div className="w-1.5 h-[300px] bg-gradient-to-b from-gray-600 to-gray-800 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]" />

        {/* Divider */}
        <div className="absolute w-8 h-1 bg-gradient-primary left-1/2 -translate-x-1/2 top-20 rounded-full shadow-[0_0_10px_rgba(102,126,234,0.5)]" />

        {/* Top bead container */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col gap-2">
          {topBead && (
            <Bead
              active={topBead.active}
              onClick={() => onBeadClick(topBead)}
              type="top"
            />
          )}
        </div>

        {/* Bottom beads container */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col gap-2">
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
