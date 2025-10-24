import { Trainer } from '@/types';

export const trainers: Trainer[] = [
  {
    id: 'basic',
    title: 'Базовый режим',
    description: 'Практика работы с абакусом и ввод чисел вручную',
    icon: '🎯',
    path: '/trainers/basic',
  },
  {
    id: 'flash-anzan',
    title: 'Flash Anzan',
    description: 'Быстрые вычисления (Speed Math) - числа появляются на экране на доли секунды',
    icon: '⚡',
    path: '/trainers/flash-anzan',
  },
  {
    id: 'guess-result',
    title: 'Угадай результат',
    description: 'Решайте примеры и вводите правильный ответ',
    icon: '🎲',
    path: '/trainers/guess-result',
  },
  {
    id: 'mental-visualization',
    title: 'Mental Visualization',
    description: 'Абакус из головы - визуализация без физического инструмента',
    icon: '🧠',
    path: '/trainers/mental-visualization',
  },
  {
    id: 'soroban',
    title: 'Соробан (Японский абакус)',
    description: 'Традиционный японский счётный инструмент для развития навыков быстрого счёта',
    icon: '🎴',
    path: '/trainers/soroban',
  },
];
