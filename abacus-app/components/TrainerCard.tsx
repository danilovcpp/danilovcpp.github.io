'use client';

import React from 'react';
import Link from 'next/link';
import { Trainer } from '@/types';
import styles from './TrainerCard.module.scss';

interface TrainerCardProps {
  trainer: Trainer;
}

export const TrainerCard: React.FC<TrainerCardProps> = ({ trainer }) => {
  return (
    <Link href={trainer.path}>
      <div className={styles.card}>
        {/* Background gradient on hover */}
        <div className={styles.backgroundGradient} />

        <div className={styles.content}>
          <div className={styles.icon}>{trainer.icon}</div>
          <h3 className={styles.title}>{trainer.title}</h3>
          <p className={styles.description}>{trainer.description}</p>
        </div>
      </div>
    </Link>
  );
};
