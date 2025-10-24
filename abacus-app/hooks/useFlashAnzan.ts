'use client';

import { useState, useCallback } from 'react';
import { FlashAnzanSettings, FlashAnzanStats } from '@/types';
import { delay, generateRandomNumber } from '@/lib/utils';

export function useFlashAnzan() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [stats, setStats] = useState<FlashAnzanStats>({
    correct: 0,
    wrong: 0,
    accuracy: 0,
  });

  const generateNumbers = useCallback((count: number, digits: number) => {
    const newNumbers: number[] = [];
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;

    for (let i = 0; i < count; i++) {
      newNumbers.push(generateRandomNumber(min, max));
    }

    const sum = newNumbers.reduce((acc, num) => acc + num, 0);
    setNumbers(newNumbers);
    setCorrectAnswer(sum);
    return newNumbers;
  }, []);

  const start = useCallback(
    async (settings: FlashAnzanSettings, onNumberShow: (num: number, index: number) => void, onFinish: () => void) => {
      const nums = generateNumbers(settings.count, settings.digits);
      setIsRunning(true);
      setCurrentIndex(0);

      for (let i = 0; i < nums.length; i++) {
        if (!isRunning) break;

        setCurrentIndex(i);
        onNumberShow(nums[i], i);

        await delay(settings.speed);
        await delay(200);
      }

      setIsRunning(false);
      onFinish();
    },
    [generateNumbers, isRunning]
  );

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const checkAnswer = useCallback(
    (userAnswer: number): boolean => {
      const isCorrect = userAnswer === correctAnswer;

      setStats(prev => {
        const newCorrect = prev.correct + (isCorrect ? 1 : 0);
        const newWrong = prev.wrong + (isCorrect ? 0 : 1);
        const total = newCorrect + newWrong;
        const accuracy = total > 0 ? Math.round((newCorrect / total) * 100) : 0;

        return {
          correct: newCorrect,
          wrong: newWrong,
          accuracy,
        };
      });

      return isCorrect;
    },
    [correctAnswer]
  );

  const resetStats = useCallback(() => {
    setStats({
      correct: 0,
      wrong: 0,
      accuracy: 0,
    });
  }, []);

  return {
    numbers,
    currentIndex,
    correctAnswer,
    isRunning,
    stats,
    start,
    stop,
    checkAnswer,
    resetStats,
  };
}
