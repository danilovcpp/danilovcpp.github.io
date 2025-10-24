'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useFlashAnzan } from '@/hooks/useFlashAnzan';
import { FlashAnzanSettings } from '@/types';

export default function FlashAnzanPage() {
  const [settings, setSettings] = useState<FlashAnzanSettings>({
    count: 5,
    speed: 1000,
    digits: 2,
  });
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [currentProgress, setCurrentProgress] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showAnswerSection, setShowAnswerSection] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string>('');
  const [resultType, setResultType] = useState<'success' | 'error' | ''>('');

  const { numbers, correctAnswer, isRunning, stats, start, stop, checkAnswer } = useFlashAnzan();

  const handleStart = () => {
    setUserAnswer('');
    setResultMessage('');
    setResultType('');
    setShowAnswerSection(false);

    start(
      settings,
      (num, index) => {
        setCurrentNumber(num);
        setCurrentProgress(`${index + 1} / ${settings.count}`);
      },
      () => {
        setCurrentNumber(null);
        setCurrentProgress('Введите ответ');
        setShowAnswerSection(true);
      }
    );
  };

  const handleStop = () => {
    stop();
    setCurrentNumber(null);
    setCurrentProgress('');
  };

  const handleCheckAnswer = () => {
    const answer = parseInt(userAnswer);

    if (isNaN(answer)) {
      setResultMessage('Пожалуйста, введите число');
      setResultType('error');
      return;
    }

    const isCorrect = checkAnswer(answer);

    if (isCorrect) {
      setResultMessage(
        `🎉 Правильно!\nЧисла: ${numbers.join(' + ')} = ${correctAnswer}`
      );
      setResultType('success');
    } else {
      setResultMessage(
        `❌ Неправильно\nВаш ответ: ${answer}\nПравильный ответ: ${correctAnswer}\nЧисла: ${numbers.join(' + ')}`
      );
      setResultType('error');
    }

    setTimeout(() => {
      setShowAnswerSection(false);
      setCurrentNumber(null);
      setCurrentProgress('');
      setResultMessage('');
      setResultType('');
      setUserAnswer('');
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-5">
      <header className="text-center py-10">
        <Link href="/" className="inline-block mb-5 text-white/70 hover:text-white transition-colors">
          ← Вернуться к выбору тренажеров
        </Link>
        <h1 className="text-5xl font-extrabold mb-3">
          <span className="block bg-gradient-primary bg-clip-text text-transparent">
            Flash Anzan
          </span>
          <span className="block text-lg font-light text-white/70 mt-3">
            Тренажер быстрых вычислений
          </span>
        </h1>
      </header>

      <main>
        <section>
          <Card>
            <h2 className="text-3xl mb-5 bg-gradient-accent bg-clip-text text-transparent font-bold">
              Настройки
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              <Select
                label="Количество чисел:"
                value={settings.count}
                onChange={(e) => setSettings({ ...settings, count: Number(e.target.value) })}
              >
                <option value={3}>3 числа</option>
                <option value={5}>5 чисел</option>
                <option value={10}>10 чисел</option>
                <option value={15}>15 чисел</option>
                <option value={20}>20 чисел</option>
              </Select>

              <Select
                label="Скорость (мс):"
                value={settings.speed}
                onChange={(e) => setSettings({ ...settings, speed: Number(e.target.value) })}
              >
                <option value={1500}>1500 мс (легко)</option>
                <option value={1000}>1000 мс (средне)</option>
                <option value={700}>700 мс (сложно)</option>
                <option value={500}>500 мс (эксперт)</option>
                <option value={300}>300 мс (мастер)</option>
              </Select>

              <Select
                label="Количество цифр:"
                value={settings.digits}
                onChange={(e) => setSettings({ ...settings, digits: Number(e.target.value) })}
              >
                <option value={1}>1 цифра</option>
                <option value={2}>2 цифры</option>
                <option value={3}>3 цифры</option>
                <option value={4}>4 цифры</option>
              </Select>
            </div>

            <div className="min-h-[300px] bg-black/40 rounded-2xl flex flex-col items-center justify-center gap-5 my-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-primary opacity-5 z-0" />
              {currentNumber !== null ? (
                <div className="text-8xl font-bold bg-gradient-accent bg-clip-text text-transparent transition-all duration-300 z-10">
                  {currentNumber}
                </div>
              ) : (
                currentProgress && (
                  <div className="text-8xl font-bold bg-gradient-accent bg-clip-text text-transparent z-10">
                    ?
                  </div>
                )
              )}
              <div className="text-xl text-white/70 font-semibold z-10">{currentProgress}</div>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              {!isRunning && !showAnswerSection && (
                <Button onClick={handleStart} variant="primary">
                  Начать
                </Button>
              )}
              {isRunning && (
                <Button onClick={handleStop} variant="secondary">
                  Остановить
                </Button>
              )}
            </div>

            {showAnswerSection && (
              <div className="bg-black/30 p-8 rounded-2xl text-center my-5">
                <h3 className="text-white text-2xl mb-5">Введите сумму всех чисел:</h3>
                <Input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleCheckAnswer();
                    }
                  }}
                  placeholder="Ваш ответ"
                  className="text-2xl text-center max-w-sm mx-auto mb-5"
                  autoFocus
                />
                <Button onClick={handleCheckAnswer} variant="accent">
                  Проверить
                </Button>
              </div>
            )}

            {resultMessage && (
              <div
                className={`p-6 rounded-2xl text-xl font-semibold min-h-[80px] flex items-center justify-center text-center transition-all whitespace-pre-line ${
                  resultType === 'success'
                    ? 'bg-[rgba(67,233,123,0.2)] border-2 border-[#43e97b] text-[#43e97b] animate-successPulse'
                    : 'bg-[rgba(245,87,108,0.2)] border-2 border-[#f5576c] text-[#f5576c] animate-shake'
                }`}
              >
                {resultMessage}
              </div>
            )}

            {(stats.correct > 0 || stats.wrong > 0) && (
              <div className="bg-black/30 p-6 rounded-2xl mt-8">
                <h3 className="text-white text-2xl mb-5 text-center font-bold">Статистика:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="bg-black/30 p-5 rounded-xl text-center border border-white/10 transition-all hover:-translate-y-2 hover:border-[#667eea]">
                    <span className="block text-white/70 text-sm mb-3">Правильные ответы:</span>
                    <span className="block text-4xl font-bold bg-gradient-success bg-clip-text text-transparent">
                      {stats.correct}
                    </span>
                  </div>
                  <div className="bg-black/30 p-5 rounded-xl text-center border border-white/10 transition-all hover:-translate-y-2 hover:border-[#667eea]">
                    <span className="block text-white/70 text-sm mb-3">Неправильные:</span>
                    <span className="block text-4xl font-bold bg-gradient-success bg-clip-text text-transparent">
                      {stats.wrong}
                    </span>
                  </div>
                  <div className="bg-black/30 p-5 rounded-xl text-center border border-white/10 transition-all hover:-translate-y-2 hover:border-[#667eea]">
                    <span className="block text-white/70 text-sm mb-3">Точность:</span>
                    <span className="block text-4xl font-bold bg-gradient-success bg-clip-text text-transparent">
                      {stats.accuracy}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </section>
      </main>
    </div>
  );
}
