// Trainer types
export type TrainerType = 'basic' | 'flash-anzan' | 'guess-result' | 'mental-visualization' | 'soroban';

export interface Trainer {
  id: TrainerType;
  title: string;
  description: string;
  icon: string;
  path: string;
}

// Abacus types
export interface BeadPosition {
  column: number;
  type: 'top' | 'bottom';
  index: number;
  active: boolean;
}

export interface ColumnValue {
  column: number;
  value: number;
}

// Flash Anzan types
export interface FlashAnzanSettings {
  count: number;
  speed: number;
  digits: number;
}

export interface FlashAnzanStats {
  correct: number;
  wrong: number;
  accuracy: number;
}

// Practice mode types
export interface PracticeChallenge {
  number: number;
  completed: boolean;
}
