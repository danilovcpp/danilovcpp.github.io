# Руководство по разработке

## 🏗️ Архитектура приложения

### Принципы организации кода

1. **Разделение ответственности** - каждый компонент отвечает за свою задачу
2. **Переиспользование** - общие UI компоненты вынесены в `components/ui`
3. **Типизация** - все компоненты и функции типизированы TypeScript
4. **Хуки для логики** - бизнес-логика вынесена в кастомные хуки

### Структура папок

```
app/                    - Next.js страницы (App Router)
  trainers/            - Страницы тренажеров
    [trainer-name]/    - Отдельная страница для каждого тренажера

components/            - React компоненты
  ui/                  - Переиспользуемые UI компоненты
  trainers/            - Компоненты для тренажеров

hooks/                 - Custom React хуки
lib/                   - Утилиты и вспомогательные функции
types/                 - TypeScript типы
```

## 🎨 Стилизация

### Tailwind CSS

Используется Tailwind CSS для всех стилей. Основные паттерны:

1. **Градиенты** определены в `tailwind.config.ts`:
   - `bg-gradient-primary` - основной градиент
   - `bg-gradient-secondary` - вторичный
   - `bg-gradient-accent` - акцентный
   - `bg-gradient-success` - для успеха

2. **Анимации** настроены в конфиге:
   - `animate-fadeInDown`
   - `animate-fadeInUp`
   - `animate-shimmer`
   - `animate-pulse-custom`
   - `animate-successPulse`
   - `animate-shake`

3. **Утилита `cn`** для объединения классов:
```typescript
import { cn } from '@/lib/utils';

<div className={cn('base-class', condition && 'conditional-class')} />
```

## 🧩 Компоненты

### UI Компоненты

#### Button
```tsx
<Button variant="primary" onClick={handleClick}>
  Текст кнопки
</Button>
```
Варианты: `primary`, `secondary`, `accent`

#### Card
```tsx
<Card hoverable={true}>
  Содержимое карточки
</Card>
```

#### Input
```tsx
<Input
  label="Введите число"
  type="number"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

#### Select
```tsx
<Select
  label="Выберите опцию"
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
>
  <option value="1">Опция 1</option>
</Select>
```

### Trainer компоненты

#### Abacus
```tsx
<Abacus
  columns={6}
  value={currentValue}
  onChange={(newValue) => setCurrentValue(newValue)}
  showValue={true}
/>
```

## 🪝 Хуки

### useAbacus

Управляет состоянием абакуса:

```tsx
const {
  beadStates,      // Состояния всех бусин
  currentValue,    // Текущее число
  toggleBead,      // Переключить бусину
  setValue,        // Установить значение
  reset,           // Сбросить
  initialize       // Инициализировать
} = useAbacus(columns);
```

### useFlashAnzan

Управляет тренажером Flash Anzan:

```tsx
const {
  numbers,         // Массив чисел
  currentIndex,    // Текущий индекс
  correctAnswer,   // Правильный ответ
  isRunning,       // Идёт ли тренировка
  stats,           // Статистика
  start,           // Начать тренировку
  stop,            // Остановить
  checkAnswer,     // Проверить ответ
  resetStats       // Сбросить статистику
} = useFlashAnzan();
```

## 📝 Добавление нового тренажера

### Шаг 1: Создайте страницу

```typescript
// app/trainers/new-trainer/page.tsx
'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/Card';

export default function NewTrainerPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-5">
      <header className="text-center py-10">
        <Link href="/">← Вернуться</Link>
        <h1>Новый тренажер</h1>
      </header>

      <main>
        <Card>
          {/* Ваш контент */}
        </Card>
      </main>
    </div>
  );
}
```

### Шаг 2: Зарегистрируйте в списке

```typescript
// lib/trainers.ts
export const trainers: Trainer[] = [
  // ... существующие тренажеры
  {
    id: 'new-trainer',
    title: 'Новый тренажер',
    description: 'Описание тренажера',
    icon: '🎯',
    path: '/trainers/new-trainer',
  },
];
```

### Шаг 3: Добавьте тип (опционально)

```typescript
// types/index.ts
export type TrainerType =
  | 'basic'
  | 'flash-anzan'
  | 'new-trainer';  // Добавьте новый тип
```

### Шаг 4: Создайте хук (если нужна сложная логика)

```typescript
// hooks/useNewTrainer.ts
'use client';

import { useState, useCallback } from 'react';

export function useNewTrainer() {
  const [state, setState] = useState(initialState);

  const doSomething = useCallback(() => {
    // Логика
  }, []);

  return {
    state,
    doSomething,
  };
}
```

## 🎯 Best Practices

### 1. Типизация
Всегда используйте TypeScript типы:
```typescript
interface Props {
  value: number;
  onChange: (value: number) => void;
}

export const Component: React.FC<Props> = ({ value, onChange }) => {
  // ...
};
```

### 2. Хуки
Выносите сложную логику в хуки:
```typescript
// ❌ Плохо - логика в компоненте
export default function Page() {
  const [value, setValue] = useState(0);
  const [isValid, setIsValid] = useState(true);
  // много логики...
}

// ✅ Хорошо - логика в хуке
export default function Page() {
  const { value, setValue, isValid } = useMyLogic();
}
```

### 3. Композиция компонентов
Разбивайте большие компоненты на маленькие:
```typescript
// ❌ Плохо
export function BigComponent() {
  return (
    <div>
      {/* 500 строк JSX */}
    </div>
  );
}

// ✅ Хорошо
export function MainComponent() {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
```

### 4. Именование
- Компоненты: `PascalCase`
- Хуки: `useCamelCase`
- Утилиты: `camelCase`
- Константы: `UPPER_CASE`

### 5. Импорты
Используйте алиасы для чистоты:
```typescript
// ✅ Хорошо
import { Button } from '@/components/ui';
import { useAbacus } from '@/hooks';

// ❌ Плохо
import { Button } from '../../../components/ui/Button';
```

## 🧪 Тестирование

Для добавления тестов:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

Пример теста:
```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

## 🚀 Оптимизация

### 1. Мемоизация
```typescript
import { memo, useMemo, useCallback } from 'react';

// Мемоизация компонента
export const Bead = memo(({ active, onClick }) => {
  // ...
});

// Мемоизация значений
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(dep);
}, [dep]);

// Мемоизация колбэков
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);
```

### 2. Ленивая загрузка
```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Загрузка...</p>
});
```

## 📦 Деплой

### Vercel (рекомендуется)
```bash
npm install -g vercel
vercel
```

### Другие платформы
```bash
npm run build
npm start
```

## 🐛 Отладка

### Next.js DevTools
Включены по умолчанию в режиме разработки

### React DevTools
Установите расширение для браузера

### Console logs
```typescript
console.log('Debug:', { value, state });
```

## 📚 Полезные ресурсы

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
