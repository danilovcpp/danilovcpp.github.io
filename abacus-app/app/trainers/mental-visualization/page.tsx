import Link from 'next/link';
import { Card } from '@/components/ui/Card';

export default function MentalVisualizationPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-5">
      <header className="text-center py-10">
        <Link href="/" className="inline-block mb-5 text-white/70 hover:text-white transition-colors">
          ← Вернуться к выбору тренажеров
        </Link>
        <h1 className="text-5xl font-extrabold mb-3">
          <span className="block bg-gradient-primary bg-clip-text text-transparent">
            Mental Visualization
          </span>
          <span className="block text-lg font-light text-white/70 mt-3">
            Абакус из головы - визуализация без физического инструмента
          </span>
        </h1>
      </header>

      <main>
        <Card>
          <div className="text-center py-20">
            <div className="text-6xl mb-5">🧠</div>
            <h2 className="text-3xl mb-5 text-white">В разработке</h2>
            <p className="text-white/70 text-lg">
              Этот тренажер скоро будет доступен. Следите за обновлениями!
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
}
