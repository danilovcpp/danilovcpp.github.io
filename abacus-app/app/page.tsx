import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { TrainerCard } from '@/components/TrainerCard';
import { trainers } from '@/lib/trainers';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-5">
      <header className="text-center py-10 animate-fadeInDown">
        <h1 className="text-6xl font-extrabold mb-3">
          <span className="block bg-gradient-primary bg-clip-text text-transparent animate-shimmer">
            Абакус
          </span>
          <span className="block text-xl font-light text-white/70 mt-3">
            Древнее искусство быстрого счета
          </span>
        </h1>
      </header>

      <main>
        <section className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <Card>
            <h2 className="text-3xl mb-5 bg-gradient-accent bg-clip-text text-transparent font-bold">
              Выберите тренажер
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
              {trainers.map((trainer) => (
                <TrainerCard key={trainer.id} trainer={trainer} />
              ))}
            </div>
          </Card>
        </section>

        <section className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <Card>
            <h2 className="text-3xl mb-5 bg-gradient-accent bg-clip-text text-transparent font-bold">
              Как использовать абакус
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
              {[
                {
                  step: 1,
                  title: 'Структура',
                  description: 'Каждый столбец представляет разряд числа (единицы, десятки, сотни и т.д.)',
                },
                {
                  step: 2,
                  title: 'Верхние бусины',
                  description: 'Каждая верхняя бусина равна 5. Опускайте её вниз, чтобы активировать',
                },
                {
                  step: 3,
                  title: 'Нижние бусины',
                  description: 'Каждая нижняя бусина равна 1. Поднимайте их вверх, чтобы активировать',
                },
                {
                  step: 4,
                  title: 'Считывание',
                  description: 'Складывайте активные бусины в каждом столбце для получения цифры',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-black/20 p-6 rounded-2xl border border-white/10 transition-all duration-300 hover:bg-black/30 hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl mb-3 text-white font-semibold">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </main>

      <footer className="text-center py-8 text-white/70 mt-10">
        <p>Создано для изучения древнего искусства счета на абакусе</p>
      </footer>
    </div>
  );
}
