'use client';

import React from 'react';
import Link from 'next/link';
import { Trainer } from '@/types';

interface TrainerCardProps {
  trainer: Trainer;
}

export const TrainerCard: React.FC<TrainerCardProps> = ({ trainer }) => {
  return (
    <Link href={trainer.path}>
      <div className="bg-black/30 border-2 border-white/10 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 relative overflow-hidden group hover:-translate-y-3 hover:scale-105 hover:border-[#667eea] hover:shadow-[0_20px_40px_rgba(102,126,234,0.4)]">
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-0" />

        <div className="relative z-10">
          <div className="text-5xl mb-4">{trainer.icon}</div>
          <h3 className="text-xl mb-3 text-white font-semibold">{trainer.title}</h3>
          <p className="text-white/70 text-sm leading-relaxed">{trainer.description}</p>
        </div>
      </div>
    </Link>
  );
};
