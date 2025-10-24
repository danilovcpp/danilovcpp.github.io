# 🚀 Быстрый старт

## Установка и запуск

```bash
# 1. Перейдите в папку проекта
cd abacus-app

# 2. Установите зависимости
npm install

# 3. Запустите сервер разработки
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 📁 Структура проекта

```
abacus-app/
├── app/                    # Страницы Next.js
│   ├── page.tsx           # Главная страница
│   └── trainers/          # Страницы тренажеров
├── components/            # React компоненты
│   ├── ui/               # UI компоненты (Button, Card, Input, Select)
│   └── trainers/         # Компоненты абакуса
├── hooks/                # React хуки (useAbacus, useFlashAnzan)
├── lib/                  # Утилиты
└── types/                # TypeScript типы
```

## 🎯 Основные команды

```bash
npm run dev      # Запуск в режиме разработки
npm run build    # Сборка для продакшена
npm run start    # Запуск продакшен версии
npm run lint     # Проверка кода
```

## 🧩 Использование компонентов

### Кнопка
```tsx
import { Button } from '@/components/ui';

<Button variant="primary" onClick={handleClick}>
  Нажми меня
</Button>
```

### Абакус
```tsx
import { Abacus } from '@/components/trainers';

<Abacus
  columns={6}
  value={123}
  onChange={(newValue) => console.log(newValue)}
/>
```

## 📝 Создание нового тренажера

1. Создайте папку `app/trainers/your-trainer/`
2. Добавьте файл `page.tsx` со страницей
3. Зарегистрируйте в `lib/trainers.ts`

## 🎨 Доступные стили Tailwind

### Градиенты
- `bg-gradient-primary` - фиолетовый
- `bg-gradient-secondary` - розовый
- `bg-gradient-accent` - голубой
- `bg-gradient-success` - зелёный

### Анимации
- `animate-fadeInDown`
- `animate-fadeInUp`
- `animate-shimmer`
- `animate-pulse-custom`
- `animate-successPulse`
- `animate-shake`

## 💡 Примеры

### Простой компонент с состоянием
```tsx
'use client';

import { useState } from 'react';
import { Button, Input, Card } from '@/components/ui';

export default function MyPage() {
  const [value, setValue] = useState(0);

  return (
    <Card>
      <Input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <Button onClick={() => alert(value)}>
        Показать значение
      </Button>
    </Card>
  );
}
```

### Использование хука
```tsx
'use client';

import { useAbacus } from '@/hooks';
import { Abacus } from '@/components/trainers';

export default function AbacusPage() {
  const { currentValue, setValue, reset } = useAbacus(6);

  return (
    <div>
      <Abacus value={currentValue} onChange={setValue} />
      <p>Значение: {currentValue}</p>
      <button onClick={reset}>Сбросить</button>
    </div>
  );
}
```

## 🐛 Решение проблем

### Порт уже занят
```bash
# Используйте другой порт
PORT=3001 npm run dev
```

### Ошибки TypeScript
```bash
# Очистите кэш
rm -rf .next
npm run dev
```

### Проблемы с зависимостями
```bash
# Удалите node_modules и переустановите
rm -rf node_modules package-lock.json
npm install
```

## 📚 Дополнительная информация

- Подробное руководство: [DEVELOPMENT.md](DEVELOPMENT.md)
- Полная документация: [README.md](README.md)
