'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Abacus } from '@/components/trainers/Abacus';
import { generateRandomNumber } from '@/lib/utils';

export default function BasicTrainerPage() {
  const [inputValue, setInputValue] = useState<number>(0);
  const [abacusValue, setAbacusValue] = useState<number>(0);
  const [challenge, setChallenge] = useState<number>(42);
  const [resultMessage, setResultMessage] = useState<string>('');
  const [resultType, setResultType] = useState<'success' | 'error' | ''>('');

  const handleSetNumber = () => {
    if (inputValue >= 0 && inputValue <= 999999) {
      setAbacusValue(inputValue);
    } else {
      alert('Пожалуйста, введите число от 0 до 999999');
    }
  };

  const handleReset = () => {
    setAbacusValue(0);
    setInputValue(0);
  };

  const handleRandom = () => {
    const randomNum = generateRandomNumber(0, 999999);
    setInputValue(randomNum);
    setAbacusValue(randomNum);
  };

  const handleNewChallenge = () => {
    const newChallenge = generateRandomNumber(1, 999999);
    setChallenge(newChallenge);
    setResultMessage('');
    setResultType('');
    setAbacusValue(0);
  };

  const handleCheckAnswer = () => {
    if (abacusValue === challenge) {
      setResultMessage('🎉 Правильно! Отличная работа!');
      setResultType('success');
      setTimeout(() => {
        handleNewChallenge();
      }, 2000);
    } else {
      setResultMessage(
        `❌ Неправильно. Ваш ответ: ${abacusValue.toLocaleString()}. Попробуйте еще раз!`
      );
      setResultType('error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-5">
      <header className="text-center py-10">
        <Link href="/" className="inline-block mb-5 text-white/70 hover:text-white transition-colors">
          ← Вернуться к выбору тренажеров
        </Link>
        <h1 className="text-5xl font-extrabold mb-3">
          <span className="block bg-gradient-primary bg-clip-text text-transparent">
            Базовый режим
          </span>
          <span className="block text-lg font-light text-white/70 mt-3">
            Практика работы с абакусом
          </span>
        </h1>
      </header>

      <main>
        <section>
          <Card>
            <h2 className="text-3xl mb-5 bg-gradient-accent bg-clip-text text-transparent font-bold">
              Панель управления
            </h2>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <Input
                  type="number"
                  label="Введите число (0-999999):"
                  min={0}
                  max={999999}
                  value={inputValue}
                  onChange={(e) => setInputValue(Number(e.target.value))}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSetNumber();
                    }
                  }}
                />
                <Button onClick={handleSetNumber} variant="primary">
                  Показать на абакусе
                </Button>
              </div>
              <div className="flex gap-4 flex-wrap">
                <Button onClick={handleReset} variant="secondary" className="flex-1 min-w-[150px]">
                  Сбросить
                </Button>
                <Button onClick={handleRandom} variant="accent" className="flex-1 min-w-[150px]">
                  Случайное число
                </Button>
              </div>
            </div>
            <div className="mt-5 p-5 bg-black/30 rounded-xl flex justify-between items-center">
              <span className="text-lg">Текущее значение:</span>
              <span className="text-4xl font-bold bg-gradient-success bg-clip-text text-transparent">
                {abacusValue.toLocaleString()}
              </span>
            </div>
          </Card>
        </section>

        <section>
          <Abacus columns={6} value={abacusValue} onChange={setAbacusValue} />
        </section>

        <section>
          <Card>
            <h2 className="text-3xl mb-5 bg-gradient-accent bg-clip-text text-transparent font-bold">
              Практика
            </h2>
            <div className="text-center">
              <div className="bg-black/30 p-10 rounded-2xl mb-5">
                <h3 className="text-2xl mb-5 text-white/70">Текущее задание:</h3>
                <div className="text-6xl font-bold bg-gradient-accent bg-clip-text text-transparent my-5 animate-pulse-custom">
                  {challenge.toLocaleString()}
                </div>
                <div className="flex gap-3 justify-center mt-5 flex-wrap">
                  <Button onClick={handleCheckAnswer} variant="primary">
                    Проверить ответ
                  </Button>
                  <Button onClick={handleNewChallenge} variant="secondary">
                    Новое задание
                  </Button>
                </div>
              </div>
              {resultMessage && (
                <div
                  className={`p-5 rounded-xl text-xl font-semibold min-h-[60px] flex items-center justify-center transition-all ${
                    resultType === 'success'
                      ? 'bg-[rgba(67,233,123,0.2)] border-2 border-[#43e97b] text-[#43e97b] animate-successPulse'
                      : 'bg-[rgba(245,87,108,0.2)] border-2 border-[#f5576c] text-[#f5576c] animate-shake'
                  }`}
                >
                  {resultMessage}
                </div>
              )}
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
